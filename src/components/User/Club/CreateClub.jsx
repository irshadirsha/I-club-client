import React, { useState } from 'react'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify'
// import 'react-toastify/dist/ReactToastify.css';
import { axiosInstance } from '../../../../Api/config';
import { NavLink, Navigate, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { updateUser } from '../../../redux/UserSlice/UserSlice';
import Loader from '../../Loader/Loader';
function CreateClub() {
  const dispatch=useDispatch()
  const user=useSelector(state=>state.user)
  console.log("current user===....",user);
  console.log("user....",user.id);
  
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false);
  const [createClub, setCreateClub] = useState({
    clubName: "",
    registerNo: "",
    address: "",
    category: "",
    securityCode: "",
    // confirmSecurityCode: "",
    secretory: "",
    treasurer: ""
  })
  const [errors, setErrors] = useState({
    clubName: "",
    registerNo: "",
    address: "",
    category: "",
    securityCode: "",
    secretory: "",
    treasurer: "",
    general: "",
  });

  const handleClubSubmit = async (e) => {
    e.preventDefault()
    try {
      if (createClub.clubName.trim() === "" &&
      createClub.registerNo.trim() === "" &&
      createClub.address.trim() === "" &&
      createClub.category.trim() === "" &&
      createClub.securityCode.trim() === "" &&
      createClub.secretory.trim() === "" &&
      createClub.treasurer.trim() === ""   ) {
        setErrors({
          ...errors,
          clubName: "ClubName is empty",
          registerNo: "RegisterNo code is empty",
          address: "Address  is empty",
          category: "Category  is empty",
          securityCode: "Security Code  is empty",
          secretory: "Secretory  is empty",
          treasurer: "Treasurer  is empty",
        });
        return;
      }

      const regex = {
        registerNo: /^\d{6}$/gm,
        securityCode: /^\d{6}$/gm,
        email : /^[^\s@]+@[^\s@]+\.[^\s@]+$/gm,
        tremail : /^[^\s@]+@[^\s@]+\.[^\s@]+$/gm
      }
      if (createClub.registerNo === "") {
        generateError("Enter Your register Number")
        return;
      } else if (!regex.registerNo.test(createClub.registerNo)) {
        generateError("registerNo: Only contain six digit")
        return;
      } else if (createClub.address === "") {
        generateError("Enter your club Address")
        return;
      } else if (createClub.category === "") {
        generateError("Enter Your Club Category")
        return;
      } else if (createClub.securityCode === "") {
        generateError("Enter Your Security Code")
        return;
      }else if (!regex.securityCode.test(createClub.securityCode)) {
        generateError("securityCode must contain six digit")
        return;
      }else if (createClub.secretory === "") {
        generateError("Please Enter Secretary Email")
        return; 
      } else if (!regex.email.test(createClub.secretory)) {
        generateError("Enter a Valid Secretory Email")
        return;
        }else if (createClub.treasurer === "") {
        generateError("Please Enter Treasurer Email")
        return; 
      } else if (!regex.tremail.test(createClub.treasurer)) {
        console.log(createClub.treasurer);
        generateError("Enter a Valid Treasurer Email")
        return;
      }

      console.log(createClub)
      setLoading(true)
      const response = await axiosInstance.post('/createclub', { ...createClub }, { withCredentials: true });
      console.log("response", response.data);

      if (response.data.message) {
        toast.success(response.data.message);
      }
      if (response.data.created === true) {
        const userRole = "president";
        const club = response.data.newclubs.clubName;
        
        dispatch(updateUser({
          id:user.id,
          username:user.username,
          email:user.email,
          clubName:club 
        }));
        setLoading(false)
        navigate('/clubhome', { state: { userRole, club } });
      }

      if (response.data.errors) {
        setLoading(false)
        toast.error(response.data.errors);
      }
    } catch (error) {
     console.log("error");
    }
  }
  const generateError = (err) => toast.error(err, {
    autoClose: 2000,
    position: toast.POSITION.TOP_RIGHT
  })

  return (
    <div>
      {loading && <Loader/>}
      {/* <section className={`bg-primary overflow-y-hidden ${loading && disabled:}`}> */}
      <section className={`bg-primary overflow-y-hidden ${loading ? 'pointer-events-none' : ''}`}>

        <div className="container px-4 md:px-5 text-center md:text-left my-5 pt-6">
          <div className=" md:flex md:gap-x-6 md:items-center mb-10">
            <div className=" mt-4 md:w-1/2 md:pl-8 mb-5  md:mb-0 z-10">
              <h1 className="my-5 text-5xl font-bold tracking-tight hero-title text-hsl(0, 0%, 0%)">
                I-Club <br />
                <span className="text-hsl(27, 36%, 21%)">We Connects People</span>
              </h1>
              <p className="mb-4  opacity-70 text-hsl(219, 43%, 21%)">
                Empowering Hearts, Building Bridges - The Power of Togetherness.
              </p>
            </div>
            <div className="px-10 md:w-1/2 relative">
              <div id="radius-shape-1" className="absolute rounded-circle shadow-5-strong"></div>
              <div id="radius-shape-2" className="absolute shadow-5-strong"></div>
              {/* /////////////////////// */}

              <div className="bg-glass rounded-lg   ">

                <div className='text-center text-4xl font-semibold pt-5 '>
                  <h1>Register Club</h1>
                </div>


                <form>

                <div className="form-outline mb-2 text-center pt-3">
                {/* <label htmlFor="form3Example1" className="block text-gray-600  text-sm mb-1">
                 ClubName
                </label> */}
                <input
                  type="text"
                  id="form3Example1"
                  name="clubName"
                  placeholder="Enter your ClubName"
                  onChange={(e) => {
                    setCreateClub({ ...createClub, [e.target.name]: e.target.value })
                    setErrors({});
                  }}
                  className={`form-control p-2 w-4/6 drop-shadow-md rounded-lg text-black border-current border outline-slate-300 ${
                    errors.clubName && "border-red-500"
                  }`}
                />
                {errors.clubName && <p className="text-red-500">{errors.clubName}</p>}
              </div>

              <div className="form-outline mb-2 text-center pt-2">
                {/* <label htmlFor="form3Example1" className="block text-gray-600  text-sm mb-1">
                 RegisterNo
                </label> */}
                <input
                  type="text"
                  id="form3Example2"
                  name="registerNo"
                  placeholder="Enter your RegisterNo"
                  onChange={(e) => {
                    setCreateClub({ ...createClub, [e.target.name]: e.target.value })
                    setErrors({});
                  }}
                  className={`form-control p-2 w-4/6 drop-shadow-md rounded-lg border-current border outline-slate-300 ${
                    errors.registerNo && "border-red-500"
                  }`}
                />
                {errors.registerNo && <p className="text-red-500">{errors.registerNo}</p>}
              </div>
                  
              <div className="form-outline mb-2 text-center pt-2">
                {/* <label htmlFor="form3Example1" className="block text-gray-600  text-sm mb-1">
                 Address
                </label> */}
                <input
                  type="text"
                  id="form3Example3"
                  name="address"
                  placeholder="Enter your Address"
                  onChange={(e) => {
                    setCreateClub({ ...createClub, [e.target.name]: e.target.value })
                    setErrors({});
                  }}
                  className={`form-control p-2 w-4/6 drop-shadow-md rounded-lg border-current border outline-slate-300 ${
                    errors.address && "border-red-500"
                  }`}
                />
                {errors.address && <p className="text-red-500">{errors.address}</p>}
              </div>
              
              <div className="form-outline mb-2 text-center pt-2">
                {/* <label htmlFor="form3Example1" className="block text-gray-600  text-sm mb-1">
                 Category
                </label> */}
                <input
                  type="text"
                  id="form3Example4"
                  name="category"
                  placeholder="Enter your Club Category"
                  onChange={(e) => {
                    setCreateClub({ ...createClub, [e.target.name]: e.target.value })
                    setErrors({});
                  }}
                  className={`form-control p-2 w-4/6 drop-shadow-md rounded-lg border-current border outline-slate-300 ${
                    errors.category && "border-red-500"
                  }`}
                />
                {errors.category && <p className="text-red-500">{errors.category}</p>}
              </div>
                   
              <div className="form-outline mb-2 text-center pt-2">
                {/* <label htmlFor="form3Example1" className="block text-gray-600  text-sm mb-1">
                 SecurityCode
                </label> */}
                <input
                  type="text"
                  id="form3Example5"
                  name="securityCode"
                  placeholder="Enter your SecurityCode"
                  onChange={(e) => {
                    setCreateClub({ ...createClub, [e.target.name]: e.target.value })
                    setErrors({});
                  }}
                  className={`form-control p-2 w-4/6 drop-shadow-md rounded-lg border-current border outline-slate-300 ${
                    errors.securityCode && "border-red-500"
                  }`}
                />
                {errors.securityCode && <p className="text-red-500">{errors.securityCode}</p>}
              </div>
                 
              <div className="form-outline mb-2 text-center pt-2">
                {/* <label htmlFor="form3Example1" className="block text-gray-600  text-sm mb-1">
                Secretory Email
                </label> */}
                <input
                  type="email"
                  id="form3Example7"
                  name="secretory"
                  placeholder="Enter your Secretory Email "
                  onChange={(e) => {
                    setCreateClub({ ...createClub, [e.target.name]: e.target.value })
                    setErrors({});
                  }}
                  className={`form-control p-2 w-4/6 drop-shadow-md rounded-lg border-current border outline-slate-300 ${
                    errors.secretory && "border-red-500"
                  }`}
                />
                {errors.secretory && <p className="text-red-500">{errors.secretory}</p>}
              </div>
              <div className="form-outline mb-2 text-center pt-2">
                {/* <label htmlFor="form3Example1" className="block text-gray-600  text-sm mb-1">
                Treasurer Email
                </label> */}
                <input
                  type="email"
                  id="form3Example8"
                  name="treasurer"
                  placeholder="Enter your treasurer Email "
                  onChange={(e) => {
                    setCreateClub({ ...createClub, [e.target.name]: e.target.value })
                    setErrors({});
                  }}
                  className={`form-control p-2 w-4/6 drop-shadow-md rounded-lg border-current border outline-slate-300 ${
                    errors.treasurer && "border-red-500"
                  }`}
                />
                {errors.treasurer && <p className="text-red-500">{errors.treasurer}</p>}
              </div>
                  

                  <div className='text-center  flex justify-center items-center'>
                    <div className='text-center p-2 border-2 border-slate-500 borde bg-primary w-32  rounded-xl text-white'>
                      <button onClick={handleClubSubmit}>Register</button>
                    </div>
                  </div>
                  <div className="pb-3 text-center">
                    <hr className="my-3"></hr>
                    <NavLink to='/' className="text-rgb(0, 0, 0) no-underline"exact>
                      Home
                    </NavLink>
                  </div>

                </form>
              </div>
            </div>
          </div>
        </div>

      </section>
      
      <ToastContainer />
    </div>
  )
}

