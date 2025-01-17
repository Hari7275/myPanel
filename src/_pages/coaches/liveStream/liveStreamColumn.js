import { OrderType, OrderStatus } from "../../../_constants/consultantConstant";

export const LIVESTREAMCOLUMN = [
  {
    Header: "Live Stream Id",
    accessor: "id",
  },

  {
    Header: "Duration (min)",
    accessor: "duration",
  },

  {
    Header: "status",
    accessor: "status",
    Cell: ({ value }) =>
      value === 1
        ? "Pending"
        : value === 2
        ? "Running"
        : value === 3
        ? "Finished"
        : value === 4
        ? "Cancelled"
        : "",
  },
];
