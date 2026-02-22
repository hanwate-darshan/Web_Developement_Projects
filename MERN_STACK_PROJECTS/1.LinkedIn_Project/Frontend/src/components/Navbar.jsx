


import React, { useContext, useState } from "react";
import logo from "../assets/pngwing.com.png";
import dp from "../assets/empty-dp.webp";
import { IoSearch, IoHomeSharp, IoPeopleSharp } from "react-icons/io5";
import { IoMdNotifications } from "react-icons/io";
import { userDataContext } from "../context/UserContext.jsx";
import { authDataContext } from "../context/AuthContext.jsx";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const { userData, setUserdata } = useContext(userDataContext);
  const { serverUrl } = useContext(authDataContext);
  const [activeSearch, setActiveSearch] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const navigate = useNavigate();

  const handleSignOut = async () => {
    
    try {
       let result = await axios.get(serverUrl + "/api/auth/logout", {
        withCredentials: true
      });
      setUserdata(null);
      navigate("/login");
      console.log(result)
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full bg-white h-16 fixed top-0 shadow-md flex justify-between items-center px-4 pl-0 sm:px-8 md:px-16 z-50">

      {/* LEFT SECTION */}
      <div className="flex items-center gap-4">
        <img
          src={logo}
          alt="logo"
          className="w-8 sm:w-9 cursor-pointer"
          onClick={() => setActiveSearch(false)}
        />

        {/* Mobile Search Icon */}
        {!activeSearch && (
          <IoSearch
            className="text-gray-500 text-xl lg:hidden cursor-pointer"
            onClick={() => setActiveSearch(true)}
          />
        )}

        {/* Search Bar */}
        <form
          className={`${!activeSearch ? "hidden" : "flex"}
          lg:flex items-center bg-gray-100 px-4 py-2 rounded-full transition-all`}
        >
          <IoSearch className="text-gray-500 text-lg" />
          <input
            type="text"
            placeholder="Search"
            className="bg-transparent outline-none px-2 text-sm w-32 sm:w-48 md:w-60"
          />
        </form>
      </div>

      {/* RIGHT SECTION */}
      <div className="flex items-center gap-6 sm:gap-8 relative">

        {/* Desktop Icons */}
        <div className="hidden lg:flex flex-col items-center text-gray-600 hover:text-black cursor-pointer">
          <IoHomeSharp className="text-xl" />
          <p className="text-xs mt-1">Home</p>
        </div>

        <div className="hidden lg:flex flex-col items-center text-gray-600 hover:text-black cursor-pointer">
          <IoPeopleSharp className="text-xl" />
          <p className="text-xs mt-1">My Network</p>
        </div>

        <div className="flex flex-col items-center text-gray-600 hover:text-black cursor-pointer">
          <IoMdNotifications className="text-xl" />
          <p className="hidden md:block text-xs mt-1">Notifications</p>
        </div>

        {/* Profile Image */}
        <div
          className="w-8 h-8 sm:w-9 sm:h-9 rounded-full overflow-hidden cursor-pointer border border-gray-300"
          onClick={() => setShowProfile(!showProfile)}
        >
          <img src={userData.profileImage || dp} alt="profile" className="w-full h-full object-cover" />
        </div>

        {/* PROFILE DROPDOWN */}
        {showProfile && (
          <div
            className="absolute top-14 right-0 w-64 sm:w-72
            bg-white rounded-xl shadow-xl
            flex flex-col items-center p-5 gap-4
            border border-gray-200 transition-all"
          >
            <div className="w-14 h-14 rounded-full overflow-hidden border">
              <img
                src={userData.profileImage || dp}
                alt=""
                className="w-full h-full object-cover"
              />
            </div>

            <div className="text-lg font-semibold text-gray-700 text-center">
              {userData?.firstName} {userData?.lastName}
            </div>

            <button
              className="w-full py-2 rounded-full border border-blue-400 text-blue-500 hover:bg-blue-50 transition"
            >
              View Profile
            </button>

            <div className="w-full h-px bg-gray-200"></div>

            <div className="flex gap-2  items-center text-gray-600 hover:text-black cursor-pointer">
          <IoPeopleSharp className="text-xl" />
          <p className="text-xs mt-1">My Network</p>
        </div>

            <button
              className="w-full py-2 rounded-full border border-red-400 text-red-500 hover:bg-red-50 transition cursor-pointer"
              onClick={handleSignOut}
            >
              Sign Out
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
