import React, { useContext } from "react";
import logo from "../assets/pngwing.com.png";
import dp from "../assets/empty-dp.webp";
import { IoSearch } from "react-icons/io5";
import { IoHomeSharp } from "react-icons/io5";
import { IoPeopleSharp } from "react-icons/io5";
import { IoMdNotifications } from "react-icons/io";
import { userDataContext } from "../context/UserContext.jsx";
import { authDataContext } from "../context/AuthContext.jsx";
import axios from "axios";
import {  useNavigate } from "react-router-dom";

const Navbar = () => {

    let {userData,setuserdata} = useContext(userDataContext)
    let {serverUrl} = useContext(authDataContext)
    let navigate = useNavigate()



    const handleSignOut = async () =>{
         try {
            let result = await axios.get(serverUrl+"/api/auth/logout",{withCredentials:true})
            setuserdata(null)
            navigate("/login")

            console.log(result)
         } catch (error) {
            console.log(error)
         }
    }

  return (
    <div className="w-full bg-white h-16 fixed top-0 shadow-md flex justify-between items-center px-6 md:px-16 z-50">
      
      {/* LEFT */}
      <div className="flex items-center gap-4">
        <img src={logo} alt="" className="w-9 cursor-pointer" />

        <form className="hidden md:flex items-center bg-gray-100 px-4 py-2 rounded-md">
          <IoSearch className="text-gray-500 text-lg" />
          <input
            type="text"
            placeholder="Search"
            className="bg-transparent outline-none px-2 text-sm w-60"
          />
        </form>
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-8 relative">

         <div className=" w-70 h-70  bg-white text-lg relative top-50 -right-80 rounded-xl flex flex-col items-center p-4 gap-4">
            <div className="  w-10 h-10 rounded-full overflow-hidden cursor-pointer border border-gray-300">
            <img src={dp} alt="" className="w-full h-full object-cover" />
            </div>
            
            <div className="text-2xl font-semibold text-gray-600">
                {`${userData.firstName} ${userData.lastName}`}
            </div>

            <button className=" cursor-pointer w-full h-8  rounded-full border-2 border-[#2fc1f1] text-[#61c3e4]">View Profile</button>


            <div className="w-full h-px bg-gray-800"></div>


            <div className="flex flex-col items-center text-gray-600 hover:text-black cursor-pointer">
          <IoPeopleSharp className="text-xl" />
          <p className=" block text-xs mt-1">My Network</p>
        </div>


         <button className=" cursor-pointer w-full h-8  rounded-full border-2 border-[#ff2626] text-[#dd3333]" onClick={handleSignOut} >Sign Out</button>



         </div>
        
        
        <div className="flex flex-col items-center text-gray-600 hover:text-black cursor-pointer">
          <IoHomeSharp className="text-xl" />
          <p className="hidden md:block text-xs mt-1">Home</p>
        </div>

        <div className="flex flex-col items-center text-gray-600 hover:text-black cursor-pointer">
          <IoPeopleSharp className="text-xl" />
          <p className="hidden md:block text-xs mt-1">My Network</p>
        </div>

        <div className="flex flex-col items-center text-gray-600 hover:text-black cursor-pointer">
          <IoMdNotifications className="text-xl" />
          <p className="hidden md:block text-xs mt-1">Notifications</p>
        </div>

        <div className="w-9 h-9 rounded-full overflow-hidden cursor-pointer border border-gray-300">
          <img src={dp} alt="" className="w-full h-full object-cover" />
        </div>





      </div>
    </div>
  );
};

export default Navbar;
