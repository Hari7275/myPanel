import React, { useState, useEffect, useMemo } from "react";
import { ArrowRight, Pencil } from "lucide-react";
import ListenerBankDetails from "./ListenerBankDetails";
import CommonTable from "../../../_components/table/CommonTable";
import { ACCOUNTCOLUMNS } from "./accountColumn";
import EditStatus from "./EditStatus";
import ListenersPriceListingTable from "../pricing/ListenersPriceListingTable";
import { useGetConsultantsBankDetailsQuery } from "../../../_store/api";
import { useSelector } from "react-redux";


const ListenerAccountList = () => {
  const [showBankDetails, setShowBankDetails] = useState(false);
  const [data, setData] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);
  const [showEditStatus, setShowEditStatus] = useState(false);
  const consultantId = useSelector((state) => state.consultant.consultantData);


  const { data: fetchData } = useGetConsultantsBankDetailsQuery(consultantId);

  useEffect(() => {
    
    if (fetchData) {
      setData(fetchData.data);
    }
  }, [fetchData]);

  const toggleBankDetails = (row) => {
    setSelectedRow(row);
    setShowBankDetails(!showBankDetails);
  };

  const toggleEditStatus = (row) => {
    setSelectedRow(row);
    setShowEditStatus(!showEditStatus);
  };

  const columns = useMemo(() => [
    ...ACCOUNTCOLUMNS,
    {
      Header: () => <div className="actions-header">Actions</div>,
      id: "actions",
      Cell: ({ row }) => (
        <div className="actions-cell">
          <span
            title="view details"
            className="secondIcon"
            style={{ height: "35px", width: "35px" }}
          >
            <ArrowRight
              className="iconSmall"
              onClick={() => toggleBankDetails(row.original)}
            />
          </span>

          <span className="editIcon">
            <Pencil
              className="iconSmall"
              onClick={() => toggleEditStatus(row.original)}
            />
          </span>
        </div>
      ),
    },
  ]);

  return (
    <>
      <div>
        <div className="ProfileData-container sub-container">
          <CommonTable
            columns={columns}
            data={data}
            includeActions={false}
            tableTitle=" Listener Bank List"
          />
        </div>
        <div className="ProfileData-container sub-container">
          <ListenersPriceListingTable />
        </div>

        {showBankDetails && (
          <ListenerBankDetails
            isOpen={showBankDetails}
            onClose={toggleBankDetails}
            selectedRow={selectedRow}
          />
        )}

        {showEditStatus && (
          <EditStatus
            isOpen={showEditStatus}
            onClose={toggleEditStatus}
            currentStatus={selectedRow}
          />
        )}
      </div>
    </>
  );
};

export default ListenerAccountList;
