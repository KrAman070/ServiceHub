import {BrowserRouter as Router,Routes,Route} from "react-router-dom"
import Registration from './components/ServicemenRegistration.';
import Services from './components/allservices';
import { Booking } from "./components/booking";
import Navbar from "./components/Navbar";
import Home from "./components/Home.js";
import Login from "./components/Login.js";
import Signup from './components/Signup';
import React from "react";
import { useState } from "react";
import {useNavigate} from "react-router-dom";
const AuthContext=React.createContext();

function App() {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [userName, setUserName] = useState();
  const [user, setUser] = useState({
    email:"",password:""
  })
  let name, value;
  const handleInputs = (e) => {
    console.log(e);
    name = e.target.name;
    value = e.target.value;
    setUser({ ...user, [name]: value });
  }

  const checkSign = async (e) => {
    e.preventDefault();
    const { email, password} = user;
    const res = await fetch('http://localhost:5000/signin', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email, password
      })
    });
    if (!res.ok) {
      window.alert("Invalid Login check Email or Password");
      console.error("Invalid Login");
      return;
    }
    const data=await res.json();
    const userNameFromRes = data.user.name;
    setUserName(userNameFromRes);
    if(data.status===422||data.status===402||!data){
      window.alert("Invalid Login ");
      console.log("Invalid Login");
    }
    else{
      setLoggedIn(true);
      window.alert("Successful Login");
      console.log("successful Login");
    }

  }
  return (
    <Router>
    <Navbar isLoggedIn={isLoggedIn} userName={userName} setLoggedIn={setLoggedIn}/>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/registration" element={<Registration />}/>
      <Route path="/login" element={<Login user={user}handleInputs={handleInputs} checkSign={checkSign}/>}/>
      <Route path="/signup" element={<Signup />}/>
      <Route path="/services" element={<Services isLoggedIn={isLoggedIn} />} />
      <Route path="/booking" element={<Booking />} />
    </Routes>
  </Router>
  );
}

export default App;
