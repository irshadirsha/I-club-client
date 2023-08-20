import React,{useEffect, useState} from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { axiosInstance } from '../../../../Api/config';
import ClubNav from './ClubNav';
import { useSelector } from 'react-redux';
import { ToastContainer,toast } from 'react-toastify'
function ClubHome() {
       const {clubName}=useSelector((state)=>state.user)
    const location = useLocation();
    const navigate=useNavigate()

const role=location.state?.userRole;
// const id=location.state?.id;
// const clubName=location.state?.club;
console.log("club home");
console.log(role,clubName); 
const [clubData,setClubData]=useState(null)
const [messages,setMessages]=useState({
     message:"",
     time:"",
     location:""
})
const [events,SetEvents]=useState([])

useEffect(()=>{
     fetchdata()
     fetchevent()
}, [])
const fetchevent=async()=>{
    const {data}= await axiosInstance.post('/get-event',{clubName})
    console.log("------------enents---------------------",data)
    SetEvents(data.modifiedEventData);
    console.log(events);    
}


const fetchdata=async()=>{

    const {data}= await axiosInstance.post('/clubhome',{clubName})
    console.log(data)
    setClubData(data.data)
    console.log(data.data);
}

const handleEventSubmit=async(e)=>{
    e.preventDefault()
    try {
        console.log("eventss",messages,clubData?._id,);
        const {data} =await axiosInstance.post('/add-events',{messages,club:clubData?._id})
        console.log("eventss---",data);
        if (data.message) {
            toast.success(data.message)
        }
        setMessages({
            message:"",
            time:"",
            location:""
        }) 
        fetchevent()
       
    } catch (error) {
        console.error("Error occurred:", error);
    }
}

const deleteEvent=async( id)=>{
    try {
        console.log("delete id",id)
       const {data}=await axiosInstance.post('/delete-event',{id:id})
       console.log(data)
       fetchevent()
       if (data.message) {
        toast.success(data.message)
    }
    } catch (error) {
        
    }
   
}

return (
<div>
<ClubNav state={clubName}/>
<section className="pt-16 bg-primary">
<div className="container mx-auto">
    <div className="flex flex-col md:flex-row items-center">
        <div className="md:w-6/12 md:text-left text-center py-6 md:mt-3">
            <div className="text-center md:text-start md:pl-6 pl-4 pr-8 md:ml-8 md:mt-5">
                <h2 className="font-normal text-2xl text-black-600 mb-3">
                    "Unites integrity, compassion, shared values; making a positive impact on the community with unity and purposeful actions."
                </h2>
                <h1 className="text-4xl font-mono md:pl-8 md:text-start font-semibold mb-4">{clubData ? clubData.clubName : clubName}</h1>
                <p className="font-medium text m-4">
                {clubData?.clubData?.about}
                </p>
                <div className="mt-4 flex justify-start items-start">
                    <button 
                    onClick={()=>{navigate('/payment',{state:{club:clubName}})}}
                    // onClick={()=>{navigate('/payment',{state:{club:clubData.clubName}})}}
                    className="btn text-black font-mono rounded-lg px-4 py-2 bg-primary border-2 border-black md:border-2 ml-4 hover:bg-primary hover:text-white transition ease-out duration-500">
                        Donate to Club
                    </button>
                </div>
            </div>
        </div>

        <div className=" md:w-6/12 md:order-0 order-1 md:text-center mt-5 md:mt-0">
    <div className="rounded-lg p-4 overflow-hidden event-style">
    <div className="relative w-full h-full">
            <div className="relative top-0 right-0 bottom-0 left-0 rounded-lg overflow-hidden">
                <img
                    className="pt-7 rounded-xl md:pt-0 w-full h-auto md:w-120 md:h-96 lg:w-120 lg:h-120 xl:w-160 xl:h-160 mx-auto object-contain"
                    src={clubData?.clubimg || "https://static3.depositphotos.com/1006009/206/i/450/depositphotos_2061693-stock-photo-no-image-available-text-on.jpg"}
                    alt="Club image"
                />
            </div>
        </div>
    </div>
</div>

    </div>

    <div className="flex flex-col pt-12 md:flex-row items-center">
        <div className=" md:w-6/12 md:text-left text-center  py-6 md:mt-3">
            <div className="text-center md:text-start md:pl-6 pl-4 pr-8  md:ml-8 md:mt-5">
                <h1 className="text-4xl font-mono md:pl-8 md:text-center font-semibold mb-4">Events</h1>
                <div className="p-1 mb-2 responsive-form">
                    {/* i need to show input div only if user secretiry or presidenrt */}  
                        { (role === 'president' || role === 'secretory') && (   
                    <div className="p-3 mb-2 bg-gray-300 rounded-3xl  border-current border">
                        <form >
                        <div className="form-outline mb-4 text-center pt-4">
                        <input
                    type="text"
                    id="form3Example4"
                    name="message"
                    value={messages.message}
                    onChange={(e) => setMessages({...messages,[e.target.name]: e.target.value})}        
                    className="form-control p-2  w-4/6 drop-shadow-md rounded-lg  border-current border outline-slate-300 "
                       />
                    <br></br>
                    <label className="form-label" htmlFor="form3Example4">Enter Events</label>
                      </div>
                      <div className="form-outline mb-4 text-center pt-4">
                        <input
                    type="text"
                    id="form3Example5"
                    name="location"
                    value={messages.location}
                    onChange={(e) => setMessages({...messages,[e.target.name]: e.target.value})}        
                    className="form-control p-2  w-4/6 drop-shadow-md rounded-lg  border-current border outline-slate-300 "
                       />
                    <br></br>
                    <label className="form-label" htmlFor="form3Example4">Enter Events Location</label>
                      </div>
                      <div className="form-outline mb-4 text-center pt-4">
                        <input
                    type="text"
                    id="form3Example7"
                    name="time"
                    value={messages.time}
                    onChange={(e) => setMessages({...messages,[e.target.name]: e.target.value})}        
                    className="form-control p-2  w-4/6 drop-shadow-md rounded-lg  border-current border outline-slate-300 "
                       />
                    <br></br>
                    <label className="form-label" htmlFor="form3Example4">Enter Events Time</label>
                      </div>
                            <div className='bg-primary text-center rounded-2xl p-3'>
                            <button onClick={handleEventSubmit} type="submit">Submit</button>
                            </div>
                            
                        </form>
                    </div>)}
                </div>
                
    {events && events.length > 0 ? (
        events.map((event, index) => (
                <div className=" rounded-3xl  responsive-form">
            <div key={index} className="mb-4 p-3 bg-gray-300  border-current border rounded-3xl">
                <div className="text-center text-black text-xl md:text-2xl">
                    Event:{event.event}
                </div>
                <div className="text-center text-black text-xl md:text-2xl">
                  Location:{event.location}
                </div>
                <div className="text-center text-black text-xl md:text-2xl">
                    Time:{event.time}
                </div>
                <div className="main-button-red">
                    <div className="scroll-to-section text-center text-black">
                         Message from:{event.auther}
                     { (role=== 'secretory' || role === 'president') &&
                      <div  onClick={() => deleteEvent(event._id)}
                      className='w-10 bg-gray-200  h-10 p-2   rounded-full'>
                     <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                         </svg>

                            </div>}
                    </div>
                </div>
            </div>
       
       </div>
       ))
    ) : (
        <p className="text-center text-black">No events available</p>
    )}


   </div>
        </div>
       
    </div>
</div>
<br />
<br />
<br />
</section>
<ToastContainer/>
</div>
);
}

