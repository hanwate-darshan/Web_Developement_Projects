import React from 'react'
import Home from './pages/Home.jsx'
import SignUp from './pages/SignUp.jsx'
import Login from './pages/Login.jsx'
import {Route,Routes} from "react-router-dom"


const App = () => {
  return (
    <div>
      
      <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/login" element={<Login />} />
      
    </Routes>
    </div>
  )
}

export default App
