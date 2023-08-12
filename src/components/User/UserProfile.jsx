import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { axiosInstance } from '../../../Api/config';
import { Navigate, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { updateUser } from '../../redux/UserSlice/UserSlice';

// import { CloudinaryContext, Image, Transformation } from 'cloudinary-react';
function UserProfile() {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);
  const navigate=useNavigate()
  const [profile, setProfile] = useState({
    username: "",
    gender: "",
    phone: "",
    address: "",
    clubs: []
  })
  const [fetched, setFetched] = useState(false);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  useEffect(() => {
    fetchUserData();
  }, []);
   
  const openImageModal = () => {
    setIsImageModalOpen(true);
  };
  const closeImageModal = () => {
    setIsImageModalOpen(false);
  };  
  const handleImageUpdate = async (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'I-club')
    setIsImageModalOpen(false);
    console.log(formData)
    try {
      const  data = await axios.post(`https://api.cloudinary.com/v1_1/dce326gqy/image/upload?upload_preset=I-club`,formData);
      console.log(data.data.secure_url);
      if(data.data.secure_url){
      const imageUrl = data.data.secure_url;
    setSelectedImage(imageUrl);
    const user = JSON.parse(localStorage.getItem("user"))?.user || null;
    const email = user?.email;
    console.log("getuserprofil", email)
      const response= await axiosInstance.post('/user-profileimgupdate',{imageUrl:imageUrl})
      console.log(response.data);
      console.log(response.data.status);
      if (response.data.status == true) {
        fetchUserData();
      }
    }
    } catch (error) {
      // Handle error if the API request fails
    }
  }
  
  
  const fetchUserData = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"))?.user || null;
      const email = user?.email;
      console.log("getuserprofil", email)
      const { data } = await axiosInstance.post('/getuser-profile');
      console.log(data.userdata);
      console.log("fetching");
      setProfile(data.userdata);
      setFetched(true);
    } catch (error) {
      // Handle error if the API request fails
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault()
    const user = JSON.parse(localStorage.getItem("user"))?.user || null;
    const email = user?.email
    console.log(profile)
    console.log(email)
    const { data } = await axiosInstance.post('/user-profileupdate', { ...profile,selectedImage: selectedImage  })
    console.log(data.userprofile)
    if (data.status == true) {
      setFetched(false);
      fetchUserData();
      if (data.message) {
        toast.success(data.message, {
          autoClose: 2000,
          position: toast.POSITION.TOP_RIGHT
        });
      }
    }
  }
  return (
    <div>
      <div className="container mx-auto p-4">
        <div className="bg-primary md:mx-20 text-white p-8 rounded-t-lg flex flex-col sm:flex-row items-center">
          <div className="bg-white rounded-md  mr-4 flex-shrink-0 " >
            <img
             src={fetched ? profile?.image ||'https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI=' :'https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI='}
             alt="Profile"
              className="w-36 h-36 rounded-md object-cover"
            />
          </div>

          <div className="flex flex-col mt-4 sm:mt-0">
            <h5 className="text-xl text-black font-bold">{fetched ? profile?.username : "username"}</h5>
            <p className='text-black'>{fetched ? profile?.email : "email"}</p>
            <br></br>
            <button
              type="button"
              className="ml-5 btn btn-outline-dark text-lg font-mono border p-1 rounded bg-white text-black text-center mt-4"
              onClick={openImageModal}
              >
              edit image
            </button>
            {/* ////////////////modal/////////// */}

           { isImageModalOpen && (<div className="fixed inset-0 z-50 overflow-auto bg-gray-900 bg-opacity-50 flex items-center justify-center">
  <div className="bg-white rounded-lg w-11/12 max-w-md mx-auto p-6">
    <div className="flex justify-between items-center mb-4">
      <h5 className="text-xl font-semibold text-gray-800">Upload Profile Image</h5>
     
    </div>
    <div className="mb-4">
      <input
        type="file"
        className="w-full border border-gray-300 py-2 px-3 rounded-lg bg-gray-100"
        accept="image/*"
        // onChange={(e) => setSelectedImage(e.target.files[0])}
        onChange={handleImageUpdate}
      />
    </div>
    <div className="flex justify-end">
      {/* <button
        type="button"
        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition ease-in-out mr-2"
        // onClick={handleImageUpdate }
        // disabled={!selectedFile}
      >
        Upload
      </button> */}
      <button
        type="button"
        className="px-4 py-2 bg-gray-300 text-gray-900 rounded-lg hover:bg-gray-400 transition ease-in-out"
         onClick={closeImageModal}
      >
        Close
      </button>
    </div>
  </div>
</div>)}

{/* /////////////modal///////////// */}
          
        </div>
        </div>
        <div className=" md:mx-20 text-black p-4 rounded-b-lg">
          <div className="text-center py-1">
            <div className='text-lg font-mono font-bold '>About</div>
          </div>
        </div>
        <div className=" md:mx-40 p-2 text-black">
          <div className="mb-5">
            <form onSubmit={handleUpdate}>
              <div className="m-0 mb-3 flex flex-col md:flex-row">
                <div className=" md:w-40">
                  <p className="mb-0 text-center py-2 md:text-right">Full Name</p>
                </div>
                <div className="md:pl-4 md:w-full">
                  <input
                      type="text"
                      id="las"
                      name="username"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      onChange={(e) => setProfile({ ...profile, [e.target.name]: e.target.value })}
                      placeholder={fetched ? (profile?.username || "username") : ""}
                      required
                    />
                </div>
              </div>
              <div className="m-0 mb-3 flex flex-col md:flex-row">
                <div className=" md:w-40">
                  <p className="mb-0 text-center py-2 md:text-right">Email</p>
                </div>
                <div className="md:pl-4 md:w-full">
                    <input
                      type="email"
                      id="las"
                      name="email"
                      className="bg-gray-50  border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder={fetched ? (profile?.email || "email") : ""}
                      required
                      readOnly
                    />
                </div>
              </div>
              <div className="m-0 mb-3 flex flex-col md:flex-row">
                <div className=" md:w-40">
                  <p className="mb-0 text-center py-2 md:text-right">Gender</p>
                </div>
                <div className="md:pl-4 md:w-full">
                <input
                      type="text"
                      id="las"
                      name='gender'
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      onChange={(e) => setProfile({ ...profile, [e.target.name]: e.target.value })}
                      placeholder={fetched ? (profile?.gender || "gender") : ""}
                      required
                    />
                </div>
              </div>
              <div className="m-0 mb-3 flex flex-col md:flex-row">
                <div className=" md:w-40">
                  <p className="mb-0 text-center py-2 md:text-right">Phone</p>
                </div>
                <div className="md:pl-4 md:w-full">
                <input
                      type="Number"
                      id="las"
                      name='phone'
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      onChange={(e) => setProfile({ ...profile, [e.target.name]: e.target.value })}
                      placeholder={fetched ? (profile?.phone || "phone") : ""}
                      required
                    />
                </div>
              </div>
              <div className="m-0 mb-3 flex flex-col md:flex-row">
                <div className=" md:w-40">
                  <p className="mb-0 text-center py-2 md:text-right">Address</p>
                </div>
                <div className="md:pl-4 md:w-full">
                <input
                      type="text"
                      id="las"
                      name='address'
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      onChange={(e) => setProfile({ ...profile, [e.target.name]: e.target.value })}
                      placeholder={fetched ? (profile?.address || "address") : ""}
                      required
                    />
                </div>
              </div>

              {/* Add similar inputs for other fields (email, phone, about, address) */}
              <div className="text-start">
                <button type="submit" className="btn text-black font-mono rounded-lg px-4 py-1 bg-primary border-2 border-black md:border-2 ml-4 hover:bg-primary hover:text-white transition ease-out duration-500">
                  Update profile
                </button>
              </div>
            </form>
          </div>
          <div className=" d-flex justify-between items-center mb-4">
            <p className="text-xl font-semibold mb-0">Your clubs</p>
            <p className="mb-0"></p>
          </div>
          {profile?.clubs.map((club) => (
            <div className="bg-primary m-6 grid grid-cols-1 rounded-md gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {/* Other grid items */}
              <div key={club._id} className='bg-slate-400 m-2  rounded-md col-span-1 sm:col-span-2 lg:col-span-1 mx-auto flex items-center'>
                <img
                  src="https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI="
                  alt="Profile"
                  className="w-20 h-20 rounded-md object-cover mx-auto"
                />
              </div>
              <div className='text-center md:py-6 flex-grow'>
                <h1 className='text-lg font-mono font-bold'>{club.clubName}<br></br>{club.role}</h1>
                
              </div>
              <div className="md:py-6 ">
                <button
                onClick={()=>{
                  const updatedUser = {
                    id: user.id, 
                    username: user.username,
                    email: user.email,
                    clubName: club.clubName,
                  };
                  dispatch(updateUser(updatedUser));
                  navigate('/clubhome',
                  {state:{userRole:club.role,id:profile._id,club:club.clubName}})}}
                type="submit" className="btn text-black font-mono rounded-lg px-4 py-1 bg-primary border-2 border-black md:border-2 ml-4 hover:bg-primary hover:text-white transition ease-out duration-500">
                  Join To {club.clubName}
                </button>
              </div>

            </div>
          ))}

        </div>
      </div>
      <ToastContainer />
    </div>
  )
}

