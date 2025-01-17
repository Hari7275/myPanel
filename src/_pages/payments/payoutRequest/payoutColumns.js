import { format } from "date-fns";

export const PAYOUTCOLUMN = [
  {
    Header: "Id",
    accessor: "id",
  },

  {
    Header: "Consultant Id",
    accessor: "consultant_id",
  },

  {
    Header: "Transaction Id",
    accessor: "transaction_id",
  },

  {
    Header: "Amount",
    accessor: "amount",
  },
  {
    Header: "Payment Method",
    accessor: "payment_method",
  },

  {
    Header: "Time",
    accessor: "createdAt",
    Cell: ({ value }) => format(new Date(value), "P"),
  },

  {
    Header: "Status",
    accessor: "status",
    Cell: ({ value }) => statusMap[value] || "Unknown",
  },
];

const statusMap = {
  1: "Pending",
  2: "Success",
  3: "Rejected",
};
