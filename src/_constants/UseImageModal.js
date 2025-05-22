"use client";

import { useState } from "react";
import ReactModal from "react-modal";

const UseImageModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  const openImageModal = (photo) => {
    setSelectedPhoto(photo);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedPhoto(null);
  };

  const ImageModal = () => (
    <ReactModal
      isOpen={isModalOpen}
      onRequestClose={closeModal}
      contentLabel="Image Modal"
      className="imageModal"
      overlayClassName="overlay"
      ariaHideApp={false}
    >
      {selectedPhoto && (
        <div
          style={{
            width: "100%",
            // height: "600px",
            position: "relative",
            overflow: "hidden",
            padding: "0px",
          }}
        >
          <img
            src={selectedPhoto}
            style={{
              border: "none",
              width: "100%",
              height: "600px",
              objectFit: "cover",
              padding: "0px",
            }}
            alt="Selected"
          />
        </div>

        //   width="100%"
        //   height="600px"
      )}
    </ReactModal>
  );

  return { openImageModal, ImageModal };
};

export default UseImageModal;
