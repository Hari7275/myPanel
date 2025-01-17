import React, { useState, useEffect } from "react";
import ReactModal from "react-modal";
import { useUpdateLanguageMutation } from "../../../_store/api";



const EditLanguage = ({ isOpen, onClose, selectedRow }) => {
  const [formData, setFormData] = useState({
    id: selectedRow?.id || "",
    language: selectedRow?.language || "",
    code: selectedRow?.code || "",
    status: selectedRow?.status || "",
  });

  const [updateLanguage, { isLoadng: isUpdating, error }] =
    useUpdateLanguageMutation();

  useEffect(() => {
    if (selectedRow) {
      setFormData({
        language: selectedRow?.language,
        code: selectedRow?.code,
        status: selectedRow?.status,
      });
    }
  }, [selectedRow]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      await updateLanguage({
        id: selectedRow.id,
        body: formData,
      });
      onClose();
    } catch (error) {
      console.log("API Error", error);
    }
  };

  if (!isOpen) return null;
  return (
    <>
      <div>
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
            Edit Language
          </h2>
          <form className="simple-form" noValidate autoComplete="off">
            <div className="input-container">
              <label htmlFor="language">Language</label>
              <input
                type="text"
                id="language"
                name="language"
                className="info-input"
                value={formData.language}
                onChange={handleChange}
              />
            </div>

            <div className="input-container">
              <label htmlFor="code">Code</label>
              <input
                type="text"
                id="code"
                name="code"
                className="info-input"
                value={formData.code}
                onChange={handleChange}
              />
            </div>

            <div className="input-container">
              <label htmlFor="status">Status</label>

              <select
                id="status"
                name="status"
                value={formData.status}
                onChange={handleChange}
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
                onClick={handleSave}
                // disabled={isUpdating}
              >
                {"Save"}
              </button>
            </div>
          </form>
          {error && <p style={{ color: "red" }}>Error: {error.message}</p>}
        </ReactModal>
      </div>
    </>
  );
};

export default EditLanguage;
