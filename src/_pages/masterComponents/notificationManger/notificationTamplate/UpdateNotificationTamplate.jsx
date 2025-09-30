import React, { useState, useEffect } from "react";
import ReactModal from "react-modal";
import { useUpdateNotificationTemplateMutation } from "../../../../_store/api";
import toast from "react-hot-toast";

const UpdateNotificationTamplate = ({ isOpen, onClose, selectedRow }) => {
  const [formData, setFormData] = useState({
    id: selectedRow.id || "",
    created_by: 9,
    title: selectedRow.title || "",
    message: selectedRow.message || "",
    image_url: selectedRow?.image_url,
  });

  const [updateData, { isLoading: isUpdating, error }] =
    useUpdateNotificationTemplateMutation();

  const handleChange = (event) => {
    const { name, value, type, files } = event.target;
    if (type === "file") {
      setFormData((prevData) => ({ ...prevData, [name]: files[0] }));
    } else {
      setFormData((prevData) => ({ ...prevData, [name]: value }));
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();

    const body = {
      title: formData?.title,
      message: formData?.message,
      created_by: formData?.created_by,
      image_url: formData?.image, // here image should be a URL string, not file
    };

    try {
      const response = await updateData({ id: formData.id, body }).unwrap();

      if (response.status) {
        toast.success(response.message || "Template created successfully");
        onClose();
        // Reset form after successful submission
        setFormData({
          title: "",
          message: "",
          created_by: 9,
          image: null,
        });
      } else {
        toast.error(response.message || "Failed to create template");
      }
    } catch (error) {
      console.error("Failed to create notification template", error);
      toast.error(error.data?.message || "Failed to create template");
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
          Update Notification Template
        </h2>

        <div style={{ display: "flex", gap: "10px", marginBottom: "15px" }}>
          <div className="input-container" style={{ flex: 1 }}>
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="info-input"
              placeholder="Enter title"
              required
            />
          </div>
        </div>

        <div style={{ display: "flex", gap: "10px", marginBottom: "15px" }}>
          <div className="input-container" style={{ flex: 1 }}>
            <label htmlFor="message">Message</label>
            <input
              type="text"
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              className="info-input"
              placeholder="Enter message"
              required
            />
          </div>
        </div>
        <div className="userProfile-grid-item">
          <label style={{ fontSize: "20px", marginTop: "20px" }}>Image</label>
          <input
            type="text"
            name="image"
            onChange={handleChange}
            value={formData.image_url}
            className="userProfile-input-field"
            accept="image/*"
          />
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
          <button className="fifthButton" style={{}} onClick={onClose}>
            Back
          </button>
        </div>
        {error && <p className="error-message">Error: {error?.message}</p>}
      </div>
    </ReactModal>
  );
};

export default UpdateNotificationTamplate;
