import React from "react";

export const PayeeFilter = ({ filterValue, setFilter }) => {
  return (
    <span>
      Search Payee: {""}
      <input
        type="search"
        value={filterValue || ""}
        onChange={(e) => setFilter(e.target.value)}
      />
    </span>
  );
};
