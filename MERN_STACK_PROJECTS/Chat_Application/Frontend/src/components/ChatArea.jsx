import React from 'react'
import { FaArrowAltCircleLeft } from "react-icons/fa";
import { FaArrowLeft } from "react-icons/fa";
import dp from "../assets/dp.png";
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedUser } from '../redux/userSlice';
import { MdEmojiEmotions } from "react-icons/md";
import { FaImage } from "react-icons/fa";
import { IoSend } from "react-icons/io5";

const ChatArea = () => {
  let {selectedUser} = useSelector(state=>state.user)
  let dispatch = useDispatch()
  return (
    <div className={`lg:w-[70%] w-full h-screen bg-blue-400 border-l-2 border-gray-200 ${selectedUser?"flex":"hidden"} lg:flex relative`}>
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


        {selectedUser && 
         <div className='w-full lg:w-[70%] h-15 fixed bottom-10 bg-amber-400 flex items-center justify-center'>

        <form className='w-[95%] lg:w-[80%] h-10 bg-blue-300 rounded-full flex items-center gap-4 px-4' >
             <div>

             <MdEmojiEmotions  className=' text-white  cursor-pointer' />
             </div>
             <input type="text" className='w-full h-full px-2' />
                

                <div>
                  <FaImage  className=' text-white text-15 cursor-pointer'/>
                </div>

                <div>
                  <IoSend  className=' text-white text-15 cursor-pointer'/>
                </div>
        </form>
         </div>}


      
      {!selectedUser && <div className='w-full h-full flex flex-col justify-center items-center'>
        <h1>Welcome to NapChat</h1>
        <span>Chat Friendly..</span>
        </div>}


      
    </div>
  )
}

export default ChatArea
