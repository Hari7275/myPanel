import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "../../../_store/slices/userSlice";
import { formatNumber } from "../../users/transactionlist/userTransactionsColumn";
import AndroidIcon from "@mui/icons-material/Android";
import AppleIcon from "@mui/icons-material/Apple";

// Custom cell component for Order IDs
const OrderIdCell = ({ value }) => {
  return <span className="custumerId-color">{value}</span>;
};

// Custom cell component for User ID with navigation
const CustomIdCell = ({ value, row }) => {
  const userName = row?.original?.user_name;

  const dispatch = useDispatch();

  const handleUserClick = () => {
    // Dispatch the user ID to Redux store
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
        {userName}( {value})
      </span>
    </Link>
  );
};

// Column configuration
export const RAZORPAYRECHARGECOLUMN = [
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
    Header: "Device Info",
    accessor: "platform",
    Cell: ({ value }) =>
      value == 1 ? (
        <AndroidIcon sx={{ color: "#3DDC84" }} />
      ) : (
        <AppleIcon sx={{ color: "#7b7878ff" }} />
      ),
  },
  {
    Header: "Phone Number",
    accessor: "phone_number",
    Cell: ({ value, row }) => (
      <span style={{ color: "var(--table-text)", fontSize: "13px" }}>
        {row?.original?.country_code}-{value}
      </span>
    ),
  },

  {
    Header: "Transaction Type",
    accessor: "transaction_type",
    Cell: ({ value }) => (
      <span style={{ color: "var(--table-text)", fontSize: "13px" }}>{value}</span>
    ),
  },
  {
    Header: "Plan Id",
    accessor: "plan_id",
    Cell: ({ value }) => (
      <span style={{ color: "var(--table-id-muted)", fontSize: "13px" }}>
        {value ? value : "—"}
      </span>
    ),
  },

  // {
  //   Header: "Device Info",
  //   accessor: "platform",
  //   Cell: ({ value }) => (
  //     <span style={{ color: "#6b7280" }}>{value == 1 ? "Android" : "iOS"}</span>
  //   ),
  // },

  {
    Header: "Amount",
    accessor: "transaction_amount",
    Cell: ({ value, row }) => (
      <span
        style={{
          color: row.original.country_code == "IN" ? "#10b981" : "#f87171",
          fontWeight: 600,
          fontSize: "13px",
        }}
      >
        {row.original.country_code == "IN" ? "" : "$"}
        {formatNumber(value)}
      </span>
    ),
  },
  {
    Header: "Total Balance",
    accessor: "wallet_amount",
    Cell: ({ value, row }) => (
      <span style={{ color: "var(--table-text)", fontSize: "13px" }}>
        {row.original.country_code == "IN" ? "" : "$"}
        {formatNumber(value)}
      </span>
    ),
  },
  // {
  //   Header: "Trans By",
  //   accessor: "is_admin_txn",
  //   Cell: ({ value }) => {
  //     const isAdmin = value == true;
  //     return (
  //       <span style={{ color: isAdmin ? "#f59e0b" : "#8b5cf6" }}>
  //         {isAdmin ? "Admin" : "User"}
  //       </span>
  //     );
  //   },
  // },

  {
    Header: "Transaction id",
    accessor: "transaction_id",
  },


  {
    Header: "Transaction Time",
    accessor: "created_at",
    Cell: ({ value }) => {
      if (!value) return <span style={{ color: "var(--table-id-muted)", fontSize: "13px" }}>—</span>;
      const date = new Date(value);
      return (
        <span style={{ color: "var(--table-id-muted)", fontSize: "13px" }}>
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
        SUCCESS: "#10b981",   // green — works in both modes
        PENDING: "#f59e0b",   // amber — readable in both modes
        FAILED: "#ef4444",    // red — works in both modes
        AUTHORIZED: "#818cf8", // indigo-400 — visible in both modes
      };

      const color = statusColors[value] || "var(--table-id-muted)";

      let displayValue = value;
      // if (value === "PENDING") {
      //   displayValue = "INITIATED";
      // } else if (value === "AUTHORIZED") {
      //   displayValue = "AUTHORIZED";
      // }

      return (
        <span style={{ color, fontWeight: 600, fontSize: "12px", letterSpacing: "0.3px" }}>
          {displayValue}
        </span>
      );
    },
  },
];
