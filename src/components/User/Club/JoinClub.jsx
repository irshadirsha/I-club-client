import React,{useState} from 'react'
import { axiosInstance } from '../../../../Api/config'
import { NavLink, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { updateUser } from '../../../redux/UserSlice/UserSlice'
import { ToastContainer,toast } from 'react-toastify'

function JoinClub() {
 
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);
  const navigate=useNavigate()
  const [joinclub,setJoinclub]=useState({
    clubName:"",
    securityCode:""
  })
  const [errors, setErrors] = useState({
    clubName:"",
    securityCode:"",
    general: "",
  });
 

  const handleSubmit=async(e)=>{
    e.preventDefault()
    try {
      if (joinclub.clubName.trim() === "" &&joinclub.securityCode.trim() === "" ) {
        setErrors({
          ...errors,
          clubName: "ClubName is empty",
          securityCode: "Security code is empty",
        });
        return;
      }
      if (joinclub.securityCode == '') {
        setErrors({
          ...errors,
          securityCode:"Security code is empty " || "", 
        });        
        return;
      }
      console.log(joinclub)
    const {data}=await axiosInstance.post('/joinclub',{...joinclub})
    if (data.message) {
      toast.error(data.message)      
    }
    if(data.auth==true){
      const updatedUser = {
        ...user, 
        clubName: data.updatedClubData.clubName, 
      };
      dispatch(updateUser(updatedUser));
      navigate('/clubhome')
    }
    
      
    } catch (error) {
      
    }
  }
  return (
    <div>
     
      <section className="bg-primary overflow-y-hidden">
<div className="container px-4 md:px-5 text-center md:text-left my-5 pt-20">
  <div className=" md:flex md:gap-x-6 md:items-center mb-10">
    <div className=" mt-4 md:w-1/2 md:ml-8 mb-5  md:mb-0 z-10">
      <h1 className="my-5 text-5xl font-bold text-yellow-300 tracking-tight hero-title ">
        I-Club <br />
        <span className="text-white">We Connects People</span>
      </h1>
      <p className="mb-4  opacity-70 text-hsl(219, 43%, 21%)">
      Empowering Hearts, Building Bridges - The Power of Togetherness.
      </p>
    </div>
    <div className="px-2 md:w-1/2 relative">
      <div id="radius-shape-1" className="absolute rounded-circle shadow-5-strong"></div>
      <div id="radius-shape-2" className="absolute shadow-5-strong"></div>
      {/* /////////////////////// */}

       <div className=" bg-white rounded-lg   pt-6  ">

         <div className='text-center text-4xl font-semibold pt-5 '>
           <h1>Join Club</h1>
         </div>


        <form onSubmit={handleSubmit}>
         
        <div className="form-outline mb-2 text-center pt-1">
                <label htmlFor="form3Example1" className="block text-gray-600  text-sm mb-1">
                 ClubName
                </label>
                <input
                  type="text"
                  id="form3Example1"
                  name="clubName"
                  placeholder="Enter your ClubName"
                  onChange={(e) => {
                    setJoinclub({ ...joinclub, [e.target.name]: e.target.value })
                    setErrors({});
                  }}
                  className={`form-control p-2 w-4/6 drop-shadow-md rounded-lg border-current border outline-slate-300 ${
                    errors.clubName && "border-red-500"
                  }`}
                />
                {errors.clubName && <p className="text-red-500">{errors.clubName}</p>}
              </div>
              
                 
        <div className="form-outline mb-2 text-center pt-1">
                <label htmlFor="form3Example1" className="block text-gray-600  text-sm mb-1">
                 Security Code
                </label>
                <input
                  type="text"
                  id="form3Example1"
                  name="securityCode"
                  placeholder="Enter your Security Code"
                  onChange={(e) => {
                    setJoinclub({ ...joinclub, [e.target.name]: e.target.value })
                    setErrors({});
                  }}
                  className={`form-control p-2 w-4/6 drop-shadow-md rounded-lg border-current border outline-slate-300 ${
                    errors.securityCode && "border-red-500"
                  }`}
                />
                {errors.securityCode && <p className="text-red-500">{errors.securityCode}</p>}
              </div>
               
           <div className='text-center pt-8 flex justify-center items-center'>
             <div className='text-center p-2 border-2 border-slate-500 borde bg-primary w-32  rounded-xl text-white'>
               <button >Join</button>
             </div>
           </div>
          
           

          <div className="pb-3 text-center">
             <hr className="my-3"></hr>
             <NavLink to='/' className="text-rgb(0, 0, 0) no-underline"exact>
               Home
             </NavLink>
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
 <ToastContainer/>
    </div>
  )
}

export default JoinClub



















// import React,{useState} from 'react'
// import { axiosInstance } from '../../../../Api/config'
// import { useNavigate } from 'react-router-dom'
// import { useDispatch, useSelector } from 'react-redux'
// import { updateUser } from '../../../redux/UserSlice/UserSlice'


