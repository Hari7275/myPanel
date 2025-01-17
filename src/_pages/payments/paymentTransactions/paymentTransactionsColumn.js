export const PAYMENTTRANSACTIONSCOLUMN = [
  {
    Header: "Id",
    accessor: "id",
  },
  {
    Header: "User Id",
    accessor: "user_id",
  },
  {
    Header: "Product Id",
    accessor: "product_id",
  },
  {
    Header: "Wallet Amount",
    accessor: (row) => row.wallet_amount || "N/A",
  },

  {
    Header: "Transaction Amount",
    accessor: "transaction_amount",
  },
  {
    Header: "Payment Method",
    accessor: (row) => row.payment_method || "N/A",
  },

  {
    Header: "Status",
    accessor: "status",
  },
];
