import React, { useEffect, useMemo, useState } from "react";
import DyCommonTable from "../../../_components/table/DyCommonTable";
import { PAYOUTCOLUMN } from "./payoutColumns";
import { Search, X, ChevronLeft, ChevronRight, Pencil } from "lucide-react";
import { useGetPayoutListQuery } from "../../../_store/api";
import EditPayoutRequest from "./EditPayoutRequest";
import { debounce } from "lodash";
import { formatDateTime } from "../../../_constants/formatedDate";
import { formatNumber } from "../../users/transactionlist/userTransactionsColumn";
import "./ConsultantPayoutHistory.css";

const STATUS_MAP = {
  1: { label: "Pending", color: "#f59e0b", bg: "#fef3c7" },
  2: { label: "Success", color: "#10b981", bg: "#d1fae5" },
  3: { label: "Rejected", color: "#ef4444", bg: "#fee2e2" },
};

const ConsultantPayoutHistory = () => {
  const [data, setData] = useState([]);
  const [showEditStatus, setShowEditStatus] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(50);
  const [statusFilter, setStatusFilter] = useState(null);
  const [consultantId, setConsultantId] = useState("");
  const [searchInput, setSearchInput] = useState("");

  const { data: fetchData, isFetching } = useGetPayoutListQuery({
    page,
    size: pageSize,
    status: statusFilter,
    consultant_id: consultantId,
  });

  useEffect(() => {
    if (fetchData && fetchData.data) {
      setData(fetchData.data);
    } else {
      setData([]);
    }
  }, [fetchData]);

  const toggleEditStatus = (row) => {
    setSelectedRow(row);
    setShowEditStatus(!showEditStatus);
  };

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

  const columns = useMemo(
    () => [
      ...PAYOUTCOLUMN,
      {
        Header: () => <div className="actions-header">Actions</div>,
        id: "actions",
        Cell: ({ row }) => (
          <div className="actions-cell">
            <span className="editIcon">
              <Pencil
                className="iconSmall"
                onClick={() => toggleEditStatus(row.original.id)}
              />
            </span>
          </div>
        ),
      },
    ],
    [toggleEditStatus]
  );

  const customFilterComponent = () => <div style={{ display: "none" }} />;
  const totalPage = fetchData?.meta?.total_page || 1;

  return (
    <div className="cph-page">
      {/* Desktop Filters */}
      <div className="cph-filters">
        <div className="cph-search-box">
          <Search size={18} className="cph-search-icon" />
          <input
            className="cph-search-input"
            placeholder="Search by Consultant ID..."
            value={searchInput}
            onChange={handleConsultantIdSearch}
          />
        </div>

        <select
          className="cph-select"
          value={statusFilter || ""}
          onChange={(e) => { setStatusFilter(e.target.value || null); setPage(1); }}
        >
          <option value="">All Status</option>
          <option value={1}>Pending</option>
          <option value={2}>Success</option>
          <option value={3}>Rejected</option>
        </select>
      </div>

      {/* ===== MOBILE CARD VIEW ===== */}
      <div className="cph-mobile-view">
        {/* Search */}
        <div className="cphm-search-bar">
          <Search size={16} className="cphm-search-icon" />
          <input
            className="cphm-search-input"
            placeholder="Search by Consultant ID..."
            value={searchInput}
            onChange={handleConsultantIdSearch}
          />
          {searchInput && (
            <button
              className="cphm-clear-btn"
              onClick={() => { setSearchInput(""); setConsultantId(""); setPage(1); }}
            >
              <X size={16} />
            </button>
          )}
        </div>

        {/* Status Pills */}
        <div className="cphm-pills">
          <span className="cphm-pill-label">Status:</span>
          {[
            { label: "All", value: null },
            { label: "Pending", value: "1" },
            { label: "Success", value: "2" },
            { label: "Rejected", value: "3" },
          ].map((sf) => (
            <button
              key={String(sf.value)}
              className={`cphm-pill ${statusFilter === sf.value ? "cphm-pill-active" : ""}`}
              onClick={() => { setStatusFilter(sf.value); setPage(1); }}
            >
              {sf.label}
            </button>
          ))}
        </div>

        {/* Cards */}
        <div className="cphm-cards">
          {isFetching ? (
            Array.from({ length: 6 }).map((_, i) => (
              <div className="cphm-card cphm-card-skeleton" key={`skeleton-${i}`}>
                <div className="cphm-skeleton-row">
                  <div className="cphm-skeleton-line" style={{ width: "35%", height: "14px" }} />
                  <div className="cphm-skeleton-line" style={{ width: "22%", height: "14px" }} />
                </div>
                <div className="cphm-skeleton-row" style={{ marginTop: 6 }}>
                  <div className="cphm-skeleton-line" style={{ width: "40%" }} />
                  <div className="cphm-skeleton-line" style={{ width: "35%" }} />
                </div>
                <div className="cphm-skeleton-row" style={{ marginTop: 6 }}>
                  <div className="cphm-skeleton-line" style={{ width: "30%" }} />
                  <div className="cphm-skeleton-line" style={{ width: "25%" }} />
                </div>
              </div>
            ))
          ) : data.length === 0 ? (
            <div className="cphm-empty">No payout records found</div>
          ) : (
            data.map((item) => {
              const status = STATUS_MAP[item.status] || { label: "Unknown", color: "#6b7280", bg: "#f3f4f6" };
              const isINR = item.consultant_currency === "INR";
              const currencySymbol = isINR ? "₹" : "$";
              const createdDate = item.createdAt ? formatDateTime(item.createdAt) : "-";

              return (
                <div className="cphm-card" key={item.id}>
                  {/* Row 1: ID + Consultant + Status */}
                  <div className="cphm-card-row">
                    <span className="cphm-consultant-id">{item.consultant_id}</span>
                    <span style={{ padding: "3px 10px", borderRadius: "12px", fontSize: "11px", fontWeight: 600, color: status.color, backgroundColor: status.bg }}>
                      {status.label}
                    </span>
                  </div>

                  {/* Row 2: Amount + After Tax */}
                  <div className="cphm-card-row">
                    <div>
                      <span className="cphm-label">Amount: </span>
                      <span className={isINR ? "cphm-amount-inr" : "cphm-amount-usd"}>
                        {currencySymbol} {formatNumber(item.amount)}
                      </span>
                    </div>
                    <div>
                      <span className="cphm-label">After Tax: </span>
                      <span className="cphm-value">
                        {currencySymbol} {formatNumber(item.amount_after_tax)}
                      </span>
                    </div>
                  </div>

                  {/* Row 3: Date + Action */}
                  <div className="cphm-card-row">
                    <span className="cphm-date">{createdDate}</span>
                    <button className="cphm-action-btn" title="Edit" onClick={() => toggleEditStatus(item.id)}>
                      <Pencil size={14} />
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Pagination */}
        <div className="cphm-pagination">
          <button className="cphm-page-btn" disabled={page <= 1} onClick={() => setPage(page - 1)}>
            <ChevronLeft size={16} />
          </button>
          <span className="cphm-page-info">Page {page} of {totalPage}</span>
          <button className="cphm-page-btn" disabled={page >= totalPage} onClick={() => setPage(page + 1)}>
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      {/* ===== DESKTOP TABLE VIEW ===== */}
      <div className="cph-desktop-view">
        <div className={`cph-table-card ${isFetching ? "cph-table-loading" : ""}`}>
          <DyCommonTable
            columns={columns}
            data={data}
            includeActions={false}
            tableTitle="Payout History"
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

      {showEditStatus && (
        <EditPayoutRequest
          isOpen={showEditStatus}
          onClose={toggleEditStatus}
          selectedRow={selectedRow}
        />
      )}
    </div>
  );
};
export default ConsultantPayoutHistory;
