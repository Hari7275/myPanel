import { ImageCell } from "../../listeners/bankAccount/accountColumn";

export const ACCOUNTCOLUMNS = [
  { Header: "Id", accessor: "id" },
  { Header: "Holder Name", accessor: "account_holder_name" },
  {
    Header: "Passbook Photo",
    Cell: ({ row }) => <ImageCell imageSrc={row.original.passbook_photo} />,
  },
  {
    Header: "Pan Card ",
    Cell: ({ row }) => <ImageCell imageSrc={row.original.pancard_photo} />,
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
