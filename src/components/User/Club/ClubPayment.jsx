import React, { useState } from 'react';
import { PayPalButtons, PayPalScriptProvider } from '@paypal/react-paypal-js';
import { axiosInstance } from '../../../../Api/config';
import { useLocation, useNavigate } from 'react-router-dom';
import ClubNav from './ClubNav';
import { ToastContainer,toast } from 'react-toastify'
function ClubPayment() {
  const PAYPALID=import.meta.env.VITE_PAYPAL_ID
  const navigate=useNavigate()
    const location=useLocation();
const clubName=location.state?.club;
  const [paymentdata, setPaymentdata] = useState({
    name: '',
    reason: '',
    amount: ''
  });
  const [errors, setErrors] = useState({
    name:"",
    reason:"",
    amount: "",
  });

  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [payment, setPayment] = useState(false); // Initialize payment state to false

  const openPaymentModal = () => {
    setIsPaymentModalOpen(true);
  };

  const closePaymentModal = () => {
    setIsPaymentModalOpen(false);
  };

  const validateName = (name) => {
    if (!name.trim()) {
      return "Please enter your name";
    }
    return "";
  };
  
  const validateReason = (reason) => {
    if (!reason.trim()) {
      return "Please enter a specific reason for payment";
    }
    return "";
  };
  
  const validateAmount = (amount) => {
    if (!amount.trim()) {
      return "Please enter the payment amount";
    }
    if (isNaN(Number(amount))) {
      return "Amount must be in Number";
    }
    return "";
  };
  
  const handlePayment = async (e) => {
    e.preventDefault();
    const nameError = validateName(paymentdata.name);
  const reasonError = validateReason(paymentdata.reason);
  const amountError = validateAmount(paymentdata.amount);

  if (nameError || reasonError || amountError) {
    setErrors({
      name: nameError,
      reason: reasonError,
      amount: amountError,
    });
    return;
  }
    setPayment(true); 
    openPaymentModal();
  };

  return (
    <div>
      <ClubNav/>
      <div className="bg-primary flex justify-center items-center min-h-screen bg-gray-100">
        <div className="bg-white rounded-lg p-6 shadow-md w-full max-w-md">
          <h2 className="text-xl text-center font-semibold mb-4">Paying  To {<span className='text-lx text-blue-600 font-mono'>{clubName}</span>}</h2>
          <form onSubmit={handlePayment}>
            {/* Form fields ... */}
            <div className="mb-4">
              <label htmlFor="name" className="block mb-1  font-medium">
                Name:
              </label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Enter your name"
                onChange={(e) =>{
                  setPaymentdata({ ...paymentdata, [e.target.name]: e.target.value })
                  setErrors({ ...errors, name: validateName(e.target.value) });
                  setErrors({})
                }}
                className={`w-full px-4 py-2 border rounded ${
                  errors.name && "border-red-500"
                }`}
              />
              {errors.name && <p className="text-red-500 text-center">{errors.name}</p>}
            </div>

            <div className="mb-4">
              <label htmlFor="reason" className="block mb-1 font-medium">
                Reason:
              </label>
              <input
                type="text"
                id="reason"
                name="reason"
                placeholder="Enter the reason for payment"
                onChange={(e) =>{
                  setPaymentdata({ ...paymentdata, [e.target.name]: e.target.value })
                  setErrors({ ...errors, reason: validateName(e.target.value) });
                  setErrors({})
                }}
                className={`w-full px-4 py-2 border rounded ${
                  errors.reason && "border-red-500"
                }`}
              />
              {errors.reason && <p className="text-red-500 text-center">{errors.reason}</p>}
            </div>

            <div className="mb-4">
              <label htmlFor="amount" className="block mb-1 font-medium">
                Amount:
              </label>
              <input
                type="text"
                id="amount"
                name="amount"
                placeholder="Enter the payment amount"
                onChange={(e) =>{
                  setPaymentdata({ ...paymentdata, [e.target.name]: e.target.value })
                  setErrors({ ...errors, amount: validateName(e.target.value) });
                  setErrors({})
                }}
                className={`w-full px-4 py-2 border rounded ${
                  errors.amount && "border-red-500"
                }`}
              />
              {errors.amount && <p className="text-red-500 text-center">{errors.amount}</p>}
            </div>

            {/* Rest of your form */}
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
            >
              Make Payment
            </button>

          </form>

          {isPaymentModalOpen && (
            <div className="fixed inset-0 z-50 overflow-auto bg-gray-900 bg-opacity-50 flex items-center justify-center">
              <div className="bg-white rounded-lg w-11/12 max-w-md mx-auto p-6">
                <div className="flex justify-between items-center mb-4">
                  <h5 className="text-xl font-semibold text-gray-800">
                    PayPal Payment
                  </h5>
                </div>
                

                {payment ? ( // Check if payment is true before rendering PayPalScriptProvider
                  <PayPalScriptProvider
                    options={{
                      clientId:PAYPALID,
                    }}
                  >
                    <PayPalButtons
                      style={{ layout: 'horizontal' }}
                      className="my-3"
                      createOrder={(_data, actions) => {
                        return actions.order.create({
                          purchase_units: [
                            {
                              amount: {
                                value: paymentdata.amount, // Use the actual payment amount
                              },
                            }, 
                          ],
                        });
                      }}
                      onApprove={(_data, actions) => {
                        return actions.order
                          .capture()
                          .then(async function () {
                            // Payment capture successful logic
                            const order = await actions.order.capture();
                            const paypalId = order.id; // PayPal transaction ID
                        const response=await axiosInstance.post('/create-payment',{
                            ...paymentdata,clubName,paypalId: paypalId,})
                           console.log(response);
                           console.log(response.data.message);
                           if (response.data.message) {
                            toast.success(response.data.message);
                          }
                           console.log("bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb");
                           console.log(response);
                             navigate('/clubHome')
                          })
                          .catch(function (error) {
                            // Payment capture error logic
                            console.log("error");
                          });
                      }}
                    />
                   
                  </PayPalScriptProvider>
                  
                ) : null}
                 <button
                 type="button"
                 className="px-4 py-2 bg-gray-300 text-gray-900 rounded-lg  hover:bg-gray-400 transition ease-in-out"
                 onClick={closePaymentModal}
                 >
                 Cancel payment
                 </button>
              </div>
            </div>
          )}
        </div>
      <ToastContainer/>
      </div>
    </div>
  );
}