export default ClubHome;





























// import React,{useEffect, useState} from 'react';
// import axios from 'axios';
// import { useLocation, useNavigate } from 'react-router-dom';
// import { axiosInstance } from '../../../../Api/config';
// import ClubNav from './ClubNav';

// function ClubHome() {

//     const location = useLocation();
//     const navigate=useNavigate()

// const role=location.state?.userRole;
// // const id=location.state?.id;
// const clubName=location.state?.club;
// console.log("club home");
// console.log(role,clubName); 
// const [clubData,setClubData]=useState(null)
// const [message,setMessage]=useState("")
// const [events,SetEvents]=useState([])

// useEffect(()=>{
//      fetchdata()
//      fetchevent()
// }, [])
// const fetchevent=async()=>{
//     const {data}= await axiosInstance.post('/get-event',{clubName})
//     console.log(data)
//     SetEvents(data.modifiedEventData);
//     console.log(events);    
// }


// const fetchdata=async()=>{

//     const {data}= await axiosInstance.post('/clubhome',{clubName})
//     console.log(data)
//     setClubData(data.data)
//     console.log(data.data);
// }

// const handleEventSubmit=async(e)=>{
//     e.preventDefault()
//     try {
//         console.log("eventss",message,clubData._id,);
//         const {data} =await axiosInstance.post('/add-events',{message:message,club:clubData._id})
//         console.log(data);  
//         setMessage('') 
//         fetchevent()
       
