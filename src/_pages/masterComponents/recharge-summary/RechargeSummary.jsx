import React, { useMemo, useState, useEffect } from "react";
import DyCommonTable from "../../../_components/table/DyCommonTable";
import { COLUMNRECHARGESUMMARY } from "./rechargeSummaryColumn";
import { useGetUserRechargeSummaryListQuery } from "../../../_store/api";
import { Search, X, ChevronLeft, ChevronRight } from "lucide-react";
import { debounce } from "lodash";
import { formatNumber } from "../../users/transactionlist/userTransactionsColumn";
import { Link } from "react-router-dom";
import "./RechargeSummary.css";

const RechargeSummary = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(50);
  const [userType, setUserType] = useState(0);
  const [name, setName] = useState("");
  const [userId, setUserId] = useState("");
  const [platformType, setPlatformType] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [searchType, setSearchType] = useState("id");
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const {
    data: fetchData,
    isFetching,
    error,
  } = useGetUserRechargeSummaryListQuery({
    page,
    size: pageSize,
    user_type: userType,
    name,
    user_id: userId,
    platformType,
  });

  const columns = useMemo(() => COLUMNRECHARGESUMMARY, []);

  useEffect(() => {
    if (fetchData) {
      setData(fetchData?.data?.data || []);
    }
  }, [fetchData]);

  const debouncedSearchUserName = useMemo(() => debounce((value) => setName(value), 500), []);
  const debouncedSearchUserId = useMemo(() => debounce((value) => setUserId(value), 500), []);

  const handleDesktopUserIdSearch = (e) => { setPage(1); debouncedSearchUserId(e?.target?.value); };
  const handleDesktopNameSearch = (e) => { setPage(1); debouncedSearchUserName(e?.target?.value); };

  const handleMobileSearch = (e) => {
    const value = e.target.value;
    setSearchInput(value);
    setPage(1);
    if (searchType === "id") debouncedSearchUserId(value);
    else if (searchType === "name") debouncedSearchUserName(value);
  };

  const handleSearchTypeChange = (type) => {
    setSearchType(type);
    setSearchInput("");
    setUserId("");
    setName("");
    setPage(1);
  };

  const clearSearch = () => {
    setSearchInput("");
    setUserId("");
    setName("");
    setPage(1);
  };

  const customFilterComponent = () => <div style={{ display: "none" }} />;

  const totalPage = fetchData?.data?.pagination?.totalPages || 1;
  const totalUsers = fetchData?.data?.pagination?.total || 0;

  if (error) return <p>Error fetching data: {error?.data?.message}</p>;

  return (
    <div className="rs-page">
      {/* Desktop Filters */}
      <div className="rs-filters">
        <div className="rs-search-box">
          <Search size={18} className="rs-search-icon" />
          <input className="rs-search-input" placeholder="Search by User ID..." onChange={handleDesktopUserIdSearch} />
        </div>
        <div className="rs-search-box">
          <Search size={18} className="rs-search-icon" />
          <input className="rs-search-input" placeholder="Search by Name..." onChange={handleDesktopNameSearch} />
        </div>

        <select className="rs-select" value={userType} onChange={(e) => { setUserType(e.target.value); setPage(1); }}>
          <option value={0}>External</option>
          <option value={1}>Internal</option>
        </select>

        <select className="rs-select" value={platformType} onChange={(e) => { setPlatformType(e.target.value); setPage(1); }}>
          <option value="">All Devices</option>
          <option value={1}>Android</option>
          <option value={2}>iOS</option>
        </select>

        <div className="rs-stat-inline">
          <span className="rs-stat-label">Users:</span>
          <span className="rs-stat-value">{totalUsers}</span>
        </div>
      </div>

      {/* ===== MOBILE CARD VIEW ===== */}
      <div className="rs-mobile-view">
        {/* Search */}
        <div className="rsm-search-bar">
          <Search size={16} className="rsm-search-icon" />
          <input
            className="rsm-search-input"
            placeholder={`Search by ${searchType === "id" ? "User ID" : "Name"}...`}
            value={searchInput}
            onChange={handleMobileSearch}
          />
          {searchInput && (
            <button className="rsm-clear-btn" onClick={clearSearch}>
              <X size={16} />
            </button>
          )}
        </div>

        {/* Search type pills + Filters toggle */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div className="rsm-pills" style={{ flex: 1 }}>
            <span className="rsm-pill-label">Search by:</span>
            {[
              { key: "id", label: "User ID" },
              { key: "name", label: "Name" },
            ].map((t) => (
              <button
                key={t.key}
                className={`rsm-pill ${searchType === t.key ? "rsm-pill-active" : ""}`}
                onClick={() => handleSearchTypeChange(t.key)}
              >
                {t.label}
              </button>
            ))}
          </div>
          <button
            className={`rsm-pill ${showMobileFilters ? "rsm-pill-active" : ""}`}
            onClick={() => setShowMobileFilters(!showMobileFilters)}
            style={{ flexShrink: 0 }}
          >
            Filters {showMobileFilters ? "▲" : "▼"}
          </button>
        </div>

        {/* Collapsible filters */}
        {showMobileFilters && (
          <>
            <div className="rsm-pills">
              <span className="rsm-pill-label">User type:</span>
              <button className={`rsm-pill ${userType == 0 ? "rsm-pill-active" : ""}`} onClick={() => { setUserType(0); setPage(1); }}>External</button>
              <button className={`rsm-pill ${userType == 1 ? "rsm-pill-active" : ""}`} onClick={() => { setUserType(1); setPage(1); }}>Internal</button>
            </div>
            <div className="rsm-pills">
              <span className="rsm-pill-label">Device:</span>
              <button className={`rsm-pill ${platformType === "1" ? "rsm-pill-active" : ""}`} onClick={() => { setPlatformType(platformType === "1" ? "" : "1"); setPage(1); }}>Android</button>
              <button className={`rsm-pill ${platformType === "2" ? "rsm-pill-active" : ""}`} onClick={() => { setPlatformType(platformType === "2" ? "" : "2"); setPage(1); }}>iOS</button>
            </div>
          </>
        )}

        {/* Stat */}
        <div className="rsm-stat">
          Users: <strong>{totalUsers}</strong>
        </div>

        {/* Cards */}
        <div className="rsm-cards">
          {isFetching ? (
            Array.from({ length: 6 }).map((_, i) => (
              <div className="rsm-card rsm-card-skeleton" key={`skeleton-${i}`}>
                <div className="rsm-skeleton-row">
                  <div className="rsm-skeleton-line" style={{ width: "50%", height: "14px" }} />
                  <div className="rsm-skeleton-line" style={{ width: "22%", height: "14px" }} />
                </div>
                <div className="rsm-skeleton-row" style={{ marginTop: 6 }}>
                  <div className="rsm-skeleton-line" style={{ width: "40%" }} />
                  <div className="rsm-skeleton-line" style={{ width: "30%" }} />
                </div>
              </div>
            ))
          ) : data.length === 0 ? (
            <div className="rsm-empty">No records found</div>
          ) : (
            data.map((item) => (
              <div className="rsm-card" key={item.user_id}>
                {/* Row 1: Name + Platform */}
                <div className="rsm-card-row">
                  <Link to={`/user/${item.user_id}`} style={{ textDecoration: "none" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                      <span className="rsm-name">{item.name || "User"}</span>
                      <span className="rsm-id">({item.user_id})</span>
                    </div>
                  </Link>
                  <span className={item.platform == 1 ? "rsm-badge-android" : "rsm-badge-ios"}>
                    {item.platform == 1 ? "Android" : "iOS"}
                  </span>
                </div>

                {/* Row 2: Amount + Recharge Count + Phone */}
                <div className="rsm-card-row">
                  <div>
                    <span className="rsm-label">Amount: </span>
                    <span className="rsm-amount">{formatNumber(item.amount)}</span>
                  </div>
                  <div>
                    <span className="rsm-label">Count: </span>
                    <span className="rsm-value">{item.total_recharge}</span>
                  </div>
                  {item.phone_number && <span className="rsm-phone">{item.phone_number}</span>}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Pagination */}
        <div className="rsm-pagination">
          <button className="rsm-page-btn" disabled={page <= 1} onClick={() => setPage(page - 1)}>
            <ChevronLeft size={16} />
          </button>
          <span className="rsm-page-info">Page {page} of {totalPage}</span>
          <button className="rsm-page-btn" disabled={page >= totalPage} onClick={() => setPage(page + 1)}>
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      {/* ===== DESKTOP TABLE VIEW ===== */}
      <div className="rs-desktop-view">
        <div className={`rs-table-card ${isFetching ? "rs-table-loading" : ""}`}>
          <DyCommonTable
            columns={columns}
            data={data}
            includeActions={false}
            tableTitle="Recharge Summary List"
            customFilterComponent={customFilterComponent}
            dynamicPagination={true}
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

export default RechargeSummary;
