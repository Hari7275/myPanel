import React, { useState } from "react";
import ReactModal from "react-modal";
import { useCreateLanguageMutation } from "../../../_store/api";
import {
  InputField,
  InputDropDown,
  InputTextArea,
  InputRadio,
  InputCheckbox
} from "../../../_components/ui/InputComponents";

const AddLanguage_New = ({ isOpen, onClose }) => {
  const [inputValue, setInputValue] = useState("");
  const [code, setCode] = useState("");
  const [status, setStatus] = useState("active");

  const [createLanguage] = useCreateLanguageMutation();
  const [selectedInterests, setSelectedInterests] = useState([]);

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
      onClose()

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
      style={{
        content: {
          width: "500px", /* Fixed width dedo */
          maxWidth: "90vw", /* Mobile ke liye */
          font: "14px Open Sans",
        }
      }}
    >
      <div className="form-modal-header">
        <h2 className="form-modal-title">Language</h2>
        <button className="form-close-btn" onClick={onClose}>
          &times;
        </button>
      </div>

      <form className="simple-form" noValidate autoComplete="off">
        <InputField
          label="Add Language"
          id="language"
          name="language"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Add new language"
          required
        />
        <InputField
          label="Language Code"
          id="code"
          name="code"
          value={code}
          onChange={handleCodeChange}
          placeholder="Language code"
          required
        />
        <InputDropDown
          label="Status"
          id="status"
          name="status"
          value={status}
          onChange={handleStatusChange}
          options={[
            { value: "active", label: "Active" },
            { value: "inactive", label: "Inactive" },
          ]}
          required
        />
        <InputRadio
          label="Status"
          id="status-radio"
          name="status-radio"
          value={status}
          onChange={handleStatusChange}
          options={[
            { value: "active", label: "Active" },
            { value: "inactive", label: "Inactive" },
            { value: "other", label: "Other" }
          ]}
          required
        />
        <InputTextArea
          label="Description"
          id="description"
          name="description"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Add description"
        />
        <InputCheckbox
          label="Select Language"
          id="isDefault"
          name="interests"
          selectedValues={selectedInterests}
          value={inputValue}
          onChange={(e) => setSelectedInterests(e.target.value)}
          options={[
            { value: "english", label: "English" },
            { value: "spanish", label: "Spanish" },
            { value: "french", label: "French" },
          ]}
          required={false}
        />
      </form>
      <div className="button-container">
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
    </ReactModal>
  );
};

export default AddLanguage_New;
