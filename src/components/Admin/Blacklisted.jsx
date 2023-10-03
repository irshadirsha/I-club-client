import React,{useEffect, useState} from 'react'
import AdminSidebar from './AdminSidebar'
import { adminaxios } from '../../../Api/config'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
function Blacklisted() {
    const navigate=useNavigate()
    const [blacklisted,setBlacklisted]=useState([])
   useEffect(()=>{
    fetchdata()
   },[])
   const fetchdata=async ()=>{
    const {data}=await  adminaxios.get('/get-blacklisted')
    console.log(data);
    console.log(data.club);
    setBlacklisted(data.club)
   }
   const navToClubView = (id) => {
    navigate('/club-details', { state: { id: id } });
  }
  const removeFromBlackList =async (e,id)=>{
    e.preventDefault()
    Swal.fire({
      title: 'Remove from Blacklist Confirmation',
      text: 'Are you sure you want to remove from the Blacklist?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, Remove!',
      cancelButtonText: 'Cancel',
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res=await adminaxios.post('/removeblacklist',{id:id})
        fetchdata()
        if (res.data.message) {
          Swal.fire('Success', res.data.message, 'success');
        }
        console.log(res);
      }
    });
   

  }
  return (
    <div>
      <div className="flex flex-col md:flex-row">
        <AdminSidebar/>
        <div className="md:w-3/3 sm:w-full p-4">
  <div>
    <p className="px-3 py-3 text-2xl font-bold font-serif text-center">BLACKLISTED CLUBS</p>
  </div>
  <div className="w-full overflow-x-auto">
    <table className="w-full table-auto rounded-lg shadow-lg bg-white">
      <thead>
        <tr className="bg-gray-200 text-gray-700">
          <th className="px-4 py-3">Index</th>
          <th className="px-4 py-3">Image</th>
          <th className="px-4 py-3">ClubName</th>
          <th className="px-4 py-3">Place</th>
          <th className="px-4 py-3">RegisterNo</th>
          <th className="px-4 py-3">Action</th>
          <th className="px-4 py-3">View</th>
        </tr>
      </thead>
      <tbody className="text-gray-600">
      {/* {currentItems .map((club, index) => ( */}
        { blacklisted.map((club,index)=>(
        <tr className="border-b border-gray-300 hover:bg-gray-100">
          <td className="px-4 text-center py-3">{index+1}</td>
          <td className="px-4 text-center  py-3">
            <div className="w-20 h-20   flex items-center overflow-hidden">
              <img
                className="rounded-md"
                src={club.clubimg || 'https://www.shutterstock.com/image-vector/no-user-profile-picture-hand-260nw-99335579.jpg'}
                alt="Club Image"
              />
            </div>
          </td>
          <td className="px-4 text-center  py-3">{club.clubName}</td>
          <td className="px-4 text-center  py-3">{club.address}</td>
          <td className="px-4 text-center   py-3">{club.registerNo}</td>
          <td className="px-4 text-center   py-3">
            <button  onClick={(e)=>removeFromBlackList(e,club._id)}    
              className="bg-gray-500 hover:bg-gray-600 text-white px-2 py-1 rounded">
              Remove from BlackList
            </button>
          </td>
          <td className="px-4 text-center  py-3">
            <button  onClick={() => navToClubView(club._id)}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-1 rounded">
              View
            </button>
          </td>
        </tr>  ))}
        {/* Repeat the above static row for other entries */}
      </tbody>
    </table>
  </div>
</div>

      </div>
    </div>
  )
}

export default Blacklisted