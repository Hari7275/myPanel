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
    Header: "Category",
    accessor: "category",
    // Cell: CategoriesCell,
  },
  {
    Header: "Current Price",
    accessor: "current_price",
  },
  {
    Header: "Discount Price",
    accessor: "discount_price",
  },
  {
    Header: "Commission",
    accessor: "commission",
  },
  {
    Header: "Status",
    accessor: "status",
    Cell: StatusCell,
  },
];
