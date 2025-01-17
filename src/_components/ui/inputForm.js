export const UpdateInputField = ({
  label,
  type,
  id,
  name,
  value,
  onChange,
  placeholder,
}) => {
  return (
    <div className="input-container">
      <label htmlFor={id}>{label}</label>
      <input
        type={type}
        id={id}
        name={name}
        className="info-input"
        value={value}
        placeholder={placeholder}
        onChange={onChange}
      />
    </div>
  );
};

export const TextSetting = ({ text, value }) => {
  return (
    <div className="card-footer-content">
      <div className="info-pair">
        <p className="info-item">
          <strong style={{textTransform:"capitalize"}}> {text} : </strong>
          <span>{value}</span>
        </p>
      </div>
    </div>
  );
};