export default UserProfile















































// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { ToastContainer, toast } from 'react-toastify'
// import 'react-toastify/dist/ReactToastify.css';
// import { axiosInstance } from '../../../Api/config';
// function UserProfile() {
//   const [profile, setProfile] = useState({
//     username: "",
//     gender: "",
//     phone: "",
//     address: "",
//     clubs: []
//   })
//   const [fetched, setFetched] = useState(false);

//   useEffect(() => {
//     fetchUserData();
//   }, []);


//   const fetchUserData = async () => {
//     try {
//       const user = JSON.parse(localStorage.getItem("user"))?.user || null;
//       const email = user?.email;
//       console.log("getuserprofil", email)
//       const { data } = await axiosInstance.post('/getuser-profile', { user: email });
//       console.log(data.userdata);
//       console.log("fetching");
//       setProfile(data.userdata);
//       setFetched(true);
//     } catch (error) {
//       // Handle error if the API request fails
//     }
//   };

//   const handleUpdate = async (e) => {
//     e.preventDefault()
//     const user = JSON.parse(localStorage.getItem("user"))?.user || null;
//     const email = user?.email
//     console.log(profile)
//     console.log(email)
//     const { data } = await axiosInstance.post('/user-profileupdate', { ...profile, user: email })
//     console.log(data.userprofile)
//     if (data.status == true) {
//       setFetched(false);
//       fetchUserData();
//       if (data.message) {
//         toast.success(data.message, {
//           autoClose: 2000,
//           position: toast.POSITION.TOP_RIGHT
//         });
//       }
//     }
//   }
//   return (
//     <div>
//       <div className="container mx-auto p-4">
//         <div className="bg-primary md:mx-20 text-white p-8 rounded-t-lg flex flex-col sm:flex-row items-center">
//           <div className="bg-yellow-200  mr-4 flex-shrink-0 " >
//             <img
//               src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"
//               alt="Profile"
//               className="w-36 h-36 rounded-full object-cover"
//             />
//           </div>

