import React, { useState, useEffect } from "react";
import ReactModal from "react-modal";

import { useUpdateqRunningOrderMutation } from "../../../_store/api";

import toast from "react-hot-toast";

const CompleteOrder = ({ isOpen, onClose, selectedRow }) => {
  const [formData, setFormData] = useState("");

  console.log("selectedRow", selectedRow);

  const [updateRunningStatus, { isLoading: isUpdating, error: updateError }] =
    useUpdateqRunningOrderMutation();

  const handleChange = (e) => {
    setFormData(e.target.value);
  };

  const handleSave = async (e) => {
    e.preventDefault();

    if (!selectedRow) {
      console.error("Selected row is not valid.");
      return;
    }

    const payload = {
      order_id: selectedRow.id,
      consultant_id: selectedRow.consultant_id,
      status: 4,
      completed_by: 5,
    };

    try {
      const response = await updateRunningStatus({
        body: payload,
      });

      if (response?.data?.status) {
        toast.success(response?.data?.message);
      } else {
        toast.error(response?.data?.message);
      }

      onClose();
      console.log("name");
    } catch (error) {
      console.error("Failed to update status:", error);
      if (error.data) {
        console.error("API Error Data:", error.data);
      }
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
          Complete Order
        </h2>
        <form
          className="simple-form"
          noValidate
          autoComplete="off"
          onSubmit={handleSave}
          style={{ display: "flex", alignItems: "center" }}
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
              <option value={4}>Completed</option>
            </select>
            <p style={{ margin: "20px 10px" }}>
              Do you want to complete the order.
            </p>
          </div>

          <div style={{ margin: "120px 0 0 0px" }}>
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
              onClick={onClose}
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

export default CompleteOrder;