export default ClubPayment;






























// import React, { useState } from 'react';
// import { PayPalButtons, PayPalScriptProvider } from '@paypal/react-paypal-js';
// import { axiosInstance } from '../../../../Api/config';
// import { useLocation, useNavigate } from 'react-router-dom';
// import ClubNav from './ClubNav';
// import { ToastContainer,toast } from 'react-toastify'
// function ClubPayment() {
//   // const PAYPALID=import.meta.env.VITE_PAYPAL_ID
//   const navigate=useNavigate()
//     const location=useLocation();
// const clubName=location.state?.club;
//   const [paymentdata, setPaymentdata] = useState({
//     name: '',
//     reason: '',
//     amount: ''
//   });
//   const [errors, setErrors] = useState({
//     name:"",
//     reason:"",
//     amount: "",
//   });

//   const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
//   const [payment, setPayment] = useState(false); // Initialize payment state to false

//   const openPaymentModal = () => {
//     setIsPaymentModalOpen(true);
//   };

//   const closePaymentModal = () => {
//     setIsPaymentModalOpen(false);
//   };

//   const handlePayment = async (e) => {
//     e.preventDefault();
//     if (paymentdata.name.trim() === "" &&
//         paymentdata.reason.trim() === "" &&
//        paymentdata.amount.trim() === "" ) {
//       setErrors({
//         ...errors,
//         name: "Please Enter Your Name",
//         reason: "Enter your specific reason",
//         amount: "Enter your cash amount",
//       });
//       return;

//     }
//     setPayment(true); // Set payment to true to show the PayPal payment window
//     openPaymentModal();
//   };

//   return (
//     <div>
//       <ClubNav/>
//       <div className="bg-primary flex justify-center items-center min-h-screen bg-gray-100">
//         <div className="bg-white rounded-lg p-6 shadow-md w-full max-w-md">
//           <h2 className="text-xl text-center font-semibold mb-4">Paying  To {<span className='text-lx text-blue-600 font-mono'>{clubName}</span>}</h2>
//           <form onSubmit={handlePayment}>
//             {/* Form fields ... */}
//             <div className="mb-4">
//               <label htmlFor="name" className="block mb-1  font-medium">
//                 Name:
//               </label>
//               <input
//                 type="text"
//                 id="name"
//                 name="name"
//                 placeholder="Enter your name"
//                 onChange={(e) =>{
//                   setPaymentdata({ ...paymentdata, [e.target.name]: e.target.value })
//                   setErrors({})
//                 }}
//                 className={`w-full px-4 py-2 border rounded ${
//                   errors.name && "border-red-500"
//                 }`}
//               />
//               {errors.name && <p className="text-red-500 text-center">{errors.name}</p>}
//             </div>

