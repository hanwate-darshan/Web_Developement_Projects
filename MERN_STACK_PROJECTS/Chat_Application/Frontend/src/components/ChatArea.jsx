
import React, { useRef, useState } from "react";
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
import { setMessages } from "../redux/messageSlice.js";

const ChatArea = () => {
  const { selectedUser , userData } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [showPicker, setshowPicker] = useState(false);
  const [input, setInput] = useState("");



  let [frontendImage,setFrontendImage] = useState("")
  let [backendImage,setBackendImage] = useState("")

  let {messages } = useSelector(state=>state.message)

  let image = useRef()
  


  const handleSendMessage = async (e) => {
    e.preventDefault()
    try {
      let formData = new FormData();
      formData.append("message",input)
      
      if(backendImage){
        formData.append("image",backendImage)
      }

      let result = await axios.post(`${serverURL}/api/message/send/${selectedUser._id}`,formData,{withCredentials:true})


      dispatch(setMessages([...messages,result.data]))

      setInput("")
      setFrontendImage(null)
      setBackendImage(null)
    } catch (error) {
      console.log(error)
    }
  }
  
  
  
  const handleImage = async (e) =>{
        let file = e.target.files[0];
        setBackendImage(file)
        setFrontendImage(URL.createObjectURL(file))
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

              {messages?.map((mess) =>
    mess.sender === userData?._id ? (
      <SenderMessage
        key={mess._id}
        image={mess.image}
        message={mess.message}
      />
    ) : (
      <ReceiverMessage
        key={mess._id}
        image={mess.image}
        message={mess.message}
      />
    )
  )}



            {/* <SenderMessage />
            <ReceiverMessage /> */}
          </div>

          {/* Input Bar */}
          <div className="w-full h-30 bg-white border-t border-gray-200 flex items-center px-4">
            <form
              className="w-full flex items-center gap-3 bg-gray-100 rounded-full px-4 py-2"
              onSubmit={handleSendMessage}
            >
            <img src={frontendImage} className="w-20 absolute bottom-35 right-[10%] rounded-lg shadow-xl shadow-gray-500" />
              <MdEmojiEmotions
                className="text-gray-500 text-xl cursor-pointer hover:text-gray-700"
                onClick={() => setshowPicker((prev) => !prev)}
              />

              <input type="file" accept="image/*"  ref={image} hidden onChange={handleImage} />

              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type a message"
                className="flex-1 bg-transparent outline-none text-sm text-gray-700"
              />

              <FaImage className="text-gray-500 text-lg cursor-pointer hover:text-gray-700" onClick={()=>image.current.click()} />

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
