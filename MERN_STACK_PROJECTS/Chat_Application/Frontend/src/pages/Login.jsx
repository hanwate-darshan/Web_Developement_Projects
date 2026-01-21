

import { useNavigate } from "react-router-dom";
import { FaEye } from "react-icons/fa";
import { IoMdEyeOff } from "react-icons/io";
import { useState } from "react";

const Login = () => {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);

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
        <form className="p-8 flex flex-col gap-5">

         
          <input
            type="email"
            placeholder="Email"
            className="w-full h-11 px-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-400 transition"
          />

          {/* Password */}
          <div className="relative">
            <input
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
            Login
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
