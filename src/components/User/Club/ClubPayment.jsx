import React, { useState } from 'react';
import { PayPalButtons, PayPalScriptProvider } from '@paypal/react-paypal-js';
import { axiosInstance } from '../../../../Api/config';
import { useLocation, useNavigate } from 'react-router-dom';
import ClubNav from './ClubNav';
import { ToastContainer,toast } from 'react-toastify'
function ClubPayment() {
  const navigate=useNavigate()
    const location=useLocation();
const clubName=location.state?.club;
  const [paymentdata, setPaymentdata] = useState({
    name: '',
    reason: '',
    amount: ''
  });

  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [payment, setPayment] = useState(false); // Initialize payment state to false

  const openPaymentModal = () => {
    setIsPaymentModalOpen(true);
  };

  const closePaymentModal = () => {
    setIsPaymentModalOpen(false);
  };

  const handlePayment = async (e) => {
    e.preventDefault();
    setPayment(true); // Set payment to true to show the PayPal payment window
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
              <label htmlFor="name" className="block mb-1 font-medium">
                Name:
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className="w-full px-4 py-2 border rounded"
                onChange={(e) =>
                    setPaymentdata({ ...paymentdata, [e.target.name]: e.target.value })
                }
                placeholder="Enter your name"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="reason" className="block mb-1 font-medium">
                Reason:
              </label>
              <input
                type="text"
                id="reason"
                name="reason"
                className="w-full px-4 py-2 border rounded"
                onChange={(e) =>
                    setPaymentdata({ ...paymentdata, [e.target.name]: e.target.value })
                }
                placeholder="Enter the reason for payment"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="amount" className="block mb-1 font-medium">
                Amount:
              </label>
              <input
                type="number"
                id="amount"
                name="amount"
                className="w-full px-4 py-2 border rounded"
                onChange={(e) =>
                    setPaymentdata({ ...paymentdata, [e.target.name]: e.target.value })
                }
                placeholder="Enter the payment amount"
              />
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
                      clientId: 'AbkrVw5fysOoRdbvD7j3OTniOM5ZDqzahYz6ziSDLdhjfeNAdGnia13UsWFtploM_cGYJYAHUJaKqRO5',
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








// import { PayPalButtons,PayPalScriptProvider } from "@paypal/react-paypal-js";
// import { useNavigate } from "react-router-dom";
// import { ToastContainer,toast } from "react-toastify";
// import api from "../../servises/api/axios interceptor ";
// import React from 'react'

// const UserPremium : React.FC = () => {
//     const navigate = useNavigate()
//   return (
//     <div>
//     <ToastContainer />
//     <PayPalScriptProvider
//       options={{
//         clientId:
//           "AWlpb_CM30pTBOOy0z1dhtq_aQ-41YZsyZBxiJfm1RVOynnAwFXVlx_0zQCL2iQg0R_BEfl8xn5cxzk0",
//       }}
//     >
      
//       <PayPalButtons
//   style={{ layout: "horizontal" }}
//   className="  my-3"
//   createOrder={(_data: any, action: any) => {
//       return action.order.create({
//           purchase_units: [
//               {
//                   amount: {
//                       value: 100,
//                   },
//               },
//           ],
//       });
//   }}
//   onApprove={(_data: any, actions: any) => {
//       return actions.order
//           .capture()
//           .then(async function () {
//               const emailId =JSON.parse( localStorage.getItem('user')as string)
//               const email = emailId.LoginCheck.email
//               console.log(emailId.LoginCheck.email,"ggggg");
              
             
              
//               const update =await api.post('/userPremium',{email})
//               if(update){
//                   navigate("/orgDetail");
                  
//                   toast.success("stadium added successfully", {
//                       position: "top-right",
//                       autoClose: 3000,
//                   });
//               }
//           })
//           .catch(function (error: any) {
//               toast.success(error as string, {
//                   position: "top-right",
//                   autoClose: 3000,
//               });
//           });
//   }}
// />

//     </PayPalScriptProvider>
//   </div>
//   )
// }

// export default UserPremium



// <button
// type="button"
// className="px-4 py-2 bg-gray-300 text-gray-900 rounded-lg hover:bg-gray-400 transition ease-in-out"
// onClick={closePaymentModal}
// >
// Confirm Payment
// </button>


// import React, { useState } from 'react';
// import { PayPalButtons,PayPalScriptProvider } from "@paypal/react-paypal-js";
// function ClubPayment() {
//   const [payment, setPayment] = useState({
//     username: '',
//     reason: '',
//     amount: ''
//   });

//   const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);

//   const openPaymentModal = () => {
//     setIsPaymentModalOpen(true);
//   };

//   const closePaymentModal = () => {
//     setIsPaymentModalOpen(false);
//   };

//   const handlePayment = async (e) => {
//     e.preventDefault();
//     openPaymentModal();
//     console.log(payment);
//   };

//   return (
//     <div>
//       <div className="flex justify-center items-center min-h-screen bg-gray-100">
//         <div className="bg-white rounded-lg p-6 shadow-md w-full max-w-md">
//           <h2 className="text-xl font-semibold mb-4">Payment Form</h2>
//           <form onSubmit={handlePayment}>
            // <div className="mb-4">
            //   <label htmlFor="username" className="block mb-1 font-medium">
            //     Name:
            //   </label>
            //   <input
            //     type="text"
            //     id="username"
            //     name="username"
            //     className="w-full px-4 py-2 border rounded"
            //     onChange={(e) =>
            //       setPayment({ ...payment, [e.target.name]: e.target.value })
            //     }
            //     placeholder="Enter your name"
            //   />
            // </div>
            // <div className="mb-4">
            //   <label htmlFor="reason" className="block mb-1 font-medium">
            //     Reason:
            //   </label>
            //   <input
            //     type="text"
            //     id="reason"
            //     name="reason"
            //     className="w-full px-4 py-2 border rounded"
            //     onChange={(e) =>
            //       setPayment({ ...payment, [e.target.name]: e.target.value })
            //     }
            //     placeholder="Enter the reason for payment"
            //   />
            // </div>
            // <div className="mb-4">
            //   <label htmlFor="amount" className="block mb-1 font-medium">
            //     Amount:
            //   </label>
            //   <input
            //     type="number"
            //     id="amount"
            //     name="amount"
            //     className="w-full px-4 py-2 border rounded"
            //     onChange={(e) =>
            //       setPayment({ ...payment, [e.target.name]: e.target.value })
            //     }
            //     placeholder="Enter the payment amount"
            //   />
            // </div>
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
//                     Paypal Payment 
//                   </h5>
//                 </div>
//                 <div className="flex justify-end">
//                   <button
//                     type="button"
//                     className="px-4 py-2 bg-gray-300 text-gray-900 rounded-lg hover:bg-gray-400 transition ease-in-out"
//                     onClick={closePaymentModal}
//                   >
//                     Confirm payment
//                   </button>
//                   <PayPalScriptProvider
//       options={{
//         clientId:
//           "AWlpb_CM30pTBOOy0z1dhtq_aQ-41YZsyZBxiJfm1RVOynnAwFXVlx_0zQCL2iQg0R_BEfl8xn5cxzk0",
//       }}
//     >
      
//       <PayPalButtons
//   style={{ layout: "horizontal" }}
//   className="  my-3"
//   createOrder={(_data, action) => {
//       return action.order.create({
//           purchase_units: [
//               {
//                   amount: {
//                       value: 100,
//                   },
//               },
//           ],
//       });
//   }}/>
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default ClubPayment;
