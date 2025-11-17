import React, { useMemo, useState, useEffect, useRef } from "react";
import DyCommonTable from "../../../../_components/table/DyCommonTable";
import { ASSIGNEDUnregistredCONSULTANTCOLUMNS } from "./assignedConsultantColumn";

import EditStatus from "../../../../_components/reuseComponents/EditStatus";
import { useGetOnboardingAssignedUnregisteredConsultantListQuery } from "../../../../_store/api";

import { debounce } from "lodash";

import { Atom } from "react-loading-indicators";

import { useParams } from "react-router-dom";
import usePermissions from "../../../../_components/reuseComponents/permission/EmpPermission";

const OnboardingAssignedUnregisteredConsultantList = () => {
  const [selectedRow, setSelectedRow] = useState(null);
  const [showEditStatus, setShowEditStatus] = useState(false);
  const [data, setData] = useState([]);

  const [phone, setPhone] = useState("");
  const [consultantId, setConsultantId] = useState("");

  const [page, setPage] = useState(1);
  const pageRef = useRef(page);
  const [pageSize, setPageSize] = useState(50);
  const [dynamicPagination, setDynamicPagination] = useState(true);

  let [profileStatus, SetProfileStatus] = useState(null);
  const permissions = usePermissions();

  const { adminId } = useParams();

  const {
    data: fetchData,
    isLoading,
    error,
  } = useGetOnboardingAssignedUnregisteredConsultantListQuery({
    page,
    size: pageSize,

    id: consultantId,
    phone,
    admin_id: adminId,
  });

  //HANDLING THE CURRENT PAGE STATE
  useEffect(() => {
    pageRef.current = page;
  }, [page]);

  useEffect(() => {
    if (fetchData && fetchData?.data && fetchData?.data) {
      const consultantData = fetchData?.data;
      setData(consultantData);
    } else {
      setData([]);
    }
  }, [fetchData]);

  const totalPage = fetchData?.data?.total_records
    ? Math.ceil(fetchData.data.total_records / pageSize)
    : 1;

  const toggleEditStatus = (row) => {
    setShowEditStatus(!showEditStatus);
    SetProfileStatus(row.status);
    setSelectedRow(row);
  };

  const columns = useMemo(
    () => [...ASSIGNEDUnregistredCONSULTANTCOLUMNS],
    [permissions]
  );

  const debouncedSearchConsultantId = debounce(
    (value) => setConsultantId(value),
    500
  );
  const debouncedSearchPhone = debounce((value) => setPhone(value), 500);

  const handleConsultantIdSearch = (e) => {
    setPage(1);
    debouncedSearchConsultantId(e?.target?.value);
  };

  const handleConsultantPhoneSearch = (e) => {
    setPage(1);
    debouncedSearchPhone(e?.target?.value);
  };

  const customFilterComponent = () => (
    <div style={{ width: "100%", height: "35px", display: "flex" }}>
      <input
        className="inputBox"
        placeholder="Search by Id"
        style={{
          // marginLeft: "25px",
          height: "-webkit-fill-available",
          width: "15%",
        }}
        onChange={handleConsultantIdSearch}
      />

      <input
        className="inputBox"
        placeholder="Search by Phone No."
        style={{
          marginLeft: "25px",
          height: "-webkit-fill-available",
          width: "15%",
        }}
        onChange={handleConsultantPhoneSearch}
      />
    </div>
  );

  if (isLoading) {
    return (
      <span className="loadPage">
        <Atom color="#1c2434" size="medium" text="" textColor="" />
      </span>
    );
  }
  if (error) {
    return "Error...";
  }

  return (
    permissions?.["listener"]?.includes("view_listener_list") && (
      <>
        <DyCommonTable
          columns={columns}
          data={data}
          tableTitle="Assigned Consultant List"
          includeActions={false}
          customFilterComponent={customFilterComponent}
          dynamicPagination={dynamicPagination}
          totalPage={totalPage}
          currentPage={page}
          pageSize={pageSize}
          setPage={setPage}
          setPageSize={setPageSize}
          showTableHeading={false}
          includeCheckbox={false}
          showGlobalSearch={false}
        />

        {data?.length == 0 && (
          <span className="no-data-new">
            No unregistred consultant Avaliable
          </span>
        )}

        {showEditStatus && (
          <EditStatus
            isOpen={showEditStatus}
            onClose={toggleEditStatus}
            selectedRow={selectedRow?.id}
            profileStatus={profileStatus}
          />
        )}
      </>
    )
  );
};

export default OnboardingAssignedUnregisteredConsultantList;
