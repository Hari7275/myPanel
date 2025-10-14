import React, { useEffect } from "react";
import Pagination from "./Pagination";
import {
  useTable,
  useSortBy,
  usePagination,
  useGlobalFilter,
  useRowSelect,
} from "react-table";
import TableCheckbox from "./TableCheckbox";
import GlobalFilter from "./GlobalFilter";
import "../../cssfolder/Actions.css";
import "./table.css";
import { useDispatch } from "react-redux";
import { setPageTitle } from "../../_store/slices/pageTitleSlice";

const DyCommonTable = ({
  showTableHeading = true,
  columns,
  data,
  tableTitle,
  includeActions = true,
  customFilterComponent,
  includeCheckbox = true,
  AddPackageButton,
  getRowProps,
  dynamicPagination = false,
  totalPage,
  currentPage,
  pageSize,
  setPage,
  setPageSize,
  setShowMoreCloumn,
  showGlobalSearch = true,
}) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (tableTitle) {
      dispatch(setPageTitle(tableTitle || "Flute Admin Panel"));
    }
  }, [tableTitle]);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page, // Static pagination data

    canNextPage,
    canPreviousPage,
    pageOptions,
    gotoPage,
    pageCount,
    state,
    setGlobalFilter,
    prepareRow,
  } = useTable(
    {
      columns,
      data,
      manualPagination: dynamicPagination, // Enables manual pagination if dynamicPagination is true
      pageCount: dynamicPagination ? totalPage : undefined, // Total pages for dynamic pagination
    },
    useGlobalFilter,
    useSortBy,
    usePagination,
    useRowSelect,
    (hooks) => {
      hooks.visibleColumns.push((columns) => [
        // **************************************** this hiding code for check box hiding ******************************************
        // ...(includeCheckbox
        //   ? [
        //       {
        //         id: "selection",
        //         Header: ({ getToggleAllRowsSelectedProps }) => (
        //           <TableCheckbox {...getToggleAllRowsSelectedProps()} />
        //         ),
        //         Cell: ({ row }) => (
        //           <TableCheckbox {...row.getToggleRowSelectedProps()} />
        //         ),
        //       },
        //     ]
        //   : []),
        ...columns,
        ...(includeActions
          ? [
              // Define custom actions here if required
            ]
          : []),
      ]);
    }
  );

  const { pageIndex, globalFilter } = state;

  const handlePageChange = (newPage) => {
    if (dynamicPagination) {
      setPage(newPage + 1); // API is 1-indexed
    } else {
      gotoPage(newPage);
    }
  };

  return (
    <>
      <div className="tableHeaderDiv">
        {/* it removes because to not display in UI table but PROPES pass ho rha hai */}

        {showTableHeading && (
          <div className="tableHeadingDiv">{tableTitle}</div>
        )}

        <div className="filterDiv">
          {showGlobalSearch && (
            <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
          )}
          {customFilterComponent && customFilterComponent()}
          {AddPackageButton && AddPackageButton()}
        </div>
      </div>
      <div className="container">
        <div className="tableDiv">
          <table className="tableContainer" {...getTableProps()}>
            <thead style={{ position: "relative", zIndex: "9" }}>
              {headerGroups.map((headerGroup, index) => {
                const { key, ...headerGroupProps } =
                  headerGroup.getHeaderGroupProps();
                return (
                  <tr key={key || index} {...headerGroupProps}>
                    {headerGroup.headers.map((column) => {
                      const { key: columnKey, ...columnProps } =
                        column.getHeaderProps(column.getSortByToggleProps());
                      return (
                        <th key={columnKey} {...columnProps}>
                          {column.render("Header")}
                          <span>
                            {column.isSorted
                              ? column.isSortedDesc
                                ? "⬇️"
                                : "⬆️"
                              : ""}
                          </span>
                        </th>
                      );
                    })}
                  </tr>
                );
              })}
            </thead>
            <tbody {...getTableBodyProps()}>
              {page.map((row) => {
                prepareRow(row);
                const { key, ...rowProps } = row.getRowProps(
                  getRowProps ? getRowProps(row) : undefined
                );
                return (
                  <tr key={key || row.id} {...rowProps}>
                    {row.cells.map((cell) => {
                      const { key: cellKey, ...cellProps } =
                        cell.getCellProps();
                      return (
                        <td key={cellKey} {...cellProps}>
                          {cell.render("Cell")}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <Pagination
          pageIndex={dynamicPagination ? currentPage - 1 : pageIndex}
          pageOptions={
            dynamicPagination ? Array.from({ length: totalPage }) : pageOptions
          }
          pageSize={pageSize}
          setPageSize={setPageSize}
          gotoPage={handlePageChange}
          canPreviousPage={
            dynamicPagination ? currentPage > 1 : canPreviousPage
          }
          canNextPage={
            dynamicPagination ? currentPage < totalPage : canNextPage
          }
          previousPage={() => handlePageChange(currentPage - 2)}
          nextPage={() => handlePageChange(currentPage)}
          pageCount={dynamicPagination ? totalPage : pageCount}
        />
      </div>
    </>
  );
};

export default DyCommonTable;
