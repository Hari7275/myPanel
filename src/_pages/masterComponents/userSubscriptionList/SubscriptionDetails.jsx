import React, { useState } from "react";
import ReactModal from "react-modal";

import { useSelector } from "react-redux";

const SubscriptionDetails = ({ isOpen, onClose, selectedRow }) => {
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
          Edit User Type
        </h2>
      </div>
    </ReactModal>
  );
};

export default SubscriptionDetails;
