import React, { useState } from "react";
import ReactModal from "react-modal";
import {
  useUpdateConsultantProfilePicMutation,
  useUpdateConsultantRejectProfilePicMutation,
} from "../../../_store/api";

const ProfilePhoto = ({ isOpen, onClose, selectedImage }) => {
  const [setProfilePic, { isLoading }] =
    useUpdateConsultantProfilePicMutation();
  const [rejectProfilePic, { isLoading: isReject }] =
    useUpdateConsultantRejectProfilePicMutation();

  const handleSubmit = async () => {
    try {
      await setProfilePic({
        id: selectedImage.id,
        body: { photo_type: 1, status: 2 },
      });
      onClose();
    } catch (error) {
      console.log("Failed to set profile picture", error);
    }
  };

  const handleCancel = async () => {
    try {
      await rejectProfilePic({
        id: selectedImage?.id,
        body: { request_type: "set_profile_pic" },
      });
      onClose();
    } catch (error) {
      console.log("Failed to set profile picture", error);
    }
  };

  // this is request profile pic

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
        {selectedImage?.profile_pic_request == 1 ? (
          <>
            <button
              className="fifthButton"
              style={{ backgroundColor: "red", marginRight: "30px" }}
              onClick={handleCancel}
              disabled={isLoading}
            >
              {isReject ? "canceling..." : "Cancel"}
            </button>
            <button
              className="fifthButton"
              style={{ backgroundColor: "green" }}
              onClick={handleSubmit}
              disabled={isLoading}
            >
              {isLoading ? "Setting..." : "Set as Profile Pic"}
            </button>
          </>
        ) : (
          <button
            className="fifthButton"
            style={{ backgroundColor: "green" }}
            onClick={handleSubmit}
            disabled={isLoading}
          >
            {isLoading ? "Setting..." : "Set as Profile Pic"}
          </button>
        )}
      </div>
    </ReactModal>
  );
};

export default ProfilePhoto;
