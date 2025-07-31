import React, { useState, useEffect } from "react";
import ReactModal from "react-modal";
import { X } from "lucide-react";
import { useUpdateConsultantGalleryStatusMutation } from "../../../_store/api";

const CoachSettings = ({
  isOpen,
  onClose,
  imageUrl,
  currentStatus,
  onStatusChange,
}) => {
  const [selectedStatus, setSelectedStatus] = useState(currentStatus);
  const [updateConsultantGalleryStatus] =
    useUpdateConsultantGalleryStatusMutation();

  useEffect(() => {
    setSelectedStatus(currentStatus);
  }, [currentStatus]);

  const handleSave = async (e) => {
    e.preventDefault();

    const payload = {
      status: selectedStatus,
    };

    try {
      await updateConsultantGalleryStatus({ id: imageUrl.id, body: payload });
      // onStatusChange(imageUrl, selectedStatus);
      onClose();
    } catch (error) {
      console.error("Failed to update status:", error);
    }
  };

  const handleChange = (event) => {
    setSelectedStatus(parseInt(event.target.value, 10));
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
                id="pending"
                type="radio"
                name="status"
                value={1}
                checked={selectedStatus === 1}
                onChange={handleChange}
              />
              <label htmlFor="pending">Pending</label>
            </span>

            <span className="radio-item">
              <input
                id="approved"
                type="radio"
                name="status"
                value={2}
                checked={selectedStatus === 2}
                onChange={handleChange}
              />
              <label htmlFor="approved">Approved</label>
            </span>

            <span className="radio-item">
              <input
                id="rejected"
                type="radio"
                name="status"
                value={3}
                checked={selectedStatus === 3}
                onChange={handleChange}
              />
              <label htmlFor="rejected">Rejected</label>
            </span>
          </div>

          <button
            onClick={handleSave}
            className="fifthButton save-Button"
          >
            Save
          </button>
        </div>
      </div>
    </ReactModal>
  );
};

export default CoachSettings;
