import React, { useMemo, useState, useEffect } from "react";
import { Pencil, NotebookPen } from "lucide-react";
import CommonTable from "../../../_components/table/CommonTable";
import { PRICECHARTCOLUMN } from "./priceChartColumn";
import { useGetConsultantsPriceQuery } from "../../../_store/api";
import { useSelector } from "react-redux";
import EditPriceStatus from "../../../_components/reuseComponents/EditPriceStatus";
import EditconsultantPrice from "../../../_components/reuseComponents/EditconsultantPrice";

const CoachPriceListingTable = () => {
  const [data, setData] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);
  const [showEditStatus, setShowEditStatus] = useState(false);
  const [showConsultantEditPrice, setShowConsultantPrice] = useState(false);

  const consultantId = useSelector(
    (state) => state?.consultant?.consultantData
  );
  const {
    data: fetchData,
    isLoading,
    isError,
  } = useGetConsultantsPriceQuery(consultantId);

  useEffect(() => {
    if (fetchData && fetchData?.data) {
      setData(fetchData?.data || []);
    } else setData([]);
  }, [fetchData]);

  const toggleUpdateStatus = (row) => {
    setSelectedRow(row);
    setShowEditStatus(!showEditStatus);
  };

  const toggleUpdateConsultantPrice = (row) => {
    setSelectedRow(row);
    setShowConsultantPrice(!showConsultantEditPrice);
  };

  const columns = useMemo(() => [
    ...PRICECHARTCOLUMN,
    {
      Header: () => <div className="actions-header">Actions</div>,
      id: "actions",
      Cell: ({ row }) => (
        <div className="actions-cell">
          {row.original.status === 1 && (
            <span
              className="editIcon"
              onClick={() => toggleUpdateStatus(row?.original)}
            >
              <NotebookPen className="iconSmall" />
            </span>
          )}

          {row.original.status == 2 && (
            <span
              className="editIcon"
              onClick={() => toggleUpdateConsultantPrice(row?.original)}
            >
              <Pencil className="iconSmall" />
            </span>
          )}
        </div>
      ),
    },
  ]);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading data.</div>;

  return (
    <div>
      <CommonTable
        columns={columns}
        data={data}
        includeCheckbox={false}
        tableTitle=" Price Chart"
      />
      {showEditStatus && (
        <EditPriceStatus
          isOpen={showEditStatus}
          onClose={toggleUpdateStatus}
          selectedRow={selectedRow}
        />
      )}

      {showConsultantEditPrice && (
        <EditconsultantPrice
          isOpen={showConsultantEditPrice}
          onClose={toggleUpdateConsultantPrice}
          selectedRow={selectedRow}
        />
      )}
    </div>
  );
};

export default CoachPriceListingTable;
