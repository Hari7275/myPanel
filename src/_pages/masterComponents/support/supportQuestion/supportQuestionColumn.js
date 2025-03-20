import React, { useState } from "react";
// import { format } from "date-fns";
// import { Switch } from "@mui/material";
// import { useUpdateReportReasonMutation } from "../../../_store/api";

// const StatusSwitch = ({ row }) => {
//   const [status, setStatus] = useState(row.original.status);
//   const [updateStatus, { isLoading }] = useUpdateReportReasonMutation();

//   const handleToggle = async () => {
//     const newStatus = status === "active" ? "inactive" : "active";
//     setStatus(newStatus);

//     try {
//       await updateStatus({
//         id: row.original.id,
//         body: { status: newStatus },
//       });
//     } catch (error) {
//       console.error("Failed to update status", error);
//       setStatus(status);
//     }
//   };

//   return (
//     <Switch
//       checked={status === "active"}
//       onChange={handleToggle}
//       disabled={isLoading}
//     />
//   );
// };

export const SUPPORTQUESTIONCOLUMN = [
  {
    Header: "Id",
    accessor: "id",
  },
  {
    Header: "Title",
    accessor: "title",
    Cell: ({ row }) => (
      <div
        style={{
          maxWidth: "350px",
          wordWrap: "break-word",
        }}
      >
        {row?.original?.title}
      </div>
    ),
  },

  {
    Header: "Support Type",
    accessor: "support_type",
  },

  {
    Header: "Status",
    accessor: "is_active",
    Cell: ({ row }) => (row?.original?.is_active ? "True" : "False"),
  },
];
