import React, { useMemo, useState, useEffect } from "react";
import DyCommonTable from "../../../../_components/table/DyCommonTable";
import { USEROBSERVATIONCOLUMN } from "./userObservationColumn";
import { debounce } from "lodash";
import { Atom } from "react-loading-indicators";
import {
  useGetUserObservingListQuery,
  useUpdateUserObservingStatusMutation,
  useAddUserToObservingListMutation,
} from "../../../../_store/api";
import { useSelector } from "react-redux";
import { Search, X, ChevronLeft, ChevronRight, Plus } from "lucide-react";
import { Switch } from "@mui/material";
import { formatDateTime } from "../../../../_constants/formatedDate";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { useTheme } from "../../../../_context/ThemeContext";
import { getObserverId } from "../../../../_constants/observerMapping";
import "../ObservingList.css";

const MobileStatusSwitch = ({ item }) => {
  const [status, setStatus] = useState(item.status);
  const [updateStatus, { isLoading }] = useUpdateUserObservingStatusMutation();

  useEffect(() => {
    setStatus(item.status);
  }, [item.status]);

  const handleToggle = async () => {
    const newStatus = status == 1 ? 0 : 1;
    setStatus(newStatus);
    try {
      const response = await updateStatus({
        id: item.id,
        body: { status: newStatus },
      });
      if (response?.data?.status) {
        toast.success(response?.data?.message || "Status updated successfully");
      } else {
        toast.error(response?.data?.message || "Failed to update status");
      }
    } catch (error) {
      console.log("failed to update status", error);
      setStatus(status);
    }
  };

  return (
    <Switch
      checked={status == 1}
      onChange={handleToggle}
      disabled={isLoading}
      size="small"
    />
  );
};

