import React from "react";
import ReactModal from "react-modal";

const NoticeDescription = ({ isOpen, onClose, Description }) => {
  const description = (
    <p className="info-item">
      <strong style={{ fontSize: "20px" }}>Description:</strong>
      <p style={{ fontSize: "14px" }}>{Description}</p>
    </p>
  );

  return (
    <ReactModal
      className="modal"
      overlayClassName="overlay"
      isOpen={isOpen}
      onRequestClose={onClose}
    >
      <div className="userProfile-footer-content">
        <div className="info-pair">{description}</div>
      </div>
    </ReactModal>
  );
};

export default NoticeDescription;
