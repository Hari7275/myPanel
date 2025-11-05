import React, { useState, useEffect, useMemo } from "react";
import { ArrowRight, Pencil, Info } from "lucide-react";
import ListenerBankDetails from "./ListenerBankDetails";
import CommonTable from "../../../_components/table/CommonTable";
import { ACCOUNTCOLUMNS, PAYPALCOLUMNS } from "./accountColumn";
import EditStatus from "./EditStatus";

import {
  useGetConsultantsBankDetailsQuery,
  useGetConsultantsPayPalDetailsQuery,
} from "../../../_store/api";
import { useSelector } from "react-redux";
import usePermissions from "../../../_components/reuseComponents/permission/EmpPermission";
import { useLocation, useParams } from "react-router-dom";

const ListenerAccountList = () => {
  const [showBankDetails, setShowBankDetails] = useState(false);
  const [data, setData] = useState([]);
  const [paypalData, setPaypalData] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);
  const [showEditStatus, setShowEditStatus] = useState(false);
  // const consultantId = useSelector((state) => state.consultant.consultantData);
  const { consultantId } = useParams();

  const permissions = usePermissions();

  const { data: fetchData } = useGetConsultantsBankDetailsQuery(consultantId);
  const { data: payPalData } =
    useGetConsultantsPayPalDetailsQuery(consultantId);

  useEffect(() => {
    if (fetchData && fetchData?.data) {
      setData(fetchData?.data);
    } else setData([]);
  }, [fetchData]);

  // paypal details
  useEffect(() => {
    console.log("payPalData?.data", payPalData?.data);
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
          {/* {permissions?.["listener"]?.includes(
            "view_listener_bank_details"
          ) && ( */}
          <span
            title="view details"
            className="secondIcon"
            style={{ height: "35px", width: "35px" }}
          >
            <Info
              className="iconSmall"
              onClick={() => toggleBankDetails(row.original)}
            />
          </span>
          {/* )} */}

          {permissions?.["listener"]?.includes(
            "update_listener_profile_bank_details"
          ) && (
            <span className="editIcon">
              <Pencil
                className="iconSmall"
                onClick={() => toggleEditStatus(row.original)}
              />
            </span>
          )}
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
        <div className="ProfileData-container profile-right-sub-container">
          {consultantId == 1996 || phoneCode == +91 ? (
            <CommonTable
              columns={columns}
              data={data}
              includeActions={false}
              tableTitle=" Listener Bank List"
            />
          ) : (
            <CommonTable
              columns={payPalColumns}
              data={paypalData}
              includeActions={false}
              tableTitle="Listener PayPal List"
            />
          )}
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
            phoneCode={phoneCode}
          />
        )}
      </div>
    </>
  );
};

export default ListenerAccountList;
