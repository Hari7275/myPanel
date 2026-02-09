import React, { useState, useEffect } from "react";
import { Switch } from "@mui/material";
import { useUpdateConsultantOrderNotificationMutation } from "../../../_store/api";
import { formatDateTime } from "../../../_constants/formatedDate";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

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
      const response = await updateStatus({
        consultant_id: row?.original?.id,
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

const ConsultantNavigationCell = ({ value, row }) => {
  const consultantName = row?.original?.consultant_details?.display_name;
  const consultantType = row?.original?.consultant_details?.consultant_type;
  const foreigner = row?.original?.description?.is_consultant_foreigner;

  const navigationRoute = {
    1: `/astrologer/${value}`,
    2: `/coaches/${value}`,
    3: `/listeners/${value}`,
  };

  const baseRoute = navigationRoute[consultantType] || "";

  // Add ?type=91 only if NOT foreigner
  const route = !foreigner
    ? `${baseRoute}?status=3&type=91`
    : `${baseRoute}?status=3`;

  return (
    <Link
      to={route}
      target="_blank"
      rel="noopener noreferrer"
      style={{ textDecoration: "none" }}
    >
      <span
        style={{
          cursor: "pointer",
          color: foreigner ? "#1889beff" : "#be5b18ff",
          fontStyle: foreigner ? "italic" : "normal",
        }}
      >
        {consultantName} ({value})
        <span style={{ color: "#187cbeff" }}>
          ({{ 1: "A", 2: "C", 3: "L" }[consultantType] || ""})
        </span>
      </span>
    </Link>
  );
};

export const CONSULTANTUSERNOTICOLUMN = [
  {
    Header: "Consultant Id",
    accessor: "consultant_id",
    Cell: ConsultantNavigationCell,
  },

  {
    Header: "Published",
    accessor: "status",
    Cell: ({ row }) => <StatusSwitch row={row} />,
  },
  {
    Header: "created At",
    accessor: "createdAt",
    Cell: ({ value }) => formatDateTime(value),
  },

  {
    Header: "updated At",
    accessor: "updatedAt",
    Cell: ({ value }) => formatDateTime(value),
  },
];
