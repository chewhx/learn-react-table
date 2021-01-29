# Learning React Table (notes)

Course from [Codevolution](https://www.youtube.com/playlist?list=PLC3y8-rFHvwgWTSrDiwmUsl4ZvipOw9Cz)

*The course teaches each function on a basic table. But my working files are built on top of each feature learnt.*

# Basic table set-up
- Introduction to React Table
- Setting up a basic table
  - Set up raw data in json
  - Set up columns header and accessor in js
  - Basic HTML table layout
  - **useTable hook**
  - **destructure tableinstance**
  - mapping tableinstance to headers and rows
  - add styling to table

# Sort function
- Sorting function for table
  - **useSortBy hook**
  - add conditional rendering of 'up' and 'down' arrows into header
  - format dates with [date-fns package](https://www.npmjs.com/package/date-fns) 
  - format currency with [Intl API](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat/NumberFormat)

# Filter function
- Global filter for table
  - **useGlobalFilter hook**
  - create and add Search bar component taking props from globalFitler and setGlobalFilter
  - **useAsyncDebounce hook to delay rendering of filtered table**
- Column filter for table
  - **useFilter hook**
  - create ColumnFilter search bar component
  - add ColumnFilter component to each header via `/columns.js` which defines how the table will access data
```
import ColumnFilter from "./assets/ColumnFilter.js"
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
  - add ColumnFilter as default column to reduce repetition in `/column.js`
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

# Pagination 

##Basic pagination function

- **usePagination hook**
- destructure and map table by 'page' rather than 'rows'
- get 'nextPage', 'previousPage' functions from tableInstance
  - for onClick functions on buttons
- get 'canNextPage', 'canPreviousPage' functions from tableInstance
  - for disabled attribute on buttons

```
const {
  page,
  nextPage,
  previousPage,
  canNextPage,
  canPreviousPage,
} = tableInstance;

```

- add buttons
```
<button className="btn btn-primary" onClick={() => previousPage()} disabled={!canPreviousPage}>Previous</button>
<button className="btn btn-primary" onClick={() => nextPage()} disabled={!canNextPage}>Next</button>
```

## Page indicators
- get 'pageOptions' and 'state' from tableInstance 
- destructure 'pageIndex' from 'state'

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

- add indicators beside buttons

```
<span>
  Page {" "}
  {pageIndex + 1} of {pageOptions.length}
</span>
```

## Jump to first and last page

- from tableInstance: 'gotoPage', 'pageCount'
- insert 'First' and 'Last' buttons

```     
<button className="btn btn-dark" onClick={() => gotoPage(0)} disabled={!canPreviousPage}>First</button>

<button className="btn btn-dark" onClick={() => gotoPage(pageCount-1)} disabled={!canNextPage}>Last</button>
```
## Go to Page

- insert input field
- handle the input from user
- call gotoPage()
```
const handlePageInput = (e) => {
  const value = e.target.value
  const input = value ? Number(value) -1 : 0
  return input
}

...

<div>
  Go to page: {" "}
  <input type="number" defaultValue={pageIndex + 1} 
  onChange={ (e) => gotoPage(handlePageInput(e)) } />
</div>

```

## Set initial page shown

- set at the stage of applying the useTable hook
- page index start from zero(0), meaning index 2 is page 3 (2+1)

```
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
    usePagination
  );
```

## Set page size

- destructure from tableInstance: `setPageSize`
- destructure from state: `pageSize`
- add `<select>` HTML element, with:
  - onChange function calls `setPageSize()`
  - map an array of numbers to return different `<options>`

```
<select options={pageSize} onChange={(e) => setPageSize(Number(e.target.value))}>
  {
    [10, 25, 50].map(pageSize => (
      <option key={pageSize} value={pageSize}>
        Show {pageSize}
      </option>
    ))
  }
</select>
```

# Rows Selection

- Create Checkbox component which can handle indeterminate state. Copy code from React Table documentation example
- **useRowSelect** hook
- destructure 'selectedFlatRows' from tableInstance
- add visible checkbox component into rows, by function which get hooks, at the tableInstance
- for viewing the data of selected rows, insert a section in JSX page to display stringified json

# Columns Order

- **useColumnOrder** hook
- destructure setColumnOrder from tableInstance
- create button at top of table, set onClick to a user created function -> onChangeOrder()
- onChangeOrder() will call setOrderColumn(), passing in an array of accessors, ordered in the desired column display order

# Columns Hiding

- destructure 'allColumns' and 'getToggleHideAllColumnsProps' from tableInstance
- add Checkbox component which can handle indeterminate state on top of table, spreading getToggleHideAllColumnProps() 
- add hide toggle checkbox for all columns, by mapping allColumns