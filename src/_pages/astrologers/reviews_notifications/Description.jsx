import React from "react";
import ReactModal from "react-modal";

const Description = ({ isOpen, onClose, Descriptions }) => {
  const description = (
    <p className="info-item">
      <strong style={{ fontSize: "20px" }}>Review text: </strong>
      <span style={{ fontSize: "14px" }}>{Descriptions}</span>
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

export default Description;
