import LogIn from "../components/login/logIn";
import Welcome from "../components/Welcome/welcome";
import NavBar from "../components/NavBar/NavBar";
import { useState } from "react";
import UserProfileModal from "../components/UserProfileModal/UserProfileModal";
import { useModal } from "../helpers/modalProvider";

export default function WelcomePage({
  loggedIn,
  active,
  setActive,
  handleLogout,
  setLoggedIn,
}) {
  const { isModalOpen, setIsModalOpen } = useModal();

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      {!loggedIn ? (
        <LogIn setLoggedIn={setLoggedIn} setActive={setActive} />
      ) : (
        <>
          {loggedIn && (
            <>
              <NavBar
                onProfileClick={openModal}
                handleLogout={handleLogout}
                active={active}
                setActive={setActive}
              />
              <Welcome setActive={setActive} />
              <UserProfileModal
                isOpen={isModalOpen}
                onRequestClose={closeModal}
              />
            </>
          )}
        </>
      )}
    </>
  );
}
