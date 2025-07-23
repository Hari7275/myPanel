export const BLOGCOUNTCOLUMNS = [
  {
    Header: "Id",
    accessor: (row) => {
      console.log("Row Data:", row); // 👈 Log row here
      return row.index || "NIL";
    },
  },
  //   {
  //     Header: "Blog Id",
  //     accessor: "blog_id",
  //   },
  {
    Header: "Title",
    accessor: "title",
  },

  {
    Header: "Web Count",
    accessor: "web_views",
  },
  {
    Header: "Mobile Count",
    accessor: "mobile_views",
  },
  {
    Header: "Total Count",
    accessor: "total",
  },
];
