import React, { useMemo, useState, useEffect } from "react";
import DyCommonTable from "../../../_components/table/DyCommonTable";

import { RAZORPAYRECHARGECOLUMN } from "./razorpayRechargeColumn";
import { useGetRazorpayRechargeListQuery } from "../../../_store/api";
import { Atom } from "react-loading-indicators";

import { debounce } from "lodash";

import UserRechargeListFilter from "./RazorpayRechargeFilter";
import Button from "@mui/material/Button";

const RazorpayRechargeLists = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(50); // Adjusted default page size
  const [dynamicPagination, setDynamicPagination] = useState(true); // Enable or disable dynamic pagination

  const [userId, setUserId] = useState("");

  const [showFilterPopover, setShowFilterPopover] = useState(false);
  const [appliedFilters, setAppliedFilters] = useState({
    startDate: "",
    endDate: "",
    orderType: "",
    status: "",
  });

  const {
    data: fetchData,
    isLoading,
    error,
  } = useGetRazorpayRechargeListQuery({
    page,
    size: pageSize,
    user_id: userId,
    orderType: appliedFilters.orderType,
    status: appliedFilters.status,
    end_date: appliedFilters.endDate,
    start_date: appliedFilters.startDate,
  });

  const columns = useMemo(() => RAZORPAYRECHARGECOLUMN, []);

  useEffect(() => {
    if (fetchData) {
      setData(fetchData?.data || []);
    }
  }, [fetchData]);

  // const handleSetUserType = (e) => {
  //   setPage(1);
  //   setUSerType(e.target.value);
  // };

  const debouncedSearchUserId = debounce((value) => setUserId(value), 500);

  const handleUserIdSearch = (e) => {
    setPage(1);
    debouncedSearchUserId(e?.target?.value);
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
      {/* <input
        className="inputBox"
        placeholder="Search by id"
        style={{
          marginLeft: "25px",
          height: "-webkit-fill-available",
          width: "20%",
        }} */}
      {/* // onChange={handleUserIdSearch}/ */}
      {/* /> .*/}

      <input
        className="inputBox"
        placeholder="Search by user id"
        style={{
          marginLeft: "25px",
          height: "-webkit-fill-available",
          width: "15%",
        }}
        onChange={handleUserIdSearch}
      />

      {/* <select
        className="inputBox"
        style={{
          marginLeft: "25px",
          height: "-webkit-fill-available",
          width: "15%",
        }}
        onClick={handleSetUserType}
      >
        <option value={0}>External</option>
        <option value={1}>Internal</option>
      </select> */}

      <div
        style={{ marginLeft: "20px", position: "relative" }}
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
    </div>
  );

  const totalPage = fetchData?.meta?.total_page || 1;
  // const totalPage = fetchData?.data?.totalRecords
  //   ? Math.ceil(fetchData.data.totalRecords / pageSize)
  //   : 1;

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
        tableTitle="Razorpay Recharge List"
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

export default RazorpayRechargeLists;
