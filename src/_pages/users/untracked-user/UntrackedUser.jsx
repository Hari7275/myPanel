import React, { useMemo, useState, useEffect, useRef } from "react";
import DyCommonTable from "../../../_components/table/DyCommonTable";
import { UNTRACKEDUSER_COLUMNS } from "./UntrackedUserListColumn";
import { useGetUserDeviceTokenListQuery } from "../../../_store/api";
import { useDispatch } from "react-redux";

import { resetActiveTab } from "../../../_store/slices/activeSlice";
import { debounce } from "lodash";

import { Atom } from "react-loading-indicators";
import { useLocation } from "react-router-dom";

const UntrackedUser = () => {
  const [data, setData] = useState([]);
  const dispatch = useDispatch();
  const [email_address, setEmailAddress] = useState("");
  const [phone, setPhone] = useState("");

  const [consultantId, setConsultantId] = useState("");
  const [page, setPage] = useState(1);
  const pageRef = useRef(page);
  const [pageSize, setPageSize] = useState(50);
  const [dynamicPagination, setDynamicPagination] = useState(true);

  const location = useLocation();

  const {
    data: fetchData,
    isLoading,
    error,
  } = useGetUserDeviceTokenListQuery({
    page,
    size: pageSize,
  });

  useEffect(() => {
    pageRef.current = page;
  }, [page]);

  useEffect(() => {
    if (fetchData && fetchData?.data && fetchData?.data) {
      const consultantData = fetchData?.data && fetchData?.data?.records;
      setData(consultantData);
    } else {
      setData([]);
    }
    dispatch(resetActiveTab());
  }, [fetchData, resetActiveTab]);

  const totalPage = fetchData?.data?.meta?.total_pages || 1;

  useEffect(() => {
    if (location.state) {
      setPage(location.state.previousPage);
      setPageSize(location.state.previousPageSize);
    }
  }, [location.state]);

  const columns = useMemo(() => [...UNTRACKEDUSER_COLUMNS], []);

  // Apply debounce to search handlers
  const debouncedSearchEmailAddress = debounce(
    (value) => setEmailAddress(value),
    500
  );
  const debouncedSearchConsultantId = debounce(
    (value) => setConsultantId(value),
    500
  );
  const debouncedSearchPhone = debounce((value) => setPhone(value), 500);

  const handleEmailSearch = (e) => {
    setPage(1);
    debouncedSearchEmailAddress(e?.target?.value);
  };

  const handleConsultantIdSearch = (e) => {
    setPage(1);
    debouncedSearchConsultantId(e?.target?.value);
  };

  const handleConsultantPhoneSearch = (e) => {
    setPage(1);
    debouncedSearchPhone(e?.target?.value);
  };

  // const customFilterComponent = () => (
  //   <div style={{ width: "100%", height: "35px" }}>
  //     <input
  //       className="inputBox"
  //       placeholder="Search by Id"
  //       style={{
  //         marginLeft: "25px",
  //         height: "-webkit-fill-available",
  //         width: "20%",
  //       }}
  //       onChange={handleConsultantIdSearch}
  //     />

  //     <input
  //       className="inputBox"
  //       placeholder="Search by Email"
  //       style={{
  //         marginLeft: "25px",
  //         height: "-webkit-fill-available",
  //         width: "20%",
  //       }}
  //       onChange={handleEmailSearch}
  //     />
  //     <input
  //       className="inputBox"
  //       placeholder="Search by Phone No."
  //       style={{
  //         marginLeft: "25px",
  //         height: "-webkit-fill-available",
  //         width: "20%",
  //       }}
  //       onChange={handleConsultantPhoneSearch}
  //     />
  //   </div>
  // );

  if (isLoading) {
    return (
      <span className="loadPage">
        <Atom color="#3a3a3a" size="medium" text="" textColor="" />
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
        tableTitle="User Device Info"
        // customFilterComponent={customFilterComponent}
        dynamicPagination={dynamicPagination}
        totalPage={totalPage}
        currentPage={page}
        pageSize={pageSize}
        setPage={setPage}
        setPageSize={setPageSize}
        showTableHeading={false}
        includeCheckbox={false}
      />
      {data?.length == 0 && <span className="no-data-new">No Device Info</span>}
    </div>
  );
};

export default UntrackedUser;
