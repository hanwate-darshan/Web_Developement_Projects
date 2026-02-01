// import React, { useState } from 'react'
// import { FaArrowAltCircleLeft } from "react-icons/fa";
// import { FaArrowLeft } from "react-icons/fa";
// import dp from "../assets/dp.png";
// import { useDispatch, useSelector } from 'react-redux';
// import { setSelectedUser } from '../redux/userSlice.js';
// import { MdEmojiEmotions } from "react-icons/md";
// import { FaImage } from "react-icons/fa";
// import { IoSend } from "react-icons/io5";
// import EmojiPicker from 'emoji-picker-react';
// import SenderMessage from './senderMessage';
// import ReceiverMessage from './receiverMessage';

// const ChatArea = () => {
//   let { selectedUser } = useSelector(state => state.user)

//   let dispatch = useDispatch()
//   const [showPicker, setshowPicker] = useState(false)

//   let [input, setInput] = useState("")

//   const onEmojiClick = async (emojiData) => {
//     setInput(prevInput => prevInput + emojiData.emoji)
//     setshowPicker(false)
//   }


//   return (
//     <div className={`lg:w-[70%] w-full h-screen bg-blue-400 border-l-2 border-gray-200 ${selectedUser ? "flex" : "hidden"} lg:flex relative`}>
//       {selectedUser &&
//         <div className='w-full h-screen flex flex-col relative'>

//           <div className='w-full h-20 bg-amber-400 shadow-lg shadow-gray-500 rounded-b-2 flex   items-center gap-5'>
//             <div className=" gap-5 " onClick={() => dispatch(setSelectedUser(null))} >
//               <FaArrowLeft className="w-8 h-8 text-black  cursor-pointer" />
//             </div>
//             <div>
//               <div className="w-10 h-10 rounded-full overflow-hidden border">
//                 <img
//                   src={selectedUser?.image || dp}
//                   alt="profile"
//                   className="w-full h-full object-cover"
//                 />
//               </div>
//             </div>
//             <h1 className='font-semibold text-black '>{selectedUser?.name || "user"}</h1>
//           </div>

//           <div className='w-full h-150 bg-slate-400 flex flex-col pt-3 overflow-auto'>
             
//             {showPicker && <div className='absolute bottom-40 left-20 '><EmojiPicker width={250} height={350} onEmojiClick={onEmojiClick} /></div>}

            
//             <SenderMessage />
//             <ReceiverMessage />


//           </div>
//         </div>
//       }


//       {selectedUser &&


//         <div className='w-full lg:w-[70%] h-15 fixed bottom-10 bg-amber-400 flex items-center justify-center'>

//           <form className='w-[95%] lg:w-[80%] h-10 bg-blue-300 rounded-full flex items-center gap-4 px-4' onSubmit={(e) => e.preventDefault()} >

//             <div onClick={() => setshowPicker(prev => !prev)}>
//               <MdEmojiEmotions className=' text-white  cursor-pointer' />
//             </div>

//             <input type="text" className='w-full h-full px-2' onChange={(e) => e.target.value} value={input} />


//             <div>
//               <FaImage className=' text-white text-15 cursor-pointer' />
//             </div>

//             <div>
//               <IoSend className=' text-white text-15 cursor-pointer' />
//             </div>
//           </form>
//         </div>

//       }



//       {!selectedUser && <div className='w-full h-full flex flex-col justify-center items-center'>
//         <h1>Welcome to NapChat</h1>
//         <span>Chat Friendly..</span>
//       </div>}



//     </div>
//   )
// }

// export default ChatArea

























import React, { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import dp from "../assets/dp.png";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedUser } from "../redux/userSlice.js";
import { MdEmojiEmotions } from "react-icons/md";
import { FaImage } from "react-icons/fa";
import { IoSend } from "react-icons/io5";
import EmojiPicker from "emoji-picker-react";
import SenderMessage from "./senderMessage";
import ReceiverMessage from "./receiverMessage";
import axios from "axios";
import { serverURL } from "../main.jsx";

const ChatArea = () => {
  const { selectedUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [showPicker, setshowPicker] = useState(false);
  const [input, setInput] = useState("");



  let [frontendImage,setFrontendImage] = useState("")
  let [backendImage,setBackendImage] = useState("")
  


  const handleSendMessage = async () => {
    try {
      let result = await axios.post(`${serverURL}/api/message/send/${s}`)
    } catch (error) {
      
    }
  }


 




  const onEmojiClick = async (emojiData) => {
    setInput((prev) => prev + emojiData.emoji);
    setshowPicker(false);
  };

  return (
    <div
      className={`lg:w-[70%] w-full h-screen bg-slate-100 border-l border-gray-200
      ${selectedUser ? "flex" : "hidden"} lg:flex relative`}
    >
      {/* ================= CHAT VIEW ================= */}
      {selectedUser && (
        <div className="w-full h-full flex flex-col">

          {/* Header */}
          <div className="w-full h-16 bg-white shadow-sm flex items-center gap-4 px-5 border-b border-gray-200">
            <FaArrowLeft
              className="w-6 h-6 text-gray-700 cursor-pointer "
              onClick={() => dispatch(setSelectedUser(null))}
            />

            <div className="w-10 h-10 rounded-full overflow-hidden border">
              <img
                src={selectedUser?.image || dp}
                alt="profile"
                className="w-full h-full object-cover"
              />
            </div>

            <h1 className="font-semibold text-gray-800">
              {selectedUser?.name || "User"}
            </h1>
          </div>

          {/* Messages Area */}
          <div className="flex-1 px-4 py-3 overflow-y-auto space-y-3 relative bg-slate-100">
            {showPicker && (
              <div className="absolute bottom-20 left-4 z-20">
                <EmojiPicker
                  width={280}
                  height={360}
                  onEmojiClick={onEmojiClick}
                />
              </div>
            )}

            <SenderMessage />
            <ReceiverMessage />
          </div>

          {/* Input Bar */}
          <div className="w-full h-16 bg-white border-t border-gray-200 flex items-center px-4">
            <form
              className="w-full flex items-center gap-3 bg-gray-100 rounded-full px-4 py-2"
              onSubmit={(e) => e.preventDefault()}
            >
              <MdEmojiEmotions
                className="text-gray-500 text-xl cursor-pointer hover:text-gray-700"
                onClick={() => setshowPicker((prev) => !prev)}
              />

              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type a message"
                className="flex-1 bg-transparent outline-none text-sm text-gray-700"
              />

              <FaImage className="text-gray-500 text-lg cursor-pointer hover:text-gray-700" />

              <IoSend className="text-blue-500 text-lg cursor-pointer hover:text-blue-600" />
            </form>
          </div>
        </div>
      )}

      {/* ================= EMPTY STATE ================= */}
      {!selectedUser && (
        <div className="w-full h-full flex flex-col justify-center items-center text-center px-4">
          <h1 className="text-4xl font-bold text-black mb-3">
            Welcome to <span className="text-red-500">Nap</span><span className="text-blue-800">Chat</span>
          </h1>
          <span className="text-sm text-gray-500">
            Start chatting with your friends 💬
          </span>
        </div>
      )}
    </div>
  );
};

export default ChatArea;