// function JoinClub() {
 
//   const dispatch = useDispatch();
//   const user = useSelector(state => state.user);
//   console.log("current user",user);
//   console.log("current user",user.id);
//   const navigate=useNavigate()
//   const [joinclub,setJoinclub]=useState({
//     clubName:"",
//     securityCode:""
//   })
//   const [errors, setErrors] = useState({
//     clubName:"",
//     securityCode:"",
//     general: "",
//   });
 

//   const handleSubmit=async(e)=>{
//     e.preventDefault()
//     try {
//       if (joinclub.clubName.trim() === "" &&joinclub.securityCode.trim() === "" ) {
//         setErrors({
//           ...errors,
//           clubName: "ClubName is empty",
//           securityCode: "Security code is empty",
//         });
//         return;
//       }
//       console.log(joinclub)
//     const {data}=await axiosInstance.post('/joinclub',{...joinclub})
//     console.log(data)
//     console.log("responseeeeeeeeeeeee",data.updatedClubData.clubName)
//     if(data.auth==true){
//       const updatedUser = {
//         ...user, 
//         clubName: data.updatedClubData.clubName, 
//       };
//       console.log("8888888888",user)
//       dispatch(updateUser(updatedUser));
//       navigate('/clubhome')
//     }
    
      
//     } catch (error) {
      
//     }
//   }
//   return (
//     <div>
     
//       <section className="bg-primary overflow-y-hidden">
// <div className="container px-4 md:px-5 text-center md:text-left my-5 pt-20">
//   <div className="md:flex md:gap-x-6 md:items-center mb-10">
//     <div className="mt-4 md:w-1/2 ml-10 mb-5  md:mb-0 z-10">
//       <h1 className="my-5 text-5xl font-bold tracking-tight hero-title text-hsl(0, 0%, 0%)">
//         I-Club <br />
//         <span className="text-hsl(27, 36%, 21%)">We Connects People</span>
//       </h1>
//       <p className="mb-4  opacity-70 text-hsl(219, 43%, 21%)">
//       Empowering Hearts, Building Bridges - The Power of Togetherness.
//       </p>
//     </div>
//     <div className="px-10 md:w-1/2 relative">
//       <div id="radius-shape-1" className="absolute rounded-circle shadow-5-strong"></div>
//       <div id="radius-shape-2" className="absolute shadow-5-strong"></div>
//       {/* /////////////////////// */}

//        <div className=" bg-glass rounded-lg   pt-6  ">

//          <div className='text-center text-4xl font-semibold pt-5 '>
//            <h1>Join Club</h1>
//          </div>


//         <form onSubmit={handleSubmit}>
         
//         <div className="form-outline mb-2 text-center pt-1">
//                 <label htmlFor="form3Example1" className="block text-gray-600  text-sm mb-1">
//                  ClubName
//                 </label>
//                 <input
//                   type="text"
//                   id="form3Example1"
//                   name="clubName"
//                   placeholder="Enter your ClubName"
//                   onChange={(e) => {
//                     setJoinclub({ ...joinclub, [e.target.name]: e.target.value })
//                     setErrors({});
//                   }}
//                   className={`form-control p-2 w-4/6 drop-shadow-md rounded-lg border-current border outline-slate-300 ${
//                     errors.clubName && "border-red-500"
//                   }`}
//                 />
//                 {errors.clubName && <p className="text-red-500">{errors.clubName}</p>}
//               </div>
         
//                 <div className="form-outline mb-4 text-center pt-4">
//                   <input
//                     type="text"
//                     id="form3Example3"
//                     name="securityCode"
//                     onChange={(e) => setJoinclub({ ...joinclub, [e.target.name]: e.target.value })}
//                     className="form-control p-2 w-4/6 drop-shadow-md rounded-lg border-current border outline-slate-300"
//                     placeholder="Security Code"
//                   />
//                 </div>
               
//            <div className='text-center pt-8 flex justify-center items-center'>
//              <div className='text-center p-2 border-2 border-slate-500 borde bg-primary w-32  rounded-xl text-white'>
//                <button >Join</button>
//              </div>
//            </div>
          
           

//           <div className="pb-3 text-center">
//              <hr className="my-3"></hr>
//              <a  className="text-rgb(0, 0, 0) no-underline">
//                Home
//              </a>
//            </div>

//          </form>
//        </div>
//        <br></br>
//        <br></br>
//        <br></br>
//        <br></br>
//      </div>
//    </div>
//  </div>

//  </section>
//     </div>
//   )
// }

// export default JoinClub

// navigate('/clubhome',{state:{userRole:data.userRole,id:data.id,club:data.updatedClubData.clubName}})
// const user = JSON.parse(localStorage.getItem("user"))?.user || null;
    // const email = user?.email 
    


