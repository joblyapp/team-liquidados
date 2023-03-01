import LogIn from "../components/login/logIn";
import Welcome from "../components/welcome";
import NavBar from "../components/NavBar/NavBar";

export default function WelcomePage({
  loggedIn,
  active,
  setActive,
  handleLogout,
  setLoggedIn,
}) {
  // Redux selector

  return (
    <>
      {!loggedIn ? (
        <LogIn setLoggedIn={setLoggedIn} setActive={setActive} />
      ) : (
        <>
          {loggedIn && (
            <>
              {" "}
              <NavBar
                handleLogout={handleLogout}
                active={active}
                setActive={setActive}
              />{" "}
              <Welcome />{" "}
            </>
          )}
        </>
      )}
    </>
  );
}
