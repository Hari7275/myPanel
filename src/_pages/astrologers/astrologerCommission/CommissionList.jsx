import React, { useMemo, useState, useEffect } from "react";
import CommonTable from "../../../_components/table/CommonTable";
import { Pencil, NotebookPen } from "lucide-react";

import { COMMISSIONCOLUMN } from "./commissionColumn";
import { useGetCommissionListQuery } from "../../../_store/api";

import EditPriceStatus from "../../../_components/reuseComponents/EditPriceStatus";
import EditconsultantPrice from "../../../_components/reuseComponents/EditconsultantPrice";
import { useSearchParams } from "react-router-dom";
import AddCommission from "./AddCommission";
import { Atom } from "react-loading-indicators";
import usePermissions from "../../../_components/reuseComponents/permission/EmpPermission";
import { useLocation, useParams } from "react-router-dom";

const CommissionList = () => {
  const [data, setData] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);
  const [showEditStatus, setShowEditStatus] = useState(false);
  const [showConsultantEditPrice, setShowConsultantPrice] = useState(false);
 
  const [addData, setAddData] = useState(false);
  const permissions = usePermissions();


  const { consultantId } = useParams();

  const {
    data: fetchData,
    isLoading,
    isError,
  } = useGetCommissionListQuery(consultantId);
  useEffect(() => {
    console.log("fetchData?.data", fetchData?.data);
    if (fetchData && fetchData?.data) {
      setData(
        fetchData?.data.filter(
          (item) => ![7, 10].includes(item.service_type)
        ) || []
      );
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

  const toggleAddData = () => {
    setAddData(!addData);
  };

  const canEditCommission = {
    astrologer: permissions?.["astrologer"]?.includes(
      "update_astrologer_profile_flute_commission"
    ),
    coach: permissions?.["coach"]?.includes(
      "update_coach_profile_flute_commission"
    ),
    listener: permissions?.["listener"]?.includes(
      "update_listener_profile_flute_commission"
    ),
  };

  const hasEditPermission = Object.values(canEditCommission).some(Boolean);

  const AddButton = () => {
    return (
      hasEditPermission && (
        <button className="addButton right-addButton" onClick={toggleAddData}>
          Update Commission
        </button>
      )
    );
  };

  const columns = useMemo(() => [
    ...COMMISSIONCOLUMN,
    // {
    //   Header: () => <div className="actions-header">Actions</div>,
    //   id: "actions",
    //   Cell: ({ row }) => (
    //     <div className="actions-cell">
    //       {row.original.status === 1 && (
    //         <span
    //           className="editIcon"
    //           onClick={() => toggleUpdateStatus(row?.original)}
    //         >
    //           <NotebookPen className="iconSmall" />
    //         </span>
    //       )}

    //       {row.original.status == 2 && (
    //         <span
    //           className="editIcon"
    //           onClick={() => toggleUpdateConsultantPrice(row?.original)}
    //         >
    //           <Pencil className="iconSmall" />
    //         </span>
    //       )}
    //     </div>
    //   ),
    // },
  ]);

  if (isLoading) {
    return (
      <span className="loadPage">
        <Atom color="#1c2434" size="medium" text="" textColor="" />
      </span>
    );
  }
  if (isError) return <div>Error loading data.</div>;

  return (
    <div>
      <CommonTable
        columns={columns}
        data={data}
        includeCheckbox={false}
        tableTitle="Commission"
        AddPackageButton={AddButton}
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

      {addData && (
        <AddCommission
          isOpen={addData}
          onClose={toggleAddData}
          consultantId={consultantId}
        />
      )}
    </div>
  );
};

export default CommissionList;
