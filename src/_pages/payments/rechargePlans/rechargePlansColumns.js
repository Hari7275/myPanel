import React , {useState} from "react"
import { Switch } from "@mui/material";
import { useUpdateRechargeMutation } from "../../../_store/api";

const StatusSwitch = ({ row }) => {
  const [status, setStatus] = useState(row.original.status);
  const [updateStatus, { isLoading }] = useUpdateRechargeMutation();

  const handleToggle = async () => {
    const newStatus = status === "active" ? "inactive" : "active";
    setStatus(newStatus);

    try {
      await updateStatus({
        id: row.original.id,
        body: { status: newStatus },
      });
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


export const RECHARGECOLUMN = [
  {
    Header: "Id",
    accessor: "id",
  },
  {
    Header: "Plan Name",
    accessor: "plan_name",
  },
  {
    Header: "Price",
    accessor: "price",
  },
  {
    Header: "Discount",
    accessor: "discount",
  },
  {
    Header: "Final Price",
    accessor: "final_price",
  },
  {
    Header: "Status",
    accessor: "status",
    Cell: ({ row }) => <StatusSwitch row={row} />,
  },
 
];
