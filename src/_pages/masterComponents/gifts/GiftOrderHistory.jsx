// OrderLists.js - Updated to navigate instead of modal.
import React, { useMemo, useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import DyCommonTable from "../../../_components/table/DyCommonTable";
import { GIFTORDERHISTORYCOLUMN } from "./giftColumn";
import { useGetGiftOrderHistoryListQuery, useGetFluteEarningQuery } from "../../../_store/api";
import { Atom } from "react-loading-indicators";

import { debounce } from "lodash";

const GiftOrderHistory = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // 🧠 Read URL Params
  const queryParam = new URLSearchParams(location.search);
  const initialPage = Number(queryParam.get("page")) || 1;
  const initialPageSize = Number(queryParam.get("pageSize")) || 50;

  const [data, setData] = useState([]);
  const [page, setPage] = useState(initialPage);
  const [pageSize, setPageSize] = useState(initialPageSize);
  const [dynamicPagination, setDynamicPagination] = useState(true);

  const [userId, setUserId] = useState(null);

  const [consultantId, setConsultantId] = useState(null);

  const [filterType, setFilterType] = useState("all");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const getDateRange = (type) => {
    const today = new Date();
    const end = today.toISOString().split("T")[0];
    let start = "";
    if (type === "weekly") {
      const d = new Date(today);
      d.setDate(d.getDate() - 7);
      start = d.toISOString().split("T")[0];
    } else if (type === "monthly") {
      const d = new Date(today);
      d.setMonth(d.getMonth() - 1);
      start = d.toISOString().split("T")[0];
    } else if (type === "yearly") {
      const d = new Date(today);
      d.setFullYear(d.getFullYear() - 1);
      start = d.toISOString().split("T")[0];
    }
    return { start, end };
  };

  const handleFilterType = (type) => {
    setFilterType(type);
    if (type === "all") {
      setStartDate("");
      setEndDate("");
    } else {
      const { start, end } = getDateRange(type);
      setStartDate(start);
      setEndDate(end);
    }
  };

  const earningParams = {};
  if (startDate) earningParams.start_date = startDate;
  if (endDate) earningParams.end_date = endDate;

  const { data: earningData } = useGetFluteEarningQuery(earningParams);

  // 🧭 Keep URL params synced when page or pageSize changes
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    params.set("page", page);
    params.set("pageSize", pageSize);

    navigate(`?${params.toString()}`, { replace: true });
  }, [page, pageSize, navigate]);

  // Build query params including filters
  const queryParams = {
    page,
    size: pageSize,
    ...(userId && userId.trim() !== "" ? { user_id: userId } : {}),
    ...(consultantId && consultantId.trim() !== ""
      ? { consultant_id: consultantId }
      : {}),
  };

  const {
    data: fetchData,
    isLoading,
    error,
    refetch,
  } = useGetGiftOrderHistoryListQuery(queryParams, {
    refetchOnMountOrArgChange: true, //
  });

  const columns = useMemo(() => [...GIFTORDERHISTORYCOLUMN], []);

  useEffect(() => {
    if (fetchData && fetchData?.data && fetchData?.data?.order) {
      setData(fetchData?.data?.order);
    } else {
      setData([]);
    }
  }, [fetchData]);

  const debouncedSearchUserId = debounce((value) => setUserId(value), 500);
  const debouncedSearchConsultantId = debounce(
    (value) => setConsultantId(value),
    500
  );

  const handleUserIdSearch = (e) => {
    setPage(1);
    debouncedSearchUserId(e?.target?.value);
  };

  const handleConsultantIdSearch = (e) => {
    setPage(1);
    debouncedSearchConsultantId(e?.target?.value);
  };

  const customFilterComponent = () => (
    <div style={{ width: "100%", display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap", height: "35px" }}>
      <input
        className="inputBox"
        placeholder="Search by consultant id"
        style={{ height: "-webkit-fill-available", width: "13%" }}
        onChange={handleConsultantIdSearch}
      />
      <input
        className="inputBox"
        placeholder="Search by user id"
        style={{ height: "-webkit-fill-available", width: "13%" }}
        onChange={handleUserIdSearch}
      />
      <span style={{ color: "#9ca3af" }}>|</span>
      <select
        className="inputBox"
        value={filterType}
        onChange={(e) => handleFilterType(e.target.value)}
        style={{
          height: "-webkit-fill-available",
          width: "100px",
          padding: "0 8px",
          cursor: "pointer",
          fontWeight: "600",
          fontSize: "12px",
          borderRadius: "6px",
          border: "1px solid #3b82f6",
          backgroundColor: "#eef4ff",
          color: "#1e40af",
          outline: "none",
        }}
      >
        <option value="all">All</option>
        <option value="weekly">Weekly</option>
        <option value="monthly">Monthly</option>
        <option value="yearly">Yearly</option>
      </select>
      <span style={{ color: "#9ca3af" }}>|</span>
      <input
        type="date"
        className="inputBox"
        value={startDate}
        onChange={(e) => { setStartDate(e.target.value); setFilterType("custom"); }}
        style={{ height: "-webkit-fill-available", padding: "0 8px", width: "130px" }}
      />
      <input
        type="date"
        className="inputBox"
        value={endDate}
        onChange={(e) => { setEndDate(e.target.value); setFilterType("custom"); }}
        style={{ height: "-webkit-fill-available", padding: "0 8px", width: "130px" }}
      />
      <span style={{ color: "#9ca3af" }}>|</span>
      <span style={{ fontSize: "13px", fontWeight: "600" }}>
        Revenue: <span style={{ color: "#3b82f6" }}>₹{earningData?.data?.total_order_revenue || "0"}</span>
      </span>
      <span style={{ fontSize: "13px", fontWeight: "600" }}>
        Flute: <span style={{ color: "#10b981" }}>₹{earningData?.data?.total_flute_earning || "0"}</span>
      </span>
      <span style={{ fontSize: "13px", fontWeight: "600" }}>
        Consultant: <span style={{ color: "#f59e0b" }}>₹{earningData?.data?.total_consultant_earning || "0"}</span>
      </span>
    </div>
  );

  const totalPage = fetchData?.meta?.total_page || 1;

  if (isLoading) {
    return (
      <span className="loadPage">
        <Atom color="#1c2434" size="medium" text="" textColor="" />
      </span>
    );
  }

  return (
    <div>
      <DyCommonTable
        columns={columns}
        data={data}
        includeActions={false}
        tableTitle=" Gist Order History"
        dynamicPagination={dynamicPagination}
        customFilterComponent={customFilterComponent}
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

export default GiftOrderHistory;
