import React from "react";
import ReactModal from "react-modal";
import { useUpdateUserProfilePicMutation } from "../../../_store/api";

const ProfilePhoto = ({ isOpen, onClose, userId, photoId, imageUrl }) => {
  const [setProfilePic, { isLoading }] = useUpdateUserProfilePicMutation();

  const handleSubmit = async () => {
    try {
      await setProfilePic({ id: photoId, body: { userId } });
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
          src={imageUrl}
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
