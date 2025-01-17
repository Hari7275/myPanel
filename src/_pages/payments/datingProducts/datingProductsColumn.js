import React, { useState } from "react";
import { Switch } from "@mui/material";
import { useUpdateDatingMutation } from "../../../_store/api";



const StatusSwitch = ({ row }) => {
  const [status, setStatus] = useState(row.original.status);
  const [updateStatus, { isLoading }] = useUpdateDatingMutation();

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

export const DATINGPRODUCTSCOLUMN = [
  // {
  //   Header: "Sr. No.",
  //   Cell: ({ row }) => row.index + 1,
  // },

  {
    Header: "Id",
    accessor: "id",
  },
  {
    Header: "Product Key",
    accessor: "productKey",
  },
  {
    Header: "Product Name",
    accessor: "name",
  },
  {
    Header: "Product Price",
    accessor: "price",
  },
  {
    Header: "Product Type",
    accessor: "type",
  },
  {
    Header: "status",
    accessor: "status",
    Cell: ({ row }) => <StatusSwitch row={row} />,
  },
];
