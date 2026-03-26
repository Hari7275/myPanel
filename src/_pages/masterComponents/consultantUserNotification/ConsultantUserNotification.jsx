import React, { useMemo, useState, useEffect } from "react";
import DyCommonTable from "../../../_components/table/DyCommonTable";
import { CONSULTANTUSERNOTICOLUMN } from "./consultantUserNotiColumn";
import { debounce } from "lodash";
import { Atom } from "react-loading-indicators";
import { useGetConsultantOrderNotificationQuery, useUpdateConsultantOrderNotificationMutation } from "../../../_store/api";
import { useSelector } from "react-redux";
import { Search, X, ChevronLeft, ChevronRight } from "lucide-react";
import { Switch } from "@mui/material";
import { formatDateTime } from "../../../_constants/formatedDate";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import "./ConsultantUserNotification.css";

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

const ConsultantUserNotification = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(50);
  const [consultantId, setConsultantId] = useState("");
  const [status, setStatus] = useState(null);
  const [dynamicPagination, setDynamicPagination] = useState(true);
  const [searchInput, setSearchInput] = useState("");

  const { user } = useSelector((state) => state.auth);

  let assignedUserId;

  if (user?.id === 20) {
    assignedUserId = 104;
  } else if (user?.id === 2) {
    assignedUserId = 1;
  } else if (user?.id === 4) {
    assignedUserId = 184;
  } else {
    assignedUserId = null;
  }

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
        placeholder="Search by Consultant ID"
        value={searchInput}
        style={{
          marginLeft: "25px",
          height: "-webkit-fill-available",
          width: "20%",
        }}
        onChange={handleConsultantSearch}
      />
    </div>
  );

  const totalPage = fetchData?.meta?.total_page || 1;

  const getConsultantRoute = (item) => {
    const consultantType = item.consultant_details?.consultant_type;
    const foreigner = item.description?.is_consultant_foreigner;
    const navigationRoute = { 1: `/astrologer/${item.consultant_id}`, 2: `/coaches/${item.consultant_id}`, 3: `/listeners/${item.consultant_id}` };
    const baseRoute = navigationRoute[consultantType] || "";
    return !foreigner ? `${baseRoute}?status=3&type=91` : `${baseRoute}?status=3`;
  };

  const getTypeLabel = (type) => ({ 1: "A", 2: "C", 3: "L" }[type] || "");

  if (isLoading) {
    return (
      <span className="loadPage">
        <Atom color="#1c2434" size="medium" text="" textColor="" />
      </span>
    );
  }

  return (
    <div className="url-page">
      {/* ===== MOBILE CARD VIEW ===== */}
      <div className="url-mobile-view">
        {/* Search */}
        <div className="urlm-search-bar">
          <Search size={16} className="urlm-search-icon" />
          <input
            className="urlm-search-input"
            placeholder="Search by Consultant ID..."
            value={searchInput}
            onChange={handleMobileSearch}
          />
          {searchInput && (
            <button
              className="urlm-clear-btn"
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

        {/* Status filter */}
        <div className="urlm-search-type">
          <span className="urlm-search-label">Status:</span>
          {[
            { label: "All", value: null },
            { label: "Active", value: 1 },
            { label: "Inactive", value: 0 },
          ].map((sf) => (
            <button
              key={String(sf.value)}
              className={`urlm-pill ${status === sf.value ? "urlm-pill-active" : ""}`}
              onClick={() => { setStatus(sf.value); setPage(1); }}
            >
              {sf.label}
            </button>
          ))}
        </div>

        {/* Cards */}
        <div className="urlm-cards">
          {isFetching ? (
            Array.from({ length: 6 }).map((_, i) => (
              <div className="urlm-card urlm-card-skeleton" key={`skeleton-${i}`}>
                <div className="urlm-skeleton-row">
                  <div className="urlm-skeleton-line" style={{ width: "55%", height: "14px" }} />
                  <div className="urlm-skeleton-line" style={{ width: "15%", height: "20px" }} />
                </div>
                <div className="urlm-skeleton-row" style={{ marginTop: 8 }}>
                  <div className="urlm-skeleton-line" style={{ width: "40%" }} />
                  <div className="urlm-skeleton-line" style={{ width: "40%" }} />
                </div>
              </div>
            ))
          ) : data.length === 0 ? (
            <div className="urlm-empty">No consultants found</div>
          ) : (
            data.map((item) => {
              const consultantName = item.consultant_details?.display_name || "Unknown";
              const consultantType = item.consultant_details?.consultant_type;
              const foreigner = item.description?.is_consultant_foreigner;
              const typeLabel = getTypeLabel(consultantType);
              const route = getConsultantRoute(item);

              return (
                <div className="urlm-card" key={item.id} style={{ gap: "6px", padding: "12px 14px" }}>
                  {/* Row 1: Consultant name + Toggle */}
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <Link to={route} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                        <span style={{
                          fontSize: "15px",
                          fontWeight: 600,
                          color: foreigner ? "#1889beff" : "#d97706",
                          fontStyle: foreigner ? "italic" : "normal",
                        }}>
                          {consultantName}
                        </span>
                        <span style={{ fontSize: "14px", color: "var(--text-secondary, #64748b)" }}>({item.consultant_id})</span>
                        {typeLabel && (
                          <span style={{
                            fontSize: "11px",
                            fontWeight: 700,
                            color: "#187cbeff",
                            background: "rgba(24,124,190,0.1)",
                            padding: "2px 6px",
                            borderRadius: "4px",
                          }}>
                            {typeLabel}
                          </span>
                        )}
                      </div>
                    </Link>
                    <MobileStatusSwitch item={item} />
                  </div>

                  {/* Row 2: Created + Updated */}
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%" }}>
                    <span style={{ fontSize: "12px", color: "var(--text-secondary, #64748b)" }}>
                      Created: <strong style={{ color: "var(--text-primary, #1e293b)" }}>{formatDateTime(item.createdAt)}</strong>
                    </span>
                    <span style={{
                      fontSize: "12px",
                      fontWeight: 600,
                      color: item.status == 1 ? "#10b981" : "#ef4444",
                    }}>
                      {item.status == 1 ? "Active" : "Inactive"}
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
          tableTitle="Consultant User Notification"
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
  );
};

export default ConsultantUserNotification;
