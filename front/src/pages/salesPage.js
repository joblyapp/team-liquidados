import LogIn from "../components/login/logIn";
import SaleIndex from "../components/sales/saleIndex";
import NavBar from "../components/NavBar/NavBar";
import { useModal } from "../helpers/modalProvider";
import UserProfileModal from "../components/UserProfileModal/UserProfileModal";

export default function SalesPage({
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
          <SaleIndex />
          <UserProfileModal isOpen={isModalOpen} onRequestClose={closeModal} />
        </>
      )}
    </>
  );
}
