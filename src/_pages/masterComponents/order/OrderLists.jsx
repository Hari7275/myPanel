// OrderLists.js - Updated to navigate instead of modal
import React, { useMemo, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux"; // Added
import DyCommonTable from "../../../_components/table/DyCommonTable";
import { COLUMNORDER } from "./orderColumn";
import {
  useGetOrderListQuery,
  useUpdateAgoraCredentialsToJoinCallMutation,
} from "../../../_store/api";
import { Atom } from "react-loading-indicators";
import { ArrowRight, Pencil, Phone } from "lucide-react";
import CompleteOrder from "./CompleteOrder";
import RefundBalance from "./RefundBalance";
import { debounce } from "lodash";
import Button from "@mui/material/Button";
import FilterPopover from "../../../_components/reuseComponents/PopoverComponent";
import { toast } from "react-toastify";
import usePermissions from "../../../_components/reuseComponents/permission/EmpPermission";

const OrderLists = () => {
  const navigate = useNavigate();

  // Added: Get user from Redux auth slice
  const { user } = useSelector((state) => state.auth);
  const permissions = usePermissions();

  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(50);
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
    startDate: "",
    endDate: "",
    orderType: "",
    status: "",
    userMode: "",
  });

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
    error,
  } = useGetOrderListQuery(queryParams);

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

  const columns = useMemo(
    () => [
      ...COLUMNORDER,
      {
        Header: () => <div className="actions-header">Actions</div>,
        id: "actions",
        Cell: ({ row }) => (
          <>
            <div className="actions-cell">
              {/* Join Call Button - Show for running calls (status == 3) */}
              {row.original.status == 3 && (
                <span
                  title="Join Call"
                  className="joinIcon"
                  style={{
                    height: "35px",
                    width: "35px",
                    marginRight: "8px",
                    cursor: isJoining ? "not-allowed" : "pointer",
                    opacity: isJoining ? 0.5 : 1,
                  }}
                >
                  {permissions?.["orders"]?.includes("monitor_order") &&
                    row.original.consultant_id !== 1 && (
                      <Phone
                        className="iconSmall"
                        style={{ color: "#10b981" }}
                        onClick={() => !isJoining && joinChannel(row.original)}
                      />
                    )}
                </span>
              )}

              {/* Edit Button */}
              {row.original.status == 3 && (
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
                !row.original.is_refunded && (
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
    ],
    [isJoining, navigate]
  );

  useEffect(() => {
    if (fetchData) {
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
    500
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
    console.log("Applied filters:", filterData);
  };

  const appliedFilterCount = Object.values(appliedFilters).filter(
    (val) => val !== "" && val !== null && val !== undefined
  ).length;

  const handleRunningFilter = () => {
    setAppliedFilters({ ...appliedFilters, status: 3 });
    setPage(1);
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
        placeholder="Search by order id"
        style={{
          // marginLeft: "25px",
          height: "-webkit-fill-available",
          width: "15%",
        }}
        onChange={handleOrdrIdSearch}
      />

      <input
        className="inputBox"
        placeholder="Search by consultant id"
        style={{
          marginLeft: "25px",
          height: "-webkit-fill-available",
          width: "15%",
          marginLeft: "25px",
        }}
        onChange={handleConsultantIdSearch}
      />
      <input
        className="inputBox"
        placeholder="Search by user id"
        style={{
          marginLeft: "25px",
          height: "-webkit-fill-available",
          width: "15%",
        }}
        onChange={handleUserIdSearch}
      />

      <div
        style={{ marginLeft: "20px", position: "relative" }}
        className="filter-button-wrapper"
      >
        <Button
          variant="contained"
          onClick={() => setShowFilterPopover(!showFilterPopover)}
        >
          Filter
          <span style={{ marginLeft: "10px", color: "#dcfe01ff" }}>
            {appliedFilterCount == 0 ? null : appliedFilterCount}
          </span>
        </Button>

        <FilterPopover
          isOpen={showFilterPopover}
          onClose={() => setShowFilterPopover(false)}
          onApplyFilter={handleApplyFilter}
          initialFilters={appliedFilters}
        />
      </div>

      <div
        style={{ marginLeft: "20px", position: "relative" }}
        className="filter-button-wrapper"
      >
        <Button
          variant="contained"
          style={{
            backgroundColor: "#6165d0ff",
            color: "white",
          }}
          onClick={handleRunningFilter}
        >
          Running Call
          {runningCallCount > 0 && (
            <span style={{ marginLeft: "10px", color: "#dcfe01ff" }}>
              {runningCallCount}
            </span>
          )}
        </Button>
      </div>
    </div>
  );

  const totalPage = fetchData?.meta?.total_page || 1;

  if (isLoading) {
    return (
      <span className="loadPage">
        <Atom color="#1c2434" size="medium" text="" textColor="" />
      </span>
    );
  }
  if (error) return <p>Error fetching data: {error?.data?.message}</p>;

  return (
    <div>
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
      />

      {/* Complete Order Modal */}
      {addOrder && (
        <CompleteOrder
          isOpen={addOrder}
          onClose={toggleCompleteOrder}
          selectedRow={selectedRow}
        />
      )}

      {/* Refund Balance Modal */}
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
