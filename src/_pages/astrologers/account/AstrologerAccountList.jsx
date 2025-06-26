import React, { useState, useEffect, useMemo } from "react";
import { ArrowRight, Pencil } from "lucide-react";
import AstrologerBankDetails from "./AstrologerBankDetails";
import CommonTable from "../../../_components/table/CommonTable";
import { ACCOUNTCOLUMNS, PAYPALCOLUMNS } from "./accountColumn";
import EditStatus from "./EditStatus";
import AstrologerPriceListingTable from "../pricing/AstrologerPriceListingTable";
import {
  useGetConsultantsBankDetailsQuery,
  useGetConsultantsPayPalDetailsQuery,
} from "../../../_store/api";
import { useSelector } from "react-redux";
import MyGallery from "../../../_constants/MyGallery";

const AstrologerAccountList = () => {
  const [showBankDetails, setShowBankDetails] = useState(false);
  const [data, setData] = useState([]);
  const [paypalData, setPaypalData] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);
  const [showEditStatus, setShowEditStatus] = useState(false);
  const consultantId = useSelector(
    (state) => state?.consultant?.consultantData
  );

  const { data: fetchData } = useGetConsultantsBankDetailsQuery(consultantId);
  const { data: payPalData } =
    useGetConsultantsPayPalDetailsQuery(consultantId);

  useEffect(() => {
    if (fetchData && fetchData?.data) {
      setData(fetchData?.data);
    } else {
      setData([]);
    }
  }, [fetchData]);

  useEffect(() => {
    if (payPalData && payPalData?.data) {
      setPaypalData(payPalData?.data);
    } else {
      setPaypalData([]);
    }
  }, [payPalData]);

  const phoneCode = useMemo(() => localStorage.getItem("phone_code"), [data]);

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
              onClick={() => toggleBankDetails(row?.original)}
            />
          </span>

          <span className="editIcon">
            <Pencil
              className="iconSmall"
              onClick={() => toggleEditStatus(row?.original)}
            />
          </span>
        </div>
      ),
    },
  ]);

  // ******************************************payPalColumns *************************************

  const payPalColumns = useMemo(() => [
    ...PAYPALCOLUMNS,
    {
      Header: () => <div className="actions-header">Actions</div>,
      id: "actions",
      Cell: ({ row }) => (
        <div className="actions-cell">
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
        {phoneCode == +91 ? (
          <CommonTable
            columns={columns}
            data={data}
            includeActions={false}
            tableTitle=" Astrologer Bank List"
          />
        ) : (
          <CommonTable
            columns={payPalColumns}
            data={paypalData}
            includeActions={false}
            tableTitle=" Astrologer PayPal List"
          />
        )}

        <div className="ProfileData-container profile-right-sub-container">
          <AstrologerPriceListingTable />
        </div>

        {showBankDetails && (
          <AstrologerBankDetails
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
            phoneCode={phoneCode}
          />
        )}
      </div>
    </>
  );
};

export default AstrologerAccountList;
