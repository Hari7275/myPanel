import { getFetaureLabel } from "../../../_constants/consultantConstant";

const FeatureCostCell = ({ row }) => {
  const { priceData } = row.original;

  if (!priceData || priceData.length === 0) return "N/A";

  return (
    <span>
      {priceData.map((item, index) => (
        <span key={index}>
          {getFetaureLabel(item?.feature)} ({item?.totalCost})
          {index !== priceData.length - 1 && <br />}
        </span>
      ))}
    </span>
  );
};

export const SESSIONSLOTCOLUMN = [
  { Header: "Id", accessor: "id" },
  {
    Header: "Feature (Cost)",
    accessor: "priceData",
    Cell: FeatureCostCell,
  },
  {
    Header: "Duration (min)",
    accessor: "duration",
  },
  {
    Header: "Date",
    accessor: "date",
  },
  {
    Header: "Status",
    accessor: "status",
  },
];
