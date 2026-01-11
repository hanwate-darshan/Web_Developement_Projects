import React, { createContext, useContext, useEffect, useState } from 'react'
import { authDataContext } from './AuthContext.jsx'
import axios from 'axios'
export const userDataContext = createContext()
const UserContext = ({children}) => {

    const [userData, setuserData] = useState([])
let {serverUrl} = useContext(authDataContext)

    const getCurrentUser = async () =>{
        try {
            let result = await axios.get(serverUrl + "/api/user/currentuser",{
                withCredentials:true
            })
            // console.log(result)
            setuserData(result.data)
        } catch (error) {
            console.log(error)
             setuserData(null)
        }
    }



    useEffect(()=>{
        getCurrentUser()
    },[])

    const value = {
         userData, setuserData
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