import React, { useState,useEffect } from 'react';
import { axiosInstance } from '../../../../Api/config';
import { useDispatch, useSelector } from 'react-redux';
import { updateUser } from '../../../redux/UserSlice/UserSlice';
import { ToastContainer,toast } from 'react-toastify'
import Loader from '../../Loader/Loader';


function ClubSetting() {
    const dispatch=useDispatch()
    const user=useSelector(state=>state.user)
    const {clubName}=useSelector((state)=>state.user)
    const [loading, setLoading] = useState(false);
  const [showClubDetails, setShowClubDetails] = useState(true); 
  const [updateclub,setUpdateClub]=useState({
    clubName:"",
    registerNo:"",
    address:"",
    category:"",
    about:""
  })
  const [Committe,setCommitte]=useState({
    president:"",
    secretory:"",
    treasurer:""
  })
  const [club,setClub]=useState([])
  const [errors, setErrors] = useState({
    clubName:"",
    registerNo:"",
    address:"",
    category:"",
    about:"",
    president:"",
    treasurer:"",
    secretory:""
  });
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

   const validateClubName = (clubName) => {
    if (!clubName.trim()) {
      return "Please Enter ClubName";
    }
    return "";
  };
  const validateRegisterNo = (registerNo) => {
    if (!registerNo.trim()) {
      return "Please enter Secretary Email";
    }
    // if (isNaN(Number(amount))) {
    //   return "Amount must be in Number";
    // }
    return "";
  };
  const validateAddress = (address) => {
    if (!address.trim()) {
      return "Please Enter Club Location";
    }
    return "";
  };
  const Validatecategory = (category) => {
    if (!category.trim()) {
      return "Please Enter  Club Category";
    }
    return "";
  };
  const validateAbout = (about) => {
    if (!about.trim()) {
      return "Please Enter About Your Club";
    }
    return "";
  };
  
  const handleSubmitClub= async (e) => {
    e.preventDefault()
    const ClubNameError = validateClubName(updateclub.clubName);
    const RegisterNoError = validateRegisterNo(updateclub.registerNo);
    const AddressError = validateAddress(updateclub.address);
    const CategoryError = Validatecategory(updateclub.category);
    const AboutError = validateAbout(updateclub.about);
    if (ClubNameError ||  RegisterNoError || AddressError || CategoryError || AboutError ) {
  setErrors({
    ...errors,
    clubName:ClubNameError,
    registerNo:RegisterNoError,
    address:AddressError,
    category:CategoryError,
    about:AboutError
  });
  return;
}

    console.log(updateclub)
    setLoading(true)
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
      setLoading(false)
    if (data.message) {
        toast.success(data.message)}
        if (data.errors) {
            toast.error(data.errors)}
          }

          const validatePresident = (president) => {
            if (!president.trim()) {
              return "Please enter President Email";
            }
            return "";
          };
          const validateSecretory = (secretory) => {
            if (!secretory.trim()) {
              return "Please enter Secretary Email";
            }
            return "";
          };
          const validateTreasurer = (treasurer) => {
            if (!treasurer.trim()) {
              return "Please enter Treasurer Email";
            }
            return "";
          };

           const handlecommite= async (e) =>{
            e.preventDefault()
            try {
              console.log("----------------------------",Committe)
              const presidetError = validatePresident(Committe.president);
              const secretoryError = validateSecretory(Committe.secretory);
              const treasurerError = validateTreasurer(Committe.treasurer);
              if (presidetError  || secretoryError || treasurerError ) {
                setErrors({
                  ...errors,
                  president: presidetError,
                  secretory: secretoryError,
                  treasurer: treasurerError
                });
                return;
              }
              const res=await axiosInstance.post('/change-committe',{...Committe,clubName})
              console.log(res);
              if (res.data.errors) {
                toast.error(res.data.errors)}
              if (res.data.message) {
                toast.success(res.data.message)}
              
            } catch (error) {
              
            }
           }
  
  return (
    <div className="min-h-screen bg-primary p-4">
      {loading && <Loader/>}
      <h1 className="p-4 text-3xl font-mono font-bold text-center">Club Setting</h1>
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-evenly">
          {/* Left Div */}
          <div className="w-full md:w-1/4 h-40 bg-white flex justify-center items-center rounded-lg md:mt-32 shadow-md p-4 mr-4">
            <div className="mb-4">
              <button
                className="bg-primary  text-white py-2 px-4 rounded w-full mb-2"
                onClick={() => setShowClubDetails(true)} // Show Club Details form
              >
                Club Details
              </button>
              <button
                className="bg-primary  text-white py-2 px-4 rounded w-full"
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
        onChange={(e) => {
          setUpdateClub({...updateclub,[e.target.name]:e.target.value})
          setErrors({ ...errors, clubName: validateClubName(e.target.value) });
          setErrors({});
        }}
        className={`border border-gray-300 rounded-md p-1 w-full ${
          errors.clubName && "border-red-500"
        }`}
      />
      {errors.clubName && <p className="text-red-500">{errors.clubName}</p>}
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
        onChange={(e) => {
          setUpdateClub({...updateclub,[e.target.name]:e.target.value})
          setErrors({ ...errors, registerNo: validateRegisterNo(e.target.value) });
          setErrors({});
        }}
        className={`border border-gray-300 rounded-md p-1 w-full ${
          errors.registerNo && "border-red-500"
        }`}
      />
      {errors.registerNo && <p className="text-red-500">{errors.registerNo}</p>}
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
        onChange={(e) => {
          setUpdateClub({...updateclub,[e.target.name]:e.target.value})
          setErrors({ ...errors, category: Validatecategory(e.target.value) });
          setErrors({});
        }}
        className={`border border-gray-300 rounded-md p-1 w-full ${
          errors.category && "border-red-500"
        }`}
      />
      {errors.category && <p className="text-red-500">{errors.category}</p>}
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
        onChange={(e) => {
          setUpdateClub({...updateclub,[e.target.name]:e.target.value})
          setErrors({ ...errors, address: validateAddress(e.target.value) });
          setErrors({});
        }}
        className={`border border-gray-300 rounded-md p-1 w-full ${
          errors.address && "border-red-500"
        }`}
      />
      {errors.address && <p className="text-red-500">{errors.address}</p>}
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
          onChange={(e) => {
            setUpdateClub({...updateclub,[e.target.name]:e.target.value})
            setErrors({ ...errors, about: validateAbout(e.target.value) });
            setErrors({});
          }}
          className={`border border-gray-300 rounded-md p-1 w-full ${
            errors.about && "border-red-500"
          }`}
        />
        {errors.about && <p className="text-red-500">{errors.about}</p>}
      </div>
    <div className=' flex justify-center items-center'>
    <button
      type="submit"
      className="bg-primary text-white py-2 px-4 rounded"
    >
      Update Club Data
    </button>

    </div>
                </form>
              </div>
            ) : (
             
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
        onChange={(e)=>{
          setCommitte({...Committe,[e.target.name]:e.target.value})
          setErrors({ ...errors, president: validatePresident(e.target.value) });
          setErrors({})
        }}
        className={`border border-gray-300 rounded-md p-1 w-full ${
          errors.president && "border-red-500"
        }`}
      />
       {errors.president && <p className="text-red-500">{errors.president}</p>}
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
        onChange={(e)=>{
          setCommitte({...Committe,[e.target.name]:e.target.value})
          setErrors({ ...errors, secretory: validateSecretory(e.target.value) });
          setErrors({})
        }}
        className={`border border-gray-300 rounded-md p-1 w-full ${
          errors.secretory && "border-red-500"
        }`}
      />
       {errors.secretory && <p className="text-red-500">{errors.secretory}</p>}
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
        onChange={(e)=>{
          setCommitte({...Committe,[e.target.name]:e.target.value})
          setErrors({ ...errors, treasurer: validateTreasurer(e.target.value) });
          setErrors({})
        }}
        className={`border border-gray-300 rounded-md p-1 w-full ${
          errors.treasurer && "border-red-500"
        }`}
      />
       {errors.treasurer && <p className="text-red-500">{errors.treasurer}</p>}
    </div>
    <div className='flex justify-center items-center'>
      <button
        type="submit"
        className="bg-primary text-white py-2 px-4 rounded"
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







    // const regex = {
    //     registerNo: /^\d{6}$/gm,
    //   }
    //   if (updateclub.registerNo === "") {
    //     generateError("Please Enter Your registerNo ")
    //     return;
    //   } else if (!regex.registerNo.test(updateclub.registerNo)) {
    //     generateError("registerNo: Only contain six digit")
    //     return;
    //   } else if (updateclub.address === "") {
    //     generateError("Please Enter Your  Address")
    //     return;
    //   } else if (updateclub.category === "") {
    //     generateError("Please Enter Your  Club category ")
    //     return;
    //   } else if (updateclub.about === "") {
    //     generateError("description is required")
    //     return;
    //   }














// import React, { useState,useEffect } from 'react';
// import { axiosInstance } from '../../../../Api/config';
// import { useDispatch, useSelector } from 'react-redux';
// import { updateUser } from '../../../redux/UserSlice/UserSlice';
// import { ToastContainer,toast } from 'react-toastify'
// import Loader from '../../Loader/Loader';


// function ClubSetting() {
//     const dispatch=useDispatch()
//     const user=useSelector(state=>state.user)
//     const {clubName}=useSelector((state)=>state.user)
//     const [loading, setLoading] = useState(false);
//   const [showClubDetails, setShowClubDetails] = useState(true); 
//   const [updateclub,setUpdateClub]=useState({
//     clubName:"",
//     registerNo:"",
//     address:"",
//     category:"",
//     about:""
//   })
//   const [Committe,setCommitte]=useState({
//     president:"",
//     secretory:"",
//     treasurer:""
//   })
//   const [club,setClub]=useState([])
//   const [errors, setErrors] = useState({
//     clubName:"",
//     registerNo:"",
//     address:"",
//     category:"",
//     about:"",
//     president:"",
//     treasurer:"",
//     secretory:""
//   });
//    useEffect(()=>{
//         fetchdata()
//    },[])
//    const fetchdata=async()=>{
//     const res=await axiosInstance.get('/get-clubform',{
//         params:{clubName}
//     })
//     console.log(res)
//     setClub(res.data.club)
//    }
//   const handleSubmitClub= async (e) => {
//     e.preventDefault()
//     if (updateclub.clubName.trim() === "" &&updateclub.registerNo.trim() === "" &&
//     updateclub.address.trim() === "" &&updateclub.category.trim() === "" &&updateclub.about.trim() === "" ) {
//   setErrors({
//     ...errors,
//     clubName:"Enter ClubName",
//     registerNo:"Enter Register Number",
//     address:"Enter Club Location",
//     category:"Enter Club Category",
//     about:"Enter The Description"
//   });
//   return;
// }
//     const regex = {
//         registerNo: /^\d{6}$/gm,
//       }
//       if (updateclub.registerNo === "") {
//         generateError("Please Enter Your registerNo ")
//         return;
//       } else if (!regex.registerNo.test(updateclub.registerNo)) {
//         generateError("registerNo: Only contain six digit")
//         return;
//       } else if (updateclub.address === "") {
//         generateError("Please Enter Your  Address")
//         return;
//       } else if (updateclub.category === "") {
//         generateError("Please Enter Your  Club category ")
//         return;
//       } else if (updateclub.about === "") {
//         generateError("description is required")
//         return;
//       }
//     console.log(updateclub)
//     setLoading(true)
//     const {data}= await axiosInstance.post('/update-club',{...updateclub,club:clubName})
//     console.log(data);
//     console.log("response of updation",data.getclub.clubName)
//     const club=data.getclub.clubName
//     console.log("clubdssss",club);
//     dispatch(updateUser({
//         id:user.id,
//         username:user.username,
//         email:user.email,
//         clubName:club 
//       }));
//       setLoading(false)
//     if (data.message) {
//         toast.success(data.message)}
//         if (data.errors) {
//             toast.error(data.errors)}
//           }

//           const validatePresident = (president) => {
//             if (!president.trim()) {
//               return "Please enter President Email";
//             }
//             return "";
//           };
//           const validateSecretory = (secretory) => {
//             if (!secretory.trim()) {
//               return "Please enter Secretary Email";
//             }
//             return "";
//           };
//           const validateTreasurer = (treasurer) => {
//             if (!treasurer.trim()) {
//               return "Please enter Treasurer Email";
//             }
//             return "";
//           };

//            const handlecommite= async (e) =>{
//             e.preventDefault()
//             try {
//               console.log("----------------------------",Committe)
//               const presidetError = validatePresident(Committe.president);
//               const secretoryError = validateSecretory(Committe.secretory);
//               const treasurerError = validateTreasurer(Committe.treasurer);
//               if (presidetError  || secretoryError || treasurerError ) {
//                 setErrors({
//                   ...errors,
//                   president: presidetError,
//                   secretory: secretoryError,
//                   treasurer: treasurerError
//                 });
//                 return;
//               }
//               const res=await axiosInstance.post('/change-committe',{...Committe,clubName})
//               console.log(res);
//               if (res.data.errors) {
//                 toast.error(res.data.errors)}
//               if (res.data.message) {
//                 toast.success(res.data.message)}
              
//             } catch (error) {
              
//             }
//            }
  
//   return (
//     <div className="min-h-screen bg-primary p-4">
//       {loading && <Loader/>}
//       <h1 className="p-4 text-3xl font-mono font-bold text-center">Club Setting</h1>
//       <div className="container mx-auto px-4">
//         <div className="flex flex-col md:flex-row justify-evenly">
//           {/* Left Div */}
//           <div className="w-full md:w-1/4 h-40 bg-white flex justify-center items-center rounded-lg md:mt-32 shadow-md p-4 mr-4">
//             <div className="mb-4">
//               <button
//                 className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded w-full mb-2"
//                 onClick={() => setShowClubDetails(true)} // Show Club Details form
//               >
//                 Club Details
//               </button>
//               <button
//                 className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded w-full"
//                 onClick={() => setShowClubDetails(false)} // Show Change Committee form
//               >
//                 Change Committee
//               </button>
//             </div>
//           </div>

//           {/* Right Div */}
//           <div className="w-full md:w-2/4 bg-white rounded-lg shadow-md p-6 mt-4 md:mt-0">
//             {showClubDetails ? (
//               // Render Club Details form
//               <div>
//                 <h2 className="text-2xl text-center font-semibold mb-4">Update Club Details</h2>
//                 <form onSubmit={handleSubmitClub} className="space-y-2">
//                 <div>
//       <label htmlFor="clubName" className="block font-medium">
//         Club Name
//       </label>
//       <input
//         type="text"
//         id="clubName"
//         name="clubName"
//         // value={club?.clubName}
//         placeholder={club?.clubName}
//         onChange={(e) => {
//           setUpdateClub({...updateclub,[e.target.name]:e.target.value})
//           setErrors({});
//         }}
//         className={`border border-gray-300 rounded-md p-1 w-full ${
//           errors.clubName && "border-red-500"
//         }`}
//       />
//       {errors.clubName && <p className="text-red-500">{errors.clubName}</p>}
//     </div>

  



//     <div>
//       <label htmlFor="registerNo" className="block font-medium">
//         Register No
//       </label>
//       <input
//         type="text"
//         id="registerNo"
//         name="registerNo"
//         // value={club?.registerNo}
//         placeholder={club?.registerNo}
//         onChange={(e) => {
//           setUpdateClub({...updateclub,[e.target.name]:e.target.value})
//           setErrors({});
//         }}
//         className={`border border-gray-300 rounded-md p-1 w-full ${
//           errors.registerNo && "border-red-500"
//         }`}
//       />
//       {errors.registerNo && <p className="text-red-500">{errors.registerNo}</p>}
//     </div>
//     <div>
//       <label htmlFor="category" className="block font-medium">
//         Category
//       </label>
//       <input
//         type="text"
//         id="category"
//         name="category"
//         // value={club?.category}
//         placeholder={club?.category}
//         onChange={(e) => {
//           setUpdateClub({...updateclub,[e.target.name]:e.target.value})
//           setErrors({});
//         }}
//         className={`border border-gray-300 rounded-md p-1 w-full ${
//           errors.category && "border-red-500"
//         }`}
//       />
//       {errors.category && <p className="text-red-500">{errors.category}</p>}
//       </div>
//     <div>
//       <label htmlFor="address" className="block font-medium">
//         Location
//       </label>
//       <input
//         type="text"
//         id="address"
//         name="address"
//         // value={club?.address}
//         placeholder={club?.address}
//         onChange={(e) => {
//           setUpdateClub({...updateclub,[e.target.name]:e.target.value})
//           setErrors({});
//         }}
//         className={`border border-gray-300 rounded-md p-1 w-full ${
//           errors.address && "border-red-500"
//         }`}
//       />
//       {errors.address && <p className="text-red-500">{errors.address}</p>}
//     </div>
//       <div>
//         <label htmlFor="about" className="block  font-medium ">
//           About
//         </label>
//         <input
//           type="text"
//           id="about"
//           name="about"
//           // value={club?.about}
//           placeholder={club?.about}
//           onChange={(e) => {
//             setUpdateClub({...updateclub,[e.target.name]:e.target.value})
//             setErrors({});
//           }}
//           className={`border border-gray-300 rounded-md p-1 w-full ${
//             errors.about && "border-red-500"
//           }`}
//         />
//         {errors.about && <p className="text-red-500">{errors.about}</p>}
//       </div>
//     <div className=' flex justify-center items-center'>
//     <button
//       type="submit"
//       className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
//     >
//       Update Club Data
//     </button>

//     </div>
//                 </form>
//               </div>
//             ) : (
             
//               <div>
//                 <h2 className="text-2xl text-center font-semibold mb-4">Change Committee</h2>
//                 <form className="space-y-2" onSubmit={handlecommite}>
//                   {/* ...input fields */}
//                   <div>
//       <label htmlFor="president" className="block font-medium">
//         President
//       </label>
//       <input
//         type="email"
//         id="president"
//         name="president"
//         placeholder='President Email'
//         onChange={(e)=>{
//           setCommitte({...Committe,[e.target.name]:e.target.value})
//           setErrors({ ...errors, president: validatePresident(e.target.value) });
//           setErrors({})
//         }}
//         className={`border border-gray-300 rounded-md p-1 w-full ${
//           errors.president && "border-red-500"
//         }`}
//       />
//        {errors.president && <p className="text-red-500">{errors.president}</p>}
//     </div>
//     <div>
//       <label htmlFor="secretory" className="block font-medium">
//         Secretory
//       </label>
//       <input
//         type="email"
//         id="secretory"
//         name="secretory"
//         placeholder='Secretory Email'
//         onChange={(e)=>{
//           setCommitte({...Committe,[e.target.name]:e.target.value})
//           setErrors({ ...errors, secretory: validateSecretory(e.target.value) });
//           setErrors({})
//         }}
//         className={`border border-gray-300 rounded-md p-1 w-full ${
//           errors.secretory && "border-red-500"
//         }`}
//       />
//        {errors.secretory && <p className="text-red-500">{errors.secretory}</p>}
//     </div>
//     <div>
//       <label htmlFor="treasurer" className="block font-medium">
//         Treasurer
//       </label>
//       <input
//         type="email"
//         id="treasurer"
//         name="treasurer"
//         placeholder='Treasurer Email'
//         onChange={(e)=>{
//           setCommitte({...Committe,[e.target.name]:e.target.value})
//           setErrors({ ...errors, treasurer: validateTreasurer(e.target.value) });
//           setErrors({})
//         }}
//         className={`border border-gray-300 rounded-md p-1 w-full ${
//           errors.treasurer && "border-red-500"
//         }`}
//       />
//        {errors.treasurer && <p className="text-red-500">{errors.treasurer}</p>}
//     </div>
//     <div className='flex justify-center items-center'>
//       <button
//         type="submit"
//         className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
//       >
//         Update Committee
//       </button>
//     </div>
//                 </form>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//       <ToastContainer/>
//     </div>
//   );
// }

// export default ClubSetting;





























