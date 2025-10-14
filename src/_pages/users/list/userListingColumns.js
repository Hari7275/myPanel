import React from "react";
import { UserVerificationStatus } from "../../../_constants/consultantConstant";

// import Status from "../../../_components/table/Status";
import { format } from "date-fns";

const StatusCell = ({ value }) => {
  return <span>{UserVerificationStatus(value)}</span>;
};

const CustomUserType = ({ value, row }) => {
  const color =
    row.original.country_code === "IN"
      ? "rgba(38, 38, 204, 0.596)"
      : "#810c0cff";

  return <span style={{ color, fontWeight: 600 }}>{value}</span>;
};

export const COLUMNS = (toggleModal) => [
  {
    Header: "User Id",
    accessor: "id",
    Cell: ({ value }) => <span style={{ color: "#8c57ff" }}>{value}</span>,
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
              row?.original?.profile_image
                ? row?.original?.profile_image
                : "avatar11.png"
            }
            alt="Avatar"
            width="40"
            height="40"
            onClick={() =>
              toggleModal(row.original.profile_image || "avatar11.png")
            }
            style={{ cursor: "pointer" }}
          />
        </div>

        <span className="column_container_name">
          {row?.original?.name}
        </span>
      </div>
    ),
  },

  {
    Header: "Gender",
    accessor: "gender",
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
    Cell: ({ value }) => (value == 1 ? "Andriod" : "iOS"),
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
