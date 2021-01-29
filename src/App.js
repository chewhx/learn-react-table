import logo from "./logo.svg";
import "./App.css";
import Table from "./components/01-Table";
import Sorting from "./components/02-Sorting";
import GlobalFilter from "./components/03-GlobalFilter";
import ColumnFilter from "./components/04-ColumnFiltering";
import Pagination from "./components/05-Pagination";
import RowSelection from "./components/06-RowSelection";
import ColumnOrder from "./components/07-ColumnOrder";
import ColumnHiding from './components/08-ColumnHiding'

function App() {
  return (
    <div>
      <ColumnHiding />
    </div>
  );
}

export default App;
