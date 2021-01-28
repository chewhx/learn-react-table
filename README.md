# Learning React Table

Course from [Codevolution](https://www.youtube.com/playlist?list=PLC3y8-rFHvwgWTSrDiwmUsl4ZvipOw9Cz)

# Learning Outcomes (not necessarily in order)

* important concepts to take-away

## Basic table set-up
- Introduction to React Table
- Setting up a basic table
  - Set up raw data in json
  - Set up columns header and accessor in js
  - Basic HTML table layout
  - *useTable hook
  - *destructure tableinstance
  - mapping tableinstance to headers and rows
  - add styling to table

## Sort function
- Sorting function for table
  - *useSortBy hook
  - add conditional rendering of 'up' and 'down' arrows into header
  - format dates with [date-fns package](https://www.npmjs.com/package/date-fns) 
  - format currency with [Intl API](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat/NumberFormat)

## Filter function
- Global filter for table
  - *useGlobalFilter hook
  - create and add Search bar component taking props from globalFitler and setGlobalFilter
  - *useAsyncDebounce hook to delay rendering of filtered table
- Column filter for table
  - *useFilter hook
  - create ColumnFilter search bar component
  - add ColumnFilter component to each header via `columns.js` which defines how the table will access data
```
import ColumnFilter from "./assets/ColumnFilter.js
...
export const COLUMNS = [
  {
    Header: "Date",
    accessor: "date",
    Cell: ({ value }) => {
      return format(new Date(value), "yyyy-MM-dd");
    },
    Filter: ColumnFilter,
  },
  {
    Header: "Code",
    accessor: "code",
    Filter: ColumnFilter,
  },
  ...
```
  - add ColumnFilter as default column to reduce repetition in `column.js`
```
const defaultColumn = useMemo(() => {
  return {Filter: ColumnFilter}
}, []);

...

const tableInstance = useTable(
  { columns, data, defaultColumn },
  useFilters,
  useGlobalFilter,
  useSortBy
);


```

## Pagination 

**Basic pagination function**

```
const {
  page,
  nextPage,
  previousPage,
  canNextPage,
  canPreviousPage,
} = tableInstance;

```

- *usePagination hook
- destructure and map table by 'page' rather than 'rows'
- get 'nextPage', 'previousPage' functions from tableInstance
  - for onClick functions on buttons
- get 'canNextPage', 'canPreviousPage' functions from tableInstance
  - for disabled attribute on buttons

```
<button className="btn btn-primary" onClick={() => previousPage()} disabled={!canPreviousPage}>Previous</button>
<button className="btn btn-primary" onClick={() => nextPage()} disabled={!canNextPage}>Next</button>
```

**Page indicators**

```
const {
  page,
  nextPage,
  previousPage,
  canNextPage,
  canPreviousPage,
  pageOptions,
  state,
} = tableInstance;

const { pageIndex } = state;

```

- get 'pageOptions' and 'state' from tableInstance 
- destructure 'pageIndex' from 'state'
- add indicators beside buttons

```
<span>
  Page {" "}
  {pageIndex + 1} of {pageOptions.length}
</span>

```