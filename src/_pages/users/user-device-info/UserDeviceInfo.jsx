import React, { useMemo, useState, useEffect, useRef } from "react";
import DyCommonTable from "../../../_components/table/DyCommonTable";
import { USERDEVICEINFOCOLUMNS } from "./UserDeviceInfoColumn";
import { useGetRegisterUserDeviceTokenListQuery } from "../../../_store/api";
import { useDispatch } from "react-redux";

import { resetActiveTab } from "../../../_store/slices/activeSlice";
import { debounce } from "lodash";

import { Atom } from "react-loading-indicators";
import { useLocation } from "react-router-dom";
import DeviceInfoFilter from "../../authConsultant/consultant-device-info/DeviceInfoFilter";
import Button from "@mui/material/Button";

const UserDeviceInfo = () => {
  const [data, setData] = useState([]);
  const dispatch = useDispatch();
  const [email_address, setEmailAddress] = useState("");
  const [phone, setPhone] = useState("");

  const [userId, setUserId] = useState("");
  const [page, setPage] = useState(1);
  const pageRef = useRef(page);
  const [pageSize, setPageSize] = useState(15);
  const [dynamicPagination, setDynamicPagination] = useState(true);

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
  } = useGetRegisterUserDeviceTokenListQuery({
    page,
    size: pageSize,
    user_id: userId,

    platform: appliedFilters.platformType,
    is_active: appliedFilters.activeStatus,
    end_date: appliedFilters.endDate,
    start_date: appliedFilters.startDate,
  });

  useEffect(() => {
    pageRef.current = page;
  }, [page]);

  useEffect(() => {
    if (fetchData && fetchData?.data && fetchData?.data) {
      const consultantData = fetchData?.data && fetchData?.data?.records;
      setData(consultantData);
    } else {
      setData([]);
    }
    dispatch(resetActiveTab());
  }, [fetchData, resetActiveTab]);

  useEffect(() => {
    if (location.state) {
      setPage(location.state.previousPage);
      setPageSize(location.state.previousPageSize);
    }
  }, [location.state]);

  const columns = useMemo(() => [...USERDEVICEINFOCOLUMNS], []);

  // Apply debounce to search handlers
  const debouncedSearchEmailAddress = debounce(
    (value) => setEmailAddress(value),
    500
  );
  const debouncedSearchUserId = debounce((value) => setUserId(value), 500);
  const debouncedSearchPhone = debounce((value) => setPhone(value), 500);

  const handleEmailSearch = (e) => {
    setPage(1);
    debouncedSearchEmailAddress(e?.target?.value);
  };

  const handleUserIdSearch = (e) => {
    setPage(1);
    debouncedSearchUserId(e?.target?.value);
  };

  const handleConsultantPhoneSearch = (e) => {
    setPage(1);
    debouncedSearchPhone(e?.target?.value);
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
        placeholder="Search by User Id"
        style={{
          marginLeft: "25px",
          height: "-webkit-fill-available",
          width: "15%",
        }}
        onChange={handleUserIdSearch}
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

  const totalPage = fetchData?.data?.pagination?.totalPages || 1;

  if (isLoading) {
    return (
      <span className="loadPage">
        <Atom color="#3a3a3a" size="medium" text="" textColor="" />
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
        tableTitle="User Device Info"
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
      {data?.length == 0 && <span className="no-data-new">No Device Info</span>}
    </div>
  );
};

export default UserDeviceInfo;
