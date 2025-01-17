export const REVIEWSCOLUMN = [
  {
    Header: "Sr.No",
    accessor: "id",
  },
  {
    Header: "User Id",
    accessor: "user_id",
    Cell: ({ value }) => <span style={{ color: "#8c57ff" }}>{value}</span>,
  },

  {
    Header: "Rating",
    accessor: "rating",
  },
  {
    Header: "Review Text",
    accessor: "review_text",
  },
];
