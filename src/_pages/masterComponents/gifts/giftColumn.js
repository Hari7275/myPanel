export const GIFTCOLUMN = [
  {
    Header: "Id",
    accessor: "id",
  },
  {
    Header: "Name",
    accessor: "name",
  },
  {
    Header: "Price",
    accessor: "price",
    Cell: ({ row }) => {
      const currency = row?.original?.currency === "USD" ? "$" : "₹";
      const price = row?.original?.price;
      return (
        <span>
          {currency}
          {price}
        </span>
      );
    },
  },
  {
    Header: "Image",
    Cell: ({ row }) => (
      <img src={row.original.image_url} alt="Avatar" width="80" height="80" />
    ),
  },
  {
    Header: "Commission",
    accessor: "commission",
  },
  {
    Header: "Status",
    accessor: "is_active",
    Cell: ({ value }) => statusValue(value),
  },
];

const statusValue = (value) => {
  return value ? "Active" : "Inactive";
};
