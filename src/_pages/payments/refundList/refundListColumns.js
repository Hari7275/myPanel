import { formatDateTime } from "../../../_constants/formatedDate";

const transactionMap = {
  1: { label: "Empty", color: "gray" },
  2: { label: "Credit", color: "green" },
  3: { label: "Debit", color: "red" },
};

export const REFUND_LIST_COLUMNS = [
  {
    Header: "ID",
    accessor: "id",
  },
  {
    Header: "Order ID",
    accessor: "order_id",
  },
  {
    Header: "Consultant ID",
    accessor: "consultant_id",
  },
  {
    Header: "User ID",
    accessor: "user_id",
  },
  {
    Header: "Order Duration",
    accessor: "order_duration",
    Cell: ({ value }) => <span>{value} min</span>,
  },
  {
    Header: "Refund Duration",
    accessor: "refund_duration",
    Cell: ({ value }) => <span>{value} min</span>,
  },
  {
    Header: "User Amount",
    accessor: "user_amount",
    Cell: ({ value }) => (
      <span style={{ color: "#2e7d32", fontWeight: 600 }}>₹{value}</span>
    ),
  },
  {
    Header: "Consultant Amount",
    accessor: "consultant_amount",
    Cell: ({ value }) => (
      <span style={{ color: "#1565c0", fontWeight: 600 }}>₹{value}</span>
    ),
  },
  {
    Header: "User Txn",
    accessor: "user_transaction",
    Cell: ({ value }) => {
      const txn = transactionMap[value] || { label: "Unknown", color: "gray" };
      return <span style={{ color: txn.color, fontWeight: 600 }}>{txn.label}</span>;
    },
  },
  {
    Header: "Consultant Txn",
    accessor: "consultant_transaction",
    Cell: ({ value }) => {
      const txn = transactionMap[value] || { label: "Unknown", color: "gray" };
      return <span style={{ color: txn.color, fontWeight: 600 }}>{txn.label}</span>;
    },
  },
  {
    Header: "Description",
    accessor: "description",
  },
  {
    Header: "Created At",
    accessor: "createdAt",
    Cell: ({ value }) => formatDateTime(value),
  },
];
