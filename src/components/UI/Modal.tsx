import { createContext } from "react";

type ModalProps = {
  onClose: () => void;
  children: React.ReactNode;
};

function Modal({ children, onClose }: ModalProps) {
  console.log(onClose);

  // 1) Create a context

  const ModalContext = createContext();
  return (
    // Provide context to the children
    <ModalContext.Provider value={}>
      <div
        className="fixed bg-black/90 min-h-screen inset-0 flex items-center justify-center"
        onClick={() => {
          onClose();
          console.log("clicked");
        }} // click outside closes modal
      >
        <div
          className="bg-blue-50 rounded max-h-[90vh] w-[90%] md:w-[600px] overflow-y-auto relative"
          onClick={(e) => e.stopPropagation()} // prevent click inside modal from closing
        >
          <button
            className="absolute top-2 right-2 text-gray-600 hover:text-hsl(0, 0%, 50%)-900 font-bold text-xl cursor-pointer px-2 py-1 bg-red-300 rounded-lg"
            onClick={() => {
              onClose();
              console.log("clicked");
            }} // close button
          >
            X
          </button>
          {children}
        </div>
      </div>
    </ModalContext.Provider>
  );
}

export default Modal;
