import { format } from "date-fns";

export const QDTRIPSCOLUMN = [
  //   {
  //     Header: "Sr. No.",
  //     Cell: ({ row }) => row.index + 1,
  //   },
  {
    Header: "Id",
    accessor: "id",
  },

  {
    Header: "QD Type",
    accessor: "qd_type",
  },
  {
    Header: "Name",
    accessor: "UserProfile.fullName",
  },
  {
    Header: "Gender",
    accessor: "UserProfile.gender",
  },

  {
    Header: "Start Date",
    // accessor: `${start_date}-${end_date}`,
    accessor: `start_date`,
    Cell: ({ value }) => format(new Date(value), "P"),
  },
  {
    Header: "End Date",
    accessor: "end_date",
    Cell: ({ value }) => format(new Date(value), "P"),
  },

  {
    Header: "Status",
    accessor: "status",
  },
];
