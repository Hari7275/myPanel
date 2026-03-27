import React, { useMemo, useState, useEffect } from "react";
import DyCommonTable from "../table/DyCommonTable";
import { useGetPayoutHistoryQuery } from "../../_store/api";
import { useParams } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import "./PayoutHistory.css";

const PAYOUT_STATUS = {
  1: { label: "Pending", color: "#f59e0b", bg: "#fef3c7", darkBg: "rgba(245,158,11,0.18)", darkColor: "#fbbf24" },
  2: { label: "Approved", color: "#10b981", bg: "#d1fae5", darkBg: "rgba(16,185,129,0.18)", darkColor: "#34d399" },
  3: { label: "Rejected", color: "#ef4444", bg: "#fee2e2", darkBg: "rgba(239,68,68,0.18)", darkColor: "#f87171" },
};

const PAYOUT_COLUMNS = [
  {
    Header: "Id",
    accessor: "id",
  },
  {
    Header: "Total Amount",
    accessor: "amount",
    Cell: ({ value }) => `₹${value || 0}`,
  },
  {
    Header: "P.G Amount",
    accessor: "tax_details",
    Cell: ({ value }) => `₹${value?.pg_amount || 0}`,
  },
  {
    Header: "Amount (After Tax)",
    accessor: "amount_after_tax",
    Cell: ({ value }) => `₹${value || 0}`,
  },
  {
    Header: "Status",
    accessor: "status",
    Cell: ({ value }) => {
      const status = PAYOUT_STATUS[value] || { label: "Unknown", color: "#6b7280", bg: "#f3f4f6" };
      return (
        <span
          style={{
            padding: "4px 10px",
            borderRadius: "12px",
            fontSize: "12px",
            fontWeight: "600",
            color: status.color,
            backgroundColor: status.bg,
          }}
        >
          {status.label}
        </span>
      );
    },
  },
  {
    Header: "Created Date",
    accessor: "createdAt",
    Cell: ({ value }) => {
      if (!value) return "-";
      const date = new Date(value);
      return date.toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      });
    },
  },
];

const PayoutHistory = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(50);

  const { consultantId } = useParams();

  const {
    data: fetchData,
    isFetching,
  } = useGetPayoutHistoryQuery({ consultant_id: consultantId });

  useEffect(() => {
    if (fetchData?.data) {
      setData(fetchData.data);
    } else {
      setData([]);
    }
  }, [fetchData]);

  const columns = useMemo(() => PAYOUT_COLUMNS, []);
  const totalPage = fetchData?.meta?.total_page || 1;

  const customFilterComponent = () => <div style={{ display: "none" }} />;

  return (
    <div className="ph-wrapper">
      {/* ===== MOBILE CARD VIEW ===== */}
      <div className="ph-mobile-view">
        <div className="phm-cards">
          {isFetching ? (
            Array.from({ length: 6 }).map((_, i) => (
              <div className="phm-card phm-card-skeleton" key={`skeleton-${i}`}>
                <div className="phm-skeleton-row">
                  <div className="phm-skeleton-line" style={{ width: "30%", height: "14px" }} />
                  <div className="phm-skeleton-line" style={{ width: "25%", height: "14px" }} />
                </div>
                <div className="phm-skeleton-row" style={{ marginTop: 6 }}>
                  <div className="phm-skeleton-line" style={{ width: "45%" }} />
                  <div className="phm-skeleton-line" style={{ width: "30%" }} />
                </div>
                <div className="phm-skeleton-row" style={{ marginTop: 6 }}>
                  <div className="phm-skeleton-line" style={{ width: "35%" }} />
                  <div className="phm-skeleton-line" style={{ width: "25%" }} />
                </div>
              </div>
            ))
          ) : data.length === 0 ? (
            <div className="phm-empty">No payout history found</div>
          ) : (
            data.map((item) => {
              const status = PAYOUT_STATUS[item.status] || { label: "Unknown", color: "#6b7280", bg: "#f3f4f6" };
              const createdDate = item.createdAt
                ? new Date(item.createdAt).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })
                : "-";

              return (
                <div className="phm-card" key={item.id}>
                  {/* Row 1: ID + Status */}
                  <div className="phm-card-row">
                    <span className="phm-id">#{item.id}</span>
                    <span
                      style={{
                        padding: "3px 10px",
                        borderRadius: "12px",
                        fontSize: "11px",
                        fontWeight: 600,
                        color: status.color,
                        backgroundColor: status.bg,
                      }}
                    >
                      {status.label}
                    </span>
                  </div>

                  {/* Row 2: Amount + After Tax */}
                  <div className="phm-card-row">
                    <div>
                      <span className="phm-label">Amount: </span>
                      <span className="phm-amount">₹{item.amount || 0}</span>
                    </div>
                    <div>
                      <span className="phm-label">After Tax: </span>
                      <span className="phm-value">₹{item.amount_after_tax || 0}</span>
                    </div>
                  </div>

                  {/* Row 3: PG Amount + Date */}
                  <div className="phm-card-row">
                    <div>
                      <span className="phm-label">PG: </span>
                      <span className="phm-value">₹{item.tax_details?.pg_amount || 0}</span>
                    </div>
                    <span className="phm-date">{createdDate}</span>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Pagination */}
        <div className="phm-pagination">
          <button className="phm-page-btn" disabled={page <= 1} onClick={() => setPage(page - 1)}>
            <ChevronLeft size={16} />
          </button>
          <span className="phm-page-info">Page {page} of {totalPage}</span>
          <button className="phm-page-btn" disabled={page >= totalPage} onClick={() => setPage(page + 1)}>
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      {/* ===== DESKTOP TABLE VIEW ===== */}
      <div className="ph-desktop-view">
        <div className={`ph-table-card ${isFetching ? "ph-table-loading" : ""}`}>
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
    </div>
  );
};

export default PayoutHistory;
