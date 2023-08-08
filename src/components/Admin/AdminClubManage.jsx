import React, { useState, useEffect } from 'react'
import AdminSidebar from './AdminSidebar'
import { axiosInstance } from '../../../Api/config';
import { useNavigate } from 'react-router-dom';

function AdminClubManage() {
  const navigate=useNavigate()
  const [getclub, setGetClub] = useState([]);

  useEffect(() => {
    fetchdata()
  }, [])

  const fetchdata = async () => {
    try {
      const { data } = await axiosInstance.post('/admin/get-clubdata');
      console.log(data);
      console.log(data.club);
      setGetClub(data.club);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }
const handleBlacklist = async (e,id) => {
  try {
    e.preventDefault()
    console.log(id)
    const {data} = await axiosInstance.post('/admin/set-blacklist',{id:id})
    console.log(data)
  } catch (error) {
    console.log("blacklisting error")
  }
}
const navToClubView = (id) => {
  navigate('/club-details', { state: { id: id } });
}

  return (
    <div>
      <div className="flex flex-col md:flex-row">
        {/* Sidebar */}
        <AdminSidebar />

        {/* Table */}
        <div className="md:w-3/3 sm:w-full p-4">
          <div>
            <p className="px-3 py-3 text-2xl font-bold font-serif text-center">CLUBS</p>
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
                {getclub.map((club, index) => (


                  <tr key={index} className="border-b border-gray-300 hover:bg-gray-100">
                    <td className="px-4 text-center py-3">{index + 1}</td>
                    <td className="px-4 text-center  py-3">
                      {club.image ? (
                        <img
                          className="m-2 w-16 h-16 rounded-full"
                          src={club.image}
                          alt="Generic placeholder image"
                        />
                      ) : (
                        <img
                          className="m-2 w-16 h-16 rounded-full"
                          src="https://www.shutterstock.com/image-vector/no-user-profile-picture-hand-260nw-99335579.jpg"
                          alt="Generic placeholder image"
                        />
                      )}

                    </td>
                    <td className="px-4 text-center  py-3">{club.clubName}</td>
                    <td className="px-4 text-center  py-3">{club.address}</td>
                    <td className="px-4 text-center   py-3">{club.registerNo}</td>
                    <td className="px-4 text-center   py-3">
                    { club.isblacklisted ? (<a
                     onClick={(e)=>handleBlacklist(e,club._id)}
                      className="text-lg text-red-500 font-semibold px-4 py-1 ">
                        BlackListed
                      </a>) : (
                      <button                    
                      className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-1 rounded">
                       Add To BlackList
                      </button>  )}

                    </td>
                    <td className="px-4 text-center  py-3">
                      <button
                      onClick={() => navToClubView(club._id)} className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-1 rounded">
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminClubManage
