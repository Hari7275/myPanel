import React, { useState, useEffect } from "react";
import ReactModal from "react-modal";
import { useUpdateGiftMutation } from "../../../_store/api";

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

const UpdateGifts = ({ isOpen, onClose, selectedRow }) => {
  const [formData, setFormData] = useState({
    id: selectedRow.id || "",
    name: selectedRow.name || "",
    description: selectedRow.description || "",
    image_url: selectedRow?.image_url,
    currency: selectedRow.currency || "INR",
    price: selectedRow.price || "",
    is_active: selectedRow.is_active || "true",
    commission: selectedRow.commission || "",
  });

  const [updateData, { isLoading: isUpdating, error }] =
    useUpdateGiftMutation();

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
    formDataToSend.append("name", formData.name);
    formDataToSend.append("description", formData.description);
    formDataToSend.append("currency", formData.currency);

    // Pass the actual image file
    if (formData.image) {
      formDataToSend.append("image", formData.image);
    }

    formDataToSend.append("price", formData.price);
    formDataToSend.append("is_active", formData.is_active);
    formDataToSend.append("commission", formData.commission);

    try {
      await updateData({
        id: formData.id,
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
          label="Gift Name"
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Gift Name"
        />

        <InputField
          label="Gift Description"
          type="text"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Gift Description"
        />

        <InputField
          label="Price"
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
          placeholder="Gift Price"
        />

        <InputField
          label="Commission"
          type="number"
          name="commission"
          value={formData.commission}
          onChange={handleChange}
          placeholder="Gift Commission"
        />
        <div className="userProfile-grid-item">
          <label style={{ fontSize: "20px", marginTop: "20px" }}>Image</label>
          <input
            type="file"
            name="image"
            onChange={handleChange}
            className="userProfile-input-field"
          />
        </div>

        <div className="userProfile-grid-item">
          <label style={{ fontSize: "16px", marginTop: "20px" }}>
            Status *
          </label>
          <select
            name="is_active"
            value={formData.is_active}
            onChange={handleChange}
            className="userProfile-input-field"
          >
            <option value="true">Active</option>
            <option value="false">Inactive</option>
          </select>
        </div>

        <div style={{ marginTop: "30px", textAlign: "center" }}>
          <button
            className="fifthButton"
            style={{ marginRight: "10px", backgroundColor: "green" }}
            onClick={handleSave}
            disabled={isUpdating}
          >
            {isUpdating ? "Saving..." : "Save"}
          </button>
          <button
            className="fifthButton"
            style={{}}
            onClick={onClose}
          >
            Back
          </button>
        </div>
        {error && <p className="error-message">Error: {error?.message}</p>}
      </div>
    </ReactModal>
  );
};

export default UpdateGifts;
