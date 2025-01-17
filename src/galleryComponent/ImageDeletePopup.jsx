import React from "react";

import ErrorOutlineOutlinedIcon from "@mui/icons-material/ErrorOutlineOutlined";

const ImageDeletePopup = ({ closeImageDelete_Modal }) => {
  return (
    <>
      <div className="deleteModal-container">
        <div className="delete-icon">
          <ErrorOutlineOutlinedIcon style={{ fontSize: 50, color: "red" }} />
        </div>
        <div className="lowerPartdeletePopup">
          <h2 className="deleteHeaderText">Are you sure ?</h2>
          <div className="deleteText">
            <p>You won to delete this image ?</p>
          </div>
          <div className="deleteButton">
            <button className="fifthButton" style={{ marginRight: "10px" }}>
              Yes
            </button>

            <button
              onClick={closeImageDelete_Modal}
              className="fifthButton"
              style={{ background: "red", marginLeft: "10px" }}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ImageDeletePopup;
