import { format } from "date-fns";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCurrentConsultant } from "../../../_store/slices/consultantSlice";

// coach reviews columns

export const REVIEWSCOLUMN = [
  {
    Header: "Sr.No",
    accessor: "id",
  },
  {
    Header: "User Id",
    accessor: "user_id",
    Cell: ({ value }) => (
      <span style={{ color: "#8c57ff" }}>
        <Link to={`/users_Profile/${value}`}> {value} </Link>
      </span>
    ),
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
