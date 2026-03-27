import React, { useEffect, useMemo, useState } from "react";
import DyCommonTable from "../../../_components/table/DyCommonTable";
import { PAYABLECOLUMN } from "../payoutRequest/payoutColumns";
import { Search, X, ChevronLeft, ChevronRight } from "lucide-react";
import { useGetPayableListQuery } from "../../../_store/api";
import PayableAmountFilter from "./PayableAmountFilter";
import Button from "@mui/material/Button";
import { debounce } from "lodash";
import { Link } from "react-router-dom";
import "./PayableAmountHistory.css";

const PayableAmountHistory = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(50);
  const [consultantId, setConsultantId] = useState("");
  const [searchInput, setSearchInput] = useState("");

  const [showFilterPopover, setShowFilterPopover] = useState(false);
  const [appliedFilters, setAppliedFilters] = useState({
    startDate: "",
    endDate: "",
    orderType: "",
    status: "",
  });

  const {
    data: fetchData,
    isFetching,
    isError,
  } = useGetPayableListQuery({
    page,
    size: pageSize,
    consultant_id: consultantId,
    orderType: appliedFilters.orderType,
    status: appliedFilters.status,
    end_date: appliedFilters.endDate,
    start_date: appliedFilters.startDate,
  });

  useEffect(() => {
    if (fetchData && fetchData?.data && fetchData?.data?.records) {
      setData(fetchData?.data?.records);
    } else {
      setData([]);
    }
  }, [fetchData]);

  const columns = useMemo(() => [...PAYABLECOLUMN], []);

  const debouncedSearchConsultantId = useMemo(
    () => debounce((value) => setConsultantId(value), 500),
    [],
  );

  const handleConsultantIdSearch = (e) => {
    const value = e?.target?.value || "";
    setSearchInput(value);
    setPage(1);
    debouncedSearchConsultantId(value);
  };

  const handleApplyFilter = (filterData) => {
    setAppliedFilters(filterData);
    setPage(1);
  };

  const appliedFilterCount = Object.values(appliedFilters).filter(
    (val) => val !== "" && val !== null && val !== undefined
  ).length;

  const customFilterComponent = () => <div style={{ display: "none" }} />;

  const totalPage = fetchData?.meta?.total_page || 1;

  const getConsultantRoute = (item) => {
    const type = item.consultant_type;
    const routes = { 1: `/astrologer/${item.consultant_id}`, 2: `/coaches/${item.consultant_id}`, 3: `/listeners/${item.consultant_id}` };
    return routes[type] || "#";
  };

  const getTypeLabel = (type) => ({ 1: "Astrologer", 2: "Coach", 3: "Listener" }[type] || "");

  if (isError) return <p>Error fetching data</p>;

  return (
    <div className="pah-page">
      {/* Filters - Desktop */}
      <div className="pah-filters">
        <div className="pah-search-box">
          <Search size={18} className="pah-search-icon" />
          <input
            className="pah-search-input"
            placeholder="Search by Consultant ID..."
            value={searchInput}
            onChange={handleConsultantIdSearch}
          />
        </div>

        <div style={{ position: "relative" }} className="filter-button-wrapper">
          <Button
            variant="contained"
            onClick={() => setShowFilterPopover(!showFilterPopover)}
            sx={{ textTransform: "none", borderRadius: "8px", fontWeight: 600 }}
          >
            Filter
            {appliedFilterCount > 0 && (
              <span style={{ marginLeft: "8px", color: "#f0c040", fontWeight: 600 }}>
                {appliedFilterCount}
              </span>
            )}
          </Button>
          <PayableAmountFilter
            isOpen={showFilterPopover}
            onClose={() => setShowFilterPopover(false)}
            onApplyFilter={handleApplyFilter}
            initialFilters={appliedFilters}
          />
        </div>

        <div className="pah-stat-inline">
          <span className="pah-stat-label pah-stat-label-green">Total Amount =</span>
          <span className="pah-stat-value">₹ {fetchData?.data?.consultant_payout?.total_overall_sum || 0}</span>
        </div>
        <div className="pah-stat-inline">
          <span className="pah-stat-label pah-stat-label-blue">Total Payable =</span>
          <span className="pah-stat-value">₹ {fetchData?.data?.consultant_payout?.total_payable || 0}</span>
        </div>
      </div>

      {/* ===== MOBILE CARD VIEW ===== */}
      <div className="pah-mobile-view">
        {/* Search */}
        <div className="pahm-search-bar">
          <Search size={16} className="pahm-search-icon" />
          <input
            className="pahm-search-input"
            placeholder="Search by Consultant ID..."
            value={searchInput}
            onChange={handleConsultantIdSearch}
          />
          {searchInput && (
            <button
              className="pahm-clear-btn"
              onClick={() => { setSearchInput(""); setConsultantId(""); setPage(1); }}
            >
              <X size={16} />
            </button>
          )}
        </div>

        {/* Stats */}
        <div className="pahm-stats">
          <div className="pahm-stat-card">
            <div className="pahm-stat-label" style={{ color: "#4CAF50" }}>Total Amount</div>
            <div className="pahm-stat-value">₹ {fetchData?.data?.consultant_payout?.total_overall_sum || 0}</div>
          </div>
          <div className="pahm-stat-card">
            <div className="pahm-stat-label" style={{ color: "#2196F3" }}>Payable</div>
            <div className="pahm-stat-value">₹ {fetchData?.data?.consultant_payout?.total_payable || 0}</div>
          </div>
        </div>

        {/* Cards */}
        <div className="pahm-cards">
          {isFetching ? (
            Array.from({ length: 6 }).map((_, i) => (
              <div className="pahm-card pahm-card-skeleton" key={`skeleton-${i}`}>
                <div className="pahm-skeleton-row">
                  <div className="pahm-skeleton-line" style={{ width: "50%", height: "14px" }} />
                  <div className="pahm-skeleton-line" style={{ width: "25%", height: "14px" }} />
                </div>
                <div className="pahm-skeleton-row" style={{ marginTop: 8 }}>
                  <div className="pahm-skeleton-line" style={{ width: "40%" }} />
                  <div className="pahm-skeleton-line" style={{ width: "35%" }} />
                </div>
              </div>
            ))
          ) : data.length === 0 ? (
            <div className="pahm-empty">No records found</div>
          ) : (
            data.map((item, index) => {
              const currency = item.consultant_currency === "INR" ? "₹" : "$";
              const typeLabel = getTypeLabel(item.consultant_type);
              const route = getConsultantRoute(item);
              const consultantName = item.first_name || "";

              return (
                <div className="pahm-card" key={item.id || index}>
                  {/* Row 1: Consultant + Type */}
                  <div className="pahm-card-row">
                    <Link to={route} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                        <span className="pahm-name">
                          {consultantName || `Consultant`}
                        </span>
                        <span className="pahm-id">({item.consultant_id})</span>
                        {typeLabel && <span className="pahm-type-badge">{typeLabel}</span>}
                      </div>
                    </Link>
                  </div>

                  {/* Row 2: Earnings + Payable */}
                  <div className="pahm-card-row">
                    <div>
                      <span className="pahm-label">Earning: </span>
                      <span className="pahm-amount-green">{currency} {item.lifetime_earning_in_consultant_currency}</span>
                    </div>
                    <div>
                      <span className="pahm-label">Payable: </span>
                      <span className="pahm-amount-blue">{currency} {item.payable_amount_in_consultant_currency}</span>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Pagination */}
        <div className="pahm-pagination">
          <button className="pahm-page-btn" disabled={page <= 1} onClick={() => setPage(page - 1)}>
            <ChevronLeft size={16} />
          </button>
          <span className="pahm-page-info">Page {page} of {totalPage}</span>
          <button className="pahm-page-btn" disabled={page >= totalPage} onClick={() => setPage(page + 1)}>
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      {/* ===== DESKTOP TABLE VIEW ===== */}
      <div className="pah-desktop-view">
        <div className={`pah-table-card ${isFetching ? "pah-table-loading" : ""}`}>
          <DyCommonTable
            columns={columns}
            data={data}
            includeActions={false}
            tableTitle="Payable Log"
            dynamicPagination={true}
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
export default PayableAmountHistory;
