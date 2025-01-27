import React, { useState, useEffect } from "react";
import ReactModal from "react-modal";
import { X } from "lucide-react";

import {
  useUpdateBankDetailStatusMutation,
  useUpdatePayPalDetailStatusMutation,
} from "../../../_store/api";

// Reusable RadioButton component
const RadioButton = ({ id, name, value, checked, onChange, label }) => (
  <span className="radio-item">
    <input
      id={id}
      type="radio"
      name={name}
      value={value}
      checked={checked}
      onChange={onChange}
    />
    <label htmlFor={id}>{label}</label>
  </span>
);

const EditStatus = ({ isOpen, onClose, currentStatus, phoneCode }) => {
  const [selectedStatus, setSelectedStatus] = useState(currentStatus?.status);
  const [selectedRejectReason, setSelectedRejectReason] = useState(
    currentStatus?.reject_reason
  );
  const [updateBankStatus, { isLoading: isBankUpdating, error: bankError }] =
    useUpdateBankDetailStatusMutation();

  const [
    updatePaypalStatus,
    { isLoading: isPayPalUpdating, error: paypalError },
  ] = useUpdatePayPalDetailStatusMutation();

  useEffect(() => {
    setSelectedStatus(currentStatus?.status);
  }, [currentStatus]);

  const handleSave = async () => {
    try {
      const requestBody = {
        status: selectedStatus,
        ...(selectedStatus === "rejected" && {
          reject_reason: selectedRejectReason,
        }),
      };

      // Dynamically choose the API based on phoneCode
      if (phoneCode === "+91") {
        await updateBankStatus({
          id: currentStatus?.id,
          body: requestBody,
        }).unwrap();
      } else {
        await updatePaypalStatus({
          id: currentStatus?.id,
          body: requestBody,
        }).unwrap();
      }

      onClose();
    } catch (err) {
      console.error("Failed to update status:", err);
    }
  };

  const handleStatusChange = (event) => {
    const { value } = event.target;
    setSelectedStatus(value);
  };
  const handleChange = (e) => {
    const { value } = e.target;

    setSelectedRejectReason(value);
  };
  const isUpdating = isBankUpdating || isPayPalUpdating;
  const error = bankError || paypalError;
  return (
    <ReactModal
      className="modal"
      overlayClassName="overlay"
      isOpen={isOpen}
      onRequestClose={onClose}
    >
      <div className="setting-modal-content">
        <span onClick={onClose} className="close-button">
          <X />
        </span>

        <div className="setting-modal-body">
          <div className="profile-link">
            <h2>Change Status</h2>
          </div>

          <div className="radio-group">
            <RadioButton
              id="approved"
              name="status"
              value="approved"
              checked={selectedStatus === "approved"}
              onChange={handleStatusChange}
              label="Approved"
            />

            <RadioButton
              id="rejected"
              name="status"
              value="rejected"
              checked={selectedStatus === "rejected"}
              onChange={handleStatusChange}
              label="Rejected"
            />

            {selectedStatus === "rejected" && (
              <textarea
                style={{
                  marginTop: "20px",
                  width: "100%",
                  height: "150px",
                  padding: "10px",
                  border: "1px solid #ccc",
                  borderRadius: "4px",
                  fontSize: "14px",
                  fontFamily: "'Arial', sans-serif",
                  resize: "vertical",
                }}
                label="Description"
                type="text"
                id="description"
                name="description"
                placeholder="Mentioned the account reject reason here"
                value={selectedRejectReason}
                onChange={handleChange}
              />
            )}
          </div>

          <button
            onClick={handleSave}
            style={{ width: "35%", marginLeft: "20px" }}
            className="fifthButton"
            disabled={isUpdating} // Disable button while updating
          >
            {isUpdating ? "Saving..." : "Save"}
          </button>

          {error && <p className="error">Failed to update status.</p>}
        </div>
      </div>
    </ReactModal>
  );
};

export default EditStatus;
