import React from 'react'
import {useState,useEffect} from "react";
import { Link,useLocation,useNavigate } from "react-router-dom";

export const Booking = (props) => {
    const location=useLocation();
    const data=location.state?.data1;
    const id = location.state?.data1?._id;
    // console.log(id);
    const fullName=data? `${data.fname} ${data.lname}`:"";
    const city=data?.city;
    const serviceName=data?.service;
    const [isbooked, setisbooked] = useState(false);
    const navigate=useNavigate();
    const handleBookNow = async () => {
      console.log('handleBookNow function called');
      try{
        const id1=id;
        // console.log("hi id");
        // console.log(id)
        const result=await fetch(`/api/update/${id1}`,{
          method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          isbooked: true,
        }),
      });
      // console.log('API response:', result);
      if (result.ok) {
        window.alert("booking successful");
        navigate('/');
        
      } else {
        console.error('Error updating booking status', result.status);
        window.alert("well not");
        console.log('Navigating to /login');
        navigate('/services');
      }
      setisbooked(true);
      }
      catch(err){
        window.alert("well not from catch");
console.log(err);
      }
    }
  return (
    <>
  <link
    href="https://maxcdn.bootstrapcdn.com/bootstrap/4.1.1/css/bootstrap.min.css"
    rel="stylesheet"
  />
  <link href="" rel="stylesheet" />
  <style
    dangerouslySetInnerHTML={{
      __html:
        "body {\nbackground-image: linear-gradient(to right, rgb(244, 244, 244),rgb(38, 85, 239))\n}\n\n.section {\n    position: relative;\n    height: 100vh;\n}\n\n.section .section-center {\n    position: absolute;\n    top: 50%;\n    left: 0;\n    right: 0;\n    -webkit-transform: translateY(-50%);\n    transform: translateY(-50%);\n}\n\n#booking {\n    font-family: 'Raleway', sans-serif;\n}\n\n.booking-form {\n    position: relative;\n    max-width: 642px;\n    width: 100%;\n    margin: auto;\n    padding: 40px;\n    overflow: hidden;\n    background-image: url('https://www.helpsafetyservices.com/helpss/wp-content/uploads/2019/09/two-construction-workers-1404x702.jpg');\n    background-size: cover;\n    border-radius: 5px;\n    z-index: 20;\n}\n\n.booking-form::before {\n    content: '';\n    position: absolute;\n    left: 0;\n    right: 0;\n    bottom: 0;\n    top: 0;\n    background: rgba(0, 0, 0, 0.7);\n    z-index: -1;\n}\n\n.booking-form .form-header {\n    text-align: center;\n    position: relative;\n    margin-bottom: 30px;\n}\n\n.booking-form .form-header h1 {\n    font-weight: 700;\n    text-transform: capitalize;\n    font-size: 42px;\n    margin: 0px;\n    color: #fff;\n}\n\n.booking-form .form-group {\n    position: relative;\n    margin-bottom: 30px;\n}\n\n.booking-form .form-control {\n    background-color: rgba(255, 255, 255, 0.2);\n    height: 60px;\n    padding: 0px 25px;\n    border: none;\n    border-radius: 40px;\n    color: #fff;\n    -webkit-box-shadow: 0px 0px 0px 2px transparent;\n    box-shadow: 0px 0px 0px 2px transparent;\n    -webkit-transition: 0.2s;\n    transition: 0.2s;\n}\n\n.booking-form .form-control::-webkit-input-placeholder {\n    color: rgba(255, 255, 255, 0.9);\n}\n\n.booking-form .form-control:-ms-input-placeholder {\n    color: rgba(255, 255, 255, 0.5);\n}\n\n.booking-form .form-control::placeholder {\n    color: rgba(255, 255, 255, 0.5);\n}\n\n.booking-form .form-control:focus {\n    -webkit-box-shadow: 0px 0px 0px 2px #ff8846;\n    box-shadow: 0px 0px 0px 2px #ff8846;\n}\n\n.booking-form input[type=\"date\"].form-control {\n    padding-top: 16px;\n}\n\n.booking-form input[type=\"date\"].form-control:invalid {\n    color: rgba(255, 255, 255, 0.5);\n}\n\n.booking-form input[type=\"date\"].form-control+.form-label {\n    opacity: 1;\n    top: 10px;\n}\n\n.booking-form select.form-control {\n    -webkit-appearance: none;\n    -moz-appearance: none;\n    appearance: none;\n}\n\n.booking-form select.form-control:invalid {\n    color: rgba(255, 255, 255, 0.5);\n}\n\n.booking-form select.form-control+.select-arrow {\n    position: absolute;\n    right: 15px;\n    top: 50%;\n    -webkit-transform: translateY(-50%);\n    transform: translateY(-50%);\n    width: 32px;\n    line-height: 32px;\n    height: 32px;\n    text-align: center;\n    pointer-events: none;\n    color: rgba(255, 255, 255, 0.5);\n    font-size: 14px;\n}\n\n.booking-form select.form-control+.select-arrow:after {\n    content: '\\279C';\n    display: block;\n    -webkit-transform: rotate(90deg);\n    transform: rotate(90deg);\n}\n\n.booking-form select.form-control option {\n    color: #000;\n}\n\n.booking-form .form-label {\n    position: absolute;\n    top: -10px;\n    left: 25px;\n    opacity: 0;\n    color:rgb(38, 85, 239);\n    font-size: 11px;\n    font-weight: 700;\n    text-transform: uppercase;\n    letter-spacing: 1.3px;\n    height: 15px;\n    line-height: 15px;\n    -webkit-transition: 0.2s all;\n    transition: 0.2s all;\n}\n\n.booking-form .form-group.input-not-empty .form-control {\n    padding-top: 16px;\n}\n\n.booking-form .form-group.input-not-empty .form-label {\n    opacity: 1;\n    top: 10px;\n}\n\n.booking-form .submit-btn {\n    color: #fff;\n    background-color: rgb(38, 85, 239);\n    font-weight: 700;\n    height: 60px;\n    padding: 10px 30px;\n    width: 100%;\n    border-radius: 40px;\n    border: none;\n    text-transform: uppercase;\n    font-size: 16px;\n    letter-spacing: 1.3px;\n    -webkit-transition: 0.2s all;\n    transition: 0.2s all;\n}\n\n.booking-form .submit-btn:hover,\n.booking-form .submit-btn:focus {\n    opacity: 0.9;\n}"
    }}
  />
  <div id="booking" className="section">
    <div className="section-center">
      <div className="container">
        <div className="row">
          <div className="booking-form">
            <div className="form-header">
              <h1>Make your Booking</h1>
            </div>
            <form>
              <div className="form-group">
              {data? (
        <div>
             <h3 style={{color: "white",fontFamily:"monospace"}}>Name: {fullName}</h3>
          <h3 style={{color: "white",fontFamily:"monospace"}}>Service: {serviceName}</h3>
          <h3 style={{color: "white",fontFamily:"monospace"}}>City: {city}</h3>
        </div>
      ) : (
        <p>No booking details available.</p>
      )}
              </div>
              <div className="row">
                <div className="col-md-6">
                  <div className="form-group">
                    <input className="form-control" type="date" required="" />
                    <span className="form-label">start Date</span>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <input className="form-control" type="date" required="" />
                    <span className="form-label">End date</span>
                  </div>
                </div>
              </div>
              <div className="row">
              <div className="col-md-6">
                  <div className="form-group">
                    <input
                      className="form-control"
                      type="email"
                      placeholder="Enter your site Address"
                    />
                    <span className="form-label">address</span>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <input
                      className="form-control"
                      type="email"
                      placeholder="Enter your pin code"
                    />
                    <span className="form-label">pincode</span>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6">
                  <div className="form-group">
                    <input
                      className="form-control"
                      type="email"
                      placeholder="Enter your Email"
                    />
                    <span className="form-label">Email</span>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <input
                      className="form-control"
                      type="tel"
                      placeholder="Enter your Phone"
                    />
                    <span className="form-label">Phone</span>
                  </div>
                </div>
              </div>
              <div className="form-btn">
                <button className="submit-btn" onClick={handleBookNow}>Book Now</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
  <a target="_blank" href="https://gosnippets.com" className="white-mode">
    MORE
  </a>
</>
  )
}