//     } catch (error) {
//         console.error("Error occurred:", error);
//     }
// }

// const deleteEvent=async( id)=>{
//     try {
//         console.log("delete id",id)
//        const {data}=await axiosInstance.post('/delete-event',{id:id})
//        console.log(data)
//        fetchevent()
//     } catch (error) {
        
//     }
   
// }

// return (
// <div>
// <ClubNav state={clubName}/>
// <section className="pt-16 bg-primary">
// <div className="container mx-auto">
//     <div className="flex flex-col md:flex-row items-center">
//         <div className="md:w-6/12 md:text-left text-center py-6 md:mt-3">
//             <div className="text-center md:text-start md:pl-6 pl-4 pr-8 md:ml-8 md:mt-5">
//                 <h2 className="font-normal text-2xl text-black-600 mb-3">
//                     "Unites integrity, compassion, shared values; making a positive impact on the community with unity and purposeful actions."
//                 </h2>
//                 <h1 className="text-4xl font-mono md:pl-8 md:text-start font-semibold mb-4">{clubData ? clubData.clubName : clubName}</h1>
//                 <p className="font-medium m-4">
//                     Club description goes here.
//                 </p>
//                 <div className="mt-4 flex justify-start items-start">
//                     <button 
//                     onClick={()=>{navigate('/payment',{state:{club:clubData.clubName}})}}
//                     className="btn text-black font-mono rounded-lg px-4 py-2 bg-primary border-2 border-black md:border-2 ml-4 hover:bg-primary hover:text-white transition ease-out duration-500">
//                         Donate to Club
//                     </button>
//                 </div>
//             </div>
//         </div>

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

//     <div className="flex flex-col pt-12 md:flex-row items-center">
//         <div className=" md:w-6/12 md:text-left text-center  py-6 md:mt-3">
//             <div className="text-center md:text-start md:pl-6 pl-4 pr-8  md:ml-8 md:mt-5">
//                 <h1 className="text-4xl font-mono md:pl-8 md:text-center font-semibold mb-4">Events</h1>
//                 <div className="p-1 mb-2 responsive-form">
//                     {/* i need to show input div only if user secretiry or presidenrt */}  
//                         { (role === 'president' || role === 'secretory') && (   
//                     <div className="p-3 mb-2 bg-gray-300 rounded-3xl  border-current border">
//                         <form >
//                         <div className="form-outline mb-4 text-center pt-4">
//                         <input
//                     type="text"
//                     id="form3Example4"
//                     name="message"
//                     value={message}
//                     onChange={(e) => setMessage(e.target.value)}         
//                     className="form-control p-2  w-4/6 drop-shadow-md rounded-lg  border-current border outline-slate-300 "
//                        />
//                     <br></br>
//                     <label className="form-label" htmlFor="form3Example4">Enter Events</label>
//                       </div>
//                             <div className='bg-primary text-center rounded-2xl p-3'>
//                             <button onClick={handleEventSubmit} type="submit">Submit</button>
//                             </div>
                            
//                         </form>
//                     </div>)}
//                 </div>
                
