import { HashRouter, Route, Routes } from "react-router-dom";
import ProductsPage from "./pages/productsPage";
import WelcomePage from "./pages/welcomePage";
import StatsPage from "./pages/statsPage";
import SalesPage from "./pages/salesPage";



function App() {
  return (
    <HashRouter>
      <Routes>
        <Route exact path='/' element={<WelcomePage />} />
        <Route exact path='/sales' element={<SalesPage />} />
        <Route exact path='/products' element={<ProductsPage />} />
        <Route exact path='/stats' element={<StatsPage />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
