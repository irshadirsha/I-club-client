import React, { useState,useEffect } from 'react';
import { axiosInstance } from '../../../../Api/config';
import { useDispatch, useSelector } from 'react-redux';
import { updateUser } from '../../../redux/UserSlice/UserSlice';
import { ToastContainer,toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

function ClubSetting() {
    const dispatch=useDispatch()
    const user=useSelector(state=>state.user)
    const {clubName}=useSelector((state)=>state.user)
  const [showClubDetails, setShowClubDetails] = useState(true); 
  const [updateclub,setUpdateClub]=useState({
    clubName:"",
    registerNo:"",
    address:"",
    category:"",
    about:""
  })
  const [Committe,setCommitte]=useState({})
  const [club,setClub]=useState([])
   useEffect(()=>{
        fetchdata()
   },[])
   const fetchdata=async()=>{
    const res=await axiosInstance.get('/get-clubform',{
        params:{clubName}
    })
    console.log(res)
    setClub(res.data.club)
   }
  const handleSubmitClub= async (e) => {
    e.preventDefault()
    const regex = {
        registerNo: /^\d{6}$/gm,
      }
      if (updateclub.clubName === "") {
        generateError("Name is required")
        return;
      } else if (updateclub.registerNo === "") {
        generateError("registerNo is required")
        return;
      } else if (!regex.registerNo.test(updateclub.registerNo)) {
        generateError("registerNo: Only contain six digit")
        return;
      } else if (updateclub.address === "") {
        generateError("address is required")
        return;
      } else if (updateclub.category === "") {
        generateError("category is required")
        return;
      } else if (updateclub.about === "") {
        generateError("description is required")
        return;
      }

    console.log(updateclub)
    const {data}= await axiosInstance.post('/update-club',{...updateclub,club:clubName})
    console.log(data);
    console.log("response of updation",data.getclub.clubName)
    const club=data.getclub.clubName
    console.log("clubdssss",club);
    dispatch(updateUser({
        id:user.id,
        username:user.username,
        email:user.email,
        clubName:club 
      }));
    if (data.message) {
        toast.success(data.message, {
          autoClose: 2000,
          position: toast.POSITION.TOP_RIGHT
        })}
        if (data.errors) {
            toast.error(data.errors, {
            autoClose: 2000,
            position: toast.POSITION.TOP_RIGHT
           })}}

           const handlecommite= async (e) =>{
            e.preventDefault()
            console.log("----------------------------",Committe)
            const res=await axiosInstance.post('/change-committe',{...Committe,clubName})
            console.log(res);
            if (res.data.errors) {
              toast.error(res.data.errors, {
              autoClose: 2000,
              position: toast.POSITION.TOP_RIGHT
             })}
            if (res.data.message) {
              toast.success(res.data.message, {
                autoClose: 2000,
                position: toast.POSITION.TOP_RIGHT
              })}
           }
  const generateError = (err) => toast.error(err, {
    autoClose: 2000,
    position: toast.POSITION.TOP_RIGHT
  })
  return (
    <div className="min-h-screen bg-primary p-12">
      <h1 className="p-4 text-3xl font-mono font-bold text-center">Club Setting</h1>
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-evenly">
          {/* Left Div */}
          <div className="w-full md:w-1/4 h-40 bg-white flex justify-center items-center rounded-lg md:mt-32 shadow-md p-4 mr-4">
            <div className="mb-4">
              <button
                className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded w-full mb-2"
                onClick={() => setShowClubDetails(true)} // Show Club Details form
              >
                Club Details
              </button>
              <button
                className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded w-full"
                onClick={() => setShowClubDetails(false)} // Show Change Committee form
              >
                Change Committee
              </button>
            </div>
          </div>

          {/* Right Div */}
          <div className="w-full md:w-2/4 bg-white rounded-lg shadow-md p-6 mt-4 md:mt-0">
            {showClubDetails ? (
              // Render Club Details form
              <div>
                <h2 className="text-2xl text-center font-semibold mb-4">Update Club Details</h2>
                <form onSubmit={handleSubmitClub} className="space-y-2">
                <div>
      <label htmlFor="clubName" className="block font-medium">
        Club Name
      </label>
      <input
        type="text"
        id="clubName"
        name="clubName"
        // value={club?.clubName}
        placeholder={club?.clubName}
        onChange={(e)=> setUpdateClub({...updateclub,[e.target.name]:e.target.value})}
        className="border border-gray-300 rounded-md p-1 w-full"
      />
    </div>
    <div>
      <label htmlFor="registerNo" className="block font-medium">
        Register No
      </label>
      <input
        type="text"
        id="registerNo"
        name="registerNo"
        // value={club?.registerNo}
        placeholder={club?.registerNo}
        onChange={(e)=> setUpdateClub({...updateclub,[e.target.name]:e.target.value})}
        className="border border-gray-300 rounded-md p-1 w-full"
      />
    </div>
    <div>
      <label htmlFor="category" className="block font-medium">
        Category
      </label>
      <input
        type="text"
        id="category"
        name="category"
        // value={club?.category}
        placeholder={club?.category}
        onChange={(e)=> setUpdateClub({...updateclub,[e.target.name]:e.target.value})}
        className="border border-gray-300 rounded-md p-1 w-full"
      />
    </div>
    <div>
      <label htmlFor="address" className="block font-medium">
        Location
      </label>
      <input
        type="text"
        id="address"
        name="address"
        // value={club?.address}
        placeholder={club?.address}
        onChange={(e)=> setUpdateClub({...updateclub,[e.target.name]:e.target.value})}
        className="border border-gray-300 rounded-md p-1 w-full"
      />
    </div>
    <div>
      <label htmlFor="about" className="block  font-medium ">
        About
      </label>
      <input
        type="text"
        id="about"
        name="about"
        // value={club?.about}
        placeholder={club?.about}
        onChange={(e)=> setUpdateClub({...updateclub,[e.target.name]:e.target.value})}
        className="border border-gray-200 rounded-md p-1 w-full"
      />
    </div>
    <div className=' flex justify-center items-center'>
    <button
      type="submit"
      className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
    >
      Update Club Data
    </button>

    </div>
                </form>
              </div>
            ) : (
              // Render Change Committee form
              <div>
                <h2 className="text-2xl text-center font-semibold mb-4">Change Committee</h2>
                <form className="space-y-2" onSubmit={handlecommite}>
                  {/* ...input fields */}
                  <div>
      <label htmlFor="president" className="block font-medium">
        President
      </label>
      <input
        type="email"
        id="president"
        name="president"
        placeholder='President Email'
        onChange={(e)=>{setCommitte({...Committe,[e.target.name]:e.target.value})}}
        className="border border-gray-300 rounded-md p-1 w-full"
      />
    </div>
    <div>
      <label htmlFor="secretory" className="block font-medium">
        Secretory
      </label>
      <input
        type="email"
        id="secretory"
        name="secretory"
        placeholder='Secretory Email'
        onChange={(e)=>{setCommitte({...Committe,[e.target.name]:e.target.value})}}
        className="border border-gray-300 rounded-md p-1 w-full"
      />
    </div>
    <div>
      <label htmlFor="treasurer" className="block font-medium">
        Treasurer
      </label>
      <input
        type="email"
        id="treasurer"
        name="treasurer"
        placeholder='Treasurer Email'
        onChange={(e)=>{setCommitte({...Committe,[e.target.name]:e.target.value})}}
        className="border border-gray-300 rounded-md p-1 w-full"
      />
    </div>
    <div className='flex justify-center items-center'>
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
      >
        Update Committee
      </button>
    </div>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
      <ToastContainer/>
    </div>
  );
}

export default ClubSetting;
















// import React, { useState } from 'react';

// function ClubSetting() {
//   const [showClubDetails, setShowClubDetails] = useState(true);
//   const [showUpdateDetails, setShowUpdateDetails] = useState(false);
//   const [showChangeCommittee, setShowChangeCommittee] = useState(false);

//   const handleShowUpdateDetails = () => {
//     setShowClubDetails(false);
//     setShowUpdateDetails(true);
//     setShowChangeCommittee(false);
//   };

//   const handleShowChangeCommittee = () => {
//     setShowClubDetails(false);
//     setShowUpdateDetails(false);
//     setShowChangeCommittee(true);
//   };

//   return (
//     <div className="min-h-screen bg-primary p-12">
//       <h1 className="p-4 text-3xl font-mono font-bold text-center">Club Setting</h1>
//       <div className="container mx-auto px-4">
//         <div className="flex flex-col md:flex-row justify-evenly">
//           {/* Left Div */}
//           <div className="w-full md:w-1/4 h-40 bg-white flex justify-center items-center rounded-lg md:mt-32 shadow-md p-4 mr-4">
//             <div className="mb-4">
//               <button
//                 className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded w-full mb-2"
//                 onClick={handleShowUpdateDetails}
//               >
//                 Club Details
//               </button>
//               <button
//                 className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded w-full"
//                 onClick={handleShowChangeCommittee}
//               >
//                 Change Committee
//               </button>
//             </div>
//           </div>

//           {/* Right Div */}
//           {showUpdateDetails && (
//             <div className="w-full md:w-2/4 bg-white rounded-lg shadow-md p-6 mt-4 md:mt-0">
//               {/* Update Club Details form */}
//               <h2 className="text-2xl font-semibold mb-4">Update Club Details</h2>
//   <form className="space-y-2"> {/* Reduced space-y */}
    // <div>
    //   <label htmlFor="clubName" className="block font-medium">
    //     Club Name
    //   </label>
    //   <input
    //     type="text"
    //     id="clubName"
    //     name="clubName"
    //     className="border border-gray-300 rounded-md p-1 w-full"
    //   />
    // </div>
    // <div>
    //   <label htmlFor="registerNo" className="block font-medium">
    //     Register No
    //   </label>
    //   <input
    //     type="text"
    //     id="registerNo"
    //     name="registerNo"
    //     className="border border-gray-300 rounded-md p-1 w-full"
    //   />
    // </div>
    // <div>
    //   <label htmlFor="category" className="block font-medium">
    //     Category
    //   </label>
    //   <input
    //     type="text"
    //     id="category"
    //     name="category"
    //     className="border border-gray-300 rounded-md p-1 w-full"
    //   />
    // </div>
    // <div>
    //   <label htmlFor="location" className="block font-medium">
    //     Location
    //   </label>
    //   <input
    //     type="text"
    //     id="location"
    //     name="location"
    //     className="border border-gray-300 rounded-md p-1 w-full"
    //   />
    // </div>
    // <div>
    //   <label htmlFor="about" className="block  font-medium ">
    //     About
    //   </label>
    //   <input
    //     type="text"
    //     id="about"
    //     name="about"
    //     className="border border-gray-200 rounded-md p-1 w-full"
    //   />
    // </div>
    // <div className=' flex justify-center items-center'>
    // <button
    //   type="submit"
    //   className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
    // >
    //   Update Club Data
    // </button>

    // </div>
//   </form>
//             </div>
//           )}

//           {showChangeCommittee && (
//             <div className="w-full md:w-2/4 bg-white rounded-lg shadow-md p-6 mt-4 md:mt-0">
//               {/* Change Committee form */}
//               <div className="w-full md:w-2/4 bg-white rounded-lg shadow-md p-6 mt-4 md:mt-0">
//   <h2 className="text-2xl font-semibold mb-4">Change Committee</h2>
//   <form className="space-y-2">
    // <div>
    //   <label htmlFor="president" className="block font-medium">
    //     President
    //   </label>
    //   <input
    //     type="text"
    //     id="president"
    //     name="president"
    //     className="border border-gray-300 rounded-md p-1 w-full"
    //   />
    // </div>
    // <div>
    //   <label htmlFor="secretary" className="block font-medium">
    //     Secretary
    //   </label>
    //   <input
    //     type="text"
    //     id="secretary"
    //     name="secretary"
    //     className="border border-gray-300 rounded-md p-1 w-full"
    //   />
    // </div>
    // <div>
    //   <label htmlFor="treasurer" className="block font-medium">
    //     Treasurer
    //   </label>
    //   <input
    //     type="text"
    //     id="treasurer"
    //     name="treasurer"
    //     className="border border-gray-300 rounded-md p-1 w-full"
    //   />
    // </div>
    // <div className='flex justify-center items-center'>
    //   <button
    //     type="submit"
    //     className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
    //   >
    //     Update Committee
    //   </button>
    // </div>
//     </form>
//     </div>
//             </div>
//           )}

//           {showClubDetails && (
//             <div className="w-full md:w-2/4 bg-white rounded-lg shadow-md p-6 mt-4 md:mt-0">
//               {/* Club Details form */}
//               <h2 className="text-2xl font-semibold mb-4">Update Club Details</h2>
//   <form className="space-y-2"> {/* Reduced space-y */}
//     <div>
//       <label htmlFor="clubName" className="block font-medium">
//         Club Name
//       </label>
//       <input
//         type="text"
//         id="clubName"
//         name="clubName"
//         className="border border-gray-300 rounded-md p-1 w-full"
//       />
//     </div>
//     <div>
//       <label htmlFor="registerNo" className="block font-medium">
//         Register No
//       </label>
//       <input
//         type="text"
//         id="registerNo"
//         name="registerNo"
//         className="border border-gray-300 rounded-md p-1 w-full"
//       />
//     </div>
//     <div>
//       <label htmlFor="category" className="block font-medium">
//         Category
//       </label>
//       <input
//         type="text"
//         id="category"
//         name="category"
//         className="border border-gray-300 rounded-md p-1 w-full"
//       />
//     </div>
//     <div>
//       <label htmlFor="location" className="block font-medium">
//         Location
//       </label>
//       <input
//         type="text"
//         id="location"
//         name="location"
//         className="border border-gray-300 rounded-md p-1 w-full"
//       />
//     </div>
//     <div>
//       <label htmlFor="about" className="block  font-medium ">
//         About
//       </label>
//       <input
//         type="text"
//         id="about"
//         name="about"
//         className="border border-gray-200 rounded-md p-1 w-full"
//       />
//     </div>
//     <div className=' flex justify-center items-center'>
//     <button
//       type="submit"
//       className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
//     >
//       Update Club Data
//     </button>

//     </div>
//   </form>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default ClubSetting;


















// import React from 'react';

// function ClubSetting() {
//   return (
//     <div className="min-h-screen bg-primary p-12">
//         <h1 className=' p-4 text-3xl font-mono font-bold text-center'> Club Setting</h1>
//       <div className="container mx-auto px-4">
//         <div className="flex flex-col md:flex-row justify-evenly">
//           {/* Left Div */}
//           <div className="w-full md:w-1/4 h-40 bg-white flex justify-center items-center rounded-lg md:mt-40 shadow-md p-4 mr-4">
//             <div className="mb-4">
//               <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded w-full mb-2">
//                 Club Details
//               </button>
//               <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded w-full">
//                 Change Committee
//               </button>
//             </div>
//           </div>

//           {/* Right Div */}
//           <div className="w-full md:w-2/4 bg-white rounded-lg shadow-md p-6 mt-4 md:mt-0">
//   <h2 className="text-2xl font-semibold mb-4">Update Club Details</h2>
//   <form className="space-y-2"> {/* Reduced space-y */}
//     <div>
//       <label htmlFor="clubName" className="block font-medium">
//         Club Name
//       </label>
//       <input
//         type="text"
//         id="clubName"
//         name="clubName"
//         className="border border-gray-300 rounded-md p-1 w-full"
//       />
//     </div>
//     <div>
//       <label htmlFor="registerNo" className="block font-medium">
//         Register No
//       </label>
//       <input
//         type="text"
//         id="registerNo"
//         name="registerNo"
//         className="border border-gray-300 rounded-md p-1 w-full"
//       />
//     </div>
//     <div>
//       <label htmlFor="category" className="block font-medium">
//         Category
//       </label>
//       <input
//         type="text"
//         id="category"
//         name="category"
//         className="border border-gray-300 rounded-md p-1 w-full"
//       />
//     </div>
//     <div>
//       <label htmlFor="location" className="block font-medium">
//         Location
//       </label>
//       <input
//         type="text"
//         id="location"
//         name="location"
//         className="border border-gray-300 rounded-md p-1 w-full"
//       />
//     </div>
//     <div>
//       <label htmlFor="about" className="block  font-medium ">
//         About
//       </label>
//       <input
//         type="text"
//         id="about"
//         name="about"
//         className="border border-gray-200 rounded-md p-1 w-full"
//       />
//     </div>
//     <div className=' flex justify-center items-center'>
//     <button
//       type="submit"
//       className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
//     >
//       Update Club Data
//     </button>

//     </div>
//   </form>
// </div>

//         </div>
//       </div>
//     </div>
//   );
// }

// export default ClubSetting;
