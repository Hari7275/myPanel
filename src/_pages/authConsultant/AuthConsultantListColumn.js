// import "../../../cssfolder/column.css";

const CustomUserType = ({ value }) => {
  return <span className="orderId-color">{value}</span>;
};

export const CONSULTANT_COLUMNS = [
  {
    Header: "Id",
    accessor: "id",
  },

  {
    Header: "Email",
    accessor: "email_address",
  },
  {
    Header: "Phone Code",
    accessor: "phone_code",
  },
  {
    Header: "Country Code",
    accessor: "country_code",
  },

  {
    Header: "Phone No.",
    accessor: "phone_number",
    Cell: CustomUserType,
  },

  {
    Header: "Last Modified",
    accessor: "created_at",
    Cell: ({ value }) => {
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
