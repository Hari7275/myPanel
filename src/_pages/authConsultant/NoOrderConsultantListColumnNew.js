import { Link } from "react-router-dom";
import { ExternalLink } from "lucide-react";

const consultantTypeMap = {
  1: { label: "Astrologer", color: "#7c3aed", bg: "#f3e8ff" },
  2: { label: "Coach", color: "#2563eb", bg: "#dbeafe" },
  3: { label: "Listener", color: "#059669", bg: "#d1fae5" },
};

const genderMap = {
  1: "Male",
  2: "Female",
  3: "Other",
};

const statusMap = {
  1: { label: "Inactive", color: "#6b7280", bg: "#f3f4f6" },
  2: { label: "Verification Pending", color: "#d97706", bg: "#fef3c7" },
  3: { label: "Active", color: "#059669", bg: "#d1fae5" },
  5: { label: "Blocked", color: "#dc2626", bg: "#fee2e2" },
  6: { label: "Verification Rejected", color: "#dc2626", bg: "#fee2e2" },
  7: { label: "Account Deleted", color: "#6b7280", bg: "#f3f4f6" },
  8: { label: "Inactive", color: "#6b7280", bg: "#f3f4f6" },
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
                <span
                  style={{
                    fontWeight: 600,
                    color: "#2563eb",
                    fontSize: "13.5px",
                    cursor: "pointer",
                  }}
                >
                  {value || `${firstName} ${lastName}`}
                </span>
                <ExternalLink size={13} color="#2563eb" style={{ flexShrink: 0 }} />
              </Link>
            ) : (
              <span style={{ fontWeight: 600, color: "#1e293b", fontSize: "13.5px" }}>
                {value || `${firstName} ${lastName}`}
              </span>
            )}
            <span style={{ fontSize: "12px", color: "#64748b" }}>ID: {id}</span>
        </div>
      );
    },
  },
  {
    Header: "Type",
    accessor: "consultant_type",
    Cell: ({ value }) => {
      const info = consultantTypeMap[value];
      if (!info) return value;
      return (
        <span
          style={{
            padding: "4px 12px",
            borderRadius: "20px",
            fontSize: "12px",
            fontWeight: 600,
            color: info.color,
            backgroundColor: info.bg,
            whiteSpace: "nowrap",
          }}
        >
          {info.label}
        </span>
      );
    },
  },
  {
    Header: "Gender",
    accessor: "gender",
    Cell: ({ value }) => (
      <span style={{ color: "#475569", fontSize: "13px" }}>
        {genderMap[value] || "-"}
      </span>
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
          <span style={{ fontSize: "13px", color: "#1e293b", fontWeight: 500 }}>
            {code} {phone}
          </span>
          <span
            style={{
              fontSize: "12px",
              color: "#64748b",
              maxWidth: "180px",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {email || "-"}
          </span>
        </div>
      );
    },
  },
  {
    Header: "Country",
    accessor: "country",
    Cell: ({ value }) => (
      <span style={{ color: "#475569", fontSize: "13px" }}>{value || "-"}</span>
    ),
  },
  {
    Header: "Status",
    accessor: "status",
    Cell: ({ value }) => {
      const info = statusMap[value];
      if (!info) return value;
      return (
        <span
          style={{
            padding: "4px 12px",
            borderRadius: "20px",
            fontSize: "12px",
            fontWeight: 600,
            color: info.color,
            backgroundColor: info.bg,
            display: "inline-flex",
            alignItems: "center",
            gap: "5px",
            whiteSpace: "nowrap",
          }}
        >
          <span
            style={{
              width: "6px",
              height: "6px",
              borderRadius: "50%",
              backgroundColor: info.color,
              display: "inline-block",
            }}
          />
          {info.label}
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
          <span style={{ fontSize: "13px", color: "#1e293b", fontWeight: 500 }}>
            {date.toLocaleDateString("en-US", { day: "numeric", month: "short", year: "numeric" })}
          </span>
          <span style={{ fontSize: "12px", color: "#64748b" }}>
            {date.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })}
          </span>
        </div>
      );
    },
  },
];
