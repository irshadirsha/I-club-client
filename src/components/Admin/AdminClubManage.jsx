import React, { useState, useEffect } from 'react'
import AdminSidebar from './AdminSidebar'
// import { axiosInstance } from '../../../Api/config';
import { useNavigate } from 'react-router-dom';
import { adminaxios } from '../../../Api/config';
import Swal from 'sweetalert2';
import Loader from '../Loader/Loader';

function AdminClubManage() {
  const navigate=useNavigate()
  const [loading, setLoading] = useState(true);
  const [getclub, setGetClub] = useState([]);
  const [currentPage, setCurrentPage] = useState(1); // State to keep track of the current page
  const itemsPerPage = 5; // Number of items displayed per page

  useEffect(() => {
    fetchdata()
  }, [])
  console.log('////////////////////////////////',getclub);
  const fetchdata = async () => {
    try {
      const { data } = await adminaxios.post('/get-clubdata');
      console.log(data);
      console.log(data.club);
      setGetClub(data.club);
      setLoading(false)
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }
  console.log('currentPage:', currentPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = getclub.slice(indexOfFirstItem, indexOfLastItem); // Subset of items for the current page
  console.log(currentItems);

const handleBlacklist = async (e,id) => {
  try {
    e.preventDefault()
    Swal.fire({
      title: 'Blacklist Confirmation',
      text: 'Are you sure you want to blacklist the club?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes !',
      cancelButtonText: 'Cancel',
    }).then(async (result) => {
      if (result.isConfirmed) {
        const {data} = await adminaxios.post('/set-blacklist',{id:id})
        fetchdata()
        if (data.message) {
          Swal.fire('Success',data.message, 'success');
        }
        console.log(response);
      }
    });
   
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
      {loading && <Loader/>}
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
                {currentItems .map((club, index) => (


                  <tr key={index} className="border-b border-gray-300 hover:bg-gray-100">
                    <td className="px-4 text-center py-3">{indexOfFirstItem + index + 1}</td>
                    <td className="px-4 text-center  py-3">
                    <div className="w-16 h-16   flex items-center overflow-hidden">
                    <img
                        className="rounded-md"
                        src={club.clubimg || 'https://www.shutterstock.com/image-vector/no-user-profile-picture-hand-260nw-99335579.jpg'}
                        alt="President"
                    />
                    </div>
                     

                    </td>
                    <td className="px-4 text-center  py-3">{club.clubName}</td>
                    <td className="px-4 text-center  py-3">{club.address}</td>
                    <td className="px-4 text-center   py-3">{club.registerNo}</td>
                    <td className="px-4 text-center   py-3">
                    { club.isblacklisted ? (<a
                    
                      className="text-lg text-red-500 font-semibold px-4 py-1 ">
                        BlackListed
                      </a>) : (
                      <button   
                      onClick={(e)=>handleBlacklist(e,club._id)}                 
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
          <div className="flex justify-center mt-4">
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded mr-2"
            onClick={() => setCurrentPage(currentPage - 1)} // Go to previous page
            disabled={currentPage === 1} // Disable when on the first page
          >
            Previous
          </button>
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
            onClick={() => setCurrentPage(currentPage + 1)} // Go to next page
            disabled={indexOfLastItem >= getclub.length} // Disable when on the last page
          >
            Next
          </button>
        </div>
        </div>
      </div>
    </div>
  )
}

export default AdminClubManage





// console.log("blacklisting iddd",id)
// const {data} = await adminaxios.post('/set-blacklist',{id:id})
// console.log(data)
// fetchdata()