import React, { createContext, useContext, useEffect, useState } from 'react'
import { authDataContext } from './AuthContext.jsx'
import axios from 'axios'
export const userDataContext = createContext()
const UserContext = ({children}) => {

    const [userData, setUserData] = useState(null)
let {serverUrl} = useContext(authDataContext)
let [edit,setEdit] = useState(false)

    const getCurrentUser = async () =>{
        try {
            let result = await axios.get(serverUrl + "/api/user/currentuser",{
                withCredentials:true
            })
            // console.log(result)
            setUserData(result.data)
        } catch (error) {
            console.log(error)
             setUserData(null)
        }
    }



    useEffect(()=>{
        getCurrentUser()
    },[])

    const value = {
         userData, setUserData , edit ,setEdit
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