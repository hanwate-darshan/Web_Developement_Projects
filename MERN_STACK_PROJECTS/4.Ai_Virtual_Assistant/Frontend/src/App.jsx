import React, { useContext } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import SignUp from './pages/SignUp.jsx'
import Login from './pages/Login.jsx'
import Customized from './pages/Customized.jsx'
import { userDataContext } from './context/UserContext.jsx'
import Home from './pages/Home.jsx'
import Customized1 from './pages/Customized2.jsx'


const App = () => {
  const {userData,setUserData} = useContext(userDataContext)
  return (
    <div>
      <Routes>
        <Route path="/" element={(userData?.assistantImage && userData?.assistantName)? <Home /> : <Navigate to={"/customize"} />} />
        <Route path="/signup" element={!userData? <SignUp />: <Navigate to={"/customize"} />} />
        <Route path="/login" element={!userData? <Login /> : <Navigate to={"/"} />} />
        <Route path="/customize" element={userData?<Customized />:<Navigate to={"/login"} />} />
        <Route path='/customize2' element={userData?<Customized1 />:<Navigate to={"/login"} />} />
      </Routes>
    </div>
  )
}

export default App
