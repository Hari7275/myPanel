import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./loginFrom.css";

const LoginForm = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    if (phoneNumber === "1234567890" && password === "12345") {
      navigate("/user");
    } else {
      alert("Invalid phone number or password");
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleLogin();
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [ password]);

  return (
    <div className="login-body">
      <div className="login-container">
        <div className="login-header">
          <h4>Login</h4>
          <p>Enter your phone number below to login to your account</p>
        </div>

        <div className="login-form">
          <div>
            <label htmlFor="phonenumber">Phone Number</label>
            <input
              type="number"
              placeholder="Phone number"
              id="phonenumber"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              autoComplete="off"
            />
          </div>

          <div>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              placeholder="Password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="off"
            />
          </div>

          <label className="forgotPassword" htmlFor="forgotPassword">
            Forgot Password
          </label>

          <button className="button" onClick={handleLogin}>
            Login
          </button>
        </div>

        <div className="signup-text">
          <p>
            Don't have an account? <span>Sign up</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
