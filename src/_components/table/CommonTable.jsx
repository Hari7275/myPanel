import React, { useEffect } from "react";
import {
  useTable,
  useSortBy,
  useRowSelect,
  usePagination,
  useGlobalFilter,
} from "react-table";
import TableCheckbox from "./TableCheckbox";
import GlobalFilter from "./GlobalFilter";
import Pagination from "./Pagination";
import "../../cssfolder/Actions.css";
import "./table.css";
import { useDispatch } from "react-redux";
import { setPageTitle } from "../../_store/slices/pageTitleSlice";

const CommonTable = ({
  showTableHeading = true,
  columns,
  data,
  tableTitle,
  includeActions = true,
  customFilterComponent,
  includeCheckbox = true,
  AddPackageButton,
  getRowProps,
}) => {
  const dispatch = useDispatch();
  useEffect(() => {
    if (tableTitle) {
      dispatch(setPageTitle(tableTitle || "Flude Admin Panel"));
    }
  }, [tableTitle]);
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    pageOptions,
    gotoPage,
    pageCount,
    setPageSize,
    state,
    setGlobalFilter,
    prepareRow,
  } = useTable(
    {
      columns,
      data,
    },
    useGlobalFilter,
    useSortBy,
    usePagination,
    useRowSelect,
    (hooks) => {
      hooks.visibleColumns.push((columns) => [
        ...(includeCheckbox
          ? [
              {
                id: "selection",
                Header: ({ getToggleAllRowsSelectedProps }) => (
                  <TableCheckbox {...getToggleAllRowsSelectedProps()} />
                ),
                Cell: ({ row }) => (
                  <TableCheckbox {...row.getToggleRowSelectedProps()} />
                ),
              },
            ]
          : []),
        ...columns,
        ...(includeActions
          ? [
              // {
              //   Header: "Actions",
              //   Cell: ({ row }) => <Actions actionType={row.values.Button} />,
              // },
            ]
          : []),
      ]);
    }
  );

  const { pageIndex, pageSize, globalFilter } = state;

  return (
    <>
      <div className="tableHeaderDiv">
        {/* it removes because to not display in UI table but PROPES pass ho rha hai */}
        {/* <div className="tableHeadingDiv">{tableTitle}</div> */}

        {showTableHeading && (
          <div className="tableHeadingDiv">{tableTitle}</div>
        )}
        <div className="filterDiv">
          <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />

          {customFilterComponent && customFilterComponent()}
          {AddPackageButton && AddPackageButton()}
        </div>
      </div>
      <div className="container">
        <div className="tableDiv">
          <table className="tableContainer" {...getTableProps()}>
            <thead style={{ position: "relative", zIndex: "9" }}>
              {headerGroups?.map((headerGroup) => {
                const { key, ...rest } = headerGroup.getHeaderGroupProps();
                return (
                  <tr key={key} {...rest}>
                    {headerGroup?.headers?.map((column) => {
                      const { key, ...rest } = column.getHeaderProps(
                        column.getSortByToggleProps()
                      );
                      return (
                        <th key={column.id} {...rest}>
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
            {/* <tbody {...getTableBodyProps()}>
              {page.map((row) => {
                prepareRow(row);
                const { key, ...rest } = row.getRowProps();
                return (
                  <tr key={key} {...rest}>
                    {row.cells.map((cell) => {
                      const { key, ...rest } = cell.getCellProps();
                      return (
                        <td key={key} {...rest}>
                          {cell.render("Cell")}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody> */}
            <tbody {...getTableBodyProps()}>
              {page?.map((row) => {
                prepareRow(row);
                return (
                  <tr
                    {...row?.getRowProps(
                      getRowProps ? getRowProps(row) : undefined
                    )}
                  >
                    {row?.cells?.map((cell) => (
                      <td {...cell?.getCellProps()}>{cell?.render("Cell")}</td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <Pagination
          pageIndex={pageIndex}
          pageOptions={pageOptions}
          pageSize={pageSize}
          setPageSize={setPageSize}
          canPreviousPage={canPreviousPage}
          canNextPage={canNextPage}
          pageCount={pageCount}
          nextPage={nextPage}
          previousPage={previousPage}
          gotoPage={gotoPage}
        />
      </div>
    </>
  );
};

export default CommonTable;
