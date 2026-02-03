import React from 'react'
import Sidebar from '../components/Sidebar.jsx'
import ChatArea from '../components/ChatArea.jsx'
import { useSelector } from 'react-redux'
import getMessages from '../customHooks/getMessage.jsx'

const Home = () => {
  let {selectedUser} = useSelector(state=>state.user)
  getMessages()
  return (
    <div className='flex w-full h-screen'>
      <Sidebar />
      <ChatArea />
    </div>
  )
}

export default Home
