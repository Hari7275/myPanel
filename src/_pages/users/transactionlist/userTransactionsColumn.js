import { format } from "date-fns";

export const formatNumber = (value) => {
  const num = parseFloat(value);
  return isNaN(num) ? value : num.toFixed(2);
};

export const USERTRANSACTIONCOLUMN = [
  {
    Header: "Amount",
    accessor: "amount",
    Cell: ({ value, row }) => {
      const isCredit = row.original.transaction_type === "credit";
      return (
        <span
          style={{
            color: isCredit ? "#10b981" : "#ef4444",
            fontWeight: "600",
          }}
        >
          {isCredit ? "+" : "-"}
          {row.original.currency_category === "A" ? "" : "$"}
          {formatNumber(value)}
        </span>
      );
    },
  },
  {
    Header: "Remaining Balance",
    accessor: "remaining_balance",
    Cell: ({ value, row }) => (
      <span
        style={{
          color:
            row.original.currency_category == "A" ? "#10b981" : "#810c0cff",
          fontWeight: 600,
        }}
      >
        {row.original.currency_category === "A" ? "" : "$"}
        {formatNumber(value)}
      </span>
    ),
  },
  {
    Header: "Trans. Type",
    accessor: "transaction_type",
    Cell: ({ value }) => (
      <span
        style={{
          color: value === "credit" ? "#10b981" : "#ef4444",
        }}
      >
        {value}
      </span>
    ),
  },
  {
    Header: "Activity Type",
    accessor: "type",
    Cell: ({ value }) => {
      const activityColors = {
        recharge: "#3b82f6",
        consultant_activity: "#36648eff",
        refund: "#f59e0b",
      };

      const color = activityColors[value] || "#6b7280";

      return <span style={{ color: color }}>{value.replace(/_/g, " ")}</span>;
    },
  },
  {
    Header: "Trans By",
    accessor: "is_admin_txn",
    Cell: ({ value }) => {
      const isAdmin = value == true;
      return (
        <span
          style={{
            color: isAdmin ? "#f59e0b" : "#8b5cf6",
          }}
        >
          {isAdmin ? "Admin" : "User"}
        </span>
      );
    },
  },
  // {
  //   Header: "Trans. Date",
  //   accessor: "transaction_time",
  //   Cell: ({ value }) => (
  //     <span style={{ color: "#6b7280" }}>{format(new Date(value), "P")}</span>
  //   ),
  // },

  {
    Header: "Trans. Date",
    accessor: "transaction_time",
    Cell: ({ value }) => {
      if (!value) return "null";
      const date = new Date(value);
      return date.toLocaleString("en-US", {
        dateStyle: "medium",
        timeStyle: "short",
      });
    },
  },
  {
    Header: "Status",
    accessor: "status",
    Cell: ({ value }) => {
      const statusColors = {
        successful: "#10b981",
        pending: "#f59e0b",
        failed: "#ef4444",
      };

      const color = statusColors[value.toLowerCase()] || "#6b7280";

      return <span style={{ color: color }}>{value}</span>;
    },
  },
];
