 

export const FEEDBACKCOLUMNS = [
  {
    Header: "User Id",
    accessor: "user_id",
  },
  {
    Header: "Name",
    accessor: (row) => row.fullName || "NIL",
  },

  {
    Header: "Age",
    accessor: (row) => row.age || "NIL",
  },
  {
    Header: "Rating",
    accessor: "rating",
  },
];
