// import { Link } from "react-router-dom";
import { format } from "date-fns";
// import { ArrowRight } from "lucide-react";
import { OrderType, OrderStatus } from "../../../_constants/consultantConstant";
import { getStatusColor } from "../../../_constants/consultantConstant";

export const ORDERCHARTCOLUMN = [
  {
    Header: "User Id",
    accessor: "user_id",
  },

  {
    Header: "Order Type",
    accessor: "order_type",
    Cell: ({ value }) => OrderType(value),
  },
  {
    Header: "Duration(min)",
    accessor: "actual_duration",
  },
  {
    Header: "Earning",
    accessor: "consultant_earning",
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
    Header: "LS. Rate",
    accessor: "consultant_rate",
  },
  {
    Header: "Comm. Rate",
    accessor: "commission_rate",
  },
  {
    Header: "Start Time",
    accessor: "call_start_time",
    Cell: ({ value }) => {
      if (!value) return "null";
      const date = new Date(value);
      return date.toLocaleString("en-US", {
        dateStyle: "medium",
        timeStyle: "short",
      });
    },
  },

  {
    Header: "Status",
    accessor: "status",
    Cell: ({ value }) => (
      <span style={{ color: getStatusColor(value) }}>{OrderStatus(value)}</span>
    ),
  },
];
