import React from "react";
import "./modal.css";
import ErrorOutlineOutlinedIcon from "@mui/icons-material/ErrorOutlineOutlined";

const DeleteModal = ({ closeUSerPassion_modal, handleDelete }) => {
  return (
    <div className="deleteModal-container">
      <div className="delete-icon">
        <ErrorOutlineOutlinedIcon style={{ fontSize: 50, color: "red" }} />
      </div>
      <div className="lowerPartdeletePopup">
        <h2 className="deleteHeaderText">Are you sure?</h2>
        <div className="deleteText">
          <p>Do you want to delete this record?</p>
        </div>
        <div className="deleteButton">
          <button
            className="fifthButton"
            style={{ marginRight: "10px" }}
            onClick={handleDelete}
          >
            Yes
          </button>
          <button
            onClick={closeUSerPassion_modal}
            className="fifthButton"
            style={{ background: "red", marginLeft: "10px" }}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
