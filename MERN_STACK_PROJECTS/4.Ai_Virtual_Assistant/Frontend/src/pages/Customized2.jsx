import React, { useContext, useState } from "react";
import { userDataContext } from "../context/UserContext.jsx";
import { IoArrowBackCircle } from "react-icons/io5";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Customized1 = () => {
  const {userData,backendImage,selectedImage,serverUrl,setUserData} = useContext(userDataContext)
  // const [AssistantName, setAssistantName] = useState(userData?.AssistantName || " ")
  const [assistantName, setAssistantName] = useState(userData?.assistantName)
  const [loading,setLoading] = useState(false)
  const navigate = useNavigate()

  const handleUpdateAssistant = async () => {
    setLoading(true)
    try {
      let formData = new FormData()
      formData.append("assistantName",assistantName)
      if(backendImage){
        formData.append("assistantImage",backendImage)
      }else{
        formData.append("imageUrl",selectedImage)
      }
      let result = await axios.post(`${serverUrl}/api/user/update`,formData,{withCredentials:true})
      console.log(result.data)
      setUserData(result.data)
      setLoading(false)
      navigate("/")
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  }
  return (



    <div
      className="w-full min-h-screen overflow-auto 
      flex flex-col items-center justify-center
      bg-linear-to-t from-black to-[#0a0a69]
      px-4 py-10 relative"
    >
      <IoArrowBackCircle onClick={()=>navigate("/customize")} className="absolute top-15 left-15 text-white  text-5xl  

        transition-all duration-300 
        hover:scale-95 cursor-pointer" />
      {/* Heading */}
      <h1
        className="text-2xl sm:text-3xl md:text-4xl 
        font-bold text-white text-center mb-10"
      >
        Enter Your{" "}
        <span className="text-blue-400 drop-shadow-lg">
          Assistant Name
        </span>
      </h1>

      {/* Input */}
      <input
      onChange={(e)=>setAssistantName(e.target.value)}
      value={assistantName}
        type="text"
        placeholder="eg. Gemini"
        className="w-full max-w-md px-6 py-4 rounded-xl
        bg-[#090945] border-2 border-blue-700
        text-white placeholder-gray-400
        outline-none focus:border-blue-400
        focus:ring-2 focus:ring-blue-500
        transition-all duration-300"
      />
 

       {assistantName && 
      <button
        className="mt-12 px-8 py-3 rounded-full 
        bg-blue-500 hover:bg-blue-600 
        text-white font-semibold text-lg
        shadow-lg shadow-blue-500/40
        transition-all duration-300 
        active:scale-95 cursor-pointer"
        disabled={loading}
        onClick={handleUpdateAssistant}
      >
        {!loading ? "Finally Create Your Assistant":"Loading..."}
      </button>}



      
    </div>
  );
};

export default Customized1;














