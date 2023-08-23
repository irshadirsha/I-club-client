import React, { useEffect, useState } from 'react';
import AdminSidebar from './AdminSidebar';
import { useLocation } from 'react-router-dom';
import { axiosInstance } from '../../../Api/config';
function AdminClubView() {
const location = useLocation();
const id = location.state?.id;
const [alldata, setAllData] = useState([])
const [post,setPost]=useState([])

   useEffect(() => {
   fetchdata()
   }, [])
const fetchdata = async () => {
console.log("view", id);
const response = await axiosInstance.get(`/admin/club-details?id=${id}`);
console.log(response.data.post);
const fetchedData = response.data.data;
setAllData(fetchedData);
setPost(response.data.post)
console.log(fetchedData);
console.log("pppppppppp",post);
}
return (
<div>
    <div className="flex flex-col md:flex-row">
        {/* Sidebar */}
        <AdminSidebar />
        <div className="md:w-3/3 sm:w-full p-4">
            <div>
                <p className="px-3 py-3 text-2xl font-bold font-serif text-center">CLUB DETAILS</p>
                <div className="container">
                    <div className="flex flex-col md:flex-row items-center">
                        <div className="order-0 md:order-1 md:w-1/2 text-center md:text-right pr-4">
                            <div className="w-full h-500px overflow-hidden">
                                <div className="relative w-full h-full">
                                    <div className="relative top-0 right-0 bottom-0 left-0 rounded-lg flex justify-center items-center overflow-hidden">
                                    <div className="w-64 h-64   flex items-center overflow-hidden">
                                     <img
                                     className="rounded-md"
                                     src={alldata.clubimg || 'https://www.shutterstock.com/image-vector/no-user-profile-picture-hand-260nw-99335579.jpg'}
                                      alt="President"
                                     />
                                     </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="md:w-1/2 md:col-md-7 p-4 md:col-lg-6 text-center md:text-md-start">
                            <a className="text-center font-mono text-3xl">{alldata.clubName}</a>
                            <table className="w-full bg-white rounded-lg shadow-md">

                                <tbody>
                                    <tr className="bg-gray-200">
                                        <td className="font-semibold py-2 pr-2">Place</td>
                                        <td className="py-2">{alldata?.address}</td>
                                    </tr>
                                    <tr className="bg-gray-100">
                                        <td className="font-semibold py-2 pr-2">Category</td>
                                        <td className="py-2">{alldata?.category}</td>
                                    </tr>
                                    <tr className="bg-gray-200">
                                        <td className="font-semibold py-2 pr-2">Members</td>
                                        <td className="py-2">{alldata?.members?.length}</td>
                                    </tr>
                                    <tr className="bg-gray-100">
                                        <td className="font-semibold py-2 pr-2">Register No</td>
                                        <td className="py-2">{alldata?.registerNo}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                {/* /////////////////////////////////// */}
                <div className='bg-gray-200 m-8 p-4 text-lg font-mono font-bold flex justify-around'>
                    <p>post </p>
                    <p>members</p>
                </div>
                


                <div className="bg-gray-300 container" style={{ maxHeight: '600px', overflowY: 'auto' }}>
               <div className="flex flex-col md:flex-row items-center">
                {/* ... */}
                <div  className="  md:w-1/3 text-center md:text-right pr-4">
                            <div className=" w-full h-500px overflow-hidden">
                                <div className="relative w-full h-full">
                                    {post?.map((post,index)=>(
                                    <div key={index} className="relative pt-2 top-0 right-0 bottom-0 left-0 rounded-lg flex justify-center overflow-hidden">
                                    <div  className="w-24 h-28  flex items-center overflow-hidden">
                                     <img
                                     className="rounded-md"
                                     src={post?.postimg || 'https://www.shutterstock.com/image-vector/no-user-profile-picture-hand-260nw-99335579.jpg'}
                                      alt="President"
                                     />
                                     </div>
                                    </div>))}
                                    {post && post.length === 0 && (
                                   <div className="relative pt-2 top-0 right-0 bottom-0 left-0 rounded-lg flex justify-center items-center overflow-hidden">
                                   <div className="w-60 h-56 flex items-center overflow-hidden">
                                  <img
                                   className="rounded-md"
                                    src="https://img.republicworld.com/republic-prod/stories/promolarge/hdpi/1kutzil5lj0nvfsf_1596544016.jpeg"
                                 alt="Default"
                                 />
                            </div>
                        </div>
                       )}
                 </div>
                    </div>
                        </div>
               <div className="w-full md:w-2/3 md:col-md-7 p-4 md:col-lg-6 text-center md:text-md-start">
              <table className="w-full bg-white rounded-lg shadow-md">
              <thead className="bg-gray-100">
              {/* ... */}
                        <tr>
                            <th className="font-semibold py-2 pr-2">Image</th>
                            <th className="font-semibold py-2 pr-2">Name</th>
                            <th className="font-semibold py-2 pr-2">Role</th>
                        </tr>
              </thead>
             <tbody>
             {/* ... */}
             <tr className="bg-gray-100">
                                        <td className="py-2">
                                            <div className=' flex justify-center'>
                                            <div className="w-16 h-16 rounded-full overflow-hidden">
                                                <img
                                                    className=""
                                                    src={alldata?.president?.image || 'https://www.shutterstock.com/image-vector/no-user-profile-picture-hand-260nw-99335579.jpg'}
                                                    alt="President"
                                                />
                                                </div>
                                            </div>
                                        </td>
                                        <td className="py-2">{alldata?.president?.username}</td>
                                        <td className="py-2">President</td>
                                    </tr>
                                    <tr className="bg-gray-200">
                                        <td className="py-2">
                                            <div className=' flex justify-center'>
                                                <div className="w-16 h-16 rounded-full overflow-hidden">
                                                <img
                                                    className=""
                                                    src={alldata?.secretory?.image || 'https://www.shutterstock.com/image-vector/no-user-profile-picture-hand-260nw-99335579.jpg'}
                                                    alt="Secretary"
                                                />

                                                </div>
                                            </div>
                                        </td>
                                        <td className="py-2">{alldata?.secretory?.username}</td>
                                        <td className="py-2">Secretary</td>
                                    </tr>
                                    <tr className="bg-gray-100">
                                        <td className="py-2">
                                            <div className=' flex justify-center'>
                                            <div className="w-16 h-16 rounded-full overflow-hidden">
                                                <img
                                                    className=""
                                                    src={alldata?.treasurer?.image || 'https://www.shutterstock.com/image-vector/no-user-profile-picture-hand-260nw-99335579.jpg'}
                                                    alt="Treasurer"
                                                />
                                                </div>
                                            </div>
                                        </td>
                                        <td className="py-2">{alldata?.treasurer?.username}</td>
                                        <td className="py-2">Treasurer</td>
                                    </tr>
                                    {alldata?.members?.map((member, index) => (
                                        <tr key={index} className={index % 2 === 0 ? 'bg-gray-200' : 'bg-gray-100'}>
                                            <td className="py-2">
                                                <div className=' flex justify-center'>
                                                <div className="w-16 h-16 rounded-full overflow-hidden">
                                                    <img
                                                        className=""
                                                        src={member?.image || 'https://www.shutterstock.com/image-vector/no-user-profile-picture-hand-260nw-99335579.jpg'}
                                                        // alt={`Club Member ${index + 1}`}
                                                    />
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="py-2">{member?.username}</td>
                                            <td className="py-2">Member</td>
                                        </tr>
                                    ))}
                               </tbody>
                            </table>
                           </div>
                         </div>
                      </div>
                {/* ////////////////////////////////// */}
            </div>
        </div>
    </div>
</div>
);
}

