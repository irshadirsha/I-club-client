import React, { useState, useEffect } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import './UserLogin.css'
import { axiosInstance } from '../../../../Api/config';
import { useDispatch } from 'react-redux';
import {updateUser} from '../../../redux/UserSlice/UserSlice'
function UserLogin() {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const [sendemail, setSendEmail] = useState("")
  const [showModal, setShowModal] = useState(false);
  const [userlogin, setUserLogin] = useState({
    email: "",
    password: ""
  })
  const [errors, setErrors] = useState({
    email: "",
    password: "",
    general: "",
  });
  useEffect(() => {
    const user = localStorage.getItem('user')
    if (user) {
      navigate('/')
    }
  }, [])
  const handleModalToggle = () => {
    setShowModal((prevState) => !prevState);
  };


  const handleMail = async (e) => {
    e.preventDefault()
    try {
      console.log("Email to be sent:", sendemail);
      const { data } = await axiosInstance.post('/sendmail', { email: sendemail })
      console.log("react", data);
      if (data.status == true) {
        alert("check your email")
        setShowModal(false);
        navigate('/login')
      } else {
        alert(data.status)
        setShowModal(false);
      }  
    } catch (error) {
      console.log("error in send mail");
    }
  }

  const handlelogin = async (e) => {
    e.preventDefault()
    try {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
      if (userlogin.email.trim() === "" &&userlogin.password.trim() === "" ) {
      setErrors({
        ...errors,
        email: "Email is empty",
        password: "Password is empty",
      });
      return;
    }
    if (!emailRegex.test(userlogin.email)) {
      setErrors({
        ...errors,
        email:" Enter a Valid Email" || "", 
      });        
      return;
    }
   
    if (!passwordRegex.test(userlogin.password)) {
      setErrors({
        ...errors,
        password:"Enter 1 capital,1 special char,1 digit minimum 8 letter " || "", 
      });        
      return;
    }
    if (userlogin.password == '') {
      setErrors({
        ...errors,
        password:" Password is Empty" || "", 
      });        
      return;
    }
      console.log("before", userlogin);
      const { data } = await axiosInstance.post('/login', { ...userlogin }, { withCredentials: true })
      console.log("ssssssssssssssssssssss");
      console.log(data);
      const { token } = data
      if (data.errors) {
        setErrors({
          ...data.errors,
          general: data.errors.general || "", // General error message
        });
      } else {
        console.log("nav to home", data);
        localStorage.setItem('user', JSON.stringify({ token, user: data.userData }))
        dispatch(updateUser({username:data.userData.username,email:data.userData.email,id:data.userData._id}));
        navigate('/')
      }
    } catch (error) {
      console.log(error)
    }
  }
 
  const navToHome = (e) => {
    e.preventDefault()
    navigate('/')
  }
  const navToSignin = (e) => {
    e.preventDefault()
    navigate('/signup')
  }
  return (
    <div>
      <section className="bg-primary overflow-y-hidden">
        <div className="container px-4 md:px-5 text-center md:text-left my-5 pt-20">
          <div className="md:flex md:gap-x-6 md:items-center mb-10">
            <div className="md:w-1/2 ml-10 mb-5  md:mb-0 z-10">
              <h1 className="my-5 text-5xl font-bold tracking-tight hero-title text-hsl(0, 0%, 0%)">
                I-Club <br />
                <span className="text-hsl(27, 36%, 21%)">We Connects People</span>
              </h1>
              <p className="mb-4  opacity-70 text-hsl(219, 43%, 21%)">
                Empowering Hearts, Building Bridges - The Power of Togetherness.
              </p>
            </div>
            <div className=" px-10 md:w-1/2 relative">
              <div id="radius-shape-1" className="absolute rounded-circle shadow-5-strong"></div>
              <div id="radius-shape-2" className="absolute shadow-5-strong"></div>
              <div className="bg-glass rounded-lg    ">

                <div className='hero-title text-hsl(217, 93%, 28%) text-center pt-2 '>
                  <h1>Login</h1>
                </div>

                 {/* //////////////////////// */}
                 <div>
                <div className="flex flex-col md:flex-row">
                  <div className=" md:w-2/3 sm:w-full p-4">
                    {/* Main modal */}
                    {showModal && (
                      <div
                        className="fixed top-0 left-0 right-0 z-50 bg-opacity-50 flex items-center justify-center h-screen"
                      >
                        <div className="absolute top-0 left-0 right-0 z-10 flex items-center justify-center h-screen">
                          <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                          <button
                    onClick={handleModalToggle}
                    type="button"
                    className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    <svg
                      className="w-3 h-3"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 14 14"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                      />
                    </svg>
                    <span className="sr-only">Close modal</span>
                  </button>
                            {/* Modal content */}
                            <div className="px-6 py-6 lg:px-10 ">
                              <h3 className="mb-4 text-xl font-medium text-gray-900 dark:text-white">
                                Enter Your Email
                              </h3>
                              <form className="space-y-6" onSubmit={handleMail}>
                                <div>
                                  <input type="email"
                                    id="email"
                                    name="email"
                                    onChange={(e) => setSendEmail(e.target.value)}
                                    placeholder='Email'
                                    className="mt-2 p-1.5 block w-full rounded-md  border-current border  border-gray-300 shadow-md   " required />
                                </div>

                                {/* Submit Button */}
                                <div className="flex items-center justify-center">
                                  <button type="submit" className="inline-flex items-center px-4 py-1 bg-primary border border-transparent rounded-md font-semibold text-white  focus:outline-none focus:ring focus:ring-indigo-200 active:bg-indigo-800 transition duration-150 ease-in-out">
                                    Submit
                                  </button>
                                </div>
                              </form>

                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
                 {/* //////////////////////// */}
                <form>
              
                <div className="form-outline mb-2 text-center pt-1">
                <label htmlFor="form3Example1" className="block text-gray-600  text-sm mb-1">
                 Email
                </label>
                <input
                  type="email"
                  id="form3Example1"
                  name="email"
                  placeholder="Enter your Email"
                  onChange={(e) => {
                    setUserLogin({ ...userlogin, [e.target.name]: e.target.value })
                    setErrors({});
                  }}
                  className={`form-control p-2 w-4/6 drop-shadow-md rounded-lg border-current border outline-slate-300 ${
                    errors.email && "border-red-500"
                  }`}
                />
                {errors.email && <p className="text-red-500">{errors.email}</p>}
              </div>

              <div className="form-outline mb-2 text-center pt-1">
                <label htmlFor="form3Example1" className="block text-gray-600  text-sm mb-1">
                 Password
                </label>
                <input
                  type="password"
                  id="form3Example1"
                  name="password"
                  placeholder="Enter your Password"
                  onChange={(e) => {
                    setUserLogin({ ...userlogin, [e.target.name]: e.target.value })
                    setErrors({});
                  }}
                  className={`form-control p-2 w-4/6 drop-shadow-md rounded-lg border-current border outline-slate-300 ${
                    errors.password && "border-red-500"
                  }`}
                />
                {errors.password && <p className="text-red-500">{errors.password}</p>}
              </div>

                  <div className='text-center  flex justify-center items-center'>
                    <div className='text-center border-current borde bg-primary w-32 p-2 rounded-lg text-white'>
                      <button onClick={handlelogin}>Login</button>
                    </div>
                  </div>
                  <br></br>           
                  <div className="pb-3 text-center  text-blue-700">
                    <a onClick={handleModalToggle} className="text-rgb(19, 94, 234) no-underline forgotPassword hover:cursor: pointer" >
                      forgot password?
                    </a>
                  </div>
                  <div className="pb-3 text-center">
                    <a onClick={navToSignin} className="no-underline text-blue-700" >
                      Dont have an account? Signup.
                    </a>
                    <hr className="my-3"></hr>
                    <a onClick={navToHome} className="text-rgb(0, 0, 0) no-underline">
                      Home
                    </a>
                  </div>

                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>

  )
}

export default UserLogin








// import React, { useState, useEffect } from 'react'
// import axios from 'axios'
// import { NavLink, useNavigate } from 'react-router-dom'
// import { ToastContainer, toast } from 'react-toastify'
// import 'react-toastify/dist/ReactToastify.css';
// import './UserLogin.css'

// function UserLogin() {
//   const navigate = useNavigate()


//   const [userlogin, setUserLogin] = useState({
//     email: "",
//     password: ""
//   })
//   useEffect(() => {
//     const user = localStorage.getItem('user')
//     if (user) {
//       navigate('/')
//     }
//   }, [])
//   const handlelogin = async (e) => {
//     e.preventDefault()
//     try {
//       console.log("before", userlogin);
//       const { data } = await axios.post('http://localhost:4000/login', { ...userlogin }, { withCredentials: true })
//       console.log("ssssssssssssssssssssss");
//       console.log(data);
//       const { token } = data
//       if (data.errors) {
//         const { email, password } = data.errors
//         if (email) generateError(email)
//         else if (password) generateError(password)
//       } else {
//         console.log("nav to home", data);
//         localStorage.setItem('user', JSON.stringify({ token, user: data.userData }))
//         navigate('/')
//       }
//     } catch (error) {
//       console.log(error)
//     }
//   }
//   const generateError = (err) => toast.error(err, {
//     autoClose: 2000,
//     position: toast.POSITION.TOP_RIGHT
//   })
//   const navToHome = (e) => {
//     e.preventDefault()
//     navigate('/')
//   }
//   const navToSignin = (e) => {
//     e.preventDefault()
//     navigate('/signup')
//   }
//   return (
//     <div>
//       <section className="bg-primary overflow-y-hidden">
//         <div className="container px-4 md:px-5 text-center md:text-left my-5 pt-20">
//           <div className="md:flex md:gap-x-6 md:items-center mb-10">
//             <div className="md:w-1/2 ml-10 mb-5  md:mb-0 z-10">
//               <h1 className="my-5 text-5xl font-bold tracking-tight hero-title text-hsl(0, 0%, 0%)">
//                 I-Club <br />
//                 <span className="text-hsl(27, 36%, 21%)">We Connects People</span>
//               </h1>
//               <p className="mb-4  opacity-70 text-hsl(219, 43%, 21%)">
//                 Empowering Hearts, Building Bridges - The Power of Togetherness.
//               </p>
//             </div>
//             <div className="md:w-1/2 relative">
//               <div id="radius-shape-1" className="absolute rounded-circle shadow-5-strong"></div>
//               <div id="radius-shape-2" className="absolute shadow-5-strong"></div>
//               {/* /////////////////////// */}

//               <div className="bg-glass rounded-lg   ">

//                 <div className='hero-title text-hsl(217, 93%, 28%) text-center pt-5 '>
//                   <h1>Login</h1>
//                 </div>


//                 <form>
//                   <div className="form-outline  mb-4 text-center pt-4">
//                     <input
//                       type="email"
//                       id="form3Example3"
//                       name="email"
//                       onChange={(e) => setUserLogin({ ...userlogin, [e.target.name]: e.target.value })}
//                       className="form-control p-2 w-4/6 drop-shadow-md rounded-lg   border-current border outline-slate-300 "
//                     />
//                     <br></br>
//                     <label className="form-label " htmlFor="form3Example3" >Email address</label>
//                   </div>

//                   <div className="form-outline mb-4 text-center pt-4">
//                     <input
//                       type="password"
//                       id="form3Example4"
//                       name="password"
//                       onChange={(e) => setUserLogin({ ...userlogin, [e.target.name]: e.target.value })}
//                       className="form-control p-2  w-4/6 drop-shadow-md rounded-lg  border-current border outline-slate-300 "
//                     />

//                     <br></br>

//                     <label className="form-label" htmlFor="form3Example4">Password</label>
//                   </div>
//                   <div className='text-center  flex justify-center items-center'>
//                     <div className='text-center border-current borde bg-primary w-32 p-2 rounded-lg text-white'>
//                       <button onClick={handlelogin}>Login</button>
//                     </div>
//                   </div>
//                   <br></br>
//                   <div className="pb-3 text-center  text-blue-700">
//                     <NavLink to='/sendmail' className="text-rgb(19, 94, 234) no-underline forgotPassword hover:cursor: pointer" >
//                       password?
//                     </NavLink>
//                   </div>

//                   <div className="pb-3 text-center  text-blue-700">
//                     <a className="text-rgb(19, 94, 234) no-underline forgotPassword hover:cursor: pointer" >
//                       forgot password?
//                     </a>
//                   </div>





//                   <div className="pb-3 text-center">
//                     <a onClick={navToSignin} className="no-underline text-blue-700" >
//                       Dont have an account? Signup.
//                     </a>
//                     <hr className="my-3"></hr>
//                     <a onClick={navToHome} className="text-rgb(0, 0, 0) no-underline">
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

// export default UserLogin



