import React, { useContext, useState } from "react";
import logo from "../assets/airbnb.svg";
import { BsSearch } from "react-icons/bs";
import { GiHamburgerMenu } from "react-icons/gi";
import { CgProfile } from "react-icons/cg";
import { FaFire } from "react-icons/fa";
import { FaHouseChimney } from "react-icons/fa6";
import { MdBedroomParent, MdOutlinePool } from "react-icons/md";
import { PiFarm } from "react-icons/pi";
import { LuTentTree } from "react-icons/lu";
import { GiWoodCabin, GiTreehouse } from "react-icons/gi";
import { BsShop } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { AuthDataContext } from "../context/AuthContext.jsx";
import axios from "axios"

const Navbar = () => {
  const [visible, setVisible] = useState(false);
  const navigate = useNavigate();
  let {serverUrl} = useContext(AuthDataContext)

  const handleLogOut = async (params) => {
    try {
        let result = await axios.post(serverUrl + "/api/auth/logout", {withCredentials:true})
        console.log(result)
    } catch (error) {
        console.log(error)
    }
  }

  return (
    <div className="w-full fixed top-0 z-50 bg-white shadow-sm">

      {/* ================= DROPDOWN ================= */}
      {visible && (
        <div className="absolute top-16 right-4 w-48 bg-white border rounded-xl shadow-lg flex flex-col text-sm">
          <button
            onClick={() => navigate("/login")}
            className="px-4 py-2 text-left hover:bg-gray-100 cursor-pointer overflow-hidden"
          >
            Login
          </button>
          <button
            className="px-4 py-2 text-left border-b hover:bg-gray-100 cursor-pointer"
            onClick={handleLogOut}
          >
            Logout
          </button>
          <button
            onClick={() => navigate("/listing")}
            className="px-4 py-2 text-left  hover:bg-gray-100 cursor-pointer"
          >
            List your home
          </button>
          <button className="px-4 py-2 text-left hover:bg-gray-100 cursor-pointer">
            My Listing
          </button>
          <button className="px-4 py-2 text-left hover:bg-gray-100 cursor-pointer">
            Check Booking
          </button>
        </div>
      )}

      {/* ================= TOP BAR ================= */}
      <div className="flex items-center justify-between px-4 md:px-10 py-4 border-b">

        {/* Logo */}
        <div
          className="flex items-center cursor-pointer"
          onClick={() => navigate("/")}
        >
          <img src={logo} alt="Airbnb" className="w-24 h-8" />
        </div>

        {/* Search (hidden on mobile) */}
        <div className="hidden md:flex items-center border rounded-full px-4 py-2 shadow-sm">
          <input
            type="text"
            placeholder="Search destination"
            className="outline-none text-sm w-56"
          />
          <button className="ml-2 bg-[#FF385C] p-2 rounded-full text-white">
            <BsSearch />
          </button>
        </div>

        {/* Right Buttons */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate("/listing")}
            className="hidden md:block text-sm font-medium hover:bg-gray-100 px-3 py-2 rounded-full cursor-pointer"
          >
            List your home
          </button>

          <button
            onClick={() => setVisible((prev) => !prev)}
            className="flex items-center gap-2 border rounded-full px-3 py-2 hover:shadow-md cursor-pointer"
          >
            <GiHamburgerMenu />
            <CgProfile />
          </button>
        </div>
      </div>

      {/* ================= CATEGORY BAR ================= */}
      <div className="flex justify-center gap-10 px-4 md:px-10 py-3 overflow-x-auto scrollbar-hide text-gray-600 text-xs">

        <div className="flex flex-col items-center cursor-pointer hover:text-red-500">
          <FaFire className="text-xl" />
          <span>Trending</span>
        </div>

        <div className="flex flex-col items-center cursor-pointer hover:text-red-500">
          <FaHouseChimney className="text-xl" />
          <span>Houses</span>
        </div>

        <div className="flex flex-col items-center cursor-pointer hover:text-red-500">
          <MdBedroomParent className="text-xl" />
          <span>Rooms</span>
        </div>

        <div className="flex flex-col items-center cursor-pointer hover:text-red-500">
          <PiFarm className="text-xl" />
          <span>Farm</span>
        </div>

        <div className="flex flex-col items-center cursor-pointer hover:text-red-500">
          <MdOutlinePool className="text-xl" />
          <span>Pool</span>
        </div>

        <div className="flex flex-col items-center cursor-pointer hover:text-red-500">
          <LuTentTree className="text-xl" />
          <span>Tents</span>
        </div>

        <div className="flex flex-col items-center cursor-pointer hover:text-red-500">
          <GiWoodCabin className="text-xl" />
          <span>Cabins</span>
        </div>

        <div className="flex flex-col items-center cursor-pointer hover:text-red-500">
          <BsShop className="text-xl" />
          <span>Shops</span>
        </div>

        <div className="flex flex-col items-center cursor-pointer hover:text-red-500">
          <GiTreehouse className="text-xl" />
          <span>Treehouse</span>
        </div>

      </div>
    </div>
  );
};

export default Navbar;
