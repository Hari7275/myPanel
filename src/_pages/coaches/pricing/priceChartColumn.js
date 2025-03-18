
import { getPriceStatusLabel , getConsultantPriceCategory , getFetaureLabel } from "../../../_constants/consultantConstant";

const PriceStatusCell = ({ value }) => {
  return <span>{getPriceStatusLabel(value)}</span>;
};

const PriceCategoryCell = ({ value }) => {
  return <span>{getConsultantPriceCategory(value)}</span>;
};
const FeatureLabelCell = ({ value }) => {
  return <span>{getFetaureLabel(value)}</span>;
};

export const PRICECHARTCOLUMN = [

  {Header:"Id",
    accessor:"id",
  },
  {
    Header: "Feature",
    accessor: "feature",
    Cell: FeatureLabelCell,
  },
  {
    Header: "Category",
    accessor: "category",
    // Cell:PriceCategoryCell,
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
    Cell: PriceStatusCell,
  },
];

