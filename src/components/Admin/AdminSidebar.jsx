import React from 'react'
import { useNavigate } from 'react-router-dom'
function AdminSidebar() {
  const navigate=useNavigate()
  const adminlogout=(e)=>{
    localStorage.removeItem('admin')
    console.log("admin logout");
      navigate('/adminlogin')
 }
  return (
    <div className="md:w-1/5 bg-gray-300 p-4 md:h-screen rounded">
    <div className="flex flex-col m-0">
      <div className="bg-gray-500 w-90 h-10 mt-6 text-center rounded-lg py-2">
        <h6><a onClick={()=>{navigate('/admin')}} className="text-white "><i>Dashboard</i></a></h6>
      </div>
      <div className="bg-gray-500 w-90 h-10 mt-6 text-center rounded-lg py-2">
        <h6><a onClick={()=>{navigate('/club-manage')}} className="text-white "><i>Clubs</i></a></h6>
      </div>
      <div className="bg-gray-500 w-90 h-10 mt-6 text-center rounded-lg py-2">
        <h6><a onClick={()=>navigate('/admin-usermanage')}  className="text-white "><i>Users</i></a></h6>
      </div>
      <div className="bg-gray-500 w-90 h-10 mt-6 text-center rounded-lg py-2">
        <h6><a  onClick={()=>navigate('/banner')}  className="text-white "><i>Banner</i></a></h6>
      </div>
      <div className="bg-gray-500 w-90 h-10 mt-6 text-center rounded-lg py-2">
        <h6><a onClick={()=>navigate('/blacklisted')}  className="text-white "><i>Blacklist</i></a></h6>
      </div>
      <div className="bg-gray-500 w-90 h-10 mt-6 text-center rounded-lg py-2">
        <h6><a onClick={adminlogout} className="text-white "><i>Logout</i></a></h6>
      </div>
    </div>
    </div>

  )
}

export default AdminSidebar
