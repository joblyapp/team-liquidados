import { useSelector } from "react-redux";
import LogIn from "../components/login/logIn";
import Products from "../components/products/products";
import NavBar from "../components/NavBar/NavBar";

export default function ProductsPage({
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
          <Products />
        </>
      )}
    </>
  );
}
