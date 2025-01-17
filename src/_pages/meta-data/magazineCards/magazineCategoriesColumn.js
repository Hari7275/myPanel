import React, { useState } from "react";
import { Switch } from "@mui/material";
import { useUpdatefluteMagzineMutation } from "../../../_store/api";

const StatusSwitch = ({ row }) => {
  const [status, setStatus] = useState(row.original.status);
  const [updateStatus, { isLoading }] = useUpdatefluteMagzineMutation();

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

export const MAGAZINECATEGORYCOLUMN = (toggleModal) => [
  {
    Header: "Id",
    accessor: "id",
  },
  {
    Header: "Category Name",
    accessor: "name",
  },
  {
    Header: "Image",
    accessor: "image",
    Cell: ({ row }) => (
      <div className="card-img">
        <img
          src={row.original.image || "snake.jpg"}
          alt="Card Image"
          width="40"
          height="40"
          onClick={() => toggleModal((row.original.image) || ("snake.jpg"))}
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
