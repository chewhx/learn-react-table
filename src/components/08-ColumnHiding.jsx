import React, { useMemo } from "react";
import {
  useTable,
  useSortBy,
  useGlobalFilter,
  useFilters,
  usePagination,
  useRowSelect,
  useColumnOrder,
} from "react-table";
import dataJSON from "./assets/data.json";
import { COLUMNS } from "./assets/columns";
import { GlobalFilter } from "./assets/GlobalFilter";
import { ColumnFilter } from "./assets/ColumnFilter";
import { PayeeFilter } from "./assets/PayeeFilter";
import { Checkbox } from "./assets/Checkbox";

export default function ColumnOrder() {
  // raw data for the table, memoised to prevent re-rendering
  const data = useMemo(() => dataJSON, []);

  // setting the Schema info for useTable hook, memoised to prevent re-rendering
  const columns = useMemo(() => COLUMNS, []);

  // define default column for "Filter: ColumnFilter"
  const defaultColumn = useMemo(() => {
    return { Filter: ColumnFilter };
  }, []);

  // apply useTable hook
  const tableInstance = useTable(
    {
      columns,
      data,
      defaultColumn,
      initialState: { pageIndex: 2 },
    },
    useFilters,
    useGlobalFilter,
    useSortBy,
    usePagination,
    useRowSelect,
    useColumnOrder,
    (hooks) => {
      hooks.visibleColumns.push((columns) => {
        return [
          {
            date: "selection",
            Header: ({ getToggleAllRowsSelectedProps }) => (
              <Checkbox {...getToggleAllRowsSelectedProps()} />
            ),
            Cell: ({ row }) => (
              <Checkbox {...row.getToggleRowSelectedProps()} />
            ),
          },
          ...columns,
        ];
      });
    }
  );

  // destructure tableInstance
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    prepareRow,
    pageOptions,
    gotoPage,
    pageCount,
    state,
    setGlobalFilter,
    setPageSize,
    selectedFlatRows,
    setColumnOrder,
    allColumns,
    getToggleHideAllColumnsProps,
  } = tableInstance;

  const { globalFilter, pageIndex, pageSize } = state;

  const handlePageInput = (e) => {
    const value = e.target.value;
    const input = value ? Number(value) - 1 : 0;
    return input;
  };

  const changeOrder = () => {
    setColumnOrder([
      'payee',
      'debit',
      'credit',
      'code',
      'date',
    ])
  }

  return (
    <>
      <div>
        <div>
          <Checkbox {...getToggleHideAllColumnsProps()} /> Toggle All
        </div>
        
        {
          allColumns.map(col => (
            <div key={col.id}>
              <label>
                <input type="checkbox" {...col.getToggleHiddenProps()} />
                {col.Header} 
              </label>
            </div>
          ))
        }

      </div>
      <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
      <button onClick={() => changeOrder()}>Change column order</button>
      <table className="table table-striped table-hover" {...getTableProps()}>
        <thead className="table-dark">
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.render("Header")}
                  <div>{column.canFilter ? column.render("Filter") : null}</div>
                  <span>
                    {column.isSorted
                      ? column.isSortedDesc
                        ? " 🔼"
                        : " 🔽"
                      : ""}
                  </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return <td {...cell.getCellProps}>{cell.render("Cell")}</td>;
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      <div>
        Page {pageIndex + 1} of {pageOptions.length}
      </div>
      <div>
        Go to page:{" "}
        <input
          type="text"
          defaultValue={pageIndex + 1}
          onChange={(e) => gotoPage(handlePageInput(e))}
          style={{ width: "30px" }}
        />
      </div>
      <div>
        <select
          options={pageSize}
          onChange={(e) => setPageSize(Number(e.target.value))}
        >
          {[10, 25, 50].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
      </div>
      <button
        className="btn btn-dark"
        onClick={() => gotoPage(0)}
        disabled={!canPreviousPage}
      >
        First
      </button>
      <button
        className="btn btn-primary"
        onClick={() => previousPage()}
        disabled={!canPreviousPage}
      >
        Previous
      </button>
      <button
        className="btn btn-primary"
        onClick={() => nextPage()}
        disabled={!canNextPage}
      >
        Next
      </button>
      <button
        className="btn btn-dark"
        onClick={() => gotoPage(pageCount - 1)}
        disabled={!canNextPage}
      >
        Last
      </button>
      <pre>
        <code>
          {JSON.stringify(
            {
              selectedFlatRows: selectedFlatRows.map((row) => row.original),
            },
            null,
            2
          )}
        </code>
      </pre>
    </>
  );
}

// 1. destructure 'allColumns' and 'getToggleHideAllColumnsProps' from tableInstance
// 2. add Checkbox component which can handle indeterminate state on top of table, spreading getToggleHideAllColumnProps() 
// 3. add hide toggle checkbox for all columns, by mapping allColumns from no.1