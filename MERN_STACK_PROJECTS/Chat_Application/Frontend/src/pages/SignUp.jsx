
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
            onChange={(e) => setEmail(e.target.value)}
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
