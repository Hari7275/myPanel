import { format } from "date-fns";

export const USERTRANSACTIONCOLUMN = [
  {
    Header: "Amount",
    accessor: "amount",
  },
  {
    Header: "Remaining Balance",
    accessor: "remaining_balance",
  },
  {
    Header: "Trans. Type",
    accessor: "transaction_type",
  },
  {
    Header: "Trans. Date",
    accessor: "transaction_time",
    Cell: ({ value }) => format(new Date(value), "P"),
  },
  {
    Header: "Status",
    accessor: "status",
  },
];
