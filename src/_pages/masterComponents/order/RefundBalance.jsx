import React, { useState } from "react";
import ReactModal from "react-modal";

import { useCreateUserRefundCallAmountMutation } from "../../../_store/api";
import { Atom } from "react-loading-indicators";
import toast from "react-hot-toast";

const RefundBalance = ({ isOpen, onClose, selectedRow }) => {
  const [formData, setFormData] = useState({
    userId: selectedRow.user_id,
    amount: selectedRow?.order_revenue || "",
    duration: selectedRow?.actual_duration || 0,
    description: "",
    is_forgin: selectedRow.description.userData.is_foreigner || null,
    conversion_rate: selectedRow.conversion_rate || "",
  });

  const [createData, { isLoading }] = useCreateUserRefundCallAmountMutation();

  // Dropdown options for description
  const descriptionOptions = [
    { value: "", label: "Select a reason" },
    {
      value: "Flute mock call",
      label: "Flute mock call",
    },
    {
      value: "Call failed to connect",
      label: "Call failed to connect",
    },
    {
      value: "Call dropped due to technical issue",
      label: "Call dropped due to technical issue",
    },
    {
      value: "Consultant did not answer",
      label: "Consultant did not answer",
    },
    { value: "Consultant ended early", label: "Consultant ended early" },
    { value: "Consultant unprofessional", label: "Consultant unprofessional" },
    { value: "Wrong service selected", label: "Wrong service selected" },
    {
      value: "Duplicate or accidental payment",
      label: "Duplicate or accidental payment",
    },
    {
      value: "Admin-approved goodwill refund",
      label: "Admin-approved goodwill refund",
    },
  ];

  const handleChange = (event) => {
    const { name, value } = event.target;

    // Validate duration
    if (name === "duration") {
      const numValue = parseFloat(value);
      const maxDuration = parseFloat(selectedRow?.actual_duration || 0);

      // Check if duration is negative
      if (numValue < 0) {
        toast.error("Duration cannot be negative");
        return;
      }

      // Check if duration exceeds max
      if (numValue > maxDuration) {
        toast.error(`Duration cannot exceed ${maxDuration} minutes`);
        return;
      }
    }

    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async () => {
    // Check if description is empty
    if (!formData.description.trim()) {
      toast.error("Description is required");
      return;
    }

    // Validate duration
    if (!formData.duration || parseFloat(formData.duration) <= 0) {
      toast.error("Please enter a valid duration");
      return;
    }

    const durationValue = parseFloat(formData.duration);
    const maxDuration = parseFloat(selectedRow?.actual_duration || 0);

    if (durationValue > maxDuration) {
      toast.error(`Duration cannot exceed ${maxDuration} minutes`);
      return;
    }

    if (durationValue < 0) {
      toast.error("Duration cannot be negative");
      return;
    }

    // API payload matching the curl request
    const apiPayload = {
      id: selectedRow?.id,
      activity_type: "order",
      description: formData.description,
      duration: parseFloat(formData.duration),
    };

    try {
      const response = await createData({ body: apiPayload });

      if (response?.data?.status) {
        toast.success(response?.data?.message);
        onClose();
      } else {
        toast.error(response?.data?.message || "Failed to process refund");
        return;
      }
    } catch (error) {
      toast.error("Failed to process transaction");
      console.error(error);
    }
  };

  if (isLoading) {
    return (
      <span className="loadPage">
        <Atom color="#1c2434" size="medium" text="" textColor="" />
      </span>
    );
  }

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
          User Refund
        </h2>

        {/* Duration Field */}
        <div className="userProfile-grid-item">
          <label style={{ fontSize: "20px", marginTop: "20px" }}>
            Duration (minutes)
            <span
              style={{ fontSize: "14px", color: "#666", marginLeft: "10px" }}
            >
              (Max: {selectedRow?.actual_duration || 0})
            </span>
          </label>
          <input
            type="number"
            name="duration"
            value={formData.duration}
            onChange={handleChange}
            placeholder="Enter Order Duration"
            className="userProfile-input-field"
            min={0}
            max={selectedRow?.actual_duration || 0}
            step="0.01"
          />
        </div>

        {/* Description Dropdown Field */}
        <div className="userProfile-grid-item">
          <label style={{ fontSize: "20px", marginTop: "20px" }}>
            Refund Reason{" "}
            <span style={{ fontSize: "14px", color: "#666" }}>
              <span style={{ color: "red" }}>*</span>
            </span>
          </label>
          <select
            name="description"
            value={formData?.description}
            onChange={handleChange}
            className="userProfile-input-field"
            required
          >
            {descriptionOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {/* Action Buttons */}
        <div style={{ marginTop: "30px", textAlign: "center" }}>
          <button
            className="fifthButton"
            style={{ marginRight: "10px", backgroundColor: "green" }}
            onClick={handleSubmit}
            disabled={
              !formData.duration ||
              parseFloat(formData.duration) <= 0 ||
              !formData.description.trim()
            }
          >
            Submit
          </button>
          <button className="back-Button fifthButton" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </ReactModal>
  );
};

export default RefundBalance;
