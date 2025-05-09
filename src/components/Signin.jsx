import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { FaEye, FaEyeSlash, FaEnvelope, FaLock } from 'react-icons/fa'; // Importing Font Awesome icons for visibility toggle and input fields

const Signin = () => {
  // React useState hooks for state management of variables
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false); // State to control password visibility
  const [error, setError] = useState("");
  const [loading, setLoading] = useState("");

  // create instance for useNavigate
  const navigate = useNavigate();

  // sign in submit function
  const submit = async (e) => {
    e.preventDefault();
    setLoading("Please wait as we log you in.........");

    try {
      const formdata = new FormData();
      formdata.append("email", email);
      formdata.append("password", password);

      const response = await axios.post("https://lewis44.pythonanywhere.com/api/signin", formdata);

      setLoading("");

      if (response.data.user) {
        localStorage.setItem("user", JSON.stringify(response.data.user));
        navigate("/");
      } else {
        setError(response.data.message);
        console.log(response);
      }
    } catch (error) {
      setLoading("");
      setError(error.message);
      console.log(error);
    }
  };

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <div className="row justify-content-center mt-4 my">
      <div className="col-md-6 card shadow p-4">
        <form onSubmit={submit}>
          <img src="/images/signin.png" alt="" width="50px" />
          <h2 className="we text-light mt-2">
            <b>Sign In</b>
          </h2>
          <h5 className="text-warning">{loading}</h5>
          <h5 className="text-danger">{error}</h5>

          {/* Email input field with icon */}
          <div className="input-group mb-3">
            <span className="input-group-text"><FaEnvelope /></span>
            <input
              type="email"
              className="form-control text"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Password field with icon and visibility toggle */}
          <div className="input-group mb-3">
            <span className="input-group-text"><FaLock /></span>
            <input
              type={passwordVisible ? "text" : "password"} // Toggle between text and password
              className="form-control text"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="button"
              className="btn btn-outline-secondary"
              onClick={togglePasswordVisibility}
              style={{ borderRadius: "0 4px 4px 0" }}
            >
              {passwordVisible ? <FaEyeSlash /> : <FaEye />} {/* Eye icon changes based on visibility */}
            </button>
          </div>

          {/* Sign in button */}
          <button type="submit" className="sign">
            Continue
          </button>
        </form>

        {/* Options */}
        <p style={{ fontFamily: "Didot" }}>
          New to SoundCheck?
          <br /> <Link to="/Signup">Sign Up</Link>
        </p>
      </div>
    </div>
  );
};

export default Signin;
