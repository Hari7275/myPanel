import React, { useState } from "react";
import { Switch } from "@mui/material";
import { useUpdateCmsPageManagerMutation } from "../../../_store/api";
import TruncateText from "../../../_components/table/TruncateText";

const StatusSwitch = ({ row }) => {
  const [status, setStatus] = useState(row.original.is_published);
  const [updateStatus, { isLoading }] = useUpdateCmsPageManagerMutation();

  const handleToggle = async () => {
    const newStatus = status == 1 ? 0 : 1;
    setStatus(newStatus);

    try {
      await updateStatus({
        id: row.original._id,
        body: { is_published: newStatus },
      });
    } catch (error) {
      console.log("failed to upload status", error);
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
export const CMSPAGEMANAGERCOLUMN = [
  {
    Header: "Id",
    accessor: "_id",
  },
  {
    Header: "Slug",
    accessor: "slug",
  },

  {
    Header: "Title",
    accessor: "title",
    Cell: ({ value }) => <TruncateText text={value} wordLimit={5} />,
  },
  {
    Header: "Published",
    accessor: "is_published",
    Cell: ({ row }) => <StatusSwitch row={row} />,
  },
];
