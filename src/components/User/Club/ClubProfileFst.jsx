import axios from 'axios';
import React,{useState,useEffect} from 'react'
import { axiosInstance } from '../../../../Api/config';
import { useSelector } from 'react-redux';
import { ToastContainer,toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import Loader from '../../Loader/Loader'



function ClubProfileFst() {
  const cloudName = import.meta.env.VITE_CLOUD_NAME;
  const navigate=useNavigate()
    const {clubName}=useSelector((state)=>state.user)
    const {id}=useSelector((state)=>state.user)
    const currentUser=id
    console.log("currentUser",currentUser);
    const [loading, setLoading] = useState(true);
    const [isImageModalOpen, setIsImageModalOpen] = useState(false);
    const [postmodalOpen, setPostModalOpen]=useState(false)
    const [profileimage,setProfileImage]=useState(null)
    const [postimage, setPostImage] = useState({
        image: null,
        description: '',
      });
      const [profiledata,setProfileData]=useState([])
      const [userRole, setUserRole] = useState('');
      const [postdata,setPostData]=useState([])
      const [errors, setErrors] = useState({
        profilerr: "",
        posterr:""
      });
    useEffect(()=>{
        fetchdata()
    },[])
    const fetchdata=async ()=>{
        const datas =await axiosInstance.get('/get-clubprofile',{
            params: { clubName }
        })
        console.log("response of get club profile",datas)
        setProfileData(datas.data.clubExist)
        setUserRole(datas.data.userRole)
        setPostData(datas.data.postdata)
        setLoading(false)
    }

    const openImageModal = () => {
        setIsImageModalOpen(true);
      };
      const closeImageModal = () => {
        setIsImageModalOpen(false);
        setErrors({})
      }; 
      const openPostModal = () => {
        setPostModalOpen(true);
      };
      const closePostModal = () => {
        setPostModalOpen(false);
        setErrors({})
      };
      const uploadProfileImage =async(e)=>{
          e.preventDefault()
          if( profileimage == null){
            setErrors({
              ...errors,
              profilerr: "Please select Your Profile Image.",
            });
            return;
          }
          const formData = new FormData();
          formData.append('file', profileimage);
          formData.append('upload_preset', 'I-club');
          const  data = await axios.post(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload?upload_preset=I-club`,formData);
          closeImageModal()
          console.log(data.data.secure_url);
          const imageUrl = data.data.secure_url;
          setProfileImage(imageUrl)
          const doce =await axiosInstance.post('/add-clubprofile',{clubName,imageUrl})
          setProfileImage(null)
          if (doce.data.message) {
            toast.success(doce.data.message)
            fetchdata() 
        }
      }

      const handlePostImageUpload = async (e) => {
        e.preventDefault();
        if( postimage.image == null){
          setErrors({
            ...errors,
            posterr: "Please select Your Post Image.",
          });
          return;
        }
        const formData = new FormData();
        formData.append('file', postimage.image);
        formData.append('upload_preset', 'I-club');
        try {
            const  response = await axios.post(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload?upload_preset=I-club`,formData);
        setPostImage({
          image: null,
          description: '',
        })
        closePostModal()
        console.log(response.data.secure_url);
        const postimageUrl = response.data.secure_url;
        const postData = {
            clubName,
            postimageUrl,
            description: postimage.description,
          };
          const res=await axiosInstance.post('/add-clubpost',postData)
          if (res.data.message) {
            toast.success(res.data.message)
            fetchdata()
          }
        } catch (error) {
            console.log(" internal error clubpost")
        }
      }
      const handleDeletePost = async (postId) => {
        Swal.fire({
          title: 'Delete ClubPost Confirmation',
          text: 'Are you sure you want to delete post?',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Yes,Delete!',
          cancelButtonText: 'Cancel',
        }).then(async (result) => {
          if (result.isConfirmed) {
            const {data}= await axiosInstance.post('/delete-post',{postId})
            if (data.message) {
              Swal.fire('Success',data.message, 'success');
            }
            fetchdata()
          }
        });
      }
    

      const leaveclub = async () => {
        // e.preventDefault()
        Swal.fire({
          title: 'Leave Club Confirmation',
          text: 'Are you sure you want to leave the club?',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Yes, leave!',
          cancelButtonText: 'Cancel',
        }).then(async (result) => {
          if (result.isConfirmed) {
            const response = await axiosInstance.post('/leave-club', { clubName });
            if (response.data.message) {
              Swal.fire('Success', response.data.message, 'success');
            }
            navigate('/');
          }
        });
      };
      
      const handlelike =async (id) =>{
        // e.preventDefault()
        try {
          const {data}= await axiosInstance.post('/post-like',{clubName,postId:id}) 
          fetchdata()
        } catch (error) {
          console.log("error in add like api");
        }
      }
  return (
    <div>
      {loading && <Loader/>}
       <section className="pt-16 bg-primary">
<div className="container mx-auto">
    <div className=" flex flex-col md:flex-row ">
        <div className=" md:w-6/12 md:text-left text-center py-2 ">
            <div className=" text-center md:text-start md:pl-6 pl-4 pr-8 md:ml-8 md:mt-5">
                <h1 className="text-5xl font-mono text-yellow-400 text-center md:pl-8 md:text-start font-semibold mb-4">{profiledata?.clubName}</h1>
                {/* <p className='font-bold text-2xl font-mono p-1 text-black '>place:{profiledata?.address}</p> */}
                <p className='font-bold text-2xl font-mono p-1 text-black '>
                place: {profiledata?.address?.split(' ').slice(0, 4).join(' ')}</p>
                <p className='font-bold text-2xl font-mono p-1 text-black '>member:{profiledata?.members?.length}</p>
                <p className='font-bold text-2xl font-mono p-1 text-black '>category:{profiledata?.category}</p>
                <p className='font-bold text-2xl font-mono p-1 text-black '>register no:{profiledata?.registerNo}</p>
                <p className='font-bold text-2xl font-mono p-1 text-black '>about:{profiledata?.about}</p>
               {(userRole ==='president' || userRole === 'secretory') && (<div className=' md:flex justify-evenly p-2 '>
                <div className="mt-4 ">
                    <button
                    onClick={openImageModal}
                    className="btn text-black font-mono rounded-lg px-2 py-1 bg-white border-2 border-black md:border-2 ml-4 ">
                        Edit profile
                    </button>
                </div>
                <div className="mt-4 ">
                    <button 
                    onClick={openPostModal}
                    className="btn text-black font-mono rounded-lg px-2 py-1 bg-white border-2 border-black md:border-2 ml-4">
                      Add Post
                    </button>
                </div>
                <div className="mt-4 ">
                    <button 
                    onClick={()=>{navigate('/club-setting')}}
                    className="btn text-black font-mono rounded-lg px-2 py-1 bg-white border-2 border-black md:border-2 ml-4 ">
                        Club Setting
                    </button>
                </div>
                </div>)}
            </div>
        </div>
{/* ////////////////////////////// */}
     { isImageModalOpen && <div className="fixed inset-0 z-50 overflow-auto bg-gray-900 bg-opacity-50 flex items-center justify-center">
  <div className="bg-white rounded-lg w-11/12 max-w-md mx-auto p-6">
    <div className="flex justify-between items-center mb-4">
      <h5 className="text-xl font-semibold text-gray-800">Upload Club Profile Image</h5>
    </div>
    <div className="mb-4">
      <input
        type="file"
        className="w-full border border-gray-300 py-2 px-3 rounded-lg bg-gray-100"
        accept="image/*"
        // onChange={(e) => setProfileImage(e.target.files[0])}
        onChange={(e) => {
          const selectedFile = e.target.files[0];
          if (selectedFile && selectedFile.type.includes('image')) {
            setProfileImage(selectedFile);
            setErrors({ ...errors, profilerr: null });
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
        onClick={uploadProfileImage}
        // disabled={!profileimage}
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
</div> }
{/* ////////////////////////////// */}

{postmodalOpen && <div className="fixed inset-0 z-50 overflow-auto bg-gray-900 bg-opacity-50 flex items-center justify-center">
  <div className="bg-white rounded-lg w-11/12 max-w-md mx-auto p-6">
    <div className="flex justify-between items-center mb-4">
      <h5 className="text-xl font-semibold text-gray-800">Upload Club Post Image</h5>
    </div>
    <div className="mb-4">
      <input
        type="file"
        className="w-full border border-gray-300 py-2 px-3 rounded-lg bg-gray-100"
        accept="image/*"
        multiple
        onChange={(e) => {
          const selectedFile = e.target.files[0];
          if (selectedFile && selectedFile.type.includes('image')) {
            setPostImage({ ...postimage, image: selectedFile });
            setErrors({ ...errors, posterr: null });
          } else {
            setErrors({ ...errors, posterr: "Please select a valid image file." });
          }
        }}
      />
      {errors.posterr && <p className="text-red-500 text-center">{errors.posterr}</p>}
   
    </div>
    <div className="mb-4">
      <textarea
        className="w-full border border-gray-300 py-2 px-3 rounded-lg bg-gray-100"
        placeholder="Enter post description"
        // onChange={(e) => setPostImage(e.target.value)
          value={postimage.description}
                  onChange={(e) =>setPostImage({...postimage,description: e.target.value,
                    })
                  }
      />
    </div>
    <div className="flex justify-end">
      <button
        type="button"
        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition ease-in-out mr-2"
        onClick={handlePostImageUpload}
        // disabled={!selectedImage}
      >
        Upload
      </button>
      <button
        type="button"
        className="px-4 py-2 bg-gray-300 text-gray-900 rounded-lg hover:bg-gray-400 transition ease-in-out"
         onClick={closePostModal}
      >
        Close
      </button>
    </div>
  </div>
</div> }

{/* ////////////////////////////// */}




  <div className=" md:w-6/12 md:order-0 order-1 md:text-center mt-5 md:mt-0">
    <div className="rounded-lg p-4 overflow-hidden event-style">
        <div className="relative w-full h-full">
            <div className="relative top-0 right-0 bottom-0 left-0 rounded-lg overflow-hidden">
                <img
                    className="pt-7 rounded-xl md:pt-0 w-full h-auto md:w-120 md:h-96 lg:w-120 lg:h-120 xl:w-160 xl:h-160 mx-auto object-contain"
                    src={profiledata?.clubimg || "https://static3.depositphotos.com/1006009/206/i/450/depositphotos_2061693-stock-photo-no-image-available-text-on.jpg"}
                    alt="Club image"
                />
            </div>
        </div>
    </div>
</div>
 </div>
 <div>
    <h1 className=' pl-16 font-extrabold text-2xl font-mono text-yellow-400 ' >POSTS</h1>
 </div>
     
     {/* ///////////////////////////// */}
     <div className=" grid grid-cols-1 md:grid-cols-4 gap-4 p-8">
  {postdata?.length > 0 ? (
    postdata?.map((post, index) => (
      <div key={index} className="bg-gray-200 w-full border border-gray-300 rounded-lg shadow-md overflow-hidden">
        {/* Rest of your card content */}
        {(userRole ==='president' || userRole === 'secretory') && (
         ( <div  onClick={() => handleDeletePost(post._id)}  className=' p-1 w-12'>
        <svg xmlns="http://www.w3.org/2000/svg"  fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="m-2 w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
   />
</svg>
      </div>))}
        <img
          className="w-full h-56 object-contain"
          src={post.postimg}
          alt="Post"
        />
        <div className="flex justify-between pr-8 py-1">
          <p className="px-6">{new Date(post.date).toLocaleDateString()}</p>
          <p
            onClick={() => handlelike(post._id)}
            className="px-2 text-gray-700 text-lg text-center font-semibold"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill={post.likes.includes(currentUser) ? '-2.733C5' : 'none'}
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
              />
            </svg>
            <p>{post?.likes.length}</p>
          </p>
        </div>
        <div className="p-1">
          <p className="text-gray-700 text-lg text-center font-semibold">
            {post.desc}
          </p>
        </div>
      </div>
    ))
  ) : (
    <div className="w-full md:col-span-1 p-6">
      <div className="bg-gray-200 border border-gray-300 rounded-lg shadow-md overflow-hidden">
        {/* Placeholder content for empty data */}
        <img
          className="w-full h-56 object-contain"
          src="https://img.republicworld.com/republic-prod/stories/promolarge/hdpi/1kutzil5lj0nvfsf_1596544016.jpeg"
          alt="Post"
        />
        <div className="p-4">
          <p className="text-gray-700 text-center text-lg font-semibold">
            Images
          </p>
        </div>
      </div>
    </div>
  )}
</div>

     {/* ///////////////////////////// */}


 {/* <div className="bg-red-400 flex justify-center p-8 space-x-4 flex-wrap">
 {postdata?.length > 0 ? (
    postdata?.map((post, index) => (
      <div  className="bg-green-700 w-full md:w-1/4 p-6 overflow-hidden">

      <div className="bg-gray-900 border border-gray-300 rounded-lg shadow-md ">
        {(userRole ==='president' || userRole === 'secretory') && (
         ( <div  onClick={() => handleDeletePost(post._id)}  className=' p-1 w-12'>
        <svg xmlns="http://www.w3.org/2000/svg"  fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="m-2 w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
   />
</svg>
      </div>))}
          <img
              className="w-full h-56 object-contain"
              src={post.postimg}
              alt="Post"
          />
           <div className="flex justify-between  pr-8 py-1">
           <p className='px-6'>{new Date(post.date).toLocaleDateString()}</p>
              <p onClick={()=>handlelike(post._id) }
              className=" px-2  text-gray-700 text-lg text-center font-semibold">
                <svg xmlns="http://www.w3.org/2000/svg"  fill={post.likes.includes(currentUser) ? '-2.733C5'  :'none' }  viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
           <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
              </svg>
              <p>{post?.likes.length}</p>
              </p>
             

          </div>
          <div className="p-1">
              <p className="text-gray-700 text-lg text-center font-semibold">{post.desc}</p>
          </div>
      </div>
  </div>
  
    ))):(
      <div className="w-full md:w-1/4 p-6 overflow-hidden" >
      <div className="bg-gray-200 border border-gray-300 rounded-lg shadow-md ">
          <img
              className="w-full h-56 object-contain"
              src="https://img.republicworld.com/republic-prod/stories/promolarge/hdpi/1kutzil5lj0nvfsf_1596544016.jpeg"
              alt="Post"
          />
          <div className="p-4">
              <p className="text-gray-700 text-center text-lg font-semibold">Images</p>
          </div>
      </div>
  </div>
    )}
</div> */}


 {(userRole == 'member') && (<div className='flex justify-center  pb-4'>
      <button 
          onClick={leaveclub}
          className="btn text-black font-mono rounded-lg px-2 py-1 bg-primary border-2 border-black md:border-2 ml-4 hover:bg-primary hover:text-white transition ease-out duration-500">
            Leave club
          </button>
        </div>)}
    </div>
    </section> 
    <ToastContainer/>
    </div>
  )
}

export default ClubProfileFst























