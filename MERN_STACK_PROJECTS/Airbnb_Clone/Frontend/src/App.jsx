import { Routes, Route } from "react-router-dom";
import Signup from "./pages/Signup.jsx";
import Login from "./pages/Login.jsx";
import Home from "./pages/Home.jsx";
import ListingPage1 from "./pages/ListingPage1.jsx";

function App() {


  return (
    <>
  
 <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/listingpage1" element={<ListingPage1 />} />
    </Routes>

        
    </>
  )
}

export default App
