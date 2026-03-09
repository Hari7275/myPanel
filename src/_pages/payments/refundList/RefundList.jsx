import React, { useEffect, useMemo, useState } from "react";
import DyCommonTable from "../../../_components/table/DyCommonTable";
import { REFUND_LIST_COLUMNS } from "./refundListColumns";
import { useGetRefundListQuery } from "../../../_store/api";
import { Atom } from "react-loading-indicators";

const RefundList = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const { data: fetchData, isLoading } = useGetRefundListQuery({
    page,
    size: pageSize,
  });

  useEffect(() => {
    if (fetchData && fetchData.data) {
      setData(fetchData.data);
    } else {
      setData([]);
    }
  }, [fetchData]);

  const columns = useMemo(() => [...REFUND_LIST_COLUMNS], []);

  const totalPage = fetchData?.meta?.total_page;

  if (isLoading) {
    return (
      <span className="loadPage">
        <Atom color="#1c2434" size="medium" />
      </span>
    );
  }

  return (
    <DyCommonTable
      columns={columns}
      data={data}
      includeActions={false}
      tableTitle="Refund List"
      dynamicPagination={true}
      totalPage={totalPage}
      currentPage={page}
      pageSize={pageSize}
      setPage={setPage}
      setPageSize={setPageSize}
      includeCheckbox={false}
      showTableHeading={false}
    />
  );
};

export default RefundList;
