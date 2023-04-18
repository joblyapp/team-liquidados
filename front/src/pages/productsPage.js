import LogIn from "../components/login/logIn";
import Products from "../components/products/products";
import NavBar from "../components/NavBar/NavBar";
import { useModal } from "../helpers/modalProvider";
import UserProfileModal from "../components/UserProfileModal/UserProfileModal";

export default function ProductsPage({
  loggedIn,
  active,
  setActive,
  handleLogout,
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
        <LogIn />
      ) : (
        <>
          <NavBar
            onProfileClick={openModal}
            handleLogout={handleLogout}
            active={active}
            setActive={setActive}
          />
          <Products />
          <UserProfileModal isOpen={isModalOpen} onRequestClose={closeModal} />
        </>
      )}
    </>
  );
}
