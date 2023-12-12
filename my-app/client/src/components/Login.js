import React from 'react'
import { NavLink } from 'react-router-dom'
import { useState } from 'react'
import "./Login.css"

const Login = () => {
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
    if(data.status===422||data.status===402||!data){
      window.alert("Invalid Login ");
      console.log("Invalid Login");
    }
    else{
      window.alert("Successful Login");
      console.log("successful Login");
      // history.push("/")
    }

  }

  return (

    <>
      <section className='sign-in'>
        <div className='container mt-5'>
          <div className='signin-content'>
            {/* <div className='signin-image'>
                <NavLink to="/signup" className="signup-image-link"> Create An Account</NavLink>
            </div> */}
            <div className='signin-form'>
              <h2 className='form-title'>
                Signin
              </h2>
              <form method="POST" className='register-form' id='register-form'>
                
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
                  <input type="submit" name="signin" id="signin" className='form-submit' value="signin" onClick={checkSign}>
                    
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

export default Login
// import React from 'react'

// const Login = () => {
//   return (
//     <div>
//       <h1>login</h1>
      
//     </div>
//   )
// }

// export default Login

