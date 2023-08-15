// import React,{useState} from 'react'
// import { axiosInstance } from '../../../../Api/config'
// // const [sendotp,setSendOtp]=useState('')

// // const data=axiosInstance.post('/')
// function OtpModal() {
//   return (
//     <div>
//         <div
//         className="fixed top-0 left-0 right-0 z-50 bg-opacity-50 flex items-center justify-center h-screen"
//         >
//         <div className="absolute top-0 left-0 right-0 z-10 flex items-center justify-center h-screen">
//             <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
//             <button
//     // onClick={handleModalToggle}
//     type="button"
//     className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
//     >
//     <svg
//         className="w-3 h-3"
//         aria-hidden="true"
//         xmlns="http://www.w3.org/2000/svg"
//         fill="none"
//         viewBox="0 0 14 14"
//     >
//         <path
//         stroke="currentColor"
//         strokeLinecap="round"
//         strokeLinejoin="round"
//         strokeWidth="2"
//         d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
//         />
//     </svg>
//     <span className="sr-only">Close modal</span>
//     </button>
//             {/* Modal content */}
//             <div className="px-6 py-6 lg:px-10 ">
//                 <h3 className="mb-4 text-xl font-medium text-gray-900 dark:text-white">
//                 Enter Your OTP
//                 </h3>
//                 <form className="space-y-6" >
//                 <div>
//                     <input type="number"
//                     id="number"
//                     name="number"
//                     onChange={(e) => setSendOtp(e.target.value)}
//                     placeholder='Enter your otp'
//                     className="mt-2 p-1.5 block w-full rounded-md  border-current border  border-gray-300 shadow-md   " required />
//                 </div>

//                 {/* Submit Button */}
//                 <div className="flex items-center justify-center">
//                     <button type="submit" className="inline-flex items-center px-4 py-1 bg-primary border border-transparent rounded-md font-semibold text-white  focus:outline-none focus:ring focus:ring-indigo-200 active:bg-indigo-800 transition duration-150 ease-in-out">
//                     Submit
//                     </button>
//                 </div>
//                 </form>

//             </div>
//             </div>
//         </div>
//         </div>
//     </div>
//   )
// }

// export default OtpModal
