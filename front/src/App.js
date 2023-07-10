import { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import ProductsPage from "./pages/productsPage";
import WelcomePage from "./pages/welcomePage";
import StatsPage from "./pages/statsPage";
import SalesPage from "./pages/salesPage";
import ChangePass from "./pages/changePass";
import RecoveryPage from "./pages/RecoveryPage";
import ChangePassForm from "./components/changePass/changePassForm";
import { ModalProvider } from "./helpers/modalProvider";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  //state to show for the selected link in navbar
  const [active, setActive] = useState("");

  // add a constant to redirect page after logging out
  const logoutUrl = process.env.REACT_APP_LOGOUT;

 // const navigate = useNavigate();

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

    window.location.assign(logoutUrl);
 
  }

  return (
    <BrowserRouter>
      <ModalProvider>
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
          <Route exact path="/recovery" element={<RecoveryPage />} />
          <Route
            exact
            path="/stats"
            element={<StatsPage loggedIn={loggedIn} />}
          />
          <Route
            exact
            path="/reset-password/:recoveryToken"
            element={<ChangePassForm />}
          />
        </Routes>
      </ModalProvider>
    </BrowserRouter>
  );
}

export default App;
