import React,{useEffect,useState} from 'react';
import { JaaSMeeting } from '@jitsi/react-sdk';
import { axiosInstance } from '../../../../Api/config';
import { useSelector } from 'react-redux';

function Meeting() {
const {clubName}=useSelector((state)=>state.user)
const [userRole,setuserRole]=useState('')
const [clubdata,setClubData]=useState([])
const [conferencelink,setConferenceLink]=useState('')
console.log(clubName);
useEffect(()=>{
  fetchdata()
},[])
const fetchdata=async()=>{
  const {data}=await axiosInstance.get('/get-meetingdata',{
    params:{clubName}
  })
  console.log("meeting response",data);
  setuserRole(data.data)
  setClubData(data.club)
  console.log("clubDatas",data.club)
}
console.log("rolee",userRole);
const handleInviteClick=async()=>{
  console.log("jjjjjj",conferencelink)
  const data= await axiosInstance.post('/set-conferece',{link:conferencelink,clubName})
  setConferenceLink('')
  console.log(data);
  fetchdata()
}
const handleRemoveLink=async ()=>{
  const data=await axiosInstance.post('/remove-link',{clubName})
  console.log(data);
  fetchdata()
}
  return (
    <div>
      { (userRole=='president' || userRole=='secretory' || userRole=='treasurer') ? (
      <div className="bg-gray-200">
        <div className="container mx-auto p-3">
          <div id="jist-iframe" className="pt-4">
            <h1 className="text-center text-3xl font-mono">Video conference</h1>

            <div className="flex justify-end items-center p-3">
            <input
              type="text"
              className="w-full px-3 py-2 rounded-l-md border focus:outline-none focus:border-blue-500"
              placeholder="Conference link...."
              onChange={(e) => setConferenceLink(e.target.value)}
              value={conferencelink}
            />
              <button
                className="px-4 py-2 bg-green-500 text-white rounded-r-md"
                onClick={handleInviteClick}
              >
                Invite
              </button>
              <button
                className="px-4 py-2 bg-red-500 text-white rounded-md ml-2"
                onClick={handleRemoveLink}
              >
                RemoveData
              </button>
             {(userRole=='president' || userRole=='secretory' || userRole=='treasurer') && (clubdata?.link?.length > 0) && (
              <a  href=""
                className="px-4 py-2 bg-blue-500 text-white rounded-md ml-2"
                // onClick={handleJoinMeetClick}
              >
                Join Meet
              </a>)}
            </div> 

            {/* Icons for audio, video, leave, screen sharing */}
            {/* Implement logic and event listeners for these icons */}

           

           
          </div>
        </div>
        <div  className='bg-yellow-50 w-full h-screen'>
      <JaaSMeeting
    appId = "vpaas-magic-cookie-77164e25941b480482326716ebf9212b"
    roomName = "i-bulc"
    // jwt = { YOUR_VALID_JWT }
    configOverwrite = {{
        disableThirdPartyRequests: true,
        disableLocalVideoFlip: true,
        backgroundAlpha: 0.5,
        constraints: {
            video: {
                height: { ideal: 720, max: 720, min: 180 },
                width: { ideal: 1280, max: 1280, min: 320 },
                frameRate: { max: 30, min: 15 },
                facingMode: "user",
            },
            audio: {
                autoGainControl: true,
                echoCancellation: true,
                noiseSuppression: true,
            },
        },
        
    }}
    interfaceConfigOverwrite = {{
        VIDEO_LAYOUT_FIT: 'nocrop',
        MOBILE_APP_PROMO: false,
        TILE_VIEW_MAX_COLUMNS: 8
    }}
    // spinner = { SpinnerView }
    // onApiReady = { (externalApi) => { ... } }
                getIFrameRef={(iframeRef) => {
                  iframeRef.style.height = "100vh";
                  iframeRef.style.width = "full";
              }}
size
/>
      </div>
      </div>):( 

        (clubdata?.link?.length>0) ? (
      <div className=" flex justify-center mt-8">
        <a
          href={clubdata?.link} // Use the meeting link from clubdata.link
          target="_blank" // Open link in a new tab or window
          rel="noopener noreferrer"
          className="px-4 py-2 bg-blue-500 text-white rounded-md"
        >
          Join Meet
        </a>
            </div>):(
            <div className="mt-8 flex justify-center">
              <img
                className="w-64"
                src="https://annemariesegal.files.wordpress.com/2015/12/no-meetings.jpg"
                alt=""
              />
            </div> 
            )


            )}
    </div>
  );
}

