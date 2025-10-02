import { format } from "date-fns";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCurrentConsultant } from "../../../_store/slices/consultantSlice";
import { formatDateTime } from "../../../_constants/formatedDate";

const statusMap = {
  1: "Pending",
  2: "Success",
  3: "Rejected",
};

const ConsultantNavigationCell = ({ value, row }) => {
  // Get consultant_type from the row data.
  const consultantName = row?.original?.first_name;

  const consultantType = row?.original?.consultant_type;
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

  const route =
    consultantType && navigationRoute[consultantType]
      ? `${navigationRoute[consultantType]}?${value}`
      : "";
  return (
    <Link
      to={route}
      onClick={handleConsultantClick}
      style={{ textDecoration: "none" }}
    >
      <span style={{ cursor: "pointer", color: "#be5b18ff" }}>
        {consultantName} ({value})
      </span>
    </Link>
  );
};

export const PAYABLECOLUMN = [
  {
    Header: "Id",
    Cell: ({ row }) => row.index + 1,
  },

  {
    Header: "Consultant Id",
    accessor: "consultant_id",
    Cell: ConsultantNavigationCell,
  },

  {
    Header: "Total Earning (₹)",
    accessor: "total_credit",
  },

  {
    Header: " Total Debit Amount (₹)",
    accessor: "total_debit",
  },
  {
    Header: "Payable Amount (₹)",
    accessor: "remaining_amount",
  },
];

// payout section

export const PAYOUTCOLUMN = [
  {
    Header: "Id",
    accessor: "id",
  },

  {
    Header: "Consultant Id",
    accessor: "consultant_id",
  },

  // {
  //   Header: "Transaction Id",
  //   accessor: "transaction_id",
  // },

  {
    Header: "Amount",
    accessor: "amount",
  },
  // {
  //   Header: "Payment Method",
  //   accessor: "payment_method",
  // },
  {
    Header: "Amount After Tax",
    accessor: "amount_after_tax",
  },

  {
    Header: "Created Time",
    accessor: "createdAt",
    Cell: ({ value }) => formatDateTime(value),
  },
  {
    Header: "Updated Time",
    accessor: "updatedAt",
    Cell: ({ value }) => formatDateTime(value),
  },

  {
    Header: "Status",
    accessor: "status",
    Cell: ({ value }) => {
      const status = statusMap[value] || "Unknown";

      const colorMap = {
        Pending: "orange",
        Success: "green",
        Rejected: "red",
        Unknown: "gray",
      };

      return (
        <span style={{ color: colorMap[status] || "black" }}>{status}</span>
      );
    },
  },
];
