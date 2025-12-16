import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "../../../_store/slices/userSlice";

import { OrderType, OrderStatus } from "../../../_constants/consultantConstant";

const CustomIdCell = ({ value, row }) => {
  const userName = row?.original?.gift_meta_data?.userData.name;
  const dispatch = useDispatch();
  const handleUserClick = () => {
    dispatch(setCurrentUser(value));
  };
  return (
    <Link
      // to="/users_Profile"
      to={`/user/${value}`}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleUserClick}
      style={{ textDecoration: "none" }}
    >
      <span className="orderId-color" style={{ cursor: "pointer" }}>
        {userName} ({value})
      </span>
    </Link>
  );
};

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
    Header: "Astrologer Earning",
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
  // },,
];

export const PARTICULARGIFTORDERHISTORYCOLUMN = [
  {
    Header: "Id",
    accessor: "id",
  },

  {
    Header: "User id",
    accessor: "user_id",
    Cell: CustomIdCell,
  },
  {
    Header: "Revenue/Flute Earning",
    accessor: "order_revenue",
    Cell: ({ row }) => (
      <span>
        {row.original.order_revenue}/{row.original.flute_earning}
      </span>
    ),
  },

  {
    Header: "Gift Name",
    accessor: "gift.name",
  },

  {
    Header: "Time",
    accessor: "createdAt",
    Cell: ({ value }) => {
      if (!value) return "null";
      const date = new Date(value);
      return date.toLocaleString("en-US", {
        dateStyle: "medium",
        timeStyle: "short",
      });
    },
  },
];
