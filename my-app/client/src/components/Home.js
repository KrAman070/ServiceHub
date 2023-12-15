import React from 'react'
import "./Home.css"
import { Link } from 'react-router-dom';
function Home() {
  return (
      <>
  <div className="main11">
  
  </div>
  <div className="c1">
      <h1>
        <span style={{fontFamily:"cursive"}}>S</span>ervice
        <span style={{fontFamily:"cursive"}}>H</span>ub
        </h1>
      <p>Hey there!</p>
      <div className="btn">
      <Link to="/registration" className="button b1">
            Labour Register
          </Link>
          <Link to="/services" className="button b1">
            Book Labour
          </Link>
      </div>
    </div>    
    </>
  )
}

export default Home
// rfce