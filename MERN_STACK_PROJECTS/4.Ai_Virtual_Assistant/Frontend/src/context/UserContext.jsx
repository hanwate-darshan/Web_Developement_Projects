import React, { createContext, useState } from 'react'
export const userDataContext = createContext()
import axios from "axios"
import { useEffect } from 'react';

const UserContext = ({children}) => {
    const serverUrl = `http://localhost:3000`;

    const [userData,setUserData] = useState(null)
     const [frontendImage, setFrontendImage] = useState(null)
      const [BackendImage, setBackendImage] = useState(null)
      const [selectedImage,setSelectedImage] = useState(null)
    
    const handleCurrentUser = async () => {
      try {
        let result = await axios.get(`${serverUrl}/api/user/current`,{withCredentials:true})
        setUserData(result.data)
        console.log(result.data)
      } catch (error) {
        console.log(error)
      }
    }

    useEffect(()=>{
        handleCurrentUser()
    },[])

    const value = {
        serverUrl , userData , setUserData , frontendImage, setFrontendImage , BackendImage, setBackendImage , selectedImage ,setSelectedImage
    }
  return (
    <div>
        <userDataContext.Provider value={value}>

        {children}
        </userDataContext.Provider>
    </div>
  )
}

export default UserContext
