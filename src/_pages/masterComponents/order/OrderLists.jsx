import React, { useMemo, useState, useEffect } from "react";
import DyCommonTable from "../../../_components/table/DyCommonTable";
import { COLUMNORDER } from "./orderColumn";
import { useGetOrderListQuery } from "../../../_store/api";

const OrderLists = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10); // Adjusted default page size
  const [dynamicPagination, setDynamicPagination] = useState(true); // Enable or disable dynamic pagination

  const {
    data: fetchData,
    isLoading,
    error,
  } = useGetOrderListQuery({
    page,
    size: pageSize,
  });

  const columns = useMemo(() => COLUMNORDER, []);

  useEffect(() => {
    if (fetchData) {
      setData(fetchData?.data || []);
    }
  }, [fetchData]);

  const totalPage = fetchData?.meta?.total_page || 1;

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error fetching data: {error?.data?.message}</p>;

  return (
    <div>
      <DyCommonTable
        columns={columns}
        data={data}
        includeActions={false}
        tableTitle="Order List"
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

export default OrderLists;
