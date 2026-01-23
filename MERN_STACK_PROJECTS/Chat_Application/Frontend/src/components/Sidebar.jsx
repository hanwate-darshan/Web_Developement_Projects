import React from 'react'
import { useSelector } from 'react-redux'
import logo from "../assets/logo.png"
import dp from "../assets/dp.png"
import { FaSearch, FaTemperatureHigh } from "react-icons/fa";
import { useState } from 'react';
import { RxCross2 } from "react-icons/rx";

const Sidebar = () => {
    let { userData } = useSelector(state => state.user)
    let [search,setSearch] = useState(false)
    return (
        <div className='lg:w-[30%] w-full h-full bg-gray-200'>
            <div className='w-full h-60 bg-[#00fff2] rounded-b-[30%] shadow-gray-200 shadow-lg flex flex-col gap-5 justify-center'>
                <div>
                    <img src={logo} alt="" className='h-30 w-80' />
                    <h1>Hello , {userData.name}</h1>
                    <div className="w-20 h-20  rounded-full overflow-hidden shadow-lg border-4 border-white">
                        <img
                            src={userData.image || dp }
                            alt="profile"
                            className="w-full h-full object-cover"
                        />
                    </div>
                    {!search && <div className='bg-white h-10 w-10 rounded-full overflow-hidden flex justify-center items-center shadow-lg cursor-pointer' onClick={()=>setSearch(true)}>
                         <FaSearch className='w-5 h-5' />
                    </div>}
                       
                      {search && <form className='w-full h-10 bg-white shadow-lg flex items-center gap-7' > <FaSearch className='w-5 h-5' /> <input type="text" placeholder='search users' className='w-full h-full p-2.5 outline-none border-0' /> 
                         <RxCross2  className='w-5 h-5 cursor-pointer' onClick={()=>setSearch(false)} />
                      </form> }

                </div>
            </div>
        </div>
    )
}

export default Sidebar
