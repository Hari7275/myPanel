import React, { useState } from "react";
import ReactModal from "react-modal";
import { useCreateLanguageMutation } from "../../../_store/api";

const AddAppVersion = ({ isOpen, onClose }) => {
  const [key, setKey] = useState(1); // 1 for Android, 2 for iOS
  const [type, setType] = useState(1); // 1 for User App, 2 for Consultant App
  const [version, setVersion] = useState("");
  const [forceUpdate, setForceUpdate] = useState(false);

  const [createLanguage] = useCreateLanguageMutation();

  const handleKeyChange = (value) => {
    setKey(value);
  };

  const handleTypeChange = (value) => {
    setType(value);
  };

  const handleVersionChange = (event) => {
    setVersion(event.target.value);
  };

  const handleSubmit = async () => {
    const newAppVersion = {
      key: key,
      type: type,
      version: parseFloat(version),
      force_update: forceUpdate,
    };

    try {
      await createLanguage({ body: newAppVersion });
      onClose();
      // Reset form
      setKey(1);
      setType(1);
      setVersion("");
      setForceUpdate(false);
    } catch (error) {
      console.error("Failed to add app version", error);
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
          <div>
            <div className="ProfileData-options">Key</div>
            <div
              className="input-group"
              style={{ display: "flex", gap: "20px" }}
            >
              <div>
                <label className="input-group-options">
                  <input
                    className="input-group-radio"
                    type="radio"
                    name="key"
                    checked={key === 1}
                    onChange={() => handleKeyChange(1)}
                  />
                  <span>Android</span>
                </label>
              </div>
              <div>
                <label className="input-group-options">
                  <input
                    className="input-group-radio"
                    type="radio"
                    name="key"
                    checked={key === 2}
                    onChange={() => handleKeyChange(2)}
                  />
                  <span>iOS</span>
                </label>
              </div>
            </div>
          </div>

          <div style={{ marginTop: "20px" }}>
            <div className="ProfileData-options">Type</div>
            <div
              className="input-group"
              style={{ display: "flex", gap: "20px" }}
            >
              <div>
                <label className="input-group-options">
                  <input
                    className="input-group-radio"
                    type="radio"
                    name="type"
                    checked={type === 1}
                    onChange={() => handleTypeChange(1)}
                  />
                  <span>User App</span>
                </label>
              </div>
              <div>
                <label className="input-group-options">
                  <input
                    className="input-group-radio"
                    type="radio"
                    name="type"
                    checked={type === 2}
                    onChange={() => handleTypeChange(2)}
                  />
                  <span>Consultant App</span>
                </label>
              </div>
            </div>
          </div>
        </div>

        <div className="userProfile-grid-item">
          <label style={{ fontSize: "20px", marginTop: "20px" }}>Version</label>
          <input
            type="text"
            value={version}
            onChange={handleVersionChange}
            placeholder="App Version (e.g., 1.24)"
            className="userProfile-input-field"
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
      </div>
    </ReactModal>
  );
};

export default AddAppVersion;
