

// export const ACCOUNTCOLUMNS = [
//   { Header: "Id", accessor: "id" },
//   { Header: "Holder Name", accessor: "account_holder_name" },
//   {
//     Header: "Passbook Photo",
//     accessor: "passbook_photo",
//     Cell: ({ row }) => (
//       <div className="card-img">
//         <img
//           src={row.original.passbook_photo || "snake.jpg"}
//           alt="passbook photo"
//           width="40"
//           height="40"
//           style={{ cursor: "pointer" }}
//         />
//       </div>
//     ),
//   },
//   {
//     Header: "Pan Card ",
//     accessor: "pancard_photo",
//     Cell: ({ row }) => (
//       <div className="card-img">
//         <img
//           src={row?.original?.pancard_photo || "snake.jpg"}
//           alt="passbook photo"
//           width="40"
//           height="40"
//           style={{ cursor: "pointer" }}
//         />
//       </div>
//     ),
//   },
//   {
//     Header: "Status",
//     accessor: "status",
//     Cell: ({ value }) => {
//       const captalizeStatus = value.charAt(0).toUpperCase() + value.slice(1);
//       return <span>{captalizeStatus}</span>;
//     },
//   },
// ];

// // *******************************************PAYPALCOLUMNS ******************
// export const PAYPALCOLUMNS = [
//   { Header: "Id", accessor: "id" },
//   { Header: "PayPal ID ", accessor: "paypal_id" },

//   {
//     Header: "Status",
//     accessor: "status",
//     Cell: ({ value }) => {
//       const captalizeStatus = value.charAt(0).toUpperCase() + value.slice(1);
//       return <span>{captalizeStatus}</span>;
//     },
//   },
// ];






import React, { useState } from "react";
import MyGallery from "../../../_constants/MyGallery"; // Adjust the path as needed

const ImagePopup = ({ src, alt }) => {
  const [showGallery, setShowGallery] = useState(false);

  const popupImage = () => {
    setShowGallery(true);
  };



  return (
    <>
      <img
        src={src || "snake.jpg"}
        alt={alt}
        width="40"
        height="40"
        style={{ cursor: "pointer" }}
        onClick={popupImage}
      />

      {showGallery && (
        <div className="gallery-modal" onClick={() => setShowGallery(false)}>
          <div
            className="gallery-modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <MyGallery images={[{ url: src }]} initialIndex={0} />
          </div>
        </div>
      )}
    </>
  );
};

export const ACCOUNTCOLUMNS = [
  { Header: "Id", accessor: "id" },
  { Header: "Holder Name", accessor: "account_holder_name" },
  {
    Header: "Passbook Photo",
    accessor: "passbook_photo",
    Cell: ({ row }) => (
      <div className="card-img">
        <ImagePopup src={row.original.passbook_photo} alt="passbook photo" />
      </div>
    ),
  },
  {
    Header: "Pan Card ",
    accessor: "pancard_photo",
    Cell: ({ row }) => (
      <div className="card-img">
        <ImagePopup src={row?.original?.pancard_photo} alt="pancard photo" />
      </div>
    ),
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

