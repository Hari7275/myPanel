import { format } from "date-fns";
import { ArrowRight } from "lucide-react";

export const NOTIFICATIONCOLUMN = [
  {
    Header: "User Id",
    accessor: "user_id",
    Cell: ({ value }) => <span style={{ color: "blue" }}>{value}</span>,
  },

  {
    Header: "Rating",
    accessor: "rating",
  },
  {
    Header: "Review Text",
    accessor: "review_text",
  },
  {
    Header: "Updated Date",
    accessor: "createdAt",
    Cell: ({ value }) => format(new Date(value), "P"),
  },

  {
    Header: "Action",
    Cell: ({ row }) => (
      <div className="secondIcon">
        <ArrowRight />
      </div>
    ),
  },
];
