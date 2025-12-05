import { ArrowRight } from "lucide-react";
import { formatDateTime } from "../../../_constants/formatedDate";

import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "../../../_store/slices/userSlice";

const CustomIdCell = ({ value, row }) => {
  // const userName = row?.original?.description?.userData.name;
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
        {/* {userName} ({value}) */}
        {value}
      </span>
    </Link>
  );
};

const OrderIdCell = ({ value }) => {
  return <span className="custumerId-color">{value}</span>;
};

export const FOLLOWERSCOLUMN = [
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
    Header: "User's Nick Name",
    accessor: "user_nick_name",
  },
  {
    Header: "Date",
    accessor: "created_at",
    Cell: ({ value }) => formatDateTime(value),
  },
];

// blocked user by consultant

export const BLOCKEDUSERCOLUMN = [
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
    Header: "User Name",
    accessor: "first_name",
  },
  {
    Header: "Reason",
    accessor: "reason",
  },
  {
    Header: "Date",
    accessor: "createdAt",
  },
];
