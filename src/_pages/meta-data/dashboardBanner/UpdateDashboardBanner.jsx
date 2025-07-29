import React, { useState, useEffect } from "react";
import ReactModal from "react-modal";
import { useUpdateDashboardBannerMutation } from "../../../_store/api";

const UpdateDashboardBanner = ({ isOpen, onClose, selectedRow }) => {
  const [formData, setFormData] = useState({
    id: selectedRow.id || "",
    display_order: selectedRow.display_order || 0,
    banner_image: selectedRow?.banner_image,
  });
  console.log("selectedRow", selectedRow);

  const [updateData, { isLoading: isUpdating, error }] =
    useUpdateDashboardBannerMutation();

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "banner_image" && files.length > 0) {
      setFormData((prevData) => ({
        ...prevData,
        banner_image: files[0],
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
    if (!formData.banner_image) {
      alert("Please select an image before submitting.");
      return;
    }

    const formDataToSend = new FormData();
    formDataToSend.append("banner_image", formData.banner_image);
    // formDataToSend.append("display_order", formData.display_order);

    try {
      await updateData({
        body: formDataToSend,
        id: formData.id,
      });

      onClose();
    } catch (error) {
      console.error("API Error", error);
      alert("Failed to update the banner. Please try again.");
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
          Update Dashboard Banner
        </h2>

        <div className="userProfile-grid-item">
          <label style={{ fontSize: "20px", marginTop: "20px" }}>Image</label>
          <input
            type="file"
            name="banner_image"
            onChange={handleChange}
            className="userProfile-input-field"
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

export default UpdateDashboardBanner;
