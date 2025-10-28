// import { Link } from "react-router-dom";
import { format } from "date-fns";
// import { ArrowRight } from "lucide-react";
import { OrderType, OrderStatus } from "../../../_constants/consultantConstant";
import { getStatusColor } from "../../../_constants/consultantConstant";

import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "../../../_store/slices/userSlice";

const CustomIdCell = ({ value, row }) => {
  const userName = row?.original?.description?.userData.name;
  const dispatch = useDispatch();
  const handleUserClick = () => {
    dispatch(setCurrentUser(value));
  };
  return (
    <Link
      to="/users_Profile"
      onClick={handleUserClick}
      style={{ textDecoration: "none" }}
    >
      <span className="orderId-color" style={{ cursor: "pointer" }}>
        {userName} ({value})
      </span>
    </Link>
  );
};

export const ORDERCHARTCOLUMN = [
  {
    Header: "User Id",
    accessor: "user_id",
    Cell: CustomIdCell,
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

// offine order

export const OFFLINEORDERCHARTCOLUMN = [
  {
    Header: "User Id",
    accessor: "user_id",
    Cell: CustomIdCell,
  },

  {
    Header: "Order Type",
    accessor: "order_type",
    Cell: ({ value }) => OrderType(value),
  },
  // {
  //   Header: "Duration(min)",
  //   accessor: "actual_duration",
  // },
  // {
  //   Header: "Earning",
  //   accessor: "consultant_earning",
  // },
  // {
  //   Header: "Revenue",
  //   accessor: "order_revenue",
  // },
  // {
  //   Header: "Flute Earning",
  //   accessor: "flute_earning",
  // },
  // {
  //   Header: "LS. Rate",
  //   accessor: "consultant_rate",
  // },
  // {
  //   Header: "Comm. Rate",
  //   accessor: "commission_rate",
  // },

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
