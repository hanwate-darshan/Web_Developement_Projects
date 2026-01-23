import React from 'react'
import Sidebar from '../components/Sidebar.jsx'
import ChatArea from '../components/ChatArea.jsx'

const Home = () => {
  return (
    <div className='flex w-full h-screen'>
      <Sidebar />
      <ChatArea />
    </div>
  )
}

export default Home
