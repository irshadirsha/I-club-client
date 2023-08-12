import React,{useState,useEffect} from 'react'
import { axiosInstance } from '../../../../Api/config'
import { useSelector } from 'react-redux'
import ClubAuthority from './ClubAuthority'
import { ToastContainer,toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

function Members() {
    const [adduser,SetAddUser]=useState('')
   const {clubName}=useSelector((state)=>state.user)
//    const [member,setMember]=useState([])
    //   const [userRole, setUserRole] = useState('');
//   useEffect(()=>{
//     getmember()
//   },[])
//     const getmember=async(e)=>{
//         const {doce}=await axiosInstance.get('/get-member',{
//            params: { clubName }
//            })
//            console.log(doce);
//     }

    const handleSubmit=async(e)=>{
        e.preventDefault()
        const requestData = {
            clubName: clubName,
            adduser: adduser
          };
      console.log(requestData);
        const {data}=await axiosInstance.post('/add-member',requestData)
        console.log("resAddmem",data)
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
            console.log(data.members.username)
           
    }
  return (
    <div className='bg-primary'>
        <div className='text-center text-xl font-mono font-bold '>
            <h1 className='p-4'>Members</h1>
        </div>
       <ClubAuthority/>
        <div className=" flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className=" border max-w-md w-full space-y-4">
        <div>
          <h2 className="mt-2 text-center text-2xl font-mono font-bold text-gray-900">
            Add Member
          </h2>
        </div>
        <form className="mt-2 space-y-6" onSubmit={handleSubmit} >
          <div className="rounded-md shadow-sm -space-y-px">
            <div className='p-2'>
              <label htmlFor="email" className="sr-only">
                Member Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={adduser}
                onChange={(e) => SetAddUser(e.target.value)}
                required
                className="appearance-none rounded-md relative block w-full  px-3 py-2 border text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Enter member email"
              />
            </div>
          </div>

          <div className='p-2'>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border  border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Add Member
            </button>
          </div>
        </form>
      </div>
    </div>
    {/* /////////////////////////// */}
    <div className='bg-gray-400'>
    <div className="p-8 overflow-x-auto">
  <table className="min-w-full divide-y divide-gray-200">
    <thead className="bg-gray-50">
      <tr>
        <th scope="col" className="px-4 py-3 text-left text-md font-bold font text-black uppercase tracking-wider">
          Name
        </th>
        <th scope="col" className="px-4 py-3 text-left text-md font-bold font text-black uppercase tracking-wider">
          Email
        </th>
        <th scope="col" className="px-4 py-3 text-left text-md font-bold font text-black uppercase tracking-wider">
          Role
        </th>
        <th scope="col" className="px-4 py-3 text-left text-md font-bold font text-black uppercase tracking-wider">
          Action
        </th>
      </tr>
    </thead>
    <tbody className="bg-white divide-y divide-gray-200">
      <tr>
        <td className="px-4 py-2 whitespace-nowrap">
          <div className="flex items-center">
            <div className="ml-2">
              <div className="text-md  font-mono text-black">
                John Doe
              </div>
            </div>
          </div>
        </td>
        <td className="px-4 py-2 whitespace-nowrap">
          <div className="text-md text-black">ohndoe@example.com</div>
        </td>
        <td className="px-4 py-2 whitespace-nowrap">
          <div className="text-md text-black">Member</div>
        </td>
        <td className="px-4 py-2 whitespace-nowrap">
          <button className="text-indigo-600 hover:text-indigo-900">
            Edit
          </button>
          <button className="text-red-600 hover:text-red-900 ml-2">
            Delete
          </button>
        </td>
      </tr>
      {/* Add more rows here as needed */}
    </tbody>
  </table>
</div>
</div>

    <ToastContainer/>
    </div>
  )
}

export default Members
