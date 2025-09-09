import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "../../../_store/slices/userSlice";
import { OrderType, OrderStatus } from "../../../_constants/consultantConstant";
import { formatNumber } from "../../users/transactionlist/userTransactionsColumn";

// Custom cell component for Order IDs
const OrderIdCell = ({ value }) => {
  return <span className="custumerId-color">{value}</span>;
};

// Custom cell component for User ID with navigation
const CustomIdCell = ({ value }) => {
  const dispatch = useDispatch();

  const handleUserClick = () => {
    // Dispatch the user ID to Redux store
    dispatch(setCurrentUser(value));
  };

  return (
    <Link
      to="/users_Profile"
      onClick={handleUserClick}
      style={{ textDecoration: "none" }}
    >
      <span className="orderId-color" style={{ cursor: "pointer" }}>
        {value}
      </span>
    </Link>
  );
};

// Column configuration
export const COLUMNRECHARGE = [
  {
    Header: "Id",
    accessor: "id",
    Cell: OrderIdCell,
  },
  {
    Header: "User Id",
    accessor: "user_id",
    Cell: CustomIdCell,
  },
  {
    Header: "Name",
    accessor: "first_name",
    Cell: ({ value }) => <span style={{ color: "#1f2937" }}>{value}</span>,
  },
  {
    Header: "Phone Number",
    accessor: "phone_number",
    Cell: ({ value }) => <span style={{ color: "#6b7280" }}>{value}</span>,
  },
  {
    Header: "Amount",
    accessor: "amount",
    Cell: ({ value }) => (
      <span style={{ color: "#10b981", fontWeight: "600" }}>
        {formatNumber(value)}
      </span>
    ),
  },
  {
    Header: "Total Balance",
    accessor: "remaining_balance",
    Cell: ({ value }) => (
      <span style={{ color: "#1f2937" }}>{formatNumber(value)}</span>
    ),
  },
  {
    Header: "Trans By",
    accessor: "is_admin_txn",
    Cell: ({ value }) => {
      const isAdmin = value == true;
      return (
        <span style={{ color: isAdmin ? "#f59e0b" : "#8b5cf6" }}>
          {isAdmin ? "Admin" : "User"}
        </span>
      );
    },
  },
  {
    Header: "Transaction Time",
    accessor: "transaction_time",
    Cell: ({ value }) => {
      if (!value) return <span style={{ color: "#9ca3af" }}>null</span>;
      const date = new Date(value);
      return (
        <span style={{ color: "#6b7280" }}>
          {date.toLocaleString("en-US", {
            dateStyle: "medium",
            timeStyle: "short",
          })}
        </span>
      );
    },
  },
  {
    Header: "Status",
    accessor: "status",
    Cell: ({ value }) => {
      const statusColors = {
        successful: "#10b981",
        pending: "#f59e0b",
        failed: "#ef4444",
      };

      const color = statusColors[value?.toLowerCase()] || "#6b7280";

      return <span style={{ color: color }}>{value}</span>;
    },
  },
];
