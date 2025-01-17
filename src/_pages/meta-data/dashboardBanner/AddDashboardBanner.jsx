import React, { useState } from "react";
import ReactModal from "react-modal";
import { useCreateDashboardBannerMutation } from "../../../_store/api";

const InputField = ({ label, type, name, value, onChange, placeholder }) => (
  <div className="userProfile-grid-item">
    <label style={{ fontSize: "20px", marginTop: "20px" }}>{label}</label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="userProfile-input-field"
    />
  </div>
);

const AddDashboardBanner = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    image: null,
    status: "active",
  });

  const [createData, { isLoading }] = useCreateDashboardBannerMutation();

  const handleChange = (event) => {
    const { name, value, type, files } = event.target;
    if (type === "file") {
      setFormData((prevData) => ({ ...prevData, [name]: files[0] }));
    } else {
      setFormData((prevData) => ({ ...prevData, [name]: value }));
    }
  };

  const handleSubmit = async () => {
    const newData = new FormData();

    newData.append("banner_image", formData?.image || "snake.jpg");
    newData.append("status", formData?.status);

    try {
      await createData({ body: newData });
      onClose();
    } catch (error) {
      console.log("Failed to add new category", error);
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
        <h2
          className="sub-heading"
          style={{
            marginBottom: "20px",
            display: "block",
            backgroundColor: "#f0f0f0",
            textAlign: "center",
          }}
        >
          Add Banner
        </h2>

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
          <label style={{ fontSize: "20px", marginTop: "20px" }}>Status</label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="userProfile-input-field"
          >
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
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
            onClick={handleSubmit}
            disabled={isLoading}
          >
            {isLoading ? "Submitting..." : "Submit"}
          </button>
        </div>
      </div>
    </ReactModal>
  );
};

export default AddDashboardBanner;
