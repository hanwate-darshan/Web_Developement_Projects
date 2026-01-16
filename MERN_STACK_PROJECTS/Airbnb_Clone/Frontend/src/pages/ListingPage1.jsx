import React from 'react'
import { useNavigate } from 'react-router-dom'
import { FaArrowCircleLeft } from "react-icons/fa";

const ListingPage1 = () => {
    let navigate = useNavigate()
  return (
    <div className='w-full h-full flex items-center justify-center relative overflow-auto'>
      <form  className='flex items-center justify-center flex-col max-w-80 overflow-auto'>
            <div className='' onClick={()=>navigate('/')}><FaArrowCircleLeft className='w-6 h-6 text-white' /></div>
      </form>
    </div>
  )
}

export default ListingPage1
