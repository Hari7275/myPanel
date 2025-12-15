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
    Header: "Consultant Type",
    accessor: "consultant_type",
    Cell: ({ value }) => {
      const typeMap = {
        1: "Astrologer",
        2: "Coach",
        3: "Listener",
      };

      return typeMap[value] || "Unknown";
    },
  },
  {
    Header: "Image",
    Cell: ({ row }) => (
      <img src={row.original.image_url} alt="Avatar" width="80" height="80" />
    ),
  },
  // {
  //   Header: "Commission",
  //   accessor: "commission",
  // },
  {
    Header: "Status",
    accessor: "is_active",
    Cell: ({ value }) => statusValue(value),
  },
];

const statusValue = (value) => {
  return value ? "Active" : "Inactive";
};

export const PARTICULARGIFTPRICECOLUMN = [
  {
    Header: "Id",
    accessor: "id",
  },
  {
    Header: "Gift Id",
    accessor: "gift_id",
  },
  {
    Header: "User Category",
    accessor: "user_category",
  },
  {
    Header: "Price",
    accessor: "price",
    Cell: ({ row }) => {
      const currency = row?.original?.currency === "USD" ? "$ " : "₹ ";
      const price = row?.original?.price;

      return (
        <span>
          {currency}
          {price}
        </span>
      );
    },
  },
];
