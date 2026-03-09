import React from "react";
import {
  UserVerificationStatus,
  getUserVerificationColor,
} from "../../../_constants/consultantConstant";

// import Status from "../../../_components/table/Status";
import AndroidIcon from "@mui/icons-material/Android";
import AppleIcon from "@mui/icons-material/Apple";
import { format } from "date-fns";

const StatusCell = ({ value }) => {
  return (
    <span style={{ color: getUserVerificationColor(value), fontWeight: 600 }}>
      {UserVerificationStatus(value)}
    </span>
  );
};

const CustomUserType = ({ value, row }) => {
  const color =
    row.original.country_code === "IN"
      ? "#8890cc"
      : "#cc8888";

  return <span style={{ color, fontWeight: 500, fontSize: "13px" }}>{value}</span>;
};

export const COLUMNS = (toggleModal) => [
  {
    Header: "User Id",
    accessor: "id",
    Cell: ({ value }) => <span style={{ color: "#888888", fontSize: "13px" }}>{value}</span>,
  },

  {
    Header: "Name",
    Footer: "First Name",
    accessor: "first_name",

    Cell: ({ row }) => (
      <div className="column_container">
        <div className="card-img">
          <img
            src={
              row?.original?.profile_image_url
                ? row?.original?.profile_image_url
                : "avatar11.png"
            }
            alt="Avatar"
            width="40"
            height="40"
            onClick={() =>
              toggleModal(row.original.profile_image_url || "avatar11.png")
            }
            style={{ cursor: "pointer" }}
          />
        </div>

        <span className="column_container_name">
          {row?.original?.name}
          {row?.original?.gender && (
            <span style={{
              color: row.original.gender?.toLowerCase() === "man" ? "#7eb3f7" : "#f090b0",
              fontWeight: 600,
              fontSize: "15px",
              marginLeft: "5px",
            }}>
              {row.original.gender?.toLowerCase() === "man" ? "♂" : "♀"}
              
            </span>
          )}
        </span>
      </div>
    ),
  },

  {
    Header: "Phone No.",
    accessor: "phone_number",
    Cell: CustomUserType,
  },

  {
    Header: "Email",
    accessor: "email_address",
  },

  {
    Header: "User Type",
    accessor: "user_type",
    Cell: ({ value }) => (value == 0 ? "External" : "Internal"),
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
    Header: "Loaction",
    accessor: "country",
  },

  {
    Header: "Status",
    accessor: "profile_status",
    Cell: StatusCell,
  },

  {
    Header: "Created Date",
    accessor: "created_date",
    Cell: ({ value }) => {
      const date = new Date(value);
      return date.toLocaleString("en-US", {
        dateStyle: "medium",
        timeStyle: "short",
      });
    },
  },
];
