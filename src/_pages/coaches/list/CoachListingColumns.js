import "../../../cssfolder/column.css";
import ReactModal from "react-modal";
import { useState } from "react";

import {
  getGenderLabelInSort,
  getStatusLabel,
} from "../../../_constants/consultantConstant";

const CustomUserType = ({ value }) => {
  return <span className="orderId-color">{value}</span>;
};

const GenderCell = ({ value }) => {
  return <span>{getGenderLabelInSort(value)}</span>;
};

const StatusCell = ({ value }) => {
  return <span>{getStatusLabel(value)}</span>;
};

// ******************************************************* open image by using react modal   (and fetch data image and name)

const NameCell = ({ row }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleImageClick = () => {
    setIsOpen(true);
  };
  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <div className="column_container">
      <div className="card-img" style={{ cursor: "pointer" }}>
        <img
          src={row?.original.profile_pic || "avatar11.png"}
          alt="Avatar"
          width="20"
          height="20"
          onClick={handleImageClick}
        />
      </div>
      <span className="column_container_name">
        {/* {row.original.first_name} {` `}
        {row.original.last_name} */}
        {`${row.original.first_name} ${row.original.last_name || ""}`}
      </span>

      <ReactModal
        isOpen={isOpen}
        onRequestClose={closeModal}
        contentLabel="Image Modal"
        className="  imageModal"
        overlayClassName="overlay"
      >
        <img
          src={row?.original.profile_pic || "avatar11.png"}
          alt="Avatar"
          width="100%"
          height="600px"
        />
      </ReactModal>
    </div>
  );
};

export const COACHES_COLUMNS = [
  {
    Header: "Id",
    accessor: "id",
  },
  {
    Header: "Name",
    Cell: NameCell,
  },
  // {
  //   Header: "Email",
  //   accessor: "email_address",
  // },
  {
    Header: "GD",
    accessor: "gender",
    Cell: GenderCell,
  },

  {
    Header: "Phone No.",
    accessor: "phoneNumber",
    Cell: CustomUserType,
  },

  {
    Header: "Location",
    accessor: "country",
  },
  // {
  //   Header: "Profile Status",
  //   accessor: "profile_status",
  //   Cell: ({ value }) => (value === 1 ? "Active" : "Inactive"),

  // },
  {
    Header: "Status",
    accessor: "status",
    Cell: StatusCell,
  },

  {
    Header: "Applied On",
    accessor: "created_at",
    Cell: ({ value }) => {
      const date = new Date(value) || "Aug 9, 2025, 2:12 AM";
      return date.toLocaleString("en-US", {
        dateStyle: "medium",
        timeStyle: "short",
      });
    },
  },
  {
    Header: "Last Modified",
    accessor: "updated_at",
    Cell: ({ value }) => {
      const date = new Date(value);
      return date.toLocaleString("en-US", {
        dateStyle: "medium",
        timeStyle: "short",
      });
    },
  },
  {
    Header: "Assigned To",
    accessor: "assign_to_name",
  },
  {
    Header: "Assigned By",
    accessor: "assigned_by_name",
  },
];
