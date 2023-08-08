import React from 'react'
import AdminSidebar from './AdminSidebar'

function Admindashbord() {
  return (
    <div className="flex flex-col md:flex-row">
      {/* Sidebar */}
      <AdminSidebar/>

      {/* Table */}
      <div className="md:w-1/3 sm:w-full p-4">
          <div className="bg-white rounded-lg shadow-lg p-4">
            <p className="text-xl font-bold mb-2">Admin Dashboard</p>
            <div className="flex justify-between">
              <div>
                <p className="text-gray-600">Total Users:</p>
                <p className="text-2xl font-bold">12</p>
              </div>
              <div>
                <p className="text-gray-600">Total Clubs:</p>
                <p className="text-2xl font-bold">4</p>
              </div>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="md:w-2/3 sm:w-full p-4">
          {/* ... (unchanged) */}
        </div>
    </div>
  )
}

export default Admindashbord









// <div className="col-sm-10 h-screen bg-gray-400">
// <div className="text-right m-5">
  {/* Content for the element with text-align: end */}
// </div>
// <div className="row">
//   <div className="col-sm-12">
//     <div className="card m-3">
//       <div className="card-body bg-antiquewhite">
//         <h5 className="card-title">Dashboard</h5>
//       </div>
//     </div>
//   </div>

//   <div className="col-sm-6">
//     <div className="card m-2 mt-4 shadow-md">
//       <div className="card-body bg-blue-300">
//         <h2 className="card-title">Total Clubs</h2>
//         <h1 className="card-text"></h1>
//       </div>
//     </div>
//   </div>

//   <div className="col-sm-6">
//     <div className="card m-2 mt-4 shadow-md">
//       <div className="card-body bg-blue-300">
//         <h2 className="card-title">Total Users</h2>
//         <h1 className="card-text"></h1>
//       </div>
//     </div>
//   </div>
// </div>
// </div>