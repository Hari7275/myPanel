import React, { useState } from "react";
import ReactModal from "react-modal";
import { useUpdateNoticeMutation } from "../../../_store/api";

const InputField = ({
  label,
  type,
  name,
  value,
  onChange,
  placeholder,
  readOnly,
}) => (
  <div className="input-container">
    <label htmlFor={label}>{label}</label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="info-input"
      readOnly={readOnly}
    />
  </div>
);

const UpdateNotice = ({ isOpen, onClose, selectedRow }) => {
  const [formData, setFormData] = useState({
    id: selectedRow.id || "",
    name: selectedRow.name || "",
    title: selectedRow.title || "",
    description: selectedRow.description || "",
    image_url: selectedRow?.image_url,
  });
  console.log("selectedRow", selectedRow);

  const [updateData, { isLoading: isUpdating, error }] =
    useUpdateNoticeMutation();

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image" && files.length > 0) {
      setFormData((prevData) => ({
        ...prevData,
        image: files[0],
        image_url: URL.createObjectURL(files[0]),
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    formDataToSend.append("id", formData.id);
    formDataToSend.append("name", formData.name);
    formDataToSend.append("title", formData.title);
    formDataToSend.append("description", formData.description);
    formDataToSend.append("currency", formData.currency);

    // Pass the actual image file
    if (formData.image) {
      formDataToSend.append("image", formData.image);
    }

    try {
      await updateData({
        body: formDataToSend,
      });
      onClose();
    } catch (error) {
      console.error("API Error", error);
    }
  };

  return (
    <ReactModal
      className="modal"
      overlayClassName="overlay"
      isOpen={isOpen}
      onRequestClose={onClose}
      aria-labelledby="update-gift-title"
    >
      <div style={{ width: "500px" }}>
        <h2
          className="sub-heading"
          id="update-gift-title"
          style={{
            marginBottom: "20px",
            display: "block",
            backgroundColor: "#f0f0f0",
            textAlign: "center",
          }}
        >
          Update Gift
        </h2>

        <InputField
          label="Notice Name"
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Notice Name"
        />

        <InputField
          label="Notice Title"
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Notice Title"
        />

        <div
          className="input-container"
          style={{ width: "unset", marginTop: "20px" }}
        >
          <label>Gift Description</label>
          <textarea
            value={formData.description}
            name="description"
            onChange={handleChange}
            rows="5"
            // cols="40"
            placeholder="Gift Description"
            style={{
              paddingTop: "15px",
              paddingLeft: "10px",
              fontSize: "16px",
              width: "100%",
            }}
          />
        </div>

        <div className="userProfile-grid-item">
          <label style={{ fontSize: "20px", marginTop: "20px" }}>Image</label>
          <input
            type="file"
            name="image"
            onChange={handleChange}
            className="userProfile-input-field"
          />
        </div>

        <div style={{ marginTop: "30px", textAlign: "center" }}>
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
            disabled={isUpdating}
          >
            {isUpdating ? "Saving..." : "Save"}
          </button>
        </div>
        {error && <p className="error-message">Error: {error?.message}</p>}
      </div>
    </ReactModal>
  );
};

export default UpdateNotice;
