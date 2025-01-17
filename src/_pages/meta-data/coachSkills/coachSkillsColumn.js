import { useState } from "react";
import { format } from "date-fns";
import { Switch } from "@mui/material";
import ReactModal from "react-modal";
import { useUpdateCoachSkillsMutation } from "../../../_store/api";

const StatusSwitch = ({ row }) => {
  const [status, setStatus] = useState(row.original.status);
  const [updateStatus, { isLoading }] = useUpdateCoachSkillsMutation();

  const handleToggle = async () => {
    const newStatus = status === "active" ? "inactive" : "active";
    setStatus(newStatus);

    try {
      await updateStatus({
        id: row.original.id,
        body: { status: newStatus },
      });
    } catch (error) {
      console.error("Failed to update status", error);
      setStatus(status);
    }
  };

  return (
    <Switch
      checked={status === "active"}
      onChange={handleToggle}
      disabled={isLoading}
    />
  );
};

// ******************************************************* open image by using react modal

const IconCell = ({ row }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleImageClick = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <>
      <div className="card-img" style={{ cursor: "pointer" }}>
        <img
          src={row.original.icon || "snake.jpg"}
          alt="Card Image"
          width="40"
          height="40"
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
          src={row.original.icon || "girl-avtar.png"}
          alt="Avatar"
          width="100%"
          height="600px"
        />
      </ReactModal>
    </>
  );
};

export const COACHSKILSSCOLUMN = [
  {
    Header: "Id",
    accessor: "id",
  },
  {
    Header: "Category Name",
    accessor: "category_name",
    Cell: ({ row }) => row.original.CoachCategory?.category_name || "N/A",
  },

  {
    Header: "Skills Name",
    accessor: "skill_name",
  },

  {
    Header: "Icon",
    accessor: "icon",
    Cell: IconCell,
  },

  {
    Header: "Updated Date",
    accessor: "updatedAt",
    Cell: ({ value }) => format(new Date(value), "P"),
  },
  {
    Header: "Status",
    accessor: "status",
    Cell: ({ row }) => <StatusSwitch row={row} />,
  },
];