export default AdminClubView;






























// import React, { useEffect, useState } from 'react';
// import AdminSidebar from './AdminSidebar';
// import { useLocation } from 'react-router-dom';
// import { axiosInstance } from '../../../Api/config';
// function AdminClubView() {
// const location = useLocation();
// const id = location.state?.id;
// const [alldata, setAllData] = useState([])
// const [post,setPost]=useState([])

//    useEffect(() => {
//    fetchdata()
//    }, [])
// const fetchdata = async () => {
// console.log("view", id);
// const response = await axiosInstance.get(`/admin/club-details?id=${id}`);
// console.log(response.data.post);
// const fetchedData = response.data.data;
// setAllData(fetchedData);
// setPost(response.data.post)
// console.log(fetchedData);
// console.log("pppppppppp",post);
// }
// return (
// <div>
//     <div className="flex flex-col md:flex-row">
//         {/* Sidebar */}
//         <AdminSidebar />
//         <div className="md:w-3/3 sm:w-full p-4">
//             <div>
//                 <p className="px-3 py-3 text-2xl font-bold font-serif text-center">CLUB DETAILS</p>
//                 <div className="container">
//                     <div className="flex flex-col md:flex-row items-center">
//                         <div className="order-0 md:order-1 md:w-1/2 text-center md:text-right pr-4">
//                             <div className="w-full h-500px overflow-hidden">
//                                 <div className="relative w-full h-full">
//                                     <div className="relative top-0 right-0 bottom-0 left-0 rounded-lg flex justify-center items-center overflow-hidden">
//                                     <div className="w-64 h-64   flex items-center overflow-hidden">
//                                      <img
//                                      className="rounded-md"
//                                      src={alldata.clubimg || 'https://www.shutterstock.com/image-vector/no-user-profile-picture-hand-260nw-99335579.jpg'}
//                                       alt="President"
//                                      />
//                                      </div>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                         <div className="md:w-1/2 md:col-md-7 p-4 md:col-lg-6 text-center md:text-md-start">
//                             <a className="text-center font-mono text-3xl">{alldata.clubName}</a>
//                             <table className="w-full bg-white rounded-lg shadow-md">

