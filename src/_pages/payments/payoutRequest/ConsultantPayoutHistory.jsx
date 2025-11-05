import React, { useEffect, useMemo, useState } from "react";
import CommonTable from "../../../_components/table/CommonTable";
import DyCommonTable from "../../../_components/table/DyCommonTable";

import { PAYOUTCOLUMN } from "./payoutColumns";
import { Info, Pencil, Trash } from "lucide-react";
import { useGetPayoutListQuery } from "../../../_store/api";
import EditPayoutRequest from "./EditPayoutRequest";
import { Atom } from "react-loading-indicators";
import { debounce } from "lodash";

// import UpdateSubscriptionPlan from "./UpdateSubscriptionPlan";

const ConsultantPayoutHistory = () => {
  const [data, setData] = useState([]);
  const [showEditStatus, setShowEditStatus] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(50);
  const [dynamicPagination, setDynamicPagination] = useState(true);
  const [userType, setUSerType] = useState(null);
  const [consultantId, setConsultantId] = useState(null);

  const { data: fetchData, isLoading } = useGetPayoutListQuery({
    page,
    size: pageSize,
    status: userType,
    consultant_id: consultantId,
  });

  useEffect(() => {
    if (fetchData && fetchData.data) {
      // const result = fetchData?.data.filter((item) => item.status !== 1);
      const result = fetchData?.data;
      setData(result);
    } else {
      setData([]);
    }
  }, [fetchData]);

  // Memoized columns definition for the table
  // const columns = useMemo(() => [...PAYOUTCOLUMN], []);
  const toggleEditStatus = (row) => {
    setSelectedRow(row);
    setShowEditStatus(!showEditStatus);
  };

  const debouncedSearchConsultantId = debounce(
    (value) => setConsultantId(value),
    500
  );

  const handleConsultantIdSearch = (e) => {
    setPage(1);
    debouncedSearchConsultantId(e?.target?.value);
  };

  const handleSetUserType = (e) => {
    setPage(1);
    setUSerType(e.target.value);
  };
  const columns = useMemo(
    () => [
      ...PAYOUTCOLUMN,
      {
        Header: () => <div className="actions-header">Actions</div>,
        id: "actions",
        Cell: ({ row }) => (
          <div className="actions-cell">
            <span className="editIcon">
              <Pencil
                className="iconSmall"
                onClick={() => toggleEditStatus(row.original.id)}
              />
            </span>
          </div>
        ),
      },
    ],
    [toggleEditStatus]
  );

  const customFilterComponent = () => (
    <div
      style={{
        width: "100%",
        height: "35px",
        display: "flex",
        alignItems: "center",
      }}
    >
      <input
        className="inputBox"
        placeholder="Search by consultant id"
        style={{
          marginLeft: "25px",
          height: "-webkit-fill-available",
          width: "15%",
          marginLeft: "25px",
        }}
        onChange={handleConsultantIdSearch}
      />
      <select
        className="inputBox"
        style={{
          marginLeft: "25px",
          height: "-webkit-fill-available",
          width: "15%",
        }}
        onChange={handleSetUserType}
      >
        <option value="">Select Status</option>
        <option value={1}>Pending</option>
        <option value={2}>Success</option>
        <option value={3}>Rejected</option>
      </select>
    </div>
  );
  // const totalPage = fetchData?.meta?.total_page || 1;
  const totalPage = fetchData?.meta?.total_page;

  if (isLoading) {
    return (
      <span className="loadPage">
        <Atom color="#1c2434" size="medium" text="" textColor="" />
      </span>
    );
  }

  return (
    <>
      <DyCommonTable
        columns={columns}
        data={data}
        includeActions={false}
        tableTitle="Payout History"
        dynamicPagination={dynamicPagination}
        customFilterComponent={customFilterComponent}
        totalPage={totalPage}
        currentPage={page}
        pageSize={pageSize}
        setPage={setPage}
        setPageSize={setPageSize}
        includeCheckbox={false}
        showTableHeading={false}
      />

      {/* {showEditStatus && (
        <EditPayoutRequest
          isOpen={showEditStatus}
          onClose={toggleEditStatus}
          selectedRow={selectedRow}
        />
      )} */}

      {showEditStatus && (
        <EditPayoutRequest
          isOpen={showEditStatus}
          onClose={toggleEditStatus}
          selectedRow={selectedRow}
        />
      )}
    </>
  );
};
export default ConsultantPayoutHistory;
