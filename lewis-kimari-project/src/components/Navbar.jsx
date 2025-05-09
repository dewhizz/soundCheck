import React from 'react'
import { Link } from 'react-router-dom'

const navbar = () => {
  return (
    <div>
        <section className="row">
            <div className="col-md-12">
              {/* Nav element: Container that wraps all contents of the navbar */}
              <nav className="navbar navbar-expand-md  navbar-light">
              <a href="index.html" class="navbar-brand fw-bold">soundCheck <img src="/images/vr.jpeg" alt="" width="60px" /></a>
                {/* Navbar Toggler for responsive design */}
                <button className="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#navbarcollapse">
                  <span className="navbar-toggler-icon"></span>
                </button>

                {/* Division containing navbar links */}
                <div className="collapse navbar-collapse" id="navbarcollapse">
                  <div className="navbar-nav">
                    {/* Correctly using the `to` attribute in Link */}
                    <Link to="/" className="nav-link text"  style={{fontFamily:'didot'}}>Home</Link>
        
                    <Link to="/signin" className="nav-link text " style={{fontFamily:'didot'}}>
                   
                    Sign In</Link>
                    <Link to="/signup" className="nav-link text" 
                     style={{fontFamily:'didot'}} > 
                    
                    Sign Up</Link>
                    <Link to="/getproducts" className="nav-link text"  style={{fontFamily:'didot'}}>Get Products</Link>
                    <Link to="/addproduct" className="nav-link text"  style={{fontFamily:'didot'}}>Add Product</Link>
                    <Link to="/aboutus" className="nav-link text"  style={{fontFamily:'didot'}}>About Us</Link>
                  </div>
                </div>
              </nav>
            </div>
          </section>
    </div>
  )
}

export default navbar