export default CreateClub














 {/* <div className="form-outline mb-2 text-center pt-1"> */}
                {/* <label htmlFor="form3Example1" className="block text-gray-600  text-sm mb-1">
                 Confirm SecurityCode
                </label> */}
                {/* <input
                  type="text"
                  id="form3Example6"
                  name="confirmSecurityCode"
                  placeholder="Enter your Confirm SecurityCode"
                  onChange={(e) => {
                    setCreateClub({ ...createClub, [e.target.name]: e.target.value })
                    setErrors({});
                  }}
                  className={`form-control p-2 w-4/6 drop-shadow-md rounded-lg border-current border outline-slate-300 ${
                    errors.confirmSecurityCode && "border-red-500"
                  }`}
                />
                {errors.confirmSecurityCode && <p className="text-red-500">{errors.confirmSecurityCode}</p>}
              </div> */}
// import React, { useState } from 'react'
// import axios from 'axios'
// import { ToastContainer, toast } from 'react-toastify'
// import 'react-toastify/dist/ReactToastify.css';
// import { axiosInstance } from '../../../../Api/config';
// import { Navigate, useNavigate } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
// import { updateUser } from '../../../redux/UserSlice/UserSlice';

// function CreateClub() {
//   const dispatch=useDispatch()
//   const user=useSelector(state=>state.user)
//   console.log("current user===....",user);
//   console.log("user....",user.id);
  
