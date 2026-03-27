import React, { useMemo, useState, useEffect } from "react";
import DyCommonTable from "../../../../_components/table/DyCommonTable";
import { CONSULTANTUSERNOTICOLUMN } from "./consultantObservationColumn";
import { debounce } from "lodash";
import { Atom } from "react-loading-indicators";
import { useGetConsultantOrderNotificationQuery, useUpdateConsultantOrderNotificationMutation, useCreateConsultantOrderNotificationMutation } from "../../../../_store/api";
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
  const [updateStatus, { isLoading }] = useUpdateConsultantOrderNotificationMutation();

  useEffect(() => {
    setStatus(item.status);
  }, [item.status]);

  const handleToggle = async () => {
    const newStatus = status == 1 ? 0 : 1;
    setStatus(newStatus);
    try {
      const response = await updateStatus({
        consultant_id: item.id,
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

const ConsultantObservation = () => {
  const { isDarkMode } = useTheme();
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(50);
  const [consultantId, setConsultantId] = useState("");
  const [status, setStatus] = useState(null);
  const [searchInput, setSearchInput] = useState("");

  // Add consultant modal state
  const [showAddModal, setShowAddModal] = useState(false);
  const [addConsultantId, setAddConsultantId] = useState("");

  const { user, prod } = useSelector((state) => state.auth);
  const assignedUserId = getObserverId(user?.id, prod);

  const [addConsultant, { isLoading: isAdding }] = useCreateConsultantOrderNotificationMutation();

  const { data: fetchData, isLoading, isFetching } = useGetConsultantOrderNotificationQuery(
    {
      consultant_id: consultantId,
      user_id: assignedUserId,
      status: status,
      page: page,
      limit: pageSize,
    },
  );

  useEffect(() => {
    if (fetchData && fetchData?.data && fetchData?.data?.records) {
      setData(fetchData?.data?.records);
    } else {
      setData([]);
    }
  }, [fetchData]);

  const columns = useMemo(() => [...CONSULTANTUSERNOTICOLUMN], [data]);

  const debouncedSearchConsultant = useMemo(
    () => debounce((value) => setConsultantId(value), 1500),
    [],
  );

  const handleConsultantSearch = (e) => {
    const value = e?.target?.value || "";
    setSearchInput(value);
    setPage(1);
    debouncedSearchConsultant(value);
  };

  const handleMobileSearch = (e) => {
    const value = e.target.value;
    setSearchInput(value);
    setPage(1);
    debouncedSearchConsultant(value);
  };

  const handleAddConsultant = async () => {
    if (!addConsultantId) {
      toast.error("Please enter Consultant ID");
      return;
    }
    try {
      const response = await addConsultant({
        body: {
          consultant_id: Number(addConsultantId),
          user_id: assignedUserId,
        },
      });
      if (response?.data?.status) {
        toast.success(response?.data?.message || "Consultant added successfully");
        setShowAddModal(false);
        setAddConsultantId("");
      } else {
        toast.error(response?.data?.message || "Failed to add consultant");
      }
    } catch (error) {
      console.log("failed to add consultant", error);
      toast.error("Failed to add consultant");
    }
  };

  const customFilterComponent = () => <div style={{ display: "none" }} />;

  const totalPage = fetchData?.meta?.total_page || 1;

  const getConsultantRoute = (item) => {
    const consultantType = item.consultant_details?.consultant_type;
    const foreigner = item.description?.is_consultant_foreigner;
    const navigationRoute = { 1: `/astrologer/${item.consultant_id}`, 2: `/coaches/${item.consultant_id}`, 3: `/listeners/${item.consultant_id}` };
    const baseRoute = navigationRoute[consultantType] || "";
    return !foreigner ? `${baseRoute}?status=3&type=91` : `${baseRoute}?status=3`;
  };

  const getTypeLabel = (type) => ({ 1: "Astrologer", 2: "Coach", 3: "Listener" }[type] || "");

  if (isLoading) {
    return (
      <span className="loadPage">
        <Atom color={isDarkMode ? "#a8b8d0" : "#1c2434"} size="medium" text="" textColor="" />
      </span>
    );
  }

  return (
    <div style={{ height: "100%", overflow: "hidden", display: "flex", flexDirection: "column" }}>
      {/* Add Consultant Modal */}
      {showAddModal && (
        <div className="obs-modal-overlay" onClick={() => setShowAddModal(false)}>
          <div className="obs-modal" onClick={(e) => e.stopPropagation()}>
            <h3 className="obs-modal-title">Add Consultant to Observing List</h3>
            <div className="obs-modal-body">
              <input
                className="obs-modal-input"
                placeholder="Consultant ID"
                value={addConsultantId}
                onChange={(e) => setAddConsultantId(e.target.value)}
                type="number"
              />
              <div className="obs-modal-actions">
                <button className="obs-modal-cancel" onClick={() => setShowAddModal(false)}>
                  Cancel
                </button>
                <button
                  className="obs-modal-submit"
                  onClick={handleAddConsultant}
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
            placeholder="Search by Consultant ID..."
            value={searchInput}
            onChange={handleConsultantSearch}
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
          <Plus size={14} /> Add Consultant
        </button>
      </div>

      {/* ===== MOBILE CARD VIEW ===== */}
      <div className="obs-mobile-view">
        {/* Mobile Search */}
        <div className="obs-m-search-bar">
          <Search size={16} className="obs-m-search-icon" />
          <input
            className="obs-m-search-input"
            placeholder="Search by Consultant ID..."
            value={searchInput}
            onChange={handleMobileSearch}
          />
          {searchInput && (
            <button
              className="obs-m-clear-btn"
              onClick={() => {
                setSearchInput("");
                setConsultantId("");
                setPage(1);
              }}
            >
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
            <div className="obs-m-empty">No consultants found</div>
          ) : (
            data.map((item) => {
              const consultantName = item.consultant_details?.display_name || "Unknown";
              const consultantType = item.consultant_details?.consultant_type;
              const foreigner = item.description?.is_consultant_foreigner;
              const typeLabel = getTypeLabel(consultantType);
              const route = getConsultantRoute(item);

              return (
                <div className="obs-m-card" key={item.id}>
                  {/* Row 1: Consultant name + Toggle */}
                  <div className="obs-m-card-row">
                    <Link to={route} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                        <span className="obs-m-value" style={{ fontStyle: foreigner ? "italic" : "normal", fontWeight: 600 }}>
                          {consultantName}
                        </span>
                        <span className={foreigner ? "obs-m-name-foreign" : "obs-m-name"}>({item.consultant_id})</span>
                        {typeLabel && (
                          <span className="obs-m-type-badge">{typeLabel}</span>
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
            tableTitle="Consultant Observation"
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

export default ConsultantObservation;
