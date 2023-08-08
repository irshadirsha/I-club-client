import React from 'react'
import { NavLink } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
function Home() {
  const navigate=useNavigate()
  const NavToJoinclub=(e)=>{
    e.preventDefault()
    navigate('/joinclub')
  }
  return (
    <>
   <div className='body bg-primary'>
  <div className='w-full md:flex justify-end'>
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
    <div className=' w-full md:w-1/2'>
      <div id="carouselExampleControls" className=" carousel slide p-12" data-ride="carousel">
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img
              className="w-50 h-50 mx-auto rounded-full"
              src="https://img.freepik.com/premium-vector/humans-hugging-together-team-club-unity-community-charity-foundation-logo-design-vector_493994-1512.jpg"
              alt="Third slide"
            />
            <p className='font-mono text-center text-black '><i>I-club connects</i></p>
          </div>
          
        </div>
        <a className="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="sr-only"></span>
        </a>
        <a className="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="sr-only"></span>
        </a>
      </div>
    </div>
  </div>
  <div className="rounded-xl text-center mx-8  bg-gray-800">
  <p className="p-1.5   text-gray-100">
    Unites integrity, compassion, shared values; making a positive impact on the community with unity and purposeful actions.
  </p>
</div>
<br></br>
<br></br>
</div>



   
   </> 
  )
}

export default Home







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