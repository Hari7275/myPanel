export const FOLLOWERSCOLUMN = [
  {
    Header: "User Id",
    accessor: "user_id",
  },

  {
    Header: "Name",
    accessor: "fullName",
    Cell: ({ value }) => value || "N/A",
  },

  {
    Header: "Age",
    accessor: "age",
    Cell: ({ value }) => value || "N/A",
  },
  {
    Header: "Gender",
    accessor: "gender",
    Cell: ({ value }) => value || "N/A",
  },
  {
    Header: "Country",
    accessor: "country",
    Cell: ({ value }) => value || "N/A",
  },
  {
    Header: "Image",
    Cell: ({ row }) => {
      const imgSrc = row.original.img ? row.original.img : "girl-avtar.png";
      return <img src={imgSrc} alt="Avatar" width="80" height="80" />;
    },
  },
];
