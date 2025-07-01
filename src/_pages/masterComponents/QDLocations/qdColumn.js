import React, { useState } from "react";
import ReactModal from "react-modal";

const ImageCell = ({ row }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleImageClick = () => {
    setIsOpen(true);
  };
  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <div className="column_container">
      <div className="card-img">
        <img
          src={row.original.location_photo}
          alt="Card Image"
          width="40"
          height="40"
          style={{ cursor: "pointer" }}
          onClick={handleImageClick}
        />
      </div>

      <ReactModal
        isOpen={isOpen}
        onRequestClose={closeModal}
        contentLabel="Image Modal"
        className="modal"
        overlayClassName="overlay"
      >
        <img
          src={row.original.location_photo}
          alt="Avatar"
          width="100%"
          height="600px"
        />
      </ReactModal>
    </div>
  );
};

export const QDLOACTIONCOLUMN = () => [
  {
    Header: "Id",
    accessor: "id",
  },

  {
    Header: "Location Name",
    accessor: "location_name",
  },
  {
    Header: "Image",
    accessor: "location_photo",
    Cell: ImageCell,
  },
];
