export const COMPLIMENTSCOLUMN = [
  {
    Header: "User ID",
    accessor: "user_id",
  },
  {
    Header: "Full Name",
    accessor: "fullName",
  },
  {
    Header: "Gender",
    accessor: "gender",
  },
  {
    Header: "Image",
    accessor: "profileImage",
    Cell: ({ row }) => (
      <div className="card-img">
        <img
          src={row.original.profileImage || "snake.jpg"}
          alt="Card "
          width="40"
          height="40"
          style={{ cursor: "pointer" }}
        />
      </div>
    ),
  },
  {
    Header: "Status",
    accessor: "status",
  },
];
