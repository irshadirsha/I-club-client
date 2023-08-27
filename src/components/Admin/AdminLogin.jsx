import React,{useState,useEffect} from 'react'
import axios from 'axios';
import {useNavigate} from 'react-router-dom'
import {ToastContainer,toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { adminaxios } from '../../../Api/config';

function AdminLogin() {
    const navigate=useNavigate()

    useEffect(()=>{
      const admin=localStorage.getItem('admin')
      if(admin){
        navigate('/admin')
      }
    },[])
    const [admin,setAdmin]=useState({
      username:"",
      password:""
    })

    const handleLogin = async(e)=>{
        e.preventDefault();
        try {
             console.log("before",admin);
             if (admin.username == '') {
              generateError("please Enter Username");
              return;
            }
            if (admin.password == '') {
              generateError("please Enter Password");
              return;
            }
           const data= await adminaxios.post('/adminLogin',{...admin},{withCredentials:true})
           console.log(data,"----------------");
           const { token } = data.data
           console.log(token);
           console.log(data.data.admin);
           console.log(data.data);
            if(data){
                if(data.data.errors){
                    const {username,password}=data.data.errors;
                    if(username)generateError(username)
                    else if(password)generateError(password)

                }else{
                    if(data){
                      localStorage.setItem('admin', JSON.stringify({ token, admin: data.data.admin }))
                        navigate('/admin')
                    }
                }
            }
        } catch (error) {
            
        }
    }
    const generateError=(err)=> toast.error(err,{
      autoClose:1000,
      position: toast.POSITION.TOP_RIGHT
    })
  return (
    <div>
      
      <section className="bg-gray-400  overflow-y-hidden">
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
    <div className="md:w-1/2 relative">
      <div id="radius-shape-1" className="absolute rounded-circle shadow-5-strong"></div>
      <div id="radius-shape-2" className="absolute shadow-5-strong"></div>
      {/* /////////////////////// */}

       <div className="bg-glass rounded-lg  ">

         <div className='hero-title text-hsl(217, 93%, 28%) text-center pt-5 '>
           <h1>Admin Login</h1>
         </div>


        <form>
           <div className="form-outline  mb-4 text-center pt-4">
             <input
               type="username"
               id="form3Example3"
               name="username"
              onChange={(e)=>setAdmin({...admin,[e.target.name]:e.target.value})}
              className="form-control p-2 w-4/6 drop-shadow-md rounded-lg   border-current border outline-slate-300 "
            />
            <br></br>
            <label className="form-label " htmlFor="form3Example3" >UserName</label>
          </div>

          <div className="form-outline mb-4 text-center pt-4">
            <input
              type="password"
              id="form3Example4"
              name="password"
              onChange={(e)=>setAdmin({...admin,[e.target.name]:e.target.value})}
              className="form-control p-2  w-4/6 drop-shadow-md rounded-lg  border-current border outline-slate-300 "
            /> 

             <br></br>

             <label className="form-label" htmlFor="form3Example4">Password</label>
           </div>
           <div className='text-center  flex justify-center items-center'>
             <div className='text-center border-current borde bg-gray-400 p-2 w-32  rounded-lg text-black'>
               <button onClick={handleLogin}>Login</button>
             </div>
           </div>
           <br></br>
           <br></br>
           <br></br>
         </form>
       </div>
     </div>
   </div>
   <br></br>
   <br></br>
   <br></br>
 </div>

 </section>
    <ToastContainer/>
    </div>
  )
}

export default AdminLogin




// <div className="bg-gray-100 min-h-screen flex items-center justify-center">
//   <div className="max-w-md w-full md:w-2/3 lg:w-1/3 px-6 py-8 bg-white shadow-lg rounded-lg">
//     <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Admin Login</h2>
//     <form>
//       <div className="mb-4">
//         <label htmlFor="username" className="block text-gray-700 text-sm font-bold mb-2">
//           Username
//         </label>
//         <input
//           type="text"
//           id="username"
//           name="username"
//           className="w-full p-3 border border-gray-400 rounded"
//           required
//           onChange={(e) => setAdmin({...admin,[e.target.name]:e.target.value})}
//         />
//       </div>
//       <div className="mb-4">
//         <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">
//           Password
//         </label>
//         <input
//           type="password"
//           id="password"
//           name="password"
//           className="w-full p-3 border border-gray-400 rounded"
//           required
//           onChange={(e) => setAdmin({...admin,[e.target.name]:e.target.value})}
//         />
//       </div>
//       <div className="flex items-center justify-center">
//         <button
//           type="submit"  onClick={handleLogin}
//           className="bg-indigo-600 text-white px-4 py-2 rounded focus:outline-none focus:shadow-outline"
//         >
//           Sign In
//         </button>
//       </div>
//     </form>
//   </div>
// </div>

// //////////
// <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
// <div className="max-w-md w-full space-y-8">
//   <div>
//     <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
//       Admin Login
//     </h2>
//   </div>
//   <form className="mt-8 space-y-6">
//     <div className="rounded-md shadow-sm -space-y-px">
//       <div>
//         <label htmlFor="username" className="sr-only">
//           Username
//         </label>
//         <input
//           id="username"
//           name="username"
//           type="text"
//           autoComplete="username"
//           required
//           className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
//           placeholder="Username"
//           // value={username}
//           onChange={(e) => setAdmin({...admin,[e.target.name]:e.target.value})}
//         />
//       </div>
//       <div>
//         <label htmlFor="password" className="sr-only">
//           Password
//         </label>
//         <input
//           id="password"
//           name="password"
//           type="password"
//           autoComplete="current-password"
//           required
//           className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
//           placeholder="Password"
//           // value={password}
//           onChange={(e) => setAdmin({...admin,[e.target.name]:e.target.value})}
//         />
//       </div>
//     </div>

//     <div>
//       <button type="submit" onClick={handleLogin}
//         className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
//       >
//         Log in
//       </button>
//     </div>
//   </form>
// </div>
// </div>