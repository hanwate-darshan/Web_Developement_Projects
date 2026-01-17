import { Routes, Route, useNavigate , Navigate} from "react-router-dom";
import Signup from "./pages/Signup.jsx";
import Login from "./pages/Login.jsx";
import Home from "./pages/Home.jsx";
import ListingPage1 from "./pages/ListingPage1.jsx";
import ListingPage2 from "./pages/ListingPage2.jsx";
import ListingPage3 from "./pages/ListingPage3.jsx";
import { useContext } from "react";
import { userDataContext } from "./context/UserContext.jsx";

function App() {

  let {userData} = useContext(userDataContext)
  let navigate = useNavigate()

  return (
    <>
  
 <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/listingpage1" element={userData!= null ? <ListingPage1 />: <Navigate to={'/login'} /> }/>
      <Route path="/listingpage2" element={userData!= null ? <ListingPage2 />: <Navigate to={'/login'} /> }/>
      <Route path="/listingpage3" element={userData!= null ? <ListingPage3 />: <Navigate to={'/login'} /> }/>
    </Routes>

        
    </>
  )
}

export default App
