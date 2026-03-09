import React, { useMemo, useState, useEffect } from "react";
import DyCommonTable from "../../../_components/table/DyCommonTable";

import { COLUMNRECHARGE } from "./rechargeColumn";
import { useGetUserRechargeListQuery } from "../../../_store/api";
import { Atom } from "react-loading-indicators";

import { debounce } from "lodash";

import UserRechargeListFilter from "./UserRechargeListFilter";
import Button from "@mui/material/Button";
const UserRechargeLists = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(50); // Adjusted default page size
  const [dynamicPagination, setDynamicPagination] = useState(true); // Enable or disable dynamic pagination
  const [userType, setUSerType] = useState(0);
  const [userId, setUserId] = useState("");
  const [name, setName] = useState("");
  const [platformType, setPlatformType] = useState("");

  const [showFilterPopover, setShowFilterPopover] = useState(false);
  const [appliedFilters, setAppliedFilters] = useState({
    startDate: "",
    endDate: "",
    // platformType: "",
    activeStatus: "",
  });

  const {
    data: fetchData,
    isLoading,
    error,
  } = useGetUserRechargeListQuery({
    page,
    size: pageSize,
    user_type: userType,
    name,
    user_id: userId,
    platformType,
    // platform: appliedFilters.platformType,
    is_active: appliedFilters.activeStatus,
    end_date: appliedFilters.endDate,
    start_date: appliedFilters.startDate,
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

  const debouncedSearchUserName = debounce((value) => setName(value), 500);
  const debouncedSearchUserId = debounce((value) => setUserId(value), 500);

  const handleUserNameSearch = (e) => {
    setPage(1);
    debouncedSearchUserName(e?.target?.value);
  };

  const handleUserIdSearch = (e) => {
    setPage(1);
    debouncedSearchUserId(e?.target?.value);
  };

  const handleSetPlatformType = (e) => {
    setPage(1);
    setPlatformType(e.target.value);
  };

  // Handle filter application
  const handleApplyFilter = (filterData) => {
    setAppliedFilters(filterData);
    setPage(1); // Reset to first page when applying filters
    console.log("Applied filters:", filterData);
  };

  // Count applied filters (non-empty values)
  const appliedFilterCount = Object.values(appliedFilters).filter(
    (val) => val !== "" && val !== null && val !== undefined
  ).length;

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
        placeholder="Search by user id"
        style={{
          // marginLeft: "25px",
          height: "-webkit-fill-available",
          width: "10%",
        }}
        onChange={handleUserIdSearch}
      />

      <input
        className="inputBox"
        placeholder="Search by User Name"
        style={{
          marginLeft: "10px",
          height: "-webkit-fill-available",
          width: "10%",
        }}
        onChange={handleUserNameSearch}
      />

      <select
        className="inputBox"
        style={{
          marginLeft: "10px",
          height: "-webkit-fill-available",
          width: "10%",
        }}
        onClick={handleSetUserType}
      >
        <option value={0}>External</option>
        <option value={1}>Internal</option>
      </select>

      <select
        className="inputBox"
        style={{
          marginLeft: "10px",
          height: "-webkit-fill-available",
          width: "10%",
        }}
        onChange={handleSetPlatformType}
      >
        <option>Select Device</option>
        <option value={1}>Andriod</option>
        <option value={2}>iOS</option>
      </select>

      <div
        style={{ marginLeft: "10px", position: "relative" }}
        className="filter-button-wrapper"
      >
        <Button
          variant="contained"
          onClick={() => setShowFilterPopover(!showFilterPopover)}
        >
          Filter
          <span style={{ marginLeft: "10px", color: "#dcfe01ff" }}>
            {appliedFilterCount == 0 ? null : appliedFilterCount}
          </span>
        </Button>

        <UserRechargeListFilter
          isOpen={showFilterPopover}
          onClose={() => setShowFilterPopover(false)}
          onApplyFilter={handleApplyFilter}
          initialFilters={appliedFilters}
        />
      </div>
      <div
        style={{ marginLeft: "10px", position: "relative", display: "flex" }}
      >
        <div>
          <span style={{ color: "#4CAF50", fontWeight: "700", fontSize: "13px" }}>
            Android Recharge =
          </span>
          <span style={{ color: "var(--table-text)", fontWeight: "600", fontSize: "13px" }}>
            {` ₹ ${fetchData?.data?.device_data_info?.android_amount || 0}/${
              fetchData?.data?.device_data_info?.total_android_count || 0
            }`}
          </span>
        </div>
        <div style={{ marginLeft: "10px" }}>
          <span style={{ color: "#2196F3", fontWeight: "700", fontSize: "13px" }}>
            iOS Recharge =
          </span>
          <span style={{ color: "var(--table-text)", fontWeight: "600", fontSize: "13px" }}>
            {` ₹ ${fetchData?.data?.device_data_info?.ios_amount || 0}/${
              fetchData?.data?.device_data_info?.total_ios_count || 0
            }`}
          </span>
        </div>
      </div>
    </div>
  );

  // const totalPage = fetchData?.data?.totalPages || 1;;
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
        showGlobalSearch={false}
      />
    </div>
  );
};

export default UserRechargeLists;
