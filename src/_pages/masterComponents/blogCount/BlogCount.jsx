import React, { useMemo, useState, useEffect } from "react";
import DyCommonTable from "../../../_components/table/DyCommonTable";
import { BLOGCOUNTCOLUMNS } from "./blogCountColumn";
import { useGetBlogCountListQuery } from "../../../_store/api";
import { Atom } from "react-loading-indicators";
import { debounce } from "lodash";
import Button from "@mui/material/Button";
import BlogFilter from "./BlogFilter";

const BlogCount = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(15);
  const [dynamicPagination, setDynamicPagination] = useState(true);
  const [blogSlug, setBlogSlug] = useState("");
  const [searchInput, setSearchInput] = useState("");

  const formatDate = (date) => {
    return date.toISOString().split("T")[0]; // "YYYY-MM-DD"
  };

  const today = new Date();

  // Filter states
  const [showFilterPopover, setShowFilterPopover] = useState(false);
  const [appliedFilters, setAppliedFilters] = useState({
    startDate: "",
    endDate: "",
  });

  // Build query params conditionally
  const queryParams = {
    page,
    size: pageSize,
    ...(blogSlug && { title: blogSlug }),

    ...(appliedFilters.startDate && { start_date: appliedFilters.startDate }),
    ...(appliedFilters.endDate && { end_date: appliedFilters.endDate }),
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

  const debouncedSearchBlogSlug = debounce((value) => setBlogSlug(value), 500);

  const handleBlogSlugSearch = (e) => {
    const value = e?.target?.value || "";
    setSearchInput(value); // Update input immediately
    setPage(1);
    setAppliedFilters({
      startDate: "",
      endDate: "",
    }); // Fix: properly update the state

    debouncedSearchBlogSlug(value);
  };
  const handleApplyFilter = (filterData) => {
    setAppliedFilters(filterData);
    setPage(1); // Reset to first page when applying filters
    console.log("Applied filters:", filterData);
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
        placeholder="Search by title"
        // value={blogSlug}
        value={searchInput}
        style={{
          marginLeft: "25px",
          height: "-webkit-fill-available",
          width: "20%",
        }}
        onChange={handleBlogSlugSearch}
      />

      <div
        style={{ marginLeft: "20px", position: "relative" }}
        className="filter-button-wrapper"
      >
        <Button
          variant="contained"
          onClick={() => setShowFilterPopover(!showFilterPopover)}
        >
          Filter
        </Button>

        <BlogFilter
          isOpen={showFilterPopover}
          onClose={() => setShowFilterPopover(false)}
          onApplyFilter={handleApplyFilter}
          initialFilters={appliedFilters}
        />
      </div>
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
