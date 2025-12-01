import React, { useMemo, useState, useEffect } from "react";
import DyCommonTable from "../../../_components/table/DyCommonTable";
import { LISTENERSCOLUMNS } from "./listenersListingColumn";
import { ArrowRight, Pencil, KeyRound } from "lucide-react";
import { Link } from "react-router-dom";
import EditStatus from "../../../_components/reuseComponents/EditStatus";
import { useGetConsultantsListQuery } from "../../../_store/api";

import { debounce } from "lodash";
import { useNavigate } from "react-router-dom";
import { Atom } from "react-loading-indicators";
import { useLocation } from "react-router-dom";
import usePermissions from "../../../_components/reuseComponents/permission/EmpPermission";

import { useSelector } from "react-redux";
import AstrologerListFilter from "../../astrologers/list/AstrologerListFilter";
import Button from "@mui/material/Button";
import AssignOnboardingToAdmin from "../../../_components/reuseComponents/AssignOnboardingToAdmin";

const ListenersListingTable = () => {
  const location = useLocation();
  const navigate = useNavigate();
  // 🧠 Read URL Params
  const queryParams = new URLSearchParams(location.search);
  const initialPage = Number(queryParams.get("page")) || 1;
  const initialPageSize = Number(queryParams.get("pageSize")) || 50;

  const [page, setPage] = useState(initialPage);
  const [pageSize, setPageSize] = useState(initialPageSize);

  const [selectedRow, setSelectedRow] = useState(null);
  const [showEditStatus, setShowEditStatus] = useState(false);
  const [showOnboardingAssignTask, setShowOnboardingAssignTask] =
    useState(false);
  const [isReassign, setIsReassign] = useState(false); // New state for reassign
  const [data, setData] = useState([]);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [consultantId, setConsultantId] = useState("");
  const [dynamicPagination] = useState(true);
  const { user } = useSelector((state) => state.auth);
  let [profileStatus, SetProfileStatus] = useState(null);
  const permissions = usePermissions();

  // Filter states
  const [showFilterPopover, setShowFilterPopover] = useState(false);
  const [appliedFilters, setAppliedFilters] = useState({
    startDate: "",
    endDate: "",
    orderType: "",
    status: "",
  });

  // 🧭 Keep URL params synced when page or pageSize changes
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    params.set("page", page);
    params.set("pageSize", pageSize);
    navigate(`?${params.toString()}`, { replace: true });
  }, [page, pageSize, navigate]);

  const {
    data: fetchData,
    isLoading,
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
        (record) => record?.consultant_type === 3
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
    SetProfileStatus(row.status);
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
                "update_listener_profile_status"
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
    [permissions]
  );

  // Apply debounce to search handlers
  const debouncedSearchName = debounce((value) => setName(value), 500);
  const debouncedSearchEmail = debounce((value) => setEmail(value), 500);
  const debouncedSearchConsultantId = debounce(
    (value) => setConsultantId(value),
    500
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

  // Handle filter application
  const handleApplyFilter = (filterData) => {
    setAppliedFilters(filterData);
    setPage(1); // Reset to first page when applying filters
    console.log("Applied filters:", filterData);
  };

  // Count applied filters (non-empty values)
  const appliedFilterCount = Object.values(appliedFilters).filter(
    (val) => val !== "" && val !== null && val !== undefined
  ).length;

  const customFilterComponent = () => (
    <div style={{ width: "100%", height: "35px", display: "flex" }}>
      <input
        className="inputBox"
        placeholder="Search by Id"
        style={{
          height: "-webkit-fill-available",
          width: "15%",
        }}
        onChange={handleConsultantIdSearch}
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
        placeholder="Search by Email"
        style={{
          marginLeft: "25px",
          height: "-webkit-fill-available",
          width: "15%",
        }}
        onChange={handleEmailSearch}
      />
      <input
        className="inputBox"
        placeholder="Search by Phone No."
        style={{
          marginLeft: "25px",
          height: "-webkit-fill-available",
          width: "15%",
        }}
        onChange={handleConsultantPhoneSearch}
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
            {appliedFilterCount === 0 ? null : appliedFilterCount}
          </span>
        </Button>

        <AstrologerListFilter
          isOpen={showFilterPopover}
          onClose={() => setShowFilterPopover(false)}
          onApplyFilter={handleApplyFilter}
          initialFilters={appliedFilters}
        />
      </div>
    </div>
  );

  if (isLoading) {
    return (
      <span className="loadPage">
        <Atom color="#1c2434" size="medium" text="" textColor="" />
      </span>
    );
  }
  if (error) {
    return "Error...";
  }

  return (
    permissions?.["listener"]?.includes("view_listener_list") && (
      <>
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
        />

        {data?.length === 0 && (
          <span className="no-data-new">No Listener Avaliable</span>
        )}

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
      </>
    )
  );
};

export default ListenersListingTable;
