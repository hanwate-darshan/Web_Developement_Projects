import React from 'react'
import { RxCross2 } from "react-icons/rx";

const EditProfile = () => {
  return (
    <div className='w-full h-screen fixed top-0  z-100 flex justify-center items-center'>
        <div className='bg-black opacity-[0.6] w-full h-full absolute'></div>
       <div className='w-90% max-w-100 w-150 h-130 bg-white absolute z-200 rounded-lg shadow-2xs'>
              {/* cross */}
              <div className='absolute right-3 top-3'><RxCross2 className='text-2xl cursor-pointer' /></div>
       </div>
    </div>
  )
}

export default EditProfile
