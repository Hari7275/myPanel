export const LEADLISTCOLUMN = [
  {
    Header: "Id",
    accessor: "id",
  },

  {
    Header: "Phone number",
    accessor: "phone",
  },

  {
    Header: "Email",
    accessor: "email",
  },
  {
    Header: "Name",
    accessor: "full_name",
  },
  {
    Header: "Gender",
    accessor: "gender",
  },
  {
    Header: "Country",
    accessor: "country",
  },
  {
    Header: "PT.",
    accessor: "platform",
  },
  {
    Header: "Contact Method",
    accessor: "how_to_connect",
    Cell: ({ value }) => (
      <span style={{ width: "200px", display: "inline-block" }}>{value}</span>
    ),
  },
  // {
  //   Header: "Url",
  //   accessor: "inbox_url",
  //   Cell: ({ value }) => {
  //     if (!value) return "N/A";
  //     return (
  //       <a
  //         href={value}
  //         target="_blank"
  //         rel="noopener noreferrer"
  //         style={{ color: "blue", textDecoration: "underline" }}
  //       >
  //         Open Link
  //       </a>
  //     );
  //   },
  // },

  {
    Header: "Status",
    accessor: "status",
    Cell: ({ value }) => {
      const statusMap = {
        0: { text: "Unassigned", color: "#876363ff" },
        1: { text: "Pending", color: "orange" },
        2: { text: "Registered", color: "green" },
        3: { text: "Not Interested", color: "red" },
        4: { text: "Already Contacted", color: "blue" },
      };
      const status = statusMap[value] || { text: "Unknown", color: "black" };
      return <span style={{ color: status.color }}>{status.text}</span>;
    },
  },
  {
    Header: "Time",
    accessor: "created_time",
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
    Header: "Assg To",
    accessor: "assign_to_name",
  },
  {
    Header: "Assg By",
    accessor: "assigned_by_name",
  },
];

// ASSIGMNED MARKETING LEADS TO  PARTICULAR ADMIN

export const ASSIGNEDMARKETINGLEADSTOADMINCOLUMNS = [
  {
    Header: "Id",
    accessor: "id",
  },
  {
    Header: "Name",
    accessor: "full_name",
  },

  {
    Header: "Email",
    accessor: "email",
  },

  {
    Header: "Phone No.",
    accessor: "phone",
  },

  {
    Header: "Gender",
    accessor: "gender",
  },
  {
    Header: "Country",
    accessor: "country",
  },
  {
    Header: "PT.",
    accessor: "platform",
  },
  {
    Header: "Contact Method",
    accessor: "how_to_connect",
    Cell: ({ value }) => (
      <span style={{ width: "200px", display: "inline-block" }}>{value}</span>
    ),
  },
  {
    Header: "Status",
    accessor: "status",
    Cell: ({ value }) => {
      const statusMap = {
        0: { text: "Unassigned", color: "#ad2727ff" },
        1: { text: "Pending", color: "orange" },
        2: { text: "Registered", color: "green" },
        3: { text: "Not Interested", color: "red" },
        4: { text: "Already Contacted", color: "blue" },
      };
      const status = statusMap[value] || { text: "Unknown", color: "black" };
      return <span style={{ color: status.color }}>{status.text}</span>;
    },
  },
  {
    Header: "Time",
    accessor: "created_time",
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
    Header: "Assigned To",
    accessor: "assign_to_name",
  },
  {
    Header: "Assigned By",
    accessor: "assigned_by_name",
  },
];
