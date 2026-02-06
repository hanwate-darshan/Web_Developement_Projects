
import React, { useContext } from "react";
import { userDataContext } from "../context/UserContext.jsx";

const Card = ({ image }) => {
    const { serverUrl , userData , setUserData , frontendImage, setFrontendImage , BackendImage, setBackendImage , selectedImage ,setSelectedImage} = useContext(userDataContext)
    
  return (
    <div
      className=
       {` w-35 h-55
        sm:w-37.5 sm:h-60
        md:w-40 md:h-62.5
        lg:w-42.5 lg:h-67.5

        bg-[#090945]
        border-2 border-blue-800
        rounded-2xl
        overflow-hidden
        cursor-pointer

        transition-all duration-300 ease-in-out
        hover:scale-105
        hover:shadow-2xl hover:shadow-blue-600/40
        hover:border-blue-400 ${selectedImage == image ? "border-8 border-white-800" :null}`}
      
      onClick={()=>{
        setSelectedImage(image)
        setBackendImage(null)
        setFrontendImage(null)
      }}
    >
      <img
        src={image}
        alt="assistant"
        className="
          w-full h-full object-cover
          transition-all duration-300 ease-in-out
          hover:brightness-110
        "
      />
    </div>
  );
};

export default Card;
