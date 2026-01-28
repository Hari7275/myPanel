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
      // to="/users_Profile"
      to={`/user/${value}`}
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
    Cell: ({ value }) => (
      <span style={{ color: value == 3 ? "#008000" : "" }}>
        {OrderType(value)}
      </span>
    ),
  },
  {
    Header: "Duration (min)",
    accessor: "actual_duration",
  },
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
  {
    Header: "Coach Rate",
    accessor: "consultant_rate",
  },
  {
    Header: "Flute Commission",
    accessor: "commission_rate",
    Cell: ({ value }) => <span>{value != null ? `${value}%` : "-"}</span>,
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
    Cell: ({ value, row }) => {
      const rejectedCall =
        row.original.mode_type === 1 && row.original.status === 6;
      const isRefunded = value === 4 && row.original.is_refunded;

      if (rejectedCall) {
        return <span style={{ color: "red" }}>Consultant Cancelled</span>;
      }

      // 💙 If refunded → show blue color
      const textColor = isRefunded ? "blue" : getStatusColor(value);

      return (
        <span style={{ color: textColor }}>
          {isRefunded ? "Refunded" : OrderStatus(value)}
        </span>
      );
    },
  },
];
