import React, { useMemo, useState, useEffect, useRef } from "react";
import DyCommonTable from "../../../_components/table/DyCommonTable";
import { CONSULTANT_DEVICE_INFO } from "./ConsultantDeviceInfoColumn";
import { useGetConsultantsDeviceTokenListQuery } from "../../../_store/api";
import { useDispatch } from "react-redux";

import { resetActiveTab } from "../../../_store/slices/activeSlice";
import { debounce } from "lodash";

import { Atom } from "react-loading-indicators";
import { useLocation } from "react-router-dom";
import DeviceInfoFilter from "./DeviceInfoFilter";
import Button from "@mui/material/Button";

const ConsultantDeviceInfo = () => {
  const [data, setData] = useState([]);
  const dispatch = useDispatch();
  const [consultantId, setConsultantId] = useState("");
  const [page, setPage] = useState(1);
  const pageRef = useRef(page);
  const [pageSize, setPageSize] = useState(10);
  const [dynamicPagination, setDynamicPagination] = useState(true);

  // Filter states
  const [showFilterPopover, setShowFilterPopover] = useState(false);
  const [appliedFilters, setAppliedFilters] = useState({
    startDate: "",
    endDate: "",
    platformType: "",
    activeStatus: "",
  });

  const location = useLocation();

  const {
    data: fetchData,
    isLoading,
    error,
  } = useGetConsultantsDeviceTokenListQuery({
    page,
    size: pageSize,
    platform: appliedFilters.platformType,
    consultantId: consultantId,
    end_date: appliedFilters.endDate,
    start_date: appliedFilters.startDate,
  });

  useEffect(() => {
    pageRef.current = page;
  }, [page]);

  useEffect(() => {
    console.log("fetchData?.data", fetchData?.data);
    if (fetchData && fetchData?.data && fetchData?.data?.records) {
      const consultantData = fetchData?.data?.records;
      setData(consultantData);
    } else {
      setData([]);
    }
    dispatch(resetActiveTab());
  }, [fetchData, resetActiveTab]);

  const totalPage = fetchData?.data?.pagination?.totalPages || 1;
  // ? Math.ceil(fetchData.meta.total / pageSize)
  // : 1;

  useEffect(() => {
    if (location.state) {
      setPage(location.state.previousPage);
      setPageSize(location.state.previousPageSize);
    }
  }, [location.state]);

  const columns = useMemo(() => [...CONSULTANT_DEVICE_INFO], []);

  // Apply debounce to search handlers

  const debouncedSearchConsultantId = debounce(
    (value) => setConsultantId(value),
    500
  );

  const handleConsultantIdSearch = (e) => {
    setPage(1);
    debouncedSearchConsultantId(e?.target?.value);
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
        placeholder="Search by consultant Id"
        style={{
          marginLeft: "25px",
          height: "-webkit-fill-available",
          width: "15%",
        }}
        onChange={handleConsultantIdSearch}
      />

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

        <DeviceInfoFilter
          isOpen={showFilterPopover}
          onClose={() => setShowFilterPopover(false)}
          onApplyFilter={handleApplyFilter}
          initialFilters={appliedFilters}
        />
      </div>
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
    return <div>Error: {error.message}</div>;
  }
  return (
    <div>
      <DyCommonTable
        columns={columns}
        data={data}
        tableTitle="Unregistered Consultant List"
        customFilterComponent={customFilterComponent}
        dynamicPagination={dynamicPagination}
        totalPage={totalPage}
        currentPage={page}
        pageSize={pageSize}
        setPage={setPage}
        setPageSize={setPageSize}
        showTableHeading={false}
        includeCheckbox={false}
      />

      {/* <p>{count}</p>

      <button onClick={() => setCount(count + 1)}>INcrement</button> */}
      {data?.length == 0 && (
        <span className="no-data-new">No Consultant Avaliable</span>
      )}
    </div>
  );
};

export default ConsultantDeviceInfo;
