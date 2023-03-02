import { useSelector } from "react-redux";
import LogIn from "../components/login/logIn";
import SaleIndex from "../components/sales/saleIndex";
import NavBar from "../components/NavBar/NavBar";

export default function SalesPage({
  loggedIn,
  active,
  setActive,
  handleLogout,
}) {
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
