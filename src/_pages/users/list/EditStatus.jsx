import React, { useState } from "react";
import ReactModal from "react-modal";
import { useUpdateUserStatusMutation } from "../../../_store/api";

const EditStatus = ({ isOpen, onClose, selectedRow }) => {
  const [formData, setFormData] = useState("");

  const [updateStatus, { isLoading: isUpdating, error: updateError }] =
    useUpdateUserStatusMutation();

  const handleChange = (e) => {
    setFormData(e.target.value);
  };

  const handleSave = async (e) => {
    e.preventDefault();

    try {
      await updateStatus({
        user_id: selectedRow,
        body: { status: Number(formData) },
      });
      onClose();
      setFormData("");
    } catch (error) {
      console.error("Failed to update status:", error);
    }
  };

  return (
    <ReactModal
      className="modal"
      overlayClassName="overlay"
      isOpen={isOpen}
      onRequestClose={onClose}
      ariaHideApp={false}
    >
      <div style={{ width: "400px", height: "400px" }}>
        <h2
          className="sub-heading"
          style={{
            marginBottom: "20px",
            display: "flex",
            backgroundColor: "#f0f0f0",
            justifyContent: "center",
          }}
        >
          Edit Status
        </h2>
        <form
          className="simple-form"
          noValidate
          autoComplete="off"
          onSubmit={handleSave}
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <div className="input-container">
            <label htmlFor="status">Status</label>
            <select
              id="status"
              name="status"
              value={formData}
              onChange={handleChange}
              className="userProfile-input-field"
              aria-describedby="status-desc"
            >
              <option value="">Select Status</option>
              <option value="1">Active</option>
              <option value="2">Inactive</option>
              <option value="3">Blocked</option>
              <option value="4">Deleted</option>
            </select>
            <p style={{ marginTop: "40px" }}>Select a status for the User.</p>
          </div>

          <div
            style={{
              marginTop: "70px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <button
              type="submit"
              className="fifthButton"
              style={{ marginRight: "10px" }}
              disabled={isUpdating}
              aria-label="Save changes"
            >
              {isUpdating ? "Saving..." : "Save"}
            </button>
            <button
              type="button"
              className="fifthButton"
              style={{ background: "red", marginLeft: "10px" }}
              onClick={() => {
                setFormData(""); // Reset form data on cancel
                onClose();
              }}
              disabled={isUpdating}
              aria-label="Cancel changes"
            >
              Cancel
            </button>
          </div>
        </form>
        {updateError && (
          <p style={{ color: "red" }}>
            {updateError.data?.message || "Failed to update status."}
          </p>
        )}
      </div>
    </ReactModal>
  );
};

export default EditStatus;
