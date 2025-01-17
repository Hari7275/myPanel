// import { Link } from "react-router-dom";
import { format } from "date-fns";
// import { ArrowRight } from "lucide-react";
import { OrderType, OrderStatus } from "../../../_constants/consultantConstant";

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
    Header: "Duration",
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
    Header: "Status",
    accessor: "status",
    Cell: ({ value }) => OrderStatus(value),
  },
];
