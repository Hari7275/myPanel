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
  return <span>{getConsultantPriceCategory(value)}</span>;
};

export const PRICECHARTCOLUMN = [
  {
    Header: "Feature",
    accessor: "feature",
    Cell: FeatureCell,
  },
  {
    Header: "Catg.",
    accessor: "category",
    // Cell:PriceCategoryCell,
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
