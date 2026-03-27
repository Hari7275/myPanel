import React, { useMemo, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import DyCommonTable from "../../../_components/table/DyCommonTable";

import { getRechargeColumns } from "./rechargeColumn";
import { useGetUserRechargeListQuery } from "../../../_store/api";
import { Atom } from "react-loading-indicators";
import { Search, X, ChevronLeft, ChevronRight } from "lucide-react";
import AndroidIcon from "@mui/icons-material/Android";
import AppleIcon from "@mui/icons-material/Apple";

import { debounce } from "lodash";
import { formatNumber } from "../../users/transactionlist/userTransactionsColumn";

import UserRechargeListFilter from "./UserRechargeListFilter";
import Button from "@mui/material/Button";
import "./UserRechargeLists.css";
const UserRechargeLists = () => {
  const role = useSelector((state) => state.auth.role);
  const showPhoneNumber = role === "admin" || role === "superadmin";

  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(50); // Adjusted default page size
  const [dynamicPagination, setDynamicPagination] = useState(true); // Enable or disable dynamic pagination
  const [userType, setUSerType] = useState(0);
  const [userId, setUserId] = useState("");
  const [name, setName] = useState("");
  const [platformType, setPlatformType] = useState("");

  const [mobileSearchValue, setMobileSearchValue] = useState("");
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [searchType, setSearchType] = useState("user");
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
    isFetching,
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

  const columns = useMemo(() => getRechargeColumns(showPhoneNumber), [showPhoneNumber]);

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

  const handleMobileSearch = (e) => {
    const val = e.target.value;
    setMobileSearchValue(val);
    setPage(1);
    if (searchType === "user") {
      debouncedSearchUserId(val);
      setName("");
    } else {
      debouncedSearchUserName(val);
      setUserId("");
    }
  };

  const handleSearchTypeChange = (type) => {
    setSearchType(type);
    setMobileSearchValue("");
    setUserId("");
    setName("");
    setPage(1);
  };

  const getStatusColor = (status) => {
    const colors = { successful: "#10b981", pending: "#f59e0b", failed: "#ef4444" };
    return colors[status?.toLowerCase()] || "#64748b";
  };

  const getActivityBadgeClass = (type) => {
    if (type === "recharge") return "urlm-badge-recharge";
    if (type === "refund") return "urlm-badge-refund";
    return "urlm-badge-activity";
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

  if (error) return <p>Error fetching data: {error?.data?.message}</p>;

  return (
    <div className="url-page">
      {/* ===== MOBILE CARD VIEW ===== */}
      <div className="url-mobile-view">
        {/* Search */}
        <div className="urlm-search-bar">
          <Search size={16} className="urlm-search-icon" />
          <input
            className="urlm-search-input"
            placeholder={`Search by ${searchType === "user" ? "User ID" : "Name"}...`}
            value={mobileSearchValue}
            onChange={handleMobileSearch}
          />
          {mobileSearchValue && (
            <button
              className="urlm-clear-btn"
              onClick={() => {
                setMobileSearchValue("");
                setUserId("");
                setName("");
                setPage(1);
              }}
            >
              <X size={16} />
            </button>
          )}
        </div>

        {/* Search type + Filter toggle */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div className="urlm-search-type" style={{ flex: 1 }}>
            <span className="urlm-search-label">Search by:</span>
            {[
              { key: "user", label: "User ID" },
              { key: "name", label: "Name" },
            ].map((t) => (
              <button
                key={t.key}
                className={`urlm-pill ${searchType === t.key ? "urlm-pill-active" : ""}`}
                onClick={() => handleSearchTypeChange(t.key)}
              >
                {t.label}
              </button>
            ))}
          </div>
          <button
            className={`urlm-pill ${showMobileFilters ? "urlm-pill-active" : ""}`}
            onClick={() => setShowMobileFilters(!showMobileFilters)}
            style={{ flexShrink: 0 }}
          >
            Filters {showMobileFilters ? "▲" : "▼"}
          </button>
        </div>

        {/* Collapsible filters */}
        {showMobileFilters && (
          <>
            <div className="urlm-search-type">
              <span className="urlm-search-label">User type:</span>
              <button
                className={`urlm-pill ${userType === 0 ? "urlm-pill-active" : ""}`}
                onClick={() => { setUSerType(0); setPage(1); }}
              >
                External
              </button>
              <button
                className={`urlm-pill ${userType === 1 ? "urlm-pill-active" : ""}`}
                onClick={() => { setUSerType(1); setPage(1); }}
              >
                Internal
              </button>
            </div>

            <div className="urlm-search-type">
              <span className="urlm-search-label">Device:</span>
              <button
                className={`urlm-pill ${platformType === "1" ? "urlm-pill-active" : ""}`}
                onClick={() => { setPlatformType(platformType === "1" ? "" : "1"); setPage(1); }}
              >
                Android
              </button>
              <button
                className={`urlm-pill ${platformType === "2" ? "urlm-pill-active" : ""}`}
                onClick={() => { setPlatformType(platformType === "2" ? "" : "2"); setPage(1); }}
              >
                iOS
              </button>
            </div>
          </>
        )}

        {/* Recharge Cards */}
        <div className="urlm-cards">
          {isFetching ? (
            Array.from({ length: 6 }).map((_, i) => (
              <div className="urlm-card urlm-card-skeleton" key={`skeleton-${i}`}>
                <div className="urlm-skeleton-row">
                  <div className="urlm-skeleton-line" style={{ width: "50%", height: "14px" }} />
                  <div className="urlm-skeleton-line" style={{ width: "22%", height: "14px" }} />
                </div>
                <div className="urlm-skeleton-row" style={{ marginTop: 10 }}>
                  <div className="urlm-skeleton-line" style={{ width: "30%" }} />
                  <div className="urlm-skeleton-line" style={{ width: "25%", height: "18px" }} />
                </div>
                <div className="urlm-skeleton-row" style={{ marginTop: 6 }}>
                  <div className="urlm-skeleton-line" style={{ width: "25%" }} />
                  <div className="urlm-skeleton-line" style={{ width: "20%" }} />
                </div>
                <div className="urlm-skeleton-row" style={{ marginTop: 10, borderTop: "1px solid var(--border-color, #f1f5f9)", paddingTop: 8 }}>
                  <div className="urlm-skeleton-badge" />
                  <div className="urlm-skeleton-badge" />
                  <div className="urlm-skeleton-line" style={{ width: "30%", marginLeft: "auto" }} />
                </div>
              </div>
            ))
          ) : data.length === 0 ? (
            <div className="urlm-empty">No transactions found</div>
          ) : (
            data.map((txn) => {
              const statusColor = getStatusColor(txn.status);
              const txnDate = txn.transaction_time ? new Date(txn.transaction_time) : null;
              const dateStr = txnDate
                ? txnDate.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
                : "";
              const timeStr = txnDate
                ? txnDate.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })
                : "";

              return (
                <div className="urlm-card" key={txn.id} style={{ gap: "6px", padding: "12px 14px" }}>
                  {/* Row 1: User info + Amount */}
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                      <span className="urlm-user-name" style={{ fontSize: "15px" }}>{txn.first_name || "User"}</span>
                      <span style={{ fontSize: "14px", color: "var(--text-secondary, #64748b)" }}>({txn.user_id})</span>
                      {txn.platform == 1 ? (
                        <AndroidIcon sx={{ color: "#3DDC84", fontSize: 20 }} />
                      ) : (
                        <AppleIcon sx={{ color: "#7b7878ff", fontSize: 20 }} />
                      )}
                    </div>
                    <span style={{ fontWeight: 700, fontSize: "18px", color: txn.country_code === "IN" ? "#10b981" : "#f87171" }}>
                      {txn.country_code === "IN" ? "+" : "+$"}{formatNumber(txn.amount)}
                    </span>
                  </div>

                  {/* Row 2: Status + Balance + Phone */}
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "14px", color: "var(--text-secondary, #64748b)" }}>
                    <span className="urlm-status" style={{ color: statusColor, fontSize: "13px" }}>
                      <span className="urlm-status-dot" style={{ background: statusColor }} />
                      {txn.status}
                    </span>
                    <span>·</span>
                    <span>Bal: <strong style={{ color: "var(--text-primary, #1e293b)" }}>{txn.country_code === "IN" ? "₹" : "$"}{formatNumber(txn.remaining_balance)}</strong></span>
                    {txn.phone_number && (
                      <>
                        <span>·</span>
                        <span>{txn.phone_number}</span>
                      </>
                    )}
                  </div>

                  {/* Row 3: Badges + Time */}
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", marginTop: "2px" }}>
                    <span className={`urlm-badge ${getActivityBadgeClass(txn.type)}`}>
                      {txn.type?.replace(/_/g, " ")}
                    </span>
                    {txn.is_admin_txn && (
                      <span className="urlm-badge urlm-badge-admin">Admin</span>
                    )}
                    <span className="urlm-time">{dateStr} {timeStr}</span>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Pagination */}
        <div className="urlm-pagination">
          <button
            className="urlm-page-btn"
            disabled={page <= 1}
            onClick={() => setPage(page - 1)}
          >
            <ChevronLeft size={16} />
          </button>
          <span className="urlm-page-info">Page {page} of {totalPage}</span>
          <button
            className="urlm-page-btn"
            disabled={page >= totalPage}
            onClick={() => setPage(page + 1)}
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      {/* ===== DESKTOP TABLE VIEW ===== */}
      <div className="url-desktop-view">
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
    </div>
  );
};

export default UserRechargeLists;
