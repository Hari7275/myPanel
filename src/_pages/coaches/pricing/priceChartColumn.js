import {
  getPriceStatusLabel,
  getConsultantPriceCategory,
  getFetaureLabel,
} from "../../../_constants/consultantConstant";

import { useLocation } from "react-router-dom";

const CurrencyLabel = ({ value }) => {
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const consultantCateg = params.get("type");

  const currencySymbol = consultantCateg == 91 ? "₹" : "$";

  return <span>{`${currencySymbol}${value}`}</span>;
};

const PriceStatusCell = ({ value }) => {
  return <span>{getPriceStatusLabel(value)}</span>;
};

const PriceCategoryCell = ({ value }) => {
  // return <span>{getConsultantPriceCategory(value)}</span>;
  return <span>{value == "A" ? "India" : "Foreign"}</span>;
};
const FeatureLabelCell = ({ value }) => {
  return (
    <span style={{ display: "block", width: "100px" }}>
      {getFetaureLabel(value)}
    </span>
  );
};

export const PRICECHARTCOLUMN = [
  { Header: "Id", accessor: "id" },
  {
    Header: "Feature",
    accessor: "feature",
    Cell: FeatureLabelCell,
  },
  {
    Header: "User Catg.",
    accessor: "category",
    Cell: PriceCategoryCell,
  },
  {
    Header: "CP",
    accessor: "current_price",
    Cell: CurrencyLabel,
  },
  {
    Header: "DP",
    accessor: "discount_price",
    Cell: CurrencyLabel,
  },
  {
    Header: "Comm.",
    accessor: "commission",
  },
  {
    Header: "Status",
    accessor: "status",
    Cell: PriceStatusCell,
  },
];
