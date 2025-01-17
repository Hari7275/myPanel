import React, { useState } from "react";
import { Switch } from "@mui/material";
import { format } from "date-fns";
import { useUpdateLanguageMutation } from "../../../_store/api";

const StatusSwitch = ({ row }) => {
  const [status, setStatus] = useState(row.original.status);
  const [updateStatus, { isLoading }] = useUpdateLanguageMutation();

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

export const LANGUAGECATEGORYCOLUMN = [
  {
    Header: "Id",
    accessor: "id",
    // Cell: ({ row }) => row.index + 1,
  },
  {
    Header: "Language",
    accessor: "language",
  },

  {
    Header: "Updated Date",
    accessor: "updatedAt",
    Cell: ({ value }) => format(new Date(value), "P"),
  },
  {
    Header: "Status",
    accessor: "status",
    // Cell: ({ row }) => <StatusSwitch row={row} />,
  },
];
