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

  const { data: earningData } = useGetFluteEarningQuery();

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
          height: "-webkit-fill-available",
          width: "15%",
        }}
        onChange={handleConsultantIdSearch}
      />
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
      <div style={{ display: "flex", alignItems: "center", gap: "20px", marginLeft: "25px" }}>
        <span style={{ fontSize: "15px", fontWeight: "600" }}>
          Total Revenue:{" "}
          <span style={{ color: "#3b82f6" }}>
            ₹{earningData?.data?.total_order_revenue || "0"}
          </span>
        </span>
        <span style={{ fontSize: "15px", fontWeight: "600" }}>
          Flute Earning:{" "}
          <span style={{ color: "#10b981" }}>
            ₹{earningData?.data?.total_flute_earning || "0"}
          </span>
        </span>
        <span style={{ fontSize: "13px", fontWeight: "600" }}>
          Consultant Earning:{" "}
          <span style={{ color: "#f59e0b" }}>
            ₹{earningData?.data?.total_consultant_earning || "0"}
          </span>
        </span>
      </div>
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
