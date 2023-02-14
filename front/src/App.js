import { BrowserRouter, HashRouter, Route, Routes } from "react-router-dom";
import ProductsPage from "./pages/productsPage";
import WelcomePage from "./pages/welcomePage";
import StatsPage from "./pages/statsPage";
import SalesPage from "./pages/salesPage";
import ChangePass from "./pages/changePass";




function App() {
  return (
    <BrowserRouter>

      <Routes>

        <Route exact path='/' element={<WelcomePage />} />
        <Route exact path='/sales' element={<SalesPage />} />
        <Route exact path='/products' element={<ProductsPage />} />
        <Route exact path='/stats' element={<StatsPage />} />
        <Route exact path='/reset-password/:token' element={<ChangePass />} />

      </Routes>

    </BrowserRouter>
  );
}

export default App;
