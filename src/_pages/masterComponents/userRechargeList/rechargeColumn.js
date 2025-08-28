import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "../../../_store/slices/userSlice";
import { OrderType, OrderStatus } from "../../../_constants/consultantConstant";

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
      style={{ textDecoration: 'none' }}
    >
      <span className="orderId-color" style={{ cursor: 'pointer' }}>
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
  },
  {
    Header: "Phone Number",
    accessor: "phone_number",
  },
  {
    Header: "Amount",
    accessor: "amount",
  },
  {
    Header: "Total Balance",
    accessor: "remaining_balance",
  },
   {
    Header: "Trans By",
    accessor: "is_admin_txn",
    Cell: ({ value }) => (value == true ? "Admin" : "User"),
  },
  {
    Header: "Transaction Time",
    accessor: "transaction_time",
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
    // Cell: ({ value }) => <span>{OrderStatus(value)}</span>,
  },
];