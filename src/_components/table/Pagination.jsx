import React from "react";

const Pagination = ({
  pageIndex,
  pageOptions,
  pageSize,
  setPageSize,
  gotoPage,
  canPreviousPage,
  canNextPage,
  previousPage,
  nextPage,
  pageCount,
}) => {
  return (
    <div className="pagination">
      <span>
        Page{" "}
        <strong>
          {pageIndex + 1} of {pageOptions.length}
        </strong>
      </span>

      <span>
        | Go to Page:{" "}
        <input
          type="number"
          defaultValue={pageIndex + 1}
          onChange={(e) => {
            const pageNumber = e.target.value ? Number(e.target.value) - 1 : 0;
            gotoPage(pageNumber);
          }}
          style={{ width: "50px" }}
        />
      </span>

      <select
        value={pageSize}
        onChange={(e) => setPageSize(Number(e.target.value))}
      >
        {[10, 15, 20, 25, 50].map((pageSize) => (
          <option key={pageSize} value={pageSize}>
            Show {pageSize}
          </option>
        ))}
      </select>

      <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
        {"<<"}
      </button>

      <button onClick={() => previousPage()} disabled={!canPreviousPage}>
        previous
      </button>
      <button onClick={() => nextPage()} disabled={!canNextPage}>
        next
      </button>
      <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
        {">>"}
      </button>
    </div>
  );
};

export default Pagination;
