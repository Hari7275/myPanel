export const FOLLOWERSCOLUMN = [
  {
    Header: "Pro. Pic",
    Cell: ({ row }) => {
      const imgSrc = row?.original?.photo_url
        ? row?.original?.photo_url
        : "girl-avtar.png";
      return <img src={imgSrc} alt="Avatar" width="80" height="80" />;
    },
  },
  {
    Header: "User Id",
    accessor: "user_id",
  },

  {
    Header: "Name",
    accessor: "first_name",
    Cell: ({ value }) => value || "N/A",
  },

  {
    Header: "Age",
    accessor: "age",
    Cell: ({ value }) => value || "N/A",
  },
  // {
  //   Header: "Gender",
  //   accessor: "gender",
  //   Cell: ({ value }) => value || "N/A",
  // },
  // {
  //   Header: "Country",
  //   accessor: "country",
  //   Cell: ({ value }) => value || "N/A",
  // },
];
