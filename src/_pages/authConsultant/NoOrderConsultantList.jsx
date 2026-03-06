import React, { useMemo, useState, useEffect } from "react";
import DyCommonTable from "../../_components/table/DyCommonTable";
import { NO_ORDER_CONSULTANT_COLUMNS } from "./NoOrderConsultantListColumn";
import { useGetNoOrderConsultantsListQuery } from "../../_store/api";
import { Atom } from "react-loading-indicators";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Button from "@mui/material/Button";
import { debounce } from "lodash";

const lastDaysOptions = [
  { label: "3 Days", value: "3" },
  { label: "7 Days", value: "7" },
  { label: "10 Days", value: "10" },
  { label: "15 Days", value: "15" },
];

const consultantTypeOptions = [
  { label: "All", value: "1,2,3" },
  { label: "Astrologer", value: "1" },
  { label: "Coach", value: "2" },
  { label: "Listener", value: "3" },
];

const NoOrderConsultantList = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(15);
  const [lastDays, setLastDays] = useState("7");
  const [consultantType, setConsultantType] = useState("1,2,3");
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

  const totalPage = fetchData?.data?.total_records
    ? Math.ceil(fetchData.data.total_records / pageSize)
    : 1;

  const columns = useMemo(() => [...NO_ORDER_CONSULTANT_COLUMNS], []);

  const debouncedSearchName = debounce((value) => setName(value), 500);

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

  const customFilterComponent = () => (
    <div style={{ width: "100%", height: "35px", display: "flex", alignItems: "center" }}>
      <input
        className="inputBox"
        placeholder="Search by Name"
        style={{
          marginLeft: "25px",
          height: "-webkit-fill-available",
          width: "20%",
        }}
        onChange={handleNameSearch}
      />

      <select
        className="inputBox"
        style={{
          marginLeft: "25px",
          height: "-webkit-fill-available",
          width: "12%",
          cursor: "pointer",
        }}
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
        className="inputBox"
        style={{
          marginLeft: "25px",
          height: "-webkit-fill-available",
          width: "12%",
          cursor: "pointer",
        }}
        value={consultantType}
        onChange={handleConsultantTypeChange}
      >
        {consultantTypeOptions.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>

      <div style={{ marginLeft: "auto", marginRight: "10px" }}>
        <Button
          variant="outlined"
          size="small"
          onClick={() => navigate("/auth-consultant")}
          style={{
            borderColor: "#1c2434",
            color: "#1c2434",
            textTransform: "none",
            fontWeight: 600,
            borderRadius: "8px",
            padding: "6px 16px",
          }}
        >
          <ArrowLeft size={16} style={{ marginRight: "6px" }} />
          Back
        </Button>
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
    <div>
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
        includeCheckbox={false}
      />

      {data?.length === 0 && (
        <span className="no-data-new">No Consultant Available</span>
      )}
    </div>
  );
};

export default NoOrderConsultantList;
