# Real Time Chat Application


## frontend and backend connection || send frontend information to the backend 

## ServerUrl

- main.jsx

```

import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from "react-router-dom";
export const serverURL = "http://localhost:3000";

createRoot(document.getElementById('root')).render(


  <BrowserRouter>
    
      <App />
   
  </BrowserRouter>

)

```



## setup cors -

- index.js


  - import cors form "cors"

```
app.use(cors({
  origin:"http://localhost:5173",
  credentials:true

}))

```








## SignUp and Login Details


- post the user detailed to the server

- SignUp.jsx

create handleSignUp() function and call it to submitting form 

```
import { useNavigate } from "react-router-dom";
import { FaEye } from "react-icons/fa";
import { IoMdEyeOff } from "react-icons/io";
import { useState } from "react";
import axios from "axios"
import { serverURL } from "../main";



const SignUp = () => {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [userName, setUserName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")


  const handleSignUp = async (e) => {
    e.preventDefault()
    try {
      let result = await axios.post(`${serverURL}/api/auth/signup`,
        {
          userName, email, password
        }, { withCredentials: true }
      )
      console.log(result)
    } catch (error) {
      console.log(`frontend signup error ${error}`)
    }
  }

  return (
    <div className="w-full min-h-screen bg-linear-to-br from-slate-900 to-slate-800 flex justify-center items-center px-4">

      {/* Card */}
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden">

        {/* Header */}
        <div className="h-40 bg-linear-to-r from-pink-500 to-purple-500 flex justify-center items-center rounded-b-[30%]">
          <h1 className="text-3xl font-bold text-white">
            Welcome to
            <span className="text-blue-200"> Nano</span>Chat
          </h1>
        </div>

        {/* Form */}
        <form className="p-8 flex flex-col gap-5" onSubmit={handleSignUp}>

          <input
            onChange={(e) => setUserName(e.target.value)}
            value={userName}
            type="text"
            placeholder="Username"
            className="w-full h-11 px-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-400 transition"
          />

          <input
            value={email}
            onChange={(e) => setUserName(e.target.value)}
            type="email"
            placeholder="Email"
            className="w-full h-11 px-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-400 transition"
          />

          {/* Password */}
          <div className="relative">
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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

          <button
            type="submit"
            className="mt-4 w-full h-11 bg-pink-500 hover:bg-pink-600 text-white font-semibold rounded-lg transition cursor-pointer"
          >
            Create Account
          </button>

          <p
            className="text-sm text-center text-gray-500 mt-2 cursor-pointer"
            onClick={() => navigate("/login")}
          >
            Already have an account?{" "}
            <span className="text-pink-500 font-bold hover:underline">
              Login
            </span>
          </p>

        </form>
      </div>
    </div>
  );
};

export default SignUp;

```


- Login.jsx


create HandleLogin() function and call it to submitting form 

```

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye } from "react-icons/fa";
import { IoMdEyeOff } from "react-icons/io";

import { serverURL } from "../main.jsx";
import axios from "axios"

const Login = () => {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)
    const [err, setErr] = useState(false)
  
  
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
        console.log(result)
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

```