//   const navigate = useNavigate()
//   const [createClub, setCreateClub] = useState({
//     clubName: "",
//     registerNo: "",
//     address: "",
//     category: "",
//     securityCode: "",
//     confirmSecurityCode: "",
//     secretory: "",
//     treasurer: ""
//   })
//   const [errors, setErrors] = useState({
//     clubName: "",
//     registerNo: "",
//     address: "",
//     category: "",
//     securityCode: "",
//     confirmSecurityCode: "",
//     secretory: "",
//     treasurer: "",
//     general: "",
//   });

//   const handleClubSubmit = async (e) => {
//     e.preventDefault()
//     try {
//       if (createClub.securityCode !== createClub.confirmSecurityCode) {
//         generateError("securityCode do not match");
//         return;
//       }

//       const regex = {
//         clubName: /^[A-Za-z]{3,11}$/gm,
//         registerNo: /^\d{6}$/gm,
//         securityCode: /^\d{6}$/gm,
//         confirmSecurityCode: /^\d{6}$/gm,
//       }
//       if (createClub.clubName === "") {
//         generateError("Name is required")
//         return;
//       } else if (!regex.clubName.test(createClub.clubName)) {
//         generateError("Name: Only allowed characters and space")
//         return;
//       } else if (createClub.registerNo === "") {
//         generateError("registerNo is required")
//         return;
//       } else if (!regex.registerNo.test(createClub.registerNo)) {
//         generateError("registerNo: Only contain six digit")
//         return;
//       } else if (createClub.address === "") {
//         generateError("address is required")
//         return;
//       } else if (createClub.category === "") {
//         generateError("category is required")
//         return;
//       } else if (createClub.securityCode === "") {
//         generateError("securityCode is required")
//         return;
//       } else if (!regex.securityCode.test(createClub.securityCode)) {
//         generateError("securityCode must be six digit")
//         return;
//       } else if (createClub.confirmSecurityCode === "") {
//         generateError("confirmSecurityCode is required")
//         return;
//       } else if (!regex.confirmSecurityCode.test(createClub.confirmSecurityCode)) {
//         generateError("confirmSecurityCode must be number and letter")
//         return;
//       }

