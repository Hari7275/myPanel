import { Link } from "react-router-dom";

const consultantTypeMap = {
  1: "Astrologer",
  2: "Coach",
  3: "Listener",
};

const genderMap = {
  1: "Male",
  2: "Female",
  3: "Other",
};

const statusMap = {
  1: "Inactive",
  2: "Verification Pending",
  3: "Active",
  5: "Blocked",
  6: "Verification Rejected",
  7: "Account Deleted",
  8: "Inactive",
};

export const NO_ORDER_CONSULTANT_COLUMNS = [
  {
    Header: "Id",
    accessor: "id",
  },
  {
    Header: "Display Name",
    accessor: "display_name",
    Cell: ({ value, row }) => {
      const type = row.original.consultant_type;
      const id = row.original.id;
      const routeMap = {
        1: `/astrologer/${id}`,
        2: `/coaches/${id}`,
        3: `/listeners/${id}`,
      };
      const route = routeMap[type];
      if (!route) return value || "-";
      return (
        <Link
          to={`${route}?status=3`}
          target="_blank"
          rel="noopener noreferrer"
          style={{ textDecoration: "none" }}
        >
          <span style={{ cursor: "pointer", color: "#be5b18ff" }}>
            {value} ({id})
          </span>
        </Link>
      );
    },
  },
  {
    Header: "First Name",
    accessor: "first_name",
  },
  {
    Header: "Last Name",
    accessor: "last_name",
  },
  {
    Header: "Type",
    accessor: "consultant_type",
    Cell: ({ value }) => consultantTypeMap[value] || value,
  },
  {
    Header: "Gender",
    accessor: "gender",
    Cell: ({ value }) => genderMap[value] || "-",
  },
  {
    Header: "Phone",
    accessor: "phoneNumber",
    Cell: ({ row }) => {
      const code = row.original.phone_code || "";
      const phone = row.original.phoneNumber || "";
      return `${code} ${phone}`;
    },
  },
  {
    Header: "Email",
    accessor: "email_address",
  },
  {
    Header: "Country",
    accessor: "country",
  },
  {
    Header: "Status",
    accessor: "status",
    Cell: ({ value }) => statusMap[value] || value,
  },
  {
    Header: "Created At",
    accessor: "created_at",
    Cell: ({ value }) => {
      if (!value) return "-";
      const date = new Date(value);
      return date.toLocaleString("en-US", {
        dateStyle: "medium",
        timeStyle: "short",
      });
    },
  },
];
