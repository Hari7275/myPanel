import Status from "./Status";
import "../../cssfolder/column.css";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import { ArrowRight } from "lucide-react";

const CustomUserType = ({ value }) => {
  return <span className="orderId-color">{value}</span>;
};

export const COACHESCOLUMNS = [
  {
    Header: "User Id",
    accessor: "id",
  },
  {
    Header: "Name",
    Footer: "First Name",
    accessor: (row) => `&{row.original.first_name} &{row.original.last_name}`,

    Cell: ({ row }) => (
      <div className="column_container">
        <div className="card-img">
          <img
            src={
              row.original.profile_image
                ? row.original.profile_image
                : "praveen.png"
            }
            alt="Avatar"
            width="40"
            height="40"
          />
        </div>
        <Link to="chat">
          <span className="column_container_name">
            {row.original.first_name} {row.original.last_name}
          </span>
        </Link>
      </div>
    ),
  },
  {
    Header: "Email",
    accessor: "email",
  },
  {
    Header: "Gender",
    accessor: "gender",
  },

  {
    Header: "Phone No.",
    accessor: "phoneNumber",
    Cell: CustomUserType,
  },
  {
    Header: "user Type",
    accessor: "user_type",
  },

  {
    Header: "Loaction",
    accessor: "country",
  },
  {
    Header: "Status",
    accessor: "status",
    // Cell: ({ row }) => <Status row={row} />,
  },
];

export const LISTENERSCOLUMNS = [
  {
    Header: "User Id",
    accessor: "id",
  },
  {
    Header: "Name",
    Footer: "First Name",
    accessor: (row) => `&{row.original.first_name} &{row.original.last_name}`,

    Cell: ({ row }) => (
      <div className="column_container">
        <div className="card-img">
          {row.original.CoachPhotos.length > 0 && (
            <img
              src={row.original.CoachPhotos[0].url}
              alt="Avatar"
              width="40"
              height="40"
            />
          )}
        </div>
        <Link to="chat">
          <span className="column_container_name">
            {row.original.first_name} {row.original.last_name}
          </span>
        </Link>
      </div>
    ),
  },
  {
    Header: "Email",
    accessor: "email",
  },
  {
    Header: "Gender",
    accessor: "gender",
  },

  {
    Header: "Phone No.",
    accessor: "phoneNumber",
    Cell: CustomUserType,
  },
  {
    Header: "user Type",
    accessor: "user_type",
  },
  {
    Header: "Last Active",
    accessor: "created_at",
    Cell: ({ value }) => format(new Date(value), "P"),
  },
  {
    Header: "Loaction",
    accessor: "country",
  },
  {
    Header: "Status",
    accessor: "status",
    Cell: ({ row }) => <Status row={row} />,
  },
  {
    Header: "Action",
    Cell: ({ row }) => (
      <Link to="/listener_Profile">
        <div className="secondIcon">
          <ArrowRight />
        </div>
      </Link>
    ),
  },
];

export const COLUMNS = [
  {
    Header: "User Id",
    accessor: "id",
    Cell: ({ value }) => <span style={{ color: "#8c57ff" }}>{value}</span>,
  },

  {
    Header: "Name",
    Footer: "First Name",
    accessor: (row) => `&{row.original.first_name} &{row.original.last_name}`,

    Cell: ({ row }) => (
      <div className="column_container">
        <div className="card-img">
          <img
            src={
              row.original.profile_image
                ? row.original.profile_image
                : "praveen.png"
            }
            alt="Avatar"
            width="40"
            height="40"
          />
        </div>
        <Link to="chat">
          <span className="column_container_name">
            {row.original.first_name} {row.original.last_name}
          </span>
        </Link>
      </div>
    ),
  },
  {
    Header: "Email",
    accessor: "email",
  },
  {
    Header: "Gender",
    accessor: "gender",
  },

  {
    Header: "Phone No.",
    accessor: "phoneNumber",
    Cell: CustomUserType,
  },
  {
    Header: "Last Active",
    accessor: "date_of_birth",
    Cell: ({ value }) => format(new Date(value), "P"),
  },

  {
    Header: "User Type",
    accessor: "user_type",
  },

  {
    Header: "Loaction",
    accessor: "country",
  },

  {
    Header: "Status",
    accessor: "status",
    Cell: ({ row }) => <Status row={row} />,
  },

  {
    Header: "Action",
    Cell: ({ row }) => (
      <Link to="/users_Profile">
        <div className="secondIcon">
          <ArrowRight />
        </div>
      </Link>
    ),
  },
];

// side bar columns

export const COLUMNSWITHOUTIMG = [
  {
    Header: "Name",
    Footer: "First Name",
    accessor: "first_name",
  },
  {
    Header: "Email",
    accessor: "email",
  },

  {
    Header: "Gender",
    accessor: "gender",
  },

  {
    Header: "User Type",
    accessor: "User_Type",
  },
  {
    Header: "Last Active",
    accessor: "Last_active",
  },
  {
    Header: "Loaction",
    accessor: "country",
  },
  {
    Header: "Status",
    accessor: "Button",
    Cell: ({ row }) => <Status row={row} />,
  },
];

// columns for whose Up List

export const COLUMNSWHOSEUP = [
  {
    Header: "ID",
    Cell: ({ row }) => row.index + 1,
  },
  {
    Header: "User Id",
    accessor: "email",
  },

  {
    Header: "Gender",
    accessor: "gender",
  },

  {
    Header: "Action Type",
    accessor: "User_Type",
  },
  {
    Header: "Start Date",
    accessor: "start_date",
  },
  {
    Header: "End Date",
    accessor: "end_date",
  },

  {
    Header: "Loaction",
    accessor: "country",
  },
];

