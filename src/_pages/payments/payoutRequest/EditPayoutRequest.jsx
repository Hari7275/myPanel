import React, { useState } from "react";
import ReactModal from "react-modal";
import { useUpdatePayoutMutation } from "../../../_store/api";

import { toast } from "react-hot-toast";

const EditPayoutRequest = ({ isOpen, onClose, selectedRow }) => {
  const [formData, setFormData] = useState("");

  const request_id = selectedRow;

  console.log("response", request_id);
  console.log("selectedRow", selectedRow);

  const [updateStatus, { isLoading: isUpdating, error: updateError }] =
    useUpdatePayoutMutation();

  const handleChange = (e) => {
    setFormData(e.target.value);
  };

  const handleSave = async (e) => {
    e.preventDefault();

    // Ensure request_id is passed with the form data
    const body = {
      request_id: request_id,
      status: Number(formData),
    };

    // console.log("body", body);
    // return;
    try {
      const response = await updateStatus({ body }).unwrap();

      if (response.status) {
        toast.success(response.message);
        onClose();
      } else {
        toast.error(response.message);
      }

      if (response?.data?.status) {
        setFormData("");
      } else {
        console.error(response?.data?.message || "Failed to update status");
      }
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
          Edit payout Status
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
              <option value="2">Success</option>
              <option value="3">Rejected</option>
            </select>
            {/* <p style={{ marginTop: "40px" }}>Select a status for the User.</p> */}
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
                setFormData("");
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

export default EditPayoutRequest;
