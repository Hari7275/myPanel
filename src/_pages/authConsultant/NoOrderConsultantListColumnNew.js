import { Link } from "react-router-dom";
import { ExternalLink } from "lucide-react";

const consultantTypeClassMap = {
  1: "noc-badge-astrologer",
  2: "noc-badge-coach",
  3: "noc-badge-listener",
};

const consultantTypeLabelMap = {
  1: "Astrologer",
  2: "Coach",
  3: "Listener",
};

const statusClassMap = {
  1: "noc-badge-inactive",
  2: "noc-badge-pending",
  3: "noc-badge-active",
  5: "noc-badge-blocked",
  6: "noc-badge-rejected",
  7: "noc-badge-deleted",
  8: "noc-badge-inactive",
};

const statusLabelMap = {
  1: "Inactive",
  2: "Verification Pending",
  3: "Active",
  5: "Blocked",
  6: "Verification Rejected",
  7: "Account Deleted",
  8: "Inactive",
};

const genderMap = {
  1: "Male",
  2: "Female",
  3: "Other",
};

export const NO_ORDER_CONSULTANT_COLUMNS_NEW = [
  {
    Header: "Consultant",
    accessor: "display_name",
    Cell: ({ value, row }) => {
      const type = row.original.consultant_type;
      const id = row.original.id;
      const firstName = row.original.first_name || "";
      const lastName = row.original.last_name || "";
      const routeMap = {
        1: `/astrologer/${id}`,
        2: `/coaches/${id}`,
        3: `/listeners/${id}`,
      };
      const route = routeMap[type];

      return (
        <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
          {route ? (
            <Link
              to={`${route}?status=3`}
              target="_blank"
              rel="noopener noreferrer"
              className="noc-consultant-link"
            >
              <span className="noc-name-link-text">
                {value || `${firstName} ${lastName}`}
              </span>
              <ExternalLink size={13} style={{ flexShrink: 0 }} />
            </Link>
          ) : (
            <span className="noc-name-link-text">
              {value || `${firstName} ${lastName}`}
            </span>
          )}
          <span className="noc-id-text">ID: {id}</span>
        </div>
      );
    },
  },
  {
    Header: "Type",
    accessor: "consultant_type",
    Cell: ({ value }) => {
      const cls = consultantTypeClassMap[value];
      const label = consultantTypeLabelMap[value];
      if (!cls) return value;
      return (
        <span className={`noc-badge ${cls}`}>
          {label}
        </span>
      );
    },
  },
  {
    Header: "Gender",
    accessor: "gender",
    Cell: ({ value }) => (
      <span className="noc-secondary-text">{genderMap[value] || "-"}</span>
    ),
  },
  {
    Header: "Contact",
    accessor: "phoneNumber",
    Cell: ({ row }) => {
      const code = row.original.phone_code || "";
      const phone = row.original.phoneNumber || "";
      const email = row.original.email_address || "";
      return (
        <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
          <span className="noc-phone-text">{code} {phone}</span>
          <span className="noc-email-text">{email || "-"}</span>
        </div>
      );
    },
  },
  {
    Header: "Country",
    accessor: "country",
    Cell: ({ value }) => (
      <span className="noc-secondary-text">{value || "-"}</span>
    ),
  },
  {
    Header: "Status",
    accessor: "status",
    Cell: ({ value }) => {
      const cls = statusClassMap[value];
      const label = statusLabelMap[value];
      if (!cls) return value;
      return (
        <span className={`noc-badge ${cls}`}>
          <span className="noc-badge-dot" />
          {label}
        </span>
      );
    },
  },
  {
    Header: "Created At",
    accessor: "created_at",
    Cell: ({ value }) => {
      if (!value) return "-";
      const date = new Date(value);
      return (
        <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
          <span className="noc-date-primary">
            {date.toLocaleDateString("en-US", { day: "numeric", month: "short", year: "numeric" })}
          </span>
          <span className="noc-date-secondary">
            {date.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })}
          </span>
        </div>
      );
    },
  },
];
