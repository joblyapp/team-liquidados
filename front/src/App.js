import { HashRouter, Route, Routes } from "react-router-dom";
import Welcome from "./components/welcome";
import Sales from "./components/sales";
import Products from "./components/products";
import Stats from "./components/stats";

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route exact path='/' element={<Welcome />} />
        <Route exact path='/sales' element={<Sales />} />
        <Route exact path='/products' element={<Products />} />
        <Route exact path='/stats' element={<Stats />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
