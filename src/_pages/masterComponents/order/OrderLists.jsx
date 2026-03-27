// OrderLists.js - Updated to navigate instead of modal
import React, { useMemo, useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux"; // Added
import DyCommonTable from "../../../_components/table/DyCommonTable";
import { COLUMNORDER } from "./orderColumn";
import {
  useGetOrderListQuery,
  useUpdateAgoraCredentialsToJoinCallMutation,
} from "../../../_store/api";
import { Atom } from "react-loading-indicators";
import { ArrowRight, Pencil, Phone, Plus, ArrowLeft, Search, X, Clock, PhoneCall, MessageSquare, Video } from "lucide-react";
import { OrderStatus, getStatusColor } from "../../../_constants/consultantConstant";
import CompleteOrder from "./CompleteOrder";
import RefundBalance from "./RefundBalance";
import { debounce } from "lodash";
import FilterPopover from "../../../_components/reuseComponents/PopoverComponent";
import { toast } from "react-toastify";
import usePermissions from "../../../_components/reuseComponents/permission/EmpPermission";
import "./OrderLists.css";

const OrderLists = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // 🧠 Read URL Params
  const queryParam = new URLSearchParams(location.search);
  const initialPage = Number(queryParam.get("page")) || 1;
  const initialPageSize = Number(queryParam.get("pageSize")) || 50;
  const initialStatus = queryParam.get("status") ? Number(queryParam.get("status")) : "";
  const initialStartDate = queryParam.get("startDate") || "";
  const initialEndDate = queryParam.get("endDate") || "";
  const initialOrderType = queryParam.get("orderType") || "";
  const initialUserMode = queryParam.get("userMode") || "";

  // Added: Get user from Redux auth slice,
  const { user } = useSelector((state) => state.auth);
  const permissions = usePermissions();

  const [data, setData] = useState([]);
  const [page, setPage] = useState(initialPage);
  const [pageSize, setPageSize] = useState(initialPageSize);
  const [dynamicPagination, setDynamicPagination] = useState(true);
  const [addOrder, setAddOrder] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [refundBalance, setRefundBalance] = useState(false);
  const [userId, setUserId] = useState(null);
  const [orderId, setOrderId] = useState(null);
  const [consultantId, setConsultantId] = useState(null);
  const [runningCallCount, setRunningCallCount] = useState(0);

  // Filter states
  const [showFilterPopover, setShowFilterPopover] = useState(false);
  const [appliedFilters, setAppliedFilters] = useState({
    startDate: initialStartDate,
    endDate: initialEndDate,
    orderType: initialOrderType,
    status: initialStatus,
    userMode: initialUserMode,
  });

  // 🧭 Keep URL params synced when page, pageSize, or filters change
  useEffect(() => {
    const params = new URLSearchParams();
    params.set("page", page);
    params.set("pageSize", pageSize);
    const filterKeys = ["status", "startDate", "endDate", "orderType", "userMode"];
    filterKeys.forEach((key) => {
      if (appliedFilters[key]) {
        params.set(key, appliedFilters[key]);
      }
    });
    navigate(`?${params.toString()}`, { replace: true });
  }, [page, pageSize, appliedFilters, navigate]);

  // Build query params including filters
  const queryParams = {
    page,
    size: pageSize,
    ...(orderId && orderId.trim() !== "" ? { id: orderId } : {}),
    ...(userId && userId.trim() !== "" ? { user_id: userId } : {}),
    ...(consultantId && consultantId.trim() !== ""
      ? { consultant_id: consultantId }
      : {}),
    ...(appliedFilters.startDate
      ? { start_date: appliedFilters.startDate }
      : {}),
    ...(appliedFilters.endDate ? { end_date: appliedFilters.endDate } : {}),
    ...(appliedFilters.orderType
      ? { order_type: appliedFilters.orderType }
      : {}),
    ...(appliedFilters.status ? { status: appliedFilters.status } : {}),
    ...(appliedFilters.userMode ? { userMode: appliedFilters.userMode } : {}),
  };

  const {
    data: fetchData,
    isLoading,
    isFetching,
    error,
    refetch,
  } = useGetOrderListQuery(queryParams, {
    refetchOnMountOrArgChange: true, //
  });

  const [updateAgoraCredentials, { isLoading: isJoining }] =
    useUpdateAgoraCredentialsToJoinCallMutation();

  const toggleCompleteOrder = (value) => {
    setSelectedRow(value);
    setAddOrder(!addOrder);
  };

  const toggleRefundBalance = (value) => {
    setSelectedRow(value);
    setRefundBalance(!refundBalance);
  };

  // Updated Join Channel function with conditional user_id assignment
  const joinChannel = async (orderData) => {
    try {
      // Determine user_id based on logged-in user's id
      let assignedUserId;

      if (user?.id === 20) {
        assignedUserId = 104;
      } else if (user?.id === 2) {
        assignedUserId = 1;
      } else if (user?.id === 4) {
        assignedUserId = 184;
      } else {
        // Default fallback - use orderData.user_id for other cases
        assignedUserId = null;
      }

      const requestBody = {
        user_id: assignedUserId,
        order_id: orderData.id || orderData.order_id,
      };

      console.log("Fetching channel credentials:", requestBody);
      console.log("Logged-in user ID:", user?.id);
      toast.info("Fetching call credentials...");

      const response = await updateAgoraCredentials({
        body: requestBody,
      }).unwrap();

      console.log("Join channel response:", response);

      if (response && response.data) {
        const { channel, user_token, uid } = response.data;

        if (!channel) {
          toast.error("Missing channel name in server response");
          console.error("Missing channel in response:", response);
          return;
        }

        // Navigate to audio call page with credentials
        navigate("/audio-call", {
          state: {
            credentials: {
              appId: "0bbb5db82c6b440f95944b3fda1f9bd1",
              channel: channel || orderData.id,
              token: user_token || null,
              uid: assignedUserId || null,
              orderData,
            },
          },
        });

        toast.success("Navigating to call...");
      } else {
        console.error("Invalid response structure:", response);
        toast.error("Invalid response from server");
      }
    } catch (err) {
      console.error("Error fetching channel credentials:", err);
      toast.error(err?.data?.message || "Failed to fetch call credentials");
    }
  };

  const handleClearAllFilters = () => {
    // Reset all filters to empty
    setAppliedFilters({
      status: "",
    });
    setPage(1);

    // Optional: Show success message
    toast.success("All filters cleared");
  };

  const hasAnyOrderAction =
    permissions?.["orders"]?.includes("monitor_order") ||
    permissions?.["orders"]?.includes("complete_order") ||
    permissions?.["orders"]?.includes("refund_order");

  const columns = useMemo(
    () => [
      ...COLUMNORDER,
      ...(hasAnyOrderAction
        ? [
            {
              Header: () => <div className="actions-header">Actions</div>,
              id: "actions",
              Cell: ({ row }) => (
                <>
                  <div className="actions-cell">
                    {/* Join Call Button - Show for running calls (status == 3) */}
                    {row.original.status == 3 &&
                      permissions?.["orders"]?.includes("monitor_order") &&
                      row.original.consultant_id !== 1 && (
                        <span
                          // title="Join Call"
                          className="joinIcon secondIcon"
                          style={{
                            height: "35px",
                            width: "35px",
                            marginRight: "8px",
                            cursor: isJoining ? "not-azllowed" : "pointer",
                            opacity: isJoining ? 0.5 : 1,
                          }}
                        >
                          <ArrowLeft
                            className="iconSmall"
                            style={{ color: "#e9eeedff" }}
                            onClick={() => !isJoining && joinChannel(row.original)}
                          />
                        </span>
                      )}

                    {/* Complete Order Button */}
                    {row.original.status == 3 &&
                      permissions?.["orders"]?.includes("complete_order") && (
                      <span
                        title="view details"
                        className="secondIcon"
                        style={{ height: "35px", width: "35px" }}
                      >
                        <Pencil
                          className="iconSmall"
                          onClick={() => toggleCompleteOrder(row.original)}
                        />
                      </span>
                    )}

                    {/* Refund Button */}
                    {row.original.status == 4 &&
                      row.original.order_type !== 6 &&
                      !row.original.is_refunded &&
                      permissions?.["orders"]?.includes("refund_order") && (
                        <span className="editIcon">
                          <ArrowRight
                            className="iconSmall"
                            onClick={() => toggleRefundBalance(row.original)}
                          />
                        </span>
                      )}
                  </div>
                </>
              ),
            },
          ]
        : []),
    ],
    [isJoining, navigate, hasAnyOrderAction],
  );

  useEffect(() => {
    if (fetchData && fetchData?.data) {
      setData(fetchData?.data || []);
      // Calculate how many are "Running" (status = 3)
      const runningCalls = fetchData?.data?.filter((item) => item.status === 3);
      setRunningCallCount(runningCalls.length);
    }
  }, [fetchData]);

  const debouncedSearchOrderId = debounce((value) => setOrderId(value), 500);
  const debouncedSearchUserId = debounce((value) => setUserId(value), 500);
  const debouncedSearchConsultantId = debounce(
    (value) => setConsultantId(value),
    500,
  );

  const handleOrdrIdSearch = (e) => {
    setPage(1);
    debouncedSearchOrderId(e?.target?.value);
  };

  const handleUserIdSearch = (e) => {
    setPage(1);
    debouncedSearchUserId(e?.target?.value);
  };

  const handleConsultantIdSearch = (e) => {
    setPage(1);
    debouncedSearchConsultantId(e?.target?.value);
  };

  const handleApplyFilter = (filterData) => {
    setAppliedFilters(filterData);
    setPage(1);
  };

  const appliedFilterCount = Object.values(appliedFilters).filter(
    (val) => val !== "" && val !== null && val !== undefined,
  ).length;

  const handleRunningFilter = () => {
    setAppliedFilters({ ...appliedFilters, status: 3 });
    setPage(1);
  };

  const customFilterComponent = () => (
    <div className="ol-filter-bar">
      <input
        className="ol-search-input"
        placeholder="Search by order id"
        onChange={handleOrdrIdSearch}
      />
      <input
        className="ol-search-input"
        placeholder="Search by consultant id"
        onChange={handleConsultantIdSearch}
      />
      <input
        className="ol-search-input"
        placeholder="Search by user id"
        onChange={handleUserIdSearch}
      />

      <div style={{ position: "relative" }} className="filter-button-wrapper">
        <button
          className={`ol-btn ol-btn-filter${appliedFilterCount > 0 ? " ol-btn-active" : ""}`}
          onClick={() => setShowFilterPopover(!showFilterPopover)}
        >
          Filter
          {appliedFilterCount > 0 && (
            <span className="ol-btn-badge">{appliedFilterCount}</span>
          )}
        </button>
        <FilterPopover
          isOpen={showFilterPopover}
          onClose={() => setShowFilterPopover(false)}
          onApplyFilter={handleApplyFilter}
          initialFilters={appliedFilters}
        />
      </div>

      <button className={`ol-btn ol-btn-running${appliedFilters.status === 3 ? " ol-btn-running-active" : ""}`} onClick={handleRunningFilter}>
        Running Call
        {runningCallCount > 0 && (
          <span className="ol-btn-badge">{runningCallCount}</span>
        )}
      </button>

      <button
        className="ol-btn ol-btn-clear"
        onClick={handleClearAllFilters}
        disabled={appliedFilterCount === 0 && !orderId && !userId && !consultantId}
      >
        Clear Filters
      </button>
    </div>
  );

  const totalPage = fetchData?.meta?.total_page || 1;

  // Mobile search type toggle
  const [searchType, setSearchType] = useState("order");
  const [mobileSearchValue, setMobileSearchValue] = useState("");

  const handleMobileSearch = (e) => {
    const value = e.target.value;
    setMobileSearchValue(value);
    setPage(1);
    if (searchType === "order") {
      debouncedSearchOrderId(value);
      setUserId("");
      setConsultantId("");
    } else if (searchType === "user") {
      debouncedSearchUserId(value);
      setOrderId("");
      setConsultantId("");
    } else if (searchType === "consultant") {
      debouncedSearchConsultantId(value);
      setOrderId("");
      setUserId("");
    }
  };

  const handleSearchTypeChange = (type) => {
    setSearchType(type);
    setMobileSearchValue("");
    setOrderId("");
    setUserId("");
    setConsultantId("");
    setPage(1);
  };

  const statusFilters = [
    { label: "All", value: "" },
    { label: "Running", value: 3 },
    { label: "Completed", value: 4 },
    { label: "Pending", value: 1 },
    { label: "Confirmed", value: 2 },
    { label: "Cancelled", value: 6 },
    { label: "Rejected", value: 5 },
    { label: "Waiting", value: 7 },
    { label: "User No Response", value: 8 },
    { label: "Consultant No Response", value: 9 },
  ];

  const getOrderTypeIcon = (type) => {
    switch (Number(type)) {
      case 1: return <MessageSquare size={20} />;
      case 2: return <PhoneCall size={20} />;
      case 3: return <Video size={20} color="#38bdf8" />;
      default: return <Phone size={20} />;
    }
  };


  return (
    <div className="ol-page">
      {/* ===== MOBILE CARD VIEW ===== */}
      <div className="ol-mobile-view">
        {/* Search */}
        <div className="olm-search-bar">
          <Search size={16} className="olm-search-icon" />
          <input
            className="olm-search-input"
            placeholder={`Search by ${searchType} ID...`}
            value={mobileSearchValue}
            onChange={handleMobileSearch}
          />
          {mobileSearchValue && (
            <button
              className="olm-clear-btn"
              onClick={() => {
                setMobileSearchValue("");
                setOrderId("");
                setUserId("");
                setConsultantId("");
                setPage(1);
              }}
            >
              <X size={16} />
            </button>
          )}
        </div>

        {/* Search type pills */}
        <div className="olm-search-type">
          <span className="olm-search-label">Search by:</span>
          {[
            { key: "order", label: "Order ID" },
            { key: "user", label: "User ID" },
            { key: "consultant", label: "Consultant ID" },
          ].map((t) => (
            <button
              key={t.key}
              className={`olm-pill ${searchType === t.key ? "olm-pill-active" : ""}`}
              onClick={() => handleSearchTypeChange(t.key)}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Filter popover */}
        <div style={{ position: "relative" }}>
          <FilterPopover
            isOpen={showFilterPopover}
            onClose={() => setShowFilterPopover(false)}
            onApplyFilter={handleApplyFilter}
            initialFilters={appliedFilters}
          />
        </div>

        {/* Status tabs */}
        <div className="olm-status-tabs">
          {statusFilters.map((sf) => (
            <button
              key={sf.value}
              className={`olm-tab ${appliedFilters.status === sf.value ? "olm-tab-active" : ""}`}
              onClick={() => {
                setAppliedFilters({ ...appliedFilters, status: sf.value });
                setPage(1);
              }}
            >
              {sf.label}
              {sf.value === 3 && runningCallCount > 0 && (
                <span className="olm-tab-badge">{runningCallCount}</span>
              )}
            </button>
          ))}
        </div>

        {/* Order Cards */}
        <div className="olm-cards">
          {isFetching ? (
            Array.from({ length: 5 }).map((_, i) => (
              <div className="olm-card olm-card-skeleton" key={`skeleton-${i}`}>
                <div className="olm-skeleton-row">
                  <div className="olm-skeleton-line" style={{ width: "45%" }} />
                  <div className="olm-skeleton-line" style={{ width: "25%" }} />
                </div>
                <div className="olm-skeleton-line" style={{ width: "60%", marginTop: 6 }} />
                <div className="olm-skeleton-line" style={{ width: "40%", marginTop: 4 }} />
                <div className="olm-skeleton-row" style={{ marginTop: 8 }}>
                  <div className="olm-skeleton-badge" />
                  <div className="olm-skeleton-badge" />
                  <div className="olm-skeleton-badge" />
                </div>
              </div>
            ))
          ) : data.length === 0 ? (
            <div className="olm-empty">No orders found</div>
          ) : (
            data.map((order) => {
              const status = OrderStatus(order.status);
              const statusColor = getStatusColor(order.status);
              const startDate = order.createdAt ? new Date(order.createdAt) : null;
              const timeStr = startDate
                ? startDate.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })
                : "";
              const consultantName = order.description?.consultant_first_name || "—";
              const consultantTypeFull = { 1: "Astrologer", 2: "Coach", 3: "Listener" };
              const consultantTypeLabel = consultantTypeFull[order.description?.consultant_type] || "Consultant";
              const userName = order.description?.userData?.name || "USER";

              return (
                <div className="olm-card" key={order.id}>
                  {/* Card Header */}
                  <div className="olm-card-header">
                    <div className="olm-card-id">
                      {getOrderTypeIcon(order.order_type)}
                      <span className="olm-order-id">#{order.id}</span>
                      <span className="olm-order-time">({timeStr})</span>
                    </div>
                    <span className="olm-status" style={{ color: statusColor }}>
                      <span className="olm-status-dot" style={{ background: statusColor }} />
                      {status}
                    </span>
                  </div>

                  {/* Card Body */}
                  <div className="olm-card-body">
                    <div className="olm-card-info" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <div>
                        <span className="olm-label">{consultantTypeLabel}:</span>
                        <span className="olm-value olm-value-consultant">{consultantName}</span>
                      </div>
                      {order.actual_duration != null && (
                        <div className="olm-duration" style={{ margin: 0 }}>
                          <Clock size={18} />
                          <span>{order.actual_duration} min</span>
                        </div>
                      )}
                    </div>
                    <div className="olm-card-info">
                      <span className="olm-label">User:</span>
                      <span className="olm-value">{userName}</span>
                    </div>
                  </div>

                  {/* Card Footer */}
                  <div className="olm-card-footer">
                    <span className="olm-badge olm-badge-cid">C <strong>{order.consultant_id}</strong></span>
                    <span className="olm-badge">U <strong>{order.user_id}</strong></span>


                    <div className="olm-card-actions">
                      {order.status === 3 && permissions?.["orders"]?.includes("monitor_order") && order.consultant_id !== 1 && (
                        <button className="olm-action-btn olm-action-join" onClick={() => !isJoining && joinChannel(order)}>
                          <ArrowLeft size={20} />
                        </button>
                      )}
                      {order.status === 3 && permissions?.["orders"]?.includes("complete_order") && (
                        <button className="olm-action-btn olm-action-edit" onClick={() => toggleCompleteOrder(order)}>
                          <Pencil size={20} />
                        </button>
                      )}
                      {order.status === 4 && order.order_type !== 6 && !order.is_refunded && permissions?.["orders"]?.includes("refund_order") && (
                        <button className="olm-action-btn olm-action-refund" onClick={() => toggleRefundBalance(order)}>
                          <ArrowRight size={20} />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Pagination */}
        <div className="olm-pagination">
          <button className="olm-page-btn" disabled={page <= 1} onClick={() => { setPage(page - 1); document.querySelector('.ol-page')?.scrollTo(0, 0); }}>Prev</button>
          <span className="olm-page-info">{page} / {totalPage}</span>
          <button className="olm-page-btn" disabled={page >= totalPage} onClick={() => { setPage(page + 1); document.querySelector('.ol-page')?.scrollTo(0, 0); }}>Next</button>
        </div>
      </div>

      {/* ===== DESKTOP TABLE VIEW ===== */}
      <div className="ol-desktop-view">
        <div className="ol-table-card">
          <DyCommonTable
            columns={columns}
            data={data}
            includeActions={false}
            tableTitle="Order List"
            dynamicPagination={dynamicPagination}
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

      {addOrder && (
        <CompleteOrder
          isOpen={addOrder}
          onClose={toggleCompleteOrder}
          selectedRow={selectedRow}
        />
      )}

      {refundBalance && (
        <RefundBalance
          isOpen={refundBalance}
          onClose={toggleRefundBalance}
          selectedRow={selectedRow}
        />
      )}
    </div>
  );
};

export default OrderLists;
