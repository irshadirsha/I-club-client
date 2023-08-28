import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { axiosInstance } from '../../../../Api/config';
import { useDispatch, useSelector } from 'react-redux';
import { updateUser } from '../../../redux/UserSlice/UserSlice';
import { ToastContainer,toast } from 'react-toastify'
import Swal from 'sweetalert2';
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import Slider from "react-slick";

function Home() {
  const settings = {
    dots: true,
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,    
    autoplaySpeed: 3000
  };

  const dispatch=useDispatch()
  const user=useSelector(state=>state.user)
  const currentuser=user.email
  console.log("redux users",user);
  const [query, setQuery] = useState('');
  const [filteredClubs, setFilteredClubs] = useState([]);
  const [carosal, setCarosal] = useState();
  const navigate=useNavigate()
  const handleSearch = async () => {
    try {
      const response = await axiosInstance.get(`/serch-clubs?q=${query}`);
      console.log(response);
      setFilteredClubs(response.data)
      console.log("after search",filteredClubs);
    } catch (error) {
      console.error('Error fetching clubs:', error);
    }
  };
  useEffect(() => {
    fetchBannerData()
    if (query.trim() !== '') {
      handleSearch();
    } else {
      setFilteredClubs([]);
    }
  }, [query]);
 
  const fetchBannerData = async ()=>{
      const {data}=await axiosInstance.get('/get-bannerhome')
      console.log(data);
      console.log(data.data);
      setCarosal(data.data)
  }

 
  const NavToJoinclub=(e)=>{
    e.preventDefault()
    navigate('/joinclub')
  }
 
  const handleRequest = async (e, id) => {
    /////////////
    Swal.fire({
      title: 'Request For Join Club Confirmation',
      text: 'Are you sure you want to Join the club?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, Join!',
      cancelButtonText: 'Cancel',
    }).then(async (result) => {
      if (result.isConfirmed) {
        const {data} = await axiosInstance.post('/make-request', { clubId: id });
        if (data.message) {
          Swal.fire('Success',data.message, 'success');
        }
        console.log(response);
      }
    });
    
  };
  return (
    <>
   <div className='body bg-primary'>
    <div className='flex justify-end'>
    <div className="nav-link fw-medium p-3"  aria-current="page">
        <input
          className="form-control mr-sm-2 rounded-lg shadow-md  p-1.5 text-sm font-normal border-current border outline-slate-300 hover: transition ease-out duration-500"
          type="text"
          placeholder="Search For Clubs..."
          aria-label="Search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}   
        />
      </div>
    </div>
    {filteredClubs.length > 0 ? (
       <div className="flex justify-center p-8 space-x-4 flex-wrap">
      {filteredClubs?.map((club, index) => (
         <div className="w-full md:w-1/4 p-6 overflow-hidden" key={index}>
         <div className="bg-gray-200 border border-gray-300 rounded-lg shadow-md ">
         <div className="relative mx-4 mt-4 h-44 overflow-hidden rounded-xl  bg-clip-border text-gray-700 shadow-lg">
                <div className="rounded-3xl overflow-hidden">
                  <img
                    src={club.clubimg || "https://static3.depositphotos.com/1006009/206/i/450/depositphotos_2061693-stock-photo-no-image-available-text-on.jpg"}
                    alt="club-image"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div className="p-4 text-center">
                <h4 className="mb-2 block font-sans text-2xl font-semibold leading-snug lowercase tracking-normal text-blue-gray-900 antialiased">
                  {club.clubName}
                </h4>
                <p className="block font-sans text-base p-1 font-medium leading-relaxed text-gray-700 antialiased">
                {club.category}
                </p>
               
                <p className="block font-sans text-base p-1 font-medium leading-relaxed text-gray-700 antialiased">
                {club.address
                .split(' ')
                .slice(0, 2)
               .join(' ')}
                </p>
            {/* {(club?.isblacklisted==true ) && ( <h1>this club is blackliste</h1>)} */}
            {club?.isblacklisted === true ? (
                  <h1 className='text-red-600'>This club is blacklisted</h1>
                ) : (club?.userRole==='president' || club?.userRole=== 'secretory' ||club?.userRole==='treasurer' ||club?.userRole==='member') ? (
               <button
          className="btn text-black font-mono rounded-lg  px-4   bg-primary border-2 border-black md:border-2 hover:bg-primary hover:text-white transition ease-out duration-500"
          exact
            onClick={()=>{
              const updatedUser = {
                id: user.id, 
                username: user.username,
                email: user.email,
                clubName: club.clubName,
              };
              dispatch(updateUser(updatedUser));
              navigate('/clubhome')
            }}
        >
          View Club
          </button>) :(
              club.newmember.includes(currentuser) ? (
                <button className="btn text-black font-mono rounded-lg px-4 bg-gray-300  border-gray-300 border-2">
                  Requested
                </button>
              ) : ( <button
             onClick={(e)=>handleRequest(e,club._id)}
             className="btn text-black font-mono rounded-lg  px-4   bg-primary border-2 border-black md:border-2 hover:bg-primary hover:text-white transition ease-out duration-500"
             exact>
             request for join 
             </button>) 
          ) } 
              </div>
         </div>
     </div>
     
       ))}
   </div>
       
        ) : (
    <div>
  <div className=' w-full md:flex justify-end'>
    <div className="md:w-1/2">
      <h1 className="my-5 ml-10  text-5xl pt-28 font-bold tracking-tight  hero-title text-hsl(0, 0%, 0%)">
        I-Club <br />
        <span className="text-hsl(27, 36%, 21%)">We Connect People</span>
      </h1>
      <p className="mb-4 ml-10 opacity-70 text-hsl(219, 43%, 21%)">
        Empowering Hearts, Building Bridges - The Power of Togetherness.
      </p>
      <div className=' px-16 py-6 flex justify-center md:justify-start'>
        <NavLink
          to='/createclub'
          className="btn text-black font-mono rounded-lg px-4 py-2  bg-primary border-2 border-black md:border-2 hover:bg-primary hover:text-white transition ease-out duration-500"
          exact
        >
          Create Club
        </NavLink>
        <a
          onClick={NavToJoinclub}
          className="btn text-black font-mono rounded-lg px-4 py-2 bg-primary border-2 border-black md:border-2 ml-4 hover:bg-primary hover:text-white transition ease-out duration-500"
        >
          Join Club
        </a>
      </div>
    </div>
    
    <div className=' w-full md:pt-28 md:w-1/2 '>
          <Slider {...settings}>
          {carosal?.length > 0 ? (
         carosal?.map((banner,index)=>(
    <div key={index} className="slider-item">
      <img className="d-block w-50 h-50 mx-auto  rounded-full" 
        src={banner?.bannerimage}
        alt="first slide"
      />
      <p className="text-center  text-md font-mono font-bold"><i>{banner?.about}</i></p>
    </div>))
    ):(
      <div className="slider-item">
        <img
          className="d-block w-50 h-50 mx-auto rounded-full"
          src="https://res.cloudinary.com/de8nd9vxi/image/upload/v1687895808/images_3_vlam4p.jpg"
          alt="Default Banner"
        />
        <p className="text-center text-lg font-mono font-bold">
          <i>I-club we Connects</i>
        </p>
      </div>
    )}
         </Slider>
         </div>


  </div>
  <br></br>
 
  <div className="rounded-xl text-center mx-8  bg-gray-800">
  <p className="p-1.5   text-gray-100">
    Unites integrity, compassion, shared values; making a positive impact on the community with unity and purposeful actions.
  </p>
</div>
  </div>
        )}
<br></br>
<br></br>
<br></br>

<ToastContainer/>
</div>



   
   </> 
  )
}

