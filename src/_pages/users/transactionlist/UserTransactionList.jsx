import React, { useMemo, useEffect, useState } from "react";

import DyCommonTable from "../../../_components/table/DyCommonTable";
import { USERTRANSACTIONCOLUMN } from "./userTransactionsColumn";
import { useGetUserTransactionsListQuery } from "../../../_store/api";
import { useSelector } from "react-redux";
import AddRechargePlan from "./AddRechargePlan";
import { Atom } from "react-loading-indicators";
import UserRechargeFilter from "./UserRechargeFilter";
import Button from "@mui/material/Button";
import { useParams } from "react-router-dom";

const UserTransactionList = () => {
  const [addData, setAddData] = useState(false);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(20); // Adjusted default page size
  const [dynamicPagination] = useState(true); // Enable or disable dynamic pagination
  // const userId = useSelector((state) => state.user.userData);
  const { userId } = useParams();

  const [result, setResult] = useState([]);
  const columns = useMemo(() => USERTRANSACTIONCOLUMN, []);

  // Filter states
  const [showFilterPopover, setShowFilterPopover] = useState(false);
  const [appliedFilters, setAppliedFilters] = useState({
    startDate: "",
    endDate: "",
    allowedActivityType: "",
    transationType: "",
  });

  const {
    data: fetchData,
    isLoading,
    error,
  } = useGetUserTransactionsListQuery({
    userId,
    page: page,
    limit: pageSize,
    ALLOWED_ACTIVITY_TYPES: appliedFilters.allowedActivityType,
    type: appliedFilters.transationType,
    start_date: appliedFilters.startDate,
    end_date: appliedFilters.endDate,
  });

  useEffect(() => {
    if (fetchData) {
      setResult(fetchData?.data?.transactions);
    }
  }, [fetchData]);

  // Toggle function for adding a review
  const toggleAddData = () => {
    setAddData(!addData);
  };

  const AddButton = () => {
    return (
      <button
        className="addButton"
        style={{
          position: "absolute",
          right: "20px",
          backgroundColor: "#18B164",
          padding: "6px",
        }}
        onClick={toggleAddData}
      >
        Add Balance
      </button>
    );
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
    <div
      style={{
        width: "100%",
        height: "35px",
        display: "flex",
        alignItems: "center",
      }}
    >
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

        <UserRechargeFilter
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
        <Atom color="#3a3a3a" size="medium" text="" textColor="" />
      </span>
    );
  }
  if (error) return <div>Error fetching data</div>;

  const totalPage = fetchData?.data?.totalPages || 1;

  return (
    <>
      <DyCommonTable
        columns={columns}
        data={result}
        tableTitle="User Transaction List"
        customFilterComponent={customFilterComponent}
        includeActions={false}
        AddPackageButton={AddButton}
        dynamicPagination={dynamicPagination}
        totalPage={totalPage}
        currentPage={page}
        pageSize={pageSize}
        setPage={setPage}
        setPageSize={setPageSize}
      />
      {addData && (
        <AddRechargePlan
          isOpen={addData}
          onClose={toggleAddData}
          userId={userId}
        />
      )}
    </>
  );
};

export default UserTransactionList;
