import React, { useMemo, useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import DyCommonTable from "../../../_components/table/DyCommonTable";
import { GIFTORDERHISTORYCOLUMN } from "./giftColumn";
import { useGetGiftOrderHistoryListQuery, useGetFluteEarningQuery } from "../../../_store/api";
import { debounce } from "lodash";
import { Search, X, ChevronLeft, ChevronRight } from "lucide-react";
import "../order/OrderLists.css";

const GiftOrderHistory = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const queryParam = new URLSearchParams(location.search);
  const initialPage = Number(queryParam.get("page")) || 1;
  const initialPageSize = Number(queryParam.get("pageSize")) || 50;

  const [data, setData] = useState([]);
  const [page, setPage] = useState(initialPage);
  const [pageSize, setPageSize] = useState(initialPageSize);
  const [dynamicPagination] = useState(true);

  const [userId, setUserId] = useState(null);
  const [consultantId, setConsultantId] = useState(null);

  const [filterType, setFilterType] = useState("all");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  // Mobile search
  const [searchType, setSearchType] = useState("consultant");
  const [mobileSearchValue, setMobileSearchValue] = useState("");

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

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    params.set("page", page);
    params.set("pageSize", pageSize);
    navigate(`?${params.toString()}`, { replace: true });
  }, [page, pageSize, navigate]);

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
    isFetching,
  } = useGetGiftOrderHistoryListQuery(queryParams, {
    refetchOnMountOrArgChange: true,
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

  // Mobile search handlers
  const handleMobileSearch = (e) => {
    const value = e.target.value;
    setMobileSearchValue(value);
    setPage(1);
    if (searchType === "consultant") {
      debouncedSearchConsultantId(value);
      setUserId("");
    } else {
      debouncedSearchUserId(value);
      setConsultantId("");
    }
  };

  const handleSearchTypeChange = (type) => {
    setSearchType(type);
    setMobileSearchValue("");
    setUserId("");
    setConsultantId("");
    setPage(1);
  };

  const clearMobileSearch = () => {
    setMobileSearchValue("");
    setUserId("");
    setConsultantId("");
    setPage(1);
  };

  const customFilterComponent = () => (
    <div className="ol-filter-bar">
      <input
        className="ol-search-input"
        placeholder="Consultant ID"
        onChange={handleConsultantIdSearch}
      />
      <input
        className="ol-search-input"
        placeholder="User ID"
        onChange={handleUserIdSearch}
      />

      <select
        className="ol-search-input"
        value={filterType}
        onChange={(e) => handleFilterType(e.target.value)}
        style={{ cursor: "pointer", width: "100px" }}
      >
        <option value="all">All</option>
        <option value="weekly">Weekly</option>
        <option value="monthly">Monthly</option>
        <option value="yearly">Yearly</option>
      </select>

      <input
        type="date"
        className="ol-search-input"
        value={startDate}
        onChange={(e) => { setStartDate(e.target.value); setFilterType("custom"); }}
        style={{ width: "140px" }}
      />
      <input
        type="date"
        className="ol-search-input"
        value={endDate}
        onChange={(e) => { setEndDate(e.target.value); setFilterType("custom"); }}
        style={{ width: "140px" }}
      />

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
      <div className="ol-page">
        <div className="ol-mobile-view">
          {Array.from({ length: 6 }).map((_, i) => (
            <div className="olm-card olm-card-skeleton" key={`skeleton-${i}`}>
              <div className="olm-skeleton-row">
                <div className="olm-skeleton-line" style={{ width: "45%" }} />
                <div className="olm-skeleton-line" style={{ width: "25%" }} />
              </div>
              <div className="olm-skeleton-line" style={{ width: "60%", marginTop: 6 }} />
              <div className="olm-skeleton-row" style={{ marginTop: 8 }}>
                <div className="olm-skeleton-badge" />
                <div className="olm-skeleton-badge" />
              </div>
            </div>
          ))}
        </div>
        <div className="ol-desktop-view">
          <div className="ol-table-card" style={{ padding: 20, textAlign: "center", color: "#94a3b8" }}>Loading...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="ol-page">
      {/* ===== MOBILE CARD VIEW ===== */}
      <div className="ol-mobile-view">
        {/* Search */}
        <div className="olm-search-bar">
          <Search size={16} className="olm-search-icon" />
          <input
            className="olm-search-input"
            placeholder={`Search by ${searchType === "consultant" ? "Consultant" : "User"} ID...`}
            value={mobileSearchValue}
            onChange={handleMobileSearch}
          />
          {mobileSearchValue && (
            <button className="olm-clear-btn" onClick={clearMobileSearch}>
              <X size={16} />
            </button>
          )}
        </div>

        {/* Search type pills */}
        <div className="olm-search-type">
          {[
            { key: "consultant", label: "Consultant ID" },
            { key: "user", label: "User ID" },
          ].map((t) => (
            <button
              key={t.key}
              className={`olm-pill ${searchType === t.key ? "olm-pill-active" : ""}`}
              onClick={() => handleSearchTypeChange(t.key)}
            >
              {t.label}
            </button>
          ))}

          {/* Date filter */}
          <select
            className="olm-pill"
            value={filterType}
            onChange={(e) => handleFilterType(e.target.value)}
            style={{ cursor: "pointer", marginLeft: "auto" }}
          >
            <option value="all">All Time</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
            <option value="yearly">Yearly</option>
          </select>
        </div>

        {/* Earnings Summary */}
        <div className="olm-earning-bar">
          <span className="olm-earning-item">
            Rev: <strong style={{ color: "#3b82f6" }}>₹{earningData?.data?.total_order_revenue || "0"}</strong>
          </span>
          <span className="olm-earning-item">
            Flute: <strong style={{ color: "#10b981" }}>₹{earningData?.data?.total_flute_earning || "0"}</strong>
          </span>
          <span className="olm-earning-item">
            Cons: <strong style={{ color: "#f59e0b" }}>₹{earningData?.data?.total_consultant_earning || "0"}</strong>
          </span>
        </div>

        {/* Gift Cards */}
        <div className="olm-cards">
          {isFetching ? (
            Array.from({ length: 6 }).map((_, i) => (
              <div className="olm-card olm-card-skeleton" key={`skeleton-${i}`}>
                <div className="olm-skeleton-row">
                  <div className="olm-skeleton-line" style={{ width: "45%" }} />
                  <div className="olm-skeleton-line" style={{ width: "25%" }} />
                </div>
                <div className="olm-skeleton-line" style={{ width: "60%", marginTop: 6 }} />
                <div className="olm-skeleton-row" style={{ marginTop: 8 }}>
                  <div className="olm-skeleton-badge" />
                  <div className="olm-skeleton-badge" />
                </div>
              </div>
            ))
          ) : data.length === 0 ? (
            <div className="olm-empty">No gift orders found</div>
          ) : (
            data.map((order) => {
              const consultantName = order.consultant_details?.consultant_first_name || "—";
              const consultantType = order.gift?.consultant_type;
              const typeLabel = { 1: "A", 2: "C", 3: "L" }[consultantType] || "";
              const userName = order.gift_meta_data?.userData?.name || "User";
              const createdDate = order.createdAt
                ? new Date(order.createdAt).toLocaleString("en-US", { dateStyle: "medium", timeStyle: "short" })
                : "";

              return (
                <div className="olm-card" key={order.id}>
                  {/* Row 1: Consultant + Gift Name */}
                  <div className="olm-card-header">
                    <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                      <span style={{ fontSize: 16, fontWeight: 700, color: "var(--text-primary, #1e293b)" }}>
                        {consultantName}
                      </span>
                      <span style={{ fontSize: 13, color: "var(--text-secondary, #64748b)" }}>({order.consultant_id})</span>
                      {typeLabel && <span style={{ color: "#187cbe", fontSize: 12, fontWeight: 600 }}>({typeLabel})</span>}
                    </div>
                    <span className="olm-badge olm-badge-cid" style={{ fontSize: 13, fontWeight: 700 }}>
                      {order.gift?.name || "Gift"} — ₹{order.order_revenue}
                    </span>
                  </div>

                  {/* Row 2: User + Order ID */}
                  <div className="olm-card-body">
                    <div className="olm-card-info" style={{ display: "flex", justifyContent: "space-between" }}>
                      <span>
                        <span className="olm-label" style={{ fontSize: 14 }}>User: </span>
                        <span className="olm-value" style={{ fontSize: 15 }}>{userName}({order.user_id})</span>
                      </span>
                      <span style={{ fontSize: 13, color: "var(--text-secondary, #64748b)", fontWeight: 400 }}>#{order.id}</span>
                    </div>
                  </div>

                  {/* Row 3: Revenue + Date */}
                  <div className="olm-card-footer">
                    <div style={{ display: "flex", gap: 12 }}>
                      <span style={{ fontSize: 14, color: "#10b981", fontWeight: 700 }}>Flute: ₹{order.flute_earning}</span>
                      <span style={{ fontSize: 14, color: "var(--text-primary, #1e293b)", fontWeight: 700 }}>Consultant: ₹{order.order_revenue - order.flute_earning}</span>
                    </div>
                    <span style={{ fontSize: 13, color: "var(--text-secondary, #64748b)" }}>{createdDate}</span>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Pagination */}
        <div className="olm-pagination">
          <button className="olm-page-btn" disabled={page <= 1} onClick={() => setPage(page - 1)}>
            <ChevronLeft size={16} />
          </button>
          <span className="olm-page-info">Page {page} of {totalPage}</span>
          <button className="olm-page-btn" disabled={page >= totalPage} onClick={() => setPage(page + 1)}>
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      {/* ===== DESKTOP TABLE VIEW ===== */}
      <div className="ol-desktop-view">
        <div className="ol-table-card">
          <DyCommonTable
            columns={columns}
            data={data}
            includeActions={false}
            tableTitle="Gift Order History"
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
            isLoading={isFetching}
          />
        </div>
      </div>
    </div>
  );
};

export default GiftOrderHistory;
