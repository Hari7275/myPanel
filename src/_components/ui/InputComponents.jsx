import React from 'react'
import { Link } from "react-router-dom";
import './inputComponents.css';

export const InputField = ({
  label,
  type = "text",
  id,
  name,
  value,
  onChange,
  placeholder = "",
  required = false,
  disabled = false
}) => {
  return (
    <div className="input-field floating-label">
      <label htmlFor={name}>{label}</label>
      <input
        type={type}
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        className="info-input"
        placeholder={placeholder}
        required={required}
        disabled={disabled}
      />
    </div>
  )
}
export const InputDropDown = ({
  label,
  options = [],
  id,
  name,
  value,
  onChange,
  required = false,
  disabled = false
}) => {
  return (
    <div className="input-field floating-label">
      <label htmlFor={name}>{label}</label>
      <select
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        className="info-input"
        required={required}
        disabled={disabled}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  )
}

export const InputTextArea = ({
  label,
  id,
  name,
  value,
  onChange,
  placeholder = "",
  required = false,
  disabled = false
}) => {
  return (
    <div className="input-field floating-label">
      <label htmlFor={name}>{label}</label>
      <input
        type={"text"}
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        className="info-input"
        placeholder={placeholder}
        required={required}
        disabled={disabled}
      />
    </div>
  )
}
