import React from 'react'
import HomeNav from '../../components/User/UserHome/HomeNav'
import Home from '../../components/User/UserHome/Home'


function UserHomePage() {
  return (
    <div>
      {/* <HomeNav filteredClubs={filteredClubs}/> */}
      <HomeNav/>
      <Home/>
      </div>
  )
}

export default UserHomePage
