import React from 'react'
import Sidebar from './chatpages/Sidebar'
import Chat from './chatpages/Chat'

const ContactUser = () => {
  return (
    <div className='ContactUser'>
      <div className="container">
        <Sidebar/>
        <Chat/>
      </div>
    </div>
  )
}

export default ContactUser