
import React,{useEffect,useState} from 'react';
import { JaaSMeeting } from '@jitsi/react-sdk';
import { axiosInstance } from '../../../../Api/config';
import { useSelector } from 'react-redux';

function Meeting() {
const {clubName}=useSelector((state)=>state.user)
const [userRole,setuserRole]=useState('')
console.log(clubName);
useEffect(()=>{
  fetchdata()
},[])
const fetchdata=async()=>{
  const {data}=await axiosInstance.get('/get-meetingdata',{
    params:{clubName}
  })
  console.log("meeting response",data);
  setuserRole(data)
}

  return (
    <div>
      { (userRole=='president' || userRole=='secretory' || userRole=='treasurer') &&(
      <div className="bg-gray-200">
        <div className="container mx-auto p-3">
          <div id="jist-iframe" className="pt-4">
            <h1 className="text-center text-3xl font-mono">Video conference</h1>

            <div className="flex justify-end items-center p-3">
              <input
                type="text"
                className="w-full px-3 py-2 rounded-l-md border focus:outline-none focus:border-blue-500"
                placeholder="Conference link"
                value=""
                onChange={() => {}}
              />
              <button
                className="px-4 py-2 bg-green-500 text-white rounded-r-md"
                // onClick={handleInviteClick}
              >
                Invite
              </button>
              <button
                className="px-4 py-2 bg-red-500 text-white rounded-md ml-2"
                // onClick={handleRemoveDataClick}
              >
                RemoveData
              </button>
              {/* <a
                href="#"
                className="px-4 py-2 bg-blue-500 text-white rounded-md ml-2"
                // onClick={handleJoinMeetClick}
              >
                Join Meet
              </a> */}
            </div> 

            {/* Icons for audio, video, leave, screen sharing */}
            {/* Implement logic and event listeners for these icons */}

            {/* <div className="flex justify-center mt-8">
              <a
                href="#"
                className="px-4 py-2 bg-blue-500 text-white rounded-md"
                // onClick={handleJoinMeetClick}
              >
                Join Meet
              </a>
            </div> */}

            {/* <div className="mt-8 flex justify-center">
              <img
                className="w-64"
                src="https://annemariesegal.files.wordpress.com/2015/12/no-meetings.jpg"
                alt=""
              />
            </div> */}
          </div>
        </div>
      </div>)}
      {/* Check the CSS styling for the parent container */}
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
        TILE_VIEW_MAX_COLUMNS: 4
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
    </div>
  );
}

export default Meeting;




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



// import React from 'react'
// import { JaaSMeeting,JitsiMeeting} from '@jitsi/react-sdk';
// function Meeting() {
//   return (
//     <div
//       style={{
//         minHeight: '100%',
//         display: 'flex',
//         flex: 1,
//         flexDirection: 'column'
//     }}
//     >
//         <JaaSMeeting
//           appId="vpaas-magic-cookie-77164e25941b480482326716ebf9212b"
//           roomName="ebulc"
//           configOverwrite={{
//             disableThirdPartyRequests: true,
//             disableLocalVideoFlip: true,
//             backgroundAlpha: 0.5,
           
//           }}
//           interfaceConfigOverwrite={{
//             VIDEO_LAYOUT_FIT: 'nocrop',
//             MOBILE_APP_PROMO: false,
//             TILE_VIEW_MAX_COLUMNS: 4,
//           }}
//           onApiReady={(externalApi) => {
//             // Attach event listeners or store the externalApi for interactions
//           }}
//           style={{
//             display: 'flex',
//             flexDirection: 'column',
//             flex: 1
//           }}
//           getIFrameRef = { (iframeRef) => { iframeRef.style.height = '100%'; } }
//         />
      
//     </div>
//   )
// }

// export default Meeting






// import React from 'react';
// import { JaaSMeeting } from '@jitsi/react-sdk';

// function Meeting() {
//   const handleInviteClick = () => {
//     // Implement logic for inviting participants
//   };

//   const handleRemoveDataClick = () => {
//     // Implement logic for removing data
//   };

//   const handleJoinMeetClick = () => {
//     // Implement logic for joining the meeting
//   };

//   return (
//     <div>
//       <JaaSMeeting
//         appId="vpaas-magic-cookie-77164e25941b480482326716ebf9212b"
//         roomName="PleaseUseAGoodRoomName"
//         configOverwrite={{
//           disableThirdPartyRequests: true,
//           disableLocalVideoFlip: true,
//           backgroundAlpha: 0.5,
//           constraints:{
//             video:{
//               height:{ideal:720,max:720,min:180},
//               width:{ideal:1280,max:1280,min:320},
//               frameRate:{max:30,min:15},
//             }
//           }
//         }}

