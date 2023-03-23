import React, { useState, useContext } from "react";

const ModalContext = React.createContext();

function ModalProvider({ children }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <ModalContext.Provider value={{ isModalOpen, setIsModalOpen }}>
      {children}
    </ModalContext.Provider>
  );
}

function useModal() {
  const { isModalOpen, setIsModalOpen } = useContext(ModalContext);
  return { isModalOpen, setIsModalOpen };
}

export { ModalProvider, useModal };
