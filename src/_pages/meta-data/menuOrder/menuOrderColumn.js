import React, { useState } from "react";
import { Switch } from "@mui/material";
import { useUpdatemenuOrderMutation } from "../../../_store/api";

const StatusSwitch = ({ row }) => {
  const [status, setStatus] = useState(row.original.status === 1 ? 1 : 0);
  const [updateStatus, { isLoading }] = useUpdatemenuOrderMutation();

  const handleToggle = async () => {
    const newStatus = status === 1 ? 0 : 1;
    setStatus(newStatus);

    try {
      await updateStatus({
        id: row.original.id,
        body: { status: newStatus === 1 ? 1 : 0 },
      });
    } catch (error) { 
      console.error("Failed to update status", error);
      setStatus(status);
    }
  };

  return (
    <Switch
      checked={status == 1}
      onChange={handleToggle}
      disabled={isLoading}
    />
  );
};

export const MENUORDERCOLUMN = (toggleModal) => [
  {
    Header: "Id",
    accessor: "id",
  },
  {
    Header: "Title",
    accessor: "title",
  },

  {
    Header: "Icon",
    accessor: "icon",
    Cell: ({ row }) => (
      <div className="card-img">
        <img
          src={row.original.icon || "snake.jpg"}
          alt="Card Image"
          width="40"
          height="40"
          onClick={() => toggleModal(row.original.icon || "snake.jpg")}
          style={{ cursor: "pointer" }}
        />
      </div>
    ),
  },
  {
    Header: "Status",
    accessor: "status",
    Cell: ({ row }) => <StatusSwitch row={row} />,
  },
];
