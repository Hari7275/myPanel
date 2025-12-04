import React, { useState } from "react";
import { Switch } from "@mui/material";
import { useUpdateCmsSocialIconMutation } from "../../../_store/api";
import TruncateText from "../../../_components/table/TruncateText";

const StatusSwitch = ({ row }) => {
  const [status, setStatus] = useState(row.original.is_published);
  const [updateStatus, { isLoading }] = useUpdateCmsSocialIconMutation();

  const handleToggle = async () => {
    const newStatus = status == true ? false : true;
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
      checked={status == true}
      onChange={handleToggle}
      disabled={isLoading}
    />
  );
};
export const CMSSOCIALICONCOLUMN = [
  {
    Header: "Id",
    accessor: "id",
  },
  {
    Header: "Display Order",
    accessor: "display_order",
  },
  {
    Header: "Title",
    accessor: "title",
  },

  {
    Header: "Mobile Image",
    Cell: ({ row }) => {
      return (
        <>
          {/* <a href={row?.original?.icon?.url}> */}
          <img
            src={row?.original?.icon?.url}
            alt={row?.original?.icon?.url}
            title={row?.original.icon.title}
            width="40"
            height="40"
            style={{ cursor: "pointer" }}
          />
          {/* </a> */}
        </>
      );
    },
  },

  {
    Header: "Mobile Description",
    accessor: "icon.description",
    Cell: ({ value }) => <TruncateText text={value} wordLimit={5} />,
  },

  {
    Header: "Published",
    accessor: "is_published",
    Cell: ({ row }) => <StatusSwitch row={row} />,
  },
];
