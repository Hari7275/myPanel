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
    Header: "Web views Count",
    accessor: "web_views",
  },
  {
    Header: "mobile views Count",
    accessor: "mobile_views",
  },
  {
    Header: "total Count",
    accessor: "total",
  },
];
