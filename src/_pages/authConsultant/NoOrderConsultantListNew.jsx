import React, { useMemo, useState, useEffect } from "react";
import DyCommonTable from "../../_components/table/DyCommonTable";
import { NO_ORDER_CONSULTANT_COLUMNS_NEW } from "./NoOrderConsultantListColumnNew";
import { useGetNoOrderConsultantsListQuery } from "../../_store/api";
import { Atom } from "react-loading-indicators";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Search,
  Users,
  AlertCircle,
  UserX,
} from "lucide-react";
import { debounce } from "lodash";
import "./NoOrderConsultantListNew.css";

const lastDaysOptions = [
  { label: "Last 3 Days", value: "3" },
  { label: "Last 7 Days", value: "7" },
  { label: "Last 10 Days", value: "10" },
  { label: "Last 15 Days", value: "15" },
];

const consultantTypeOptions = [
  { label: "All Types", value: "1,2,3" },
  { label: "Astrologer", value: "1" },
  { label: "Coach", value: "2" },
  { label: "Listener", value: "3" },
];

const NoOrderConsultantListNew = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(15);
  const [lastDays, setLastDays] = useState("15");
  const [consultantType, setConsultantType] = useState("3");
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const {
    data: fetchData,
    isLoading,
    error,
  } = useGetNoOrderConsultantsListQuery({
    page,
    size: pageSize,
    last_days: lastDays,
    consultant_type: consultantType,
    name: name || undefined,
  });

  useEffect(() => {
    if (fetchData && fetchData?.data?.records) {
      setData(fetchData.data.records);
    } else {
      setData([]);
    }
  }, [fetchData]);

  const totalRecords = fetchData?.data?.total_records || 0;
  const totalPage = totalRecords ? Math.ceil(totalRecords / pageSize) : 1;

  const columns = useMemo(() => [...NO_ORDER_CONSULTANT_COLUMNS_NEW], []);

  const debouncedSearchName = useMemo(
    () => debounce((value) => setName(value), 500),
    []
  );

  const handleNameSearch = (e) => {
    setPage(1);
    debouncedSearchName(e?.target?.value);
  };

  const handleLastDaysChange = (e) => {
    setPage(1);
    setLastDays(e.target.value);
  };

  const handleConsultantTypeChange = (e) => {
    setPage(1);
    setConsultantType(e.target.value);
  };

  // Custom filter - empty since we handle filters externally
  const customFilterComponent = () => <div style={{ display: "none" }} />;

  if (isLoading) {
    return (
      <div className="noc-page">
        <div className="noc-loading">
          <Atom color="#1c2434" size="medium" text="" textColor="" />
          <span className="noc-loading-text">Loading consultants...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="noc-page">
        <div className="noc-error">
          <div className="noc-error-icon">
            <AlertCircle size={24} />
          </div>
          <span className="noc-error-text">
            Failed to load data. Please try again.
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="noc-page">
      {/* Filters + Stats */}
      <div className="noc-filters">
        <button
          className="noc-back-btn"
          onClick={() => navigate("/auth-consultant")}
          title="Back"
        >
          <ArrowLeft size={18} />
        </button>

        <div className="noc-search-box">
          <Search size={18} className="noc-search-icon" />
          <input
            className="noc-search-input"
            placeholder="Search by name..."
            onChange={handleNameSearch}
          />
        </div>

        <select
          className="noc-select"
          value={lastDays}
          onChange={handleLastDaysChange}
        >
          {lastDaysOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>

        <select
          className="noc-select"
          value={consultantType}
          onChange={handleConsultantTypeChange}
        >
          {consultantTypeOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>

        <div className="noc-stat-inline">
          <div className="noc-stat-icon total">
            <Users size={18} />
          </div>
          <span className="noc-stat-value">{totalRecords}</span>
          <span className="noc-stat-label-inline">Total</span>
        </div>
      </div>

      {/* Table */}
      <div className="noc-table-card">
        <DyCommonTable
          columns={columns}
          data={data}
          tableTitle="No Order Consultants"
          customFilterComponent={customFilterComponent}
          dynamicPagination={true}
          totalPage={totalPage}
          currentPage={page}
          pageSize={pageSize}
          setPage={setPage}
          setPageSize={setPageSize}
          showTableHeading={false}
          showGlobalSearch={false}
          includeCheckbox={false}
        />

        {data?.length === 0 && (
          <div className="noc-empty">
            <div className="noc-empty-icon">
              <UserX size={28} />
            </div>
            <span className="noc-empty-text">No consultants found</span>
            <span className="noc-empty-sub">
              Try adjusting your filters or search criteria
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default NoOrderConsultantListNew;
