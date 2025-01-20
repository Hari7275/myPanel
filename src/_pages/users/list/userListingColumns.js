import React from "react";
import { UserVerificationStatus } from "../../../_constants/consultantConstant";

// import Status from "../../../_components/table/Status";
import { format } from "date-fns";

const StatusCell = ({ value }) => {
  return <span>{UserVerificationStatus(value)}</span>;
};

const CustomUserType = ({ value }) => {
  return <span className="orderId-color">{value}</span>;
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
                : "praveen.png"
            }
            alt="Avatar"
            width="40"
            height="40"
            onClick={() =>
              toggleModal(row.original.profile_image || "praveen.png")
            }
            style={{ cursor: "pointer" }}
          />
        </div>

        <span className="column_container_name">
          {row?.original?.first_name}
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
    Header: "Last Active",
    accessor: "last_active",
    Cell: ({ value }) => format(new Date(value), "P"),
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
];
