export const REVIEWSCOLUMN = [
  {
    Header: "Id",
    accessor: "id",
  },

  // {
  //   Header: "Pro. Pic",
  //   Cell: ({ row }) => {
  //     const imgSrc = row?.original?.photo_url
  //       ? row?.original?.photo_url
  //       : "girl-avtar.png";
  //     return <img src={imgSrc} alt="Avatar" width="80" height="80" />;
  //   },
  // },
  {
    Header: "User Id",
    accessor: "user_id",
    Cell: ({ value }) => <span style={{ color: "#8c57ff" }}>{value}</span>,
  },

  {
    Header: "User Name",
    accessor: "first_name",
    Cell: ({ value }) => value || "N/A",
  },

  {
    Header: "Rating",
    accessor: "rating",
  },

  {
    Header: "Order Type",
    accessor: "order_type",
  },
];
