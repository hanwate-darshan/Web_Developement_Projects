import React from 'react'
import { FaArrowAltCircleLeft } from "react-icons/fa";
import { FaArrowLeft } from "react-icons/fa";
import dp from "../assets/dp.png";
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedUser } from '../redux/userSlice';

const ChatArea = () => {
  let {selectedUser} = useSelector(state=>state.user)
  let dispatch = useDispatch()
  return (
    <div className={`lg:w-[70%] w-full h-full bg-blue-400 border-l-2 border-gray-200 ${selectedUser?"flex":"hidden"} lg:flex`}>
      {selectedUser && <div className='w-full h-20 bg-amber-400 shadow-lg shadow-gray-500 rounded-b-2 flex items-center gap-5'>
        <div className=" gap-5 " onClick={()=>dispatch(setSelectedUser(null))} >
          <FaArrowLeft  className="w-8 h-8 text-black  cursor-pointer" />
        </div>
        <div>
          <div className="w-10 h-10 rounded-full overflow-hidden border">
                        <img
                          src={selectedUser?.image || dp}
                          alt="profile"
                          className="w-full h-full object-cover"
                        />
          </div>
        </div>
        <h1 className='font-semibold text-black '>{selectedUser?.name || "user" }</h1>
      </div> }


      {!selectedUser && <div className='w-full h-full flex flex-col justify-center items-center'>
        <h1>Welcome to NapChat</h1>
        <span>Chat Friendly..</span>
        </div>}
      
    </div>
  )
}

export default ChatArea