export default Meeting;



// import React,{useEffect,useState} from 'react';
// import { JaaSMeeting } from '@jitsi/react-sdk';
// import { axiosInstance } from '../../../../Api/config';
// import { useSelector } from 'react-redux';

// function Meeting() {
// const {clubName}=useSelector((state)=>state.user)
// const [userRole,setuserRole]=useState('')
// const [clubdata,setClubData]=useState([])
// const [conferencelink,setConferenceLink]=useState('')
// console.log(clubName);
// useEffect(()=>{
//   fetchdata()
// },[])
// const fetchdata=async()=>{
//   const {data}=await axiosInstance.get('/get-meetingdata',{
//     params:{clubName}
//   })
//   console.log("meeting response",data);
//   setuserRole(data.data)
//   setClubData(data.club)
//   console.log("clubDatas",data.club)
// }
// console.log("rolee",userRole);
// const handleInviteClick=async()=>{
//   console.log("jjjjjj",conferencelink)
//   const data= await axiosInstance.post('/set-conferece',{link:conferencelink,clubName})
//   setConferenceLink('')
//   console.log(data);
// }
// const handleRemoveLink=async ()=>{
//   const data=await axiosInstance.post('/remove-link',{clubName})
//   console.log(data);
// }
//   return (
//     <div>
//       { (userRole=='president' || userRole=='secretory' || userRole=='treasurer') ? (
//       <div className="bg-gray-200">
//         <div className="container mx-auto p-3">
//           <div id="jist-iframe" className="pt-4">
//             <h1 className="text-center text-3xl font-mono">Video conference</h1>

//             <div className="flex justify-end items-center p-3">
//             <input
//               type="text"
//               className="w-full px-3 py-2 rounded-l-md border focus:outline-none focus:border-blue-500"
//               placeholder="Conference link...."
//               onChange={(e) => setConferenceLink(e.target.value)}
//               value={conferencelink}
//             />
//               <button
//                 className="px-4 py-2 bg-green-500 text-white rounded-r-md"
//                 onClick={handleInviteClick}
//               >
//                 Invite
//               </button>
//               <button
//                 className="px-4 py-2 bg-red-500 text-white rounded-md ml-2"
//                 onClick={handleRemoveLink}
//               >
//                 RemoveData
//               </button>
//               {/* <a
//                 href="#"
//                 className="px-4 py-2 bg-blue-500 text-white rounded-md ml-2"
//                 // onClick={handleJoinMeetClick}
//               >
//                 Join Meet
//               </a> */}
//             </div> 

//             {/* Icons for audio, video, leave, screen sharing */}
//             {/* Implement logic and event listeners for these icons */}

//             {/* <div className="flex justify-center mt-8">
//               <a
//                 href="#"
//                 className="px-4 py-2 bg-blue-500 text-white rounded-md"
//                 // onClick={handleJoinMeetClick}
//               >
//                 Join Meet
//               </a>
//             </div> */}

