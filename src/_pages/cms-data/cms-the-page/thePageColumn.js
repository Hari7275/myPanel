import React, { useState, useEffect } from "react";
import { Switch } from "@mui/material";
import { useUpdateCmsTheAppPageMutation } from "../../../_store/api";
import TruncateText from "../../../_components/table/TruncateText";

const StatusSwitch = ({ row }) => {
  const [status, setStatus] = useState(row.original.is_published);
  const [updateStatus, { isLoading }] = useUpdateCmsTheAppPageMutation();

  useEffect(() => {
    setStatus(row.original.is_published);
  }, [row.original.is_published]);

  const handleToggle = async () => {
    const newStatus = status == 1 ? 0 : 1;
    setStatus(newStatus);

    try {
      await updateStatus({
        id: row.original.id,
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
export const CMSTHEAPPPAGECOLUMN = [
  {
    Header: "Id",
    accessor: "id",
  },

  {
    Header: "Title",
    accessor: "title",
    Cell: ({ value }) => <TruncateText text={value} wordLimit={5} />,
  },
  {
    Header: "Description",
    accessor: "description",
    Cell: ({ value }) => <TruncateText text={value} wordLimit={5} />,
  },
  {
    Header: "Published",
    accessor: "is_published",
    Cell: ({ row }) => <StatusSwitch row={row} />,
  },
];
