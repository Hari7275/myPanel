import React, { useState } from "react";
import {
  getConsultantTypes,
  getCategoryTypes,
} from "../../../_constants/consultantConstant";
import { Switch } from "@mui/material";
import { useUpdateCoachRateMutation } from "../../../_store/api";

const StatusSwitch = ({ row }) => {
  const [status, setStatus] = useState(row.original.status);
  const [updateStatus, { isLoading }] = useUpdateCoachRateMutation();

  const handleToggle = async () => {
    const newStatus = status === "active" ? "inactive" : "active";
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
      checked={status === "active"}
      onChange={handleToggle}
      disabled={isLoading}
    />
  );
};

export const COACHRATECOLUMN = [
  {
    Header: "Sr.No",
    accessor: "id",
  },
  {
    Header: "User Type",
    accessor: "user_type",
    Cell: ({ value }) => getConsultantTypes(value),
  },
  {
    Header: "Service",
    accessor: "service_type",
    Cell: ({ value }) => getCategoryTypes(value),
  },
  {
    Header: "Consultant Catg",
    accessor: "consultant_category",
  },
  {
    Header: "User Catg",
    accessor: "user_category",
  },
  {
    Header: "Rate",
    accessor: "rate",
  },
  {
    Header: "Currency",
    accessor: "currency",
  },
  {
    Header: "Commission",
    accessor: "commission",
  },
  {
    Header: "Status",
    accessor: "status",
    Cell: ({ row }) => <StatusSwitch row={row} />,
  },
];
