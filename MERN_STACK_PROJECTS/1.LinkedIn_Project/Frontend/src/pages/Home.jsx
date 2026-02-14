import React, { useContext, useState } from 'react'
import Navbar from '../components/Navbar.jsx'
import dp from "../assets/empty-dp.webp";
import { FaCirclePlus } from "react-icons/fa6";
import { CiCamera } from "react-icons/ci";
import { userDataContext } from '../context/UserContext.jsx';
import { HiPencil } from "react-icons/hi2";
import EditProfile from '../components/EditProfile.jsx';

const Home = () => {
  let {userData,setUserData , edit ,setEdit} = useContext(userDataContext)
  
  return (
    <div className='w-full min-h-screen bg-[#8d9c8d] pt-30 flex items-start justify-center gap-5 px-5 flex-col lg:flex-row'>


       {edit && <EditProfile  />}
      
      <Navbar />
      

       {/* left */}
      <div className=' w-full lg:w-[25%] min-h-50 bg-white shadow-lg rounded-lg p-2'>
         
         {/* cover image */}
        <div className='w-full h-23 bg-gray-300 rounded-lg flex justify-center items-center overflow-hidden relative'>
          <img src="" alt="" className='w-full' />
          <CiCamera className='w-6 h-6 absolute top-3 right-3 cursor-pointer' />
        </div>

        {/* profile image */}

         <div
                   className="w-13 h-13  rounded-full overflow-hidden cursor-pointer border border-gray-300 flex items-center justify-center relative -top-9 left-7.5"
                   onClick={() => {setShowProfile(!showProfile),setEdit(true)}}
                 >
                   <img src={dp} alt="profile" className="w-full h-full object-cover" onClick={()=>setEdit(true)} />
                   {/* plus icons */}
                      <FaCirclePlus className='w-3 h-3 absolute right-2 bottom-1 text-blue-500'/>
                   
                 </div>

           


                  {/* User Details */}
                 <div>

                  <div>{`${userData.firstName} ${userData.lastName}`}</div>
                  <div>{`${userData.headline || " Frontend developer"} `}</div>
                  <div>{`${userData.location} `}</div>
                   


                 </div>
                  <button
              className="w-full py-2 rounded-full border border-blue-400 text-blue-500 hover:bg-blue-50 transition flex items-center justify-center gap-3 cursor-pointer"
              onClick={()=>setEdit(true)}
            >
              Edit Profile <HiPencil />
            </button>
      

      </div>



       {/* middle */}
      <div className='w-full lg:w-[50%] min-h-50 bg-white shadow-lg '>

      </div>



      {/* right */}
      <div className=' w-full lg:w-[25%] min-h-50 bg-white shadow-lg '>


      </div>
    </div>
  )
}

export default Home