//             {/* <div className="mt-8 flex justify-center">
//               <img
//                 className="w-64"
//                 src="https://annemariesegal.files.wordpress.com/2015/12/no-meetings.jpg"
//                 alt=""
//               />
//             </div> */}
//           </div>
//         </div>
//         <div  className='bg-yellow-50 w-full h-screen'>
//       <JaaSMeeting
//     appId = "vpaas-magic-cookie-77164e25941b480482326716ebf9212b"
//     roomName = "i-bulc"
//     // jwt = { YOUR_VALID_JWT }
//     configOverwrite = {{
//         disableThirdPartyRequests: true,
//         disableLocalVideoFlip: true,
//         backgroundAlpha: 0.5,
//         constraints: {
//             video: {
//                 height: { ideal: 720, max: 720, min: 180 },
//                 width: { ideal: 1280, max: 1280, min: 320 },
//                 frameRate: { max: 30, min: 15 },
//                 facingMode: "user",
//             },
//             audio: {
//                 autoGainControl: true,
//                 echoCancellation: true,
//                 noiseSuppression: true,
//             },
//         },
        
//     }}
//     interfaceConfigOverwrite = {{
//         VIDEO_LAYOUT_FIT: 'nocrop',
//         MOBILE_APP_PROMO: false,
//         TILE_VIEW_MAX_COLUMNS: 4
//     }}
//     // spinner = { SpinnerView }
//     // onApiReady = { (externalApi) => { ... } }
//                 getIFrameRef={(iframeRef) => {
//                   iframeRef.style.height = "100vh";
//                   iframeRef.style.width = "full";
//               }}
// size
// />
//       </div>
//       </div>):( 

//         (clubdata?.link?.length>0) ? (
//       <div className=" flex justify-center mt-8">
//         <a
//           href={clubdata?.link} // Use the meeting link from clubdata.link
//           target="_blank" // Open link in a new tab or window
//           rel="noopener noreferrer"
//           className="px-4 py-2 bg-blue-500 text-white rounded-md"
//         >
//           Join Meet
//         </a>
//             </div>):(
//             <div className="mt-8 flex justify-center">
//               <img
//                 className="w-64"
//                 src="https://annemariesegal.files.wordpress.com/2015/12/no-meetings.jpg"
//                 alt=""
//               />
//             </div> 
//             )


//             )}
//     </div>
//   );
// }

// export default Meeting;

 //  <div className='bg-primary flex justify-center items-center w-full h-96 md:h-screen'>
            //     <img src="https://annemariesegal.files.wordpress.com/2015/12/no-meetings.jpg" alt=""
            //     className='w-full h-full md:p-20'
            //     />
            //  </div>


// import React from 'react'
// import { JaaSMeeting,JitsiMeeting} from '@jitsi/react-sdk';
// function Meeting() {
//   return (
//     <div>
           
//            <JaaSMeeting
//     appId = "vpaas-magic-cookie-5814ee87e8c248b5b1800add388455d3"
//     roomName = "b`fet KYC"
//     // jwt = { YOUR_VALID_JWT }
//     configOverwrite = {{
//         disableThirdPartyRequests: true,
//         disableLocalVideoFlip: true,
//         backgroundAlpha: 0.5,
//         constraints: {
//             video: {
//                 height: { ideal: 720, max: 720, min: 180 },
//                 width: { ideal: 1280, max: 1280, min: 320 },
//                 frameRate: { max: 30, min: 15 },
//                 facingMode: "user",
//             },
//             audio: {
//                 autoGainControl: true,
//                 echoCancellation: true,
//                 noiseSuppression: true,
//             },
//         },
        
//     }}
//     interfaceConfigOverwrite = {{
//         VIDEO_LAYOUT_FIT: 'nocrop',
//         MOBILE_APP_PROMO: false,
//         TILE_VIEW_MAX_COLUMNS: 4
//     }}
//     // spinner = { SpinnerView }
//     // onApiReady = { (externalApi) => { ... } }
//                 getIFrameRef={(iframeRef) => {
//                   iframeRef.style.height = "100vh";
//                   iframeRef.style.width = "full";
//               }}
// size
// />
      
      
//     </div>
//   )
// }

// export default Meeting
