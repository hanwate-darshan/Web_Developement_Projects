import React, { useContext, useState } from "react";
import { IoMdEye } from "react-icons/io";
import { RiEyeOffFill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { AuthDataContext } from "../context/AuthContext.jsx";
import axios from "axios";
import { userDataContext } from "../context/UserContext.jsx";

const Login = () => {
    const [show, setShow] = useState(false)
    let navigate = useNavigate()
    let {serverUrl} = useContext(AuthDataContext)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    let {userData ,setUserData} = useContext(userDataContext)

    const handleLogin =  async (e) => {
    try {
      e.preventDefault();
      let result =  await axios.post(
        serverUrl + "/api/auth/login",
        {
          
          email,
          password
        },
        { withCredentials: true }
      );
      setUserData(result.data)
      navigate("/")
      console.log(result);
    } catch (error) {
      console.log(`handle Login error ${error}`);
    }
  };


  return (
   <div className="min-h-screen w-full flex items-center justify-center bg-gray-100 px-4">
         
         <form className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 flex flex-col gap-6" onSubmit={handleLogin}>
           
           {/* Heading */}
           <h1 className="text-2xl font-semibold text-gray-900 text-center">
             Login to Airbnb
           </h1>
   
         
   
           {/* Email */}
           <div className="flex flex-col gap-1">
             <label htmlFor="email" className="text-sm font-medium text-gray-700">
               Email
             </label>
             <input
             required
             onChange={(e)=>setEmail(e.target.value)}
             value={email}
               type="email"
               id="email"
               placeholder="Enter your email"
               className="w-full rounded-lg border border-gray-300 px-4 py-2 text-gray-900 outline-none focus:border-black transition"
             />
           </div>
   
           {/* Password */}
           <div className="flex flex-col gap-1 relative">
             <label htmlFor="password" className="text-sm font-medium text-gray-700">
               Password
             </label>
             <input
                
                required
             onChange={(e)=>setPassword(e.target.value)}
             value={password}

               type={show?"text":"password"}
               // type="password"
               id="password"
               placeholder="Create a password"
               className="w-full rounded-lg border border-gray-300 px-4 py-2 text-gray-900 outline-none focus:border-black transition "
             />
            { !show && <IoMdEye className="w-5 h-5 absolute right-3 bottom-3 cursor-pointer" onClick={()=>setShow(prev=>!prev)} />}
             {show &&  <RiEyeOffFill className="w-5 h-5 absolute right-3 bottom-3 cursor-pointer" onClick={()=>setShow(prev => !prev)} />}
   
   
           </div>
   
           {/* Button */}
           <button
             type="submit"
             className="w-full mt-2 bg-[#FF385C] hover:bg-[#e31c5f] text-white font-semibold py-2.5 rounded-lg transition cursor-pointer"
           >
             Login
           </button>
    <p className="text-center cursor-pointer" onClick={()=>navigate('/signup')}>Create New Account : <span className="text-red-500 font-semibold" >Sign Up</span> </p>
           {/* Footer text */}
           <p className="text-xs text-gray-500 text-center leading-relaxed">
             By selecting <span className="font-medium text-gray-700">Continue</span>,
             you agree to Airbnb’s{" "}
             <span className="underline cursor-pointer">Terms of Service</span>,{" "}
             <span className="underline cursor-pointer">Privacy Policy</span> and{" "}
             <span className="underline cursor-pointer">Non-Discrimination Policy</span>.
           </p>
   
         </form>
   
       </div>
  )
}

export default Login
