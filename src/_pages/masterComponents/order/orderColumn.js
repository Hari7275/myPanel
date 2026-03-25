import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentUser } from "../../../_store/slices/userSlice";
import {
  getStatusColor,
  COMPLETED_BY_MAP,
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
  const permissions = useSelector((state) => state?.auth?.permissions || {});
  const dashboardPerms = permissions?.["Dashboard"] || [];
  const canNavigate = dashboardPerms.includes("view_dashboard_superadmin") || dashboardPerms.includes("view_dashboard_admin");

  const handleUserClick = () => {
    dispatch(setCurrentUser(value));
  };

  const content = (
    <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
      <span
        className={canNavigate ? "clickable-id-link" : ""}
        style={{ color: "var(--table-text)", cursor: canNavigate ? "pointer" : "default", whiteSpace: "nowrap" }}
      >
        {userName}
      </span>
      <span style={{ fontSize: "13px", color: "var(--table-link-user)", fontWeight: 500 }}>
        ID: {value}
      </span>
    </div>
  );

  if (!canNavigate) return content;

  return (
    <Link
      to={`/user/${value}`}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleUserClick}
      style={{ textDecoration: "none" }}
    >
      {content}
    </Link>
  );
};

const consultantTypeLabel = { 1: "Astrologer", 2: "Coach", 3: "Listener" };

const ConsultantNavigationCell = ({ value, row }) => {
  const consultantName = row?.original?.description?.consultant_first_name;
  const consultantType = row?.original?.description?.consultant_type;
  const foreigner = row?.original?.description?.is_consultant_foreigner;
  const permissions = useSelector((state) => state?.auth?.permissions || {});
  const dashboardPerms = permissions?.["Dashboard"] || [];
  const canNavigate = dashboardPerms.includes("view_dashboard_superadmin") || dashboardPerms.includes("view_dashboard_admin");

  const navigationRoute = {
    1: `/astrologer/${value}`,
    2: `/coaches/${value}`,
    3: `/listeners/${value}`,
  };

  const baseRoute = navigationRoute[consultantType] || "";
  const route = !foreigner
    ? `${baseRoute}?status=3&type=91`
    : `${baseRoute}?status=3`;

  const content = (
    <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
      <span
        className={canNavigate ? "clickable-id-link" : ""}
        style={{
          cursor: canNavigate ? "pointer" : "default",
          color: "var(--table-text)",
          fontStyle: foreigner ? "italic" : "normal",
          whiteSpace: "nowrap",
          fontSize: "15px",
          fontWeight: 600,
        }}
      >
        {consultantName}
      </span>
      <span style={{ fontSize: "13px", fontWeight: 500 }}>
        <span style={{ color: foreigner ? "var(--table-link-consultant-foreign)" : "var(--table-link-consultant-local)" }}>ID: {value}</span>
        <span style={{ color: "var(--table-text)" }}> · {consultantTypeLabel[consultantType] || ""}</span>
      </span>
    </div>
  );

  if (!canNavigate) return content;

  return (
    <Link
      to={route}
      target="_blank"
      rel="noopener noreferrer"
      style={{ textDecoration: "none" }}
    >
      {content}
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
    Header: "Consultant",
    accessor: "consultant_id",
    Cell: ConsultantNavigationCell,
  },

  {
    Header: "User",
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
    Header: "Earnings",
    accessor: "order_revenue",
    Cell: ({ row }) => {
      const revenue = row.original.order_revenue;
      const flute = row.original.flute_earning;
      const consultant = row.original.consultant_earning;
      return (
        <div style={{ display: "flex", flexDirection: "column", gap: "3px", fontSize: "12px" }}>
          <span style={{ whiteSpace: "nowrap" }}><span style={{ color: "#64748b" }}>R</span> {revenue ?? "-"}</span>
          <span style={{ whiteSpace: "nowrap" }}><span style={{ color: "#64748b" }}>F</span> {flute ?? "-"}</span>
          <span style={{ whiteSpace: "nowrap" }}><span style={{ color: "#64748b" }}>C</span> {consultant ?? "-"}</span>
        </div>
      );
    },
  },

  {
    Header: "Start Time",
    accessor: "createdAt",
    Cell: ({ value }) => {
      if (!value) return "null";
      const date = new Date(value);
      return (
        <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
          <span style={{ fontSize: "13px", fontWeight: 600, color: "inherit" }}>
            {date.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })}
          </span>
          <span style={{ fontSize: "11px", color: "#64748b" }}>
            {date.toLocaleDateString("en-US", { day: "numeric", month: "short", year: "numeric" })}
          </span>
        </div>
      );
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

      if (!endTime) return "N/A";
      return (
        <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
          <span style={{ fontSize: "13px", fontWeight: 600, color: isOverdueOrder ? "red" : "inherit", whiteSpace: "nowrap" }}>
            {endTime.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })} <span style={{ color: isOverdueOrder ? "red" : "var(--table-link-consultant-local)", fontWeight: 600 }}>({value})</span>
          </span>
          <span style={{ fontSize: "11px", color: isOverdueOrder ? "red" : "#64748b", whiteSpace: "nowrap" }}>
            {endTime.toLocaleDateString("en-US", { day: "numeric", month: "short", year: "numeric" })}
          </span>
        </div>
      );
    },
  },

  {
    Header: "Duration",
    accessor: "actual_duration",
    width: 60,
    maxWidth: 60,
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
        return (
          <span style={{ color: "#F87171", fontWeight: 600, fontSize: "13px" }}>
            Consultant Cancelled
          </span>
        );
      }

      const color = getStatusColor(value);
      return (
        <span style={{ color, fontWeight: 600, fontSize: "13px" }}>
          {OrderStatus(value)}
        </span>
      );
    },
  },

  {
    Header: "Device",
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
      <span
        style={{
          color: "var(--table-text)",
          fontWeight: 500,
        }}
      >
        {COMPLETED_BY_MAP[value] || ""}
      </span>
    ),
  },
];
