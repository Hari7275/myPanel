import React, { useMemo, useEffect, useState } from "react";
import CommonTable from "../../../_components/table/CommonTable";
import DyCommonTable from "../../../_components/table/DyCommonTable";
import { ORDERCHARTCOLUMN } from "./coachOrderColumns";
import { useGetConsultantsOrderQuery } from "../../../_store/api";
import { useSelector } from "react-redux";
import { Atom } from "react-loading-indicators";
import { useLocation, useParams } from "react-router-dom";

const CoachOrder = () => {
  const [data, setData] = useState([]);
  // const consultantId = useSelector((state) => state.consultant.consultantData);
  const { consultantId } = useParams();

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [dynamicPagination, setDynamicPagination] = useState(true);

  const {
    data: fetchData,
    isFetching,
    isLoading,
    error,
  } = useGetConsultantsOrderQuery({
    consultantId,
    page,
    pageSize,
  });

  useEffect(() => {
    if (fetchData && fetchData?.data) {
      const response = fetchData.data.filter(
        (result) => result?.order_type !== 6
      );
      setData(response);
    } else {
      setData([]);
    }
  }, [fetchData]);

  const columns = useMemo(() => ORDERCHARTCOLUMN, []);

  const totalPage = fetchData?.meta?.total_page;

  if (isLoading || isFetching) {
    return (
      <span className="loadPage">
        <Atom color="#1c2434" size="medium" text="" textColor="" />
      </span>
    );
  }

  if (error) {
    return <div>Something went wrong while fetching data.</div>;
  }

  return (
    <div className="ProfileData-container profile-right-sub-container">
      {data.length > 0 ? (
        <DyCommonTable
          columns={columns}
          data={data}
          tableTitle="Order History"
          includeActions={false}
          includeCheckbox={false}
          dynamicPagination={dynamicPagination}
          totalPage={totalPage}
          currentPage={page}
          pageSize={pageSize}
          setPage={setPage}
          setPageSize={setPageSize}
          // showTableHeading={false}
        />
      ) : (
        <div>No orders available.</div>
      )}
    </div>
  );
};

export default CoachOrder;
