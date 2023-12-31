import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { axiosInstance } from '../../../Api/config';
import { Navigate, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { updateUser } from '../../redux/UserSlice/UserSlice';
import Loader from '../Loader/Loader';


function UserProfile() {
  const cloudName = import.meta.env.VITE_CLOUD_NAME;
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);
  const navigate=useNavigate()
  const [loading, setLoading] = useState(true);
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
  const [clubdata,setClubData]=useState([])
  const [errors, setErrors] = useState({
    profilerr: "",
  });
  useEffect(() => {
    fetchUserData();
  }, []);
  const openImageModal = () => {
    setIsImageModalOpen(true);
  };
  const closeImageModal = () => {
    setIsImageModalOpen(false);
    setErrors({
      ...errors,
        profilerr: null
    })
  };  
  const handleImageUpdate = async (e) => {
    e.preventDefault();
    try {
    if (selectedImage === null) {
      setErrors({
        ...errors,
        profilerr: "Please select Your Profile Image.",
      });
      return;
    }
    const formData = new FormData();
    formData.append('file', selectedImage);
    formData.append('upload_preset', 'I-club')
    setIsImageModalOpen(false);
      const  data = await axios.post(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload?upload_preset=I-club`,formData);
      if(data.data.secure_url){
      const imageUrl = data.data.secure_url;
    setSelectedImage(imageUrl);
    const user = JSON.parse(localStorage.getItem("user"))?.user || null;
    const email = user?.email;
      const response= await axiosInstance.post('/user-profileimgupdate',{imageUrl:imageUrl})
      setSelectedImage(null)
      if (response.data.status == true) {
        fetchUserData();
      }
    }
    } catch (error) {
      console.log("error in userprofile edit");
    }
  }
  
  
  const fetchUserData = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"))?.user || null;
      const email = user?.email;
      const { data } = await axiosInstance.post('/getuser-profile');
      setClubData(data.userdata.clubs)
      setProfile(data.userdata);
      setFetched(true);
      setLoading(false)
    } catch (error) {
      // Handle error if the API request fails
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault()
    const user = JSON.parse(localStorage.getItem("user"))?.user || null;
    const email = user?.email
    const { data } = await axiosInstance.post('/user-profileupdate', { ...profile,selectedImage: selectedImage  })
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
      {loading && <Loader/>}
      <div className="container mx-auto p-4">
        <div className="bg-primary md:mx-20 text-white p-8 rounded-t-lg flex flex-col sm:flex-row items-center">
         <div className="bg-white rounded-md mr-4 flex-shrink-0">
         <img
         src={fetched ? profile?.image || 'https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI=' : 'https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI='}
         alt="Profile"
         className="w-36 h-36 rounded-md object-cover object-top"
         />
        </div>

          <div className="flex flex-col mt-4 sm:mt-0">
            <h5 className="text-xl text-white font-bold">{fetched ? profile?.username : "username"}</h5>
            <p className='text-white'>{fetched ? profile?.email : "email"}</p>
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
        // onChange={handleImageUpdate}
       onChange={(e) => {
              const selectedFile = e.target.files[0];
              if (selectedFile && selectedFile.type.includes('image')) {
                setSelectedImage(selectedFile);
                setErrors({ ...errors, profilerr: null }); // Clear the error here
              } else {
                setErrors({
                  ...errors,
                  profilerr: "Please select a valid image file.",
                });
                return;
              }
            }}
          />
          {errors.profilerr && <p className="text-red-500 text-center">{errors.profilerr}</p>}
    </div>
    <div className="flex justify-end">
      <button
        type="button"
        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition ease-in-out mr-2"
        onClick={handleImageUpdate }
        // disabled={!selectedFile}
      >
        Upload
      </button>
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
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
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
                      // className="bg-gray-50  border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
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
                      // className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
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
                      // className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
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
                      // className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
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
            
              <div  className='bg-slate-400  m-2 w-20 h-20 rounded-md col-span-1 sm:col-span-2 lg:col-span-1 mx-auto flex items-center'>
                <img
                  src={club?.club?.clubimg || "https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI="}
                  alt="Profile"
                  className=" rounded-md object-cover p-2"
                />
              </div>
              <div className='text-center md:py-6 flex-grow'>
                <h1 className='text-lg text-white font-mono font-bold'>{club.clubName}<br></br>{club.role}</h1>
                
              </div>
              {club?.club?.isblacklisted === true ? (
                  <h1 className='text-red-600 flex items-center'>This club is blacklisted</h1>
                ) :(
              <div className="sm:flex justify-center pb-1 md:py-6 flex items-center ">
                <button
                onClick={()=>{
                  const updatedUser = {
                    id: user.id, 
                    username: user.username,
                    email: user.email,
                    clubName: club.clubName,
                  };
                  dispatch(updateUser(updatedUser));
                  navigate('/clubhome',)}}
                type="submit" className="btn text-black font-mono rounded-lg px-4 py-1 bg-white border-2 border-black ">
                  View {club.clubName}
                </button>
              </div>)}

            </div>
          ))}
          
          
        </div>
      </div>
      <ToastContainer />
    </div>
  )
}

export default UserProfile



































