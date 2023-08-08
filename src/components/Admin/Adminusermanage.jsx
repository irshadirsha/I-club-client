import React, { useState, useEffect, useCallback } from 'react';
import AdminSidebar from './AdminSidebar';
import axios from 'axios';
import { axiosInstance } from '../../../Api/config';

function Adminusermanage() {
  const [getuser, setGetUser] = useState([]);
  const handleUserUnBlock = async (e, id) => {
    e.preventDefault();
    const Unblock = await axiosInstance.post('/admin/unblock-user', { Unblockid: id });
    fetchdata()
    console.log(Unblock.data);
  }

  const handleUserBlock = async (e, id) => {
    e.preventDefault();
    const block = await axiosInstance.post('/admin/block-user', { blockid: id });
    fetchdata()
    console.log("blokinggg", block.data);
  };

  const fetchdata = useCallback(async () => {
    try {
      const data = await axiosInstance.get('/admin/admin-usermanage');
      console.log(data);
      setGetUser(data.data.userdata);
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    fetchdata();
  }, [fetchdata]);

  return (
    <div>
      <div className="flex flex-col md:flex-row">
        {/* Sidebar */}
        <AdminSidebar />

        {/* Table */}
        <div className="md:w-3/3 sm:w-full p-4">
          <div>
            <p className="px-3 py-3 text-2xl font-bold font-serif text-center">USERS</p>
          </div>
          <div className="w-full overflow-x-auto">
            <table className="w-full table-auto rounded-lg shadow-lg bg-white">
              <thead>
                <tr className="bg-gray-200 text-gray-700">
                  <th className="px-4 py-3">Index</th>
                  <th className="px-4 py-3">Name</th>
                  <th className="px-4 py-3">Image</th>
                  <th className="px-4 py-3">Email</th>
                  <th className="px-4 py-3">Phone</th>
                  <th className="px-4 py-3">Action</th>
                  {/* <th className="px-4 py-3">View</th> */}
                </tr>
              </thead>
              <tbody className="text-gray-600">
                {getuser.map((item, index) => (
                  <tr className="border-b border-gray-300 hover:bg-gray-100" key={index}>
                    <td className="px-4 text-center py-3">{index + 1}</td>
                    <td className="px-4 text-center  py-3">
                    {item.image ? (
                        <img
                          className="m-2 w-16 h-16 rounded-full"
                          src={item.image}
                          alt="Generic placeholder image"
                        />
                      ) : (
                        <img
                          className="m-2 w-16 h-16 rounded-full"
                          src="https://www.shutterstock.com/image-vector/no-user-profile-picture-hand-260nw-99335579.jpg"
                          alt="Generic placeholder image"
                        />
                      )}
                    </td>
                    <td className="px-4 text-center  py-3">{item.username}</td>
                    <td className="px-4 text-center  py-3">{item.email}</td>
                    <td className="px-4 text-center  py-3">{item.phone}</td>
                    <td className="px-4 text-center   py-3">
                    { item.isBlock ?(
                    <button onClick={(e)=>handleUserUnBlock(e,item._id)} className="bg-green-400 hover:bg-green-500   text-white w-20 py-1 rounded">
                    UnBlock
                   </button> 
                    ):(
                  <button onClick={(e)=>handleUserBlock(e,item._id)} className="bg-red-500 hover:bg-red-600  text-white w-20 py-1 rounded">
                  Block
                 </button> 
                )} 
                    </td>
                    {/* <td className="px-4 text-center  py-3">
                      <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-1 rounded">
                        View
                      </button>
                    </td> */}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Adminusermanage;






// import React,{useState,useEffect} from 'react'
// import AdminSidebar from './AdminSidebar'
// import axios from 'axios'
// function Adminusermanage() {
// const [getuser,setGetUser]=useState([])
// useEffect(()=>{ 
//     fetchdata()
// },[])

// const fetchdata=async()=>{
//     const data= await axios.get('http://localhost:4000/admin/admin-usermanage')
//     console.log(data)
//     setGetUser(data.data.userdata)
//     console.log(getuser);
// }
//   return (
//     <div>
//        <div className="flex flex-col md:flex-row">
//       {/* Sidebar */}
//       <AdminSidebar/>

//       {/* Table */}
    
//       <div className="md:w-3/4 sm:w-full p-4">
//       <div>
//         <p className='px-6 py-6 text-2xl font-bold text-center'>Users</p>
//       </div>
//         <div className="w-full overflow-x-auto">
//           <table className="w-full table-auto">
//             <thead>
//               <tr className="bg-gray-200 text-gray-700">
//                 <th className="px-4 py-2">Index</th>
//                 <th className="px-4 py-2">Name</th>
//                 <th className="px-4 py-2">Email</th>
//                 <th className="px-4 py-2">Phone</th>
//                 <th className="px-4 py-2">Action</th>
//                 <th className="px-4 py-2">View</th>
//               </tr>
//             </thead>
//             <tbody 
//             className="text-gray-600">
//                 {  getuser.map((item,index)=>(
//                    <tr className="bg-gray-100">
//                    <td className="border px-4 py-2" >{index+1}</td>
//                    <td className="border px-4 py-2">{item.username}</td>
//                    <td className="border px-4 py-2">{item.email}</td>
//                    <td className="border px-4 py-2">9876543212</td>
//                    <td className="border px-4 py-2">
//                     <button className='bg-gray-500 text-black px-4 py- rounded'>Block</button>
//                    </td>
//                    <td className="border px-4 py-2">
//                    <button className='bg-gray-500 text-black px-4 py- rounded'>View</button>
//                    </td>
//                  </tr>
//                  ))
//                 }
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//     </div>
//   )
// }

// export default Adminusermanage
