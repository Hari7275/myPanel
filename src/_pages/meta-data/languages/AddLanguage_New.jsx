import React, { useState } from "react";
import ReactModal from "react-modal";
import { useCreateLanguageMutation } from "../../../_store/api";
import { InputField } from "../../../_components/ui/InputComponents";

const AddLanguage_New = ({ isOpen, onClose }) => {
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
    >
      <h2
        className="sub-heading"
        style={{
          marginBottom: "20px",
          display: "block",
          backgroundColor: "#f0f0f0",
        }}
      >
        Add Language
      </h2>

      <form className="simple-form" noValidate autoComplete="off">
        <div>
          <InputField
            label="Add Language"
            type="text"
            id="language"
            name="language"
            value={inputValue}
            onChange={handleInputChange}
            placeholder="Add new language"
          />
        </div>
        <div>
          <InputField
            label="Language Code *"
            type="text"
            id="language_code"
            name="language_code"
            value={code}
            onChange={handleCodeChange}
            placeholder="Language code"
          />
        </div>
        <div>
          <InputField
            label="Language Code *"
            type="text"
            id="language_code"
            name="language_code"
            value={code}
            onChange={handleCodeChange}
            placeholder="Language code"
          />
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
      </form>
    </ReactModal>
  );
};

export default AddLanguage_New;
