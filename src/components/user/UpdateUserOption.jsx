import React,{useState} from "react";

const UpdateUserOption = ({ closeUSerPassion_modal, data }) => {
  const [inputValue , setInputValue] = useState(data)

  const handleInputChange =(event)=>{
    setInputValue(event.target.value);
  };

  const handleSubmit=()=>{
    console.log("submitted value" , inputValue)
  }

  return (
    <>
      <div style={{ width: "500px", height: "210px" }}>
        <div className="userProfile-grid-item">
          <label style={{ fontSize: "20px", marginTop: "20px" }}>
            Profile Feature Option Name*
          </label>
          <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            placeholder="update this field"
            className="userProfile-input-field"
          />
        </div>
        <div style={{ marginTop: "30px" }}>
          <button className="fifthButton" style={{ marginRight: "10px" }}>
            Back
          </button>
          <button className="fifthButton" style={{ backgroundColor: "green" }} onClick={handleSubmit}>
            Submit
          </button>
        </div>
      </div>
    </>
  );
};

export default UpdateUserOption;
