import React,{useState,useEffect} from 'react';
import { axiosInstance } from '../../../../Api/config';
import { useSelector } from 'react-redux';
import Loader from '../../Loader/Loader'
function ClubAuthority() {
    const { clubName } = useSelector((state) => state.user)
    const [loading, setLoading] = useState(true);
     const [authority,setAthority]=useState([])
    useEffect(()=>{
        fetchdata()
    },[])
const fetchdata=async()=>{  
    const {data}=await axiosInstance.get('/get-authority',{
        params: { clubName }
    })
    console.log("authority",data);
    setAthority(data.data)
    setLoading(false) 
}
  return (
    <div className=''>
         {loading && <Loader/>}
      <div className="sm:justify-center items-center  justify-evenly py-4 px-8 flex flex-col md:flex-row space-y-4 md:mx-32 md:space-x-4">
        {/* President Card */}
        <div className="relative flex w-96 mt-4 flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md">
  <div className="relative mx-4 mt-4 h-44 overflow-hidden rounded-xl bg-white bg-clip-border text-gray-700 shadow-lg">
    <div className="rounded-3xl overflow-hidden">
      <img
        src={
          authority?.president?.image ||
          "https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI="
        }
        alt="profile-picture"
        className="w-full h-full object-cover"
      />
    </div>
  </div>
  <div className="p-6 text-center">
    <h3>President</h3>
    <h4 className="mb-2 block font-sans text-2xl font-semibold leading-snug lowercase tracking-normal text-blue-gray-900 antialiased">
      {authority?.president?.username}
    </h4>
    <p className="block bg-gradient-to-tr from-blue-600 to-blue-400 bg-clip-text font-sans text-base font-medium leading-relaxed text-transparent antialiased">
      {authority?.president?.email}
    </p>
  </div>
</div>


        {/* Secretary Card */}
        {/* ... (similar structure as the President Card) ... */}
        <div className="relative flex w-96 mt-4 flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md">
  {/* Image container with rounded clipping mask */}
  <div className="relative mx-4 mt-4 h-44 overflow-hidden rounded-xl bg-white bg-clip-border text-gray-700 shadow-lg">
    <div className="rounded-3xl overflow-hidden">
      {/* Image with object-cover style */}
      <img
        src={
          authority?.secretory?.image ||
          "https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI="
        }
        alt="profile-picture"
        className="w-full h-full object-cover"
      />
    </div>
  </div>
  <div className="p-6 text-center">
    <h3>Secretory</h3>
    <h4 className="mb-2 block font-sans text-2xl font-semibold leading-snug lowercase tracking-normal text-blue-gray-900 antialiased">
      {authority?.secretory?.username}
    </h4>
    <p className="block bg-gradient-to-tr from-blue-600 to-blue-400 bg-clip-text font-sans text-base font-medium leading-relaxed text-transparent antialiased">
      {authority?.secretory?.email}
    </p>
  </div>
</div>

        {/* Treasurer Card */}
        <div className=" bg-white relative flex w-96 mt-4 flex-col rounded-xl  bg-clip-border text-gray-700 shadow-md">
  {/* Image container with rounded clipping mask */}
  <div className="relative mx-4 mt-4 h-44 overflow-hidden rounded-xl bg-white bg-clip-border text-gray-700 shadow-lg">
    <div className=" rounded-3xl overflow-hidden">
      {/* Image with object-cover style */}
      <img
        src={
          authority?.treasurer?.image ||
          "https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI="
        }
        alt="profile-picture"
        className="w-full h-full object-cover"
      />
    </div>
  </div>
  <div className="p-6 text-center">
    <h3>Treasurer</h3>
    <h4 className="mb-2 block font-sans text-2xl font-semibold leading-snug tracking-normal lowercase text-blue-gray-900 antialiased">
      {authority?.treasurer?.username}
    </h4>
    <p className="block bg-gradient-to-tr from-blue-600 to-blue-400 bg-clip-text font-sans text-base font-medium leading-relaxed text-transparent antialiased">
      {authority?.treasurer?.email}
    </p>
  </div>
</div>

        {/* ... (similar structure as the President Card) ... */}
      </div>
    </div>
  );
}

