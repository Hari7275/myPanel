import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "../../../_store/slices/userSlice";
import { setCurrentConsultant } from "../../../_store/slices/consultantSlice";
import {
  getStatusColor,
  COMPLETED_BY_MAP,
  COMPLETED_BY_COLOR_MAP,
} from "../../../_constants/consultantConstant";

import { OrderType, OrderStatus } from "../../../_constants/consultantConstant";
import AndroidIcon from "@mui/icons-material/Android";
import AppleIcon from "@mui/icons-material/Apple";

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
  const consultantName = row?.original?.description?.consultant_first_name;
  const consultantType = row?.original?.description?.consultant_type;
  const foreigner = row?.original?.description?.is_consultant_foreigner;

  const navigationRoute = {
    1: `/astrologer/${value}`,
    2: `/coaches/${value}`,
    3: `/listeners/${value}`,
  };

  const baseRoute = navigationRoute[consultantType] || "";

  // Add ?type=91 only if NOT foreigner
  const route = !foreigner
    ? `${baseRoute}?status=3&type=91`
    : `${baseRoute}?status=3`;

  return (
    <Link
      to={route}
      target="_blank"
      rel="noopener noreferrer"
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
        <span style={{ color: "#187cbeff" }}>
          ({{ 1: "A", 2: "C", 3: "L" }[consultantType] || ""})
        </span>
      </span>
    </Link>
  );
};

const OrderIdCell = ({ value, row }) => {
  const rejectedCall = row.original.mode_type === 1;
  if (rejectedCall) {
    return (
      <span style={{ color: "#DB2777", fontWeight: "bolder" }}>{value}</span>
    );
  }
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
        row.original.mode_type === 1 && row.original.status === 6; //check for rejected call

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
    Header: "Dv Type",
    accessor: "description", // accessor should be a direct key
    Cell: ({ row }) => {
      const platform = row?.original?.description?.userData?.platform;
      return (
        <span>
          {platform == 1 ? (
            <AndroidIcon sx={{ color: "#3DDC84" }} />
          ) : (
            <AppleIcon sx={{ color: "#7b7878ff" }} />
          )}
        </span>
      );
    },
  },

  {
    Header: "Comp By",
    accessor: "completed_by",
    Cell: ({ value }) => (
      // <span className={COMPLETED_BY_COLOR_MAP[value] || "text-gray-700"}>
      <span
        style={{
          color: COMPLETED_BY_COLOR_MAP[value] || "#000000",
          fontWeight: 500,
        }}
      >
        {COMPLETED_BY_MAP[value] || ""}
      </span>
    ),
  },
];
