





















import React, { useContext } from "react";
import { userDataContext } from "../context/UserContext.jsx";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Home = () => {
  const { userData , serverUrl , setUserData } = useContext(userDataContext);
  const navigate = useNavigate()

  const handleLogOut = async () => {
    try {
      let result = await axios.get(`${serverUrl}/api/auth/logout`,{withCredentials:true})
      setUserData(null)
      navigate("/signup")
    } catch (error) {
      console.log(error)
      setUserData(null)
    }
  }


  return (
    <div
      className="w-full min-h-screen 
      bg-linear-to-br from-black via-[#06063a] to-[#0a0a69]
      flex flex-col items-center px-4 py-8"
    >
      {/* Top Action Bar */}
      <div className="w-full max-w-6xl flex justify-between items-center mb-10">
        <h1 className="text-xl sm:text-2xl font-semibold text-white tracking-wide ">
          Dashboard
        </h1>

        <div className="flex gap-3">
          <button
            className="px-5 py-2 rounded-full
            bg-blue-500/90 hover:bg-blue-600
            text-white text-sm font-semibold
            transition-all duration-300 active:scale-95 cursor-pointer"
            onClick={()=>navigate("/customize")}
            >
            Customize
          </button>

          <button
            className="px-5 py-2 rounded-full
            bg-red-500/90 hover:bg-red-600
            text-white text-sm font-semibold
            transition-all duration-300 active:scale-95 cursor-pointer"
            onClick={handleLogOut}
          >
            Log Out
          </button>
        </div>
      </div>

      {/* Assistant Showcase */}
      <div
        className="w-full max-w-sm sm:max-w-md md:max-w-lg
        bg-white/10 backdrop-blur-xl
        border border-white/20
        rounded-3xl shadow-2xl
        flex flex-col items-center
        p-6 gap-6"
      >
        {/* Image */}
        <div className="w-full h-72 sm:h-80 rounded-2xl overflow-hidden relative">
          <img
            src={userData?.assistantImage}
            alt="Assistant"
            className="w-full h-full object-cover"
          />

          {/* Glow overlay */}
          <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent" />
        </div>

        {/* Name */}
        <h2 className="text-xl sm:text-2xl font-semibold text-white">
          I’m{" "}
          <span className="text-blue-400 tracking-wide">
            {userData?.assistantName}
          </span>
        </h2>

        {/* Sub text */}
        <p className="text-sm text-gray-300 text-center max-w-xs">
          Your personalized virtual assistant is ready to help you anytime.
        </p>

        {/* Action */}
        <button
          className="mt-2 w-full py-3 rounded-xl
          bg-blue-500 hover:bg-blue-600
          text-white font-semibold
          shadow-lg shadow-blue-500/40
          transition-all duration-300 active:scale-95"
        >
          Start Conversation
        </button>
      </div>
    </div>
  );
};

export default Home;



