import React, { useState } from "react";
import { Switch } from "@mui/material";
import { useUpdateSubscriptionMutation } from "../../../_store/api";

const StatusSwitch = ({ row }) => {
  const [status, setStatus] = useState(row.original.status);
  const [updateStatus, { isLoading }] = useUpdateSubscriptionMutation();

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

export const SUBSCRIPTIONPLANCOLUMN = [
  {
    Header: "Id",
    accessor: "id",
  },

  {
    Header: "Display Name",
    accessor: "display_name",
  },

  {
    Header: "Product Price",
    accessor: "price",
  },

  {
    Header: "Duration",
    accessor: "type",
  },
  {
    Header: "Validate Period",
    accessor: "validity_period",
  },

  {
    Header: "Status",
    accessor: "status",
    Cell: ({ row }) => <StatusSwitch row={row} />,
  },
];
