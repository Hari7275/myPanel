import { useState, useEffect } from "react";
import { format } from "date-fns";
import { Switch } from "@mui/material";
import { useUpdateConsultantSupportExecutiveStatusMutation } from "../../../../_store/api";
import toast from "react-hot-toast";

const StatusSwitch = ({ row }) => {
  const [status, setStatus] = useState(row.original.status);
  const [updateStatus, { isLoading }] =
    useUpdateConsultantSupportExecutiveStatusMutation();
  const [category_id] = useState(row?.original?.category_id);

  const handleToggle = async () => {
    const newStatus = status === "active" ? "inactive" : "active";
    setStatus(newStatus);

    try {
      const response = await updateStatus({
        id: row.original.id,
        body: { status: newStatus, category_id },
      });

      if (response?.data?.status) {
        toast.success(response?.data?.message);
      } else {
        toast.error(response?.data?.message);
      }
    } catch (error) {
      console.error("Failed to update status", error);
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

// ******************************************************* open image by using react modal

export const CONSULTANTSUPPORTCOLUMN = [
  {
    Header: "Id",
    accessor: "id",
  },
  {
    Header: "Category",
    accessor: "category",
    // Cell: ({ row }) => row.original.CoachCategory?.category_name || "N/A",
  },

  {
    Header: "Executive Name",
    accessor: "name",
  },
  {
    Header: "Phone Number",
    accessor: "phone",
  },

  {
    Header: "Updated Date",
    accessor: "updatedAt",
    Cell: ({ value }) => format(new Date(value), "P"),
  },
  {
    Header: "Status",
    accessor: "status",
    Cell: ({ row }) => <StatusSwitch row={row} />,
  },
];
