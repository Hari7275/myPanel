import { Link } from "react-router-dom";

const handleViewBlog = ({ value, row }) => {
  console.log(".....", row.original.blog_id);
  const navigationRoute = `https://fluteconnect.com/magazine/${row.original.blog_id}`;

  return (
    <a href={navigationRoute} target="blank" style={{ color: "#a84444ff" }}>
      {value}
    </a>
  );
};

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
    Cell: handleViewBlog,
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
