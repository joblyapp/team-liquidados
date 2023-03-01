import { useSelector } from "react-redux";
import LogIn from "../components/login/logIn";
import OldSales from "../components/sales/oldSales/oldSales";
import SaleIndex from "../components/sales/saleIndex";
import NavBar from "../components/NavBar/NavBar";

import { selectUser } from "../features/userSlices";

export default function SalesPage({
  loggedIn,
  active,
  setActive,
  handleLogout,
}) {
  // Redux selector
  const user = useSelector(selectUser);

  return (
    <>
      {!loggedIn ? (
        <LogIn />
      ) : (
        <>
          <NavBar
            handleLogout={handleLogout}
            active={active}
            setActive={setActive}
          />
          <SaleIndex />
        </>
      )}
    </>
  );
}
