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