export default ClubAuthority;




// import React from 'react';

// function ClubAuthority() {
//   return (
//     <div className='bg-primary min-h-screen'>
//     <div className="bg-gray-200 justify-evenly px-8 flex flex-col md:flex-row space-y-4 md:mx-32 md:space-x-4">
//       {/* President Card */}
//       <div className="relative flex w-96 mt-4 flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md">
//         <div className="relative mx-4 mt-4 h-50 overflow-hidden rounded-xl bg-white bg-clip-border text-gray-700 shadow-lg">
//           <img
//             src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnxaLo41DVakt-xR_SckaYvH_YNUWVR6S6yTOqV_dt&s"
//             alt="profile-picture"
//             className="w-50 h-50 object-cover"
//           />
//         </div>
//         <div className="p-6 text-center">
//           <h4 className="mb-2 block font-sans text-2xl font-semibold leading-snug tracking-normal text-blue-gray-900 antialiased">
//             Natalie Paisley
//           </h4>
//           <p className="block bg-gradient-to-tr from-pink-600 to-pink-400 bg-clip-text font-sans text-base font-medium leading-relaxed text-transparent antialiased">
//             CEO / Co-Founder
//           </p>
//         </div>
//       </div>

//         {/* Secretary Card */}
//         <div className="relative flex w-96 mt-4 flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md">
//           <div className="relative mx-4 mt-4 h-50 overflow-hidden rounded-xl bg-white bg-clip-border text-gray-700 shadow-lg">
//             <img
//               src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnxaLo41DVakt-xR_SckaYvH_YNUWVR6S6yTOqV_dt&s"
//               alt="profile-picture"
//               className="w-50 h-50 object-cover"
//             />
//           </div>
//           <div className="p-6 text-center">
//             <h4 className="mb-2 block font-sans text-2xl font-semibold leading-snug tracking-normal text-blue-gray-900 antialiased">
//               Natalie Paisley
//             </h4>
//             <p className="block bg-gradient-to-tr from-pink-600 to-pink-400 bg-clip-text font-sans text-base font-medium leading-relaxed text-transparent antialiased">
//               CEO / Co-Founder
//             </p>
//           </div>
//         </div>
//         {/* ... (similar structure as the President Card) ... */}

//         {/* Treasurer Card */}
//         <div className="relative flex w-96 mt-4 flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md">
//           <div className="relative mx-4 mt-4 h-50 overflow-hidden rounded-xl bg-white bg-clip-border text-gray-700 shadow-lg">
//             <img
//               src="https://www.pexels.com/photo/674010/download/"
//               alt="profile-picture"
//               className="w-full h-full object-cover"
//             />
//           </div>
//           <div className="p-6 text-center">
//             <h4 className="mb-2 block font-sans text-2xl font-semibold leading-snug tracking-normal text-blue-gray-900 antialiased">
//               Natalie Paisley
//             </h4>
//             <p className="block bg-gradient-to-tr from-pink-600 to-pink-400 bg-clip-text font-sans text-base font-medium leading-relaxed text-transparent antialiased">
//               CEO / Co-Founder
//             </p>
//           </div>
//         </div>
//         {/* ... (similar structure as the President Card) ... */}
//       </div>
//     </div>
//   );
// }

// export default ClubAuthority;







// import React from 'react';

// function ClubAuthority() {
//   return (
//     <div className='bg-primary'>
//     <div className="bg-gray-200 justify-evenly px-8 flex flex-col md:flex-row space-y-4 md:mx-32 md:space-x-4">
//       {/* President Card */}
//       <div class="relative flex w-96 mt-4 flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md">
//   <div class="relative mx-4 mt-4 h-50 overflow-hidden rounded-xl bg-white bg-clip-border text-gray-700 shadow-lg">
//     <img src="https://images.unsplash.com/photo-1575936123452-b67c3203c357?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D&w=1000&q=80" alt="profile-picture" />
//   </div>
//   <div class="p-6 text-center">
//     <h4 class="mb-2 block font-sans text-2xl font-semibold leading-snug tracking-normal text-blue-gray-900 antialiased">
//       Natalie Paisley
//     </h4>
//     <p class="block bg-gradient-to-tr from-pink-600 to-pink-400 bg-clip-text font-sans text-base font-medium leading-relaxed text-transparent antialiased">
//       CEO / Co-Founder
//     </p>
//   </div>

