import React from "react";
import ReactModal from "react-modal";
import ErrorOutlineOutlinedIcon from "@mui/icons-material/ErrorOutlineOutlined";

const DeleteComponent = ({ isOpen, onClose, onDelete, isDeleting }) => {
  const handleDelete = () => {
    onDelete();
    onClose();
  };

  return (
    <ReactModal
      className="modal"
      overlayClassName="overlay"
      isOpen={isOpen}
      onRequestClose={onClose}
    >
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
              className="fifthButton"
              style={{ background: "red", marginLeft: "10px" }}
              onClick={onClose}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </ReactModal>
  );
};

export default DeleteComponent;
