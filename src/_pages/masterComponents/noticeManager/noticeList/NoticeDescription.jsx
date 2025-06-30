import React from "react";
import ReactModal from "react-modal";

const NoticeDescription = ({ isOpen, onClose, Description }) => {
  // const description = (
  //   <p className="info-item">
  //     <strong style={{ fontSize: "20px" }}>Description:</strong>
  //     <p style={{ fontSize: "14px" }}>{Description}</p>
  //   </p>
  // );

  return (
    <ReactModal
      className="modal"
      overlayClassName="overlay"
      isOpen={isOpen}
      onRequestClose={onClose}
    >
      <div className="userProfile-footer-content">
        <div
          className="info-pair"
          style={{ display: "flex", flexDirection: "column" }}
        >
          <strong
            style={{
              marginBottom: "20px",
              display: "block",
              backgroundColor: "#f0f0f0",
              textAlign: "center",
              padding: "10px 0",
            }}
          >
            Description
          </strong>
          <div
            style={{ fontSize: "14px" }}
            dangerouslySetInnerHTML={{ __html: Description }}
          />
        </div>
      </div>
    </ReactModal>
  );
};

export default NoticeDescription;
