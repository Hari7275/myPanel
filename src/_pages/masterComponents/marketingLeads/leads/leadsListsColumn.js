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
    Header: "Platform",
    accessor: "platform",
  },
  {
    Header: "Status",
    accessor: "status",
    Cell: ({ value }) => {
      const statusMap = {
        0: { text: "Unassigned", color: "#ad2727ff" },
        1: { text: "Pending", color: "orange" },
        2: { text: "Verified", color: "green" },
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
    Header: "Platform",
    accessor: "platform",
  },
  {
    Header: "Status",
    accessor: "status",
    Cell: ({ value }) => {
      const statusMap = {
        0: { text: "Unassigned", color: "#ad2727ff" },
        1: { text: "Pending", color: "orange" },
        2: { text: "Verified", color: "green" },
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
