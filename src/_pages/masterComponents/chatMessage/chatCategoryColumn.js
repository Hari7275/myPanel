import React, { useState, useEffect } from "react";
import { Switch } from "@mui/material";
import { useUpdateChatCategoryListMutation } from "../../../_store/api";
import TruncateText from "../../../_components/table/TruncateText";

const ActiveSwitch = ({ row }) => {
  const [isActive, setIsActive] = useState(row.original.is_active);
  const [updateStatus, { isLoading }] = useUpdateChatCategoryListMutation();

  useEffect(() => {
    setIsActive(row.original.is_active);
  }, [row.original.is_active]);

  const handleToggle = async () => {
    const newStatus = isActive == 1 ? 0 : 1;
    setIsActive(newStatus);
    try {
      await updateStatus({
        id: row.original.id,
        body: { is_active: newStatus },
      });
    } catch (error) {
      console.log("failed to update active status", error);
      setIsActive(isActive);
    }
  };

  return (
    <Switch
      checked={isActive == 1}
      onChange={handleToggle}
      disabled={isLoading}
    />
  );
};

export const CHATCATEGORYCOLUMN = [
  {
    Header: "Id",
    accessor: "id",
  },
  {
    Header: "Type",
    accessor: "type",
  },

  {
    Header: "Text",
    accessor: "text",
    Cell: ({ value }) => <TruncateText text={value} wordLimit={5} />,
  },
  {
    Header: "icon",
    accessor: "icon",
  },
  {
    Header: "Created At",
    accessor: "created_at",
  },
  {
    Header: "Active",
    accessor: "is_active",
    Cell: ({ row }) => <ActiveSwitch row={row} />,
  },
];
