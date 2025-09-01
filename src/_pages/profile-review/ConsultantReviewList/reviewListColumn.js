import "../../../cssfolder/column.css";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCurrentConsultant } from "../../../_store/slices/consultantSlice";

const ConsultantNavigationCell = ({ value, row }) => {
  // Get consultant_type from the row data
  const consultantType = row?.original?.ConsultantProfile?.consultant_type;
  const dispatch = useDispatch();
  const handleConsultantClick = () => {
    dispatch(setCurrentConsultant(value));
  };

  const navigationRoute = {
    1: "/astrologer_Profile",
    2: "/coach-profile",
    3: "/listener_Profile",
  };
  // Get the route based on consultant type
  // Get the route based on consultant type
  const route =
    consultantType && navigationRoute[consultantType]
      ? `${navigationRoute[consultantType]}?${value}`
      : "/";
  return (
    <Link
      to={route}
      onClick={handleConsultantClick}
      style={{ textDecoration: "none" }}
    >
      <span style={{ cursor: "pointer", color: "#be5b18ff" }}>{value}</span>
    </Link>
  );
};

export const REVIEWLISTCOLUMN = [
  {
    Header: " Id",
    accessor: "id",
  },
  {
    Header: "Consultant Id",
    accessor: "consultant_id",
    Cell: ConsultantNavigationCell,
  },
  {
    Header: "Consultant type",
    accessor: "ConsultantProfile.consultant_type",
    Cell: ({ value }) => {
      const types = {
        1: "Astrologer",
        2: "Coach",
        3: "Listener",
      };
      return types[value] || value;
    },
  },

  {
    Header: "Name",
    accessor: "ConsultantProfile.first_name",
  },
  // {
  //   Header: "Email",
  //   accessor: "ConsultantProfile.email",
  // },

  {
    Header: "Status",
    accessor: "status",
  },
];
