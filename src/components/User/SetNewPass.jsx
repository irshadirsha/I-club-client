import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import { useLocation } from 'react-router-dom';
import { ToastContainer,toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { axiosInstance } from '../../../Api/config';
function SetNewPass() {
    const navigate=useNavigate()
    const location = useLocation();
    const email = location.state?.email;
    console.log("gettingg",email)
   const [resetpassword,setResetpassword]=useState({
    password:"",
    confirmpassword:""
   })

   const handleSubmit=async(e)=>{
    e.preventDefault()
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
       if(resetpassword.password == "" ){
        generateError('Please Enter New Password');
        return;
       }
      if (!passwordRegex.test(resetpassword.password)) {
        generateError('Enter a valid password');
        return;
      }
      if(resetpassword.confirmpassword == ""){
        generateError('Please Enter Confirm Password');
        return;
       }
    if (resetpassword.password !== resetpassword.confirmpassword) {
         generateError("Passwords do not match");
        return;
      }
    const {data}= await axiosInstance.post('/new-password',{...resetpassword,email},{withCredentials:true})
        if(data.errors){
          const {password,confirmpassword}=data.errors
          if (password) generateError(password)
          else if(confirmpassword) generateError(confirmpassword)
        }else{
          navigate('/login')
        }
   }
   const generateError=(err)=>toast.error(err,{
    autoClose:2000,
    position: toast.POSITION.TOP_RIGHT
  })
  return (
    <div>
      <div className="bg-primary  flex items-center justify-center h-screen">
  <div className="bg-white w-full max-w-sm ">
    <form className="shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
      <div className='text-center text-xl font-bold font-mono'>
        <h1>Enter Your New Password</h1>
      </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-center text-sm font-bold mb-2" htmlFor="newPassword">
            New Password
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            placeholder="Enter new password"
            name="password"
            onChange={(e)=>setResetpassword({...resetpassword,[e.target.name]:e.target.value})}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-center text-sm font-bold mb-2" htmlFor="confirmPassword">
            Confirm Password
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="confirmpassword"
            type="password"
            placeholder="Confirm new password"
            name="confirmpassword"
            onChange={(e)=>setResetpassword({...resetpassword,[e.target.name]:e.target.value})}
          />
        </div>
        <div className="flex justify-center items-center">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Change Password
          </button>
        </div>
    </form>
  </div>
</div>
<ToastContainer/>
</div>
  )
}

export default SetNewPass




















// import React,{useState} from 'react'
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios'
// import { useLocation } from 'react-router-dom';
// import { ToastContainer,toast } from 'react-toastify'
// import 'react-toastify/dist/ReactToastify.css';
// import { axiosInstance } from '../../../Api/config';
// function SetNewPass() {
//     const navigate=useNavigate()
//     const location = useLocation();
//     const email = location.state?.email;
//     console.log("gettingg",email)
//    const [resetpassword,setResetpassword]=useState({
//     password:"",
//     confirmpassword:""
//    })

//    const handleSubmit=async(e)=>{
//     e.preventDefault()
//     console.log(resetpassword);
//     const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
//       if (!passwordRegex.test(resetpassword.password)) {
//         generateError('Enter a valid password');
//         return;
//       }
//     if (resetpassword.password !== resetpassword.confirmpassword) {
//          generateError("Passwords do not match");
//         return;
//       }
//     const {data}= await axiosInstance.post('/new-password',{...resetpassword,email},{withCredentials:true})
//         console.log(data)
//         if(data.errors){
//           const {password,confirmpassword}=data.errors
//           if (password) generateError(password)
//           else if(confirmpassword) generateError(confirmpassword)
//         }else{
//           navigate('/login')
//         }
//    }
//    const generateError=(err)=>toast.error(err,{
//     autoClose:2000,
//     position: toast.POSITION.TOP_RIGHT
//   })
//   return (
//     <div>
//       <div className="bg-primary  flex items-center justify-center h-screen">
//   <div className="bg-white w-full max-w-sm ">
//     <form className="shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
//       <div className='text-center font-mono'>
//         <h1>Enter Your New Password</h1>
//       </div>
//         <div className="mb-4">
//           <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="newPassword">
//             New Password
//           </label>
//           <input
//             className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//             id="password"
//             type="password"
//             placeholder="Enter new password"
//             name="password"
//             onChange={(e)=>setResetpassword({...resetpassword,[e.target.name]:e.target.value})}
//           />
//         </div>
//         <div className="mb-4">
//           <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="confirmPassword">
//             Confirm Password
//           </label>
//           <input
//             className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//             id="confirmpassword"
//             type="password"
//             placeholder="Confirm new password"
//             name="confirmpassword"
//             onChange={(e)=>setResetpassword({...resetpassword,[e.target.name]:e.target.value})}
//           />
//         </div>
//         <div className="flex items-center justify-between">
//           <button
//             className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
//             type="submit"
//           >
//             Change Password
//           </button>
//         </div>
//     </form>
//   </div>
// </div>
// <ToastContainer/>
// </div>
//   )
// }

// export default SetNewPass

