import { getCategoryTypes } from "../../../_constants/consultantConstant";

export const WALLETCHARTCOLUMN = [
  {
    Header: " Id",
    accessor: "id",
    Cell: ({ value }) => <span style={{ color: "#8c57ff" }}>{value}</span>,
  },
  // {
  //   Header: "Order",
  //   accessor: "order_id",
  // },
  {
    Header: "Duration (min)",
    accessor: "duration",
  },
  {
    Header: "Order Type",
    accessor: "order.order_type",
    Cell: ({ value }) => getCategoryTypes(value) || "N/A",
  },

  {
    Header: "Transaction Type",
    accessor: "transaction_type",
  },
  {
    Header: "Amount",
    accessor: "amount",
  },
  {
    Header: "Remaining Balance",
    accessor: "remaining_balance",
  },
];
