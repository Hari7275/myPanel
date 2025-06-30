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

export const COMMISSIONCOLUMN = [
  { Header: "Id", accessor: "id" },

  {
    Header: "Feature",
    accessor: "service_type",
    Cell: FeatureLabelCell,
  },

  //   {
  //     Header: "DP",
  //     accessor: "discount_price",
  //   },
  {
    Header: "Commission(%)",
    accessor: "commission_rate",
  },
  {
    Header: "Date",
    accessor: "updated_at",
    Cell: ({ value }) => {
      const date = new Date(value);
      return date.toLocaleString("en-US", {
        dateStyle: "medium",
        timeStyle: "short",
      });
    },
  },
];
