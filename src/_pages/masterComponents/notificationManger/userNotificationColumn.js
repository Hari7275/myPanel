export const USERNOTIFICATIONCOLUMN = [
  {
    Header: "Id",
    accessor: "id",
  },
  {
    Header: "Title",
    accessor: "title",
  },

  {
    Header: "Is Instant",
    accessor: "is_instant",
    Cell: ({ value }) => (value == 1 ? "Yes" : "No"),
  },

  {
    Header: "Card Image",
    accessor: "card_image",
    Cell: ({ row }) => (
      <div className="card-img">
        <img
          src={row.original.image_url || "snake.jpg"}
          alt="Card Image"
          width="40"
          height="40"
          style={{ cursor: "pointer" }}
        />
      </div>
    ),
  },

  {
    Header: "Status",
    accessor: "status",
  },
  {
    Header: "Created Time",
    accessor: "created_at",
    Cell: ({ value }) => {
      if (!value) return "null";
      const date = new Date(value);
      return date.toLocaleString("en-US", {
        dateStyle: "medium",
        timeStyle: "short",
      });
    },
  },
];

export const ALLSENDEDUSERNOTIFICATIONCOLUMN = [
  {
    Header: "Id",
    accessor: "id",
  },
  {
    Header: "User Id",
    accessor: "user_id",
  },

  {
    Header: "Status",
    accessor: "delivery_status",
    Cell: ({ value }) => {
      const statusColors = {
        DELIVERED: "#10b981",
        pending: "#f59e0b",
        failed: "#ef4444",
      };

      const color = statusColors[value?.toUpperCase()] || "#6b7280";

      return <span style={{ color: color }}>{value}</span>;
    },
  },
  {
    Header: "Reason",
    accessor: "failure_reason",
  },
];
