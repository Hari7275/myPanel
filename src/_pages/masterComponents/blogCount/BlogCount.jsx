import React, { useMemo, useState, useEffect } from "react";
import DyCommonTable from "../../../_components/table/DyCommonTable";
import { BLOGCOUNTCOLUMNS } from "./blogCountColumn";
import { useGetBlogCountListQuery } from "../../../_store/api";
import { Atom } from "react-loading-indicators";

const BlogCount = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10); // Adjusted default page size
  const [dynamicPagination, setDynamicPagination] = useState(true); // Enable or disable dynamic pagination

  const {
    data: fetchData,
    isLoading,
    error,
  } = useGetBlogCountListQuery({
    page,
    size: pageSize,
  });

  const columns = useMemo(() => BLOGCOUNTCOLUMNS, []);

  useEffect(() => {
    if (fetchData && fetchData?.data && fetchData?.data?.records) {
      setData(fetchData?.data?.records || []);
    }
  }, [fetchData]);

  const totalPage = fetchData?.data?.meta?.totalPages || 1;

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
        tableTitle="Blog Count"
        dynamicPagination={dynamicPagination}
        totalPage={totalPage}
        currentPage={page}
        pageSize={pageSize}
        setPage={setPage}
        setPageSize={setPageSize}
        includeCheckbox={false}
        showTableHeading={false}
      />
    </div>
  );
};

export default BlogCount;