//             <div className="mb-4">
//               <label htmlFor="reason" className="block mb-1 font-medium">
//                 Reason:
//               </label>
//               <input
//                 type="text"
//                 id="reason"
//                 name="reason"
//                 placeholder="Enter the reason for payment"
//                 onChange={(e) =>{
//                   setPaymentdata({ ...paymentdata, [e.target.name]: e.target.value })
//                   setErrors({})
//                 }}
//                 className={`w-full px-4 py-2 border rounded ${
//                   errors.reason && "border-red-500"
//                 }`}
//               />
//               {errors.reason && <p className="text-red-500 text-center">{errors.reason}</p>}
//             </div>

//             <div className="mb-4">
//               <label htmlFor="amount" className="block mb-1 font-medium">
//                 Amount:
//               </label>
//               <input
//                 type="number"
//                 id="amount"
//                 name="amount"
//                 placeholder="Enter the payment amount"
//                 onChange={(e) =>{
//                   setPaymentdata({ ...paymentdata, [e.target.name]: e.target.value })
//                   setErrors({})
//                 }}
//                 className={`w-full px-4 py-2 border rounded ${
//                   errors.amount && "border-red-500"
//                 }`}
//               />
//               {errors.amount && <p className="text-red-500 text-center">{errors.amount}</p>}
//             </div>

//             {/* Rest of your form */}
//             <button
//               type="submit"
//               className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
//             >
//               Make Payment
//             </button>

//           </form>

//           {isPaymentModalOpen && (
//             <div className="fixed inset-0 z-50 overflow-auto bg-gray-900 bg-opacity-50 flex items-center justify-center">
//               <div className="bg-white rounded-lg w-11/12 max-w-md mx-auto p-6">
//                 <div className="flex justify-between items-center mb-4">
//                   <h5 className="text-xl font-semibold text-gray-800">
//                     PayPal Payment
//                   </h5>
//                 </div>
                

//                 {payment ? ( // Check if payment is true before rendering PayPalScriptProvider
//                   <PayPalScriptProvider
//                     options={{
//                       clientId:'AbkrVw5fysOoRdbvD7j3OTniOM5ZDqzahYz6ziSDLdhjfeNAdGnia13UsWFtploM_cGYJYAHUJaKqRO5',
//                     }}
//                   >
//                     <PayPalButtons
//                       style={{ layout: 'horizontal' }}
//                       className="my-3"
//                       createOrder={(_data, actions) => {
//                         return actions.order.create({
//                           purchase_units: [
//                             {
//                               amount: {
//                                 value: paymentdata.amount, // Use the actual payment amount
//                               },
//                             }, 
//                           ],
//                         });
//                       }}
//                       onApprove={(_data, actions) => {
//                         return actions.order
//                           .capture()
//                           .then(async function () {
//                             // Payment capture successful logic
//                             const order = await actions.order.capture();
//                             const paypalId = order.id; // PayPal transaction ID
//                         const response=await axiosInstance.post('/create-payment',{
//                             ...paymentdata,clubName,paypalId: paypalId,})
//                            console.log(response);
//                            console.log(response.data.message);
//                            if (response.data.message) {
//                             toast.success(response.data.message);
//                           }
//                            console.log("bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb");
//                            console.log(response);
//                              navigate('/clubHome')
//                           })
//                           .catch(function (error) {
//                             // Payment capture error logic
//                             console.log("error");
//                           });
//                       }}
//                     />
                   
//                   </PayPalScriptProvider>
                  
//                 ) : null}
//                  <button
//                  type="button"
//                  className="px-4 py-2 bg-gray-300 text-gray-900 rounded-lg  hover:bg-gray-400 transition ease-in-out"
//                  onClick={closePaymentModal}
//                  >
//                  Cancel payment
//                  </button>
//               </div>
//             </div>
//           )}
//         </div>
//       <ToastContainer/>
//       </div>
//     </div>
//   );
// }

// export default ClubPayment;




