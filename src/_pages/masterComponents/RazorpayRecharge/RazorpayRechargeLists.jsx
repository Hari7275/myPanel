import React, { useMemo, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import DyCommonTable from "../../../_components/table/DyCommonTable";

import { getRazorpayRechargeColumns } from "./razorpayRechargeColumn";
import { useGetRazorpayRechargeListQuery } from "../../../_store/api";
import { Atom } from "react-loading-indicators";
import { Search, X, ChevronLeft, ChevronRight } from "lucide-react";
import AndroidIcon from "@mui/icons-material/Android";
import AppleIcon from "@mui/icons-material/Apple";

import { debounce } from "lodash";
import { formatNumber } from "../../users/transactionlist/userTransactionsColumn";

import UserRechargeListFilter from "./RazorpayRechargeFilter";
import Button from "@mui/material/Button";
import "./RazorpayRechargeLists.css";

const RazorpayRechargeLists = () => {
  const role = useSelector((state) => state.auth.role);
  const showPhoneNumber = role === "admin" || role === "superadmin";

  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(50);
  const [dynamicPagination, setDynamicPagination] = useState(true);

  const [userId, setUserId] = useState("");
  const [mobileSearchValue, setMobileSearchValue] = useState("");

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
    isFetching,
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

  const columns = useMemo(() => getRazorpayRechargeColumns(showPhoneNumber), [showPhoneNumber]);

  useEffect(() => {
    if (fetchData) {
      setData(fetchData?.data || []);
    }
  }, [fetchData]);

  const debouncedSearchUserId = debounce((value) => setUserId(value), 500);

  const handleUserIdSearch = (e) => {
    setPage(1);
    debouncedSearchUserId(e?.target?.value);
  };

  const handleMobileSearch = (e) => {
    const val = e.target.value;
    setMobileSearchValue(val);
    setPage(1);
    debouncedSearchUserId(val);
  };

  // Handle filter application
  const handleApplyFilter = (filterData) => {
    setAppliedFilters(filterData);
    setPage(1);
  };

  // Count applied filters (non-empty values)
  const appliedFilterCount = Object.values(appliedFilters).filter(
    (val) => val !== "" && val !== null && val !== undefined
  ).length;

  const getStatusColor = (status) => {
    const colors = { SUCCESS: "#10b981", PENDING: "#f59e0b", FAILED: "#ef4444", AUTHORIZED: "#818cf8" };
    return colors[status] || "#64748b";
  };

  const statusFilters = [
    { label: "All", value: "" },
    { label: "Success", value: "SUCCESS" },
    { label: "Pending", value: "PENDING" },
    { label: "Failed", value: "FAILED" },
    { label: "Authorized", value: "AUTHORIZED" },
  ];

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
            placeholder="Search by User ID..."
            value={mobileSearchValue}
            onChange={handleMobileSearch}
          />
          {mobileSearchValue && (
            <button
              className="urlm-clear-btn"
              onClick={() => {
                setMobileSearchValue("");
                setUserId("");
                setPage(1);
              }}
            >
              <X size={16} />
            </button>
          )}
        </div>

        {/* Status filter + Filters toggle */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div className="urlm-search-type" style={{ flex: 1 }}>
            <span className="urlm-search-label">Status:</span>
            {statusFilters.map((sf) => (
              <button
                key={sf.value}
                className={`urlm-pill ${appliedFilters.status === sf.value ? "urlm-pill-active" : ""}`}
                onClick={() => { setAppliedFilters({ ...appliedFilters, status: sf.value }); setPage(1); }}
              >
                {sf.label}
              </button>
            ))}
          </div>
        </div>

        {/* Razorpay Cards */}
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
                  <div className="urlm-skeleton-line" style={{ width: "30%", marginLeft: "auto" }} />
                </div>
              </div>
            ))
          ) : data.length === 0 ? (
            <div className="urlm-empty">No transactions found</div>
          ) : (
            data.map((txn) => {
              const statusColor = getStatusColor(txn.status);
              const txnDate = txn.created_at ? new Date(txn.created_at) : null;
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
                      <span style={{ fontSize: "15px", fontWeight: 600, color: "var(--text-primary, #1e293b)" }}>{txn.user_name || "User"}</span>
                      <span style={{ fontSize: "14px", color: "#d97706" }}>({txn.user_id})</span>
                      {txn.platform == 1 ? (
                        <AndroidIcon sx={{ color: "#3DDC84", fontSize: 20 }} />
                      ) : (
                        <AppleIcon sx={{ color: "#7b7878ff", fontSize: 20 }} />
                      )}
                    </div>
                    <span style={{ fontWeight: 700, fontSize: "18px", color: "var(--text-primary, #1e293b)" }}>
                      {txn.country_code === "IN" ? "+" : "+$"}{formatNumber(txn.transaction_amount)}
                    </span>
                  </div>

                  {/* Row 2: Status + Prev Balance + Phone */}
                  {/* Row 2: Prev Balance + Phone */}
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "14px", color: "var(--text-secondary, #64748b)" }}>
                    <span>Prev: <strong style={{ color: "var(--text-primary, #1e293b)" }}>{txn.country_code === "IN" ? "₹" : "$"}{formatNumber(txn.wallet_amount)}</strong></span>
                    {txn.phone_number && (
                      <>
                        <span>·</span>
                        <span style={{ fontSize: "15px", fontWeight: 600 }}>{txn.country_code}-{txn.phone_number}</span>
                      </>
                    )}
                  </div>

                  {/* Row 3: Date + Status */}
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%", marginTop: "2px" }}>
                    <span style={{ fontSize: "13px", color: "var(--text-secondary, #64748b)" }}>{dateStr} {timeStr}</span>
                    <span style={{ display: "flex", alignItems: "center", gap: "5px", color: statusColor, fontSize: "13px", fontWeight: 600 }}>
                      <span style={{ width: "7px", height: "7px", borderRadius: "50%", background: statusColor, flexShrink: 0 }} />
                      {txn.status}
                    </span>
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
    </div>
  );
};

export default RazorpayRechargeLists;
