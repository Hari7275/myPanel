import { FileX } from "lucide-react";
import React, { useState } from "react";
import ReactModal from "react-modal";
import { X } from "lucide-react";
import "./astrologerSettings.css";

const AstrologerSettings = ({ isOpen, onClose }) => { 

  const handleSave = () => {
    onClose();
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
              <input id="approved" type="radio" name="status" />
              <label htmlFor="approved">Approved</label>
            </span>

            <span className="radio-item">
              <input id="pending" type="radio" name="status" />
              <label htmlFor="pending">Pending</label>
            </span>

            <span className="radio-item">
              <input id="rejected" type="radio" name="status" />
              <label htmlFor="rejected">Rejected</label>
            </span>
          </div>

          <button onClick={handleSave} className="fifthButton">
            Save
          </button>
        </div>
      </div>
    </ReactModal>
  );
};

export default AstrologerSettings;
