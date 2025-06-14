export const ACCOUNTCOLUMNS = [
  { Header: "Id", accessor: "id" },
  { Header: "Holder Name", accessor: "account_holder_name" },
  {
    Header: "Passbook Photo",
    accessor: "passbook_photo",
    Cell: ({ row }) => (
      <div className="card-img">
        <img
          src={row.original.passbook_photo || "snake.jpg"}
          alt="passbook photo"
          width="40"
          height="40"
          style={{ cursor: "pointer" }}
        />
      </div>
    ),
  },
  {
    Header: "Pan Card ",
    accessor: "pancard_photo",
    Cell: ({ row }) => (
      <div className="card-img">
        <img
          src={row?.original?.pancard_photo || "snake.jpg"}
          alt="passbook photo"
          width="40"
          height="40"
          style={{ cursor: "pointer" }}
        />
      </div>
    ),
  },
  {
    Header: "Status",
    accessor: "status",
    Cell: ({ value }) => {
      const captalizeStatus = value.charAt(0).toUpperCase() + value.slice(1);
      return <span>{captalizeStatus}</span>;
    },
  },
];

// *******************************************PAYPALCOLUMNS ******************
export const PAYPALCOLUMNS = [
  { Header: "Id", accessor: "id" },
  { Header: "PayPal ID ", accessor: "paypal_id" },

  {
    Header: "Status",
    accessor: "status",
    Cell: ({ value }) => {
      const captalizeStatus = value.charAt(0).toUpperCase() + value.slice(1);
      return <span>{captalizeStatus}</span>;
    },
  },
];
