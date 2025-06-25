import {
  getPriceStatusLabel,
  getConsultantPriceCategory,
  getFetaureLabel,
} from "../../../_constants/consultantConstant";

const PriceStatusCell = ({ value }) => {
  return <span>{getPriceStatusLabel(value)}</span>;
};

const PriceCategoryCell = ({ value }) => {
  return <span>{getConsultantPriceCategory(value)}</span>;
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
    Cell: PriceStatusCell,
  },
];
