import React, { useMemo, useState, useEffect } from "react";
import DyCommonTable from "../../../_components/table/DyCommonTable";

import { COLUMNRECHARGE } from "./rechargeColumn";
import { useGetUserRechargeListQuery } from "../../../_store/api";
import { Atom } from "react-loading-indicators";

const UserRechargeLists = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10); // Adjusted default page size
  const [dynamicPagination, setDynamicPagination] = useState(true); // Enable or disable dynamic pagination
  const [userType, setUSerType] = useState(0);

  const {
    data: fetchData,
    isLoading,
    error,
  } = useGetUserRechargeListQuery({
    page,
    size: pageSize,
    user_type: userType,
  });

  const columns = useMemo(() => COLUMNRECHARGE, []);

  useEffect(() => {
    if (fetchData) {
      setData(fetchData?.data?.data || []);
    }
  }, [fetchData]);

  const handleSetUserType = (e) => {
    setPage(1);
    setUSerType(e.target.value);
  };

  const customFilterComponent = () => (
    <div style={{ width: "100%", height: "35px" }}>
      {/* <input
        className="inputBox"
        placeholder="Search by id"
        style={{
          marginLeft: "25px",
          height: "-webkit-fill-available",
          width: "20%",
        }} */}
      {/* // onChange={handleUserIdSearch}/ */}
      {/* /> */}

      <select
        className="inputBox"
        style={{
          marginLeft: "25px",
          height: "-webkit-fill-available",
          width: "20%",
        }}
        onClick={handleSetUserType}
      >
        <option value={0}>External</option>
        <option value={1}>Internal</option>
      </select>
    </div>
  );

  // const totalPage = fetchData?.data?.totalPages || 1;
  const totalPage = fetchData?.data?.totalRecords
    ? Math.ceil(fetchData.data.totalRecords / pageSize)
    : 1;

  if (isLoading) {
    return (
      <span className="loadPage">
        <Atom color="#1c2434" size="medium" text="" textColor="" />
      </span>
    );
  }
  if (error) return <p>Error fetching data: {error?.data?.message}</p>;

  return (
    <div>
      <DyCommonTable
        columns={columns}
        data={data}
        includeActions={false}
        tableTitle="Users Recharge List"
        customFilterComponent={customFilterComponent}
        dynamicPagination={dynamicPagination}
        totalPage={totalPage}
        currentPage={page}
        pageSize={pageSize}
        setPage={setPage}
        setPageSize={setPageSize}
        includeCheckbox={false}
        showTableHeading={false}
      />
    </div>
  );
};

export default UserRechargeLists;
