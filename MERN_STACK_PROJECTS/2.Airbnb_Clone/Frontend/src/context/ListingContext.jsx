import axios from 'axios'
import React, { useContext } from 'react'
import { useState } from 'react'
import { createContext } from 'react'

import { AuthDataContext } from './AuthContext.jsx'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
export const listingDataContext = createContext()

const ListingContext = ({children}) => {


    let navigate = useNavigate()
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [frontEndImage1, setfrontEndImage1] = useState(null)
    const [frontEndImage2, setFrontEndImage2] = useState(null)
    const [frontEndImage3, setFrontEndImage3] = useState(null)
    const [backEndImage1, setBackEndImage1] = useState(null)
    const [backEndImage2, setBackEndImage2] = useState(null)
    const [backEndImage3, setBackEndImage3] = useState(null)
    const [rent, setRent] = useState("")
    const [city, setCity] = useState("")
    const [landmark, setLandmark] = useState("")
    const [category, setCategory] = useState("")
    const [listingData, setListingData] = useState([])

      

    let {serverUrl} = useContext(AuthDataContext)

    
    
    const handleAddListing = async () => {
        try {
        let formData = new FormData()
        formData.append("title",title)
        formData.append("image1",backEndImage1)
        formData.append("image2",backEndImage2)
        formData.append("image3",backEndImage3)
        formData.append("description",description)
        formData.append("rent",rent)
        formData.append("city",city)
        formData.append("landmark",landmark)
        formData.append("category",category)
        
  
        let result = await axios.post(serverUrl + "/api/listing/add",formData,{withCredentials:true})
        console.log(result)

        navigate("/")
        setTitle("")
        setDescription("")
        setfrontEndImage1(null)
        setFrontEndImage2(null)
        setFrontEndImage3(null)
        setBackEndImage1(null)
        setBackEndImage2(null)
        setBackEndImage3(null)
        setRent("")
        setCity("")
        setLandmark("")
        setCategory("")

    } catch (error) {
        console.log(error)
    }
  }


  const getListing = async () => {
    try {
      let result = await axios.get(serverUrl + "/api/listing/get",{withCredentials:true})
      setListingData(result.data)
    } catch (error) {
      console.log(error)
    }
  }


  useEffect(()=>{
       getListing()
  },[])


    let value = {
          title, setTitle,
     description, setDescription,
frontEndImage1, setfrontEndImage1,
frontEndImage2, setFrontEndImage2,
frontEndImage3, setFrontEndImage3,
backEndImage1, setBackEndImage1,
backEndImage2, setBackEndImage2,
backEndImage3, setBackEndImage3,
rent, setRent,
city, setCity,
landmark, setLandmark,
category, setCategory,
listingData,setListingData,

handleAddListing
    }
  return (
    <div>
      <listingDataContext.Provider value={value}>

        {children}

      </listingDataContext.Provider>
    </div>
  )
}

export default ListingContext

