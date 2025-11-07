import React, { useState, useEffect } from "react";
import ReactModal from "react-modal";
import { useUpdateConsultantSupportExecutiveMutation } from "../../../../_store/api";
import toast from "react-hot-toast";

const UpdateConsultantSupport = ({ isOpen, onClose, selectedRow }) => {
  const [formData, setFormData] = useState({
    phone: "",
    name: "",
    category: "",
  });

  const [updateData, { isLoading: isUpdating }] =
    useUpdateConsultantSupportExecutiveMutation();

  useEffect(() => {
    if (selectedRow) {
      setFormData({
        phone: selectedRow?.phone || "",
        name: selectedRow?.name || "",
        category: selectedRow?.category || "",
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

    const updatedData = {
      phone: formData.phone,
      name: formData.name,
      category: formData.category,
    };

    try {
      const response = await updateData({
        id: selectedRow?.id,
        body: updatedData,
      });

      if (response?.data?.status === true) {
        toast.success(response?.data?.message);
        onClose();
      } else if (response?.data?.status === false) {
        toast.error(response?.data?.message);
      } else if (response?.error?.data?.status === false) {
        toast.error(response?.error?.data?.message);
      }
    } catch (error) {
      console.error("Failed to update consultant support executive:", error);
      toast.error("Something went wrong while updating.");
    }
  };

  if (!isOpen) return null;

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
          Update Consultant Support Executive
        </h2>

        {/* Category Field */}
        <div className="userProfile-grid-item">
          <label style={{ fontSize: "20px", marginTop: "20px" }}>
            Category
          </label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="userProfile-input-field"
            required
          >
            <option value="">Select Category</option>
            <option value="payment">Payment</option>
            <option value="profile">Profile</option>
            <option value="technical">Technical</option>
          </select>
        </div>

        {/* Phone Number Field */}
        <div className="userProfile-grid-item">
          <label style={{ fontSize: "20px", marginTop: "20px" }}>
            Executive Phone Number
          </label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Executive Phone Number"
            className="userProfile-input-field"
            required
          />
        </div>

        {/* Name Field */}
        <div className="userProfile-grid-item">
          <label style={{ fontSize: "20px", marginTop: "20px" }}>
            Executive Name
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Executive Name"
            className="userProfile-input-field"
            required
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
          <button className="fifthButton" onClick={onClose}>
            Back
          </button>
        </div>
      </div>
    </ReactModal>
  );
};

export default UpdateConsultantSupport;
