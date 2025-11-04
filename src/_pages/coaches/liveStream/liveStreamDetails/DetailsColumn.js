import moment from "moment"; // Make sure moment is installed and imported
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "../../../../_store/slices/userSlice";
import {
  formatDateTime,
  formatDuration,
} from "../../../../_constants/formatedDate";

const OrderIdCell = ({ value }) => {
  return <span className="custumerId-color">{value}</span>;
};

const CustomIdCell = ({ value, row }) => {
  // const userName = row?.original?.description?.userData.name;
  const dispatch = useDispatch();
  // const handleUserClick = () => {
  //   dispatch(setCurrentUser(value));
  // };

  const handleUserClick = (e) => {
    if (value > 1000000) {
      e.preventDefault(); // stop navigation
      return;
    }
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
        {/* {userName}  */}
        {value}
      </span>
    </Link>
  );
};

export const DETAILSCOLUMN = [
  {
    Header: "Id",
    accessor: "id",
    Cell: OrderIdCell,
  },
  {
    Header: "User Id",
    accessor: "listener_id",
    Cell: CustomIdCell,
  },
  {
    Header: "Start Time",
    accessor: "joined_at",
    Cell: ({ value }) => formatDateTime(value),
  },

  // {
  //   Header: "End Time",
  //   accessor: "left_at",

  //   Cell: ({ value }) => formatDateTime(value),
  // },
  {
    Header: "Duration",
    accessor: "duration",
    Cell: ({ row }) =>
      formatDuration(row.original.joined_at, row.original.left_at),
  },
];
