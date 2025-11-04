// import { format } from "date-fns";
import { formatDateTime } from "../../../../_constants/formatedDate";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "../../../../_store/slices/userSlice";

// Cell: ({ value }) => formatDateTime(value),

const CustomIdCell = ({ value }) => {
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
        {value}
      </span>
    </Link>
  );
};

export const SUPPORTREQUESTCOLUMN = [
  {
    Header: "Id",
    accessor: "id",
  },

  {
    Header: "User Id",
    accessor: "user_id",
    Cell: CustomIdCell,
  },

  {
    Header: "Order Id",
    accessor: "order_id",
  },
  {
    Header: "Support Issue Id",
    accessor: "supportIssue.title",
  },

  {
    Header: "Query Message",
    accessor: "query_message",
    Cell: ({ row }) => (
      <div
        style={{
          maxWidth: "350px",
          wordWrap: "break-word",
          overflow: "hidden",
          display: "-webkit-box",
          WebkitLineClamp: 2,
          WebkitBoxOrient: "vertical",
        }}
      >
        {row?.original?.query_message}
      </div>
    ),
  },
  {
    Header: "Status",
    accessor: "status",
    Cell: ({ value }) => {
      if (value === 1) return "Open";
      if (value === 2) return "Closed";
      if (value === 3) return "Deleted";
      return "Unknown";
    },
  },

  {
    Header: "Time",
    accessor: "createdAt",
    Cell: ({ value }) => formatDateTime(value),
  },
];
