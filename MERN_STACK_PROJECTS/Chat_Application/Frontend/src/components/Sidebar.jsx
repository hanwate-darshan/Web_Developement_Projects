




import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import dp from "../assets/dp.png";
import { FaSearch } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import { RiLogoutCircleLine } from "react-icons/ri";
import axios from "axios";
import { serverURL } from "../main";
import { setOtherUsers, setSelectedUser, setUserData } from "../redux/userSlice";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const { userData, otherUsers , selectedUser} = useSelector((state) => state.user);
  const [search, setSearch] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogOut = async () => {
    try {
      await axios.get(`${serverURL}/api/auth/logout`, {
        withCredentials: true,
      });
      dispatch(setUserData(null));
      dispatch(setOtherUsers(null));
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={`lg:w-[30%] w-full h-screen bg-white border-r border-gray-200 flex flex-col relative lg:block  ${!selectedUser?"block":"hidden"} `}>

      {/* Logout */}
      <button
        onClick={handleLogOut}
        className="absolute bottom-4 left-4 w-10 h-10 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center shadow-md transition"
      >
        <RiLogoutCircleLine size={18} />
      </button>

      {/* Top Bar */}
      <div className="px-5 py-4 flex items-center justify-between border-b border-gray-200">
        <h1 className="text-xl font-semibold text-gray-800">NapChat</h1>

        {!search && (
          <button
            onClick={() => setSearch(true)}
            className="w-9 h-9 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition"
          >
            <FaSearch className="text-gray-600 text-sm" />
          </button>
        )}
      </div>

      {/* Search */}
      {search && (
        <div className="px-4 py-3 border-b border-gray-200">
          <div className="w-full h-10 bg-gray-100 rounded-lg flex items-center px-3 gap-3">
            <FaSearch className="text-gray-400 text-sm" />
            <input
              type="text"
              placeholder="Search users"
              className="w-full bg-transparent outline-none text-sm"
            />
            <RxCross2
              className="text-gray-500 cursor-pointer"
              onClick={() => setSearch(false)}
            />
          </div>
        </div>
      )}

      {/* Current User */}
      <div
        className="px-5 py-4 flex items-center gap-4 border-b border-gray-200 cursor-pointer hover:bg-gray-50"
        onClick={() => navigate("/profile")}
      >
        <div className="w-14 h-14 rounded-full overflow-hidden border">
          <img
            src={userData?.image || dp}
            alt="profile"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="flex flex-col">
          <span className="text-xs text-gray-500">Welcome back</span>
          <span className="text-base font-medium text-gray-800">
            {userData?.name || "User"}
          </span>
        </div>
      </div>

      {/* 🔵 ONLINE USERS SECTION */}
      {otherUsers?.length > 0 && (
        <div className="px-4 py-3 border-b border-gray-200">
          <p className="text-xs font-semibold text-gray-500 mb-2">
            Online Users
          </p>

          <div className="flex gap-3 overflow-x-auto scrollbar-hide">
            {otherUsers.map((user) => (
              <div
                key={user._id}
                className="relative shrink-0"
              >
                <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-green-400">
                  <img
                    src={user.image || dp}
                    alt="profile"
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Online dot */}
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 🟢 CHAT LIST */}
      <div className="flex-1  px-2 py-3 space-y-1">

        {otherUsers?.map((user) => (
          <div
            key={user._id}
            className="flex items-center gap-4 px-3 py-2 rounded-lg cursor-pointer hover:bg-gray-100 transition "
            onClick={()=>dispatch(setSelectedUser(user))}
          >
            <div className="w-12 h-12 rounded-full overflow-hidden border">
              <img
                src={user.image || dp}
                alt="profile"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="flex flex-col">
              <span className="text-sm font-medium text-gray-800">
                {user.name || user.userName}
              </span>
              <span className="text-xs text-gray-500">
                Tap to start chat
              </span>
            </div>
          </div>
        ))}

        {!otherUsers?.length && (
          <p className="text-center text-gray-400 text-sm mt-10">
            No users found
          </p>
        )}
      </div>
    </div>
  );
};

export default Sidebar;















































