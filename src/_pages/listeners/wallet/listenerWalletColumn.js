import { getCategoryTypes } from "../../../_constants/consultantConstant";
import { formatDateTime } from "../../../_constants/formatedDate";
import { useLocation } from "react-router-dom";

const CurrencyLabel = ({ value }) => {
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const consultantCateg = params.get("type");
  const currencyCateg = params.get("currency_category");

  // const currencySymbol = consultantCateg == 91 ? "₹" : "$";
  const currencySymbol = currencyCateg == "A" ? "₹" : "$";

  return <span>{`${currencySymbol}${value}`}</span>;
};

export const WALLETCHARTCOLUMN = [
  {
    Header: " Id",
    accessor: "id",
    Cell: ({ value }) => <span style={{ color: "#8c57ff" }}>{value}</span>,
  },
  {
    Header: "Order Id",
    accessor: "order_id",
  },
  {
    Header: "Duration (min)",
    accessor: "duration",
  },
  // {
  //   Header: "Order Type",
  //   accessor: "service_type",
  //   Cell: ({ value }) => getCategoryTypes(value) || "N/A",
  // },
  {
    Header: "Order Type",
    accessor: "display_text",
  },
  {
    Header: "Transaction Type",
    accessor: "transaction_type",
  },
  {
    Header: "Amount",
    accessor: "amount_in_consultant_currency",
    Cell: CurrencyLabel, // <-- FIXED
  },
  {
    Header: " Balance",
    accessor: "remaining_balance_in_consultant_currency",
    Cell: CurrencyLabel, // <-- FIXED
  },
  {
    Header: "Date",
    accessor: "createdAt",
    Cell: ({ value }) => formatDateTime(value),
  },
];
