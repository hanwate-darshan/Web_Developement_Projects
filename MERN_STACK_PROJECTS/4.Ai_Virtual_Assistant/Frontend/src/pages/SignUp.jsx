
import React, { useState } from "react";
import authBg from "../assets/authBg.png";
import { ImEye } from "react-icons/im";
import { ImEyeBlocked } from "react-icons/im";
import {useNavigate} from "react-router-dom"
import { useContext } from "react";
import { userDataContext } from "../context/UserContext.jsx";
import axios from "axios"


const SignUp = () => {

  const [showPassword, setShowPassword] = useState(false)
  const navigate = useNavigate()
  const [Name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const {serverUrl} = useContext(userDataContext)
  const [err, setErr] = useState("")
  const [loading, setLoading] = useState(false)


  const handleSignUp = async (e) => {
    e.preventDefault()
    setErr("")
    setLoading(true)
    try {
      let result = await axios.post(`${serverUrl}/api/auth/signup`,{
        Name,email,password                            
      },{withCredentials:true})
      
      setLoading(false)
      console.log(result.data)
    } catch (error) {
      console.log(error)
      setErr(error.response.data.message)
      setLoading(false)
      
    }
  }

  return (
    <div
    
      className="w-full h-screen flex items-center justify-center px-4"
      style={{
        backgroundImage: `url(${authBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <form className="w-[90%] max-w-lg bg-white/10 backdrop-blur-xl 
      border border-white/20 shadow-2xl shadow-blue-900/50 
      rounded-3xl flex justify-center items-center flex-col 
      px-8 py-10 gap-6" onSubmit={handleSignUp}>

        {/* Heading */}
        <h1 className="text-3xl font-bold text-white tracking-wide">
          SignUp to{" "}
          <span className="text-blue-400 drop-shadow-lg">
            Virtual Assistant
          </span>
        </h1>

        {/* Input Fields */}
        <input
          type="text"
          placeholder="Enter Your Name"
          className="w-full px-5 py-3 rounded-xl bg-black/40 
          text-white placeholder-gray-300 outline-none 
          border border-transparent focus:border-blue-400 
          focus:ring-2 focus:ring-blue-500 transition"
          required
          value={Name}
          onChange={(e)=>setName(e.target.value)}
        />

        <input
          type="email"
          placeholder="Enter your email"
          className="w-full px-5 py-3 rounded-xl bg-black/40 
          text-white placeholder-gray-300 outline-none 
          border border-transparent focus:border-blue-400 
          focus:ring-2 focus:ring-blue-500 transition"
          required
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
        />

        <div className="w-full relative">

        
        <input
          type={showPassword ? "text" : "password"}
          placeholder="Enter your password"
          className="w-full px-5 py-3 rounded-xl bg-black/40 
          text-white placeholder-gray-300 outline-none 
          border border-transparent focus:border-blue-400 
          focus:ring-2 focus:ring-blue-500 transition "
          required
          value={password}
          onChange={(e)=>setPassword(e.target.value)}

          />
  

           {!showPassword && <ImEye className="absolute top-4 right-5 text-gray-300 text-xl cursor-pointer" onClick={()=>setShowPassword(true)}/> }

            {showPassword && <ImEyeBlocked  className="absolute top-4 right-5 text-gray-300 text-xl cursor-pointer" onClick={()=>setShowPassword(false)}/> }

          
          
          </div>

          {err.length> 0 && <p className="text-red-500">{err}</p>}

        {/* Button */}
        <button
          className="w-full py-3 rounded-xl bg-blue-500 
          hover:bg-blue-600 active:scale-95 
          transition font-semibold text-white shadow-lg 
          shadow-blue-600/40 cursor-pointer"
          disabled={loading}
        >
          {loading ? "Loading..." : "Sign Up"}
        </button>
        <p onClick={()=>navigate("/login")} className="text-gray-300 cursor-pointer">Already have an account ? <span className="font-bold text-blue-300 
          hover:text-blue-400 ">Login</span> </p>
      </form>
    </div>
  );
};

export default SignUp;

