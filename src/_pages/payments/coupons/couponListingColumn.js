import React, { useState } from "react";
import { Switch } from "@mui/material";
import { useUpdateDatingMutation } from "../../../_store/api";

const StatusSwitch = ({ row }) => {
  const [status, setStatus] = useState(row.original.status);
  const [updateStatus, { isLoading }] = useUpdateDatingMutation();

  const handleToggle = async () => {
    const newStatus = status === "true" ? "false" : "true";
    setStatus(newStatus);

    try {
      await updateStatus({
        id: row?.original?.id,
        body: { status: newStatus },
      });
    } catch (error) {
      console.error("Failed to update status", error);
      setStatus(status);
    }
  };

  return (
    <Switch
      checked={status === "true"}
      onChange={handleToggle}
      disabled={isLoading}
    />
  );
};

export const COUPONCOLUMN = [
  // {
  //   Header: "Sr. No.",
  //   Cell: ({ row }) => row.index + 1,
  // },

  {
    Header: "Id",
    accessor: "id",
  },
  {
    Header: "Coupon Code",
    accessor: "code",
  },
  {
    Header: "Coupon Type",
    accessor: "coupon_type",
  },
  {
    Header: "Discount Value",
    accessor: "discount_value",
  },
  {
    Header: "Minimum Order Amount",
    accessor: "minimum_order_amount",
  },
  {
    Header: "Usage Count",
    accessor: "usage_count",
  },
  {
    Header: "Status",
    accessor: "is_active",
    Cell: ({ row }) => (row?.original?.is_active ? "Active" : "Inactive"),
    // Cell: ({ row }) => <StatusSwitch row={row} />,
  },
];
