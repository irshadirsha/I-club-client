import React,{useState,useEffect} from 'react'
import { axiosInstance } from '../../../../Api/config'
import { useSelector } from 'react-redux'
import ClubAuthority from './ClubAuthority'
import { ToastContainer,toast } from 'react-toastify'

function Members() {
    const [adduser,SetAddUser]=useState('')
   const {clubName}=useSelector((state)=>state.user)
   const [memberlist,setMemberList]=useState([])
   const [userRole, setUserRole] = useState('');
   const [currentPage, setCurrentPage] = useState(1);
   const [request,setrequest]=useState('')
   const itemsPerPage = 5; 
 
  useEffect(()=>{
    getmember()
  },[])
    const getmember = async () => {
        const doce = await axiosInstance.get('/get-member',{
           params: { clubName }
           })
           console.log("getting .....",doce);
           console.log(doce.data.clubExist.newmember);
           console.log(doce.data.clubExist.members);
           console.log(doce.data.userRole);
           setrequest(doce.data.clubExist.newmember)
           setMemberList(doce.data.clubExist.members)
           setUserRole(doce.data.userRole)
    }

    const handleSubmit=async(e)=>{
        e.preventDefault()
        const requestData = {
            clubName: clubName,
            adduser: adduser
          };
      console.log("request",requestData);
        const {data}=await axiosInstance.post('/add-member',requestData)
        console.log("resAddmem",data)
        SetAddUser('')
        if (data.message) {
            toast.success(data.message)
            getmember()
            
          }
          
        if (data.errors) {
             toast.error(data.errors)
          }       
            console.log(data.members.username)
           
    }

    const handleApprove = async (e, email) => {
      e.preventDefault();
      console.log("+++++++++",email);
      const requestData = {
        clubName: clubName,
        adduser: email
      };
      try {
        const {data}=await axiosInstance.post('/add-member',requestData)
        console.log(data);
        if (data.message) {
          toast.success(data.message)
        }
        getmember()
        // Handle success or error response
      } catch (error) {
        console.error("Error approving membership:", error);
      }
    };
    

      const handleDltMember=async (e,id) => {
        e.preventDefault()
        console.log(id,clubName)
        const {data}=await axiosInstance.post('/delete-member',{clubName,id})
         console.log(data)
         if (data.message) {
          toast.success(data.message)
          getmember()  
        }
        if (data.errors) {
          toast.error(data.errors)
        } 
      }
     
      const startIndex = (currentPage - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      
  return (
    <div className='bg-primary'>
        <div className='text-center text-xl font-mono font-bold '>
            <h1 className='p-4'>Members</h1>
        </div>
       <ClubAuthority/>
       {(userRole==='president' || userRole=== 'secretory') && (<div className=" flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className=" border max-w-md w-full space-y-4">
        <div>
          <h2 className="mt-2 text-center text-2xl font-mono font-bold text-gray-900">
            Add New Member
          </h2>
        </div>
        <form className="mt-2 space-y-6" onSubmit={handleSubmit} >
          <div className="rounded-md shadow-sm -space-y-px">
            <div className='p-2'>
              <label htmlFor="email" className="sr-only">
                Member Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={adduser}
                onChange={(e) => SetAddUser(e.target.value)}
                required
                className="appearance-none rounded-md relative block w-full  px-3 py-2 border text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Enter member email"
              />
            </div>
          </div>

          <div className='p-2'>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border  border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Add Member
            </button>
          </div>
        </form>
        {request.length > 0 && (
    <div className="py-4 px-4 m-4 bg-white border-t border-gray-200">
      <h1 className="text-lg font-bold text-gray-800">
        Membership Requests
      </h1>
      <ul className="mt-2 space-y-2">
        {request.map((email, index) => (
          <li key={index} className="text-gray-600">
          
            <div className='flex justify-between'>
            {email}
            <button
              onClick={(e) => handleApprove(e,email)}
              className=" px-2 py-1  bg-green-600 hover:bg-green-700 text-white rounded focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              Approve
            </button>
            </div>
            
          </li>
        ))}
      </ul>
    </div>
  )}
      </div>
     
    </div>)}
    {/* /////////////////////////// */}

  <div className=" overflow-x-auto p-6">
  <table className="min-w-full border border-gray-200 divide-y divide-gray-200">
    <thead className="bg-gray-50">
      <tr>
        <th className="px-6 py-3 text-left text-md font-bold font-mono text-black uppercase tracking-wider">
        Image 
        </th>
        <th className="px-6 py-3 text-left text-md font-bold font-mono text-black uppercase tracking-wider">
         Name
        </th>
        <th className="px-6 py-3 text-left text-md font-bold font-mono text-black uppercase tracking-wider">
        Email
        </th>
        <th className="px-6 py-3 text-left text-md font-bold font-mono text-black uppercase tracking-wider">
        Phone Number
        </th>
        <th className="px-6 py-3 text-left text-md font-bold font-mono text-black uppercase tracking-wider">
        Role
        </th>
       { (userRole==='president' || userRole=== 'secretory') && (<th className="px-6 py-3 text-left text-md font-bold font-mono text-black uppercase tracking-wider">
         Action
        </th>)}
      </tr>
    </thead>
    <tbody className="bg-white divide-y divide-gray-200">
    {/* {memberlist?.map((item, index) => ( */}
      {memberlist?.slice(startIndex, endIndex).map((item, index) => (
      <tr key={item._id}>
        <td className="px-6 py-4 whitespace-nowrap text-md text-black">
        <div className=''>
        <img
    className="w-10 h-16 rounded  object-cover"
    src={item?.image || 'https://www.shutterstock.com/image-vector/no-user-profile-picture-hand-260nw-99335579.jpg'}
    // alt={`Club Member ${index + 1}`}
/>

          </div>
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-md text-black">
          {item.username}
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-md text-black">
        {item.email}
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-md text-black">
        {item.phone || "Not Added"}
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-md text-black">
        Member
        </td>
       
       {(userRole==='president' || userRole=== 'secretory') && ( <td 
       onClick={(e)=>handleDltMember(e,item._id)}
       className="px-6 py-4 whitespace-nowrap text-md text-black">
        <button  className="bg-indigo-600 hover:g-indigo-700 text-white w-20 py-1 rounded">
           Remove
          </button>
        </td>)}
      </tr>
      ))}
            
            
    </tbody>
    </table>
    </div>
    <div className="flex justify-center mt-4">
        {/* Render pagination buttons */}
        {Array.from({ length: Math.ceil(memberlist?.length / itemsPerPage) }, (_, index) => (
          <button
            key={index}
            className={`px-3 py-2 mx-1 rounded ${
              currentPage === index + 1
                ? 'bg-indigo-600 text-white'
                : 'bg-gray-300 text-gray-900'
            }`}
            onClick={() => setCurrentPage(index + 1)}
          >
            {index + 1}
          </button>
        ))}
      </div>
   
    <ToastContainer/>
  
    </div>
  )
}

export default Members















// import React,{useState,useEffect} from 'react'
// import { axiosInstance } from '../../../../Api/config'
// import { useSelector } from 'react-redux'
// import ClubAuthority from './ClubAuthority'
// import { ToastContainer,toast } from 'react-toastify'
// import 'react-toastify/dist/ReactToastify.css';

// function Members() {
//     const [adduser,SetAddUser]=useState('')
//    const {clubName}=useSelector((state)=>state.user)
// //    const [member,setMember]=useState([])
//     //   const [userRole, setUserRole] = useState('');
// //   useEffect(()=>{
// //     getmember()
// //   },[])
// //     const getmember=async(e)=>{
// //         const {doce}=await axiosInstance.get('/get-member',{
// //            params: { clubName }
// //            })
// //            console.log(doce);
// //     }

//     const handleSubmit=async(e)=>{
//         e.preventDefault()
//         const requestData = {
//             clubName: clubName,
//             adduser: adduser
//           };
//       console.log(requestData);
//         const {data}=await axiosInstance.post('/add-member',requestData)
//         console.log("resAddmem",data)
//         if (data.message) {
//             toast.success(data.message, {
//               autoClose: 2000,
//               position: toast.POSITION.TOP_RIGHT
//             })}
//         if (data.errors) {
//              toast.error(data.errors, {
//              autoClose: 2000,
//              position: toast.POSITION.TOP_RIGHT
//             })} 
//             console.log(data.members.username)
           
//     }
//   return (
//     <div className='bg-primary'>
//         <div className='text-center text-xl font-mono font-bold '>
//             <h1 className='p-4'>Members</h1>
//         </div>
//        <ClubAuthority/>
//         <div className=" flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
//       <div className=" border max-w-md w-full space-y-4">
//         <div>
//           <h2 className="mt-2 text-center text-2xl font-mono font-bold text-gray-900">
//             Add Member
//           </h2>
//         </div>
//         <form className="mt-2 space-y-6" onSubmit={handleSubmit} >
//           <div className="rounded-md shadow-sm -space-y-px">
//             <div className='p-2'>
//               <label htmlFor="email" className="sr-only">
//                 Member Email
//               </label>
//               <input
//                 type="email"
//                 id="email"
//                 name="email"
//                 value={adduser}
//                 onChange={(e) => SetAddUser(e.target.value)}
//                 required
//                 className="appearance-none rounded-md relative block w-full  px-3 py-2 border text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
//                 placeholder="Enter member email"
//               />
//             </div>
//           </div>

//           <div className='p-2'>
//             <button
//               type="submit"
//               className="group relative w-full flex justify-center py-2 px-4 border  border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
//             >
//               Add Member
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//     {/* /////////////////////////// */}
//     <div className='bg-gray-400 overflow-auto'>
//     <div className="p-8 overflow-x-auto">
//   <table className="min-w-full divide-y divide-gray-200">
//     <thead className="bg-gray-50">
//       <tr>
//         <th scope="col" className="px-4 py-3 text-left text-md font-bold font text-black uppercase tracking-wider">
//           Name
//         </th>
//         <th scope="col" className="px-4 py-3 text-left text-md font-bold font text-black uppercase tracking-wider">
//           Email
//         </th>
//         <th scope="col" className="px-4 py-3 text-left text-md font-bold font text-black uppercase tracking-wider">
//           Role
//         </th>
//         <th scope="col" className="px-4 py-3 text-left text-md font-bold font text-black uppercase tracking-wider">
//           Action
//         </th>
//       </tr>
//     </thead>
//     <tbody className="bg-white divide-y divide-gray-200">
//       <tr>
//         <td className="px-4 py-2 whitespace-nowrap">
//           <div className="flex items-center">
//             <div className="ml-2">
//               <div className="text-md  font-mono text-black">
//                 John Doe
//               </div>
//             </div>
//           </div>
//         </td>
//         <td className="px-4 py-2 whitespace-nowrap">
//           <div className="text-md text-black">ohndoe@example.com</div>
//         </td>
//         <td className="px-4 py-2 whitespace-nowrap">
//           <div className="text-md text-black">Member</div>
//         </td>
//         <td className="px-4 py-2 whitespace-nowrap">
//           <button className="text-indigo-600 hover:text-indigo-900">
//             Edit
//           </button>
//           <button className="text-red-600 hover:text-red-900 ml-2">
//             Delete
//           </button>
//         </td>
//       </tr>
//       {/* Add more rows here as needed */}
//     </tbody>
//   </table>
// </div>
// </div>

//     <ToastContainer/>
//     </div>
//   )
// }

// export default Members




// {request.length > 0 && (
//   <div className="py-4 px-4 m-4 bg-white border-t border-gray-200">
//     <h1 className="text-lg font-bold text-gray-800">
//       Membership Requests
//     </h1>
//     <ul className="mt-2 space-y-2">
//       {request.map((email, index) => (
//         <li key={index} className="text-gray-600">
//           {email}
//         </li>
//       ))}
//     </ul>
//     {/* Approve All Button */}
//     <button
//       onClick={() => handleApproveAll()}
//       className="mt-4 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
//     >
//       Approve All
//     </button>
//   </div>
// )}