import React, { useState, useEffect } from "react";
import { Switch } from "@mui/material";
import { useUpdateCmsTestimonialMutation } from "../../../_store/api";
import TruncateText from "../../../_components/table/TruncateText";

const StatusSwitch = ({ row }) => {
  const [status, setStatus] = useState(row.original.isPublished);
  const [updateStatus, { isLoading }] = useUpdateCmsTestimonialMutation();

  useEffect(() => {
    setStatus(row.original.isPublished);
  }, [row.original.isPublished]);

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
export const CMSTESTIMONIALCOLUMN = [
  {
    Header: "Id",
    accessor: "_id",
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
    accessor: "isPublished",
    Cell: ({ row }) => <StatusSwitch row={row} />,
  },
];
