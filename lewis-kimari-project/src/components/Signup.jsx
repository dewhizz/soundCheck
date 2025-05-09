import { Link } from "react-router-dom"
import { useState } from "react"
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css'
const Signup = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");

    // Hooks for loading success and error messages
    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState("");

    // Submit Function
    // function to handle form submit
    const submit = async (e) => {
        e.preventDefault();
        // console.log(e.type);


        // set loading
        setLoading("Please wait as we upload your data.")




        try {
            // we will use form data
            const formdata = new FormData()
            formdata.append("username", username)
            formdata.append("password", password)
            formdata.append("email", email)
            formdata.append("phone", phone)


            // console.log(formdata)


            // posting the data
            const response = await axios.post('https://lewis44.pythonanywhere.com/api/signup', formdata)


            // console.log(response)


            // reset loading to empty
            setLoading("");
            setSuccess(response.data.message)





            //clear form fields
            setUsername("");
            setEmail("");
            setPassword("");
            setPhone("");

        } catch (error) {
            setLoading("")
            setError(error.message)
        }
    }
    return (
        <div className="row justify-content-center mt-4">
            <div className="col-md-6 card shadow p-4">
                 <form onSubmit={submit} className="form">
                 <img src="/images/signup.png" alt="" width='50px' />
                 <h2 className="we text-light"><b>Create account</b></h2>
                    <h5 className="text-warning">{loading}</h5>
                    <h5 className="text-success">{success}</h5>
                    <h5 className="text-danger">{error}</h5>


                    <input type="text"
                        placeholder="Enter Username"
                        className="form-control text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                    {username}
                    <br />

                    <input type="email"
                        placeholder="Enter email"
                        className="form-control text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    {email}
                    <br />


                    <input type="tel"
                        placeholder="Enter Phone"
                        className="form-control text"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required
                    />
                    {phone}
                    <br />

                    <input type="password"
                        placeholder="Enter Password"
                        className="form-control text"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    {password}
                    <br />




                    <button type="submit" className="sign">Continue</button>

                </form>
                

                <p style={{fontFamily:"didot"}}>Already have an account?<br /> <Link to={'/signin'} >Sign In</Link></p>
            </div>
        </div>
    )
}
export default Signup;
