import React, { useMemo, useState, useEffect } from "react";
import CommonTable from "../../table/CommonTable";

import { SESSIONSLOTCOLUMN } from "./sessionSlotColumn";
import { useGetSessionSlotQuery } from "../../../_store/api";
import { useSelector } from "react-redux";

import { useSearchParams } from "react-router-dom";
import DyCommonTable from "../../table/DyCommonTable";
import { Atom } from "react-loading-indicators";
import { useLocation, useParams } from "react-router-dom";

const SessionSlot = () => {
  const [data, setData] = useState([]);

  const [searchParams] = useSearchParams();
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [dynamicPagination, setDynamicPagination] = useState(true);

  //   const url = window.location.href;

  //   console.log("window.location.href", url.split("?"));

  // const consultantId = useSelector(
  //   (state) => state?.consultant?.consultantData
  // );

  const { consultantId } = useParams();

  const {
    data: fetchData,
    isLoading,
    isError,
  } = useGetSessionSlotQuery({ consultantId, page, size: pageSize });
  useEffect(() => {
    if (fetchData && fetchData?.data) {
      setData(fetchData?.data || []);
    } else setData([]);
  }, [fetchData]);

  const columns = useMemo(() => [...SESSIONSLOTCOLUMN]);
  const totalPage = fetchData?.meta?.totalPages;

  if (isLoading) {
    return (
      <span className="loadPage">
        <Atom color="#1c2434" size="medium" text="" textColor="" />
      </span>
    );
  }
  if (isError) return <div>Error loading data.</div>;

  return (
    <div>
      {/* <CommonTable
        columns={columns}
        data={data}
        includeCheckbox={false}
        tableTitle="Session Appointment"
      /> */}

      <DyCommonTable
        columns={columns}
        data={data}
        tableTitle="Appointment Session"
        includeActions={false}
        dynamicPagination={dynamicPagination}
        totalPage={totalPage}
        currentPage={page}
        pageSize={pageSize}
        setPage={setPage}
        setPageSize={setPageSize}
      />
    </div>
  );
};

export default SessionSlot;
