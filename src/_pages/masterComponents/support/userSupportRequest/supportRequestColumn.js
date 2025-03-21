// import { format } from "date-fns";

export const SUPPORTREQUESTCOLUMN = [
  {
    Header: "Id",
    accessor: "id",
  },

  {
    Header: "User Id",
    accessor: "user_id",
  },

  {
    Header: "Order Id",
    accessor: "order_id",
  },
  {
    Header: "Support Issue Id",
    accessor: "support_issue_id",
  },

  {
    Header: "Query Message",
    accessor: "query_message",
    Cell: ({ row }) => (
      <div
        style={{
          maxWidth: "350px",
          wordWrap: "break-word",
          overflow: "hidden",
          display: "-webkit-box",
          WebkitLineClamp: 2,
          WebkitBoxOrient: "vertical",
        }}
      >
        {row?.original?.query_message}
      </div>
    ),
  },
  {
    Header: "Status",
    accessor: "status",
    Cell: ({ value }) => {
      if (value === 1) return "Open";
      if (value === 2) return "Closed";
      if (value === 3) return "Deleted";
      return "Unknown";
    },
  },
];