//     {events && events.length > 0 ? (
//         events.map((event, index) => (
//                 <div className=" rounded-3xl  responsive-form">
//             <div key={index} className="mb-4 p-3 bg-gray-300  border-current border rounded-3xl">
//                 <div className="text-center text-black text-xl md:text-2xl">
//                     {event.event}
//                 </div>
//                 <div className="main-button-red">
//                     <div className="scroll-to-section text-center text-black">
//                          {event.auther}
//                      { (role=== 'secretory' || role === 'president') &&
//                       <div  onClick={() => deleteEvent(event._id)}
//                       className='w-10 bg-gray-200  h-10 p-2   rounded-full'>
//                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
//                       <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
//                          </svg>

//                             </div>}
//                     </div>
//                 </div>
//             </div>
       
//        </div>
//        ))
//     ) : (
//         <p className="text-center text-black">No events available</p>
//     )}


//    </div>
//         </div>
       
//     </div>
// </div>
// <br />
// <br />
// <br />
// </section>
// </div>
// );
// }

// export default ClubHome;



// <div className=" bg-yellow-200 md:w-6/12 md:order-0 order-1 md:text-center mt-5 md:mt-0">
// <div className="rounded-lg overflow-hidden event-style">
//     <div className="relative w-full h-full">
//         <div className="relative top-0 right-0 bottom-0 left-0 rounded-lg overflow-hidden">
//             <img
//                 className="pt-7 rounded-xl md:pt-0 w-full h-auto md:w-96 md:h-96 lg:w-120 lg:h-120 xl:w-160 xl:h-160 mx-auto object-cover"
//                 src="https://irespace-cdn.com/content/v1/6192d0ae6818523e63640e70/ea3bb75a-2729-4887-bee4-3eef6a9e40a6/unnamed+%2819%29.jpg"
//                 alt=""
//             />
//         </div>
//     </div>
// </div>
// </div>

// <section className="pt-16 bg-primary">
// <div className="container mx-auto">
//     <div className="flex flex-col md:flex-row items-center">
//         <div className="bg-yellow-200  md:w-7/12 md:text-left text-center pt-2 py-6 md:mt-3">
//             {/* Content for the left side */}
//             <div className="  bg-purple-200 md:w-7/12 md:text-left text-center md:ml-8 px-6 py-6 md:mt-5 md:pr-10">
//                 <h4 className="font-bold text text-black-600 mb-3 ">
//                     "Unites integrity, compassion, shared values; making a positive impact on the community with unity and purposeful actions."
//                 </h4>
//                 <h1 className="text-4xl font-mono font-semibold mb-4">Club Name</h1>
//                 <p className="font-medium m-4">Club description goes here.</p>
//                 <div className=" bg-slate-400 flex justify-center items-center md:text-left text-center mt-4">
//                     <button className="btn text-black font-mono rounded-lg px-4 py-2 bg-primary border-2 border-black md:border-2 ml-4 hover:bg-primary hover:text-white transition ease-out duration-500">
//                         Donate to club
//                     </button>
//                     {/* Modal code */}
//                 </div>
//             </div>

//         </div>
//         <div className=" bg-green-200 md:w-5/12 md:order-0 order-1 md:text-right mt-5">
//             {/* Content for the right side */}
//             <div className="md:w-5/12 md:order-0 order-1 md:text-center mt-5">
// <div className="rounded-lg overflow-hidden event-style">
// <div className="bg-gray-500 relative w-full h-full">
// <div className="relative top-0 right-0 bottom-0 left-0 rounded-lg overflow-hidden">
// <img
// className="pt-7 md:pt-0 w-full h-auto block md:w-96 md:h-96  object-cover"
// src="https://images.squarespace-cdn.com/content/v1/6192d0ae6818523e63640e70/ea3bb75a-2729-4887-bee4-3eef6a9e40a6/unnamed+%2819%29.jpg"
// alt="Club image"
// />
// </div>
// </div>
// </div>
// </div>


//         </div>
//     </div>
// </div>
// </section>
// </div>




// import React from 'react';

