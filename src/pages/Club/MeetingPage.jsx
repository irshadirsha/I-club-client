import React from 'react'
import ClubNav from '../../components/User/Club/ClubNav'
import Meeting from '../../components/User/Club/Meeting'

function MeetingPage() {
  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      <ClubNav/>
      <Meeting/>
    </div>
  )
}

export default MeetingPage