//       console.log(createClub)
//       const response = await axiosInstance.post('/createclub', { ...createClub }, { withCredentials: true });
//       console.log("response", response.data);

//       if (response.data.message) {
//         toast.success(response.data.message);
//       }
//       if (response.data.created === true) {
//         const userRole = "president";
//         const club = response.data.newclubs.clubName;
        
//         dispatch(updateUser({
//           id:user.id,
//           username:user.username,
//           email:user.email,
//           clubName:club 
//         }));

//         navigate('/clubhome', { state: { userRole, club } });
//       }

//       if (response.data.errors) {
//         toast.error(response.data.errors);
//       }
//     } catch (error) {
//      console.log("error");
//     }
//   }
//   const generateError = (err) => toast.error(err, {
//     autoClose: 2000,
//     position: toast.POSITION.TOP_RIGHT
//   })

//   return (
//     <div>
//       <section className="bg-primary overflow-y-hidden">
//         <div className="container px-4 md:px-5 text-center md:text-left my-5 pt-6">
//           <div className="md:flex md:gap-x-6 md:items-center mb-10">
//             <div className="mt-4 md:w-1/2 ml-10 mb-5  md:mb-0 z-10">
//               <h1 className="my-5 text-5xl font-bold tracking-tight hero-title text-hsl(0, 0%, 0%)">
//                 I-Club <br />
//                 <span className="text-hsl(27, 36%, 21%)">We Connects People</span>
//               </h1>
//               <p className="mb-4  opacity-70 text-hsl(219, 43%, 21%)">
//                 Empowering Hearts, Building Bridges - The Power of Togetherness.
//               </p>
//             </div>
//             <div className="px-10 md:w-1/2 relative">
//               <div id="radius-shape-1" className="absolute rounded-circle shadow-5-strong"></div>
//               <div id="radius-shape-2" className="absolute shadow-5-strong"></div>
//               {/* /////////////////////// */}

//               <div className="bg-glass rounded-lg   ">

//                 <div className='text-center text-4xl font-semibold pt-5 '>
//                   <h1>Register Club</h1>
//                 </div>


