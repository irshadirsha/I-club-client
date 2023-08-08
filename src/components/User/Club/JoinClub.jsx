import React,{useState} from 'react'
import { axiosInstance } from '../../../../Api/config'
import { useNavigate } from 'react-router-dom'

function JoinClub() {
  const navigate=useNavigate()
  const [joinclub,setJoinclub]=useState({
    clubName:"",
    securityCode:""
  })
  const handleSubmit=async(e)=>{
    e.preventDefault()
    console.log(joinclub)
    const user = JSON.parse(localStorage.getItem("user"))?.user || null;
    const email = user?.email 
  const {data}=await axiosInstance.post('/joinclub',{...joinclub})
  console.log(data)
  if(data.auth==true){
    navigate('/clubhome',{state:{userRole:data.userRole,id:data.id,club:data.updatedClubData.clubName}})
  }
  
  }
  return (
    <div>
      <section className="bg-primary overflow-y-hidden">
<div className="container px-4 md:px-5 text-center md:text-left my-5 pt-20">
  <div className="md:flex md:gap-x-6 md:items-center mb-10">
    <div className="mt-4 md:w-1/2 ml-10 mb-5  md:mb-0 z-10">
      <h1 className="my-5 text-5xl font-bold tracking-tight hero-title text-hsl(0, 0%, 0%)">
        I-Club <br />
        <span className="text-hsl(27, 36%, 21%)">We Connects People</span>
      </h1>
      <p className="mb-4  opacity-70 text-hsl(219, 43%, 21%)">
      Empowering Hearts, Building Bridges - The Power of Togetherness.
      </p>
    </div>
    <div className="md:w-1/2 relative">
      <div id="radius-shape-1" className="absolute rounded-circle shadow-5-strong"></div>
      <div id="radius-shape-2" className="absolute shadow-5-strong"></div>
      {/* /////////////////////// */}

       <div className=" bg-glass rounded-lg   pt-6  ">

         <div className='text-center text-4xl font-semibold pt-5 '>
           <h1>Join Club</h1>
         </div>


        <form onSubmit={handleSubmit}>
        <div className="form-outline mb-4 text-center pt-4 mt-6">
                  <input
                    type="text"
                    id="form3Example3"
                    name="clubName"
                    onChange={(e) => setJoinclub({ ...joinclub, [e.target.name]: e.target.value })}
                    className="form-control p-2 w-4/6 drop-shadow-md rounded-lg border-current border outline-slate-300"
                    placeholder="Club Name"
                  />
                </div>
         
                <div className="form-outline mb-4 text-center pt-4">
                  <input
                    type="text"
                    id="form3Example3"
                    name="securityCode"
                    onChange={(e) => setJoinclub({ ...joinclub, [e.target.name]: e.target.value })}
                    className="form-control p-2 w-4/6 drop-shadow-md rounded-lg border-current border outline-slate-300"
                    placeholder="Security Code"
                  />
                </div>
               
           <div className='text-center pt-8 flex justify-center items-center'>
             <div className='text-center p-2 border-2 border-slate-500 borde bg-primary w-32  rounded-xl text-white'>
               <button >Join</button>
             </div>
           </div>
          
           

          <div className="pb-3 text-center">
             <hr className="my-3"></hr>
             <a  className="text-rgb(0, 0, 0) no-underline">
               Home
             </a>
           </div>

         </form>
       </div>
       <br></br>
       <br></br>
       <br></br>
       <br></br>
     </div>
   </div>
 </div>

 </section>
    </div>
  )
}

export default JoinClub







// otp verification
// {/* <div className="h-screen bg-blue-500 py-20 px-3">
// <div className="container mx-auto">
//   <div className="max-w-sm mx-auto md:max-w-lg">
//     <div className="w-full">
//       <div className="bg-white h-64 py-3 rounded text-center">
//         <h1 className="text-2xl font-bold">OTP Verification</h1>
//         <div className="flex flex-col mt-4">
//           <span>Enter the OTP you received at</span>
//           <span className="font-bold">+91 ******876</span>
//         </div>

//         <div id="otp" className="flex flex-row justify-center text-center px-2 mt-5">
//           <input className="m-2 border h-10 w-10 text-center form-control rounded" type="text" id="first" maxLength="1" />
//           <input className="m-2 border h-10 w-10 text-center form-control rounded" type="text" id="second" maxLength="1" />
//           <input className="m-2 border h-10 w-10 text-center form-control rounded" type="text" id="third" maxLength="1" />
//           <input className="m-2 border h-10 w-10 text-center form-control rounded" type="text" id="fourth" maxLength="1" />
//           <input className="m-2 border h-10 w-10 text-center form-control rounded" type="text" id="fifth" maxLength="1" />
//           <input className="m-2 border h-10 w-10 text-center form-control rounded" type="text" id="sixth" maxLength="1" />
//         </div>

//         <div className="flex justify-center text-center mt-5">
//           <a className="flex items-center text-blue-700 hover:text-blue-900 cursor-pointer"><span className="font-bold">Resend OTP</span><i className='bx bx-caret-right ml-1'></i></a>
//         </div>
//       </div>
//     </div>
//   </div>
// </div>
// </div> */}
