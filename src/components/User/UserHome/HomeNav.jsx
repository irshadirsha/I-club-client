import React, { useState,useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate,NavLink } from 'react-router-dom'
import { logoutUser } from '../../../redux/UserSlice/UserSlice';
import { axiosInstance } from '../../../../Api/config';

const HomeNav = () => {
  const dispatch=useDispatch()
  const navigate=useNavigate()
  const [showNavbar, setShowNavbar] = useState(false);
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const {username}=useSelector((state)=>state.user)

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const handleToggleNavbar = () => {
    setShowNavbar(!showNavbar);
  };

  const handleLogout=(e)=>{
     localStorage.removeItem('user')
     console.log("user logout");
     dispatch(logoutUser())
       navigate('/login')

  }
 
    const user = JSON.parse(localStorage.getItem("user"))?.user || null;
    const Name = user?.email 
   
   
  return (
    // dark:bg-gray-900 dark:borde
    <nav className="  border-gray-200 ">
      <div className=" max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <a className="flex items-center">
          <span className="self-center text-2xl font-mono font-bold whitespace-nowrap pl-16 text-yellow-600 ">I-club</span>
        </a>
        <button
          data-collapse-toggle="navbar-dropdown"
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          aria-controls="navbar-dropdown"
          aria-expanded="false"
          onClick={handleToggleNavbar}
        >
          <span className="sr-only">Open main menu</span>
          <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
          </svg>
        </button>
        <div className={`${showNavbar ? 'block' : 'hidden'} w-full md:block md:w-auto`} id="navbar-dropdown">
          <ul className="z-10 flex flex-col font-medium p-4 md:pr-16 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900  dark:border-gray-700">
            {/* <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700"> */}

              <li>
                <NavLink to='/' className="block py-2  pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500 dark:bg-blue-600 md:dark:bg-transparent" aria-current="page" exact>
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink to='/about' className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"exact>
                  About
                  </NavLink>
              </li>
              {user ? (<li>
                <div className="relative ">
      <button
        id="dropdownDefaultButton"
        data-dropdown-toggle="dropdown"
        className="text-black    font-medium  text-sm px-2 py-1 text-center inline-flex items-center"
        type="button"
        onClick={toggleDropdown}
      >
      {username}
       
        <svg
          className={`w-2.5 h-2.5 ml-2.5 transition-transform ${
            isDropdownOpen ? 'rotate-180' : 'rotate-0'
          }`}
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 10 6"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m1 1 4 4 4-4"
          />
        </svg>
      </button>
  
      {isDropdownOpen && (
        <div
          id="dropdown"
          className="z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700"
        >
          <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
          <li>
              <a onClick={()=>navigate('/user-profile')}  className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
               Profile
              </a>
            </li>
            <li>
              <a onClick={handleLogout} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
              Logout
              </a>
            </li>
          </ul>
        </div>
      )}
    </div>
              </li>):(
                <>
              <li>
                <NavLink to='/login' className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent" exact>
                  Login
                </NavLink>
              </li>
              <li>

                <NavLink to='/signup' className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent" exact>
                  SignIn
                </NavLink>
              </li>
              
              </>
              )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default HomeNav;










// import React from 'react'

// function HomeNav() {

//   return (
//     <div>

//       <nav className="bg-white border-gray-200 dark:bg-gray-900 dark:border-gray-700">
//       <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
//         <a href="#" className="flex items-center">
//           <span className="self-center text-2xl font-semibold whitespace-nowrap pl-6 dark:text-white">I-club</span>
//         </a>
//         <button
//           data-collapse-toggle="navbar-dropdown"
//           type="button"
//           className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
//           aria-controls="navbar-dropdown"
//           aria-expanded="false"
//         >
//           <span className="sr-only">Open main menu</span>
//           <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
//             <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
//           </svg>
//         </button>
//         <div className=" hidden w-full md:block  md:w-auto" id="navbar-dropdown">
//           <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
//             <li>
//               <a href="#" className="block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500 dark:bg-blue-600 md:dark:bg-transparent" aria-current="page">Home</a>
//             </li>
//             <li>
//               <a href="#" className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">About</a>
//             </li>
//             <li>
//               <div className="nav-link fw-medium" aria-current="page">
//                 <input
//                   className="form-control mr-sm-2 rounded-lg p-1 text-sm border-current border outline-slate-300 hover:text-white transition ease-out duration-500"
//                   type="text"
//                   placeholder="Search For Clubs..."
//                   aria-label="Search"
//                 />
//               </div>
//             </li>
//             <li>
//               <a href="#" className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-red-800 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Login</a>
//             </li>
//             <li>
//               <a href="#" className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-red-800 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">SignIn</a>
//             </li>
//           </ul>
//         </div>
//       </div>
//     </nav>

{/* <div className='body bg-slate-400 h-16 w-full grid grid-cols-3'>
       <div className=' bg-red-400 py-4 pl-12'>
        <h1 className='text-black-300 font-mono text-2xl'>I-club</h1> 
       </div>
       <div className='flex justify-end cursor-pointer  md:hidden ' >
          <svg className='w-6 flex justify-between ' xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
</svg>
  </div>
       <div className='bg-red-200 h-16 col-span-2 pl-36 hidden md:block  '>
      
        <ul className=' flex justify-evenly  space-x-1 font-extralight pt-4 '>
       
         
            <li>Home</li>
            <li>AboutUs</li>
            <li>
            <div className="nav-link fw-medium" aria-current="page">
        <input
          className="form-control mr-sm-2 rounded-lg p-1 text-sm  border-current border outline-slate-300 hover:text-white transition ease-out duration-500 "
          type="text"
          placeholder="Search For Clubs..."
          aria-label="Search"
        />
      </div>
            </li>
            <li>Login</li>
            <li>SignIn</li>
            
        </ul>
      
       </div>
       
      </div> */}

//     </div>
//   )
// }

// export default HomeNav


