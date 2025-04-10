import React, { useState } from "react";
import { Switch } from "@mui/material";
import { useUpdateDashboardOrderListMutation } from "../../../_store/api";

const StatusSwitch = ({ row }) => {
  const [status, setStatus] = useState(row.original.status);
  const [updateStatus, { isLoading }] = useUpdateDashboardOrderListMutation();

  const handleToggle = async () => {
    const newStatus = status == 1 ? 2 : 1;
    setStatus(newStatus);

    try {
      await updateStatus({
        id: row.original.id,
        body: { status: newStatus },
      });
    } catch (error) {
      console.log("failed to upload status", error);
      setStatus(status);
    }
  };
  return (
    <Switch
      checked={status === 1}
      onChange={handleToggle}
      disabled={isLoading}
    />
  );
};

export const DASHBORDORDERCOLUMN = [
  {
    Header: "Id",
    accessor: "id",
  },
  {
    Header: "Title",
    accessor: "title",
  },
  {
    Header: "Content Type",
    accessor: "content_type",
  },
  {
    Header: "Category id",
    accessor: "category_ids",
    Cell: ({ value }) => (
      <span>{value && value.length > 0 ? value.join(",") : "N/A"}</span>
    ),
  },
  {
    Header: "Preferred id",
    accessor: "preferred_ids",
    Cell: ({ value }) => (
      <span
        style={{
          display: "block",
          maxWidth: "250px",
          wordBreak: "break-word",
        }}
      >
        {value && value.length > 0 ? value.join(",") : "N/A"}
      </span>
    ),
  },
  {
    Header: "Consultant Type",
    accessor: "consultant_type",
  },

  {
    Header: "Display Order",
    accessor: "display_order",
  },

  {
    Header: "Status",
    accessor: "status",
    Cell: ({ row }) => <StatusSwitch row={row} />,
  },
];
