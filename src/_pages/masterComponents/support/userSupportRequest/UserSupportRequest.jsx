import React, { useMemo, useState, useEffect } from "react";
import DyCommonTable from "../../../../_components/table/DyCommonTable";
import { Pencil, Info, ArrowRight, Search, X, ChevronLeft, ChevronRight } from "lucide-react";
import { SUPPORTREQUESTCOLUMN } from "./supportRequestColumn";
import UpdateSupportRequest from "./UpdateSupportRequest";
import Description from "../../../users/subscription/Description";
import { useGetUserSupportRequestQuery } from "../../../../_store/api";
import { debounce } from "lodash";
import SupportResponseList from "./SupportResponseList";
import { Link } from "react-router-dom";
import { formatDateTime } from "../../../../_constants/formatedDate";
import "../support.css";

const UserSupportRequest = () => {
  const [updateData, setUpdateData] = useState(false);
  const [responseList, setResponseList] = useState(false);

  const [data, setData] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);
  const [description, setDescription] = useState(false);
  const [status, setStatus] = useState("");
  const [userId, setUserId] = useState("");

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(50);
  const [dynamicPagination] = useState(true);

  // Mobile search
  const [mobileSearchValue, setMobileSearchValue] = useState("");
  const [mobileStatusFilter, setMobileStatusFilter] = useState("");

  const { data: fetchData, isLoading, isFetching } = useGetUserSupportRequestQuery({
    status,
    userId,
  });

  useEffect(() => {
    if (isFetching) return;
    if (fetchData?.status && fetchData?.data?.rows && Array.isArray(fetchData.data.rows)) {
      setData(fetchData.data.rows);
    } else {
      setData([]);
    }
  }, [fetchData, isFetching]);

  const toggleUpdateData = (row) => {
    setSelectedRow(row);
    setUpdateData(!updateData);
  };

  const toggleResponseList = (row) => {
    setSelectedRow(row);
    setResponseList(!responseList);
  };

  const toggleDescription = (row) => {
    setDescription(!description);
    setSelectedRow(row);
  };

  const columns = useMemo(() => [
    ...SUPPORTREQUESTCOLUMN,
    {
      Header: () => <div className="actions-header">Actions</div>,
      id: "actions",
      Cell: ({ row }) => (
        <div className="actions-cell">
          <span
            title="view description"
            className="secondIcon"
            style={{ height: "35px", width: "35px" }}
          >
            <Info
              className="iconSmall"
              onClick={() => toggleDescription(row?.original)}
            />
          </span>

          {[1, 2].includes(row.original?.status) && (
            <span
              title="view details"
              className="secondIcon"
              style={{ display: "inline-block", height: "35px", width: "35px" }}
              onClick={() => toggleResponseList(row.original)}
            >
              <ArrowRight className="iconSmall" />
            </span>
          )}
          {row.original?.status == 1 && (
            <span className="editIcon">
              <Pencil
                className="iconSmall"
                onClick={() => toggleUpdateData(row.original)}
              />
            </span>
          )}
        </div>
      ),
    },
  ]);

  const debouncedSearchUserId = debounce((value) => setUserId(value), 500);

  const handleStatusSearch = (e) => {
    const val = e?.target?.value || "";
    setStatus(val);
    setMobileStatusFilter(val);
    setData([]);
    setPage(1);
  };

  const handleUserIdSearch = (e) => {
    debouncedSearchUserId(e?.target?.value);
  };

  // Mobile search
  const handleMobileSearch = (e) => {
    const value = e.target.value;
    setMobileSearchValue(value);
    debouncedSearchUserId(value);
  };

  const clearMobileSearch = () => {
    setMobileSearchValue("");
    setUserId("");
  };

  const handleMobileStatusChange = (val) => {
    setMobileStatusFilter(val);
    setStatus(val);
    setData([]);
    setPage(1);
  };

  const getStatusLabel = (val) => {
    if (val === 1) return "Open";
    if (val === 2) return "Closed";
    if (val === 3) return "Deleted";
    return "Unknown";
  };

  const getStatusClass = (val) => {
    if (val === 1) return "sup-status-open";
    if (val === 2) return "sup-status-closed";
    if (val === 3) return "sup-status-deleted";
    return "";
  };

  const customFilterComponent = () => (
    <div className="sup-filter-bar">
      <input
        className="sup-filter-input"
        placeholder="Search by User Id"
        onChange={handleUserIdSearch}
      />
      <select className="sup-filter-select" onChange={handleStatusSearch}>
        <option value="">Select Status</option>
        <option value={1}>Open</option>
        <option value={2}>Closed</option>
        <option value={3}>Deleted</option>
      </select>
    </div>
  );

  const totalPage = fetchData?.data?.total
    ? Math.ceil(fetchData.data.total / pageSize)
    : 1;

  if (isLoading) {
    return (
      <div>
        <div className="sup-mobile-view">
          {Array.from({ length: 6 }).map((_, i) => (
            <div className="sup-card sup-card-skeleton" key={`skeleton-${i}`}>
              <div className="sup-skeleton-row">
                <div className="sup-skeleton-line" style={{ width: "50%", height: "16px" }} />
                <div className="sup-skeleton-badge" />
              </div>
              <div className="sup-skeleton-row" style={{ marginTop: 8 }}>
                <div className="sup-skeleton-line" style={{ width: "70%" }} />
              </div>
              <div className="sup-skeleton-row" style={{ marginTop: 8 }}>
                <div className="sup-skeleton-line" style={{ width: "40%" }} />
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
        <div className="sup-mobile-header">
          <div className="sup-search-bar">
            <Search size={16} className="sup-search-icon" />
            <input
              className="sup-search-input"
              placeholder="Search by User ID..."
              value={mobileSearchValue}
              onChange={handleMobileSearch}
            />
            {mobileSearchValue && (
              <button className="sup-clear-btn" onClick={clearMobileSearch}>
                <X size={16} />
              </button>
            )}
          </div>

          <div className="sup-filter-row">
            <span style={{ fontSize: 13, fontWeight: 600, color: "var(--text-secondary, #64748b)", whiteSpace: "nowrap" }}>
              Status:
            </span>
            {[
              { label: "All", value: "" },
              { label: "Open", value: "1" },
              { label: "Closed", value: "2" },
              { label: "Deleted", value: "3" },
            ].map((f) => (
              <button
                key={f.value}
                className={`sup-pill ${mobileStatusFilter === f.value ? "sup-pill-active" : ""}`}
                onClick={() => handleMobileStatusChange(f.value)}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        <div className="sup-cards">
          {isFetching ? (
            Array.from({ length: 6 }).map((_, i) => (
              <div className="sup-card sup-card-skeleton" key={`skeleton-${i}`}>
                <div className="sup-skeleton-row">
                  <div className="sup-skeleton-line" style={{ width: "45%", height: "16px" }} />
                  <div className="sup-skeleton-badge" />
                </div>
                <div className="sup-skeleton-row" style={{ marginTop: 8 }}>
                  <div className="sup-skeleton-line" style={{ width: "80%" }} />
                </div>
                <div className="sup-skeleton-row" style={{ marginTop: 8 }}>
                  <div className="sup-skeleton-line" style={{ width: "35%" }} />
                  <div className="sup-skeleton-line" style={{ width: "40%" }} />
                </div>
                <div className="sup-skeleton-row" style={{ marginTop: 8 }}>
                  <div className="sup-skeleton-line" style={{ width: "50%" }} />
                  <div className="sup-skeleton-badge" />
                </div>
              </div>
            ))
          ) : data?.length === 0 ? (
            <div className="sup-empty">No support requests found</div>
          ) : (
            data?.map((item) => (
              <div className="sup-card" key={item.id}>
                <div className="sup-card-row">
                  <div>
                    <Link to={`/user/${item.user_id}`} className="sup-user-link">
                      User {item.user_id}
                    </Link>
                    <span className="sup-card-id" style={{ marginLeft: 8 }}>Ticket #{item.id}</span>
                  </div>
                  <span className={getStatusClass(item.status)}>
                    {getStatusLabel(item.status)}
                  </span>
                </div>

                {item.query_message && (
                  <div className="sup-card-message">{item.query_message}</div>
                )}

                <div className="sup-card-row">
                  <div>
                    {item.order_id && (
                      <span className="sup-card-label">Order: <strong className="sup-card-value">{item.order_id}</strong></span>
                    )}
                  </div>
                  <span className="sup-card-label">{formatDateTime(item.createdAt)}</span>
                </div>

                <div className="sup-card-footer">
                  {item.supportIssue?.title && (
                    <span className="sup-card-label">{item.supportIssue.title}</span>
                  )}
                  <div className="sup-card-actions">
                    <button className="sup-action-btn" title="Description" onClick={() => toggleDescription(item)}>
                      <Info size={16} />
                    </button>
                    {[1, 2].includes(item.status) && (
                      <button className="sup-action-btn" title="Responses" onClick={() => toggleResponseList(item)}>
                        <ArrowRight size={16} />
                      </button>
                    )}
                    {item.status === 1 && (
                      <button className="sup-action-btn" title="Edit" onClick={() => toggleUpdateData(item)}>
                        <Pencil size={16} />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

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
            data={data}
            includeActions={false}
            tableTitle="User Support Request"
            dynamicPagination={dynamicPagination}
            customFilterComponent={customFilterComponent}
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

      {updateData && (
        <UpdateSupportRequest
          isOpen={updateData}
          onClose={toggleUpdateData}
          selectedRow={selectedRow}
        />
      )}

      {description && selectedRow && (
        <Description
          isOpen={description}
          onClose={toggleDescription}
          Descriptions={selectedRow?.query_message || ""}
        />
      )}

      {responseList && (
        <SupportResponseList
          isOpen={responseList}
          onClose={toggleResponseList}
          selectedData={selectedRow}
        />
      )}
    </>
  );
};

export default UserSupportRequest;
