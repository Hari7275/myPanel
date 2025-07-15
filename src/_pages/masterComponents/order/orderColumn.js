import { OrderType, OrderStatus } from "../../../_constants/consultantConstant";
const CustomIdCell = ({ value }) => {
  return <span className="orderId-color">{value}</span>;
};

const OrderIdCell = ({ value }) => {
  return <span className="custumerId-color">{value}</span>;
};

export const COLUMNORDER = [
  {
    Header: "Id",
    accessor: "id",
    Cell: OrderIdCell,
  },
  {
    Header: "Consultant Id",
    accessor: "consultant_id",
  },
  {
    Header: "User Id ",
    accessor: "user_id",
    Cell: CustomIdCell,
  },
  {
    Header: "Type",
    accessor: "order_type",
    Cell: ({ value }) => OrderType(value),
  },

  {
    Header: "Revenue",
    accessor: "order_revenue",
  },

  {
    Header: "Flute Earning",
    accessor: "flute_earning",
  },
  {
    Header: "Start Time",
    accessor: "call_start_time",
    Cell: ({ value }) => {
      const date = new Date(value);
      return date.toLocaleString("en-US", {
        dateStyle: "medium",
        timeStyle: "short",
      });
    },
  },
  {
    Header: "End Time",
    accessor: "call_end_time",
    Cell: ({ value }) => {
      const date = new Date(value);
      return date.toLocaleString("en-US", {
        dateStyle: "medium",
        timeStyle: "short",
      });
    },
  },
  {
    Header: "Duration(min)",
    accessor: "actual_duration",
  },
  {
    Header: "Status",
    accessor: "status",
    Cell: ({ value }) => <span>{OrderStatus(value)}</span>,
  },
];
