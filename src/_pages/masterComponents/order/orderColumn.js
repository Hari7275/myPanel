import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "../../../_store/slices/userSlice";
import { setCurrentConsultant } from "../../../_store/slices/consultantSlice";
import { getStatusColor } from "../../../_constants/consultantConstant";

import { OrderType, OrderStatus } from "../../../_constants/consultantConstant";

// Helper function to calculate end time
const calculateEndTime = (startTime, durationInMinutes) => {
  if (!startTime || !durationInMinutes) return null;

  const startDate = new Date(startTime);
  const endDate = new Date(startDate.getTime() + durationInMinutes * 60000); // 60000 ms = 1 minute

  return endDate;
};

// Helper function to format end time
const formatEndTime = (endDate) => {
  if (!endDate) return "N/A";

  return endDate.toLocaleString("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  });
};

// Helper function to check if time is overdue (with 1 minute buffer)
const isOverdue = (endTime, currentTime) => {
  if (!endTime) return false;
  // Add 1 minute (60000 ms) to the end time before comparing
  const endTimeWithBuffer = new Date(endTime.getTime() + 60000);
  return currentTime > endTimeWithBuffer;
};

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

const ConsultantNavigationCell = ({ value, row }) => {
  // Get consultant_type from the row data.
  const consultantName = row?.original?.description?.consultant_first_name;

  const consultantType = row?.original?.description?.consultant_type;
  const dispatch = useDispatch();
  const handleConsultantClick = () => {
    dispatch(setCurrentConsultant(value));
  };

  // const navigationRoute = {
  //   1: "/astrologer_Profile",
  //   2: "/coach-profile",
  //   3: "/listener_Profile",
  // };

  const navigationRoute = {
    1: `/astrologer/${value}`,
    2: `/coaches/${value}`,
    3: `/listeners/${value}`,
  };

  // Define type labels
  const typeLabel = {
    1: "A",
    2: "C",
    3: "L",
  };
  const foreigner = row?.original?.description?.is_consultant_foreigner;

  const displayType = typeLabel[consultantType] || "";
  // Get the route based on consultant type
  const route = consultantType && navigationRoute[consultantType];

  return (
    <Link
      to={route}
      target="_blank"
      rel="noopener noreferrer"
      // onClick={handleConsultantClick}
      style={{ textDecoration: "none" }}
    >
      <span
        style={{
          cursor: "pointer",
          color: foreigner ? "#1889beff" : "#be5b18ff",
          fontStyle: foreigner ? "italic" : "normal",
        }}
      >
        {consultantName} ({value})
        <span style={{ color: "#187cbeff" }}>({displayType})</span>
      </span>
    </Link>
  );
};

const OrderIdCell = ({ value }) => {
  return <span className="custumerId-color">{value}</span>;
};

export const COLUMNORDER = [
  {
    Header: "Id",
    accessor: "id",
    Cell: OrderIdCell,
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
    accessor: "order_type",
    Cell: ({ value }) => (
      <span style={{ color: value == 3 ? "#008000" : "" }}>
        {OrderType(value)}
      </span>
    ),
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
    Header: "Start Time",
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

  {
    Header: "Expected End Time",
    accessor: "order_duration",
    Cell: ({ value, row }) => {
      const startTime = row.original.createdAt;
      const status = row.original.status;
      const endTime = calculateEndTime(startTime, value);

      // Get current system time
      const currentTime = new Date();

      // Check if order is ongoing (status === 3) and overdue
      const isOverdueOrder = status === 3 && isOverdue(endTime, currentTime);

      return (
        <span
          style={{
            color: isOverdueOrder ? "red" : "inherit",
            whiteSpace: "nowrap",
          }}
        >
          {formatEndTime(endTime)} ({value})
        </span>
      );
    },
  },

  {
    Header: "Duration(min)",
    accessor: "actual_duration",
  },

  // {
  //   Header: "Exp. Dur(min)",
  //   accessor: "order_duration",
  // },
  {
    Header: "Status",
    accessor: "status",
    Cell: ({ value, row }) => {
      const rejectedCall =
        row.original.mode_type === 1 && row.original.status === 6;

      if (rejectedCall) {
        return <span style={{ color: "red" }}>Consultant Cancelled</span>;
      }

      return (
        <span style={{ color: getStatusColor(value) }}>
          {OrderStatus(value)}
        </span>
      );
    },
  },

  {
    Header: "Device Type",
    accessor: "description", // accessor should be a direct key
    Cell: ({ row }) => {
      const platform = row?.original?.description?.userData?.platform;
      return <span>{platform == 1 ? "Android" : "iOS"}</span>;
    },
  },
];
