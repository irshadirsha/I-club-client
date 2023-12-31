import React, { useEffect, useState } from 'react'
import { axiosInstance } from '../../../../Api/config'
import { useSelector } from 'react-redux'
import { ToastContainer,toast } from 'react-toastify'
import Loader from '../../Loader/Loader'
// import 'react-toastify/dist/ReactToastify.css';

function Notification() {
  const { clubName } = useSelector((state) => state.user)
  const [loading, setLoading] = useState(true);
  const [note, setNote] = useState('')
  const [notificationdata, setNotificationData] = useState([]);
  const [userRole, setUserRole] = useState('');
  const [errors, setErrors] = useState({
    note: "",
  });
  useEffect(() => {
    fetchnote()
  }, [])
  const fetchnote = async () => {
    const { data } = await axiosInstance.get('/get-note', {
      params: { clubName }
    })
    if (data.status === true) {
      setNotificationData(data.note)
      setUserRole(data.userRole)
      setLoading(false)
    }
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log("iiiiiii",note);
    if (note == "") {
      setErrors({
        note: "Please Enter Your Notification",
      });
      return;
    }
    const { data } = await axiosInstance.post('/send-note', { note, clubName })
    if (data.message) {
      toast.success(data.message, {
        autoClose: 2000,
        position: toast.POSITION.TOP_RIGHT
      })}
      if (data.errors) {
        toast.error(data.errors, {
        autoClose: 2000,
        position: toast.POSITION.TOP_RIGHT
       })} 
    if(data){
      setNote('')
    fetchnote()
    }}
  const handleNoteDlt = async (e,id) =>{
    e.preventDefault()
    const {data}=await axiosInstance.post('/delete-note',{deleteid:id})
    if (data.message) {
      toast.success(data.message, {
        autoClose: 2000,
        position: toast.POSITION.TOP_RIGHT
      })}
    if(data.deleted){
      fetchnote()
    }
  }
  return (
    <div className="bg-primary min-h-screen">
         {loading && <Loader/>}
      {(userRole === 'president' || userRole === 'secretory') && (<div className=" flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-4">
          <div>
            <h2 className="mt-2 text-center text-2xl font-mono font-bold text-gray-900">
              Notifications
            </h2>
          </div>
          <form className="mt-2 space-y-6" onSubmit={handleSubmit}>

            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="message" className="sr-only">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows="3"
                  value={note}
                  onChange={(e) =>{ setNote(e.target.value)
                    setErrors({})
                  }}
                  className={`appearance-none rounded-none relative block w-full px-3 py-2 border text-gray-700 placeholder-gray-400 focus:outline-none  focus:z-10 sm:text-sm
                  ${ errors.note && "border-red-500"}`}
                  placeholder="Enter your message"
                />
              </div>
              {errors.note && <p className="text-red-500 text-center">{errors.note}</p>}
            </div>



            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Send Notification
              </button>
            </div>
          </form>
        </div>
      </div>)}
      <div className=" py-8 px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl text-center font-semibold mb-4">Notification</h1>
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-200 divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-md font-bold  text-black font-mono uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-md font-bold text-black font-mono uppercase tracking-wider">
                  Message
                </th>
                {(userRole === 'president' || userRole === 'secretory') &&
                  (<th className="px-6 py-3 text-left text-md font-bold text-black font-mono uppercase tracking-wider">
                    Action
                  </th>)}

              </tr>
            </thead>
          <tbody className="bg-white divide-y divide-gray-200">
              {notificationdata.length>0 ? (
              notificationdata.map((notification) => (
                <tr key={notification._id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-black">
                    {new Date(notification.date).toLocaleDateString(undefined, {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric'
                    })}
                  </td>
                  <td className="px-6 py-4 whitespace-pre-wrap text-md text-black">
                    {notification.message}
                  </td>
                  {(userRole == 'president' || userRole === 'secretory') && (<td className="px-6 py-4 whitespace-pre-wrap text-sm text-gray-500">
                    <button onClick={(e)=>handleNoteDlt(e,notification._id)} className="bg-indigo-600 hover:g-indigo-700 text-white w-20 py-1 rounded">
                      Remove
                    </button>
                  </td>)}
                </tr>
              ))
           ):(
            <tr>
              <td colSpan="3" className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                No Notifications 
              </td>
            </tr>
           )}
              </tbody>
          </table>
        </div>
      </div>
      <ToastContainer/>
    </div>
  )
}

export default Notification
