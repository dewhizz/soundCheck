import { Link } from "react-router-dom";
import { useState } from "react";
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';
import { FaUser, FaEnvelope, FaPhone, FaLock, FaCheckCircle, FaTimesCircle, FaEye, FaEyeSlash } from 'react-icons/fa'; // Import icons

const Signup = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");  // Add confirm password state
    const [passwordVisible, setPasswordVisible] = useState(false);  // State for password visibility
    const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);  // State for confirm password visibility

    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState("");

    const [passwordStrength, setPasswordStrength] = useState("");
    const [passwordMatch, setPasswordMatch] = useState(true);  // Track password match

    // Function to check password strength
    const checkPasswordStrength = (pwd) => {
        const hasLetter = /[A-Za-z]/.test(pwd);
        const hasNumber = /\d/.test(pwd);
        const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(pwd);

        if (pwd.length < 6) {
            return "Weak";
        } else if (pwd.length >= 6 && hasLetter && hasNumber && !hasSpecial) {
            return "Average";
        } else if (pwd.length >= 8 && hasLetter && hasNumber && hasSpecial) {
            return "Strong";
        } else {
            return "Weak";
        }
    };

    const handlePasswordChange = (e) => {
        const pwd = e.target.value;
        setPassword(pwd);
        setPasswordStrength(checkPasswordStrength(pwd));

        // Check if the password matches the confirm password
        setPasswordMatch(pwd === confirmPassword);
    };

    const handleConfirmPasswordChange = (e) => {
        const confirmPwd = e.target.value;
        setConfirmPassword(confirmPwd);
        
        // Check if the password matches the confirm password
        setPasswordMatch(password === confirmPwd);
    };

    const submit = async (e) => {
        e.preventDefault();
        setLoading("Please wait as we upload your data.");
        try {
            const formdata = new FormData();
            formdata.append("username", username);
            formdata.append("password", password);
            formdata.append("email", email);
            formdata.append("phone", phone);

            const response = await axios.post('https://lewis44.pythonanywhere.com/api/signup', formdata);

            setLoading("");
            setSuccess(response.data.message);

            setUsername("");
            setEmail("");
            setPassword("");
            setPhone("");
            setConfirmPassword(""); // Reset confirm password
            setPasswordStrength("");
            setPasswordMatch(true);  // Reset password match
        } catch (error) {
            setLoading("");
            setError(error.message);
        }
    };

    return (
        <div className="row justify-content-center mt-4">
            <div className="col-md-6 card shadow p-4">
                <form onSubmit={submit} className="form">
                    <img src="/images/signup.png" alt="" width='50px' />
                    <h2 className="we text-light"><b>Create account</b></h2>
                    <h5 className="text-warning">{loading}</h5>
                    <h5 className="text-success">{success}</h5>
                    <h5 className="text-danger">{error}</h5>

                    {/* Username Input with Icon */}
                    <div className="input-group mb-3">
                        <span className="input-group-text"><FaUser /></span>
                        <input type="text"
                            placeholder="Enter Username"
                            className="form-control text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>

                    {/* Email Input with Icon */}
                    <div className="input-group mb-3">
                        <span className="input-group-text"><FaEnvelope /></span>
                        <input type="email"
                            placeholder="Enter email"
                            className="form-control text"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    {/* Phone Input with Icon */}
                    <div className="input-group mb-3">
                        <span className="input-group-text"><FaPhone /></span>
                        <input type="tel"
                            placeholder="Enter Phone"
                            className="form-control text"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            required
                        />
                    </div>

                    {/* Password Input with Icon and Show/Hide Feature */}
                    <div className="input-group mb-3">
                        <span className="input-group-text"><FaLock /></span>
                        <input 
                            type={passwordVisible ? "text" : "password"}
                            placeholder="Enter Password"
                            className="form-control text"
                            value={password}
                            onChange={handlePasswordChange}
                            required
                        />
                        <span 
                            className="input-group-text cursor-pointer"
                            onClick={() => setPasswordVisible(!passwordVisible)}
                        >
                            {passwordVisible ? <FaEyeSlash /> : <FaEye />}
                        </span>
                    </div>
                    {password && (
                        <small>
                            Password strength: <strong>{passwordStrength}</strong>
                        </small>
                    )}
                    <br />

                    {/* Confirm Password Input with Icon and Show/Hide Feature */}
                    <div className="input-group mb-3">
                        <span className="input-group-text"><FaLock /></span>
                        <input 
                            type={confirmPasswordVisible ? "text" : "password"}
                            placeholder="Confirm Password"
                            className="form-control text"
                            value={confirmPassword}
                            onChange={handleConfirmPasswordChange}
                            required
                        />
                        <span 
                            className="input-group-text cursor-pointer"
                            onClick={() => setConfirmPasswordVisible(!confirmPasswordVisible)}
                        >
                            {confirmPasswordVisible ? <FaEyeSlash /> : <FaEye />}
                        </span>
                    </div>
                    {confirmPassword && (
                        <small>
                            {passwordMatch ? (
                                <span className="text-success"><FaCheckCircle /> Passwords match</span>
                            ) : (
                                <span className="text-danger"><FaTimesCircle /> Passwords do not match</span>
                            )}
                        </small>
                    )}
                    <br />

                    <button type="submit" className="sign" disabled={!passwordMatch || loading}>Continue</button>
                </form>

                <p style={{ fontFamily: "didot" }}>
                    Already have an account?<br />
                    <Link to={'/signin'} >Sign In</Link>
                </p>
            </div>
        </div>
    );
};

export default Signup;