//           <div className="flex flex-col mt-4 sm:mt-0">
//             <h5 className="text-xl text-black font-bold">{fetched ? profile.username : "username"}</h5>
//             <p className='text-black'>{fetched ? profile.email : "email"}</p>
//             <br></br>
//             <button
//               type="button"
//               className="ml-7 btn btn-outline-dark border p-1 rounded bg-white text-black text-center mt-4">
//               Edit profile
//             </button>
//           </div>

//         </div>
//         <div className=" md:mx-20 text-black p-4 rounded-b-lg">
//           <div className="text-center py-1">
//             <div className='text-lg font-mono font-bold '>About</div>
//           </div>
//         </div>
//         <div className=" md:mx-40 p-2 text-black">
//           <div className="mb-5">
//             <form onSubmit={handleUpdate}>
//               <div className="m-0 mb-3 flex flex-col md:flex-row">
//                 <div className=" md:w-40">
//                   <p className="mb-0 text-center py-2 md:text-right">Full Name</p>
//                 </div>
//                 <div className="md:pl-4 md:w-full">
//                   <input
//                       type="text"
//                       id="las"
//                       name="username"
//                       className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//                       onChange={(e) => setProfile({ ...profile, [e.target.name]: e.target.value })}
//                       placeholder={fetched ? (profile.username || "username") : ""}
//                       required
//                     />
//                 </div>
//               </div>
//               <div className="m-0 mb-3 flex flex-col md:flex-row">
//                 <div className=" md:w-40">
//                   <p className="mb-0 text-center py-2 md:text-right">Email</p>
//                 </div>
//                 <div className="md:pl-4 md:w-full">
//                     <input
//                       type="email"
//                       id="las"
//                       name="email"
//                       className="bg-gray-50  border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//                       placeholder={fetched ? (profile.email || "email") : ""}
//                       required
//                       readOnly
//                     />
//                 </div>
//               </div>
//               <div className="m-0 mb-3 flex flex-col md:flex-row">
//                 <div className=" md:w-40">
//                   <p className="mb-0 text-center py-2 md:text-right">Gender</p>
//                 </div>
//                 <div className="md:pl-4 md:w-full">
//                 <input
//                       type="text"
//                       id="las"
//                       name='gender'
//                       className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//                       onChange={(e) => setProfile({ ...profile, [e.target.name]: e.target.value })}
//                       placeholder={fetched ? (profile.gender || "gender") : ""}
//                       required
//                     />
//                 </div>
//               </div>
//               <div className="m-0 mb-3 flex flex-col md:flex-row">
//                 <div className=" md:w-40">
//                   <p className="mb-0 text-center py-2 md:text-right">Phone</p>
//                 </div>
//                 <div className="md:pl-4 md:w-full">
//                 <input
//                       type="Number"
//                       id="las"
//                       name='phone'
//                       className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//                       onChange={(e) => setProfile({ ...profile, [e.target.name]: e.target.value })}
//                       placeholder={fetched ? (profile.phone || "phone") : ""}
//                       required
//                     />
//                 </div>
//               </div>
//               <div className="m-0 mb-3 flex flex-col md:flex-row">
//                 <div className=" md:w-40">
//                   <p className="mb-0 text-center py-2 md:text-right">Address</p>
//                 </div>
//                 <div className="md:pl-4 md:w-full">
//                 <input
//                       type="text"
//                       id="las"
//                       name='address'
//                       className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//                       onChange={(e) => setProfile({ ...profile, [e.target.name]: e.target.value })}
//                       placeholder={fetched ? (profile.address || "address") : ""}
//                       required
//                     />
//                 </div>
//               </div>

