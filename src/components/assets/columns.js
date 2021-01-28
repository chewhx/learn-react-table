import { format } from "date-fns";

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
  },
  {
    Header: "Deposit",
    accessor: "credit",
  },
];
