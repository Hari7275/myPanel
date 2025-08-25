import React, { useMemo, useState, useEffect } from "react";
import DyCommonTable from "../../../_components/table/DyCommonTable";
import { BLOGCOUNTCOLUMNS } from "./blogCountColumn";
import { useGetBlogCountListQuery } from "../../../_store/api";
import { Atom } from "react-loading-indicators";
import { debounce } from "lodash";

const BlogCount = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [dynamicPagination, setDynamicPagination] = useState(true);
  const [blogSlug, setBlogSlug] = useState("");

  const formatDate = (date) => {
    return date.toISOString().split("T")[0]; // "YYYY-MM-DD"
  };

  const today = new Date();
  // Initialize with empty strings instead of today's date for better UX
  const [start_date, setStart_date] = useState("");
  const [end_date, setEnd_Date] = useState("");

  // Build query params conditionally
  const queryParams = {
    page,
    size: pageSize,
    ...(blogSlug && { title: blogSlug }),
    ...(start_date && { start_date }),
    ...(end_date && { end_date }),
  };

  const {
    data: fetchData,
    isLoading,
    error,
  } = useGetBlogCountListQuery(queryParams);

  const columns = useMemo(
    () =>
      BLOGCOUNTCOLUMNS.map((column, index) => {
        if (index === 0) {
          return {
            ...column,
            accessor: (row, rowIndex) => (page - 1) * pageSize + rowIndex + 1,
          };
        }
        return column;
      }),
    [page, pageSize]
  );

  useEffect(() => {
    if (fetchData && fetchData?.data && fetchData?.data?.records) {
      setData(fetchData?.data?.records || []);
    }
  }, [fetchData]);

  // Apply debounce to search handlers
  const debouncedSearchStartDate = debounce(
    (value) => setStart_date(value),
    500
  );
  const debouncedSearchEndDate = debounce((value) => setEnd_Date(value), 500);

  const handleStartDateSearch = (e) => {
    const value = e?.target?.value || "";
    setPage(1);
    debouncedSearchStartDate(value);
    
    // Clear blog search when using date filters
    if (value && blogSlug) {
      setBlogSlug("");
    }
  };

  const handleEndDateSearch = (e) => {
    const value = e?.target?.value || "";
    setPage(1);
    debouncedSearchEndDate(value);
    
    // Clear blog search when using date filters
    if (value && blogSlug) {
      setBlogSlug("");
    }
  };

  const debouncedSearchBlogSlug = debounce((value) => setBlogSlug(value), 500);

  const handleBlogSlugSearch = (e) => {
    const value = e?.target?.value || "";
    
    // Only clear dates if there's a search value
    if (value) {
      setStart_date("");
      setEnd_Date("");
    }
    
    setPage(1);
    debouncedSearchBlogSlug(value);
  };

  const customFilterComponent = () => (
    <div style={{ width: "100%", height: "35px", display: "flex", alignItems: "center" }}>
      <input
        className="inputBox"
        placeholder="Search by title"
        value={blogSlug}
        style={{
          marginLeft: "25px",
          height: "-webkit-fill-available",
          width: "20%",
        }}
        onChange={handleBlogSlugSearch}
      />
      <label
        style={{
          marginLeft: "25px",
        }}
      >
        Start Date
      </label>
      <input
        className="inputBox"
        value={start_date}
        type="date"
        placeholder="Start date"
        style={{
          marginLeft: "5px",
          height: "-webkit-fill-available",
          width: "20%",
        }}
        onChange={handleStartDateSearch}
        max={end_date || undefined} // Prevent start date from being after end date
      />

      <label
        style={{
          marginLeft: "25px",
        }}
      >
        End Date
      </label>
      <input
        className="inputBox"
        type="date"
        value={end_date}
        placeholder="End date"
        style={{
          marginLeft: "5px",
          height: "-webkit-fill-available",
          width: "20%",
        }}
        onChange={handleEndDateSearch}
        min={start_date || undefined} // Prevent end date from being before start date
      />
    </div>
  );

  const totalPage = fetchData?.data?.meta?.totalPages || 1;

  if (isLoading) {
    return (
      <span className="loadPage">
        <Atom color="#1c2434" size="medium" text="" textColor="" />
      </span>
    );
  }

  return (
    <div>
      <DyCommonTable
        columns={columns}
        data={data}
        includeActions={false}
        customFilterComponent={customFilterComponent}
        tableTitle="Blog view Count"
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