//                                 <tbody>
//                                     <tr className="bg-gray-200">
//                                         <td className="font-semibold py-2 pr-2">Place</td>
//                                         <td className="py-2">{alldata?.address}</td>
//                                     </tr>
//                                     <tr className="bg-gray-100">
//                                         <td className="font-semibold py-2 pr-2">Category</td>
//                                         <td className="py-2">{alldata?.category}</td>
//                                     </tr>
//                                     <tr className="bg-gray-200">
//                                         <td className="font-semibold py-2 pr-2">Members</td>
//                                         <td className="py-2">{alldata?.members?.length}</td>
//                                     </tr>
//                                     <tr className="bg-gray-100">
//                                         <td className="font-semibold py-2 pr-2">Register No</td>
//                                         <td className="py-2">{alldata?.registerNo}</td>
//                                     </tr>
//                                 </tbody>
//                             </table>
//                         </div>
//                     </div>
//                 </div>
//                 {/* /////////////////////////////////// */}
//                 <div className='bg-gray-200 m-8 p-4 text-lg font-mono font-bold flex justify-around'>
//                     <p>post </p>
//                     <p>members</p>
//                 </div>

//                 <div className="bg-gray-300  container">
//                     <div className="flex flex-col md:flex-row items-center">
                        
//                         <div  className="  md:w-1/3 text-center md:text-right pr-4">
//                             <div className=" w-full h-500px overflow-hidden">
//                                 <div className="relative w-full h-full">
//                                     {post?.map((post,index)=>(
//                                     <div key={index} className="relative pt-2 top-0 right-0 bottom-0 left-0 rounded-lg flex justify-center overflow-hidden">
//                                     <div  className="w-24 h-28  flex items-center overflow-hidden">
//                                      <img
//                                      className="rounded-md"
//                                      src={post?.postimg || 'https://www.shutterstock.com/image-vector/no-user-profile-picture-hand-260nw-99335579.jpg'}
//                                       alt="President"
//                                      />
//                                      </div>
//                                     </div>))}
//                                     {post && post.length === 0 && (
//                                    <div className="relative pt-2 top-0 right-0 bottom-0 left-0 rounded-lg flex justify-center items-center overflow-hidden">
//                                    <div className="w-60 h-56 flex items-center overflow-hidden">
//                                   <img
//                                    className="rounded-md"
//                                     src="https://img.republicworld.com/republic-prod/stories/promolarge/hdpi/1kutzil5lj0nvfsf_1596544016.jpeg"
//                                  alt="Default"
//                                  />
//                             </div>
//                         </div>
//                        )}
//                  </div>
//                     </div>
//                         </div>
                        

