import ReactModal from "react-modal";
import { useState } from "react";

// ******************************************************* open image by using react modal (and fetch data image and name)
export const ImageCell = ({ imageSrc, fallback = "girl-avtar.png" }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleImageClick = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return (
    <div className="column_container">
      <div className="card-img">
        <img
          src={imageSrc || fallback}
          alt="Preview"
          width="40"
          height="40"
          onClick={handleImageClick}
          style={{ cursor: "pointer" }}
        />
      </div>

      <ReactModal
        isOpen={isOpen}
        onRequestClose={closeModal}
        contentLabel="Image Modal"
        className="imageModal"
        overlayClassName="overlay"
        ariaHideApp={false}
      >
        <img
          src={imageSrc || fallback}
          alt="Full Preview"
          style={{ width: "100%", height: "600px", objectFit: "contain" }}
        />
      </ReactModal>
    </div>
  );
};

export const ACCOUNTCOLUMNS = [
  { Header: "Id", accessor: "id" },
  { Header: "Holder Name", accessor: "account_holder_name" },
  {
    Header: "Passbook Photo",
    Cell: ({ row }) => <ImageCell imageSrc={row.original.passbook_photo} />,
    // Cell: ImageCell,
    // accessor: "passbook_photo",
    // Cell: ({ row }) => (
    //   <div className="card-img">
    //     <img
    //       src={row.original.passbook_photo || "snake.jpg"}
    //       alt="passbook photo"
    //       width="40"
    //       height="40"
    //       style={{ cursor: "pointer" }}
    //     />
    //   </div>
    // ),
  },
  // ch
  {
    Header: "Pan Card",
    Cell: ({ row }) => <ImageCell imageSrc={row.original.pancard_photo} />,
  },
  {
    Header: "Status",
    accessor: "status",
    Cell: ({ value }) => {
      const captalizeStatus = value.charAt(0).toUpperCase() + value.slice(1);
      return <span>{captalizeStatus}</span>;
    },
  },
];

// *******************************************PAYPALCOLUMNS ******************
export const PAYPALCOLUMNS = [
  { Header: "Id", accessor: "id" },
  { Header: "PayPal ID ", accessor: "paypal_id" },

  {
    Header: "Status",
    accessor: "status",
    Cell: ({ value }) => {
      const captalizeStatus = value.charAt(0).toUpperCase() + value.slice(1);
      return <span>{captalizeStatus}</span>;
    },
  },
];
