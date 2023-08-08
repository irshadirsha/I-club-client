import React, { useEffect, useState } from 'react';
import AdminSidebar from './AdminSidebar';
import { useLocation } from 'react-router-dom';
import { axiosInstance } from '../../../Api/config';
function AdminClubView() {
const location = useLocation();
const id = location.state?.id;
const [alldata, setAllData] = useState([])
   useEffect(() => {
   fetchdata()
   }, [])
const fetchdata = async () => {
console.log("view", id);
const response = await axiosInstance.get(`/admin/club-details?id=${id}`);
const fetchedData = response.data.data;
setAllData(fetchedData);
console.log(fetchedData);
}
return (
<div>
    <div className="flex flex-col md:flex-row">
        {/* Sidebar */}
        <AdminSidebar />
        <div className="md:w-3/3 sm:w-full p-4">
            <div>
                <p className="px-3 py-3 text-2xl font-bold font-serif text-center">CLUB DETAILS</p>
                <div className="container">
                    <div className="flex flex-col md:flex-row items-center">
                        <div className="order-0 md:order-1 md:w-1/2 text-center md:text-right pr-4">
                            <div className="w-full h-500px overflow-hidden">
                                <div className="relative w-full h-full">
                                    <div className="relative top-0 right-0 bottom-0 left-0 rounded-lg flex justify-center items-center overflow-hidden">
                                        <img
                                            className="relative top-0 left-0 w-80 h-80 object-cover rounded-full md:pt-0 hero-img"
                                            src="https://res.cloudinary.com/de8nd9vxi/image/upload/v1687858134/aboutus/1000_F_38137330_gUbR3ZXBc5J5g4pRkaC8TYZQA62OZhx5_t080of.jpg"
                                            alt="Club Image"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="md:w-1/2 md:col-md-7 p-4 md:col-lg-6 text-center md:text-md-start">
                            <a className="text-center font-mono text-3xl">{alldata.clubName}</a>
                            <table className="w-full bg-white rounded-lg shadow-md">

                                <tbody>
                                    <tr className="bg-gray-200">
                                        <td className="font-semibold py-2 pr-2">Place</td>
                                        <td className="py-2">{alldata?.address}</td>
                                    </tr>
                                    <tr className="bg-gray-100">
                                        <td className="font-semibold py-2 pr-2">Category</td>
                                        <td className="py-2">{alldata?.category}</td>
                                    </tr>
                                    <tr className="bg-gray-200">
                                        <td className="font-semibold py-2 pr-2">Members</td>
                                        <td className="py-2">{alldata?.members?.length + 3 || 0}</td>
                                    </tr>
                                    <tr className="bg-gray-100">
                                        <td className="font-semibold py-2 pr-2">Register No</td>
                                        <td className="py-2">{alldata?.registerNo}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                {/* /////////////////////////////////// */}
                <div className='bg-gray-200 m-8 p-4 text-lg font-mono font-bold flex justify-around'>
                    <p>post </p>
                    <p>members</p>
                </div>

                <div className="container">
                    <div className="flex flex-col md:flex-row items-center">
                        <div className="md:w-1/3 text-center md:text-right pr-4">
                            <div className="w-full h-500px overflow-hidden">
                                <div className="relative w-full h-full">
                                    <div className="relative  top-0 right-0 bottom-0 left-0 rounded-lg flex justify-center items-center overflow-hidden">
                                        <img
                                            className="relative top-0 left-0 w-full h-full object-cover md:pt-0 hero-img"
                                            src="https://res.cloudinary.com/de8nd9vxi/image/upload/v1687858134/aboutus/1000_F_38137330_gUbR3ZXBc5J5g4pRkaC8TYZQA62OZhx5_t080of.jpg"
                                            alt="Club Image"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="md:w-2/3 md:col-md-7 p-4 md:col-lg-6 text-center md:text-md-start">
                            <table className="w-full bg-white rounded-lg shadow-md">
                                <thead className="bg-gray-100">
                                    <tr>
                                        <th className="font-semibold py-2 pr-2">Image</th>
                                        <th className="font-semibold py-2 pr-2">Name</th>
                                        <th className="font-semibold py-2 pr-2">Role</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="bg-gray-100">
                                        <td className="py-2">
                                            <div className=' flex justify-center'>
                                                <img
                                                    className="w-16 h-16 rounded-full object-cover"
                                                    src={alldata?.president?.image || 'https://www.shutterstock.com/image-vector/no-user-profile-picture-hand-260nw-99335579.jpg'}
                                                    alt="President"
                                                />
                                            </div>
                                        </td>
                                        <td className="py-2">{alldata?.president?.username}</td>
                                        <td className="py-2">President</td>
                                    </tr>
                                    <tr className="bg-gray-200">
                                        <td className="py-2">
                                            <div className=' flex justify-center'>
                                                <img
                                                    className="w-16 h-16 rounded-full object-cover"
                                                    src={alldata?.secretory?.image || 'https://www.shutterstock.com/image-vector/no-user-profile-picture-hand-260nw-99335579.jpg'}
                                                    alt="Secretary"
                                                />
                                            </div>
                                        </td>
                                        <td className="py-2">{alldata?.secretory?.username}</td>
                                        <td className="py-2">Secretary</td>
                                    </tr>
                                    <tr className="bg-gray-100">
                                        <td className="py-2">
                                            <div className=' flex justify-center'>
                                                <img
                                                    className="w-16 h-16 rounded-full object-cover"
                                                    src={alldata?.treasurer?.image || 'https://www.shutterstock.com/image-vector/no-user-profile-picture-hand-260nw-99335579.jpg'}
                                                    alt="Treasurer"
                                                />
                                            </div>
                                        </td>
                                        <td className="py-2">{alldata?.treasurer?.username}</td>
                                        <td className="py-2">Treasurer</td>
                                    </tr>
                                    {alldata?.members?.map((member, index) => (
                                        <tr key={index} className={index % 2 === 0 ? 'bg-gray-200' : 'bg-gray-100'}>
                                            <td className="py-2">
                                                <div className=' flex justify-center'>
                                                    <img
                                                        className="w-16 h-16 rounded-full object-cover"
                                                        src={member?.image || 'https://www.shutterstock.com/image-vector/no-user-profile-picture-hand-260nw-99335579.jpg'}
                                                        // alt={`Club Member ${index + 1}`}
                                                    />
                                                </div>
                                            </td>
                                            <td className="py-2">{member?.username}</td>
                                            <td className="py-2">Member</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                    </div>
                </div>

                {/* ////////////////////////////////// */}
            </div>
        </div>
    </div>
</div>
);
}

export default AdminClubView;
