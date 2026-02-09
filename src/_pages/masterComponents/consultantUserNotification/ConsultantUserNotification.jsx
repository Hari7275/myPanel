import React, { useMemo, useState, useEffect, use } from "react";
import DyCommonTable from "../../../_components/table/DyCommonTable";
import { CONSULTANTUSERNOTICOLUMN } from "./consultantUserNotiColumn";
import { debounce } from "lodash";
import { Atom } from "react-loading-indicators";
import { useGetConsultantOrderNotificationQuery } from "../../../_store/api";
import { useSelector } from "react-redux";

const ConsultantUserNotification = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(50);
  const [consultantId, setConsultantId] = useState("");
  const [status, setStatus] = useState(null);
  const [dynamicPagination, setDynamicPagination] = useState(true);
  const [searchInput, setSearchInput] = useState("");

  const { user } = useSelector((state) => state.auth);

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
  // handeling api  fetching data and deleting data

  const { data: fetchData, isLoading } = useGetConsultantOrderNotificationQuery(
    {
      consultant_id: consultantId,
      user_id: assignedUserId,
      status: status,
      page: page,
      limit: pageSize,
    },
  );

  // store data

  console.log("data....", fetchData);
  useEffect(() => {
    if (fetchData && fetchData?.data && fetchData?.data?.records) {
      setData(fetchData?.data?.records);
    } else {
      setData([]);
    }
  }, [fetchData]);

  // function for description

  const columns = useMemo(() => [...CONSULTANTUSERNOTICOLUMN], [data]);

  // ✅ Create debounced function only once
  const debouncedSearchConsultant = useMemo(
    () => debounce((value) => setConsultantId(value), 1500),
    [],
  );

  const handleConsultantSearch = (e) => {
    const value = e?.target?.value || "";
    setSearchInput(value); // Update input immediately
    setPage(1);
    debouncedSearchConsultant(value);
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
        placeholder="Search by Consultant ID"
        // value={blogSlug}
        value={searchInput}
        style={{
          marginLeft: "25px",
          height: "-webkit-fill-available",
          width: "20%",
        }}
        onChange={handleConsultantSearch}
      />
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

  return (
    <>
      <DyCommonTable
        columns={columns}
        data={data}
        includeActions={false}
        tableTitle="Consultant User Notification"
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

export default ConsultantUserNotification;
