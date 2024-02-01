import React,{useState,useEffect} from "react";
import { Link,Navigate,useNavigate } from "react-router-dom";
import './allservices.css';
import img1 from '../media/E1.jpg';
import img2 from '../media/E2.webp';
import img3 from '../media/E3.webp';
import img4 from '../media/ss.jpg'
import Datepicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {FaCalendarAlt} from 'react-icons/fa' 
import serviceDetails from "./DetailofServices";
import { Country, State, City }  from 'country-state-city';
import Star from "./Star";
import { useSelector } from "react-redux";
import toast from 'react-hot-toast';
import { backendUrl } from "../App";
const Services=()=>{


  let isLogin=useSelector(state=>state.isLogin);
  isLogin=isLogin|| localStorage.getItem("userId");
  const [category,setCategory]=useState({
    service:"",city:"",country:"",state:""
  });
  const [additionalDetails, setAdditionalDetails] = useState("");
  let name,value;
  const handleInputs=(e)=>{
    name=e.target.name;
    value=e.target.value;
    setCategory({...category,[name]:value});
  }
  const [country,setCountry]=useState(Country.getAllCountries());
  const id1=category.country;
  const id2=category.state;
  const [state,setState]=useState([]);
  useEffect(() => {
  const res=State.getStatesOfCountry(id1);
    setState(res);
  },[id1]);
  const [city,setCity]=useState([]);
  useEffect(() => {
    const res=City.getCitiesOfState(id1,id2);
      setCity(res);
    },[id1,id2]);
  const handleAdditionalDetails = (e) => {
    setAdditionalDetails(e.target.value);
  };
  const [data,setData]=useState([]);
  const [data1,setData1]=useState([]);
  useEffect(()=>{
    fetch(`${backendUrl}/getdata`,{
      method:"GET",
    })
    .then((res)=>res.json())
    .then((data)=>{
      setData(data.data);
    });      
  },[]);
  const filterData=(catItem1,catItem2,catItem3)=>{
    const result=data.filter((curData)=>{
      return curData.service===catItem1 && curData.city===catItem2 && curData.isbooked==false;
    });
    setData1(result);
  }
  //feedback form show
  const [showFeedbackForm, setShowFeedbackForm] = useState([]);
  useEffect(() => {
    setShowFeedbackForm(data1.map(() => false));
  }, [data1]);
  const toggleFeedbackForm = (index,labourId) => {
    setShowFeedbackForm((prevVisibility) =>
      prevVisibility.map((visibility, i) => (i === index ? !visibility : visibility))
    );
  
  };
  const [newFeedback, setNewFeedback] = useState("");
  console.log(newFeedback);
  const handleFeedbackSubmit = async(event,id) => {
    event.preventDefault();
    // const userName=localStorage.getItem("name");
    const res=await fetch(`${backendUrl}/feedback`,{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
        feedbacks:newFeedback,
        // userName:userName,
        labourId:id
      })
    });
    if (data.status === 422 ||data.status===500 || !data) {
      toast.error("error while submiting feedback");
      console.log("error while submiting feedback")
    }
    else {
     toast.success("Feedback added succesfully");
      console.log("Feedback added succesfully");
    }
  }
  console.log(data1);
  const navigate = useNavigate();
    return (
        <>
        <div className="main">
            <div className="heading1">
                <h1>Services Offered</h1>
            </div> 
            <div className="content">
                <div className="landing">
                    <div className="img1"  >
                        <img src={img1} style={{width:"100%" ,height:"100%"}}></img>
                    </div>
                    <div className="img1" >
                        <img src={img2} style={{width:"100%" ,height:"100%"}}></img>
                    </div>
                    <div className="img1" >
                        <img src={img3} style={{width:"100%" ,height:"100%"}}></img>
                    </div>
                </div>
                <div className="work">
                <div className="work1"><h1>How it works</h1></div>
                <div className="work2">
                    <h2>How to book your nearest servicemen</h2>
                   <div className="dis">
                   <div className="w1">
                    <h3>Fill the details</h3>
                    <p>Tell us about the work & when you want it to be done.</p>
                   </div>
                   <div className="w2">
                   <h3>Select the availability</h3>
                    <p>we help you to find the nearest available worker.</p>
                   </div>
                   <div className="w3">
                   <h3>Login & Book</h3>
                    <p>Login to book the service.</p>
                   </div>
                   </div>
                </div>
                </div>
               <div className="formdetails">
                <div className="head1">Book your slot</div>
                <div className="details1">
                <form method="POST" className="register-form1" id="register-form">
                <div className="input_field select_option">
            <select name="service"  required="" 
             value={category.service} onChange={handleInputs}>
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
                <select name="additionalDetails" value={additionalDetails}
                  onChange={handleAdditionalDetails}>
      <option>{category.service?`Your ${category.service} wants to know some details about the work`:'Description of work'}</option>
      {
      category.service&&serviceDetails.find((service) => service.value === category.service)
        ?.details.map((detail) => (
          <option key={detail} value={detail}>
            {detail}
          </option>
        ))}
         </select>
              </div>
            
            {/* country */}
          <div className="input_field select_option">
            <select name="country"  required=""
             value={category.country} onChange={handleInputs}
                >
              <option>--Select country--</option>
              {country.map((country,isoCode)=>(
                <option key={isoCode} value={country.isoCode} >{country.name}</option>
             
              ))}
            </select>
          </div>
          {/* state */}
          <div className="input_field select_option">
            <select name="state"  required=""
              value ={category.state} onChange={handleInputs}
                >
              <option>--Select state--</option>
              {state.map((state,isoCode)=>(
                <option key={isoCode} value={state.isoCode} >{state.name}</option>
              ))}
            </select>
          </div>
          {/* city */}
          <div className="input_field select_option">
            <select name="city"  required=""
             value={category.city} onChange={handleInputs}
                >
              <option>--Select city--</option>
              {city.map((city,isoCode)=>(
                <option key={isoCode} value={city.isoCode} >{city.name}</option>
              ))}
            </select>
          </div>
          {/* <div className="dater">
           <input name="date" type="date" onChange={e=>setDate(e.target.value)}></input>
          </div> */}
          <div className="submit1 mt-4">
  <button
    type="button" id="submit1" onClick={() => filterData(category.service, category.city)}> Check Availability</button>
</div>
          </form>
                </div>
               </div>
            </div>
            <div className="data_display" >
            {data1.map((i,index)=>{
              return (
               <div className="datadspl1">
                <div className="datadspl">
               <div className="img2">
                <img src={img4}></img>
               </div>
               <div className="details">
                <div className="prf">{i.service}</div>
                <div className="int">
                <ul>
                  <h2>{i.fname+"  "+i.lname}</h2>
                  <p>{i.city}</p>
                  <p style={{color:'grey'}}>{i.verified?'verified':'Not verified'}</p>
                  {/* <p>{i.rating}</p> */}
                  <h3><Star star={i.rating}></Star></h3>
                </ul>
                </div>
               
               <div className="bttn">
               <button className="book-now"onClick={() =>{
               if(isLogin){ navigate('/booking', { state: { data1: i } })}
              else {alert('Please login before booking') ;
              navigate('/login');}}
               }>Book Now</button>
                <button className="book-now"onClick={()=>toggleFeedbackForm(index)}>Rating</button>
               </div>
               </div>
               </div>
               <div><button className="feedback" onClick={()=>toggleFeedbackForm(index)}>show feedback and ratings</button> 
               </div> 
                {showFeedbackForm[index]&& (
                <div className="feedback-form">
                  <h1>Feedbacks</h1>
                  {(!i.feedback|| i.feedback.length===0) ?(<div>No feedbacks yet</div>):
                    (i.feedback.map((feedback,feedbackIndex) => (
                     
                        <div className="feedback-display" key={feedbackIndex}>
                          <div className="feedback-name"><span>UserName :</span> <p>{feedback.userName}</p></div>
                          <div className="feedback-rating"><span>Comments :</span><p>{feedback.comment}</p></div>
                          <div className="feedback-comment"><span>Date :</span><p>{feedback.dateOfComment}</p></div>
                        </div>
                      ))
                    )}
                  <h1>Add Feedback</h1>
                  <form onSubmit={(event)=>handleFeedbackSubmit(event,i._id)}>
                  <input type="text" value={newFeedback} onChange={e => setNewFeedback(e.target.value)} />
    <button type="submit" onClick={()=>{if(!isLogin){
      toast.error("Please login before submitting feedback");
      navigate('/login')}}}>Submit Feedback</button>
                           </form>
                  </div>
                )}
              
               </div>
              )
            })}
        </div>
        </div>
        
        </>
    );
}
export default Services;