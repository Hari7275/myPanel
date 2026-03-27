import React, { useState, useEffect, useMemo, useCallback } from "react";
import { ArrowRight, Pencil, Search, X, ChevronLeft, ChevronRight } from "lucide-react";
import DyCommonTable from "../../../_components/table/DyCommonTable";
import { COLUMNS } from "./userListingColumns";
import {
  Link,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import EditStatus from "./EditStatus";
import { useGetUsersListQuery } from "../../../_store/api";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "../../../_store/slices/userSlice";
import Modal from "react-modal";
import { Atom } from "react-loading-indicators";
import { debounce } from "lodash";
import usePermissions from "../../../_components/reuseComponents/permission/EmpPermission";
import UserFilter from "./UserFilter";
import Button from "@mui/material/Button";
import {
  UserVerificationStatus,
  getUserVerificationColor,
} from "../../../_constants/consultantConstant";
import "./UserListingTable.css";

Modal.setAppElement("#root");

const UserListingTable = () => {
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const initialPage = Number(queryParams.get("page")) || 1;
  const initialPageSize = Number(queryParams.get("pageSize")) || 50;

  const [page, setPage] = useState(initialPage);
  const [pageSize, setPageSize] = useState(initialPageSize);

  const [data, setData] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);
  const [showEditStatus, setShowEditStatus] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [name, setName] = useState("");
  const [phone_number, setPhone_number] = useState("");
  const [userId, setUserId] = useState("");
  const [platformType, setPlatformType] = useState("");

  const [dynamicPagination] = useState(true);
  const permissions = usePermissions();

  // Filter states
  const [showFilterPopover, setShowFilterPopover] = useState(false);
  const [appliedFilters, setAppliedFilters] = useState({
    startDate: "",
    endDate: "",
  });

  // Mobile search state
  const [mobileSearchValue, setMobileSearchValue] = useState("");
  const [searchType, setSearchType] = useState("name");

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    params.set("page", page);
    params.set("pageSize", pageSize);
    navigate(`?${params.toString()}`, { replace: true });
  }, [page, pageSize, navigate]);

  const { data: fetchData, isLoading, isFetching } = useGetUsersListQuery({
    page: page,
    limit: pageSize,
    name,
    user_id: userId,
    phone_number,
    platformType,
    start_date: appliedFilters.startDate,
    end_date: appliedFilters.endDate,
  });

  useEffect(() => {
    if (fetchData && fetchData?.data && fetchData?.data?.records) {
      setData(fetchData?.data?.records);
    } else {
      setData([]);
    }
  }, [fetchData]);
  const totalPage = fetchData?.data?.pagination?.totalPages || 1;

  useEffect(() => {
    if (location?.state) {
      setPage(location?.state?.previousPage);
      setPageSize(location?.state?.previousPageSize);
    }
  }, [location?.state]);

  const toggleEditStatus = (row) => {
    setSelectedRow(row);
    setShowEditStatus(!showEditStatus);
  };

  const handleViewDetails = (userId) => {
    dispatch(setCurrentUser(userId));
  };

  const toggleModal = (image) => {
    setModalIsOpen(!modalIsOpen);
    setSelectedImage(image);
  };

  const columns = useMemo(
    () => [
      ...COLUMNS(toggleModal),
      {
        Header: () => <div className="actions-header">Actions</div>,
        id: "actions",
        Cell: ({ row }) => (
          <div className="actions-cell">
            <Link
              to={`/user/${row.original.id}`}
              state={{
                currentPage: page,
                pageSize: pageSize,
              }}
            >
              {permissions?.["user"]?.includes("view_user_profile") && (
                <span
                  title="view details"
                  className="secondIcon"
                  style={{
                    display: "inline-block",
                    height: "35px",
                    width: "35px",
                  }}
                  onClick={() => handleViewDetails(row.original.id)}
                >
                  <ArrowRight className="iconSmall" />
                </span>
              )}
            </Link>
            {permissions?.["user"]?.includes("update_user_profile_status") && (
              <span className="editIcon">
                <Pencil
                  className="iconSmall"
                  onClick={() => toggleEditStatus(row.original.id)}
                />
              </span>
            )}
          </div>
        ),
      },
    ],
    [handleViewDetails, toggleEditStatus, toggleModal]
  );

  // Debounced search handlers
  const debouncedSearchName = debounce((value) => setName(value), 500);
  const debouncedSearchUserId = debounce((value) => setUserId(value), 500);
  const debouncedSearchPhone = debounce((value) => setPhone_number(value), 500);

  const handleNameSearch = (e) => {
    setPage(1);
    debouncedSearchName(e?.target?.value);
  };

  const handleUserIdSearch = (e) => {
    setPage(1);
    debouncedSearchUserId(e?.target?.value);
  };
  const handleUserPhoneNumberSearch = (e) => {
    setPage(1);
    debouncedSearchPhone(e?.target?.value);
  };

  const handleSetPlatformType = (e) => {
    setPage(1);
    setPlatformType(e.target.value);
  };

  const handleApplyFilter = (filterData) => {
    setAppliedFilters(filterData);
    setPage(1);
  };

  const appliedFilterCount = Object.values(appliedFilters).filter(
    (val) => val !== "" && val !== null && val !== undefined
  ).length;

  // Mobile search
  const handleMobileSearch = (e) => {
    const value = e.target.value;
    setMobileSearchValue(value);
    setPage(1);
    if (searchType === "name") debouncedSearchName(value);
    else if (searchType === "id") debouncedSearchUserId(value);
    else if (searchType === "phone") debouncedSearchPhone(value);
  };

  const handleSearchTypeChange = (type) => {
    setSearchType(type);
    setMobileSearchValue("");
    setName("");
    setUserId("");
    setPhone_number("");
    setPage(1);
  };

  const clearMobileSearch = () => {
    setMobileSearchValue("");
    setName("");
    setUserId("");
    setPhone_number("");
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
        placeholder="Search by id"
        style={{
          height: "-webkit-fill-available",
          width: "10%",
        }}
        onChange={handleUserIdSearch}
      />
      <input
        className="inputBox"
        placeholder="Search by Name"
        style={{
          marginLeft: "25px",
          height: "-webkit-fill-available",
          width: "15%",
        }}
        onChange={handleNameSearch}
      />
      <input
        className="inputBox"
        placeholder="Search by Phone Number"
        style={{
          marginLeft: "25px",
          height: "-webkit-fill-available",
          width: "15%",
        }}
        onChange={handleUserPhoneNumberSearch}
      />

      <select
        className="inputBox"
        style={{
          marginLeft: "25px",
          height: "-webkit-fill-available",
          width: "15%",
        }}
        onChange={handleSetPlatformType}
      >
        <option>Select Device</option>
        <option value={1}>Andriod</option>
        <option value={2}>iOS</option>
      </select>

      <div
        style={{ marginLeft: "20px", position: "relative" }}
        className="filter-button-wrapper"
      >
        <Button
          variant="contained"
          onClick={() => setShowFilterPopover(!showFilterPopover)}
        >
          Filter
          <span style={{ marginLeft: "10px", color: "#f0c040", fontWeight: 600, fontSize: "13px" }}>
            {appliedFilterCount == 0 ? "" : appliedFilterCount}
          </span>
        </Button>

        <UserFilter
          isOpen={showFilterPopover}
          onClose={() => setShowFilterPopover(false)}
          onApplyFilter={handleApplyFilter}
          initialFilters={appliedFilters}
        />
      </div>

      <div
        style={{ marginLeft: "20px", position: "relative", display: "flex" }}
      >
        <div>
          <span style={{ color: "#5ca85c", fontWeight: "600", fontSize: "13px" }}>Android =</span>
          <span style={{ color: "var(--table-text)", fontWeight: "500", fontSize: "13px" }}>
            {` ${fetchData?.data?.pagination?.overview?.android_users || 0}`}
          </span>
        </div>
        <div style={{ marginLeft: "20px" }}>
          <span style={{ color: "#7eb3f7", fontWeight: "600", fontSize: "13px" }}>iOS =</span>
          <span style={{ color: "var(--table-text)", fontWeight: "500", fontSize: "13px" }}>
            {` ${fetchData?.data?.pagination?.overview?.ios_users || 0}`}
          </span>
        </div>

      </div>
    </div>
  );

  return (
    permissions?.["user"]?.includes("view_user_list") && (
      <div className="ul-page">
        {/* ===== MOBILE CARD VIEW ===== */}
        <div className="ul-mobile-view">
          {/* Search */}
          <div className="ulm-search-bar">
            <Search size={16} className="ulm-search-icon" />
            <input
              className="ulm-search-input"
              placeholder={`Search by ${searchType === "name" ? "Name" : searchType === "id" ? "User ID" : "Phone"}...`}
              value={mobileSearchValue}
              onChange={handleMobileSearch}
            />
            {mobileSearchValue && (
              <button className="ulm-clear-btn" onClick={clearMobileSearch}>
                <X size={16} />
              </button>
            )}
          </div>

          {/* Search type pills */}
          <div className="ulm-search-type">
            <span className="ulm-search-label">Search by:</span>
            {[
              { key: "name", label: "Name" },
              { key: "id", label: "User ID" },
              { key: "phone", label: "Phone" },
            ].map((t) => (
              <button
                key={t.key}
                className={`ulm-pill ${searchType === t.key ? "ulm-pill-active" : ""}`}
                onClick={() => handleSearchTypeChange(t.key)}
              >
                {t.label}
              </button>
            ))}
          </div>

          {/* Device Stats */}
          <div className="ulm-stats">
            <span className="ulm-stat-android">
              Android: <span className="ulm-stat-value">{fetchData?.data?.pagination?.overview?.android_users || 0}</span>
            </span>
            <span className="ulm-stat-ios">
              iOS: <span className="ulm-stat-value">{fetchData?.data?.pagination?.overview?.ios_users || 0}</span>
            </span>
          </div>

          {/* User Cards */}
          <div className="ulm-cards">
            {isFetching ? (
              Array.from({ length: 6 }).map((_, i) => (
                <div className="ulm-card ulm-card-skeleton" key={`skeleton-${i}`}>
                  <div className="ulm-skeleton-row">
                    <div className="ulm-skeleton-line" style={{ width: "55%", height: "14px" }} />
                    <div className="ulm-skeleton-line" style={{ width: "20%", height: "14px" }} />
                  </div>
                  <div className="ulm-skeleton-row" style={{ marginTop: 6 }}>
                    <div className="ulm-skeleton-line" style={{ width: "45%" }} />
                    <div className="ulm-skeleton-line" style={{ width: "30%" }} />
                  </div>
                  <div className="ulm-skeleton-row" style={{ marginTop: 8 }}>
                    <div className="ulm-skeleton-badge" />
                    <div className="ulm-skeleton-badge" />
                    <div className="ulm-skeleton-badge" />
                  </div>
                </div>
              ))
            ) : data.length === 0 ? (
              <div className="ulm-empty">No users found</div>
            ) : (
              data.map((user) => {
                const statusText = UserVerificationStatus(user.profile_status);
                const statusColor = getUserVerificationColor(user.profile_status);
                const isIndian = user.country_code === "IN";
                const createdDate = user.created_date
                  ? new Date(user.created_date).toLocaleString("en-US", { dateStyle: "medium", timeStyle: "short" })
                  : "";

                return (
                  <div className="ulm-card" key={user.id}>
                    {/* Row 1: Name + ID */}
                    <div className="ulm-card-row">
                      <Link
                        to={`/user/${user.id}`}
                        state={{ currentPage: page, pageSize }}
                        style={{ textDecoration: "none" }}
                        onClick={() => handleViewDetails(user.id)}
                      >
                        <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                          <span className="ulm-card-name">
                            {user.name || "N/A"}
                            {user.gender && (
                              <span className={user.gender?.toLowerCase() === "man" ? "ulm-card-gender-m" : "ulm-card-gender-f"}>
                                {user.gender?.toLowerCase() === "man" ? "♂" : "♀"}
                              </span>
                            )}
                          </span>
                          <span className="ulm-card-id">({user.id})</span>
                        </div>
                      </Link>
                      <span className="ulm-badge-status" style={{ color: statusColor, background: `${statusColor}18` }}>
                        {statusText}
                      </span>
                    </div>

                    {/* Row 2: Phone + Country */}
                    <div className="ulm-card-row">
                      <span className={`ulm-card-phone ${isIndian ? "ulm-card-phone-in" : "ulm-card-phone-foreign"}`}>
                        {user.phone_number || "N/A"}
                      </span>
                      {user.country && (
                        <span className="ulm-card-label">{user.country}</span>
                      )}
                    </div>

                    {/* Row 3: Footer - Platform + Date + Actions */}
                    <div className="ulm-card-footer">
                      <span className={`ulm-badge ${user.platform == 1 ? "ulm-badge-android" : "ulm-badge-ios"}`}>
                        {user.platform == 1 ? "Android" : "iOS"}
                      </span>
                      <span className="ulm-card-label">{createdDate}</span>
                      <div className="ulm-card-action">
                        {permissions?.["user"]?.includes("view_user_profile") && (
                          <Link
                            to={`/user/${user.id}`}
                            state={{ currentPage: page, pageSize }}
                            onClick={() => handleViewDetails(user.id)}
                          >
                            <button className="ulm-action-btn" title="View Details">
                              <ArrowRight size={16} />
                            </button>
                          </Link>
                        )}
                        {permissions?.["user"]?.includes("update_user_profile_status") && (
                          <button className="ulm-action-btn" title="Edit Status" onClick={() => toggleEditStatus(user.id)}>
                            <Pencil size={14} />
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
          <div className="ulm-pagination">
            <button className="ulm-page-btn" disabled={page <= 1} onClick={() => setPage(page - 1)}>
              <ChevronLeft size={16} />
            </button>
            <span className="ulm-page-info">Page {page} of {totalPage}</span>
            <button className="ulm-page-btn" disabled={page >= totalPage} onClick={() => setPage(page + 1)}>
              <ChevronRight size={16} />
            </button>
          </div>
        </div>

        {/* ===== DESKTOP TABLE VIEW ===== */}
        <div className="ul-desktop-view">
          <DyCommonTable
            columns={columns}
            data={data}
            tableTitle="User List"
            includeActions={false}
            customFilterComponent={customFilterComponent}
            dynamicPagination={dynamicPagination}
            totalPage={totalPage}
            currentPage={page}
            pageSize={pageSize}
            setPage={setPage}
            setPageSize={setPageSize}
            showTableHeading={false}
            showGlobalSearch={false}
            isLoading={isFetching}
          />

          {data?.length === 0 && (
            <div>
              <span className="no-data-new">No User Avaliable</span>
            </div>
          )}
        </div>

        <Modal
          isOpen={modalIsOpen}
          onRequestClose={toggleModal}
          contentLabel="Image Modal"
          className="imageModal"
          overlayClassName="overlay"
        >
          {selectedImage && (
            <div>
              <img src={selectedImage} alt="Selected" className="large-image" />
            </div>
          )}
        </Modal>

        {showEditStatus && (
          <EditStatus
            isOpen={showEditStatus}
            onClose={toggleEditStatus}
            selectedRow={selectedRow}
          />
        )}
      </div>
    )
  );
};

export default UserListingTable;