// columns for coaches

export const COLUMNSFORCOACHES = [
  {
    Header: "Name",
    Footer: "First Name",
    accessor: "first_name",
  },
  {
    Header: "Email",
    accessor: "email",
  },

  {
    Header: "Gender",
    accessor: "gender",
  },

  {
    Header: "User Type",
    accessor: "User_Type",
  },
  {
    Header: "Last Active",
    accessor: "Last_active",
  },
  {
    Header: "Loaction",
    accessor: "country",
  },
  {
    Header: "Status",
    accessor: "Button",
    Cell: ({ row }) => <Status row={row} />,
  },
];

// new table column sections

export const MASTERPACKAGECOLUMN = [
  {
    Header: "Sr. No.",
    Cell: ({ row }) => row.index + 1,
  },
  {
    Header: "Product Key",
    accessor: "id",
  },
  {
    Header: "Product Name",
    accessor: "first_name",
  },
  {
    Header: "Product Price",
    accessor: "User_Typ",
  },
  {
    Header: "Added Date",
    accessor: "Last_active",
  },
];

const EditAction = () => {
  return <ModeEditOutlineOutlinedIcon />;
};

const CustomIdCell = ({ value }) => {
  return <span className="orderId-color">{value}</span>;
};

const OrderIdCell = ({ value }) => {
  return <span className="custumerId-color">{value}</span>;
};

const StatusCell = ({ value }) => {
  let className = "status-button ";
  switch (value) {
    case "completed":
      className += "status-completed";
      break;
    case "pending":
      className += "status-pending";
      break;
    case "in progress":
      className += "status-in-progress";
      break;
    case "cancelled":
      className += "status-cancelled";
      break;
    default:
      break;
  }

  return <button className={className}>{value}</button>;
};

export const COLUMNORDER = [
  {
    Header: "OrderId",
    accessor: "orderId",
    Cell: OrderIdCell,
  },
  {
    Header: "CoachId",
    accessor: "coachId",
  },
  {
    Header: "CustumerId",
    accessor: "custumerId",
    Cell: CustomIdCell,
  },
  {
    Header: "Type",
    accessor: "Type",
  },
  {
    Header: "Status",
    accessor: "status",
    Cell: StatusCell,
  },
  {
    Header: "Amount",
    accessor: "Amount",
  },
  {
    Header: "Action",
    Cell: ({ row }) => <EditAction />,
  },
];

export const WALLETCHARTCOLUMN = [
  {
    Header: "Listeners Id",
    accessor: "id",
    Cell: ({ value }) => <span style={{ color: "#8c57ff" }}>{value}</span>,
  },
  {
    Header: "Type",
    accessor: "type",
  },
  {
    Header: "Transaction Type",
    accessor: "transaction_type",
  },
  {
    Header: "Amount",
    accessor: "amount",
  },
  {
    Header: "Remaining Balance",
    accessor: "remainingBalance",
  },
  {
    Header: "Status",
    accessor: "status",
  },
];

// coach order chart

export const ORDERCHARTCOLUMN = [
  {
    Header: "User Id",
    accessor: "user_id",
  },

  {
    Header: "Order Type",
    accessor: "order_type",
  },
  {
    Header: "Price",
    accessor: "price",
  },
  {
    Header: "Commission",
    accessor: "commission",
  },
  {
    Header: "Start Time",
    accessor: "call_start_time",
    Cell: ({ value }) => format(new Date(value), "p"),
  },
  {
    Header: "End Time",
    accessor: "call_end_time",
    Cell: ({ value }) => format(new Date(value), "p"),
  },

  {
    Header: "Status",
    accessor: "status",
  },
];

export const FOLLOWERSCOLUMN = [
  {
    Header: "Id",
    accessor: "id",
  },
  {
    Header: "First Name",
    accessor: "firstName",
  },
  {
    Header: "Last Name",
    accessor: "lastName",
  },
  {
    Header: "Age",
    accessor: "age",
  },
  {
    Header: "Image",
    Cell: ({ row }) => (
      <img src={row.original.img} alt="Avatar" width="80" height="80" />
    ),
  },
  {
    Header: "Action",
    Cell: ({ row }) => (
      <div className="secondIcon">
        <ArrowRight />
      </div>
    ),
  },
];

// coach reviews columns

export const REVIEWSCOLUMN = [
  {
    Header: "User Id",
    accessor: "user_id",
    Cell: ({ value }) => <span style={{ color: "#8c57ff" }}>{value}</span>,
  },

  {
    Header: "Rating",
    accessor: "rating",
  },
  {
    Header: "Review Text",
    accessor: "review_text",
  },
  {
    Header: "Updated Date",
    accessor: "createdAt",
    Cell: ({ value }) => format(new Date(value), "P"),
  },

  {
    Header: "Action",
    Cell: ({ row }) => (
      <div className="secondIcon">
        <ArrowRight />
      </div>
    ),
  },
];

// THIS SECTION FOR NOTIFICATION

export const NOTIFICATIONCOLUMN = [
  {
    Header: "User Id",
    accessor: "user_id",
    Cell: ({ value }) => <span style={{ color: "blue" }}>{value}</span>,
  },

  {
    Header: "Rating",
    accessor: "rating",
  },
  {
    Header: "Review Text",
    accessor: "review_text",
  },
  {
    Header: "Updated Date",
    accessor: "createdAt",
    Cell: ({ value }) => format(new Date(value), "P"),
  },

  {
    Header: "Action",
    Cell: ({ row }) => (
      <div className="secondIcon">
        <ArrowRight />
      </div>
    ),
  },
];
