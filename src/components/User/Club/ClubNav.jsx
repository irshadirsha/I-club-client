import React, { useEffect, useState } from 'react';
// import { useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { logoutUser, updateUser } from '../../../redux/UserSlice/UserSlice';
import { useDispatch, useSelector } from 'react-redux';
import { axiosInstance } from '../../../../Api/config';

function ClubNav() {
   
    const dispatch=useDispatch()
    const navigate = useNavigate();
    const users=useSelector(state=>state.user)
    const clubName=users.clubName
    const [showNavbar, setShowNavbar] = useState(false);
    const [isDropdownOpen, setDropdownOpen] = useState(false);
    const [clubdropdown, setClubDropDown] = useState(false);
    const [reqcount,setReqCount]=useState('')
    // const {username}=useSelector((state)=>state.user)
    useEffect(()=>{
        fetchreqcount()
    },[])
    const toggleDropdown = () => {
        setDropdownOpen(!isDropdownOpen);
    };

    const toggleClubDropdown = () => {
        setClubDropDown(!clubdropdown);
    };

    const handleToggleNavbar = () => {
        setShowNavbar(!showNavbar);
    };

    const handleLogout = (e) => {
        localStorage.removeItem('user');
        console.log('User logged out');
        dispatch(logoutUser())
        navigate('/login');
    };
    const naveToHome=()=>{
        dispatch(updateUser({
            id:users.id,
            username:users.username,
            email:users.email,
            clubName:"",
          }));
       navigate('/')
    }
    const fetchreqcount=async()=>{
        const count=await axiosInstance.get('/fetch-reqcount',{
            params:{clubName}
        })
        setReqCount(count.data.newMemberCount)
    }



    const user = JSON.parse(localStorage.getItem('user'))?.user || null;
    const Name = user?.email;

    return (
        <div>   
            <nav className=" ">
                <div className=" bg-white max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                    <a className="flex items-center">
                        <span
                        onClick={naveToHome}                         
                        className="self-center text-2xl font-mono font-bold whitespace-nowrap pl-16 text-yellow-600">I-club</span>
                    </a>
                    <button
                        data-collapse-toggle="navbar-dropdown"
                        type="button"
                        className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 "
                        aria-controls="navbar-dropdown"
                        aria-expanded="false"
                        onClick={handleToggleNavbar}
                    >
                        <span className="sr-only">Open main menu</span>
                        <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
                        </svg>
                    </button>
                    <div className={`${showNavbar ? 'block' : 'hidden'}  w-full md:block md:w-auto`} id="navbar-dropdown">
                        <ul className="z-10 flex flex-col font-medium p-4 md:p-0 md:mr-24 mt-4 border bg-white     md:flex-row md:space-x-12 md:mt-0 md:border-0 md:bg-white">
                            <li>
                                <a onClick={(e)=>navigate('/clubhome')} className="block py-3 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-2.5 md:dark:text-blue-500 dark:bg-blue-600 md:dark:bg-transparent" aria-current="page" exact>
                                    Home
                                </a>
                            </li>
                            <li>

                                <a onClick={(e)=>navigate('/finance')} className="block py-3 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-2.5 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">
                                    Finance</a>
                            </li>
                            <li>
                                   
                                <div className='w-7 bg-gray-200   rounded-full'  onClick={(e)=>navigate('/notification')}>       
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-10">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0M3.124 7.5A8.969 8.969 0 015.292 3m13.416 0a8.969 8.969 0 012.168 4.5" />
                                </svg>
                            </div>
                                
                            </li>
                            <li>
                                <div className=" relative md:absolute">
                                    <button
                                        id="dropdownDefaultButton"
                                        data-dropdown-toggle="dropdown"
                                        className=" text-blue-600 font-medium pl-3 text-sm md:px-2 md:py-3 text-center inline-flex items-center"
                                        type="button"
                                        onClick={toggleClubDropdown}
                                    >

                                        Clubs
                                        
                                        <svg
                                            className={`w-2.5 h-2.5 ml-2.5 transition-transform ${clubdropdown ? 'rotate-180' : 'rotate-0'}`}
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
                                    {clubdropdown && (
                                        <div
                                            id="dropdownClub"
                                            className="z-10  bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 absolute   mt-2"
                                        >
                                            <ul className="py-2 px-4 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
                                                <li>
                                                    <NavLink to='/club-profile' className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"exact>
                                                        Club Profile
                                                    </NavLink>
                                                </li>
                                                <li>
                                                    <NavLink to='/members' className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"exact>
                                                        {/* Members  <span className='text-md font-mono'>{reqcount}</span> */}
                                                        members
                                                        {reqcount > 0 && (
                                                       <span className="bg-primary text-white px-2 py-1 ml-1 rounded-full text-xs">
                                                       {reqcount}
                                                        </span>
                                                        )}
                                                    </NavLink>
                                                </li>
                                                <li>
                                                    <NavLink to='/meeting'
                                                     className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"exact>
                                                        Meeting
                                                    </NavLink>
                                                </li>
                                                <li>
                                                    <NavLink to='/news'
                                                     className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"exact>
                                                        World News
                                                    </NavLink>
                                                </li>
                                            </ul>
                                        </div>
                                    )}
                                </div>
                            </li>
                            <li>
                                {user ? (
                                    <div className="md:relative md:ml-12">
                                        <button
                                            id="dropdownDefaultButton"
                                            data-dropdown-toggle="dropdown"
                                            className="text-blue-600 font-medium py-3 pl-3 text-sm md:px-2 md:py-3 text-center inline-flex items-center"
                                            type="button"
                                            onClick={toggleDropdown}
                                        >

                                            {/* {username} */}
                                            {users.username}

                                            <svg
                                                className={`w-2.5 h-2.5 ml-2.5 transition-transform ${isDropdownOpen ? 'rotate-180' : 'rotate-0'}`}
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
                                                className="z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 absolute  mt-2 "
                                            >
                                                <ul className="py-2 px-4 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
                                                    <li>
                                                        <a onClick={() => navigate('/user-profile')} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
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
                                ) : (
                                    <>
                                        <li>
                                            <NavLink to="/login" className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent" exact>
                                                Login
                                            </NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/signup" className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent" exact>
                                                Sign In
                                            </NavLink>
                                        </li>
                                    </>
                                )}
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    );
}

