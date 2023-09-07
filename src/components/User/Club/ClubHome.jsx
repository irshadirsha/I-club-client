
import React,{useEffect, useRef, useState} from 'react';
import {  useNavigate } from 'react-router-dom';
import { axiosInstance } from '../../../../Api/config';
import ClubNav from './ClubNav';
import { useSelector } from 'react-redux';
import { ToastContainer,toast } from 'react-toastify'
import io from 'socket.io-client'
import {ServerPort } from '../../../../Api/Serverport'
import Swal from 'sweetalert2';
import Loader from '../../Loader/Loader';
function ClubHome() {
    const scrollableRef = useRef(null);
    const socket = io(ServerPort);
    console.log("socket-----------------------------------------------------",socket);
       const user=useSelector((state)=>state.user)
        const clubName=user.clubName
        const currentuser=user.id
        console.log("mmm",user);
        console.log("current userrr",currentuser);

        console.log(clubName);
       const navigate=useNavigate()       
       const [loading, setLoading] = useState(true);
       const [role,setRole]=useState('')
       const [clubData,setClubData]=useState(null)
       const [messages,setMessages]=useState({
     message:"",
     time:"",
     location:""
})
const [errors, setErrors] = useState({
  message:"",
  time:"",
  location:""
});
     const [events,SetEvents]=useState([])

     const [chatMessage, setChatMessage] = useState('');
     const [showmessage,setShowMessage]=useState([])
     
     console.log(showmessage);

     useEffect(() => {
        if (scrollableRef.current) {
          scrollableRef.current.scrollTop = scrollableRef.current.scrollHeight;
        }
      }, [showmessage]);
      useEffect(()=>{
        fetchdata()
        fetchevent()
       
      },[])
      
      useEffect(()=>{
        fetchmessage()
    socket.on("chatMessage", (newMessage) => {
      setMessages((prevMessages) => [
        ...(prevMessages?.length ? prevMessages : []),
        newMessage,
      ]);
    });
  return () => {
    socket.disconnect();
  };
})
const fetchevent=async()=>{
    const {data}= await axiosInstance.post('/get-event',{clubName})
    console.log("------------enents---------------------",data)
    SetEvents(data.modifiedEventData);
    console.log(events);    
}


const fetchdata=async()=>{

    const {data}= await axiosInstance.post('/clubhome',{clubName})
    console.log("000000000000000",data)
    setClubData(data.data)
    console.log(data.userRole);
    setRole(data.userRole)
    setLoading(false)
}

const handleEventSubmit=async(e)=>{
    e.preventDefault()
    try {
      if (messages.message.trim() === "" && messages.time.trim() === "" && messages.location.trim() === "" ) {
        setErrors({
          ...errors,
          message: "Enter Your Events",
          time: "Enter Your Event Time",
          location: "Enter Your Event Location",
        });
        return;
      }
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
        // e.preventDefault()
        Swal.fire({
            title: 'Delete Event Confirmation',
            text: 'Are you sure you want to remove the Event?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, Delete!',
            cancelButtonText: 'Cancel',
          }).then(async (result) => {
            if (result.isConfirmed) {
              console.log('leave', clubName);
              const {data}=await axiosInstance.post('/delete-event',{id:id})
              fetchevent()
              if (response.data.message) {
                Swal.fire('Success', response.data.message, 'success');
              }
             
            }
          });
    } catch (error) {
        console.log("error in event deletion");
    }  
}

const handleSendMessage = async () => {
    if (chatMessage.trim() !== '') {
      // Send the message to the server using axiosInstance
      const data = await axiosInstance.post('/send-message', {
        text: chatMessage,
        clubName: clubName,
      });
      socket.emit('chatMessage', { text: chatMessage, clubName: clubName });
      console.log('Sent chatMessage:', chatMessage);
    setChatMessage('');
    fetchmessage();
    console.log(data);
    }
  };


const fetchmessage = async () =>{
    const response=await axiosInstance.get('/get-message',{
        params:{clubName}
    })

    setShowMessage(response.data.response)
    console.log(response);
}

const handleKeyDown = (event) => {
  if (event.key === 'Enter' && !event.shiftKey) {
    event.preventDefault(); 
    handleSendMessage();
  }
};
return (
<div>
{loading && <Loader/>}
<ClubNav state={clubName}/>
<section className="pt-16 bg-primary">
<div className="container mx-auto">
    <div className="flex flex-col md:flex-row items-center">
        <div className=" md:w-6/12 md:text-left text-center py-6 md:mt-3">
            <div className="text-center md:text-start md:pl-6 pl-4 pr-8 md:ml-8 md:mt-5">
                <h2 className="font-normal text-2xl text-black-600 mb-3">
                    "Unites integrity, compassion, shared values; making a positive impact on the community with unity and purposeful actions."
                </h2>
                <h1 className="text-4xl font-mono md:pl-8 md:text-start font-semibold mb-4">{clubData ? clubData.clubName : clubName}</h1>
                <p className="font-medium text-lg m-4">
                {clubData?.category}
                </p>
                <div className="mt-4 flex justify-start items-start">
                    <button 
                    onClick={()=>{navigate('/payment',{state:{club:clubName}})}}
                    // onClick={()=>{navigate('/payment',{state:{club:clubData.clubName}})}}
                    className="btn text-black font-mono rounded-lg px-4 py-2 bg-white border-2 border-black md:border-2 ml-4   ">
                        Donate to Club
                    </button>
                </div>
            </div>
        </div>

        <div className=" md:w-6/12 md:order-0 order-1 md:text-center mt-5 md:mt-0">
    <div className=" rounded-lg p-4 overflow-hidden event-style">
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

    <div className=" flex flex-col pt-12 md:flex-row items-center">
{/* ITS CHAT MESSAGES */}
     <div className=" w-full  md:w-6/12 md:text-left text-center p-4 py-2 md:mt-3">
<div className=" col-sm-6">
  <h1 className=" text-4xl text-center px-2 font-semibold font-mono">Chat</h1>
  <section className=" md:px-8 overflow-hidden">
    <div className="card">
      <div className="bg-blue-200 card-header  flex justify-between items-center p-3 border-t-4 border-blue-700 ">
        <h5 className="text-md font-semibold">Chat messages</h5>
        <h5 className="text-lg font-bold">{clubName}</h5>
        <div className="flex flex-row items-center space-x-3">
          <i className="fas fa-times text-gray-500 text-xs"></i>
        </div>
      </div>
      
      <div className="bg-gray-300 card-body border overflow-y-auto relative" style={{ height: '400px' }} ref={scrollableRef}>
    {showmessage?.map((message, index) => (
        (message?.user?._id !== currentuser) ? (
            <div key={index}>   
            {/* <h1>....{currentuser}</h1>
            <h1>{message?.user?._id }</h1> */}
             {/* {index === 0 || new Date(message.time).toLocaleDateString() !== new Date(showmessage[index - 1]?.time).toLocaleDateString() ? (
                <p className="text-center text-xs text-gray-500">
                  {new Date(message.time).toLocaleDateString()}
                </p>
              ) : null} */}

                <div className="flex flex-row items-center mx-2 pt-4 space-x-2">
                    <div className="w-12 h-12 rounded-full overflow-hidden">
                        <img
                            src={message?.user?.image || "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava6-bg.webp"}
                            alt="avatar 1"
                            // className="w-full h-full object-cover"
                        />
                    </div >
                    <div className='w-auto max-w-[70%]'>
                    <p className="text-xs text-start text-gray-500">{message?.user?.username}</p>
                        <p className="p-1  text-start break-words bg-gray-100  text-gray-800 rounded-lg">{message?.message}</p>
                        <p className="text-xs text-start text-gray-500 mt-0">
                         {new Date(message?.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                       </p>

                    </div>
                </div>
            </div>
        ) : (
            <div key={index} className="flex justify-end">
                <div className="flex flex-row-reverse items-center mx-2 pt-4 space-x-2">
                    <div className="w-12 h-12 rounded-full mx-2 overflow-hidden">
                        <img
                            src={message?.user?.image || "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava6-bg.webp"}
                            alt="avatar 1"
                            // className="w-12 h-12 object-cover"
                        />
                    </div>
                    
                    <div className='w-auto max-w-[70%]'>
                        <p className="text-xs text-end text-gray-500">{message?.user?.username}</p>
                        <p className="p-1  text-start break-words bg-gray-400 text-white rounded-lg">{message?.message}</p>
                        <p className="text-xs text-end text-gray-500 mt-0">
                         {new Date(message?.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                       </p>

                    </div>
                </div>
            </div>
        )
    ))}
</div>

      <div className="bg-blue-200 border card-footer text-muted flex justify-start items-center p-3">
        <div className="flex justify-between w-full input-group">
          <input
            type="text"
            className="form-control w-full  border-2 px-1 py-1 rounded-md"
            placeholder='enter message...'
            value={chatMessage}
          onChange={(e) => setChatMessage(e.target.value)}
          onKeyDown={handleKeyDown}
            aria-label="Recipient's username"
            aria-describedby="button-addon2"
          />
          <button
            className="bg-primary mx-1 text-white py-1 px-6 rounded-md hover:border"
            type="button"
            id="button-addon2"
            onClick={handleSendMessage}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 ">
  <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
</svg>

          </button>
        </div>
      </div>
    </div>
  </section>
</div>
</div>
    {/* EVENT HANDLING */}
        <div className=" w-full p-4 block md:w-6/12 md:text-left text-center  py-6 md:mt-3">
            <div className="  text-center md:text-start md:pl-4  md:pr-8  md:ml-8 md:mt-5">
                <h1 className="text-4xl font-mono md:pl-8 md:text-center font-semibold mb-4">Events</h1>
                <div className=" p-1   mb-2 responsive-form">
                    {/* i need to show input div only if user secretiry or presidenrt */}  
                        { (role === 'president' || role === 'secretory') && (   
                    <div className="p-3 mb-2 bg-gray-300 rounded-3xl  border-current border">
                        <form >

                        <div className="form-outline mb-2 text-center pt-1">
                <label htmlFor="form3Example1" className="block text-gray-800  text-md mb-1">
                 Events
                </label>
                <input
                  type="text"
                  id="form3Example1"
                  name="message"
                  value={messages.message}
                  onChange={(e) => {
                    setMessages({...messages,[e.target.name]: e.target.value})
                    setErrors({});
                  }}
                  className={`form-control p-2 w-4/6 drop-shadow-md rounded-lg border-current border outline-slate-300 ${
                    errors.message && "border-red-500"
                  }`}
                />
                {errors.message && <p className="text-red-500">{errors.message}</p>}
              </div>

              <div className="form-outline mb-2 text-center pt-1">
                <label htmlFor="form3Example1" className="block text-gray-800  text-md mb-1">
                Enter Events Location
                </label>
                <input
                  type="text"
                  id="form3Example2"
                  name="location"
                  value={messages.location}
                  onChange={(e) => {
                    setMessages({...messages,[e.target.name]: e.target.value})
                    setErrors({});
                  }}
                  className={`form-control p-2 w-4/6 drop-shadow-md rounded-lg border-current border outline-slate-300 ${
                    errors.location && "border-red-500"
                  }`}
                />
                {errors.location && <p className="text-red-500">{errors.location}</p>}
              </div>
            
              <div className="form-outline mb-2 text-center pt-1">
                <label htmlFor="form3Example1" className="block text-gray-800  text-md mb-1">
                Enter Events Time
                </label>
                <input
                  type="text"
                  id="form3Example3"
                  name="time"
                  value={messages.time}
                  onChange={(e) => {
                    setMessages({...messages,[e.target.name]: e.target.value})
                    setErrors({});
                  }}
                  className={`form-control p-2 w-4/6 drop-shadow-md rounded-lg border-current border outline-slate-300 ${
                    errors.time && "border-red-500"
                  }`}
                />
                {errors.time && <p className="text-red-500">{errors.time}</p>}
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
        <div className='flex justify-center items-center'>
        <div className="w-full h-full flex flex-col justify-center items-center rounded overflow-hidden">
            <img
                src="https://www.iimnagpur.ac.in/CoE/CCDA/wp-content/themes/iimnagpur_ccda/images/no-event.jpg"
                alt="avatar 1"
                className="mx-auto rounded-md"
            />
            <p className="text-center text-black">No events available</p>
        </div>
    </div>
    
    )}

   </div>
        </div>

{/* ///////////////////////////// */}
       
    </div>
</div>
<br />
<br />
<br />
</section>
<ToastContainer/>
</div>
)
}

export default ClubHome;
























// import React,{useEffect, useRef, useState} from 'react';
// import {  useNavigate } from 'react-router-dom';
// import { axiosInstance } from '../../../../Api/config';
// import ClubNav from './ClubNav';
// import { useSelector } from 'react-redux';
// import { ToastContainer,toast } from 'react-toastify'
// import io from 'socket.io-client'
// import {ServerPort } from '../../../../Api/Serverport'
// import Swal from 'sweetalert2';
// import Loader from '../../Loader/Loader';
// function ClubHome() {
//     const scrollableRef = useRef(null);
//     const socket = io(ServerPort);
//     console.log("socket-----------------------------------------------------",socket);
//        const user=useSelector((state)=>state.user)
//         const clubName=user.clubName
//         const currentuser=user.id
//         console.log("mmm",user);
//         console.log("current userrr",currentuser);

//         console.log(clubName);
//        const navigate=useNavigate()       
//        const [loading, setLoading] = useState(true);
//        const [role,setRole]=useState('')
//        const [clubData,setClubData]=useState(null)
//        const [messages,setMessages]=useState({
//      message:"",
//      time:"",
//      location:""
// })
// const [errors, setErrors] = useState({
//   message:"",
//   time:"",
//   location:""
// });
//      const [events,SetEvents]=useState([])

//      const [chatMessage, setChatMessage] = useState('');
//      const [showmessage,setShowMessage]=useState([])
     
//      console.log(showmessage);

//      useEffect(() => {
//         if (scrollableRef.current) {
//           scrollableRef.current.scrollTop = scrollableRef.current.scrollHeight;
//         }
//       }, [showmessage]);
      
// useEffect(()=>{
//   fetchdata()
//   fetchevent()
//   fetchmessage()
//   socket.on('chatMessage', (newMessage) => {
//     console.log('Received chatMessage:', newMessage);
//     setShowMessage((prevMessages) => [...prevMessages, newMessage]);
//   });  
//   return () => {
//     socket.disconnect();
//   };
// },[])
// const fetchevent=async()=>{
//     const {data}= await axiosInstance.post('/get-event',{clubName})
//     console.log("------------enents---------------------",data)
//     SetEvents(data.modifiedEventData);
//     console.log(events);    
// }


// const fetchdata=async()=>{

//     const {data}= await axiosInstance.post('/clubhome',{clubName})
//     console.log("000000000000000",data)
//     setClubData(data.data)
//     console.log(data.userRole);
//     setRole(data.userRole)
//     setLoading(false)
// }

// const handleEventSubmit=async(e)=>{
//     e.preventDefault()
//     try {
//       if (messages.message.trim() === "" && messages.time.trim() === "" && messages.location.trim() === "" ) {
//         setErrors({
//           ...errors,
//           message: "Enter Your Events",
//           time: "Enter Your Event Time",
//           location: "Enter Your Event Location",
//         });
//         return;
//       }
//         console.log("eventss",messages,clubData?._id,);
//         const {data} =await axiosInstance.post('/add-events',{messages,club:clubData?._id})
//         console.log("eventss---",data);
//         if (data.message) {
//             toast.success(data.message)
//         }
//         setMessages({
//             message:"",
//             time:"",
//             location:""
//         }) 
//         fetchevent()
       
//     } catch (error) {
//         console.error("Error occurred:", error);
//     }
// }

// const deleteEvent=async( id)=>{
//     try {
//         // e.preventDefault()
//         Swal.fire({
//             title: 'Delete Event Confirmation',
//             text: 'Are you sure you want to remove the Event?',
//             icon: 'warning',
//             showCancelButton: true,
//             confirmButtonText: 'Yes, Delete!',
//             cancelButtonText: 'Cancel',
//           }).then(async (result) => {
//             if (result.isConfirmed) {
//               console.log('leave', clubName);
//               const {data}=await axiosInstance.post('/delete-event',{id:id})
//               fetchevent()
//               if (response.data.message) {
//                 Swal.fire('Success', response.data.message, 'success');
//               }
             
//             }
//           });
//     } catch (error) {
//         console.log("error in event deletion");
//     }  
// }

// const handleSendMessage = async () => {
//     if (chatMessage.trim() !== '') {
//       // Send the message to the server using axiosInstance
//       const data = await axiosInstance.post('/send-message', {
//         text: chatMessage,
//         clubName: clubName,
//       });
//       socket.emit('chatMessage', { text: chatMessage, clubName: clubName });
//       console.log('Sent chatMessage:', chatMessage);
//     setChatMessage('');
//     fetchmessage();
//     console.log(data);
//     }
//   };


// const fetchmessage = async () =>{
//     const response=await axiosInstance.get('/get-message',{
//         params:{clubName}
//     })

//     setShowMessage(response.data.response)
//     console.log(response);
// }

// const handleKeyDown = (event) => {
//   if (event.key === 'Enter' && !event.shiftKey) {
//     event.preventDefault(); 
//     handleSendMessage();
//   }
// };
// return (
// <div>
// {loading && <Loader/>}
// <ClubNav state={clubName}/>
// <section className="pt-16 bg-primary">
// <div className="container mx-auto">
//     <div className="flex flex-col md:flex-row items-center">
//         <div className=" md:w-6/12 md:text-left text-center py-6 md:mt-3">
//             <div className="text-center md:text-start md:pl-6 pl-4 pr-8 md:ml-8 md:mt-5">
//                 <h2 className="font-normal text-2xl text-black-600 mb-3">
//                     "Unites integrity, compassion, shared values; making a positive impact on the community with unity and purposeful actions."
//                 </h2>
//                 <h1 className="text-4xl font-mono md:pl-8 md:text-start font-semibold mb-4">{clubData ? clubData.clubName : clubName}</h1>
//                 <p className="font-medium text-lg m-4">
//                 {clubData?.category}
//                 </p>
//                 <div className="mt-4 flex justify-start items-start">
//                     <button 
//                     onClick={()=>{navigate('/payment',{state:{club:clubName}})}}
//                     // onClick={()=>{navigate('/payment',{state:{club:clubData.clubName}})}}
//                     className="btn text-black font-mono rounded-lg px-4 py-2 bg-primary border-2 border-black md:border-2 ml-4 hover:bg-primary hover:text-white transition ease-out duration-500">
//                         Donate to Club
//                     </button>
//                 </div>
//             </div>
//         </div>

//         <div className=" md:w-6/12 md:order-0 order-1 md:text-center mt-5 md:mt-0">
//     <div className=" rounded-lg p-4 overflow-hidden event-style">
//     <div className="relative w-full h-full">
//             <div className="relative top-0 right-0 bottom-0 left-0 rounded-lg overflow-hidden">
//                 <img
//                     className="pt-7 rounded-xl md:pt-0 w-full h-auto md:w-120 md:h-96 lg:w-120 lg:h-120 xl:w-160 xl:h-160 mx-auto object-contain"
//                     src={clubData?.clubimg || "https://static3.depositphotos.com/1006009/206/i/450/depositphotos_2061693-stock-photo-no-image-available-text-on.jpg"}
//                     alt="Club image"
//                 />
//             </div>
//         </div>
//     </div>
// </div>

//     </div>

//     <div className=" flex flex-col pt-12 md:flex-row items-center">
// {/* ITS CHAT MESSAGES */}
//      <div className=" w-full  md:w-6/12 md:text-left text-center p-4 py-2 md:mt-3">
// <div className=" col-sm-6">
//   <h1 className=" text-4xl text-center px-2 font-semibold font-mono">Chat</h1>
//   <section className=" md:px-8 overflow-hidden">
//     <div className="card">
//       <div className="bg-blue-200 card-header  flex justify-between items-center p-3 border-t-4 border-blue-700 ">
//         <h5 className="text-md font-semibold">Chat messages</h5>
//         <h5 className="text-lg font-bold">{clubName}</h5>
//         <div className="flex flex-row items-center space-x-3">
//           <i className="fas fa-times text-gray-500 text-xs"></i>
//         </div>
//       </div>
      
//       <div className="bg-gray-300 card-body border overflow-y-auto relative" style={{ height: '400px' }} ref={scrollableRef}>
//     {showmessage?.map((message, index) => (
//         (message?.user?._id !== currentuser) ? (
//             <div key={index}>   
//             {/* <h1>....{currentuser}</h1>
//             <h1>{message?.user?._id }</h1> */}
//              {/* {index === 0 || new Date(message.time).toLocaleDateString() !== new Date(showmessage[index - 1]?.time).toLocaleDateString() ? (
//                 <p className="text-center text-xs text-gray-500">
//                   {new Date(message.time).toLocaleDateString()}
//                 </p>
//               ) : null} */}

//                 <div className="flex flex-row items-center mx-2 pt-4 space-x-2">
//                     <div className="w-12 h-12 rounded-full overflow-hidden">
//                         <img
//                             src={message?.user?.image || "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava6-bg.webp"}
//                             alt="avatar 1"
//                             // className="w-full h-full object-cover"
//                         />
//                     </div >
//                     <div className='w-auto max-w-[70%]'>
//                     <p className="text-xs text-start text-gray-500">{message?.user?.username}</p>
//                         <p className="p-1  text-start break-words bg-gray-100  text-gray-800 rounded-lg">{message?.message}</p>
//                         <p className="text-xs text-start text-gray-500 mt-0">
//                          {new Date(message?.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
//                        </p>

//                     </div>
//                 </div>
//             </div>
//         ) : (
//             <div key={index} className="flex justify-end">
//                 <div className="flex flex-row-reverse items-center mx-2 pt-4 space-x-2">
//                     <div className="w-12 h-12 rounded-full mx-2 overflow-hidden">
//                         <img
//                             src={message?.user?.image || "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava6-bg.webp"}
//                             alt="avatar 1"
//                             // className="w-12 h-12 object-cover"
//                         />
//                     </div>
                    
//                     <div className='w-auto max-w-[70%]'>
//                         <p className="text-xs text-end text-gray-500">{message?.user?.username}</p>
//                         <p className="p-1  text-start break-words bg-gray-400 text-white rounded-lg">{message?.message}</p>
//                         <p className="text-xs text-end text-gray-500 mt-0">
//                          {new Date(message?.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
//                        </p>

//                     </div>
//                 </div>
//             </div>
//         )
//     ))}
// </div>

//       <div className="bg-blue-200 border card-footer text-muted flex justify-start items-center p-3">
//         <div className="flex justify-between w-full input-group">
//           <input
//             type="text"
//             className="form-control w-full  border-2 px-1 py-1 rounded-md"
//             placeholder='enter message...'
//             value={chatMessage}
//           onChange={(e) => setChatMessage(e.target.value)}
//           onKeyDown={handleKeyDown}
//             aria-label="Recipient's username"
//             aria-describedby="button-addon2"
//           />
//           <button
//             className="bg-primary mx-1 text-white py-1 px-6 rounded-md hover:border"
//             type="button"
//             id="button-addon2"
//             onClick={handleSendMessage}
//           >
//             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 ">
//   <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
// </svg>

//           </button>
//         </div>
//       </div>
//     </div>
//   </section>
// </div>
// </div>
//     {/* EVENT HANDLING */}
//         <div className=" w-full p-4 block md:w-6/12 md:text-left text-center  py-6 md:mt-3">
//             <div className="  text-center md:text-start md:pl-4  md:pr-8  md:ml-8 md:mt-5">
//                 <h1 className="text-4xl font-mono md:pl-8 md:text-center font-semibold mb-4">Events</h1>
//                 <div className=" p-1   mb-2 responsive-form">
//                     {/* i need to show input div only if user secretiry or presidenrt */}  
//                         { (role === 'president' || role === 'secretory') && (   
//                     <div className="p-3 mb-2 bg-gray-300 rounded-3xl  border-current border">
//                         <form >

//                         <div className="form-outline mb-2 text-center pt-1">
//                 <label htmlFor="form3Example1" className="block text-gray-800  text-md mb-1">
//                  Events
//                 </label>
//                 <input
//                   type="text"
//                   id="form3Example1"
//                   name="message"
//                   value={messages.message}
//                   onChange={(e) => {
//                     setMessages({...messages,[e.target.name]: e.target.value})
//                     setErrors({});
//                   }}
//                   className={`form-control p-2 w-4/6 drop-shadow-md rounded-lg border-current border outline-slate-300 ${
//                     errors.message && "border-red-500"
//                   }`}
//                 />
//                 {errors.message && <p className="text-red-500">{errors.message}</p>}
//               </div>

//               <div className="form-outline mb-2 text-center pt-1">
//                 <label htmlFor="form3Example1" className="block text-gray-800  text-md mb-1">
//                 Enter Events Location
//                 </label>
//                 <input
//                   type="text"
//                   id="form3Example2"
//                   name="location"
//                   value={messages.location}
//                   onChange={(e) => {
//                     setMessages({...messages,[e.target.name]: e.target.value})
//                     setErrors({});
//                   }}
//                   className={`form-control p-2 w-4/6 drop-shadow-md rounded-lg border-current border outline-slate-300 ${
//                     errors.location && "border-red-500"
//                   }`}
//                 />
//                 {errors.location && <p className="text-red-500">{errors.location}</p>}
//               </div>
            
//               <div className="form-outline mb-2 text-center pt-1">
//                 <label htmlFor="form3Example1" className="block text-gray-800  text-md mb-1">
//                 Enter Events Time
//                 </label>
//                 <input
//                   type="text"
//                   id="form3Example3"
//                   name="time"
//                   value={messages.time}
//                   onChange={(e) => {
//                     setMessages({...messages,[e.target.name]: e.target.value})
//                     setErrors({});
//                   }}
//                   className={`form-control p-2 w-4/6 drop-shadow-md rounded-lg border-current border outline-slate-300 ${
//                     errors.time && "border-red-500"
//                   }`}
//                 />
//                 {errors.time && <p className="text-red-500">{errors.time}</p>}
//               </div>    
                      
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
//                     Event:{event.event}
//                 </div>
//                 <div className="text-center text-black text-xl md:text-2xl">
//                   Location:{event.location}
//                 </div>
//                 <div className="text-center text-black text-xl md:text-2xl">
//                     Time:{event.time}
//                 </div>
//                 <div className="main-button-red">
//                     <div className="scroll-to-section text-center text-black">
//                          Message from:{event.auther}
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
//         <div className='flex justify-center items-center'>
//         <div className="w-full h-full flex flex-col justify-center items-center rounded overflow-hidden">
//             <img
//                 src="https://www.iimnagpur.ac.in/CoE/CCDA/wp-content/themes/iimnagpur_ccda/images/no-event.jpg"
//                 alt="avatar 1"
//                 className="mx-auto rounded-md"
//             />
//             <p className="text-center text-black">No events available</p>
//         </div>
//     </div>
    
//     )}

//    </div>
//         </div>

// {/* ///////////////////////////// */}
       
//     </div>
// </div>
// <br />
// <br />
// <br />
// </section>
// <ToastContainer/>
// </div>
// )
// }

// export default ClubHome;




















