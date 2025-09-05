import {
  getPriceStatusLabel,
  getFetaureLabel,
  getConsultantPriceCategory,
} from "../../../_constants/consultantConstant";

const StatusCell = ({ value }) => {
  return <span>{getPriceStatusLabel(value)}</span>;
};

const FeatureCell = ({ value }) => {
  return <span>{getFetaureLabel(value)}</span>;
};

const CategoriesCell = ({ value }) => {
  // return <span>{getConsultantPriceCategory(value)}</span>;

  console.log("value", value);
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
  },
  {
    Header: "DP",
    accessor: "discount_price",
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