//                 <form>
//                   <div className="form-outline mb-4 text-center pt-4">
//                     <input
//                       type="text"
//                       id="form3Example3"
//                       name="clubName"
//                       onChange={(e) => setCreateClub({ ...createClub, [e.target.name]: e.target.value })}
//                       className="form-control p-2 w-4/6 drop-shadow-md rounded-lg border-current border outline-slate-300"
//                       placeholder="Club Name"
//                     />
//                   </div>
//                   <div className="form-outline mb-4 text-center pt-2">
//                     <input
//                       type="text"
//                       id="form3Example3"
//                       name="registerNo"
//                       onChange={(e) => setCreateClub({ ...createClub, [e.target.name]: e.target.value })}
//                       className="form-control  p-2 w-4/6 drop-shadow-md rounded-lg border-current border outline-slate-300"
//                       placeholder="Register No "
//                     />
//                   </div>
//                   <div className="form-outline mb-4 text-center pt-2">
//                     <input
//                       type="text"
//                       id="form3Example3"
//                       name="address"
//                       onChange={(e) => setCreateClub({ ...createClub, [e.target.name]: e.target.value })}
//                       className="form-control p-2 w-4/6 drop-shadow-md rounded-lg border-current border outline-slate-300"
//                       placeholder="Place"
//                     />
//                   </div>
//                   <div className="form-outline mb-4 text-center pt-2">
//                     <input
//                       type="text"
//                       id="form3Example3"
//                       name="category"
//                       onChange={(e) => setCreateClub({ ...createClub, [e.target.name]: e.target.value })}
//                       className="form-control p-2 w-4/6 drop-shadow-md rounded-lg border-current border outline-slate-300"
//                       placeholder="Category"
//                     />
//                   </div>
//                   <div className="form-outline mb-4 text-center pt-2">
//                     <input
//                       type="text"
//                       id="form3Example3"
//                       name="securityCode"
//                       onChange={(e) => setCreateClub({ ...createClub, [e.target.name]: e.target.value })}
//                       className="form-control p-2 w-4/6 drop-shadow-md rounded-lg border-current border outline-slate-300"
//                       placeholder="Security Code"
//                     />
//                   </div>
//                   <div className="form-outline mb-4 text-center pt-2">
//                     <input
//                       type="text"
//                       id="form3Example3"
//                       name="confirmSecurityCode"
//                       onChange={(e) => setCreateClub({ ...createClub, [e.target.name]: e.target.value })}
//                       className="form-control p-2 w-4/6 drop-shadow-md rounded-lg border-current border outline-slate-300"
//                       placeholder="Confirm Security Code"
//                     />
//                   </div>
//                   <div className="form-outline mb-4 text-center pt-2">
//                     <input
//                       type="email"
//                       id="form3Example3"
//                       name="secretory"
//                       onChange={(e) => setCreateClub({ ...createClub, [e.target.name]: e.target.value })}
//                       className="form-control p-2 w-4/6 drop-shadow-md rounded-lg border-current border outline-slate-300"
//                       placeholder="Secretory Email"
//                     />
//                   </div>
//                   <div className="form-outline mb-4 text-center pt-2">
//                     <input
//                       type="email"
//                       id="form3Example3"
//                       name="treasurer"
//                       onChange={(e) => setCreateClub({ ...createClub, [e.target.name]: e.target.value })}
//                       className="form-control p-2 w-4/6 drop-shadow-md rounded-lg border-current border outline-slate-300"
//                       placeholder="Treasurer"
//                     />
//                   </div>

//                   <div className='text-center  flex justify-center items-center'>
//                     <div className='text-center p-2 border-2 border-slate-500 borde bg-primary w-32  rounded-xl text-white'>
//                       <button onClick={handleClubSubmit}>Register</button>
//                     </div>
//                   </div>
//                   <div className="pb-3 text-center">
//                     <hr className="my-3"></hr>
//                     <a className="text-rgb(0, 0, 0) no-underline">
//                       Home
//                     </a>
//                   </div>

//                 </form>
//               </div>
//             </div>
//           </div>
//         </div>

//       </section>
//       <ToastContainer />
//     </div>
//   )
// }

// export default CreateClub