// </div>
     

//       {/* Secretary Card */}
//       <div class="relative flex w-96 flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md">
//   <div class="relative mx-4 mt-4 h-50 overflow-hidden rounded-xl bg-white bg-clip-border text-gray-700 shadow-lg">
//     <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnxaLo41DVakt-xR_SckaYvH_YNUWVR6S6yTOqV_dt&s" alt="profile-picture" />
//   </div>
//   <div class="p-6 text-center">
//     <h4 class="mb-2 block font-sans text-2xl font-semibold leading-snug tracking-normal text-blue-gray-900 antialiased">
//       Natalie Paisley
//     </h4>
//     <p class="block bg-gradient-to-tr from-pink-600 to-pink-400 bg-clip-text font-sans text-base font-medium leading-relaxed text-transparent antialiased">
//       CEO / Co-Founder
//     </p>
//   </div>
 
// </div>
      

//       {/* Treasurer Card */}
//       <div class="relative flex w-96 flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md">
//   <div class="relative mx-4 mt-4 h-50 overflow-hidden rounded-xl bg-white bg-clip-border text-gray-700 shadow-lg">
//     <img src="https://images.unsplash.com/photo-1575936123452-b67c3203c357?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D&w=1000&q=80" alt="profile-picture" />
//   </div>
//   <div class="p-6 text-center">
//     <h4 class="mb-2 block font-sans text-2xl font-semibold leading-snug tracking-normal text-blue-gray-900 antialiased">
//       Natalie Paisley
//     </h4>
//     <p class="block bg-gradient-to-tr from-pink-600 to-pink-400 bg-clip-text font-sans text-base font-medium leading-relaxed text-transparent antialiased">
//       CEO / Co-Founder
//     </p>
//   </div>
 
// </div>
     
//     </div>
//     </div>
//   );
// }

// export default ClubAuthority;



























// import React from 'react'

// function ClubAuthority() {
//   return (
//     <div>
//       <div class="relative flex w-96 flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md">
//   <div class="relative mx-4 mt-4 h-80 overflow-hidden rounded-xl bg-white bg-clip-border text-gray-700 shadow-lg">
//     <img src="https://images.unsplash.com/photo-1575936123452-b67c3203c357?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D&w=1000&q=80" alt="profile-picture" />
//   </div>
//   <div class="p-6 text-center">
//     <h4 class="mb-2 block font-sans text-2xl font-semibold leading-snug tracking-normal text-blue-gray-900 antialiased">
//       Natalie Paisley
//     </h4>
//     <p class="block bg-gradient-to-tr from-pink-600 to-pink-400 bg-clip-text font-sans text-base font-medium leading-relaxed text-transparent antialiased">
//       CEO / Co-Founder
//     </p>
//   </div>
//   <div class="flex justify-center gap-7 p-6 pt-2">
//     <a
//       href="#facebook"
//       class="block bg-gradient-to-tr from-blue-600 to-blue-400 bg-clip-text font-sans text-xl font-normal leading-relaxed text-transparent antialiased"
//     >
//       <i class="fab fa-facebook" aria-hidden="true"></i>
//     </a>
//     <a
//       href="#twitter"
//       class="block bg-gradient-to-tr from-light-blue-600 to-light-blue-400 bg-clip-text font-sans text-xl font-normal leading-relaxed text-transparent antialiased"
//     >
//       <i class="fab fa-twitter" aria-hidden="true"></i>
//     </a>
//     <a
//       href="#instagram"
//       class="block bg-gradient-to-tr from-purple-600 to-purple-400 bg-clip-text font-sans text-xl font-normal leading-relaxed text-transparent antialiased"
//     >
//       <i class="fab fa-instagram" aria-hidden="true"></i>
//     </a>
//   </div>
// </div>
//     </div>
//   )
// }

// export default ClubAuthority
