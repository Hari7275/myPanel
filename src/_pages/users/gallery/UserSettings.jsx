import React, { useState, useEffect } from "react";
import ReactModal from "react-modal";
import { X } from "lucide-react";
import { useUpdateUserGalleryStatusMutation } from "../../../_store/api";

const UserSettings = ({
  isOpen,
  onClose,
  imageData,

  onUpdateStatus,
}) => {
  const [selectedStatus, setSelectedStatus] = useState();
  const [textareaValue, setTextareaValue] = useState("");
  const [updateUserGalleryStatus] = useUpdateUserGalleryStatusMutation();

  useEffect(() => {
    setSelectedStatus(imageData.status);
  }, [imageData]);

  const handleStatusChange = (event) => {
    setSelectedStatus(event.target.value);
  };

  const handleTextareaChange = (event) => {
    setTextareaValue(event.target.value);
  };

  const handleSave = async (e) => {
    e.preventDefault();

    const payload = {
      status: selectedStatus,
    };

    try {
      await updateUserGalleryStatus({ id: imageData.id, body: payload });
      onUpdateStatus(imageData.url, selectedStatus);
      onClose();
    } catch (error) {
      console.error("Failed to update status:", error);
    }
  };

  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onClose}
      className="modal"
      overlayClassName="overlay"
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
            <span className="radio-item">
              <input
                id="approved"
                type="radio"
                name="status"
                value="approved"
                onChange={handleStatusChange}
                checked={selectedStatus === "approved"}
              />
              <label htmlFor="approved">Approved</label>
            </span>

            <span className="radio-item">
              <input
                id="pending"
                type="radio"
                name="status"
                value="pending"
                onChange={handleStatusChange}
                checked={selectedStatus === "pending"}
              />
              <label htmlFor="pending">Pending</label>
            </span>

            <span className="radio-item">
              <input
                id="rejected"
                type="radio"
                name="status"
                value="rejected"
                onChange={handleStatusChange}
                checked={selectedStatus === "rejected"}
              />
              <label htmlFor="rejected">Rejected</label>
            </span>

            <span className="radio-item">
              <textarea
                style={{ paddingLeft: "10px", fontSize: "16px" }}
                name="textarea"
                rows="5"
                cols="50"
                value={textareaValue}
                onChange={handleTextareaChange}
              />
            </span>
          </div>

          <button
            onClick={handleSave}
            style={{ width: "35%", marginLeft: "20px" }}
            className="fifthButton"
          >
            Save
          </button>
        </div>
      </div>
    </ReactModal>
  );
};

export default UserSettings;
