import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

const Signin = () => {
  //React useState hooks for state management of variables
  const [email, setEmail] = useState("");
const [password,setPassword] = useState("");

  //hooks for the error and loading messages
  const [error, setError] = useState("");
  const [loading, setLoading] = useState("");


  // create instance for useNavigate
  const navigate = useNavigate();

  // sign in submit function
  const submit = async (e) => {
    //prevent reloading of page
    e.preventDefault();
    //loading progress message
    setLoading("Please wait as we log you in.........")

    try {
      //create an instance of FormData object
      const formdata = new FormData();
      //appending/ adding the key withtheir values
      formdata.append("email", email);
      formdata.append("password", password);

      //using axios for HTTP POST request and storing result in response variable
      const response = await axios.post("https://lewis44.pythonanywhere.com/api/signin",formdata)

      //reset loading to an empty string
      setLoading("")

      // check if response contains a user item
      if (response.data.user) {
        // store user in local storage
        localStorage.setItem("user",JSON.stringify(response.data.user))
        // navigate to get products page after user is saved successfully
        navigate("/");

      }
      else{
        setError(response.data.message)
        console.log(response)
      }
   

    } catch (error) {
      setLoading("");
      setError(error.message)
      console.log(error)

    }

  };

  return (
    <div className="row justify-content-center mt-4 my">
      <div className="col-md-6 card shadow p-4">
        <form onSubmit={submit}>
           <img src="/images/signin.png" alt=""
                              width='50px'/> 
          <h2 className="we text-light mt-2"><b>Sign In</b></h2>
          <h5 className="text-warning">{loading}</h5>
          <h5 className="text-danger">{error}</h5>

          {/* email input field */}
          <input type="email"
            className='form-control text'
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
      
          />
          {/* {email} */}

          <br />

          {/* password field */}
          <input type="password"
            className="form-control text"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <br />

          {/* sign in button */}
          <button type="submit"
            className="sign">Continue</button>


        </form>

       
        {/* options */}
        <p style={{fontFamily:"Didot"}}>New to soundCheck?<br /> <Link to='/Signup'>Sign Up</Link></p>

      </div>
    </div>
  )
}

export default Signin;


