import React, { useState } from "react";
import { format } from "date-fns";
import { Switch } from "@mui/material";
import { useUpdateReportReasonMutation } from "../../../_store/api";

const StatusSwitch = ({ row }) => {
  const [status, setStatus] = useState(row.original.status);
  const [updateStatus, { isLoading }] = useUpdateReportReasonMutation();

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

export const REPORTREASONCOLUMN = [
  {
    Header: "Id",
    accessor: "id",
    // Cell: ({ row }) => row.index + 1,
  },
  {
    Header: "Report Reason",
    accessor: "text",
    Cell: ({ row }) => (
      <div
        style={{
          maxWidth: "350px",
          wordWrap: "break-word",
        }}
      >
        {row.original.text}
      </div>
    ),
  },

  {
    Header: "Report Type",
    accessor: "type",
  },

  {
    Header: "Status",
    accessor: "status",
    Cell: ({ row }) => <StatusSwitch row={row} />,
  },
];
