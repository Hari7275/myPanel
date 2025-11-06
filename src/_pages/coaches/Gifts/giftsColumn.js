import { ArrowRight } from "lucide-react";

import { OrderType, OrderStatus } from "../../../_constants/consultantConstant";

export const GIFTSCOLUMN = [
  {
    Header: "User Id",
    accessor: "user_id",
  },

  {
    Header: "Order Type",
    accessor: "order_type",
    Cell: ({ value }) => OrderType(value),
  },
  // {
  //   Header: "Duration",
  //   accessor: "actual_duration",
  // },
  {
    Header: "Coach Earning",
    accessor: "consultant_earning",
  },
  {
    Header: "Order Revenue",
    accessor: "order_revenue",
  },
  {
    Header: "Flute Earning",
    accessor: "flute_earning",
  },
  // {
  //   Header: "Ls. Rate",
  //   accessor: "consultant_rate",
  // },
  {
    Header: "Flute Commission",
    accessor: "commission_rate",
    Cell: ({ value }) => <span>{value != null ? `${value}%` : "-"}</span>,
  },

  // {
  //   Header: "Status",
  //   accessor: "status",
  //   Cell: ({ value }) => OrderStatus(value),
  // },
];
