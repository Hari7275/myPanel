import React, { useState } from "react";
import ReactModal from "react-modal";
import { useCreateLanguageMutation } from "../../../_store/api";

const AddLanguage = ({ isOpen, onClose }) => {
  const [inputValue, setInputValue] = useState("");
  const [code, setCode] = useState("");
  const [status, setStatus] = useState("active");

  const [createLanguage] = useCreateLanguageMutation();

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleCodeChange = (event) => {
    setCode(event.target.value);
  };

  const handleStatusChange = (event) => {
    setStatus(event.target.value);
  };

  const handleSubmit = async () => {
    const newLanguage = {
      language: inputValue,
      code,
      status,
    };

    try {
      await createLanguage({ body: newLanguage });
      onClose();
    } catch (error) {
      console.error("Failed to add language", error);
    }
  };

  return (
    <ReactModal
      className="modal"
      overlayClassName="overlay"
      isOpen={isOpen}
      onRequestClose={onClose}
    >
      <div style={{ width: "500px" }}>
        <div className="userProfile-grid-item">
          <label style={{ fontSize: "20px", marginTop: "20px" }}>
            Add language *
          </label>
          <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            placeholder="Add new language"
            className="userProfile-input-field"
          />
        </div>
        <div className="userProfile-grid-item">
          <label style={{ fontSize: "20px", marginTop: "20px" }}>
            Language Code *
          </label>
          <input
            type="text"
            value={code}
            onChange={handleCodeChange}
            placeholder="Language code"
            className="userProfile-input-field"
          />
        </div>
        <div className="userProfile-grid-item">
          <label style={{ fontSize: "20px", marginTop: "20px" }}>
            Status *
          </label>
          <select
            value={status}
            onChange={handleStatusChange}
            className="userProfile-input-field"
          >
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
        <div style={{ marginTop: "30px" }}>
          <button
            className="fifthButton"
            style={{ marginRight: "10px" }}
            onClick={onClose}
          >
            Back
          </button>
          <button
            className="fifthButton"
            style={{ backgroundColor: "green" }}
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      </div>
    </ReactModal>
  );
};

export default AddLanguage;
