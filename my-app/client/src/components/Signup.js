import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import "./Signup.css"
import { backendUrl } from '../App';


const Signup = () => {
  const navigate = useNavigate();
  

  const [user, setUser] = useState({
    name:"",email:"",password:""
  })
  let name, value;
  const handleInputs = (e) => {
    console.log(e);
    name = e.target.name;
    value = e.target.value;

    setUser({ ...user, [name]: value });
  }
  
  const postData = async (e) => {
    e.preventDefault();
    const { name, email, password,cpassword} = user;
    const res = await fetch(`${backendUrl}/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name, email, password,cpassword
      })


    });
    // if(!res.ok){
    //   window.alert("Invalid Registration check password or Email");
    //   console.log("Invalid Registration")
    // }
    const data = await res.json();
    if (data.status === 422 || !data) {
      window.alert("Invalid Registration");
      console.log("Invalid Registration")
    }
    else {
     toast.success("Registration Successfull trtrdeesd");
      console.log("Registration Successfull");
      navigate('/login');
    }


  }


  return (
    <>
      <section className='signup'>
        <div className='container mt-5'>
          <div className='signup-content'>
            <div className='signup-form'>
              <h2 className='form-title'>
                Sign Up
              </h2>
              <form method="POST" className='register-form' id='register-form'>
                <div className='form-group'>
                  <label htmlFor='name'>
                   <i class="zmdi zmdi-account"></i>

                  </label>
                  <input type='text' name='name' id='name' autoComplete='off'
                    value={user.name}
                    onChange={handleInputs}
                    placeholder='Your Name'
                  ></input>

                </div>

                <div className='form-group'>
                  <label htmlFor='email'>
                   <i class="zmdi zmdi-email"></i>

                  </label>
                  <input type='email' name='email' id='email' autoComplete='off'
                    value={user.email}
                    onChange={handleInputs}
                    placeholder='Your email'
                  ></input>

                </div>


               

                <div className='form-group'>
                  <label htmlFor='Password'>
                   <i class="zmdi zmdi-lock"></i>

                  </label>
                  <input type='password' name='password' id='password' autoComplete='off'
                    value={user.password}
                    onChange={handleInputs}
                    placeholder='Your password'
                  ></input>

                </div>
                 
                <div className='form-group form-button'>
                  <input type="submit" name="signup" id="signup" className='form-submit' value="register" onClick={postData}>
                    
                  </input>

                </div>
              </form>
             </div>
          </div>

        </div>

      </section>
    </>
  )
}

export default Signup
