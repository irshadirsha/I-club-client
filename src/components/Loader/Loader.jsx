import React from 'react'

function Loader() {
  return (
    <div className="fixed inset-0 flex justify-center items-center">
  <div className="w-12 h-12 rounded-full animate-spin border-2 border-solid border-black border-t-transparent"></div>
</div>

  )
}

export default Loader


