import React, { useMemo, useState, useEffect, useRef } from "react";
import DyCommonTable from "../../../_components/table/DyCommonTable";
import { COACHES_COLUMNS } from "./CoachListingColumns";
import { ArrowRight, Pencil } from "lucide-react";
import EditStatus from "../../../_components/reuseComponents/EditStatus";
import { useGetConsultantsListQuery } from "../../../_store/api";
import { useDispatch } from "react-redux";
import { resetActiveTab } from "../../../_store/slices/activeSlice";
import { debounce } from "lodash";
import { useNavigate } from "react-router-dom";
import { Atom } from "react-loading-indicators";
import { useLocation } from "react-router-dom";
import usePermissions from "../../../_components/reuseComponents/permission/EmpPermission";

import AstrologerListFilter from "../../astrologers/list/AstrologerListFilter";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";

const CoachListingTable = () => {
  const dispatch = useDispatch();
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
  const [data, setData] = useState([]);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [consultantId, setConsultantId] = useState("");

  // const pageRef = useRef(page);
  const [dynamicPagination, setDynamicPagination] = useState(true);

  let [profileStatus, SetProfileStatus] = useState(null);
  const permissions = usePermissions();

  // 🧭 Keep URL params synced when page or pageSize changes
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    params.set("page", page);
    params.set("pageSize", pageSize);
    navigate(`?${params.toString()}`, { replace: true });
  }, [page, pageSize, navigate]);

  // Filter states
  const [showFilterPopover, setShowFilterPopover] = useState(false);
  const [appliedFilters, setAppliedFilters] = useState({
    startDate: "",
    endDate: "",
    orderType: "",
    status: "",
  });

  const {
    data: fetchData,
    isLoading,
    error,
  } = useGetConsultantsListQuery({
    page,
    size: pageSize,
    name: name,
    // auth_status: statusSearch,
    auth_status: appliedFilters?.status,

    id: consultantId,
    phone,
    consultant_type: 2,
  });

  // useEffect(() => {
  //   pageRef.current = page;
  // }, [page]);

  useEffect(() => {
    if (fetchData && fetchData?.data && fetchData?.data?.records) {
      const consultantData = fetchData?.data?.records.filter(
        (record) => record?.consultant_type === 2
      );
      setData(consultantData);
    } else {
      setData([]);
    }
    dispatch(resetActiveTab());
  }, [fetchData, resetActiveTab]);
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

  const columns = useMemo(
    () => [
      ...COACHES_COLUMNS,
      {
        Header: () => <div className="actions-header">Actions</div>,
        id: "actions",

        Cell: ({ row }) => (
          <div className="actions-cell">
            {permissions?.["coach"]?.includes("view_coach_profile") && (
              <Link
                to={`/coaches/${row.original.id}?status=${row.original.status}&type=${row.original.phone_code}`}
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

            {[3, 4, 5, 2, 8].includes(row.original.status) &&
              permissions?.["coach"]?.includes(
                "update_coach_profile_status"
              ) && (
                <span className="editIcon">
                  <Pencil
                    className="iconSmall"
                    onClick={() => toggleEditStatus(row.original)}
                  />
                </span>
              )}
          </div>
        ),
      },
    ],
    []
  );

  // Apply debounce to search handlers
  const debouncedSearchName = debounce((value) => setName(value), 500);
  const debouncedSearchConsultantId = debounce(
    (value) => setConsultantId(value),
    500
  );
  const debouncedSearchPhone = debounce((value) => setPhone(value), 500);

  const handleNameSearch = (e) => {
    setPage(1);
    debouncedSearchName(e?.target?.value);
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
          // marginLeft: "25px",
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
            {appliedFilterCount == 0 ? null : appliedFilterCount}
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
    return <div>Error: {error.message}</div>;
  }
  return (
    permissions?.["coach"]?.includes("view_coach_list") && (
      <div>
        <DyCommonTable
          columns={columns}
          data={data}
          tableTitle="Coach List"
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
        {data?.length == 0 && (
          <span className="no-data-new">No Coach Avaliable</span>
        )}
        {showEditStatus && (
          <EditStatus
            isOpen={showEditStatus}
            onClose={toggleEditStatus}
            selectedRow={selectedRow?.id}
            profileStatus={profileStatus}
          />
        )}
      </div>
    )
  );
};

export default CoachListingTable;
