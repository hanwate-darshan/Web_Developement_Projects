
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye } from "react-icons/fa";
import { IoMdEyeOff } from "react-icons/io";

import { serverURL } from "../main.jsx";
import axios from "axios"
import { useDispatch, useSelector } from "react-redux";
import { setUserData } from "../redux/userSlice.js";

const Login = () => {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)
    const [err, setErr] = useState(false)
    let dispatch = useDispatch()
    
  
  
    const handleLogin = async (e) => {
      
      e.preventDefault()
      setLoading(true)
      try {
        let result = await axios.post(`${serverURL}/api/auth/login`,
          {
             email, password
          }, { withCredentials: true }
        )
        setErr("")
        setLoading(false)
        setEmail("")
        setPassword("")
        dispatch(setUserData(result.data))
        navigate("/")
      } catch (error) {
        console.log(`frontend Login error ${error}`)
        setLoading(false)
        setErr(error.response.data.message)
      }
    }

  return (
    <div className="w-full min-h-screen bg-linear-to-br from-slate-900 to-slate-800 flex justify-center items-center px-4">
      
      {/* Card */}
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden">

        {/* Header */}
        <div className="h-40 bg-linear-to-r from-pink-500 to-purple-500 flex justify-center items-center rounded-b-[30%]">
          <h1 className="text-3xl font-bold text-white">
            Login to 
            <span className="text-blue-200"> Nano</span>Chat
          </h1>
        </div>

        {/* Form */}
        <form className="p-8 flex flex-col gap-5" onSubmit={handleLogin}>

         
          <input
           value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Email"
            className="w-full h-11 px-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-400 transition"
          />

          {/* Password */}
          <div className="relative">
            <input
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
              type={show ? "text" : "password"}
              placeholder="Password"
              className="w-full h-11 px-4 pr-10 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-400 transition"
            />

            <span
              className="absolute right-3 top-3 text-gray-500 text-xl cursor-pointer"
              onClick={() => setShow((prev) => !prev)}
            >
              {show ? <FaEye /> : <IoMdEyeOff />}
            </span>
          </div>
           

           {err && <p className="text-red-500 text-center font-semibold">{err}</p>}

          <button
          disabled={loading}
            type="submit"
            className="mt-4 w-full h-11 bg-pink-500 hover:bg-pink-600 text-white font-semibold rounded-lg transition cursor-pointer"
          >
            {loading?"Loading..":"Login"}
          </button>

          <p
            className="text-sm text-center text-gray-500 mt-2 cursor-pointer"
            onClick={() => navigate("/signup")}
          >
            want to create a new acccount ?{" "}
            <span className="text-pink-500 font-bold hover:underline">
              Sign Up
            </span>
          </p>

        </form>
      </div>
    </div>
  );
};

export default Login;
