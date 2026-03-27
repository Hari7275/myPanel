import React, { useEffect, useMemo, useState } from "react";
import DyCommonTable from "../../../_components/table/DyCommonTable";
import { REFUND_LIST_COLUMNS } from "./refundListColumns";
import { useGetRefundListQuery } from "../../../_store/api";
import { ChevronLeft, ChevronRight, AlertCircle, FileX } from "lucide-react";
import { formatDateTime } from "../../../_constants/formatedDate";
import "../../authConsultant/NoOrderConsultantListNew.css";

const transactionMap = {
  1: { label: "Empty", color: "#6b7280" },
  2: { label: "Credit", color: "#10b981" },
  3: { label: "Debit", color: "#ef4444" },
};

const RefundList = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const { data: fetchData, isLoading, isFetching, error } = useGetRefundListQuery({
    page,
    size: pageSize,
  });

  useEffect(() => {
    if (fetchData && fetchData.data) {
      setData(fetchData.data);
    } else {
      setData([]);
    }
  }, [fetchData]);

  const columns = useMemo(() => [...REFUND_LIST_COLUMNS], []);

  const totalPage = fetchData?.meta?.total_page || 1;
  const totalRecords = fetchData?.meta?.total_records || data?.length || 0;

  const customFilterComponent = () => <div style={{ display: "none" }} />;

  if (isLoading) {
    return (
      <div className="noc-page" style={{ padding: "20px" }}>
        {/* Mobile skeleton */}
        <div className="noc-mobile-view">
          {Array.from({ length: 6 }).map((_, i) => (
            <div className="noc-m-card noc-m-card-skeleton" key={`skeleton-${i}`}>
              <div className="noc-m-skeleton-row">
                <div className="noc-m-skeleton-line" style={{ width: "45%", height: "16px" }} />
                <div className="noc-m-skeleton-badge" />
              </div>
              <div className="noc-m-skeleton-row" style={{ marginTop: 8 }}>
                <div className="noc-m-skeleton-line" style={{ width: "55%" }} />
                <div className="noc-m-skeleton-line" style={{ width: "30%" }} />
              </div>
              <div className="noc-m-skeleton-row" style={{ marginTop: 8 }}>
                <div className="noc-m-skeleton-line" style={{ width: "40%" }} />
                <div className="noc-m-skeleton-badge" />
              </div>
            </div>
          ))}
        </div>
        {/* Desktop skeleton */}
        <div className="noc-desktop-view">
          <div className="skeleton-section">
            <div className="skeleton-title skeleton-pulse" />
            <div className="skeleton-card skeleton-pulse" style={{ height: "400px", borderRadius: "8px" }} />
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="noc-page">
        <div className="noc-error">
          <div className="noc-error-icon">
            <AlertCircle size={24} />
          </div>
          <span className="noc-error-text">Failed to load refund data. Please try again.</span>
        </div>
      </div>
    );
  }

  return (
    <div className="noc-page">
      {/* Filters */}
      {/* <div className="noc-filters">
        <div className="noc-stat-inline">
          <span className="noc-stat-value">{totalRecords}</span>
          <span className="noc-stat-label-inline">Total Refunds</span>
        </div>
      </div> */}

      {/* ===== MOBILE CARD VIEW ===== */}
      <div className="noc-mobile-view">
        <div className="noc-m-cards">
          {isFetching ? (
            Array.from({ length: 6 }).map((_, i) => (
              <div className="noc-m-card noc-m-card-skeleton" key={`skeleton-${i}`}>
                <div className="noc-m-skeleton-row">
                  <div className="noc-m-skeleton-line" style={{ width: "45%", height: "16px" }} />
                  <div className="noc-m-skeleton-badge" />
                </div>
                <div className="noc-m-skeleton-row" style={{ marginTop: 8 }}>
                  <div className="noc-m-skeleton-line" style={{ width: "55%" }} />
                  <div className="noc-m-skeleton-line" style={{ width: "30%" }} />
                </div>
                <div className="noc-m-skeleton-row" style={{ marginTop: 8 }}>
                  <div className="noc-m-skeleton-line" style={{ width: "40%" }} />
                  <div className="noc-m-skeleton-badge" />
                </div>
              </div>
            ))
          ) : data.length === 0 ? (
            <div className="noc-empty">
              <div className="noc-empty-icon">
                <FileX size={28} />
              </div>
              <span className="noc-empty-text">No refunds found</span>
            </div>
          ) : (
            data.map((item) => {
              const userTxn = transactionMap[item.user_transaction] || { label: "Unknown", color: "#6b7280" };
              const consultantTxn = transactionMap[item.consultant_transaction] || { label: "Unknown", color: "#6b7280" };

              return (
                <div className="noc-m-card" key={item.id}>
                  {/* Row 1: Order ID + Refund ID */}
                  <div className="noc-m-card-row">
                    <div>
                      <span className="noc-name-link-text">Order #{item.order_id}</span>
                      <span className="noc-id-text" style={{ marginLeft: 8 }}>#{item.id}</span>
                    </div>
                  </div>

                  {/* Row 2: User & Consultant IDs */}
                  <div className="noc-m-card-row">
                    <span className="noc-secondary-text">User: <strong>{item.user_id}</strong></span>
                    <span className="noc-secondary-text">Consultant: <strong>{item.consultant_id}</strong></span>
                  </div>

                  {/* Row 3: Duration */}
                  <div className="noc-m-card-row">
                    <span className="noc-secondary-text">Order: <strong>{item.order_duration} min</strong></span>
                    <span className="noc-secondary-text">Refund: <strong>{item.refund_duration} min</strong></span>
                  </div>

                  {/* Row 4: Amounts */}
                  <div className="noc-m-card-row">
                    <span style={{ color: "#2e7d32", fontWeight: 600, fontSize: 14 }}>User: ₹{item.user_amount}</span>
                    <span style={{ color: "#1565c0", fontWeight: 600, fontSize: 14 }}>Consultant: ₹{item.consultant_amount}</span>
                  </div>

                  {/* Row 5: Footer - Txn + Date */}
                  <div className="noc-m-card-footer">
                    <div style={{ display: "flex", gap: 8 }}>
                      <span className="noc-badge" style={{ color: userTxn.color, background: `${userTxn.color}18` }}>
                        U: {userTxn.label}
                      </span>
                      <span className="noc-badge" style={{ color: consultantTxn.color, background: `${consultantTxn.color}18` }}>
                        C: {consultantTxn.label}
                      </span>
                    </div>
                    <span className="noc-date-secondary">{formatDateTime(item.createdAt)}</span>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Pagination */}
        <div className="noc-m-pagination">
          <button className="noc-m-page-btn" disabled={page <= 1} onClick={() => setPage(page - 1)}>
            <ChevronLeft size={16} />
          </button>
          <span className="noc-m-page-info">Page {page} of {totalPage}</span>
          <button className="noc-m-page-btn" disabled={page >= totalPage} onClick={() => setPage(page + 1)}>
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      {/* ===== DESKTOP TABLE VIEW ===== */}
      <div className="noc-desktop-view">
        <div className="noc-table-card">
          <DyCommonTable
            columns={columns}
            data={data}
            includeActions={false}
            tableTitle="Refund List"
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

          {data?.length === 0 && !isFetching && (
            <div className="noc-empty">
              <div className="noc-empty-icon">
                <FileX size={28} />
              </div>
              <span className="noc-empty-text">No refunds found</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RefundList;
