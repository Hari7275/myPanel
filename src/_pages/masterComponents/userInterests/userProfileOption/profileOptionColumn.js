export const USERINTERESTCOLUMN = [
  {
    Header:"SR. NO.",
    accessor:"id"
  },
  
  {
    Header: "Feature Name",
    accessor: "profile_value",
  },
  {

    Header:"Image",
    accessor:"image",
    Cell:({row})=>(
      <div className="card-img">
        <img src={row.original.image || "snake.jpg"}
        alt="Card Image"
        width="40"
        height="40"
        />
      </div>
    )
  },

  {
    Header: "Feature key",
    accessor: "profile_feature",
  },
];
