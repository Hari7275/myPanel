"use client";

import { useState } from "react";
import ReactModal from "react-modal";

const UseImageModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState();

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
      className="modal"
      overlayClassName="overlay"
      ariaHideApp={false}
    >
      {selectedPhoto && (
        <div className="image-container w-full h-full md:h-[750px] relative overflow-hidden">
          <img
            src={selectedPhoto}
            className="border-none w-full h-full object-cover"
            alt="Selected"
          />
        </div>
      )}
    </ReactModal>
  );

  return { openImageModal, ImageModal };
};

export default UseImageModal;
