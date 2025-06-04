import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./loginFrom.css";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../_store/slices/authSlice";
import toast from "react-hot-toast";

import { MOCK_USERS } from "./users";

const LoginForm = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  useEffect(() => {
    // Redirect to user page if already logged in
    if (isAuthenticated) {
      navigate("/user", { replace: true });
    }
  }, [isAuthenticated, navigate]);

  // const handleLogin = () => {
  //   if (phoneNumber === "1234567890" && password === "12345") {
  //     dispatch(login());
  //     navigate("/user");
  //   } else {
  //     alert("Invalid phone number or password");
  //   }
  // };

  const handleLogin = () => {
    const user = MOCK_USERS.find(
      (u) => u.phoneNumber == phoneNumber && u.password == password
    );

    // console.log("user", user);
    if (user) {
      console.log("--- LOGIN DEBUG ---");
      console.log("Found user:", user);
      console.log("Dispatching login with:", {
        user: {
          id: user.id,
          name: user.name,
          phoneNumber: user.phoneNumber,
        },
        role: user.role,
        permissions: user.permissions,
        prod: user.phoneNumber == "1234567899", 
      });

      dispatch(
        login({
          user: {
            id: user.id,
            name: user.name,
            phoneNumber: user.phoneNumber,
          },
          role: user.role,
          permissions: user.permissions,
          prod: user.phoneNumber == "1234567899",
        })
      );
      navigate("/dashboard");
    } else {
      toast.error("Invalid phone number or password");
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
  }, [password]);

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
