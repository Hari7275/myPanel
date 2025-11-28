import React, { useState, useEffect, useRef } from "react";
import ReactModal from "react-modal";

import { useUpdateMarketingLeadsStatusMutation } from "../../../../_store/api";
import toast from "react-hot-toast";

const UpdateStatusMarketingLeads = ({ isOpen, onClose, selectedRow }) => {
  const [formData, setFormData] = useState({
    status: "",
    description: "",
  });

  const statusOptions = [
    { value: 1, label: "Pending" },
    { value: 2, label: "Registered" },
    { value: 3, label: "Not Interested" },
  ];

  // Ref to prevent duplicate error toasts
  const errorShownRef = useRef(false);

  // ✅ FIXED: Remove the parameter from the hook
  const [assignOnboarding, { isLoading: isAssigning, error: assignError }] =
    useUpdateMarketingLeadsStatusMutation();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = async (e) => {
    e.preventDefault();

    if (!formData.status) {
      toast.error("Please select a status");
      return;
    }

    const payload = {
      status: Number(formData.status),
      description: formData.description.trim(),
    };

    try {
      let response;

      // ✅ FIXED: Pass both id and body to the mutation
      response = await assignOnboarding({
        id: selectedRow,
        body: payload,
      }).unwrap();

      if (response.status) {
        toast.success(response.message);
        handleClose();
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      console.error(error?.data?.message);
    }
  };

  const handleClose = () => {
    setFormData({
      status: "",
      description: "",
    });

    // Reset toast guard so next open can show new errors
    errorShownRef.current = false;

    onClose();
  };

  return (
    <ReactModal
      className="modal"
      overlayClassName="overlay"
      isOpen={isOpen}
      onRequestClose={handleClose}
      ariaHideApp={false}
    >
      <div style={{ width: "450px", minHeight: "450px", padding: "20px" }}>
        <h2
          className="sub-heading"
          style={{
            marginBottom: "20px",
            display: "flex",
            backgroundColor: "#f0f0f0",
            justifyContent: "center",
            padding: "10px",
            borderRadius: "4px",
          }}
        >
          Update Marketing Leads Status
        </h2>

        <form className="simple-form" autoComplete="off" onSubmit={handleSave}>
          {/* STATUS SELECT */}
          <div className="input-container" style={{ marginBottom: "20px" }}>
            <label
              htmlFor="status"
              style={{ display: "block", marginBottom: "8px" }}
            >
              Select Status <span style={{ color: "red" }}>*</span>
            </label>

            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="userProfile-input-field"
              style={{ width: "100%", padding: "8px" }}
              required
            >
              <option value="">-- Select Status --</option>

              {statusOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {/* DESCRIPTION */}
          <div className="input-container" style={{ marginBottom: "20px" }}>
            <label
              htmlFor="description"
              style={{ display: "block", marginBottom: "8px" }}
            >
              Description
            </label>

            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="userProfile-input-field"
              style={{
                width: "100%",
                padding: "8px",
                minHeight: "100px",
                resize: "vertical",
                fontFamily: "inherit",
              }}
              placeholder="Enter status description (optional)..."
            />
          </div>

          {/* ASSIGN ERROR */}
          {assignError && (
            <div
              style={{
                color: "red",
                marginBottom: "15px",
                padding: "10px",
                backgroundColor: "#fee",
                borderRadius: "4px",
              }}
            >
              {assignError?.data?.message ||
                "Failed to update status. Please try again."}
            </div>
          )}

          {/* BUTTONS */}
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              gap: "10px",
              marginTop: "30px",
            }}
          >
            <button
              type="button"
              className="fifthButton"
              style={{
                background: "#6c757d",
                padding: "10px 20px",
                cursor: "pointer",
              }}
              onClick={handleClose}
              disabled={isAssigning}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="fifthButton"
              style={{ padding: "10px 20px", cursor: "pointer" }}
              disabled={isAssigning}
            >
              {isAssigning ? "Updating..." : "Update Status"}
            </button>
          </div>
        </form>
      </div>
    </ReactModal>
  );
};

export default UpdateStatusMarketingLeads;
