import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './UserSignup.css'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import jwt_decode from "jwt-decode";
import { axiosInstance } from '../../../../Api/config'
import { useDispatch } from 'react-redux'
import { updateUser } from '../../../redux/UserSlice/UserSlice'


function UserSignup() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    confirmpassword: ""
  })

  const [errors, setErrors] = useState({
    username: "",
    email: "",
    password: "",
    confirmpassword: "",
    general: "",
  });
  useEffect(() => {
    const user = localStorage.getItem('user')
    if (user) {
      navigate('/')
    }
  }, [])
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
      const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (
        user.username.trim() === "" &&
        user.email.trim() === "" &&
        user.password.trim() === "" &&
        user.confirmpassword.trim() === ""
      ) {
        setErrors({
          ...errors,
          username: "Username is empty",
          email: "Email is empty",
          password: "Password is empty",
          confirmpassword: "Confirm Password is empty",
        });
        return;
      }
      if (user.username == '') {
        setErrors({
          ...errors,
          username:"UserName is Empty" || "", // General error message
        });  
        return;
      }
      if (!usernameRegex.test(user.username)) {
        setErrors({
          ...errors,
          username:"Enter a valid username" || "", // General error message
        });  
        return;
      }
      if (user.email == '') {
        setErrors({
          ...errors,
          email:"Email is Empty" || "", // General error message
        });    
        return;
      }
      if (!emailRegex.test(user.email)) {
        setErrors({
          ...errors,
          email:"Enter a valid email" || "", // General error message
        });    
        return;
      }
      if (user.password == '') {
        setErrors({
          ...errors,
          password:" Password is Empty" || "", // General error message
        });        
        return;
      }
      if (!passwordRegex.test(user.password)) {
        setErrors({
          ...errors,
          password:" Enter 1 capital,1 special char,1 digit minimum 8 letter " || "", // General error message
        });        
        return;
      }
      if (user.confirmpassword == '') {
        setErrors({
          ...errors,
          confirmpassword:"Confirm Password is Empty" || "", // General error message
        });        
        return;
      }


      if (user.password !== user.confirmpassword) {
        setErrors({
          ...errors,
          confirmpassword:"Passwords do not match" || "", // General error message
        });
        return;
      }
      console.log("befoor", user)
      const { data } = await axiosInstance.post('/signup', { ...user }, { withCredentials: true },)
      console.log('singupdata', data)
      if (data) {
        console.log("downnnn");
        const { token } = data;
        if (data.errors) {
          setErrors({
            ...data.errors,
            general: data.errors.general || "", // General error message
          });
        } else {
          localStorage.setItem('user', JSON.stringify({ token, user: data.data }))
          dispatch(updateUser({ username: data.data.username, email: data.data.email, id: data.data._id }));
          navigate('/')
        }
      }
    } catch (error) {
      console.log(error)
    }
  }
 


  const navToHome = (e) => {
    e.preventDefault()
    navigate('/')
  }
  const navToLogin = (e) => {
    e.preventDefault()
    navigate('/login')
  }
  return (
    <div>
      <section className="bg-primary overflow-y-hidden md:pr-8">
        <div className="container px-4 md:px-5 text-center md:text-left my-5 pt-10">
          <div className=" md:flex md:gap-x-6 md:items-center mb-10">
            <div className=" md:w-1/2 ml-10 pl-6 pt-2  mb-5 md:mb-0 z-10">
              <h1 className="my-2 text-5xl font-bold tracking-tight hero-title text-hsl(0, 0%, 0%)">
                I-Club <br />
                <span className="text-hsl(27, 36%, 21%)">We Connects People</span>
              </h1>
              <p className="mb-4  opacity-70 text-hsl(219, 43%, 21%)">
                Empowering Hearts, Building Bridges - The Power of Togetherness.
              </p>
            </div>
            <div className="md:w-1/2 relative">
              <div id="radius-shape-1" className="absolute rounded-circle shadow-5-strong"></div>
              <div id="radius-shape-2" className="absolute shadow-5-strong"></div>
              {/* /////////////////////// */}

              <div className="bg-glass rounded-lg  ">

                <div className='hero-title text-hsl(217, 93%, 28%) text-center pt-5 '>
                  <h1>SignUp</h1>
                </div>


                <form onSubmit={handleSubmit}>
                <div className="form-outline mb-4 text-center pt-1">
                <label htmlFor="form3Example1" className="block text-gray-600  text-sm mb-1">
                 Username
                </label>
                <input
                  type="text"
                  id="form3Example1"
                  name="username"
                  placeholder="Enter your username"
                  onChange={(e) => {
                    setUser({ ...user, [e.target.name]: e.target.value });
                    setErrors({});
                  }}
                  className={`form-control p-2 w-4/6 drop-shadow-md rounded-lg border-current border outline-slate-300 ${
                    errors.username && "border-red-500"
                  }`}
                />
                {errors.username && <p className="text-red-500">{errors.username}</p>}
              </div>

                  <div className="form-outline mb-4 text-center pt-0">
                  <label htmlFor="form3Example1" className="block text-gray-600  text-sm mb-1">
                 Email
                </label>
                  <input
                   type="email"
                  id="form3Example2"
                  name="email"
                  placeholder="Enter your email address"
                  onChange={(e) =>{
                  setUser({ ...user, [e.target.name]: e.target.value }),
                   setErrors({});
                   }}
                  className={`form-control p-2 w-4/6 drop-shadow-md rounded-lg border-current border outline-slate-300 ${errors.email && "border-red-500"}`}
                  />
                  {errors.email && <p className="text-red-500">{errors.email}</p>}
                  </div>

                  <div className="form-outline mb-4 text-center pt-0">
                  <label htmlFor="form3Example1" className="block text-gray-600  text-sm mb-1">
                 Password
                </label>
                  <input
                    type="password"
                    id="form3Example3"
                    name="password"
                    placeholder="Enter your password"
                    onChange={(e) =>{
                      setUser({ ...user, [e.target.name]: e.target.value }),
                       setErrors({});
                       }}
                    className={`form-control p-2 w-4/6 drop-shadow-md rounded-lg border-current border outline-slate-300 ${errors.password && "border-red-500"}`}
                  />
                  {errors.password && <p className="text-red-500">{errors.password}</p>}
                  </div>

                  <div className=" form-outline mb-4 text-center pt-0">
                  <label htmlFor="form3Example1" className="block text-gray-600  text-sm mb-1">
                 Confirm Password
                </label>
                  <input
                    type="password"
                    id="form3Example4"
                    name="confirmpassword"
                    placeholder="Confirm your password"
                    onChange={(e) =>{
                      setUser({ ...user, [e.target.name]: e.target.value }),
                       setErrors({});
                       }}
                    className={`form-control p-2 w-4/6 drop-shadow-md rounded-lg border-current border outline-slate-300 ${errors.confirmpassword && "border-red-500"}`}
                  />
                  {errors.confirmpassword && <p className="text-red-500">{errors.confirmpassword}</p>}

                  </div>

                  <div className='text-center  flex justify-center items-center'>
                    <div className='text-center border-current borde  bg-primary w-32 p-2 rounded-lg text-black'>
                      <button  >SignUp</button>
                    </div>
                  </div>

                  <div className='text-center p-3 flex justify-center items-center'>
                    <div className='text-center border-current border bg-white p-1 rounded-lg text-black'>
                      <GoogleOAuthProvider clientId="806082535140-72smn8nvp4iekcdicjretlplp1nfdffq.apps.googleusercontent.com">
                        <GoogleLogin
                          onSuccess={async (credentialResponse) => {
                            google.accounts.id.prompt()
                            let decoded = jwt_decode(credentialResponse.credential);
                            console.log("decodeeeeeeed", decoded);
                            const UserObject = {
                              username: decoded.given_name,
                              email: decoded.email,
                              password: 'User@123'
                            }
                            const { data } = await axiosInstance.post('/signup', { ...UserObject, isGoogleSignup: true }, { withCredentials: true })
                            console.log("ReturnDataaaa", data);
                            console.log(data.user);
                            console.log(data.user._id);
                            if (data) {
                              const { token } = data

                              localStorage.setItem('user', JSON.stringify({ token, user: data.user }))
                              dispatch(updateUser({ username: data.user.username, email: data.user.email, id: data.user._id }));
                              navigate('/')
                            }
                          }}
                          onError={() => {
                            console.log('Login Failed');
                          }}
                        />
                      </GoogleOAuthProvider>
                    </div>
                  </div>




                  <div className="pb-3 text-center">
                    <a onClick={navToLogin} className="no-underline text-blue-700">
                      Already have an account? LogIn.
                    </a>
                    <hr className="my-3"></hr>
                    <a onClick={navToHome} className="text-rgb(0, 0, 0) no-underline" >
                      Home
                    </a>
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

export default UserSignup






















// import React,{useState,useEffect} from 'react'
// import { useNavigate } from 'react-router-dom'
// import './UserSignup.css'
// import axios from 'axios'
// import { ToastContainer,toast } from 'react-toastify'
// import 'react-toastify/dist/ReactToastify.css';
// import { GoogleOAuthProvider,GoogleLogin } from '@react-oauth/google';
// import jwt_decode from "jwt-decode";
// import { axiosInstance } from '../../../../Api/config'
// import { useDispatch } from 'react-redux'
// import { updateUser } from '../../../redux/UserSlice/UserSlice'


// function UserSignup() {
//   const dispatch=useDispatch()
// const navigate=useNavigate()
//   const [user,setUser]=useState({
//     username:"",
//     email:"",
//     password:"",
//     confirmpassword:""
//   })
 
//   useEffect(()=>{
//     const user=localStorage.getItem('user')
//     if(user){
//       navigate('/')
//     }
//   },[])
//   const handleSubmit = async(e)=>{
//     e.preventDefault()
//     try {
//       if (user.username == '') {
//         generateError("please Enter Username");
//         return;
//       }
//       if (user.email == '') {
//         generateError("please Enter Email");
//         return;
//       }
//       if (user.confirmpassword == '') {
//         generateError("please Enter ConfirmPassword");
//         return;
//       }

//       if (user.password !== user.confirmpassword) {
//         generateError("Passwords do not match");
//         return;
//       }
//       console.log("befoor",user)
//       const {data} =await axiosInstance.post('/signup',{...user},{withCredentials:true}, )
//       console.log('singupdata',data)
//       if(data){
//         console.log("downnnn");     
//         const { token } = data;
//         if(data.errors){
//           const {username,email,password,confirmpassword}=data.errors
//           if (username) generateError(username)
//           else if(password) generateError(password)
//           else if (email) generateError (email)
//           else if(confirmpassword) generateError(confirmpassword)
//         }else{
//           localStorage.setItem('user',JSON.stringify({token,user:data.data}))
//           dispatch(updateUser({username:data.data.username,email:data.data.email,id:data.data._id}));
//           navigate('/')

//         }
//       }
//     } catch (error) {
//       console.log(error)
//     }
//   }
//   const generateError=(err)=>toast.error(err,{
//     autoClose:2000,
//     position: toast.POSITION.TOP_RIGHT,
//   })
   
   
//  const navToHome=(e)=>{
//        e.preventDefault()
//        navigate('/')
//  }
//  const navToLogin=(e)=>{
//   e.preventDefault()
//   navigate('/login')
// }
//   return (
//     <div>
//          <section className="bg-primary overflow-y-hidden md:pr-8">
//         <div className="container px-4 md:px-5 text-center md:text-left my-5 pt-10">
//           <div className=" md:flex md:gap-x-6 md:items-center mb-10">
//             <div className=" md:w-1/2 ml-10 pl-6 pt-2  mb-5 md:mb-0 z-10">
//               <h1 className="my-2 text-5xl font-bold tracking-tight hero-title text-hsl(0, 0%, 0%)">
//                 I-Club <br />
//                 <span className="text-hsl(27, 36%, 21%)">We Connects People</span>
//               </h1>
//               <p className="mb-4  opacity-70 text-hsl(219, 43%, 21%)">
//               Empowering Hearts, Building Bridges - The Power of Togetherness.
//               </p>
//             </div>
//             <div className="md:w-1/2 relative">
//               <div id="radius-shape-1" className="absolute rounded-circle shadow-5-strong"></div>
//               <div id="radius-shape-2" className="absolute shadow-5-strong"></div>
//               {/* /////////////////////// */}

//               <div className="bg-glass rounded-lg  ">

//                 <div className='hero-title text-hsl(217, 93%, 28%) text-center pt-5 '>
//                   <h1>SignUp</h1>
//                 </div>


//                 <form onSubmit={handleSubmit}>
//                 <div className="form-outline  mb-4 text-center pt-3">
//                     <input
//                       type="text"
//                       id="form3Example1"
//                       name="username"
//                       onChange={(e)=>setUser({...user,[e.target.name]:e.target.value})}
//                       className="form-control p-2 w-4/6 drop-shadow-md rounded-lg   border-current border outline-slate-300 "
//                     />
//                     <br></br>
//                   <label className="form-label " htmlFor="form3Example1" >User Name</label>
//                   </div>

//                   <div className="form-outline  mb-4 text-center pt-1">
//                     <input
//                       type="email"
//                       id="form3Example2"
//                       name="email"
//                       onChange={(e)=>setUser({...user,[e.target.name]:e.target.value})}
//                       className="form-control p-2  w-4/6 drop-shadow-md rounded-lg   border-current border outline-slate-300 "
//                     />
//                     <br></br>
//                     <label className="form-label " htmlFor="form3Example2" >Email address</label>
//                   </div>

//                   <div className="form-outline mb-4 text-center pt-1">
//                     <input
//                       type="password"
//                       id="form3Example3"
//                       name="password"
//                       onChange={(e)=>setUser({...user,[e.target.name]:e.target.value})}
//                       className="form-control p-2  w-4/6 drop-shadow-md rounded-lg  border-current border outline-slate-300 "
//                     />

//                     <br></br>

//                     <label className="form-label" htmlFor="form3Example3">Password</label>
//                   </div>

//                   <div className="form-outline  mb-4 text-center pt-1">
//                     <input
//                       type="text"
//                       id="form3Example4"
//                       name="confirmpassword"
//                       onChange={(e)=>setUser({...user,[e.target.name]:e.target.value})}
//                       className="form-control p-2 w-4/6 drop-shadow-md rounded-lg   border-current border outline-slate-300 "
//                     />
//                     <br></br>
//                     <label className="form-label " htmlFor="form3Example4" >ConfirmPassword</label>
//                   </div>

//                   <div className='text-center  flex justify-center items-center'>
//                     <div  className='text-center border-current borde  bg-primary w-32 p-2 rounded-lg text-black'>
//                       <button  >SignUp</button>
//                     </div>
//                   </div>
                 
//                   <div className='text-center p-3 flex justify-center items-center'>
//                     <div  className='text-center border-current border bg-white p-1 rounded-lg text-black'>
//                     <GoogleOAuthProvider clientId="806082535140-72smn8nvp4iekcdicjretlplp1nfdffq.apps.googleusercontent.com">
//                   <GoogleLogin
//                     onSuccess ={async(credentialResponse) => {
//                       google.accounts.id.prompt()
//                       let decoded=jwt_decode(credentialResponse.credential);
//                       console.log("decodeeeeeeed",decoded);
//                      const UserObject={
//                         username:decoded.given_name,
//                         email:decoded.email,
//                         password:'User@123'
//                       }
//                       const  {data} = await axiosInstance.post('/signup',{...UserObject,isGoogleSignup: true },{withCredentials:true})
//                     console.log("ReturnDataaaa",data);
//                     console.log(data.user);
//                     console.log(data.user._id);
//                     if(data){
//                       const {token}=data

//                      localStorage.setItem('user',JSON.stringify({token,user:data.user}))
//                      dispatch(updateUser({username:data.user.username,email:data.user.email,id:data.user._id}));
//                       navigate('/')                      
//                     }   
//                     }}
//                     onError={() => {
//                     console.log('Login Failed');
//                     }}
//                      />
//                     </GoogleOAuthProvider>
//                     </div>
//                   </div>

                 
                

//                   <div className="pb-3 text-center">
//                     <a onClick={navToLogin} className="no-underline text-blue-700">
//                       Already have an account? LogIn.
//                     </a>
//                     <hr className="my-3"></hr>
//                     <a onClick={navToHome} className="text-rgb(0, 0, 0) no-underline" >
//                       Home
//                     </a>
//                   </div>

//                 </form>
//               </div>
//             </div>
//           </div>
//         </div>

//       </section>
//     <ToastContainer/>
//     </div>
//   )
// }

// export default UserSignup