//               {/* Add similar inputs for other fields (email, phone, about, address) */}
//               <div className="text-start">
//                 <button type="submit" className="btn text-black font-mono rounded-lg px-4 py-1 bg-primary border-2 border-black md:border-2 ml-4 hover:bg-primary hover:text-white transition ease-out duration-500">
//                   Update profile
//                 </button>
//               </div>
//             </form>
//           </div>
//           <div className=" d-flex justify-between items-center mb-4">
//             <p className="text-xl font-semibold mb-0">Your clubs</p>
//             <p className="mb-0"></p>
//           </div>
//           {profile.clubs.map((club) => (
//             <div className="bg-primary m-6 grid grid-cols-1 rounded-md gap-4 sm:grid-cols-2 lg:grid-cols-3">
//               {/* Other grid items */}
//               <div key={club._id} className='bg-slate-400 m-2  rounded-full col-span-1 sm:col-span-2 lg:col-span-1 mx-auto flex items-center'>
//                 <img
//                   src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"
//                   alt="Profile"
//                   className="w-20 h-20 rounded-full object-cover mx-auto"
//                 />
//               </div>
//               <div className='text-center md:py-6 flex-grow'>
//                 <h1 className='text-lg font-mono font-bold'>{club.clubName}<br></br>{club.role}</h1>
                
//               </div>
//               <div className="md:py-6 ">
//                 <button type="submit" className="btn text-black font-mono rounded-lg px-4 py-1 bg-primary border-2 border-black md:border-2 ml-4 hover:bg-primary hover:text-white transition ease-out duration-500">
//                   Join To {club.clubName}
//                 </button>
//               </div>

//             </div>
//           ))}

//         </div>
//       </div>
//       <ToastContainer />
//     </div>
//   )
// }

// export default UserProfile







