import React, { useContext, useState } from "react";
import { IoMdEye } from "react-icons/io";
import { RiEyeOffFill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthDataContext } from "../context/AuthContext.jsx";
import { userDataContext } from "../context/UserContext.jsx";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  let navigate = useNavigate();
  let { serverUrl } = useContext(AuthDataContext); 
  let {userData,setUserData} = useContext(userDataContext)

  const handleSignUp =  async (e) => {
    try {
      e.preventDefault();
      let result =  await axios.post(
        serverUrl + "/api/auth/signup",
        {
          name,
          email,
          password
        },
        { withCredentials: true }
      );
      setUserData(result.data)
      console.log(result);
    } catch (error) {
      console.log(`handle sign up error ${error}`);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-100 px-4">
      <form
        className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 flex flex-col gap-6"
        onSubmit={handleSignUp}
      >
        {/* Heading */}
        <h1 className="text-2xl font-semibold text-gray-900 text-center">
          Welcome to Airbnb
        </h1>

        {/* Username */}
        <div className="flex flex-col gap-1">
          <label htmlFor="name" className="text-sm font-medium text-gray-700">
            Username
          </label>
          <input
            required
            onChange={(e) => setName(e.target.value)}
            value={name}
            type="text"
            id="name"
            placeholder="Enter your username"
            className="w-full rounded-lg border border-gray-300 px-4 py-2 text-gray-900 outline-none focus:border-black transition"
          />
        </div>

        {/* Email */}
        <div className="flex flex-col gap-1">
          <label htmlFor="email" className="text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            required
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            type="email"
            id="email"
            placeholder="Enter your email"
            className="w-full rounded-lg border border-gray-300 px-4 py-2 text-gray-900 outline-none focus:border-black transition"
          />
        </div>

        {/* Password */}
        <div className="flex flex-col gap-1 relative">
          <label
            htmlFor="password"
            className="text-sm font-medium text-gray-700"
          >
            Password
          </label>
          <input
            required
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            type={show ? "text" : "password"}
            // type="password"
            id="password"
            placeholder="Create a password"
            className="w-full rounded-lg border border-gray-300 px-4 py-2 text-gray-900 outline-none focus:border-black transition "
          />
          {!show && (
            <IoMdEye
              className="w-5 h-5 absolute right-3 bottom-3 cursor-pointer"
              onClick={() => setShow((prev) => !prev)}
            />
          )}
          {show && (
            <RiEyeOffFill
              className="w-5 h-5 absolute right-3 bottom-3 cursor-pointer"
              onClick={() => setShow((prev) => !prev)}
            />
          )}
        </div>

        {/* Button */}
        <button
          type="submit"
          className="w-full mt-2 bg-[#FF385C] hover:bg-[#e31c5f] text-white font-semibold py-2.5 rounded-lg transition cursor-pointer"
        >
          Continue
        </button>

        <p
          className="text-center cursor-pointer"
          onClick={() => navigate("/login")}
        >
          Already have a Account ?{" "}
          <span className="text-red-500 font-semibold">Login</span>{" "}
        </p>

        {/* Footer text */}
        <p className="text-xs text-gray-500 text-center leading-relaxed">
          By selecting{" "}
          <span className="font-medium text-gray-700">Continue</span>, you agree
          to Airbnb’s{" "}
          <span className="underline cursor-pointer">Terms of Service</span>,{" "}
          <span className="underline cursor-pointer">Privacy Policy</span> and{" "}
          <span className="underline cursor-pointer">
            Non-Discrimination Policy
          </span>
          .
        </p>
      </form>
    </div>
  );
};

export default Signup;
