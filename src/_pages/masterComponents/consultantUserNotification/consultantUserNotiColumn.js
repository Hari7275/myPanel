import React, { useState, useEffect } from "react";
import { Switch } from "@mui/material";
import { useUpdateConsultantOrderNotificationMutation } from "../../../_store/api";

const StatusSwitch = ({ row }) => {
  const [status, setStatus] = useState(row.original.status);
  const [updateStatus, { isLoading }] =
    useUpdateConsultantOrderNotificationMutation();

  useEffect(() => {
    setStatus(row?.original?.status);
  }, [row?.original?.status]);

  const handleToggle = async () => {
    const newStatus = status == 1 ? 0 : 1;
    setStatus(newStatus);
    try {
      await updateStatus({
        consultant_id: row?.original?.consultant_id,
        body: { status: newStatus },
      });
    } catch (error) {
      console.log("failed to update status", error);
      setStatus(status);
    }
  };

  return (
    <Switch
      checked={status == 1}
      onChange={handleToggle}
      disabled={isLoading}
    />
  );
};

export const CONSULTANTUSERNOTICOLUMN = [
  {
    Header: "Consultant Id",
    accessor: "consultant_id",
  },

  {
    Header: "Published",
    accessor: "status",
    Cell: ({ row }) => <StatusSwitch row={row} />,
  },
  {
    Header: "created At",
    accessor: "createdAt",
  },
  {
    Header: "updated At",
    accessor: "updatedAt",
  },
];
