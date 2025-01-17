import React from "react";
import "./button.css";

const Button = ({ data }) => {
  return <button className="formButton">{data.btnTitle}</button>;
};

export default Button;