const UserObservation = () => {
  const { isDarkMode } = useTheme();
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(50);
  const [userId, setUserId] = useState("");
  const [status, setStatus] = useState(null);
  const [searchInput, setSearchInput] = useState("");

  // Add user modal state
  const [showAddModal, setShowAddModal] = useState(false);
  const [addUserId, setAddUserId] = useState("");

  const { user, prod } = useSelector((state) => state.auth);
  const assignedObserverId = getObserverId(user?.id, prod);

  const [addUserToObserving, { isLoading: isAdding }] = useAddUserToObservingListMutation();

  const { data: fetchData, isFetching } = useGetUserObservingListQuery({
    user_id: userId,
    observer_id: assignedObserverId,
    status: status,
    page: page,
    limit: pageSize,
  });

  useEffect(() => {
    if (fetchData && fetchData?.data && fetchData?.data?.records) {
      setData(fetchData?.data?.records);
    } else {
      setData([]);
    }
  }, [fetchData]);

  const columns = useMemo(() => [...USEROBSERVATIONCOLUMN], [data]);

  const debouncedSearchUser = useMemo(
    () => debounce((value) => setUserId(value), 1500),
    [],
  );

  const handleUserSearch = (e) => {
    const value = e?.target?.value || "";
    setSearchInput(value);
    setPage(1);
    debouncedSearchUser(value);
  };

  const clearSearch = () => {
    setSearchInput("");
    setUserId("");
    setPage(1);
  };

  const handleAddUser = async () => {
    if (!addUserId) {
      toast.error("Please enter User ID");
      return;
    }
    try {
      const response = await addUserToObserving({
        body: {
          user_id: Number(addUserId),
          observer_id: assignedObserverId,
        },
      });
      if (response?.data?.status) {
        toast.success(response?.data?.message || "User added successfully");
        setShowAddModal(false);
        setAddUserId("");
      } else {
        toast.error(response?.data?.message || "Failed to add user");
      }
    } catch (error) {
      console.log("failed to add user", error);
      toast.error("Failed to add user");
    }
  };

  const customFilterComponent = () => <div style={{ display: "none" }} />;

  const totalPage = fetchData?.meta?.total_page || 1;


  return (
    <div style={{ height: "100%", overflow: "hidden", display: "flex", flexDirection: "column" }}>
      {/* Add User Modal */}
      {showAddModal && (
        <div className="obs-modal-overlay" onClick={() => setShowAddModal(false)}>
          <div className="obs-modal" onClick={(e) => e.stopPropagation()}>
            <h3 className="obs-modal-title">Add User to Observing List</h3>
            <div className="obs-modal-body">
              <input
                className="obs-modal-input"
                placeholder="User ID"
                value={addUserId}
                onChange={(e) => setAddUserId(e.target.value)}
                type="number"
              />
              <div className="obs-modal-actions">
                <button className="obs-modal-cancel" onClick={() => setShowAddModal(false)}>
                  Cancel
                </button>
                <button
                  className="obs-modal-submit"
                  onClick={handleAddUser}
                  disabled={isAdding}
                >
                  {isAdding ? "Adding..." : "Add"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Filters */}
      <div className="obs-filters">
        <div className="obs-search-box">
          <Search size={18} className="obs-search-icon" />
          <input
            className="obs-search-input"
            placeholder="Search by User ID..."
            value={searchInput}
            onChange={handleUserSearch}
          />
        </div>

        <div className="obs-status-pills">
          <span className="obs-status-label">Status:</span>
          {[
            { label: "All", value: null },
            { label: "Active", value: 1 },
            { label: "Inactive", value: 0 },
          ].map((sf) => (
            <button
              key={String(sf.value)}
              className={`obs-pill ${status === sf.value ? "obs-pill-active" : ""}`}
              onClick={() => { setStatus(sf.value); setPage(1); }}
            >
              {sf.label}
            </button>
          ))}
        </div>

        <button className="obs-add-btn" onClick={() => setShowAddModal(true)}>
          <Plus size={14} /> Add User
        </button>
      </div>

      {/* ===== MOBILE CARD VIEW ===== */}
      <div className="obs-mobile-view">
        {/* Mobile Search */}
        <div className="obs-m-search-bar">
          <Search size={16} className="obs-m-search-icon" />
          <input
            className="obs-m-search-input"
            placeholder="Search by User ID..."
            value={searchInput}
            onChange={handleUserSearch}
          />
          {searchInput && (
            <button className="obs-m-clear-btn" onClick={clearSearch}>
              <X size={16} />
            </button>
          )}
        </div>

        {/* Add button + Status filter */}
        <div className="obs-m-filter-row">
          <div className="obs-m-pills">
            <span className="obs-status-label">Status:</span>
            {[
              { label: "All", value: null },
              { label: "Active", value: 1 },
              { label: "Inactive", value: 0 },
            ].map((sf) => (
              <button
                key={String(sf.value)}
                className={`obs-pill ${status === sf.value ? "obs-pill-active" : ""}`}
                onClick={() => { setStatus(sf.value); setPage(1); }}
              >
                {sf.label}
              </button>
            ))}
          </div>
          <button className="obs-m-add-btn" onClick={() => setShowAddModal(true)}>
            <Plus size={18} />
          </button>
        </div>

        {/* Cards */}
        <div className={`obs-m-cards ${isFetching ? "obs-m-cards-loading" : ""}`}>
          {isFetching && data.length === 0 ? (
            Array.from({ length: 6 }).map((_, i) => (
              <div className="obs-m-card obs-m-card-skeleton" key={`skeleton-${i}`}>
                <div className="obs-m-skeleton-row">
                  <div className="obs-m-skeleton-line" style={{ width: "55%", height: "14px" }} />
                  <div className="obs-m-skeleton-line" style={{ width: "15%", height: "20px" }} />
                </div>
                <div className="obs-m-skeleton-row" style={{ marginTop: 8 }}>
                  <div className="obs-m-skeleton-line" style={{ width: "40%" }} />
                  <div className="obs-m-skeleton-line" style={{ width: "40%" }} />
                </div>
              </div>
            ))
          ) : !isFetching && data.length === 0 ? (
            <div className="obs-m-empty">No users found</div>
          ) : (
            data.map((item) => {
              const userName = item.user_name || item.user_details?.display_name || item.user_details?.name;

              return (
                <div className="obs-m-card" key={item.id}>
                  {/* Row 1: User name + Toggle */}
                  <div className="obs-m-card-row">
                    <Link to={`/user/${item.user_id}`} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                        {userName && <span className="obs-m-name">{userName}</span>}
                        {userName ? (
                          <span className="obs-m-id">({item.user_id})</span>
                        ) : (
                          <>
                            <span className="obs-m-label">User ID: </span>
                            <span className="obs-m-name">{item.user_id}</span>
                          </>
                        )}
                      </div>
                    </Link>
                    <MobileStatusSwitch item={item} />
                  </div>

                  {/* Row 2: Created + Status */}
                  <div className="obs-m-card-row">
                    <span className="obs-m-label">
                      <strong className="obs-m-value">{formatDateTime(item.createdAt)}</strong>
                    </span>
                    <span className={item.status == 1 ? "obs-m-status-active" : "obs-m-status-inactive"}>
                      {item.status == 1 ? "Active" : "Inactive"}
                    </span>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Pagination */}
        <div className="obs-m-pagination">
          <button
            className="obs-m-page-btn"
            disabled={page <= 1}
            onClick={() => setPage(page - 1)}
          >
            <ChevronLeft size={16} />
          </button>
          <span className="obs-m-page-info">Page {page} of {totalPage}</span>
          <button
            className="obs-m-page-btn"
            disabled={page >= totalPage}
            onClick={() => setPage(page + 1)}
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      {/* ===== DESKTOP TABLE VIEW ===== */}
      <div className="obs-desktop-view">
        <div className={`obs-table-card ${isFetching ? "obs-table-loading" : ""}`}>
          <DyCommonTable
            columns={columns}
            data={data}
            includeActions={false}
            tableTitle="User Observation List"
            dynamicPagination={true}
            customFilterComponent={customFilterComponent}
            totalPage={totalPage}
            currentPage={page}
            pageSize={pageSize}
            setPage={setPage}
            setPageSize={setPageSize}
            includeCheckbox={false}
            showTableHeading={false}
            isLoading={isFetching}
          />
        </div>
      </div>
    </div>
  );
};

export default UserObservation;
