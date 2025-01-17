import React, { useState } from "react";
import ReactModal from "react-modal";
import { useUpdateConsultantProfilePicMutation } from "../../../_store/api";

const ProfilePhoto = ({ isOpen, onClose, selectedImage }) => {
  const [setProfilePic, { isLoading }] =
    useUpdateConsultantProfilePicMutation();

  const handleSubmit = async () => {
    try {
      await setProfilePic({
        id: selectedImage.id,
        body: { photo_type: 1 },
      });
      onClose();
    } catch (error) {
      console.log("Failed to set profile picture", error);
    }
  };

  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onClose}
      className="modal"
      overlayClassName="overlay"
    >
      <div>
        <img
          src={selectedImage?.url}
          alt="Profile"
          style={{
            width: "350px",
            height: "350px",
            objectFit: "cover",
            display: "block",
            margin: "0 auto",
          }}
        />
      </div>

      <div style={{ marginTop: "30px", textAlign: "center" }}>
        <button
          className="fifthButton"
          style={{ backgroundColor: "green" }}
          onClick={handleSubmit}
          disabled={isLoading}
        >
          {isLoading ? "Setting..." : "Set as Profile Pic"}
        </button>
      </div>
    </ReactModal>
  );
};

export default ProfilePhoto;
