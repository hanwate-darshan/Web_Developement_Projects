import React, { useContext, useState } from "react";
import { userDataContext } from "../context/UserContext.jsx";

const Customized1 = () => {
  const {userData} = useContext(userDataContext)
  const [AssistantName, setAssistantName] = useState(userData?.AssistantName || " ")
  return (
    <div
      className="w-full min-h-screen overflow-auto 
      flex flex-col items-center justify-center
      bg-linear-to-t from-black to-[#0a0a69]
      px-4 py-10"
    >
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
      value={AssistantName}
        type="text"
        placeholder="eg. Gemini"
        className="w-full max-w-md px-6 py-4 rounded-xl
        bg-[#090945] border-2 border-blue-700
        text-white placeholder-gray-400
        outline-none focus:border-blue-400
        focus:ring-2 focus:ring-blue-500
        transition-all duration-300"
      />
 

       {AssistantName && 
      <button
        className="mt-12 px-8 py-3 rounded-full 
        bg-blue-500 hover:bg-blue-600 
        text-white font-semibold text-lg
        shadow-lg shadow-blue-500/40
        transition-all duration-300 
        active:scale-95 cursor-pointer"
      >
        Finally Create Your Assistant
      </button>}



      
    </div>
  );
};

export default Customized1;














