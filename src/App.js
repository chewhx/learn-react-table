import logo from "./logo.svg";
import "./App.css";
import Table from "./components/01-Table";
import Sorting from "./components/02-Sorting";
import GlobalFilter from './components/03-GlobalFilter'
import ColumnFilter from './components/04-ColumnFiltering'
import Pagination from './components/05-Pagination'

function App() {
  return (
    <div className="App">
      <Pagination />
    </div>
  );
}

export default App;
