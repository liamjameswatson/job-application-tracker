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
    <>
      <button
        className="btn-primary"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        {text}
      </button>
      {isOpen && (
        <Modal onClose={() => setIsOpen(false)}>
          {isOpen && <>{children}</>}
        </Modal>
      )}
    </>
  );
}

export default ModalButton;
