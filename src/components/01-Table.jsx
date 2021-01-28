import React, { useMemo } from "react";
import { useTable } from "react-table";
import dataJSON from "./assets/data.json";
import { COLUMNS } from "./assets/columns";

export default function Table() {
  // raw data for the table, memoised to prevent re-rendering
  const data = useMemo(() => dataJSON, []);

  // setting the Schema info for useTable hook, memoised to prevent re-rendering
  const columns = useMemo(() => COLUMNS, []);

  // apply useTable hook
  const tableInstance = useTable({ columns, data });

  // destructure tableInstance
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = tableInstance;

  console.log("tableInstance", tableInstance);

  return (
    <table className="table table-striped table-hover" {...getTableProps()}>
      <thead className="table-dark">
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th {...column.getHeaderProps()}>{column.render("Header")}</th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row) => {
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
  );
}
