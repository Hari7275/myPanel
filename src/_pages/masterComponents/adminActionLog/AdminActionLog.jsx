import React, { useMemo, useState, useEffect } from "react";
import DyCommonTable from "../../../_components/table/DyCommonTable";
import { useGetAdminActionLogListQuery } from "../../../_store/api";
import { Atom } from "react-loading-indicators";
import { debounce } from "lodash";
import { ACTIONLOGCOLUMNS } from "./adminActionLogColumn";
const AdminActionLog = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(50); // Adjusted default page size
  const [dynamicPagination, setDynamicPagination] = useState(true); // Enable or disable dynamic pagination
  const [userType, setUSerType] = useState(0);

  const [name, setName] = useState("");
  const [userId, setUserId] = useState("");
  const [platformType, setPlatformType] = useState("");

  const [appliedFilters, setAppliedFilters] = useState({
    startDate: "",
    endDate: "",
    // platformType: "",
    activeStatus: "",
  });

  const {
    data: fetchData,
    isLoading,
    error,
  } = useGetAdminActionLogListQuery({
    page,
    size: pageSize,
    user_type: userType,
    name,
    
  });

  const columns = useMemo(() => ACTIONLOGCOLUMNS, []);

  useEffect(() => {
    if (fetchData) {
      setData(fetchData?.data?.records || []);
    }
  }, [fetchData]);

  const handleSetUserType = (e) => {
    setPage(1);
    setUSerType(e.target.value);
  };

  const debouncedSearchUserName = debounce((value) => setName(value), 500);
  const debouncedSearchUserId = debounce((value) => setUserId(value), 500);

  const handleUserNameSearch = (e) => {
    setPage(1);
    debouncedSearchUserName(e?.target?.value);
  };

  const handleUserIdSearch = (e) => {
    setPage(1);
    debouncedSearchUserId(e?.target?.value);
  };

  const handleSetPlatformType = (e) => {
    setPage(1);
    setPlatformType(e.target.value);
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

  // const customFilterComponent = () => (
  //   <div
  //     style={{
  //       width: "100%",
  //       height: "35px",
  //       display: "flex",
  //       alignItems: "center",
  //     }}
  //   >
  //     <input
  //       className="inputBox"
  //       placeholder="Search by user id"
  //       style={{
  //         // marginLeft: "25px",
  //         height: "-webkit-fill-available",
  //         width: "10%",
  //       }}
  //       onChange={handleUserIdSearch}
  //     />

  //     <input
  //       className="inputBox"
  //       placeholder="Search by User Name"
  //       style={{
  //         marginLeft: "10px",
  //         height: "-webkit-fill-available",
  //         width: "10%",
  //       }}
  //       onChange={handleUserNameSearch}
  //     />
  //   </div>
  // );

  const totalPage = fetchData?.data?.metadata?.total_page || 1;
  //   const totalPage = fetchData?.data?.totalRecords
  //     ? Math.ceil(fetchData.data.totalRecords / pageSize)
  //     : 1;

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
        tableTitle="Recharge Summary List"
        // customFilterComponent={customFilterComponent}
        dynamicPagination={dynamicPagination}
        totalPage={totalPage}
        currentPage={page}
        pageSize={pageSize}
        setPage={setPage}
        setPageSize={setPageSize}
        includeCheckbox={false}
        showTableHeading={false}
        // showGlobalSearch={false}
      />
    </div>
  );
};

export default AdminActionLog;
