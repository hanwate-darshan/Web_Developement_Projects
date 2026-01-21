import React from 'react'
import { Route, Routes } from 'react-router-dom'
import SignUp from './pages/SignUp.jsx'
import Login from './pages/Login.jsx'

const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/signup' element={<SignUp />}/>
        <Route path='/login' element={<Login />}/>
      </Routes>
    </div>
  )
}

export default App
