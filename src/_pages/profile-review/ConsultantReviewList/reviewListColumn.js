import "../../../cssfolder/column.css";

export const REVIEWLISTCOLUMN = [
  {
    Header: " Id",
    accessor: "id",
  },
  {
    Header: "Consultant Id",
    accessor: "consultant_id",
  },
  {
    Header: "Consultant type",
    accessor: "ConsultantProfile.consultant_type",
    Cell: ({ value }) => {
      const types = {
        1: "Astrologer",
        2: "Coach",
        3: "Listener",
      };
      return types[value] || value;
    },
  },

  {
    Header: "Name",
    accessor: "ConsultantProfile.first_name",
  },
  {
    Header: "Email",
    accessor: "ConsultantProfile.email",
  },

  {
    Header: "Status",
    accessor: "status",
  },
];
