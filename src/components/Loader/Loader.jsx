import React from 'react'

function Loader() {
  return (
    <div className="fixed inset-0 flex justify-center items-center">
  <div className="w-12 h-12 rounded-full animate-spin border-2 border-solid border-black border-t-transparent"></div>
</div>

  )
}

export default Loader









// import React from 'react';

// function Loader() {
//   const loaderStyle = {
//     width: '300px',
//     height: '100px',
//     display: 'flex',
//     justifyContent: 'center',
//     alignItems: 'flex-end',
//   };

//   const loadingBarStyle = {
//     width: '20px',
//     height: '10px',
//     margin: '0 5px',
//     backgroundColor: '#3498db',
//     borderRadius: '5px',
//     animation: 'loading-wave-animation 1s ease-in-out infinite',
//   };

//   return (
//     <div className="fixed inset-0 flex justify-center items-center">
//       <div style={loaderStyle} className="loading-wave">
//         <div style={loadingBarStyle}></div>
//         <div style={loadingBarStyle}></div>
//         <div style={loadingBarStyle}></div>
//         <div style={loadingBarStyle}></div>
//       </div>
//     </div>
//   );
// }

// export default Loader;







