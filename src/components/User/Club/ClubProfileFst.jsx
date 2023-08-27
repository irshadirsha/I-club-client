import axios from 'axios';
import React,{useState,useEffect} from 'react'
import { axiosInstance } from '../../../../Api/config';
import { useSelector } from 'react-redux';
import { ToastContainer,toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom';
// import Swal from 'sweetalert2/dist/sweetalert2.js';
import Swal from 'sweetalert2';



function ClubProfileFst() {
  const cloudName = import.meta.env.VITE_CLOUD_NAME;
  const navigate=useNavigate()
    const {clubName}=useSelector((state)=>state.user)
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
        console.log(datas.data.postdata)
    }

    const openImageModal = () => {
        setIsImageModalOpen(true);
      };
      const closeImageModal = () => {
        setIsImageModalOpen(false);
      }; 
      const openPostModal = () => {
        setPostModalOpen(true);
      };
      const closePostModal = () => {
        setPostModalOpen(false);
      };
      const uploadProfileImage =async(e)=>{
          e.preventDefault()
          const formData = new FormData();
          formData.append('file', profileimage);
          formData.append('upload_preset', 'I-club');
          console.log(formData)

          const  data = await axios.post(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload?upload_preset=I-club`,formData);
          closeImageModal()
          console.log(data.data.secure_url);
          const imageUrl = data.data.secure_url;
          setProfileImage(imageUrl)
          const doce =await axiosInstance.post('/add-clubprofile',{clubName,imageUrl})
          console.log(doce)
          if (doce.data.message) {
            toast.success(doce.data.message)
            fetchdata() 
        }
          console.log(doce.data)
      }

      const handlePostImageUpload = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('file', postimage.image);
        formData.append('upload_preset', 'I-club');
        try {
            const  response = await axios.post(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload?upload_preset=I-club`,formData);
        console.log(response)
        closePostModal()
        console.log(response.data.secure_url);
        const postimageUrl = response.data.secure_url;
        const postData = {
            clubName,
            postimageUrl,
            description: postimage.description,
          };
          console.log(postData,"_____________________________________________");
          const res=await axiosInstance.post('/add-clubpost',postData)
          console.log(res,"----------------------------------------------------");
          console.log(res.data.message);
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
            console.log('leave', clubName);
            const response = await axiosInstance.post('/leave-club', { clubName });
      
            if (response.data.message) {
              Swal.fire('Success', response.data.message, 'success');
            }
            console.log(response);
            navigate('/');
          }
        });
      };
      
      
  return (
    <div>
      <section className="pt-16 bg-primary">
<div className="container mx-auto">
    <div className=" flex flex-col md:flex-row ">
        <div className=" md:w-6/12 md:text-left text-center py-2 ">
            <div className=" text-center md:text-start md:pl-6 pl-4 pr-8 md:ml-8 md:mt-5">
                <h1 className="text-5xl font-mono text-yellow-700 text-center md:pl-8 md:text-start font-semibold mb-4">{profiledata?.clubName}</h1>
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
                    className="btn text-black font-mono rounded-lg px-2 py-1 bg-primary border-2 border-black md:border-2 ml-4 hover:bg-primary hover:text-white transition ease-out duration-500">
                        Edit profile
                    </button>
                </div>
                <div className="mt-4 ">
                    <button 
                    onClick={openPostModal}
                    className="btn text-black font-mono rounded-lg px-2 py-1 bg-primary border-2 border-black md:border-2 ml-4 hover:bg-primary hover:text-white transition ease-out duration-500">
                      Add Post
                    </button>
                </div>
                <div className="mt-4 ">
                    <button 
                    onClick={()=>{navigate('/club-setting')}}
                    className="btn text-black font-mono rounded-lg px-2 py-1 bg-primary border-2 border-black md:border-2 ml-4 hover:bg-primary hover:text-white transition ease-out duration-500">
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
        onChange={(e) => setProfileImage(e.target.files[0])}
      />
    </div>
    <div className="flex justify-end">
      <button
        type="button"
        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition ease-in-out mr-2"
        onClick={uploadProfileImage}
        disabled={!profileimage}
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
        // onChange={(e) => setPostImage(e.target.files[0])}
        onChange={(e) =>setPostImage({...postimage,image: e.target.files[0]
            ,})
          }
      />
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
    <h1 className=' pl-16 font-extrabold text-2xl font-mono text-yellow-600 ' >POSTS</h1>
 </div>
 <div className=" flex justify-center p-8 space-x-4 flex-wrap">
 {postdata?.length > 0 ? (
    postdata?.map((post, index) => (
      <div className=" w-full md:w-1/4 p-6 overflow-hidden" key={index}>

      <div className="bg-gray-200 border border-gray-300 rounded-lg shadow-md ">
        {(userRole ==='president' || userRole === 'secretory') && (
         ( <div  onClick={() => handleDeletePost(post._id)}  className=' p-1 w-12'>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="m-2 w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
   />
</svg>
      </div>))}
          <img
              className="w-full h-56 object-contain"
              src={post.postimg}
              alt="Post"
          />
          <div className="p-4">
              <p className="text-gray-700 text-lg font-semibold">{post.desc}</p>
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
              <p className="text-gray-700 text-lg font-semibold">Images</p>
          </div>
      </div>
  </div>
    )}
</div>
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





  // const handleDeletePost = async (postId) => {
      //   console.log("post delitijon",postId)
      //   const {data}= await axiosInstance.post('/delete-post',{postId})
      //   console.log("postttt",data.message);
      //   if (data.message) {
      //     toast.success(data.message)
      //     fetchdata()
      //   }
      // }


  // const leaveclub=async ()=>{
      //   console.log("leave",clubName)
      //   const response=await axiosInstance.post('/leave-club',{clubName})
      //   if (response.data.message) {
      //     toast.success(response.data.message)
      //   }
      //   console.log(response);
      //   console.log(response.data);
      //   console.log(response.data.message);
      //   navigate('/')
      // }


// <div className="flex justify-center p-8 space-x-4 flex-wrap">
//     {postdata?.map((post, index) => (
//         <div className="w-full md:w-1/4 p-6 overflow-hidden" key={index}>
//             <div className="bg-gray-400 border rounded-3xl shadow-2xl mb-4">
//                 <img
//                     className="w-full h-80 object-cover"
//                     src={post.postimg}
//                     alt="Post"
//                 />
//                 <div className="p-4">
//                     <p className="text-gray-700 text-lg font-semibold">{post.desc}</p>
//                 </div>
//             </div>
//         </div>
//     ))}
// </div>



{/* <div className="max-w-md mx-auto rounded-lg overflow-hidden shadow-lg">
    {postdata?.map((post, index) => (
        <div key={index} className="mb-4">
            <img
                className="w-full h-48 object-cover"
                src={post.postimg}
                alt="Post"
            />
            <div className="p-4">
                <p className="text-gray-700">{post.desc}</p>
            </div>
        </div>
    ))}
</div> */}







        {/* <div className=" md:w-6/12 md:order-0 order-1 md:text-center mt-5 md:mt-0">
    <div className="rounded-lg p-4 overflow-hidden event-style">
        <div className="relative w-full h-full">
            <div className="relative top-0 right-0 bottom-0 left-0 rounded-lg overflow-hidden">
                <img
                    className="pt-7 rounded-xl md:pt-0 w-full h-auto md:w-120 md:h-96 lg:w-120 lg:h-120 xl:w-160 xl:h-160 mx-auto object-cover"
                    src={profiledata?.clubimg || "https://images.squarespace-cdn.com/content/v1/6192d0ae6818523e63640e70/ea3bb75a-2729-4887-bee4-3eef6a9e40a6/unnamed+%2819%29.jpg"}
                    alt="Club image"
                />
            </div>
        </div>
    </div>
</div> */}








// import axios from 'axios';
// import React,{useState} from 'react'
// import { axiosInstance } from '../../../../Api/config';
// import { useSelector } from 'react-redux';
// import { ToastContainer,toast } from 'react-toastify'
// import 'react-toastify/dist/ReactToastify.css';
// function ClubProfileFst() {
//     const {clubName}=useSelector((state)=>state.user)
//     const [isImageModalOpen, setIsImageModalOpen] = useState(false);
//     const [postmodalOpen, setPostModalOpen]=useState(false)
//     const [profileimage,setProfileImage]=useState(null)
//     const [postimage,setPostImage]=useState([])
//     //     image:[],
//     //     description:""
//     // })
    
//     const openImageModal = () => {
//         setIsImageModalOpen(true);
//       };
//       const closeImageModal = () => {
//         setIsImageModalOpen(false);
//       }; 
//       const openPostModal = () => {
//         setPostModalOpen(true);
//       };
//       const closePostModal = () => {
//         setPostModalOpen(false);
//       };
//       const uploadProfileImage =async(e)=>{
//           e.preventDefault()
//           const formData = new FormData();
//           formData.append('file', profileimage);
//           formData.append('upload_preset', 'I-club');
//           console.log(formData)

//           const  data = await axios.post(`https://api.cloudinary.com/v1_1/dce326gqy/image/upload?upload_preset=I-club`,formData);
//           closeImageModal()
//           console.log(data.data.secure_url);
//           const imageUrl = data.data.secure_url;
//           setProfileImage(imageUrl)
//           const doce =await axiosInstance.post('/add-clubprofile',{clubName,imageUrl})
//           console.log(doce)
//           if (doce.data.message) {
//             toast.success(doce.data.message, {
//               autoClose: 2000,
//               position: toast.POSITION.TOP_RIGHT
//             })}
//           console.log(doce.data)

//       }

//       const handleImageUpload =async (e) =>{
//         e.preventDefault()
//         const formData = new FormData();

//         postimage.forEach((post) => {
//           formData.append('file', post.image);
//           formData.append('upload_preset', 'I-club');
//         });
//         console.log("post image  ",formData);
      
//       }
//   return (
//     <div>
//       <section className="pt-16 bg-primary">
// <div className="container mx-auto">
//     <div className=" flex flex-col md:flex-row ">
//         <div className=" md:w-6/12 md:text-left text-center py-2 ">
//             <div className=" text-center md:text-start md:pl-6 pl-4 pr-8 md:ml-8 md:mt-5">
//                 <h1 className="text-5xl font-mono text-black text-center md:pl-8 md:text-start font-semibold mb-4">Club Name</h1>
//                 <p className='font-bold text-2xl font-mono p-1 text-black '>place</p>
//                 <p className='font-bold text-2xl font-mono p-1 text-black '>member</p>
//                 <p className='font-bold text-2xl font-mono p-1 text-black '>category</p>
//                 <p className='font-bold text-2xl font-mono p-1 text-black '>register no</p>
//                 <p className='font-bold text-2xl font-mono p-1 text-black '>about</p>
//                 <div className='md:flex justify-evenly p-2 '>
//                 <div className="mt-4 ">
//                     <button
//                     onClick={openImageModal}
//                     className="btn text-black font-mono rounded-lg px-2 py-1 bg-primary border-2 border-black md:border-2 ml-4 hover:bg-primary hover:text-white transition ease-out duration-500">
//                         Edit profile
//                     </button>
//                 </div>
//                 <div className="mt-4 ">
//                     <button 
//                     onClick={openPostModal}
//                     className="btn text-black font-mono rounded-lg px-2 py-1 bg-primary border-2 border-black md:border-2 ml-4 hover:bg-primary hover:text-white transition ease-out duration-500">
//                       Add Post
//                     </button>
//                 </div>
//                 <div className="mt-4 ">
//                     <button 
//                     // onClick={()=>{navigate('/payment',{state:{club:clubData.clubName}})}}
//                     className="btn text-black font-mono rounded-lg px-2 py-1 bg-primary border-2 border-black md:border-2 ml-4 hover:bg-primary hover:text-white transition ease-out duration-500">
//                         Club Setting
//                     </button>
//                 </div>
//                 </div>
//             </div>
//         </div>
// {/* ////////////////////////////// */}
//      { isImageModalOpen && <div className="fixed inset-0 z-50 overflow-auto bg-gray-900 bg-opacity-50 flex items-center justify-center">
//   <div className="bg-white rounded-lg w-11/12 max-w-md mx-auto p-6">
//     <div className="flex justify-between items-center mb-4">
//       <h5 className="text-xl font-semibold text-gray-800">Upload Club Profile Image</h5>
//     </div>
//     <div className="mb-4">
//       <input
//         type="file"
//         className="w-full border border-gray-300 py-2 px-3 rounded-lg bg-gray-100"
//         accept="image/*"
//         onChange={(e) => setProfileImage(e.target.files[0])}
//       />
//     </div>
//     <div className="flex justify-end">
//       <button
//         type="button"
//         className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition ease-in-out mr-2"
//         onClick={uploadProfileImage}
//         disabled={!profileimage}
//       >
//         Upload
//       </button>
//       <button
//         type="button"
//         className="px-4 py-2 bg-gray-300 text-gray-900 rounded-lg hover:bg-gray-400 transition ease-in-out"
//          onClick={closeImageModal}
//       >
//         Close
//       </button>
//     </div>
//   </div>
// </div> }
// {/* ////////////////////////////// */}

// {postmodalOpen && <div className="fixed inset-0 z-50 overflow-auto bg-gray-900 bg-opacity-50 flex items-center justify-center">
//   <div className="bg-white rounded-lg w-11/12 max-w-md mx-auto p-6">
//     <div className="flex justify-between items-center mb-4">
//       <h5 className="text-xl font-semibold text-gray-800">Upload Club Post Image</h5>
//     </div>
//     <form onSubmit={handleImageUpload}>
//     <div className="mb-4">
//       <input
//         type="file"
//         className="w-full border border-gray-300 py-2 px-3 rounded-lg bg-gray-100"
//         accept="image/*"
//         multiple
//         onChange={(e) => {
//             const files = e.target.files;
//             const imagesArray = Array.from(files).map((file) => ({
//               image: file,
//               description: ''
//             }));
//             setPostImage(imagesArray);
//         }}
//       />
//     </div>
//     <div className="mb-4">
//       <textarea
//         className="w-full border border-gray-300 py-2 px-3 rounded-lg bg-gray-100"
//         placeholder="Enter post description"
//         // onChange={(e) => setPostImage(e.target.value)}
//         value={postimage.description}
//         onChange={(e) => {
//           const updatedImages = [...postimage];
//           updatedImages[index].description = e.target.value;
//           setPostImage(updatedImages);
//         }}
        
//       />
//     </div>
//     <div className="flex justify-end">
//       <button
//         type="button"
//         className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition ease-in-out mr-2"
//         // onClick={handleImageUpload}
//         // disabled={!selectedImage}
//       >
//         Upload
//       </button>
//       <button
//         type="button"
//         className="px-4 py-2 bg-gray-300 text-gray-900 rounded-lg hover:bg-gray-400 transition ease-in-out"
//          onClick={closePostModal}
//       >
//         Close
//       </button>
//     </div>
//     </form>
//   </div>
// </div> }

// {/* ////////////////////////////// */}

//         <div className=" md:w-6/12 md:order-0 order-1 md:text-center mt-5 md:mt-0">
//     <div className="rounded-lg p-4 overflow-hidden event-style">
//         <div className="relative w-full h-full">
//             <div className="relative top-0 right-0 bottom-0 left-0 rounded-lg overflow-hidden">
//                 <img
//                     className="pt-7 rounded-xl md:pt-0 w-full h-auto md:w-120 md:h-96 lg:w-120 lg:h-120 xl:w-160 xl:h-160 mx-auto object-cover"
//                     src="https://images.squarespace-cdn.com/content/v1/6192d0ae6818523e63640e70/ea3bb75a-2729-4887-bee4-3eef6a9e40a6/unnamed+%2819%29.jpg"
//                     alt="Club image"
//                 />
//             </div>
//         </div>
//     </div>
// </div>


//     </div>
//     </div>
//     </section>
//     <ToastContainer/>
//     </div>
//   )
// }

// export default ClubProfileFst























