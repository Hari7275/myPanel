import React, { useState, useEffect } from "react";
import { Switch } from "@mui/material";
import { useUpdateUserObservingStatusMutation } from "../../../../_store/api";
import { formatDateTime } from "../../../../_constants/formatedDate";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

const StatusSwitch = ({ row }) => {
  const [status, setStatus] = useState(row.original.status);
  const [updateStatus, { isLoading }] = useUpdateUserObservingStatusMutation();

  useEffect(() => {
    setStatus(row?.original?.status);
  }, [row?.original?.status]);

  const handleToggle = async () => {
    const newStatus = status == 1 ? 0 : 1;
    setStatus(newStatus);
    try {
      const response = await updateStatus({
        id: row?.original?.id,
        body: { status: newStatus },
      });
      if (response?.data?.status) {
        toast.success(response?.data?.message || "Status updated successfully");
      } else {
        toast.error(response?.data?.message || "Failed to update status");
      }
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

const UserNavigationCell = ({ value, row }) => {
  const userName = row?.original?.user_name || row?.original?.user_details?.display_name || row?.original?.user_details?.name;

  return (
    <Link
      to={`/user/${value}`}
      target="_blank"
      rel="noopener noreferrer"
      style={{ textDecoration: "none" }}
    >
      <span className="obs-cell-name">
        {userName ? `${userName} (${value})` : value}
      </span>
    </Link>
  );
};

export const USEROBSERVATIONCOLUMN = [
  {
    Header: "User Id",
    accessor: "user_id",
    Cell: UserNavigationCell,
  },
  {
    Header: "Published",
    accessor: "status",
    Cell: ({ row }) => <StatusSwitch row={row} />,
  },
  {
    Header: "Created At",
    accessor: "createdAt",
    Cell: ({ value }) => formatDateTime(value),
  },
  {
    Header: "Updated At",
    accessor: "updatedAt",
    Cell: ({ value }) => formatDateTime(value),
  },
];
