import React, { useState, useEffect } from "react";
import { Switch } from "@mui/material";
import { useUpdateQdProductsMutation } from "../../../_store/api";

const StatusSwitch = ({ row }) => {
  const [status, setStatus] = useState();

  const [updateStatus, { isLoading }] = useUpdateQdProductsMutation();

  const handleToggle = async () => {
    const newStatus = status == "active" ? "inactive" : "active";
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

  useEffect(() => {
    setStatus(row.original.status);
  }, [row.original.status]);

  return (
    <Switch
      checked={status == "active"}
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
    Header: "Device Type",
    accessor: "device_type",
    Cell: ({ value }) => (value == 1 ? "Android" : "IOS"),
  },
  {
    Header: "Product Name",
    accessor: "name",
  },

  {
    Header: "Price",
    accessor: "price", // You can keep this or remove if not needed
    Cell: ({ row }) => {
      const price = row.original.price ?? "N/A";
      const currency = row.original.currency ?? "";
      return `${price} ${currency}`.trim();
    },
  },

  {
    Header: "Status",
    accessor: "status",
    Cell: ({ row }) => <StatusSwitch row={row} />,
  },
];