//                         <div className=" w-full md:w-2/3 md:col-md-7 p-4 md:col-lg-6 text-center md:text-md-start">
//                          <table className="w-full bg-white rounded-lg shadow-md">
//                            <thead className="bg-gray-100">
//                               {/* ... */}
//                            </thead>
//                            <tbody style={{ maxHeight: '300px', overflowY: 'auto' }}>
//                              {/* ... */}
//                             </tbody>
//                            </table>
//                           </div>





//                         <div className=" w-full md:w-2/3 md:col-md-7 p-4 md:col-lg-6 text-center md:text-md-start">
//                             <table className="w-full bg-white rounded-lg shadow-md">
//                                 <thead className="bg-gray-100">
//                                     <tr>
//                                         <th className="font-semibold py-2 pr-2">Image</th>
//                                         <th className="font-semibold py-2 pr-2">Name</th>
//                                         <th className="font-semibold py-2 pr-2">Role</th>
//                                     </tr>
//                                 </thead>
//                                 <tbody>
//                                     <tr className="bg-gray-100">
//                                         <td className="py-2">
//                                             <div className=' flex justify-center'>
//                                             <div className="w-16 h-16 rounded-full overflow-hidden">
//                                                 <img
//                                                     className=""
//                                                     src={alldata?.president?.image || 'https://www.shutterstock.com/image-vector/no-user-profile-picture-hand-260nw-99335579.jpg'}
//                                                     alt="President"
//                                                 />
//                                                 </div>
//                                             </div>
//                                         </td>
//                                         <td className="py-2">{alldata?.president?.username}</td>
//                                         <td className="py-2">President</td>
//                                     </tr>
//                                     <tr className="bg-gray-200">
//                                         <td className="py-2">
//                                             <div className=' flex justify-center'>
//                                                 <div className="w-16 h-16 rounded-full overflow-hidden">
//                                                 <img
//                                                     className=""
//                                                     src={alldata?.secretory?.image || 'https://www.shutterstock.com/image-vector/no-user-profile-picture-hand-260nw-99335579.jpg'}
//                                                     alt="Secretary"
//                                                 />

//                                                 </div>
//                                             </div>
//                                         </td>
//                                         <td className="py-2">{alldata?.secretory?.username}</td>
//                                         <td className="py-2">Secretary</td>
//                                     </tr>
//                                     <tr className="bg-gray-100">
//                                         <td className="py-2">
//                                             <div className=' flex justify-center'>
//                                             <div className="w-16 h-16 rounded-full overflow-hidden">
//                                                 <img
//                                                     className=""
//                                                     src={alldata?.treasurer?.image || 'https://www.shutterstock.com/image-vector/no-user-profile-picture-hand-260nw-99335579.jpg'}
//                                                     alt="Treasurer"
//                                                 />
//                                                 </div>
//                                             </div>
//                                         </td>
//                                         <td className="py-2">{alldata?.treasurer?.username}</td>
//                                         <td className="py-2">Treasurer</td>
//                                     </tr>
//                                     {alldata?.members?.map((member, index) => (
//                                         <tr key={index} className={index % 2 === 0 ? 'bg-gray-200' : 'bg-gray-100'}>
//                                             <td className="py-2">
//                                                 <div className=' flex justify-center'>
//                                                 <div className="w-16 h-16 rounded-full overflow-hidden">
//                                                     <img
//                                                         className=""
//                                                         src={member?.image || 'https://www.shutterstock.com/image-vector/no-user-profile-picture-hand-260nw-99335579.jpg'}
//                                                         // alt={`Club Member ${index + 1}`}
//                                                     />
//                                                     </div>
//                                                 </div>
//                                             </td>
//                                             <td className="py-2">{member?.username}</td>
//                                             <td className="py-2">Member</td>
//                                         </tr>
//                                     ))}
//                                 </tbody>
//                             </table>
//                         </div>

//                     </div>
//                 </div>

//                 {/* ////////////////////////////////// */}
//             </div>
//         </div>
//     </div>
// </div>
// );
// }

// export default AdminClubView;
