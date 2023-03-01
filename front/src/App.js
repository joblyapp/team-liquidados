import { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ProductsPage from "./pages/productsPage";
import WelcomePage from "./pages/welcomePage";
import StatsPage from "./pages/statsPage";
import SalesPage from "./pages/salesPage";
import ChangePass from "./pages/changePass";
import { selectUser } from "./features/userSlices";
import { useSelector } from "react-redux";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [active, setActive] = useState("");
  const user = useSelector(selectUser);

  useEffect(() => {
    // check if user is logged in when the component mounts
    const token = sessionStorage.getItem("token");
    if (token) {
      setLoggedIn(true);
    }
  }, []);

  function handleLogout() {
    // perform logout logic here...
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("name");
    setLoggedIn(false);
    window.location.assign("http://localhost:3000/");
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route
          exact
          path="/"
          element={
            <WelcomePage
              setLoggedIn={setLoggedIn}
              setActive={setActive}
              active={active}
              loggedIn={loggedIn}
              handleLogout={handleLogout}
            />
          }
        />
        <Route
          exact
          path="/sales"
          element={
            <SalesPage
              setActive={setActive}
              active={active}
              loggedIn={loggedIn}
              handleLogout={handleLogout}
            />
          }
        />
        <Route
          exact
          path="/products"
          element={
            <ProductsPage
              setActive={setActive}
              active={active}
              loggedIn={loggedIn}
              handleLogout={handleLogout}
            />
          }
        />
        <Route exact path="/stats" element={<StatsPage />} />
        <Route
          exact
          path="/reset-password/:recoveryToken"
          element={<ChangePass />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
