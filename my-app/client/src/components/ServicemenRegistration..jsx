import React, {useState,useEffect} from "react";
import './servicemenRegistration.css';
const Registration = () => {
  const [user,setUser]=useState({
    email:"",password:"",cpassword:"",fname:"",lname:"",phone:"",service:"",gender:"",city:""
  });
  let name,value;
  const handleInputs=(e)=>{
    console.log(e);
    name=e.target.name;
    value=e.target.value;
    setUser({...user,[name]:value});
  }
  const PostData=async(e)=>{
    e.preventDefault();
    const {email,password,cpassword,fname,lname,phone,service,gender,city}=user;
    try{
    const res=await fetch("/register",{
      method:"POST",
      headers:{
        "Content-type":"application/json"
      },
      body:JSON.stringify({
        email,password,cpassword,fname,lname,phone,service,gender,city
      })
    });
    if (!res.ok) {
      window.alert("Invalid Registration check Email or Password");
      console.error("Invalid Registration");
      return;
    }
    const data=await res.json();
    if(data.status===422||data.status===402||!data){
      window.alert("Invalid Registration ");
      console.log("Invalid Registration");
    }
    else{
      window.alert("Successful Registration");
      console.log("successful Registration");
      // history.push("/")
    }
  } catch(error){
    console.error("Network error:", error);
    window.alert("Network error. Please try again later.");
  }
}
    return(
        <>
        <div className="main">
            <div className="heading"><p>Servicemen Registration Form </p></div>
            <div className="form_wrapper">
  <div className="form_container">
    <div className="title_container">
      <h2>Enter your details </h2>
    </div>
    <div className="row clearfix">
      <div className="">
        <form method="POST" className="register-form" id="register-form">
          <div className="input_field">
            {" "}
            <span>
              <i aria-hidden="true" className="fa fa-envelope" />
            </span>
            <input type="email" name="email" placeholder="Email" required="" value={user.email} onChange={handleInputs} />
          </div>
          <div className="input_field">
            {" "}
            <span>
              <i aria-hidden="true" className="fa fa-lock" />
            </span>
            <input
              type="password"
              name="password"
              placeholder="Password"
              required=""
              value={user.password} onChange={handleInputs}
            />
          </div>
          <div className="input_field">
            {" "}
            <span>
              <i aria-hidden="true" className="fa fa-lock" />
            </span>
            <input
              type="password"
              name="cpassword"
              placeholder="Re-type Password"
              required=""
              value={user.cpassword} onChange={handleInputs}
            />
          </div>
          <div className="input_field">
            {" "}
            <span>
              <i aria-hidden="true" className="fa fa-envelope" />
            </span>
            <input type="Phone" name="phone" placeholder="Phone" required="" value={user.phone} onChange={handleInputs} />
          </div>
          <div className="row clearfix">
            <div className="col_half">
              <div className="input_field">
                {" "}
                <span>
                  <i aria-hidden="true" className="fa fa-user" />
                </span>
                <input type="text" name="fname" placeholder="First Name" value={user.fname} onChange={handleInputs} />
              </div>
            </div>
            <div className="col_half">
              <div className="input_field">
                {" "}
                <span>
                  <i aria-hidden="true" className="fa fa-user" />
                </span>
                <input
                  type="text"
                  name="lname"
                  placeholder="Last Name"
                  required=""
                  value={user.lname} onChange={handleInputs}
                />
              </div>
            </div>
          </div>
          <div className="input_field select_option">
            <select name="service"  required="" 
            value={user.service} onChange={handleInputs}>
              <option>Select the service</option>
              <option>Carpenter</option>
              <option>Plumber</option>
              <option>Electrician</option>
              <option>Mason</option>
              <option>Gardener</option>
               <option>Housekeeper</option>

            </select>
          </div>
          <div className="input_field select_option">
            <select name="gender"  required=""
                  value={user.gender} onChange={handleInputs}>
              <option>Select Gender</option>
              <option>Male</option>
              <option>Female</option>
              <option>Prefer not to say</option>
            </select>
          </div>
          <div className="input_field select_option">
            <select name="city"  required=""
                  value={user.city} onChange={handleInputs}>
              <option>Select city</option>
              <option>Hamirpur</option>
              <option>Kangra</option>
              <option>Palampur</option>
            </select>
          </div>
          <div className="input_field checkbox_option">
          <label htmlFor="cb1">I agree with terms and condition</label>
          <input type="checkbox" id="cb1" />
          </div>
          <div className="submit">
          <input type="submit" name="register" id="register" value="Register" onClick={PostData} defaultValue="Register"/>
          </div>
        </form>
      </div>
    </div>
  </div>
</div>

        </div>
        </>

    )};
    export default Registration;