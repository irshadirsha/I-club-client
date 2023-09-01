import React from 'react'

function Loader() {
  return (
    <div className="fixed inset-0 flex justify-center items-center">
  <div className="w-12 h-12 rounded-full animate-spin border-2 border-solid border-white border-t-transparent"></div>
</div>

  )
}

export default Loader



// import React from 'react'

// function Loader() {
//   return (
//     <div className='absolute bg-primary h-screen flex justify-center items-center'>
//        <div class="w-12 h-12 rounded-full animate-spin
//                     border-x-2 border-solid border-white border-t-transparent"></div>

//     </div>
//   )
// }

// export default Loader