export default Home

 // src="https://res.cloudinary.com/de8nd9vxi/image/upload/v1687895808/images_3_vlam4p.jpg"


// <div className='bg-red-400 w-full md:w-1/2'>
// <div className="flex">
//   <div className="flex w-1/2 items-center justify-center bg-white h-screen">
//     <div className="bg-white w-[35rem] h-[33rem]">
//       <div className="justify-center items-center">
//         <Slider {...settings}>
//           <div>
//             <img
//               src="https://rukminim2.flixcart.com/image/850/1000/jcc9ci80/poster/s/e/h/medium-pl-anime-awesome-club-naruto-cools-title-photos-clubs-original-imaet3gegqddjhay.jpeg?q=90"
//               alt=""
//               className="w-full h-96 mt-12 rounded-lg"
//             />
//           </div>
//           <div>
//             <img
//               src="https://cdn.myanimelist.net/images/anime/5/9052l.jpg"
//               alt=""
//               className="w-full h-96 mt-12 rounded-lg"
//             />
//           </div>
//           <div>
//             <img
//               src="https://i.pinimg.com/736x/ff/cc/21/ffcc211d554d21b5ca4e795a8400d982.jpg"
//               className="w-full h-96 mt-12 rounded-lg"
//             />
//           </div>
//         </Slider>
//       </div>
//     </div>
//   </div>
// </div>
// </div>



  {/* {bannerData.map((item, index) => (
          <div key={index} className="carousel-item">
            <img
              style={{ borderRadius: '50%' }}
              className="d-block w-50 h-50 img mx-auto"
              src={item.image}
              alt={`Slide ${index}`}
            />
            <p style={{ textAlign: 'center' }}><i>{item.about}</i></p>
          </div>
        ))} */}

      //   <div>
      //   <div className='bg-primary w-full    '>
      //     <div className="md:w-1/2 ml-10 mb-5  md:mb-0 z-10  ">
      //   <h1 className="my-5 ml-10 text-5xl pt-36 font-bold tracking-tight hero-title text-hsl(0, 0%, 0%)">
      //     I-Club <br />
      //     <span className="text-hsl(27, 36%, 21%)">We Connects<br></br> People</span>
      //   </h1>
      //   <p className="mb-4 ml-10 opacity-70 text-hsl(219, 43%, 21%)">
      //   Empowering Hearts, Building Bridges - The Power of Togetherness.
      //   </p>
      // </div>
      // <div className='md:w-1/2 md:float-left bg-slate-400 w-1/2 '>

      // <div id="carouselExampleControls" className="carousel slide" data-ride="carousel">
      //   <div className="carousel-inner">
      //     <div className="carousel-item active">
      //       <img
      //         style={{ borderRadius: '50%' }}
      //         className="d-block w-50 h-50 img mx-auto"
      //         src="https://img.freepik.com/premium-vector/humans-hugging-together-team-club-unity-community-charity-foundation-logo-design-vector_493994-1512.jpg"
      //         alt="Third slide"
      //       />
      //       <p style={{ textAlign: 'center' }}><i>I-club connects</i></p>
      //     </div>
        
      //   </div>
      //   <a className="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
      //     <span className="carousel-control-prev-icon" aria-hidden="true"></span>
      //     <span className="sr-only"></span>
      //   </a>
      //   <a className="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
      //     <span className="carousel-control-next-icon" aria-hidden="true"></span>
      //     <span className="sr-only"></span>
      //   </a>
      // </div>
      // </div>
     
      // <div>
      // </div>
      //    </div>
      // </div>


    //   <div
    //   id="carouselExampleControls"
    //   className="relative"
    //   data-te-carousel-init
    //   data-te-carousel-slide
    // >
    //   {/* Carousel items */}
    //   <div className="relative rounded-full w-full overflow-hidden after:clear-both after:block after:content-['']">
    //     {/* First item */}
    //     <div
    //       className="relative float-left -mr-[100%] w-full transition-transform duration-[600ms] ease-in-out motion-reduce:transition-none"
    //       data-te-carousel-item
    //       data-te-carousel-active
    //     >
    //       <img
    //         src="https://mdbcdn.b-cdn.net/img/new/slides/041.webp"
    //         className="block w-full"
    //         alt="Wild Landscape"
    //       />
    //     </div>
    //     {/* Second item */}
    //     <div
    //       className="relative float-left -mr-[100%] hidden w-full transition-transform duration-[600ms] ease-in-out motion-reduce:transition-none"
    //       data-te-carousel-item
    //     >
    //       <img
    //         src="https://img.freepik.com/premium-vector/humans-hugging-together-team-club-unity-community-charity-foundation-logo-design-vector_493994-1512.jpg"
    //         className="block w-full"
    //         alt="Camera"
    //       />
    //     </div>
    //   </div>

    //   {/* Carousel controls - prev item */}
    //   <button
    //     className="absolute bottom-0 left-0 top-0 z-[1] flex w-[15%] items-center justify-center border-0 bg-none p-0 text-center text-white opacity-50 transition-opacity duration-150 ease-[cubic-bezier(0.25,0.1,0.25,1.0)] hover:text-white hover:no-underline hover:opacity-90 hover:outline-none focus:text-white focus:no-underline focus:opacity-90 focus:outline-none motion-reduce:transition-none"
    //     type="button"
    //     data-te-target="#carouselExampleControls"
    //     data-te-slide="prev"
    //   >
    //     <span className="inline-block h-8 w-8">
    //       <svg
    //         xmlns="http://www.w3.org/2000/svg"
    //         fill="none"
    //         viewBox="0 0 24 24"
    //         strokeWidth="1.5"
    //         stroke="currentColor"
    //         className="h-6 w-6"
    //       >
    //         <path
    //           strokeLinecap="round"
    //           strokeLinejoin="round"
    //           d="M15.75 19.5L8.25 12l7.5-7.5"
    //         />
    //       </svg>
    //     </span>
    //     <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
    //       Previous
    //     </span>
    //   </button>
    //   {/* Carousel controls - next item */}
    //   <button
    //     className="absolute bottom-0 right-0 top-0 z-[1] flex w-[15%] items-center justify-center border-0 bg-none p-0 text-center text-white opacity-50 transition-opacity duration-150 ease-[cubic-bezier(0.25,0.1,0.25,1.0)] hover:text-white hover:no-underline hover:opacity-90 hover:outline-none focus:text-white focus:no-underline focus:opacity-90 focus:outline-none motion-reduce:transition-none"
    //     type="button"
    //     data-te-target="#carouselExampleControls"
    //     data-te-slide="next"
    //   >
    //     <span className="inline-block h-8 w-8">
    //       <svg
    //         xmlns="http://www.w3.org/2000/svg"
    //         fill="none"
    //         viewBox="0 0 24 24"
    //         strokeWidth="1.5"
    //         stroke="currentColor"
    //         className="h-6 w-6"
    //       >
    //         <path
    //           strokeLinecap="round"
    //           strokeLinejoin="round"
    //           d="M8.25 4.5l7.5 7.5-7.5 7.5"
    //         />
    //       </svg>
    //     </span>
    //     <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
    //       Next
    //     </span>
    //   </button>
    // </div>



  //   <div className='bg-yellow-300 w-full md:w-1/2'>
  //   <div id="carouselExampleControls" className=" carousel slide p-12" data-ride="carousel">
  //     <div className="carousel-inner">
  //       <div className="carousel-item active">
  //         <img
  //           className="w-50 h-50 mx-auto rounded-full"
  //           src="https://img.freepik.com/premium-vector/humans-hugging-together-team-club-unity-community-charity-foundation-logo-design-vector_493994-1512.jpg"
  //           alt="Third slide"
  //         />
  //         <p className='font-mono text-center text-black '><i>I-club connects</i></p>
  //       </div>
        
  //     </div>
  //     <a className="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
  //       <span className="carousel-control-prev-icon" aria-hidden="true"></span>
  //       <span className="sr-only"></span>
  //     </a>
  //     <a className="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
  //       <span className="carousel-control-next-icon" aria-hidden="true"></span>
  //       <span className="sr-only"></span>
  //     </a>
  //   </div>
  // </div>


     // Display search results if filteredClubs exist
        //   <div className=" bg-green-200 h-screen">
        //     <div className="sm:justify-center items-center  justify-evenly py-4 px-8 flex flex-col md:flex-row space-y-4 md:mx-32 md:space-x-4">
        //   {filteredClubs.map((club, index) => (
        //     <div key={index} className="relative flex w-96 mt-4 flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md">
              // <div className="relative mx-4 mt-4 h-44 overflow-hidden rounded-xl bg-white bg-clip-border text-gray-700 shadow-lg">
              //   <div className="rounded-3xl overflow-hidden">
              //     <img
              //       src={club.clubimg || "https://static3.depositphotos.com/1006009/206/i/450/depositphotos_2061693-stock-photo-no-image-available-text-on.jpg"}
              //       alt="club-image"
              //       className="w-full h-full object-cover"
              //     />
              //   </div>
              // </div>
        //       <div className="p-6 text-center">
        //         <h3>Club Details</h3>
        //         <h4 className="mb-2 block font-sans text-2xl font-semibold leading-snug lowercase tracking-normal text-blue-gray-900 antialiased">
        //           {club.clubName}
        //         </h4>
        //         <p className="block bg-gradient-to-tr from-blue-600 to-blue-400 bg-clip-text font-sans text-base font-medium leading-relaxed text-transparent antialiased">
        //           {club.about}
        //         </p>
        //         <p className="block font-sans text-base p-2 font-medium leading-relaxed text-gray-700 antialiased">
        //           Address: {club.address}
        //         </p>
        //       <NavLink
        //   className="btn text-black font-mono rounded-lg  px-4   bg-primary border-2 border-black md:border-2 hover:bg-primary hover:text-white transition ease-out duration-500"
        //   exact
        // >
        //   View Club
        // </NavLink>
        //       </div>
        //     </div>
        //   ))}
        //   </div>
        // </div>