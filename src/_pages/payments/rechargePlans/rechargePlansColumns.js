import React, { useState } from "react";
import { Switch } from "@mui/material";
import { useUpdateRechargeMutation } from "../../../_store/api";

const StatusSwitch = ({ row }) => {
  const [status, setStatus] = useState(row.original.status);
  const [updateStatus, { isLoading }] = useUpdateRechargeMutation();

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

export const RECHARGECOLUMN = [
  {
    Header: "Id",
    accessor: "id",
  },
  {
    Header: "Plan Name",
    accessor: "plan_name",
  },
  {
    Header: "Coupon ID",
    accessor: "coupon_id",
    Cell: ({ value }) => <span>{value ? value : "N/A"}</span>,
  },
  {
    Header: "Price",
    accessor: "price",
    // Cell: ({ value }) => <span>{value ? value : "N/A"}</span>,
    Cell: ({ value, row }) => {
      const currency = row.original.currency;
      const symbol = currency === "INR" ? "₹" : "$";
      return (
        <span
          style={{
            color: currency == "INR" ? "#10b981" : "#810c0cff",
            fontWeight: 600,
          }}
        >
          {symbol} {value ? value : "N/A"}
        </span>
      );
    },
  },

  {
    Header: "Status",
    accessor: "status",
    Cell: ({ row }) => <StatusSwitch row={row} />,
  },
];
