import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCurrentConsultant } from "../../../_store/slices/consultantSlice";
import { setCurrentUser } from "../../../_store/slices/userSlice";
import { getStatusColor } from "../../../_constants/consultantConstant";

import { OrderType, OrderStatus } from "../../../_constants/consultantConstant";
const CustomIdCell = ({ value, row }) => {
  const userName = row?.original?.descriptions?.userData.name;
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

const ConsultantNavigationCell = ({ value, row }) => {
  // Get consultant_type from the row data
  const consultantType = row?.original?.description?.consultant_type;
  const dispatch = useDispatch();
  const handleConsultantClick = () => {
    dispatch(setCurrentConsultant(value));
  };

  const navigationRoute = {
    1: "/astrologer_Profile",
    2: "/coach-profile",
    3: "/listener_Profile",
  };
  // Get the route based on consultant type
  // Get the route based on consultant type
  const route =
    consultantType && navigationRoute[consultantType]
      ? `${navigationRoute[consultantType]}?${value}`
      : "";
  return (
    <Link
      to={route}
      onClick={handleConsultantClick}
      style={{ textDecoration: "none" }}
    >
      <span style={{ cursor: "pointer", color: "#be5b18ff" }}>{value}</span>
    </Link>
  );
};

const OrderIdCell = ({ value }) => {
  return <span className="custumerId-color">{value}</span>;
};

export const COLUMNSESSIONLIST = [
  {
    Header: "Id",
    accessor: "id",
    Cell: OrderIdCell,
  },
  {
    Header: "Session Id",
    accessor: "session_id",
    // Cell: OrderIdCell,
  },
  {
    Header: "Consultant Id",
    accessor: "consultant_id",
    Cell: ConsultantNavigationCell,
  },

  {
    Header: "User Id ",
    accessor: "user_id",
    Cell: CustomIdCell,
  },

  {
    Header: "Type",
    accessor: "session_type",
    Cell: ({ value }) => OrderType(value),
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

  // {
  //   Header: "Flute Earning",
  //   accessor: "flute_earning",
  // },
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
  {
    Header: "Duration(min)",
    accessor: "session_duration",
  },
  {
    Header: "Status",
    accessor: "status",
    Cell: ({ value }) => (
      <span style={{ color: getStatusColor(value) }}>{OrderStatus(value)}</span>
    ),
  },
];
