import {
  getPriceStatusLabel,
  getFetaureLabel,
  getConsultantPriceCategory,
} from "../../../_constants/consultantConstant";

import { useLocation } from "react-router-dom";

const CurrencyLabel = ({ value }) => {
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const consultantCateg = params.get("type");

  const currencySymbol = consultantCateg == 91 ? "₹" : "$";

  return <span>{`${currencySymbol}${value}`}</span>;
};

const StatusCell = ({ value }) => {
  return <span>{getPriceStatusLabel(value)}</span>;
};

const FeatureCell = ({ value }) => {
  return <span>{getFetaureLabel(value)}</span>;
};

const CategoriesCell = ({ value }) => {
  // return <span>{getConsultantPriceCategory(value)}</span>;

  return <span>{value == "A" ? "India" : "Foreign"}</span>;
};

export const PRICECHARTCOLUMN = [
  // { Header: "id", accessor: "id" },
  {
    Header: "Feature",
    accessor: "feature",
    Cell: FeatureCell,
  },
  {
    Header: "User Catg.",
    accessor: "category",
    Cell: CategoriesCell,
  },
  {
    Header: "CP",
    accessor: "current_price",
    // Cell: CurrencyLabel,
  },
  {
    Header: "DP",
    accessor: "discount_price",
    // Cell: CurrencyLabel,
  },
  {
    Header: "Comm.",
    accessor: "commission",
  },
  {
    Header: "Status",
    accessor: "status",
    Cell: StatusCell,
  },
];
