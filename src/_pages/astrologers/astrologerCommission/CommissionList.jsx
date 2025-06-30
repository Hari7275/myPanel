import React, { useMemo, useState, useEffect } from "react";
import CommonTable from "../../../_components/table/CommonTable";
import { Pencil, NotebookPen } from "lucide-react";

import { COMMISSIONCOLUMN } from "./commissionColumn";
import { useGetCommissionListQuery } from "../../../_store/api";
import { useSelector } from "react-redux";
import EditPriceStatus from "../../../_components/reuseComponents/EditPriceStatus";
import EditconsultantPrice from "../../../_components/reuseComponents/EditconsultantPrice";
import { useSearchParams } from "react-router-dom";
import AddCommission from "./AddCommission";

const CommissionList = () => {
  const [data, setData] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);
  const [showEditStatus, setShowEditStatus] = useState(false);
  const [showConsultantEditPrice, setShowConsultantPrice] = useState(false);
  const [searchParams] = useSearchParams();
  const [addData, setAddData] = useState(false);

  // const url = window.location.href;

  // console.log("window.location.href", url.split("?"));

  const consultantId = useSelector(
    (state) => state?.consultant?.consultantData
  );
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

  const AddButton = () => {
    return (
      <button
        className="addButton"
        style={{
          position: "absolute",
          right: "20px",
          backgroundColor: "#18B164",
          padding: "6px",
        }}
        onClick={toggleAddData}
      >
        Update Commission
      </button>
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

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading data.</div>;

  return (
    <div>
      <CommonTable
        columns={columns}
        data={data}
        includeCheckbox={false}
        tableTitle="Commission "
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
