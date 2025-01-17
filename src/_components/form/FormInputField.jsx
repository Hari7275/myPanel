import React from "react";
import "./formInputField.css";

const InputField = ({ data }) => {
  return (
    <input
      className="formInputField"
      type={data.type}
      placeholder={data.placeholder}
      id={data.id}
    />
  );
};

export default InputField;
