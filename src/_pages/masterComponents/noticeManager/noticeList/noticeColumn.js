import React, { useState } from "react";
import { Switch } from "@mui/material";
import { useUpdateNoticestatusMutation } from "../../../../_store/api";

const StatusSwitch = ({ row }) => {
  const [status, setStatus] = useState(row.original.status);
  const [updateStatus, { isLoading }] = useUpdateNoticestatusMutation();

  const handleToggle = async () => {
    const newStatus = status == "ACTIVE" ? "INACTIVE" : "ACTIVE";
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
      checked={status === "ACTIVE"}
      onChange={handleToggle}
      disabled={isLoading}
    />
  );
};

export const NOTICECOLUMN = [
  {
    Header: "Id",
    accessor: "id",
  },
  {
    Header: "Name",
    accessor: "name",
  },
  {
    Header: "Title",
    accessor: "title",
  },
  {
    Header: "Image",
    Cell: ({ row }) => {
      return (
        <img src={row?.original.image} alt="Avatar" width="80" height="80" />
      );
    },
  },

  {
    Header: "Status",
    accessor: "status",
    Cell: ({ row }) => <StatusSwitch row={row} />,
  },
];

//

export const ASSIGNCONSULTANTNOTICECOLUMN = [
  {
    Header: "Id",
    accessor: "id",
  },
  {
    Header: "Name",
    accessor: "ConsultantProfile.first_name",
  },
  {
    Header: "Subject",
    accessor: "ConsultantNotice.title",
  },
  {
    Header: "Date Modified",
    accessor: "delivered_at",
    Cell: ({ value }) => {
      const date = new Date(value);
      return date.toLocaleString("en-US", {
        dateStyle: "medium",
        timeStyle: "short",
      });
    },
  },
];
