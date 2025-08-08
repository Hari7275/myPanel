import { OrderType, OrderStatus } from "../../../_constants/consultantConstant";
const CustomIdCell = ({ value }) => {
  return <span className="orderId-color">{value}</span>;
};

const OrderIdCell = ({ value }) => {
  return <span className="custumerId-color">{value}</span>;
};

export const COLUMNRECHARGE = [
  {
    Header: "Id",
    accessor: "id",
    Cell: OrderIdCell,
  },

  {
    Header: "User Id ",
    accessor: "user_id",
    Cell: CustomIdCell,
  },
  {
    Header: "Name",
    accessor: "first_name",
  },
  {
    Header: "Phone Number",
    accessor: "phone_number",
  },
  {
    Header: "Amount",
    accessor: "amount",
  },

  {
    Header: "Total Balance",
    accessor: "remaining_balance",
  },
  {
    Header: "Transaction Time",
    accessor: "transaction_time",
    Cell: ({ value }) => {
      if (!value) return "null";
      const date = new Date(value);
      return date.toLocaleString("en-US", {
        dateStyle: "medium",
        timeStyle: "short",
      });
    },
  },
  // {
  //   Header: "End Time",
  //   accessor: "call_end_time",
  //   Cell: ({ value }) => {
  //     if (!value) return "null";
  //     const date = new Date(value);
  //     return date.toLocaleString("en-US", {
  //       dateStyle: "medium",
  //       timeStyle: "short",
  //     });
  //   },
  // },
  // {
  //   Header: "Duration(min)",
  //   accessor: "actual_duration",
  // },
  {
    Header: "Status",
    accessor: "status",
    // Cell: ({ value }) => <span>{OrderStatus(value)}</span>,
  },
];
