import React, { useContext, useState } from "react";
import logo from "../assets/logo.svg";
import { useNavigate } from "react-router-dom";
import { authDataContext } from "../context/AuthContext.jsx";
import axios from "axios";


const Login = () => {
   
  
    const [email, setEmailName] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)
    const [err, setErr] = useState("")
    
       
    let navigate = useNavigate()
    let {serverUrl} = useContext(authDataContext)

    const handleLogin = async (e) =>{
        setLoading(true)
        e.preventDefault();
        try {
            let result = await axios.post(serverUrl + "/api/auth/login",{
                email,
                password
            },{withCredentials:true})
            console.log(result)
            setErr("")
            setLoading(false)
           
            setEmailName("")
            setPassword("")
            

        } catch (error) {
            // console.log(error)
            setLoading(false)
            setErr(error.response.data.message)
        }
    }

  return (
    <div className="w-full min-h-screen bg-[#f3f2ef] flex flex-col items-center">
      
      {/* Header */}
      <div className="w-full max-w-6xl px-6 py-6">
        <img src={logo} alt="LinkedIn Logo" className="h-8 cursor-pointer" />
      </div>

      {/* Signup Card */}
      <div className="w-[90%] max-w-md bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-semibold text-gray-900 mb-1">
          Join LinkedIn
        </h2>
        <p className="text-sm text-gray-600 mb-6">
          Make the most of your professional life
        </p>

        <form className="flex flex-col gap-4" onSubmit={handleLogin}>
          

         

          <input
          onChange={(e)=>setEmailName(e.target.value)}
          value={email}
            type="email"
            placeholder="Email"
            className="border border-gray-400 rounded px-3 py-2 focus:outline-none focus:border-[#0A66C2]"
            required
          />

          <input
          onChange={(e)=>setPassword(e.target.value)}
          value={password}
            type="password"
            placeholder="Password (6+ characters)"
            className="border border-gray-400 rounded px-3 py-2 focus:outline-none focus:border-[#0A66C2]"
            required
          />

          <p className="text-xs text-gray-500">
            By clicking Agree & Join, you agree to the LinkedIn User Agreement,
            Privacy Policy, and Cookie Policy.
          </p>
           {err && <p className="text-red-500"> {err} </p>}
          <button
            disabled={loading}
            type="submit"
            className="bg-[#0A66C2] text-white py-2 rounded-full font-semibold hover:bg-[#004182] transition cursor-pointer"
          >
           {loading ? "Loading..": "Login" } 
          </button>
        </form>

        <div className="text-center mt-6 text-sm">
          <span className="text-gray-600">want to create a new account</span>{" "}
          <a href="#" className="text-[#0A66C2] font-semibold hover:underline" onClick={()=>navigate("/signup")}>
            Sign up
          </a>
        </div>
      </div>
    </div>
  );
}

export default Login