import { format } from "date-fns";

export const EVENTPARTICIPANTSCOLUMN = [
  // {
  //   Header: "Sr. No.",
  //   Cell: ({ row }) => row.index + 1,
  // },

  {
    Header: "QD Type",
    accessor: "qd_type",
  },

  {
    Header: "Name",
    accessor: "fullName",
  },

  {
    Header: " start Date",
    accessor: "created_at",
    Cell: ({ value }) => format(new Date(value), "P"),
  },
 

  {
    Header: "Status",
    accessor: "status",
  },
];
