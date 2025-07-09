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
    <div className="input-form-field">
      <label htmlFor={name}>{label}</label>
      <input
        type={type}
        id={id}
        name={name}
        value={value}
        onChange={onChange}
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
    <div className="input-form-field">
      <label htmlFor={name}>{label}</label>
      <select
        id={id}
        name={name}
        value={value}
        onChange={onChange}
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

export const InputRadio = ({
  label,
  name,
  value,
  onChange,
  options = [],
  required = false,
  disabled = false
}) => {
  return (
    <div className="input-radio-field">
      <label className='radio-main-label'>{label}</label>
      <div className="radio-options-container">
        {options.map((option) => (
          <div key={option.value} className="radio-option">
            <input
              type="radio"
              id={`${name}-${option.value}`}
              name={name}
              value={option.value}
              checked={value === option.value}
              onChange={onChange}
              required={required}
              disabled={disabled}
              className="radio-input"
            />
            <label htmlFor={`${name}-${option.value}`} className="radio-label">
              {option.label}
            </label>
          </div>
        ))}
      </div>
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
    <div className="input-form-field">
      <label htmlFor={name}>{label}</label>
      <textarea
        type={"text"}
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
      />
    </div>
  )
}

export const InputCheckbox = ({
  label,
  id,
  name,
  selectedValues = [],
  onChange,
  options = [],
  required = false,
  disabled = false
}) => {
  const handleCheckboxChange = (event) => {
    const value = event.target.value;
    const newSelectedValues = selectedValues.includes(value)
      ? selectedValues.filter((v) => v !== value)
      : [...selectedValues, value];
    onChange({ target: { name, value: newSelectedValues } });
  };
  return (
    <div className="input-checkbox-field">
      <label className='checkbox-main-label'>{label}</label>
      <div className="checkbox-options-container">
        {options.map((option) => (
          <div key={option.value} className="checkbox-option">
            <input
              type="checkbox"
              id={`${name}-${option.value}`}
              name={name}
              value={option.value}
              checked={selectedValues.includes(option.value)}
              onChange={handleCheckboxChange}
              required={required}
              disabled={disabled}
              className="checkbox-input"
            />
            <label htmlFor={`${name}-${option.value}`} className='checkbox-label'>
              {option.label}
            </label>
          </div>
        ))}
      </div>
    </div>
  )
}