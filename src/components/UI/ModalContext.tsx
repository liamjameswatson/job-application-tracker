//1) Create a contect

import { createContext } from "react";

const ModalContext = createContext();

//ModalButton.tsx

import { useState } from "react";
import Modal from "./Modal";

type ModalButtonProps = {
  children: React.ReactNode;
  text: string;
};

function ModalButton({ children, text }: ModalButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  console.log(isOpen);

  return (
    <ModalContext.Provider value={{ isOpen }}>
      <button onClick={() => setIsOpen((isOpen) => !isOpen)}>{text}</button>
      {isOpen && (
        <Modal onClose={() => setIsOpen(false)}>
          {isOpen && <>{children}</>}
        </Modal>
      )}
    </ModalContext.Provider>
  );
}

export default ModalButton;
