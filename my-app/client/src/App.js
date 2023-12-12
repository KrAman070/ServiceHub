
import {BrowserRouter,Routes,Route}from "react-router-dom"
import Registration from './components/ServicemenRegistration.';
import Services from './components/allservices';
import { Booking } from "./components/booking";
import Navbar from "./components/Navbar";
import Home from "./components/Home.js";
import Login from "./components/Login.js";
import Signup from './components/Signup';
 
function App() {
  return (
    <BrowserRouter>
    <Navbar />
    <Routes>
      <Route path="/" element={<Home />}/>
      <Route path="/registration" element={<Registration />}/>
      <Route path="/login" element={<Login />}/>
      <Route path="/signup" element={<Signup />}/>
      <Route path="/services" element={<Services />} />
      <Route path="/booking" element={<Booking />} />
    </Routes>
  </BrowserRouter>
  );
}

export default App;
