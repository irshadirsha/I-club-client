import React, { useState, useEffect, useCallback } from 'react';
import AdminSidebar from './AdminSidebar';
import axios from 'axios';
import { adminaxios } from '../../../Api/config';

function Adminusermanage() {
  const [getuser, setGetUser] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
const itemsPerPage = 6; // Set the desired number of items per page
const [searchQuery, setSearchQuery] = useState('');

  const handleUserUnBlock = async (e, id) => {
    e.preventDefault();
    const Unblock = await adminaxios.post('/unblock-user', { Unblockid: id });
    fetchdata()
    console.log(Unblock.data);
  }

  const handleUserBlock = async (e, id) => {
    e.preventDefault();
    const block = await adminaxios.post('/block-user', { blockid: id });
    fetchdata()
    console.log("blokinggg", block.data);
  };

  const fetchdata = useCallback(async () => {
    try {
      const data = await adminaxios.get('/admin-usermanage');
      console.log(data);
      setGetUser(data.data.userdata);
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    fetchdata();
  }, [fetchdata]);
  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
    setCurrentPage(1); // Reset page to 1 when search query changes
  };
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  
  const filteredItems = getuser.filter(item =>
    item.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.email.toLowerCase().includes(searchQuery.toLowerCase()) 
  );
  const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };
  
  return (
    <div>
      <div className="flex flex-col md:flex-row">
        {/* Sidebar */}
        <AdminSidebar />

        {/* Table */}
        <div className="md:w-3/3 sm:w-full p-4">
          <div className=' flex justify-around'>
            <p className="px-3 py-3 text-2xl font-bold font-serif text-center">USERS</p>
            <div className='search'>
            <input
              type="text"
              placeholder="Search by name, email....."
              value={searchQuery}
              onChange={handleSearchInputChange}
              className="px-2 py-1 rounded-md border border-gray-300 focus:outline-none focus:border-gray-500"
            />
            </div>
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
                {currentItems.map((item, index) => (
                  <tr className="border-b border-gray-300 hover:bg-gray-100" key={index}>
                    <td className="px-4 text-center py-3">{indexOfFirstItem + index + 1}</td>
                    <td className="px-4 text-center  py-3">
                    {item.image ? (
                      <div className="w-12 h-12 rounded-full overflow-hidden"> 
                        <img
                          className=""
                          src={item.image}
                          alt="Generic placeholder image"
                        />
                      </div>
                      ) : (
                        <div className="w-12 h-12 rounded-full overflow-hidden"> 
                        <img
                          className=""
                          src='https://www.shutterstock.com/image-vector/no-user-profile-picture-hand-260nw-99335579.jpg'
                          alt="Generic placeholder image"
                        />
                      </div>
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
            <div className="flex justify-center mt-4">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-1 rounded mr-2"
              >
                Previous
              </button>
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-1 rounded"
              >
                Next
              </button>
            </div>

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
