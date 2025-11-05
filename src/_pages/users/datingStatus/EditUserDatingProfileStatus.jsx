import React, { useState } from "react";
import ReactModal from "react-modal";
import { useUpdateUserDatingStatusMutation } from "../../../_store/api";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const EditUserDatingProfileStatus = ({ isOpen, onClose, selectedRow }) => {
  const [formData, setFormData] = useState("");
  // const userId = useSelector((state) => state.user.userData);
  const { userId } = useParams();

  const [updateStatus, { isLoading: isUpdating, error: updateError }] =
    useUpdateUserDatingStatusMutation();

  const handleChange = (e) => {
    setFormData(e.target.value);
  };

  const handleSave = async (e) => {
    e.preventDefault();

    try {
      await updateStatus({ user_id: userId, id: Number(formData) });
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
      <div style={{ width: "350px", height: "400px" }}>
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
            alignItems: "center",
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

              <option value="1">Uncreated</option>
              <option value="2">Active</option>
              <option value="3">Inactive</option>
              <option value="4">Blocked</option>
              <option value="5">Suspended</option>
              <option value="6">Terminated</option>
              <option value="7">Deleted</option>
              <option value="8">Pause</option>
              <option value="9">Under Review</option>
              <option value="10">Rejected</option>
            </select>
            <p style={{ margin: "20px 20px" }}>Select a status for the User.</p>
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
            {updateError?.data?.message || "Failed to update status."}
          </p>
        )}
      </div>
    </ReactModal>
  );
};

export default EditUserDatingProfileStatus;
