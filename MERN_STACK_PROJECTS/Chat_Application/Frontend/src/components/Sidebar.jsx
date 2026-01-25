// import React from 'react'
// import { useSelector } from 'react-redux'
// import logo from "../assets/logo.png"
// import dp from "../assets/dp.png"
// import { FaSearch, FaTemperatureHigh } from "react-icons/fa";
// import { useState } from 'react';
// import { RxCross2 } from "react-icons/rx";

// const Sidebar = () => {
//     let { userData } = useSelector(state => state.user)
//     let [search,setSearch] = useState(false)
//     return (
//         <div className='lg:w-[30%] w-full h-full bg-gray-200'>
//             <div className='w-full h-60 bg-[#00fff2] rounded-b-[30%] shadow-gray-200 shadow-lg flex flex-col gap-5 justify-center'>
//                 <div>
//                     <p>NanoChat</p>
//                     <h1>Hello , {userData.name}</h1>
//                     <div className="w-20 h-20  rounded-full overflow-hidden shadow-lg border-4 border-white">
//                         <img
//                             src={userData.image || dp }
//                             alt="profile"
//                             className="w-full h-full object-cover"
//                         />
//                     </div>
//                     {!search && <div className='bg-white h-10 w-10 rounded-full overflow-hidden flex justify-center items-center shadow-lg cursor-pointer' onClick={()=>setSearch(true)}>
//                          <FaSearch className='w-5 h-5' />
//                     </div>}
                       
//                       {search && <form className='w-full h-10 bg-white shadow-lg flex items-center gap-7' > <FaSearch className='w-5 h-5' /> <input type="text" placeholder='search users' className='w-full h-full p-2.5 outline-none border-0' /> 
//                          <RxCross2  className='w-5 h-5 cursor-pointer' onClick={()=>setSearch(false)} />
//                       </form> }

//                 </div>
//             </div>
//         </div>
//     )
// }

// export default Sidebar


import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import dp from "../assets/dp.png";
import { FaSearch } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import { RiLogoutCircleLine } from "react-icons/ri";
import axios from "axios";
import { serverURL } from "../main";
import { setOtherUsers, setUserData } from "../redux/userSlice";
import { useNavigate } from "react-router-dom";


const Sidebar = () => {
  const { userData , otherUsers } = useSelector((state) => state.user);
  const [search, setSearch] = useState(false);
  let dispatch = useDispatch()
  let navigate = useNavigate();


  const handleLogOut = async () => {
    try {
        let result = await axios.get(`${serverURL}/api/auth/logout`,{withCredentials:true})
        dispatch(setUserData(null))
        dispatch(setOtherUsers(null))
        navigate('/')
    } catch (error) {
        console.log(error)
    }
  }


  return (
    <div className="lg:w-[28%] w-full h-full bg-white border-r border-gray-200 flex flex-col">

    {/* LogOut button */}
    <div className="w-10 h-10 text-white rounded-full flex items-center justify-center hover:bg-red-700 transition cursor-pointer fixed bottom-5 left-3 bg-red-500" onClick={handleLogOut}>
        <RiLogoutCircleLine />
    </div>



      {/* Top Bar */}
      <div className="px-5 py-4 flex items-center justify-between border-b border-gray-200">
        <h1 className="text-2xl font-boldbold text-gray-800">NapChat</h1>

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

      {/* User Profile */}
      <div className="px-5 py-6 flex items-center gap-4 border-b border-gray-200 " onClick={()=>navigate("/profile")}>
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




<div className="flex  overflow-hidden">
  {otherUsers?.map((user) => (
    <div
      key={user._id}
      className="w-10 h-10 flex gap-5 rounded-full overflow-hidden border "
    >
      <img
        src={user.image || dp}
        alt="profile"
        className="w-full h-full object-cover"
      />
    </div>
  ))}
</div>






      {/* Chat List Placeholder */}
      <div className="flex flex-col gap-5 overflow-y-auto p-4">
        
          {otherUsers?.map((user) => (

        <div className="w-[95%] bg-white shadow-xl rounded-full">

        
   
            


    <div
      key={user._id}
      className="w-10 h-10 flex gap-5 rounded-full overflow-hidden border "
    >
      <img
        src={user.image || dp}
        alt="profile"
        className="w-full h-full object-cover"
      />
    </div>
    </div>
  ))}
        
      </div>
    </div>
  );
};

export default Sidebar;
