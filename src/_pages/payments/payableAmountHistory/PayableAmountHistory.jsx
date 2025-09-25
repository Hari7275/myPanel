import React, { useEffect, useMemo, useState } from "react";
import DyCommonTable from "../../../_components/table/DyCommonTable";
import { PAYABLECOLUMN } from "../payoutRequest/payoutColumns";
import { Info, Pencil, Trash } from "lucide-react";
import { useGetPayableListQuery } from "../../../_store/api";
// import UpdateSubscriptionPlan from "./UpdateSubscriptionPlan";
import PayableAmountFilter from "./PayableAmountFilter";
import { Atom } from "react-loading-indicators";
import Button from "@mui/material/Button";
import { debounce } from "lodash";

const PayableAmountHistory = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(50);
  const [dynamicPagination, setDynamicPagination] = useState(true);

  const [consultantId, setConsultantId] = useState("");

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
    isError,
  } = useGetPayableListQuery({
    page,
    size: pageSize,

    consultant_id: consultantId,
    orderType: appliedFilters.orderType,
    status: appliedFilters.status,
    end_date: appliedFilters.endDate,
    start_date: appliedFilters.startDate,
  });

  useEffect(() => {
    if (fetchData && fetchData?.data && fetchData?.data?.data) {
      const result = fetchData?.data?.data?.filter((item) => item.status !== 1);
      setData(result);
    } else {
      setData([]);
    }
  }, [fetchData]);

  // Memoized columns definition for the table
  const columns = useMemo(() => [...PAYABLECOLUMN], []);
  // const totalPage = fetchData?.meta?.total_page || 1;

  const debouncedSearchConsltantId = debounce(
    (value) => setConsultantId(value),
    500
  );

  const handleConsultantIdSearch = (e) => {
    setPage(1);
    debouncedSearchConsltantId(e?.target?.value);
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
        placeholder="Search by consultant id"
        style={{
          marginLeft: "25px",
          height: "-webkit-fill-available",
          width: "15%",
        }}
        onChange={handleConsultantIdSearch}
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

        <PayableAmountFilter
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
          <span style={{ color: "#4CAF50", fontWeight: "700" }}>
            Total Amount =
          </span>
          <span style={{ color: "#151212ff", fontWeight: "600" }}>
            {` ₹ ${fetchData?.data?.consultant_payout?.total_overall_sum || 0}`}
          </span>
        </div>
        <div style={{ marginLeft: "20px" }}>
          <span style={{ color: "#2196F3", fontWeight: "700" }}>
            Total Payable Amount =
          </span>
          <span style={{ color: "#151212ff", fontWeight: "600" }}>
            {` ₹ ${fetchData?.data?.consultant_payout?.total_payable || 0}`}
          </span>
        </div>
      </div>
    </div>
  );

  // const totalPage = fetchData?.meta?.total_page || 1;
  const totalPage = fetchData?.data?.total
    ? Math.ceil(fetchData.data.total / pageSize)
    : 1;

  if (isLoading) {
    return (
      <span className="loadPage">
        <Atom color="#1c2434" size="medium" text="" textColor="" />
      </span>
    );
  }
  if (isError) return <p>Error fetching data</p>;

  return (
    <>
      {/* <CommonTable
        columns={columns}
        data={data}
        includeActions={false}
        tableTitle="Payable Amount History"
        // AddPackageButton={AddPackageButton}
        showTableHeading={false}
      /> */}
      <DyCommonTable
        columns={columns}
        data={data}
        includeActions={false}
        tableTitle="Payable Log"
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
    </>
  );
};
export default PayableAmountHistory;
