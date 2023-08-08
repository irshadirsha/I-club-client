// import React,{useState} from 'react'
// import { useNavigate } from 'react-router-dom'
// import axios from 'axios'
// function EmailSend() {
//   const navigate=useNavigate()
//     const [sendemail,setSendEmail]=useState("")
//    const handleMail =async(e)=>{
//     e.preventDefault()
//     console.log("Email to be sent:", sendemail);
//     const {data}= await axios.post('http://localhost:4000/sendmail',{ email: sendemail})
//     console.log("react",data);
//     if(data.status==true){
//     alert("check your email")
//           navigate('/login')
//         }
//    }
//   return (
//     <div>
//     <div className="bg-gray-100 min-h-screen flex items-center justify-center">
//       <div className="bg-white p-8 rounded-md shadow-md w-full max-w-md">
//         <h2 className="text-2xl font-bold mb-4 text-center">Enter Email</h2>
//         <form className="space-y-4" onSubmit={handleMail}>
//           {/* Email Input */}
//           <div>
//             <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
//             <input type="email"
//              id="email"
//              name="email"
//              onChange={(e) => setSendEmail(e.target.value)}
//             className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" required />
//           </div>

//           {/* Submit Button */}
//           <div className="flex items-center justify-end">
//             <button type="submit" className="inline-flex items-center px-4 py-2 bg-indigo-600 border border-transparent rounded-md font-semibold text-white hover:bg-indigo-700 focus:outline-none focus:ring focus:ring-indigo-200 active:bg-indigo-800 transition duration-150 ease-in-out">
//               Submit
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//     </div>
//   )
// }

// export default EmailSend