export default ClubNav;















// import React, { useEffect, useState } from 'react';
// // import { useSelector } from 'react-redux';
// import { NavLink, useNavigate } from 'react-router-dom';
// import { logoutUser, updateUser } from '../../../redux/UserSlice/UserSlice';
// import { useDispatch, useSelector } from 'react-redux';
// import { axiosInstance } from '../../../../Api/config';

// function ClubNav() {
   
//     const dispatch=useDispatch()
//     const navigate = useNavigate();
//     const users=useSelector(state=>state.user)
//     const clubName=users.clubName
//     const [showNavbar, setShowNavbar] = useState(false);
//     const [isDropdownOpen, setDropdownOpen] = useState(false);
//     const [clubdropdown, setClubDropDown] = useState(false);
//     const [reqcount,setReqCount]=useState('')
//     // const {username}=useSelector((state)=>state.user)
//     useEffect(()=>{
//         fetchreqcount()
//     },[])
//     const toggleDropdown = () => {
//         setDropdownOpen(!isDropdownOpen);
//     };

//     const toggleClubDropdown = () => {
//         setClubDropDown(!clubdropdown);
//     };

//     const handleToggleNavbar = () => {
//         setShowNavbar(!showNavbar);
//     };

//     const handleLogout = (e) => {
//         localStorage.removeItem('user');
//         console.log('User logged out');
//         dispatch(logoutUser())
//         navigate('/login');
//     };
//     const naveToHome=()=>{
//         dispatch(updateUser({
//             id:users.id,
//             username:users.username,
//             email:users.email,
//             clubName:"",
//           }));
//        navigate('/')
//     }
//     const fetchreqcount=async()=>{
//         const count=await axiosInstance.get('/fetch-reqcount',{
//             params:{clubName}
//         })
//         setReqCount(count.data.newMemberCount)
//     }



//     const user = JSON.parse(localStorage.getItem('user'))?.user || null;
//     const Name = user?.email;

//     return (
//         <div>   
//             <nav className="border-gray-200 ">
//                 <div className=" max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
//                     <a className="flex items-center">
//                         <span
//                         onClick={naveToHome}                         
//                         className="self-center text-2xl font-mono font-bold whitespace-nowrap pl-16 text-yellow-600">I-club</span>
//                     </a>
//                     <button
//                         data-collapse-toggle="navbar-dropdown"
//                         type="button"
//                         className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
//                         aria-controls="navbar-dropdown"
//                         aria-expanded="false"
//                         onClick={handleToggleNavbar}
//                     >
//                         <span className="sr-only">Open main menu</span>
//                         <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
//                             <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
//                         </svg>
//                     </button>
//                     <div className={`${showNavbar ? 'block' : 'hidden'}  w-full md:block md:w-auto`} id="navbar-dropdown">
//                         <ul className="z-10 flex flex-col font-medium p-4 md:p-0 md:mr-24 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-12 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900  dark:border-gray-700">
//                             <li>
//                                 <a onClick={(e)=>navigate('/clubhome')} className="block py-3 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-2.5 md:dark:text-blue-500 dark:bg-blue-600 md:dark:bg-transparent" aria-current="page" exact>
//                                     Home
//                                 </a>
//                             </li>
//                             <li>

//                                 <a onClick={(e)=>navigate('/finance')} className="block py-3 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-2.5 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">
//                                     Finance</a>
//                             </li>
//                             <li>
                                   
