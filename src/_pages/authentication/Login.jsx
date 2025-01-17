import React, { useState } from "react";
import "./login.css";
import FormInputField from "../../_components/form/FormInputField";

const Login = () => {
  const [showLoginForm, setShowLoginForm] = useState(true);
  // const [showForgotPassword , setShowForgotPassword] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(true);

  const handleForgotPasswordClick = () => {
    //  setShowLoginForm(false);
    //  setShowForgotPassword(true)
  };

  const handleBackToLoginClick = () => {
    //  setShowLoginForm(true);
    //  setShowForgotPassword(false)
  };

  return (
    <div className="myContainer">
      {showLoginForm && (
        <form className="myForm">
          <h3>Login</h3>

          <label className="myLabel" htmlFor="username">
            Username
          </label>
          <FormInputField type="text" placeholder="Email" id="username" />
          <label className="myLabel" htmlFor="password">
            Password
          </label>
          <FormInputField
            type="password"
            placeholder="Password"
            id="password"
          />

          <label
            className="forgotPassowrd myLabel"
            htmlFor="forgotPassowrd"
            onClick={handleForgotPasswordClick}
          >
            Forgot Password
          </label>

          <button className="button">Log In </button>
        </form>
      )}

      {showForgotPassword && (
        <div className="Forgotpassword">
          <label className="userEmail myLabel" htmlFor="userEmail">
            {" "}
            Enter your registred Email
          </label>
          <input
            className="emailInput"
            type="text"
            placeholder="Enter your Email"
          />
          <button className="submit" onClick={handleBackToLoginClick}>
            Submit{" "}
          </button>
        </div>
      )}

      <div className="resetPassword">
        <label className="myLabel" htmlFor="userEmail">
          {" "}
          New Password
        </label>
        <input className="newPassword" type="text" placeholder="New password" />

        <label className="myLabel " htmlFor="userEmail">
          {" "}
          Confirm Password
        </label>
        <input
          className="confirmPassword"
          type="text"
          placeholder="Confirm Password"
        />

        <button className="resetButton">Submit </button>
      </div>
    </div>
  );
};

export default Login;
