// import "../../../cssfolder/column.css";

// const CustomUserType = ({ value }) => {
//   return <span className="orderId-color">{value}</span>;
// };

export const UNTRACKEDUSER_COLUMNS = [
  {
    Header: "Id",
    accessor: "id",
  },

  {
    Header: "Device Name",
    accessor: "device_name",
    Cell: ({ value }) => (
      <span
        style={{
          display: "inline-block",
          maxWidth: "150px",
          overflow: "hidden",
          textOverflow: "ellipsis",
          // whiteSpace: "nowrap",
        }}
      >
        {value}
      </span>
    ),
  },
  {
    Header: "Device Version",
    accessor: "device_version",
  },
  {
    Header: "Platform",
    accessor: "platform",
  },
  {
    Header: "Ip Address",
    accessor: "ip_address",
  },
  {
    Header: "Device Id",
    accessor: "device_id",
  },

  {
    Header: "Created Date",
    accessor: "created_at",
    Cell: ({ value }) => {
      const date = new Date(value);
      return date.toLocaleString("en-US", {
        dateStyle: "medium",
        timeStyle: "short",
      });
    },
  },
];
