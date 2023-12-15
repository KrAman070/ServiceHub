import React,{useState,useEffect} from "react";
import { Link,Navigate,useNavigate } from "react-router-dom";
import './allservices.css';
import img1 from '../media/E1.jpg';
import img2 from '../media/E2.webp';
import img3 from '../media/E3.webp';
import Datepicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {FaCalendarAlt} from 'react-icons/fa' 
const Services=({isLoggedIn})=>{
  const [date, setDate] = useState();
  // console.log(date);
  const [category,setCategory]=useState({
    service:"",city:""
  });
  let name,value;
  const handleInputs=(e)=>{
    console.log(e);
    name=e.target.name;
    value=e.target.value;
    setCategory({...category,[name]:value});
  }
  const [data,setData]=useState([]);
  const [data1,setData1]=useState([]);
  useEffect(()=>{
    fetch("/getdata",{
      method:"GET",
    })
    .then((res)=>res.json())
    .then((data)=>{
      setData(data.data);
    });      
  },[]);
  useEffect(() => {
    setData1(data1);
  }, [data1]);
  const filterData=(catItem1,catItem2,catItem3)=>{
    const result=data.filter((curData)=>{
      return curData.service===catItem1 && curData.city===catItem2 && curData.isbooked==false;
    });
    setData1(result);
  }
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
            <select name="city"  required=""
             value={category.city} onChange={handleInputs}
                >
              <option>Select city</option>
              <option>Hamirpur</option>
              <option>Kangra</option>
              <option>Palampur</option>
            </select>
          </div>
          <div className="dater">
           <input name="date" type="date" onChange={e=>setDate(e.target.value)}></input>
          </div>
          <div className="submit1">
  <button
    type="button" id="submit1" onClick={() => filterData(category.service, category.city)}> Check Availability</button>
</div>
          </form>
                </div>
               </div>
            </div>
        </div>
        <div className="data_display" style={{height:300}}>
          <table>
            <tr>
              <th>Service</th>
              <th>Name</th>
              <th>City</th>
              <th>Action</th>
            </tr>
            {data1.map(i=>{
              return (
               <tr key={i._id}>
                <td>{i.service}</td>
               <td>{i.fname+"  "+i.lname}</td>
               <td>{i.city}</td>
               <td><button className="book-now"onClick={() =>{
               if(isLoggedIn){ navigate('/booking', { state: { data1: i } })}
              else {alert('Please login before booking') ;
              navigate('/login');}}
               }>Book Now</button>
               </td>
               </tr> 
              )
            })}
          </table>
        </div>
        </>
    );
}
export default Services;