import { ArrowRight } from "lucide-react";

export const FOLLOWERSCOLUMN = [
  {
    Header: "Id",
    accessor: "id",
  },
  {
    Header: "Name",
    accessor: "fullName",
    Cell: ({ row }) => <span>{row.original.fullName || "N/A"}</span>,
  },

  {
    Header: "Age",
    accessor: "age",
    Cell: ({ row }) => <span>{row.original.age || "N/A"}</span>,
  },
  {
    Header: "Image",
    Cell: ({ row }) => (
      <img
        src={row.original.img || "snake.jpg"}
        alt="Avatar"
        width="80"
        height="80"
      />
    ),
  },
];
