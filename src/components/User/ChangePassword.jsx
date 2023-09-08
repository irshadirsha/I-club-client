import axios from 'axios'
import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { axiosInstance } from '../../../Api/config';
function ChangePassword() {
const navigate=useNavigate()
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const userId = queryParams.get('userId');
  const token = queryParams.get('token');

  const handleSubmit = async (e) => {
    e.preventDefault()
    const { data } = await axiosInstance.post(`/reset-password/?userId=${userId}&token=${token}`)
    if (data.status === true) {
           navigate('/new-password',{ state: { email: data.email } })
    } 
}
  return (
    <div >
      <main id="content" role="main" className="w-full max-w-md mx-auto p-6">
        <div className="mt-7 bg-white  rounded-xl shadow-lg dark:bg-gray-800 dark:border-gray-700">
          <div className="p-4 sm:p-7">
            <div className="text-center">
              <h1 className="block text-2xl font-bold text-gray-800 dark:text-white">E-club</h1>
              <h1 className="block text-2xl font-bold text-gray-800 dark:text-white">Verify Your Account</h1>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                click below button
              </p>
              <div> 
                <button onClick={handleSubmit}
                type="submit"
                className="px-2 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800"
              >
                CLICK
              </button> </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default ChangePassword
