import {
  getPriceStatusLabel,
  getFetaureLabel,
  getConsultantPriceCategory,
} from "../../../../_constants/consultantConstant";

import { useLocation } from "react-router-dom";

const CurrencyLabel = ({ value, row }) => {
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const consultantCateg = params.get("type");

  const currencySymbol = row?.original?.base_currency == "INR" ? "₹ " : "$ ";
  // const currencySymbol = consultantCateg == 91 ? "₹" : "$";
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

  return (
    <span>
      {value == "A" ? "India" : "Foreign"} ({value})
    </span>
  );
};

export const PRICECHANGECOLUMN = [
  { Header: "id", accessor: "id" },
  {
    Header: "Feature",
    accessor: "service_type",
    Cell: FeatureCell,
  },
  //   {
  //     Header: "User Catg.",
  //     accessor: "user_category",
  //     // Cell: CategoriesCell,
  //   },
  {
    Header: "CP",
    accessor: "base_price_per_minute",
    Cell: CurrencyLabel,
  },
  //   {
  //     Header: "DP",
  //     accessor: "discount_price",
  //     Cell: CurrencyLabel,
  //   },
  {
    Header: "Flute Comm.(%)",
    accessor: "base_commission",
  },
  // {
  //   Header: "Status",
  //   accessor: "status",
  //   Cell: StatusCell,
  // },
];
