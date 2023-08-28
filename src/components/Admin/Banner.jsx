import React,{useState,useEffect} from 'react'
import AdminSidebar from './AdminSidebar'
import axios from 'axios'
import { adminaxios } from '../../../Api/config';
import {ToastContainer,toast} from 'react-toastify'
import Swal from 'sweetalert2';

function Banner() {
    const cloudName = import.meta.env.VITE_CLOUD_NAME;
    const [showmodel,setShowModal]=useState(false)
    const [banner,setBanner]=useState({
        bannerimage: null,
        description: '',
    })
    const [fetcheddata,setFetchedData]=useState([])
   useEffect(()=>{
       fetchdata()
   },[])
    
   const fetchdata=async()=>{
    const {data}=await adminaxios.get('/get-bannerdata')
    console.log(data);
    setFetchedData(data.banner)
   }

    const handleBannerImageUpload = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('file', banner.bannerimage);
        formData.append('upload_preset', 'I-club');
        try {
            console.log(formData);
            const response = await axios.post(
                `https://api.cloudinary.com/v1_1/${cloudName}/image/upload?upload_preset=I-club`,
                formData
            );
            closemodal()
            console.log("Response from Cloudinary:", response.data);
            console.log("Response from Cloudinary:", response.data.secure_url)
            const bannerimageUrl = response.data.secure_url
            const bannerData = {
                bannerimageUrl,
            description: banner.description,
          };
          console.log("to backend..",bannerData);
            const {data}=await adminaxios.post('/add-banner',{...bannerData})
            console.log("final response...",data);
            if (data.message) {
                toast.success(data.message)
                fetchdata()
            }
        } catch (error) {
            console.error("Error uploading image to Cloudinary:", error);
        }
    };
      const closemodal=()=>{
        setShowModal(false)
      }

      const deleteBanner = async (e,id)=>{
        e.preventDefault()
        Swal.fire({
            title: 'Delete banner Confirmation',
            text: 'Are you sure you want to delete banner?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, Delete!',
            cancelButtonText: 'Cancel',
          }).then(async (result) => {
            if (result.isConfirmed) {
                const res=await adminaxios.post('/delete-banner',{deleteId:id})
                fetchdata()
              console.log(res);
              if (res.data.message) {
                Swal.fire('Success',res.data.message, 'success');
              }}
          });  
      }
  return (
    <div>
       <div className="flex flex-col md:flex-row">
        <AdminSidebar />
        <div className="md:w-3/3 sm:w-full p-4">
        <div>
    <p className="px-3 py-3 text-2xl font-bold font-serif text-center">BANNER</p>
  </div>
  <div className=' flex justify-center p-4'>
  <button 
        onClick={()=>setShowModal(true)} 
        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-1 rounded">
            Add Banner
        </button>
  </div>
   {/* ///////////////////////////////// */}
    {showmodel && <div className="fixed inset-0 z-50 overflow-auto bg-gray-900 bg-opacity-50 flex items-center justify-center">
  <div className="bg-white rounded-lg w-11/12 max-w-md mx-auto p-6">
    <div className="flex justify-between items-center mb-4">
      <h5 className="text-xl font-semibold text-gray-800">Add Banner Image</h5>
    </div>
    <div className="mb-4">
      <input
        type="file"
        className="w-full border border-gray-300 py-2 px-3 rounded-lg bg-gray-100"
        accept="image/*"
        multiple
        // onChange={(e) => setPostImage(e.target.files[0])}
        onChange={(e) =>setBanner({...banner,bannerimage: e.target.files[0]})}
      />
    </div>
    <div className="mb-4">
      <textarea
        className="w-full border border-gray-300 py-2 px-3 rounded-lg bg-gray-100"
        placeholder="Enter post description"
        // onChange={(e) => setPostImage(e.target.value)
     onChange={(e) =>setBanner({...banner,description: e.target.value})}
      />
    </div>
    <div className="flex justify-end">
      <button
        type="button"
        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition ease-in-out mr-2"
         onClick={handleBannerImageUpload}
        // disabled={!selectedImage}
      >
        Upload
      </button>
      <button
        type="button"
        className="px-4 py-2 bg-gray-300 text-gray-900 rounded-lg hover:bg-gray-400 transition ease-in-out"
         onClick={()=>setShowModal(false)}
      >
        Close
      </button>
    </div>
  </div>
</div> }
   {/* ///////////////////////////////// */}
  <div className="w-full overflow-x-auto">
    <table className="w-full table-auto rounded-lg shadow-lg bg-white">
      <thead>
        <tr className="bg-gray-200 text-gray-700">
          <th className="px-4 py-3">Index</th>
          <th className="px-4 py-3">Image</th>
          <th className="px-4 py-3">Description</th>
          <th className="px-4 py-3">Action</th>
        </tr>
      </thead>
      <tbody className="text-gray-600">
      {/* {currentItems .map((club, index) => ( */}
        {  fetcheddata.map((banner,index)=>(
        <tr className="border-b border-gray-300 hover:bg-gray-100">
          <td className="px-4 text-center py-3">{index+1}</td>
          <td className="px-4 text-center  py-3 flex justify-center">
            <div className="  w-16 h-16   flex justify-center items-center overflow-hidden">
              <img
                className=" rounded-md"
                src={banner?.bannerimage || "https://www.shutterstock.com/image-vector/no-user-profile-picture-hand-260nw-99335579.jpg"}
                alt="Club Image"
              />
            </div>
          </td>
          <td className="px-4 text-center  py-3">{banner?.about}</td>
          <td className="px-4 text-center  py-3">
            <button  onClick={(e)=>deleteBanner(e,banner._id)} 
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded">
              Delete
            </button>
          </td>
        </tr> )) }
        {/* Repeat the above static row for other entries */}
      </tbody>
    </table>
  </div>
        </div>
        </div>
        
       <ToastContainer/>
    </div>
  )
}

export default Banner







// const deleteBanner = async (e,id)=>{
//     e.preventDefault()
//     console.log("deletion id",id)
//     const res=await adminaxios.post('/delete-banner',{deleteId:id})
//     console.log(res);
//     if (res.data.message) {
//         toast.success(res.data.message)
//         fetchdata()
//     }
//   }