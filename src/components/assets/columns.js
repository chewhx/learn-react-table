import { format } from "date-fns";
import { ColumnFilter } from "./ColumnFilter";

const format$ = (number) =>
  new Intl.NumberFormat("en-SG", { style: "currency", currency: "SGD" }).format(
    number
  );

export const COLUMNS = [
  {
    Header: "Date",
    accessor: "date",
    Cell: ({ value }) => {
      return format(new Date(value), "yyyy-MM-dd");
    },
  },
  {
    Header: "Code",
    accessor: "code",
  },
  {
    Header: "Payee",
    accessor: "payee",

  },
  {
    Header: "Withdrawal",
    accessor: "debit",
    Cell: ({ value }) => {
      return format$(value);
    },
  },
  {
    Header: "Deposit",
    accessor: "credit",
    Cell: ({ value }) => {
      return format$(value);
    },
  },
];
