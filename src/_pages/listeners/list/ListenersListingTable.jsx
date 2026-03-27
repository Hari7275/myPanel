import React, { useMemo, useState, useEffect } from "react";
import DyCommonTable from "../../../_components/table/DyCommonTable";
import { LISTENERSCOLUMNS } from "./listenersListingColumn";
import { ArrowRight, Pencil, KeyRound, BarChart3, Search, X, ChevronLeft, ChevronRight, SlidersHorizontal } from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import EditStatus from "../../../_components/reuseComponents/EditStatus";
import { useGetConsultantsListQuery } from "../../../_store/api";
import { debounce } from "lodash";
import usePermissions from "../../../_components/reuseComponents/permission/EmpPermission";
import { useSelector } from "react-redux";
import AstrologerListFilter from "../../astrologers/list/AstrologerListFilter";
import AssignOnboardingToAdmin from "../../../_components/reuseComponents/AssignOnboardingToAdmin";
import ListenerRegisteredGraph from "./ListenerRegisteredGraph";
import {
  getStatusLabel,
  getStatusColorConsultant,
  getGenderLabelInSort,
} from "../../../_constants/consultantConstant";
import "./ListenersListingTable.css";

const ListenersListingTable = () => {
  const location = useLocation();
  const navigate = useNavigate();
  // 🧠 Read URL Params
  const queryParams = new URLSearchParams(location.search);
  const initialPage = Number(queryParams.get("page")) || 1;
  const initialPageSize = Number(queryParams.get("pageSize")) || 50;
  const initialStatusFilter = queryParams.get("status") || ""; // Read initial status filter from URL

  const [page, setPage] = useState(initialPage);
  const [pageSize, setPageSize] = useState(initialPageSize);

  const [selectedRow, setSelectedRow] = useState(null);
  const [showEditStatus, setShowEditStatus] = useState(false);
  const [showOnboardingAssignTask, setShowOnboardingAssignTask] =
    useState(false);
  const [isReassign, setIsReassign] = useState(false); // New state for reassign
  const [showGraph, setShowGraph] = useState(false);
  const [data, setData] = useState([]);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [consultantId, setConsultantId] = useState("");
  const [dynamicPagination] = useState(true);
  const { user } = useSelector((state) => state.auth);
  let [profileStatus, SetProfileStatus] = useState(null);
  const permissions = usePermissions();

  // Mobile search state
  const [mobileSearchValue, setMobileSearchValue] = useState("");
  const [searchType, setSearchType] = useState("name");
  const [showMobileStatusFilter, setShowMobileStatusFilter] = useState(false);

  // Filter states
  const [showFilterPopover, setShowFilterPopover] = useState(false);
  const [appliedFilters, setAppliedFilters] = useState({
    startDate: "",
    endDate: "",
    orderType: "",
    status: initialStatusFilter,
  });

  // 🧭 Keep URL params synced when page or pageSize changes
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    params.set("page", page);
    params.set("pageSize", pageSize);
    params.set("status", appliedFilters.status); // Include status filter in URL
    navigate(`?${params.toString()}`, { replace: true });
  }, [page, pageSize, navigate, appliedFilters.status]);

  const {
    data: fetchData,
    isLoading,
    isFetching,
    error,
  } = useGetConsultantsListQuery({
    page,
    size: pageSize,
    name: name,
    email,
    auth_status: appliedFilters?.status,
    id: consultantId,
    phone,
    consultant_type: 3,
  });

  useEffect(() => {
    if (fetchData && fetchData?.data && fetchData?.data?.records) {
      const consultantData = fetchData?.data?.records?.filter(
        (record) => record?.consultant_type === 3,
      );
      setData(consultantData);
    } else {
      setData([]);
    }
  }, [fetchData]);

  const totalPage = fetchData?.data?.total_records
    ? Math.ceil(fetchData.data.total_records / pageSize)
    : 1;

  useEffect(() => {
    if (location.state) {
      setPage(location.state.previousPage);
      setPageSize(location.state.previousPageSize);
    }
  }, [location.state]);

  const toggleEditStatus = (row) => {
    setShowEditStatus(!showEditStatus);

    console.log("row........", row);
    SetProfileStatus(row.status);
    console.log("profileStatus........", row.status);
    setSelectedRow(row);
  };

  // Updated function to accept reassign parameter
  const toggleOnboardingStatus = (row, reassign = false) => {
    setShowOnboardingAssignTask(!showOnboardingAssignTask);
    setSelectedRow(row);
    setIsReassign(reassign);
  };

  const columns = useMemo(
    () => [
      ...LISTENERSCOLUMNS,
      {
        Header: () => <div className="actions-header">Actions</div>,
        id: "actions",
        Cell: ({ row }) => (
          <div className="actions-cell">
            {permissions?.["listener"]?.includes("view_listener_profile") && (
              <Link
                to={`/listeners/${row.original.id}?status=${row.original.status}&type=${row.original.phone_code}`}
              >
                <span
                  title="View details"
                  className="secondIcon"
                  style={{
                    display: "inline-block",
                    height: "35px",
                    width: "35px",
                  }}
                >
                  <ArrowRight className="iconSmall" />
                </span>
              </Link>
            )}

            {[3, 4, 5, 2, 8].includes(row?.original?.status) &&
              permissions?.["listener"]?.includes(
                "update_listener_profile_status",
              ) && (
                <span className="editIcon">
                  <Pencil
                    className="iconSmall"
                    onClick={() => toggleEditStatus(row.original)}
                  />
                </span>
              )}

            {/* New Assignment - is_assign == 0 */}
            {[2].includes(row?.original?.status) &&
              row.original.is_assign === 0 &&
              permissions?.["onboarding"]?.includes("onboarding_assign") && (
                <span className="editIcon" style={{ background: "#c65252ff" }}>
                  <KeyRound
                    className="iconSmall"
                    onClick={() => toggleOnboardingStatus(row.original, false)}
                  />
                </span>
              )}

            {/* Reassignment - is_assign == 1 */}
            {[2].includes(row?.original?.status) &&
              row.original.is_assign === 1 &&
              permissions?.["onboarding"]?.includes("onboarding_assign") && (
                <span className="editIcon" style={{ background: "#543376fa" }}>
                  <KeyRound
                    className="iconSmall"
                    onClick={() => toggleOnboardingStatus(row.original, true)}
                  />
                </span>
              )}
          </div>
        ),
      },
    ],
    [permissions],
  );

  // Apply debounce to search handlers
  const debouncedSearchName = debounce((value) => setName(value), 500);
  const debouncedSearchEmail = debounce((value) => setEmail(value), 500);
  const debouncedSearchConsultantId = debounce(
    (value) => setConsultantId(value),
    500,
  );
  const debouncedSearchPhone = debounce((value) => setPhone(value), 500);
  const handleNameSearch = (e) => {
    setPage(1);
    debouncedSearchName(e?.target?.value);
  };

  const handleEmailSearch = (e) => {
    setPage(1);
    debouncedSearchEmail(e?.target?.value);
  };

  const handleConsultantIdSearch = (e) => {
    setPage(1);
    debouncedSearchConsultantId(e?.target?.value);
  };

  const handleConsultantPhoneSearch = (e) => {
    setPage(1);
    debouncedSearchPhone(e?.target?.value);
  };

  // Mobile search
  const handleMobileSearch = (e) => {
    const value = e.target.value;
    setMobileSearchValue(value);
    setPage(1);
    if (searchType === "name") debouncedSearchName(value);
    else if (searchType === "id") debouncedSearchConsultantId(value);
    else if (searchType === "email") debouncedSearchEmail(value);
    else if (searchType === "phone") debouncedSearchPhone(value);
  };

  const handleSearchTypeChange = (type) => {
    setSearchType(type);
    setMobileSearchValue("");
    setName("");
    setEmail("");
    setConsultantId("");
    setPhone("");
    setPage(1);
  };

  const handleMobileStatusFilter = (statusValue) => {
    setAppliedFilters((prev) => ({ ...prev, status: statusValue }));
    setShowMobileStatusFilter(false);
    setPage(1);
  };

  const statusOptions = [
    { value: "", label: "All Types" },
    { value: "1", label: "Registered" },
    { value: "2", label: "Pending" },
    { value: "3", label: "Verified" },
    { value: "4", label: "Suspended" },
    { value: "5", label: "Blocked" },
    { value: "6", label: "Rejected" },
    { value: "7", label: "Deleted" },
    { value: "8", label: "Inactive" },
  ];

  const clearMobileSearch = () => {
    setMobileSearchValue("");
    setName("");
    setEmail("");
    setConsultantId("");
    setPhone("");
    setPage(1);
  };

  // Handle filter application
  const handleApplyFilter = (filterData) => {
    setAppliedFilters(filterData);
    setPage(1); // Reset to first page when applying filters.
    console.log("Applied filters:", filterData);
  };

  // Count applied filters (non-empty values)
  const appliedFilterCount = Object.values(appliedFilters).filter(
    (val) => val !== "" && val !== null && val !== undefined,
  ).length;

  const handleClearAllFilters = () => {
    setAppliedFilters({
      startDate: "",
      endDate: "",
      orderType: "",
      status: "",
    });
    setPage(1);
  };

  const customFilterComponent = () => (
    <div className="ll-filter-bar">
      <input
        className="ll-search-input"
        placeholder="Search by Id"
        onChange={handleConsultantIdSearch}
      />
      <input
        className="ll-search-input"
        placeholder="Search by Name"
        onChange={handleNameSearch}
      />
      <input
        className="ll-search-input"
        placeholder="Search by Email"
        onChange={handleEmailSearch}
      />
      <input
        className="ll-search-input"
        placeholder="Search by Phone No."
        onChange={handleConsultantPhoneSearch}
      />

      <select
        className="ll-search-input ll-status-select"
        value={appliedFilters.status}
        onChange={(e) => {
          setAppliedFilters((prev) => ({ ...prev, status: e.target.value }));
          setPage(1);
        }}
      >
        {statusOptions.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>

      <div style={{ position: "relative" }} className="filter-button-wrapper">
        <button
          className={`ll-btn ll-btn-filter${appliedFilterCount > 0 ? " ll-btn-active" : ""}`}
          onClick={() => setShowFilterPopover(!showFilterPopover)}
        >
          Filter
          {appliedFilterCount > 0 && (
            <span className="ll-btn-badge">{appliedFilterCount}</span>
          )}
        </button>

        <AstrologerListFilter
          isOpen={showFilterPopover}
          onClose={() => setShowFilterPopover(false)}
          onApplyFilter={handleApplyFilter}
          initialFilters={appliedFilters}
        />
      </div>

      <button
        className="ll-btn ll-btn-clear"
        onClick={handleClearAllFilters}
        disabled={appliedFilterCount === 0 && !name && !email && !consultantId && !phone}
      >
        Clear Filters
      </button>

      <button
        className="ll-btn ll-btn-graph"
        onClick={() => setShowGraph(true)}
      >
        <BarChart3 size={16} />
      </button>
    </div>
  );

  if (isLoading) {
    return (
      <div>
        {/* Mobile shimmer */}
        <div className="ll-mobile-view">
          {Array.from({ length: 8 }).map((_, i) => (
            <div className="llm-card llm-card-skeleton" key={`init-skeleton-${i}`}>
              <div className="llm-skeleton-row">
                <div className="llm-skeleton-line" style={{ width: "50%", height: "16px" }} />
                <div className="llm-skeleton-line" style={{ width: "22%", height: "16px" }} />
              </div>
              <div className="llm-skeleton-row" style={{ marginTop: 8 }}>
                <div className="llm-skeleton-line" style={{ width: "40%" }} />
                <div className="llm-skeleton-line" style={{ width: "55%" }} />
              </div>
              <div className="llm-skeleton-row" style={{ marginTop: 10 }}>
                <div className="llm-skeleton-line" style={{ width: "35%" }} />
                <div className="llm-skeleton-badge" />
                <div className="llm-skeleton-badge" />
              </div>
            </div>
          ))}
        </div>
        {/* Desktop shimmer */}
        <div className="ll-desktop-view">
          <div className="llm-table-skeleton">
            <div className="llm-table-skeleton-header">
              {Array.from({ length: 8 }).map((_, i) => (
                <div className="llm-skeleton-line" style={{ width: "100%", height: "18px" }} key={`th-${i}`} />
              ))}
            </div>
            {Array.from({ length: 10 }).map((_, i) => (
              <div className="llm-table-skeleton-row" key={`tr-${i}`}>
                {Array.from({ length: 8 }).map((_, j) => (
                  <div className="llm-skeleton-line" style={{ width: "100%", height: "14px" }} key={`td-${i}-${j}`} />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
  if (error) {
    return "Error...";
  }

  return (
    permissions?.["listener"]?.includes("view_listener_list") && (
      <div>
        {/* ===== MOBILE CARD VIEW ===== */}
        <div className="ll-mobile-view">
          {/* Search */}
          <div className="llm-search-bar">
            <Search size={16} className="llm-search-icon" />
            <input
              className="llm-search-input"
              placeholder={`Search by ${searchType === "name" ? "Name" : searchType === "id" ? "ID" : searchType === "email" ? "Email" : "Phone"}...`}
              value={mobileSearchValue}
              onChange={handleMobileSearch}
            />
            {mobileSearchValue && (
              <button className="llm-clear-btn" onClick={clearMobileSearch}>
                <X size={16} />
              </button>
            )}
          </div>

          {/* Search type pills + Filter */}
          <div className="llm-search-type">
            {/* <span className="llm-search-label">Search:</span> */}
            {[
              { key: "name", label: "Name" },
              { key: "id", label: "ID" },
              { key: "email", label: "Email" },
              { key: "phone", label: "Phone" },
            ].map((t) => (
              <button
                key={t.key}
                className={`llm-pill ${searchType === t.key ? "llm-pill-active" : ""}`}
                onClick={() => handleSearchTypeChange(t.key)}
              >
                {t.label}
              </button>
            ))}
            <button
              className={`llm-pill llm-pill-filter ${appliedFilters.status ? "llm-pill-filter-active" : ""}`}
              onClick={() => setShowMobileStatusFilter(!showMobileStatusFilter)}
            >
              <SlidersHorizontal size={14} />
              {appliedFilters.status
                ? statusOptions.find((s) => s.value === appliedFilters.status)?.label
                : "Status"}
            </button>
          </div>

          {/* Status filter dropdown */}
          {showMobileStatusFilter && (
            <div className="llm-status-dropdown">
              {statusOptions.map((opt) => (
                <button
                  key={opt.value}
                  className={`llm-status-option ${appliedFilters.status === opt.value ? "llm-status-option-active" : ""}`}
                  onClick={() => handleMobileStatusFilter(opt.value)}
                >
                  {appliedFilters.status === opt.value && <span className="llm-status-check">✓</span>}
                  {opt.label}
                </button>
              ))}
            </div>
          )}

          {/* Listener Cards */}
          <div className="llm-cards">
            {isFetching ? (
              Array.from({ length: 6 }).map((_, i) => (
                <div className="llm-card llm-card-skeleton" key={`skeleton-${i}`}>
                  <div className="llm-skeleton-row">
                    <div className="llm-skeleton-line" style={{ width: "55%", height: "14px" }} />
                    <div className="llm-skeleton-line" style={{ width: "20%", height: "14px" }} />
                  </div>
                  <div className="llm-skeleton-row" style={{ marginTop: 6 }}>
                    <div className="llm-skeleton-line" style={{ width: "45%" }} />
                    <div className="llm-skeleton-line" style={{ width: "30%" }} />
                  </div>
                  <div className="llm-skeleton-row" style={{ marginTop: 8 }}>
                    <div className="llm-skeleton-badge" />
                    <div className="llm-skeleton-badge" />
                    <div className="llm-skeleton-badge" />
                  </div>
                </div>
              ))
            ) : data.length === 0 ? (
              <div className="llm-empty">No listeners found</div>
            ) : (
              data.map((listener) => {
                const statusText = getStatusLabel(listener.status);
                const statusColor = getStatusColorConsultant(listener.status);
                const genderLabel = getGenderLabelInSort(listener.gender);
                const createdDate = listener.created_at
                  ? new Date(listener.created_at).toLocaleString("en-US", { dateStyle: "medium", timeStyle: "short" })
                  : "";

                return (
                  <div className="llm-card" key={listener.id}>
                    {/* Row 1: Name + ID, Status */}
                    <div className="llm-card-row">
                      <Link
                        to={`/listeners/${listener.id}?status=${listener.status}&type=${listener.phone_code}`}
                        style={{ textDecoration: "none" }}
                      >
                        <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                          <span className="llm-card-name">
                            {listener.display_name || "N/A"}
                            {genderLabel && (
                              <span className={genderLabel === "M" ? "llm-card-gender-m" : "llm-card-gender-f"}>
                                {genderLabel === "M" ? "♂" : "♀"}
                              </span>
                            )}
                          </span>
                          <span className="llm-card-id">({listener.id})</span>
                        </div>
                      </Link>
                      <span className="llm-badge-status" style={{ color: statusColor, background: `${statusColor}18` }}>
                        {statusText}
                      </span>
                    </div>

                    {/* Row 2: Phone + Email */}
                    <div className="llm-card-row">
                      <span className="llm-card-phone">
                        {listener.phoneNumber || "N/A"}
                      </span>
                      <span className="llm-card-email">
                        {listener.email_address || ""}
                      </span>
                    </div>

                    {/* Row 3: Footer - Date + Assigned + Actions */}
                    <div className="llm-card-footer">
                      <span className="llm-card-label">{createdDate}</span>
                      {listener.assign_to_name && (
                        <span className="llm-badge-assign">
                          {listener.assign_to_name}
                        </span>
                      )}
                      <div className="llm-card-action">
                        {permissions?.["listener"]?.includes("view_listener_profile") && (
                          <Link to={`/listeners/${listener.id}?status=${listener.status}&type=${listener.phone_code}`}>
                            <button className="llm-action-btn" title="View Details">
                              <ArrowRight size={18} />
                            </button>
                          </Link>
                        )}
                        {[3, 4, 5, 2, 8].includes(listener.status) &&
                          permissions?.["listener"]?.includes("update_listener_profile_status") && (
                            <button className="llm-action-btn" title="Edit Status" onClick={() => toggleEditStatus(listener)}>
                              <Pencil size={16} />
                            </button>
                          )}
                        {[2].includes(listener.status) &&
                          listener.is_assign === 0 &&
                          permissions?.["onboarding"]?.includes("onboarding_assign") && (
                            <button className="llm-action-btn llm-action-btn-assign" title="Assign" onClick={() => toggleOnboardingStatus(listener, false)}>
                              <KeyRound size={16} />
                            </button>
                          )}
                        {[2].includes(listener.status) &&
                          listener.is_assign === 1 &&
                          permissions?.["onboarding"]?.includes("onboarding_assign") && (
                            <button className="llm-action-btn llm-action-btn-reassign" title="Reassign" onClick={() => toggleOnboardingStatus(listener, true)}>
                              <KeyRound size={16} />
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
          <div className="llm-pagination">
            <button className="llm-page-btn" disabled={page <= 1} onClick={() => setPage(page - 1)}>
              <ChevronLeft size={16} />
            </button>
            <span className="llm-page-info">Page {page} of {totalPage}</span>
            <button className="llm-page-btn" disabled={page >= totalPage} onClick={() => setPage(page + 1)}>
              <ChevronRight size={16} />
            </button>
          </div>
        </div>

        {/* ===== DESKTOP TABLE VIEW ===== */}
        <div className="ll-desktop-view">
          <div className={`ll-table-card${isFetching ? " ll-table-shimmer" : ""}`}>
            <DyCommonTable
              columns={columns}
              data={data}
              tableTitle="Listener list"
              includeActions={false}
              customFilterComponent={customFilterComponent}
              dynamicPagination={dynamicPagination}
              totalPage={totalPage}
              currentPage={page}
              pageSize={pageSize}
              setPage={setPage}
              setPageSize={setPageSize}
              showTableHeading={false}
              includeCheckbox={false}
              showGlobalSearch={false}
              isLoading={isFetching}
            />
          </div>

          {data?.length === 0 && (
            <span className="no-data-new">No Listener Avaliable</span>
          )}
        </div>

        {showEditStatus && (
          <EditStatus
            isOpen={showEditStatus}
            onClose={toggleEditStatus}
            selectedRow={selectedRow?.id}
            profileStatus={profileStatus}
          />
        )}

        {showOnboardingAssignTask && (
          <AssignOnboardingToAdmin
            isOpen={showOnboardingAssignTask}
            onClose={() => toggleOnboardingStatus(null, false)}
            selectedRow={selectedRow?.id}
            profileStatus={profileStatus}
            created={true}
            adminId={user.id}
            isReassign={isReassign}
          />
        )}

        {showGraph && (
          <ListenerRegisteredGraph
            isOpen={showGraph}
            onClose={() => setShowGraph(false)}
          />
        )}
      </div>
    )
  );
};

export default ListenersListingTable;
