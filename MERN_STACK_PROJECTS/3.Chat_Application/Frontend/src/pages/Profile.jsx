
import React, { useRef, useState } from "react";
import dp from "../assets/dp.png";
import { FaCamera } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { FaArrowAltCircleLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { serverURL } from "../main";
import { setUserData } from "../redux/userSlice";

const Profile = () => {
    let {userData} = useSelector(state=>state.user)
    let navigate = useNavigate()
    const [name, setName] = useState(userData.name || " ")
    const [frontEndImage, setFrontEndImage] = useState(userData.image || dp)
    const [backEndImage, setBackEndImage] = useState(null)
    let image = useRef()

    let dispatch = useDispatch()
    let [saving,setSaving] = useState(false)



    const handleImage = (e) =>{
      let file = e.target.files[0]
      setBackEndImage(file)
      setFrontEndImage(URL.createObjectURL(file))
    }

    const handleProfile = async (e) => {
      e.preventDefault()
      setSaving(true)
         try {
            let formData = new FormData()
            formData.append("name",name)
            if(backEndImage){
              formData.append("image",backEndImage)

            }
            let result = await axios.put(`${serverURL}/api/user/profile`,formData,{withCredentials:true})
            setSaving(false)
            dispatch(setUserData(result.data))
            navigate('/')
         } catch (error) {
            console.log(error)
         }
    }


  return (
    <div className="w-full min-h-screen bg-slate-100 flex flex-col items-center justify-center px-4">
      
       <div className="fixed top-5 left-10 gap-5 " onClick={()=>navigate('/')}>
        <FaArrowAltCircleLeft className="w-10 h-10 text-pink-500 hover:text-pink-600 cursor-pointer" />
       </div>


      {/* Profile Image Section */}
      <div className="relative mb-8 flex justify-center items-center" onClick={()=>image.current.click()}>
        <div className="w-40 h-40 md:w-48 md:h-48 rounded-full overflow-hidden shadow-lg border-4 border-white">
          <img
            src={frontEndImage}
            alt="profile"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Camera Icon */}
        <div className="absolute bottom-2 right-2 bg-pink-500 hover:bg-pink-600 text-white p-3 rounded-full cursor-pointer shadow-md transition">
          <FaCamera size={18} />
        </div>
      </div>

      {/* Profile Form */}
      <form className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 flex flex-col gap-5" onSubmit={handleProfile}>

        <h2 className="text-2xl font-semibold text-center text-gray-800">
          Edit Profile
        </h2>


         <input type="file" accept="image/*" ref={image} hidden onChange={handleImage} />

        {/* Name */}
        <input
        onChange={(e)=>setName(e.target.value)}
        value={name}
          type="text"
          placeholder="Enter your name"
          className="w-full h-11 px-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-400 transition"
        />

        {/* Username */}
        <input
        value={userData?.userName}
          type="text"
          readOnly
          
          className="w-full h-11 px-4 rounded-lg bg-gray-100 text-gray-500 border border-gray-300 cursor-not-allowed"
        />

        {/* Email */}
        <input
          type="email"
          readOnly
          value={userData?.email}
          className="w-full h-11 px-4 rounded-lg bg-gray-100 text-gray-500 border border-gray-300 cursor-not-allowed"
        />

        {/* Save Button */}
        <button
          type="submit"
          className="mt-4 h-11 bg-pink-500 hover:bg-pink-600 text-white font-semibold rounded-lg transition cursor-pointer"
          disabled={saving}
        >
         {saving ? "Saving..." : "Save Profile"}
        </button>
      </form>
    </div>
  );
};

export default Profile;

 