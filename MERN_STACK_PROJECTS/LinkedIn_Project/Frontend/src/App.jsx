import { Navigate, Route, Router, Routes } from "react-router-dom"
import Home from "./pages/Home.jsx"
import Signup from "./pages/Signup.jsx"
import Login from "./pages/Login.jsx"
import { useContext } from "react"
import { userDataContext } from "./context/UserContext.jsx"


function App() {
  
  let {userData} = useContext(userDataContext)


  return (
    <>
     <Routes>
      <Route path="/" element={userData ? <Home />: <Navigate  to="/login/"  />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
    </Routes>
    </>
  )
}

export default App
