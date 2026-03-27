import React, { useMemo, useState } from "react";
import DyCommonTable from "../../../_components/table/DyCommonTable";
import { Info, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import DatingDescription from "../../payments/datingProducts/DatingDescription";
import { USERNOTIFICATIONCOLUMN } from "./userNotificationColumn";
import { useGetUserNotificationListQuery } from "../../../_store/api";
import AllSendedNotifyUserList from "./AllSendedNotifyUserList";
import "../support/support.css";

const UserNotification = () => {
  const [showDescriptionModal, setShowDescriptionModal] = useState(false);
  const [showUserNotificationModal, setShowUserNotificationModal] =
    useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  const [dynamicPagination] = useState(true);

  const {
    data: fetchData,
    isLoading,
    isFetching,
  } = useGetUserNotificationListQuery({
    page: page,
    size: pageSize,
  });

  const result = useMemo(() => fetchData?.data?.records || [], [fetchData]);

  const toggleDescriptionModal = (row) => {
    setSelectedRow(row?.message);
    setShowDescriptionModal(!showDescriptionModal);
  };

  const handleViewDetails = (Id) => {
    setSelectedRow(Id?.id);
    setShowUserNotificationModal(!showUserNotificationModal);
  };

  const columns = useMemo(
    () => [
      ...USERNOTIFICATIONCOLUMN,
      {
        Header: () => <div className="actions-header">Actions</div>,
        id: "actions",
        Cell: ({ row }) => (
          <div className="actions-cell">
            <span className="editIcon">
              <ArrowRight
                className="iconSmall"
                onClick={() => handleViewDetails(row.original)}
              />
            </span>
            <span
              title="view description"
              className="secondIcon"
              style={{ height: "35px", width: "35px" }}
            >
              <Info
                className="iconSmall"
                onClick={() => toggleDescriptionModal(row.original)}
              />
            </span>
          </div>
        ),
      },
    ],
    []
  );

  const totalPage = fetchData?.data?.pagination?.totalPages || 1;

  const getStatusClass = (status) => {
    const s = String(status).toLowerCase();
    if (s === "sent" || s === "delivered" || s === "active") return "sup-status-active";
    if (s === "pending") return "sup-status-open";
    if (s === "failed") return "sup-status-deleted";
    return "sup-card-value";
  };

  if (isLoading) {
    return (
      <div>
        <div className="sup-mobile-view">
          {Array.from({ length: 6 }).map((_, i) => (
            <div className="sup-card sup-card-skeleton" key={`skeleton-${i}`}>
              <div className="sup-skeleton-row">
                <div className="sup-skeleton-line" style={{ width: "55%", height: "16px" }} />
                <div className="sup-skeleton-badge" />
              </div>
              <div className="sup-skeleton-row" style={{ marginTop: 8 }}>
                <div className="sup-skeleton-line" style={{ width: "80%" }} />
              </div>
              <div className="sup-skeleton-row" style={{ marginTop: 8 }}>
                <div className="sup-skeleton-line" style={{ width: "35%" }} />
                <div className="sup-skeleton-badge" />
              </div>
            </div>
          ))}
        </div>
        <div className="sup-desktop-view">
          <div className="sup-table-card" style={{ padding: 20, textAlign: "center", color: "#94a3b8" }}>Loading...</div>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* ===== MOBILE CARD VIEW ===== */}
      <div className="sup-mobile-view">
        <div className="sup-cards">
          {isFetching ? (
            Array.from({ length: 6 }).map((_, i) => (
              <div className="sup-card sup-card-skeleton" key={`skeleton-${i}`}>
                <div className="sup-skeleton-row">
                  <div className="sup-skeleton-line" style={{ width: "55%", height: "16px" }} />
                  <div className="sup-skeleton-badge" />
                </div>
                <div className="sup-skeleton-row" style={{ marginTop: 8 }}>
                  <div className="sup-skeleton-line" style={{ width: "80%" }} />
                </div>
                <div className="sup-skeleton-row" style={{ marginTop: 8 }}>
                  <div className="sup-skeleton-line" style={{ width: "35%" }} />
                  <div className="sup-skeleton-badge" />
                </div>
              </div>
            ))
          ) : result.length === 0 ? (
            <div className="sup-empty">No notifications found</div>
          ) : (
            result.map((item) => {
              const createdDate = item.created_at
                ? new Date(item.created_at).toLocaleString("en-US", { dateStyle: "medium", timeStyle: "short" })
                : "";

              return (
                <div className="sup-card" key={item.id}>
                  {/* Row 1: Title + Status */}
                  <div className="sup-card-row">
                    <span className="sup-card-title" style={{ flex: 1, marginRight: 8 }}>
                      {item.title}
                    </span>
                    <span className={getStatusClass(item.status)}>
                      {item.status || "N/A"}
                    </span>
                  </div>

                  {/* Row 2: Instant badge + ID */}
                  <div className="sup-card-row">
                    <span className="sup-card-label">
                      {item.is_instant == 1 ? "Instant" : "Scheduled"}
                    </span>
                    <span className="sup-card-id">#{item.id}</span>
                  </div>

                  {/* Row 3: Footer - Date + Actions */}
                  <div className="sup-card-footer">
                    <span className="sup-card-label">{createdDate}</span>
                    <div className="sup-card-actions">
                      <button className="sup-action-btn" title="View Message" onClick={() => toggleDescriptionModal(item)}>
                        <Info size={16} />
                      </button>
                      <button className="sup-action-btn" title="View Details" onClick={() => handleViewDetails(item)}>
                        <ArrowRight size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Pagination */}
        <div className="sup-pagination">
          <button className="sup-page-btn" disabled={page <= 1} onClick={() => setPage(page - 1)}>
            <ChevronLeft size={16} />
          </button>
          <span className="sup-page-info">Page {page} of {totalPage}</span>
          <button className="sup-page-btn" disabled={page >= totalPage} onClick={() => setPage(page + 1)}>
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      {/* ===== DESKTOP TABLE VIEW ===== */}
      <div className="sup-desktop-view">
        <div className="sup-table-card">
          <DyCommonTable
            columns={columns}
            data={result}
            includeActions={false}
            tableTitle="User Notifications"
            dynamicPagination={dynamicPagination}
            totalPage={totalPage}
            currentPage={page}
            pageSize={pageSize}
            setPage={setPage}
            setPageSize={setPageSize}
            showTableHeading={false}
            isLoading={isFetching}
          />
        </div>
      </div>

      {showDescriptionModal && (
        <DatingDescription
          isOpen={showDescriptionModal}
          onClose={toggleDescriptionModal}
          Description={selectedRow}
        />
      )}

      {showUserNotificationModal && (
        <AllSendedNotifyUserList
          isOpen={showUserNotificationModal}
          onClose={handleViewDetails}
          data={selectedRow}
        />
      )}
    </>
  );
};

export default UserNotification;
