import React, { useMemo, useState, useEffect } from "react";
import CommonTable from "../../../_components/table/CommonTable";
 import { Pencil } from "lucide-react";
import { PRICECHARTCOLUMN } from "./priceChartColumn";
import { useGetConsultantsPriceQuery } from "../../../_store/api";
import { useSelector } from "react-redux";
import EditPriceStatus from "../../../_components/reuseComponents/EditPriceStatus";


const AstrologerPriceListingTable = () => {
  const [data, setData] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);
  const [showEditStatus, setShowEditStatus] = useState(false);

  const consultantId = useSelector((state) => state.consultant.consultantData);
  const { data: fetchData } = useGetConsultantsPriceQuery(consultantId);

  useEffect(() => {
    if (fetchData) {
      setData(fetchData?.data || []);
    }
  }, [fetchData]);
  const toggleUpdateStatus = (row) => {
    setSelectedRow(row);
    setShowEditStatus(!showEditStatus);
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
              onClick={() => toggleUpdateStatus(row.original)}
            >
              <Pencil className="iconSmall" />
            </span>
          )}
        </div>
      ),
    },
  ]);

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
    </div>
  );
};

export default AstrologerPriceListingTable;