//                                 <div className='w-7 bg-gray-200   rounded-full'  onClick={(e)=>navigate('/notification')}>       
//                                 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-10">
//                                     <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0M3.124 7.5A8.969 8.969 0 015.292 3m13.416 0a8.969 8.969 0 012.168 4.5" />
//                                 </svg>
//                             </div>
                                
//                             </li>
//                             <li>
//                                 <div className=" relative md:absolute">
//                                     <button
//                                         id="dropdownDefaultButton"
//                                         data-dropdown-toggle="dropdown"
//                                         className=" text-blue-600 font-medium pl-3 text-sm md:px-2 md:py-3 text-center inline-flex items-center"
//                                         type="button"
//                                         onClick={toggleClubDropdown}
//                                     >

//                                         Clubs
                                        
//                                         <svg
//                                             className={`w-2.5 h-2.5 ml-2.5 transition-transform ${clubdropdown ? 'rotate-180' : 'rotate-0'}`}
//                                             aria-hidden="true"
//                                             xmlns="http://www.w3.org/2000/svg"
//                                             fill="none"
//                                             viewBox="0 0 10 6"
//                                         >
//                                             <path
//                                                 stroke="currentColor"
//                                                 strokeLinecap="round"
//                                                 strokeLinejoin="round"
//                                                 strokeWidth="2"
//                                                 d="m1 1 4 4 4-4"
//                                             />
//                                         </svg>
//                                     </button>
//                                     {clubdropdown && (
//                                         <div
//                                             id="dropdownClub"
//                                             className="z-10  bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 absolute   mt-2"
//                                         >
//                                             <ul className="py-2 px-4 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
//                                                 <li>
//                                                     <NavLink to='/club-profile' className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"exact>
//                                                         Club Profile
//                                                     </NavLink>
//                                                 </li>
//                                                 <li>
//                                                     <NavLink to='/members' className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"exact>
//                                                         {/* Members  <span className='text-md font-mono'>{reqcount}</span> */}
//                                                         members
//                                                         {reqcount > 0 && (
//                                                        <span className="bg-primary text-white px-2 py-1 ml-1 rounded-full text-xs">
//                                                        {reqcount}
//                                                         </span>
//                                                         )}
//                                                     </NavLink>
//                                                 </li>
//                                                 <li>
//                                                     <NavLink to='/meeting'
//                                                      className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"exact>
//                                                         Meeting
//                                                     </NavLink>
//                                                 </li>
//                                                 <li>
//                                                     <NavLink to='/news'
//                                                      className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"exact>
//                                                         World News
//                                                     </NavLink>
//                                                 </li>
//                                             </ul>
//                                         </div>
//                                     )}
//                                 </div>
//                             </li>
//                             <li>
//                                 {user ? (
//                                     <div className="md:relative md:ml-12">
//                                         <button
//                                             id="dropdownDefaultButton"
//                                             data-dropdown-toggle="dropdown"
//                                             className="text-blue-600 font-medium py-3 pl-3 text-sm md:px-2 md:py-3 text-center inline-flex items-center"
//                                             type="button"
//                                             onClick={toggleDropdown}
//                                         >

//                                             {/* {username} */}
//                                             {users.username}

//                                             <svg
//                                                 className={`w-2.5 h-2.5 ml-2.5 transition-transform ${isDropdownOpen ? 'rotate-180' : 'rotate-0'}`}
//                                                 aria-hidden="true"
//                                                 xmlns="http://www.w3.org/2000/svg"
//                                                 fill="none"
//                                                 viewBox="0 0 10 6"
//                                             >
//                                                 <path
//                                                     stroke="currentColor"
//                                                     strokeLinecap="round"
//                                                     strokeLinejoin="round"
//                                                     strokeWidth="2"
//                                                     d="m1 1 4 4 4-4"
//                                                 />
//                                             </svg>
//                                         </button>
//                                         {isDropdownOpen && (
//                                             <div
//                                                 id="dropdown"
//                                                 className="z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 absolute  mt-2 "
//                                             >
//                                                 <ul className="py-2 px-4 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
//                                                     <li>
//                                                         <a onClick={() => navigate('/user-profile')} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
//                                                             Profile
//                                                         </a>
//                                                     </li>
//                                                     <li>
//                                                         <a onClick={handleLogout} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
//                                                             Logout
//                                                         </a>
//                                                     </li>
//                                                 </ul>
//                                             </div>
//                                         )}
//                                     </div>
//                                 ) : (
//                                     <>
//                                         <li>
//                                             <NavLink to="/login" className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent" exact>
//                                                 Login
//                                             </NavLink>
//                                         </li>
//                                         <li>
//                                             <NavLink to="/signup" className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent" exact>
//                                                 Sign In
//                                             </NavLink>
//                                         </li>
//                                     </>
//                                 )}
//                             </li>
//                         </ul>
//                     </div>
//                 </div>
//             </nav>
//         </div>
//     );
// }

// export default ClubNav;