//         interfaceConfigOverwrite={{
//           VIDEO_LAYOUT_FIT: 'nocrop',
//           MOBILE_APP_PROMO: false,
//           TILE_VIEW_MAX_COLUMNS: 4,
//         }}
//         onApiReady={(externalApi) => {
//           // Attach event listeners or store the externalApi for interactions
//         }}
//       />

      // {/* <div className="bg-gray-200">
      //   <div className="container mx-auto p-3">
      //     <div id="jist-iframe" className="pt-4">
      //       <h1 className="text-center text-3xl font-mono">Video conference</h1>

      //       <div className="flex justify-end items-center p-3">
      //         <input
      //           type="text"
      //           className="w-full px-3 py-2 rounded-l-md border focus:outline-none focus:border-blue-500"
      //           placeholder="Conference link"
      //           value=""
      //           onChange={() => {}}
      //         />
      //         <button
      //           className="px-4 py-2 bg-green-500 text-white rounded-r-md"
      //           onClick={handleInviteClick}
      //         >
      //           Invite
      //         </button>
      //         <button
      //           className="px-4 py-2 bg-red-500 text-white rounded-md ml-2"
      //           onClick={handleRemoveDataClick}
      //         >
      //           RemoveData
      //         </button>
      //         <a
      //           href="#"
      //           className="px-4 py-2 bg-blue-500 text-white rounded-md ml-2"
      //           onClick={handleJoinMeetClick}
      //         >
      //           Join Meet
      //         </a>
      //       </div> */}

      //       {/* Icons for audio, video, leave, screen sharing */}
      //       {/* Implement logic and event listeners for these icons */}

      //       {/* <div className="flex justify-center mt-8">
      //         <a
      //           href="#"
      //           className="px-4 py-2 bg-blue-500 text-white rounded-md"
      //           onClick={handleJoinMeetClick}
      //         >
      //           Join Meet
      //         </a>
      //       </div>

      //       <div className="mt-8 flex justify-center">
      //         <img
      //           className="w-64"
      //           src="https://annemariesegal.files.wordpress.com/2015/12/no-meetings.jpg"
      //           alt=""
      //         />
      //       </div>
      //     </div>
      //   </div>
      // </div> */}
      
//     </div>
//   );
// }

// export default Meeting;



// import React from 'react'
// import {JitsiMeeting ,JaaSMeeting} from '@jitsi/react-sdk'
// function Meeting() {
 
//   return (
//     <div>
//        <JaaSMeeting
//     appId = { "vpaas-magic-cookie-77164e25941b480482326716ebf9212b" }
//     roomName = "PleaseUseAGoodRoomName"
//     // jwt = { YOUR_VALID_JWT }
//     configOverwrite = {{
//         disableThirdPartyRequests: true,
//         disableLocalVideoFlip: true,
//         backgroundAlpha: 0.5
//     }}
//     interfaceConfigOverwrite = {{
//         VIDEO_LAYOUT_FIT: 'nocrop',
//         MOBILE_APP_PROMO: false,
//         TILE_VIEW_MAX_COLUMNS: 4
//     }}
//     spinner = { SpinnerView }
//     onApiReady = { (externalApi) => {  } }
// />
//       <div className="bg-gray-200">
//   <div className="container mx-auto p-3">
//     <div id="jist-iframe" className="pt-4">
//       <h1 className="text-center text-3xl font-mono">Video conference</h1>

//       <div className="flex justify-end items-center p-3">
//         <input
//           type="text"
//           className="w-full px-3 py-2 rounded-l-md border focus:outline-none focus:border-blue-500"
//           placeholder="Conference link"
//           value=""
//           onChange={() => {}}
//         />
//         <button className="px-4 py-2 bg-green-500 text-white rounded-r-md" onClick={() => {}}>
//           Invite
//         </button>
//         <button className="px-4 py-2 bg-red-500 text-white rounded-md ml-2" onClick={() => {}}>
//           RemoveData
//         </button>
//         <a href="" className="px-4 py-2 bg-blue-500 text-white rounded-md ml-2">
//           Join Meet
//         </a>
//       </div>

//       <div className="flex items-center justify-center h-full">
//         <i className={`fa fa-microphone fa-2x gray-color cursor-pointer`} title="Mute / Unmute"></i>
//         <i className="fa fa-phone-slash fa-2x red-color cursor-pointer ml-2" title="Leave"></i>
//         <i className={`fa fa-video fa-2x gray-color cursor-pointer ml-2`} title="Start / Stop Camera"></i>
//         <i className="fa fa-film fa-2x gray-color cursor-pointer ml-2" title="Share your screen"></i>
//       </div>
//     </div>

//     <div className="flex justify-center mt-8">
//       <a href="" className="px-4 py-2 bg-blue-500 text-white rounded-md">
//         Join Meet
//       </a>
//     </div>

//     <div className="mt-8 flex justify-center">
//       <img className="w-64" src="https://annemariesegal.files.wordpress.com/2015/12/no-meetings.jpg" alt="" />
//     </div>
//   </div>
// </div>

//     </div>
//   )
// }

// export default Meeting





// import React, { useEffect } from 'react';

// const MeetingComponent = () => {
//   useEffect(() => {
//     const domain = 'meet.jit.si';
//     const options = {
//       roomName: 'YourRoomName', // Set your room name here
//       width: 800,
//       height: 600,
//       parentNode: document.querySelector('#meet-container'),
//       configOverwrite: { startWithAudioMuted: true },
//       interfaceConfigOverwrite: { DISABLE_DOMINANT_SPEAKER_INDICATOR: true },
//       userInfo: {
//         email: 'email@example.com',
//         displayName: 'John Doe',
//       },
//     };

//     const api = new JitsiMeetExternalAPI(domain, options);

//     // Optional: Attach event listeners or perform actions with the api object
//     api.addEventListener('videoConferenceJoined', () => {
//       console.log('Joined the conference');
//     });

//     // Clean up
//     return () => {
//       api.dispose();
//     };
//   }, []);

//   return (
//     <div id="meet-container">
//       {/* This is where the Jitsi Meet IFrame will be embedded */}
//     </div>
//   );
// };

// export default MeetingComponent;
