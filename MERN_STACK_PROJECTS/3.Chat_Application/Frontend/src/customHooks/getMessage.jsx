import axios from "axios"
import { useEffect } from "react"
import { serverURL } from "../main"
import { useDispatch, useSelector } from "react-redux"
import { setOtherUsers, setUserData } from "../redux/userSlice.js"
import { setMessages } from "../redux/messageSlice.js"


const getMessages = () =>{
    let dispatch = useDispatch()
    let {userData , selectedUser} = useSelector(state=>state.user)
    useEffect(()=>{
        const fetchMessages = async () => {
            try {
                let result  = await axios.get(`${serverURL}/api/message/get/${selectedUser._id}`,{withCredentials:true})
                dispatch(setMessages(result.data))
            } catch (error) {
                console.log(error)
            }
        }
        fetchMessages()
    },[selectedUser,userData])
}

export default getMessages;