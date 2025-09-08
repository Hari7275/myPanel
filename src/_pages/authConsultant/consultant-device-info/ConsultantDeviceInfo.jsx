import React, { useMemo, useState, useEffect, useRef } from "react";
import DyCommonTable from "../../../_components/table/DyCommonTable";
import { CONSULTANT_DEVICE_INFO } from "./ConsultantDeviceInfoColumn";
import { useGetConsultantsDeviceTokenListQuery } from "../../../_store/api";
import { useDispatch } from "react-redux";

import { resetActiveTab } from "../../../_store/slices/activeSlice";
import { debounce } from "lodash";

import { Atom } from "react-loading-indicators";
import { useLocation } from "react-router-dom";

const ConsultantDeviceInfo = () => {
  const [data, setData] = useState([]);
  const dispatch = useDispatch();
  const [consultantId, setConsultantId] = useState("");
  const [page, setPage] = useState(1);
  const pageRef = useRef(page);
  const [pageSize, setPageSize] = useState(10);
  const [dynamicPagination, setDynamicPagination] = useState(true);

  const location = useLocation();

  const {
    data: fetchData,
    isLoading,
    error,
  } = useGetConsultantsDeviceTokenListQuery({
    page,
    size: pageSize,

    consultantId: consultantId,
  });

  useEffect(() => {
    pageRef.current = page;
  }, [page]);

  useEffect(() => {
    console.log("fetchData?.data", fetchData?.data);
    if (fetchData && fetchData?.data && fetchData?.data?.records) {
      const consultantData = fetchData?.data?.records;
      setData(consultantData);
    } else {
      setData([]);
    }
    dispatch(resetActiveTab());
  }, [fetchData, resetActiveTab]);

  const totalPage = fetchData?.data?.pagination?.totalPages || 1;
  // ? Math.ceil(fetchData.meta.total / pageSize)
  // : 1;

  useEffect(() => {
    if (location.state) {
      setPage(location.state.previousPage);
      setPageSize(location.state.previousPageSize);
    }
  }, [location.state]);

  const columns = useMemo(() => [...CONSULTANT_DEVICE_INFO], []);

  // Apply debounce to search handlers

  const debouncedSearchConsultantId = debounce(
    (value) => setConsultantId(value),
    500
  );

  const handleConsultantIdSearch = (e) => {
    setPage(1);
    debouncedSearchConsultantId(e?.target?.value);
  };

  const customFilterComponent = () => (
    <div style={{ width: "100%", height: "35px" }}>
      <input
        className="inputBox"
        placeholder="Search by consultant Id"
        style={{
          marginLeft: "25px",
          height: "-webkit-fill-available",
          width: "15%",
        }}
        onChange={handleConsultantIdSearch}
      />
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
        tableTitle="Unregistered Consultant List"
        customFilterComponent={customFilterComponent}
        dynamicPagination={dynamicPagination}
        totalPage={totalPage}
        currentPage={page}
        pageSize={pageSize}
        setPage={setPage}
        setPageSize={setPageSize}
        showTableHeading={false}
        includeCheckbox={false}
      />

      {/* <p>{count}</p>

      <button onClick={() => setCount(count + 1)}>INcrement</button> */}
      {data?.length == 0 && (
        <span className="no-data-new">No Consultant Avaliable</span>
      )}
    </div>
  );
};

export default ConsultantDeviceInfo;