// function ClubHome() {
//     return (
//         <div>
//             <section className="pt-16 bg-primary">
//                 <div className="container mx-auto">
//                     <div className="flex flex-col md:flex-row items-center">
//                         <div className="bg-yellow-200 md:w-6/12 md:text-left text-center pt-2 py-6 md:mt-3">
//                             {/* Content for the left side */}
//                             <div className="bg-purple-200 md:w-6/12 md:text-left text-center md:ml-8 px-6 py-6 md:mt-5">
//                                 <h4 className="font-bold text text-black-600 mb-3 ">
//                                     "Unites integrity, compassion, shared values; making a positive impact on the community with unity and purposeful actions."
//                                 </h4>
//                                 <h1 className="text-4xl font-mono font-semibold mb-4">Club Name</h1>
//                                 <p className="font-medium m-4">Club description goes here.</p>
//                                 <div className="bg-slate-400 flex justify-center items-center md:text-left text-center mt-4">
//                                     <button className="btn text-black font-mono rounded-lg px-4 py-2 bg-primary border-2 border-black md:border-2 ml-4 hover:bg-primary hover:text-white transition ease-out duration-500">
//                                         Donate to club
//                                     </button>
//                                     {/* Modal code */}
//                                 </div>
//                             </div>
//                         </div>
//                         <div className="bg-green-200 md:w-6/12 md:order-0 order-1 md:text-right mt-5">
//                             {/* Content for the right side */}
//                             <div className="md:w-6/12 md:order-0 order-1 md:text-center mt-5 mx-auto">
//                                 <div className="rounded-lg overflow-hidden event-style">
//                                     <div className="bg-gray-500 relative w-full h-full">
//                                         <div className="relative top-0 right-0 bottom-0 left-0 rounded-lg overflow-hidden">
//                                             <img
//                                                 className="pt-7 px-2 md:pt-0 w-full h-auto md:w-96 md:h-96 lg:w-120 lg:h-120 xl:w-160 xl:h-160 mx-auto object-cover"
//                                                 src="https://images.squarespace-cdn.com/content/v1/6192d0ae6818523e63640e70/ea3bb75a-2729-4887-bee4-3eef6a9e40a6/unnamed+%2819%29.jpg"
//                                                 alt="Club image"
//                                             />
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//                 <br />
//                 <br />
//                 <br />
//             </section>
//         </div>
//     );
// }

// export default ClubHome;





// import React from 'react';

// function ClubHome() {
//     return (
//         <div>
//             <section className="pt-16 bg-primary">
//                 <div className="container">
//                     <div className="row align-items-center">
//                         <div className="col-md-7 col-lg-6 text-md-start text-center py-6 mt-5">
//                             <h4 className="fw-bold text-danger mb-3">
//                                 "Coming together is a beginning, staying together is progress, and working together is success."
//                             </h4>
//                             <h1 className="hero-title">
//                                 <span>Club Name</span>
//                             </h1>
//                             <p className="m-4 fw-medium">
//                                 <span>"Club description goes here."</span>
//                             </p>
//                             <div className="text-center text-md-start">
//                                 <a
//                                     style={{ backgroundColor: 'rgb(207, 132, 86)' }}
//                                     className="btn btn-sm me-md-4 mb-3 mb-md-0 border-0 primary-btn-shadow"
//                                 >
//                                     Pay to club
//                                 </a>
//                                 <div className="modal fade" id="popupVideo" tabIndex="-1" aria-labelledby="popupVideo" aria-hidden="true">
//                                     <div className="modal-dialog modal-dialog-centered modal-lg"></div>
//                                 </div>
//                             </div>
//                         </div>
//                         <div className="bg-red-300 mt-5 col-md-5 col-lg-6 order-0 order-md-1 text-end">
//                             <div className="event-style" style={{ overflow: 'hidden' }}>
//                                 <div style={{ position: 'relative', width: '100%', height: '100%' }}>
//                                     <div style={{ position: 'relative', top: 0, right: 0, bottom: 0, left: 0, borderRadius: '10px', overflow: 'hidden' }}>
//                                         <img
//                                             className="pt-7 pt-md-0 hero-img"
//                                             src="https://res.cloudinary.com/de8nd9vxi/image/upload/v1687858134/aboutus/1000_F_38137330_gUbR3ZXBc5J5g4pRkaC8TYZQA62OZhx5_t080of.jpg"
//                                             alt="Club Image"
//                                         />
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </section>
//         </div>
//     );
// }

