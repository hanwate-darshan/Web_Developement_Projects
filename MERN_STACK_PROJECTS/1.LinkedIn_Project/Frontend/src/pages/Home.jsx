import React, { useContext, useState } from 'react'
import Navbar from '../components/Navbar.jsx'
import dp from "../assets/empty-dp.webp";
import { FaCirclePlus } from "react-icons/fa6";
import { CiCamera } from "react-icons/ci";
import { userDataContext } from '../context/UserContext.jsx';
import { HiPencil } from "react-icons/hi2";
import EditProfile from '../components/EditProfile.jsx';
import { RxCross2 } from "react-icons/rx";

const Home = () => {
  let {userData,setUserData , edit ,setEdit} = useContext(userDataContext)
  const [showProfile, setShowProfile] = useState(false)
 
  
  return (
    <div className='w-full min-h-screen bg-[#8d9c8d] pt-30 flex items-start justify-center gap-5 px-5 flex-col lg:flex-row relative'>


       {edit && <EditProfile  />}
      
      <Navbar />
      

       {/* left */}
      <div className=' w-full lg:w-[25%] min-h-50 bg-white shadow-lg rounded-lg p-2'>
         
         {/* cover image s */}
        <div className='w-full h-23 bg-gray-300 rounded-lg flex justify-center items-center overflow-hidden relative'>
          <img src={userData.coverImage || null} alt="" className='w-full' />
          <CiCamera className='w-6 h-6 absolute top-3 right-3 cursor-pointer' />
        </div>

        {/* profile image */}

         <div
                   className="w-13 h-13  rounded-full overflow-hidden cursor-pointer border border-gray-300 flex items-center justify-center relative -top-9 left-7.5"
                   onClick={() => {setShowProfile(!showProfile),setEdit(true)}}
                 >
                   <img src={userData.profileImage || dp} alt="profile" className="w-full h-full object-cover" onClick={()=>setEdit(true)} />
                   {/* plus icons */}
                      <FaCirclePlus className='w-3 h-3 absolute right-2 bottom-1 text-blue-500'/>
                   
                 </div>

           


                  {/* User Details */}
                 <div>

                  <div>{`${userData.firstName} ${userData.lastName}`}</div>
                  <div>{`${userData.headline || " "} `}</div>
                  <div>{`${userData.location} `}</div>
                   


                 </div>
                  <button
              className="w-full py-2 rounded-full border border-blue-400 text-blue-500 hover:bg-blue-50 transition flex items-center justify-center gap-3 cursor-pointer"
              onClick={()=>setEdit(true)}
            >
              Edit Profile <HiPencil />
            </button>
      

      </div>



  
    {/* Post form  */}
     
     <div className='w-full h-full bg-black absolute top-0 left-0 z-100 opacity-[0.3]'>
     </div>
          <div className='w-[90%] max-w-120 h-120 bg-white shadow-lg rounded-lg absolute z-200 p-5 flex items-start justify-start flex-col gap-4'>
                {/* cross  */}
                <div
                          className="absolute right-4 top-4"
                          
                        >
                          <RxCross2 className="text-2xl cursor-pointer hover:scale-110 transition" />
                        </div>




                       
      <div className='flex justify-start items-center gap-3'>
                        {/* profile image  */}

    <div className="w-12 h-12 rounded-full overflow-hidden border border-gray-300">
      <img
        src={userData?.profileImage || dp}
        alt="profile"
        className="w-full h-full object-cover"
        />
    </div>


      {/* Profile Name Div  */}

      <div className=' text-xl text-gray-600'>
         {`${userData.firstName} ${userData.lastName}`}
      </div>

        </div>



        <textarea className='w-full h-110 outline-none border-none p-4 resize-none text-sm text-gray-400' placeholder='What do you want to talk about..?'></textarea>


       
           


          </div>





      {/* middle */}
<div className="w-full lg:w-[50%] min-h-40 bg-[#f0efe7]">

  {/* Create Post Box */}
  <div className="w-full bg-white shadow-lg rounded-lg p-4 flex items-center gap-3">

    {/* Profile Image */}
    <div className="w-12 h-12 rounded-full overflow-hidden border border-gray-300">
      <img
        src={userData?.profileImage || dp}
        alt="profile"
        className="w-full h-full object-cover"
      />
    </div>

    {/* Start Post Button */}
    <button
      className="flex-1 border border-gray-300 rounded-full py-2 px-4 
      text-left text-gray-600 font-medium 
      hover:bg-gray-100 transition cursor-pointer"
    >
      Start a post
    </button>

  </div>

</div>



      {/* right */}
      <div className=' w-full lg:w-[25%] min-h-50 bg-white shadow-lg '>


      </div>
    </div>
  )
}

export default Home