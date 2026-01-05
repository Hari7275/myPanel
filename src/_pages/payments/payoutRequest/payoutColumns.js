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
    1: `/astrologer/${value}`,
    2: `/coaches/${value}`,
    3: `/listeners/${value}`,
  };
  // Get the route based on consultant type

  const route = consultantType && navigationRoute[consultantType];

  return (
    <Link
      to={route}
      // onClick={handleConsultantClick}
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
    Header: "Total Earning",
    accessor: "lifetime_earning_in_consultant_currency",
    Cell: ({ value, row }) => {
      let currency = row.original.consultant_currency == "INR" ? "₹" : "$";

      return `${currency} ${value}`;
    },
  },

  // {
  //   Header: " Total Debit Amount (₹)",
  //   accessor: "total_debit",
  // },
  {
    Header: "Payable Amount",
    accessor: "payable_amount_in_consultant_currency",
    Cell: ({ value, row }) => {
      let currency = row.original.consultant_currency == "INR" ? "₹" : "$";

      return `${currency} ${value}`;
    },
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