// export default ClubHome;




// import React from 'react';

// function ClubHome() {
//     return (
//         <div>
//             <section className="pt-16 bg-primary">
//                 <div className="container mx-auto">
//                     <div className="flex flex-col md:flex-row items-center">
//                         <div className="md:w-6/12 md:text-left text-center py-6 md:mt-3 ">
//                             <div className=" text-center md:text-start md:pl-6 pl-4 pr-8 md:ml-8 md:mt-5 ">
//                                 <h2 className="font- text-xl text-black-600 mb-3">
//                                     "Unites integrity, compassion, shared values; making a positive impact on the community with unity and purposeful actions."
//                                 </h2>
//                                 <h1 className="text-4xl font-mono md:pl-8 md:text-start font-semibold mb-4">Club Name</h1>
//                                 <p className="font-medium m-4">
//                                     Club description goes here.
//                                 </p>
//                                 <div className="mt-4  flex justify-start items-start  ">
//                                     <button className="btn text-black font-mono rounded-lg px-4 py-2 bg-primary border-2 border-black md:border-2 ml-4 hover:bg-primary hover:text-white transition ease-out duration-500">
//                                         Donate to club
//                                     </button>
//                                 </div>

//                             </div>
//                         </div>

//                         <div className="md:w-6/12 md:order-0 order-1 md:text-center mt-5 md:mt-0">
//                             <div className="rounded-lg overflow-hidden event-style">
//                                 <div className="relative w-full h-full">
//                                     <div className="relative top-0 right-0 bottom-0 left-0 rounded-lg overflow-hidden">
//                                         <img
//                                             className="pt-7 rounded-xl md:pt-0 w-full h-auto md:w-96 md:h-96 lg:w-120 lg:h-120 xl:w-160 xl:h-160 mx-auto object-cover"
//                                             src="https://images.squarespace-cdn.com/content/v1/6192d0ae6818523e63640e70/ea3bb75a-2729-4887-bee4-3eef6a9e40a6/unnamed+%2819%29.jpg"
//                                             alt="Club image"
//                                         />
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>


//                     <div className="flex flex-col pt-12 md:flex-row items-center">
//                     <div className="md:w-6/12 md:text-left text-center py-6 md:mt-3 ">
//                             <div className=" text-center md:text-start md:pl-6 pl-4 pr-8 md:ml-8 md:mt-5 ">
//                                 <h2 className="font- text-xl text-black-600 mb-3">
//                                     "Unites integrity, compassion, shared values; making a positive impact on the community with unity and purposeful actions."
//                                 </h2>
//                                 <h1 className="text-4xl font-mono md:pl-8 md:text-start font-semibold mb-4">Club Name</h1>
//                                 <p className="font-medium m-4">
//                                     Club description goes here.
//                                 </p>
//                                 <div className="mt-4  flex justify-start items-start  ">
//                                     <button className="btn text-black font-mono rounded-lg px-4 py-2 bg-primary border-2 border-black md:border-2 ml-4 hover:bg-primary hover:text-white transition ease-out duration-500">
//                                         Donate to club
//                                     </button>
//                                 </div>

//                             </div>
//                         </div>
        
//                         <div className="md:w-6/12 md:order-0 order-1 md:text-center mt-5 md:mt-0">
//                             <div className="rounded-lg overflow-hidden event-style">
//                                 <div className="relative w-full h-full">
//                                     <div className="relative top-0 right-0 bottom-0 left-0 rounded-lg overflow-hidden">
//                                         <img
//                                             className="pt-7 rounded-xl md:pt-0 w-full h-auto md:w-96 md:h-96 lg:w-120 lg:h-120 xl:w-160 xl:h-160 mx-auto object-cover"
//                                             src="https://images.squarespace-cdn.com/content/v1/6192d0ae6818523e63640e70/ea3bb75a-2729-4887-bee4-3eef6a9e40a6/unnamed+%2819%29.jpg"
//                                             alt="Club image"
//                                         />
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                         </div>

//                 </div>
//                 <br></br>
//                 <br></br>
//                 <br></br>
//             </section>
//         </div>
//     );
// }

// export default ClubHome;
