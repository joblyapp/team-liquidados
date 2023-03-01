import { useSelector } from "react-redux";
import LogIn from "../components/login/logIn";
import Products from "../components/products/products";
import NavBar from "../components/NavBar/NavBar";

import { selectUser } from "../features/userSlices";

export default function ProductsPage({
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
          <Products />
        </>
      )}
    </>
  );
}
