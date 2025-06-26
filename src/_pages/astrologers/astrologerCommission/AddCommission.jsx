import React, { useState, useEffect } from "react";
import ReactModal from "react-modal";

import toast from "react-hot-toast";

const AddCommission = ({ isOpen, onClose }) => {
  return (
    <ReactModal
      className="modal"
      overlayClassName="overlay"
      isOpen={isOpen}
      onRequestClose={onClose}
    >
      <label
        className="sub-heading"
        style={{
          marginBottom: "20px",
          display: "block",
          backgroundColor: "#f0f0f0",
        }}
      >
        Update Commission
      </label>

      <form className="simple-form" noValidate autoComplete="off">
        <div style={{ display: "flex" }}></div>

        <div
          style={{
            marginTop: "20px",
            justifyContent: "center",
            display: "flex",
          }}
        >
          <div>
            <div>
              <div></div>
            </div>
          </div>
          <button
            type="button"
            className="fifthButton"
            style={{ marginRight: "10px" }}
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="fifthButton"
            style={{ backgroundColor: "green" }}
          >
            {/* {isUpdating ? "Saving..." : "Save"} */}
            save
          </button>
        </div>
      </form>
    </ReactModal>
  );
};

export default AddCommission;
