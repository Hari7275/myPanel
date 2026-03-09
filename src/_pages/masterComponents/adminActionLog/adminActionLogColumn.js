import { formatDateTime } from "../../../_constants/formatedDate";

export const ACTIONLOGCOLUMNS = [
  {
    Header: "Id",
    accessor: "id",
  },

  {
    Header: "Action By",
    accessor: "user_name",
  },
  {
    Header: "Action Type",
    accessor: "method",
  },

  {
    Header: "Consultant Id",
    accessor: "consultant_id",
  },
  {
    Header: "Action",
    accessor: "description",
  },
  {
    Header: "Time",
    accessor: "timestamp",
    Cell: ({ value }) => formatDateTime(value),
  },
];
