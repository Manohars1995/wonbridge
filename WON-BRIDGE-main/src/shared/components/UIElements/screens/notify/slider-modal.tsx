import React, { useEffect } from "react";
import ReactModal from "react-modal";

interface SlideModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title: string;
}

ReactModal.setAppElement("#root");

const SlideModal = ({
  isOpen,
  onClose,
  children,
  title
}: SlideModalProps) => {

  // Proper mobile scroll lock
  useEffect(() => {
    if (isOpen) {
      document.documentElement.classList.add("modal-open");
      document.body.classList.add("modal-open");
    } else {
      document.documentElement.classList.remove("modal-open");
      document.body.classList.remove("modal-open");
    }

    return () => {
      document.documentElement.classList.remove("modal-open");
      document.body.classList.remove("modal-open");
    };
  }, [isOpen]);

  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onClose}
      overlayClassName="fixed inset-0 bg-black/40 z-[100]"
      className="fixed top-15 sm:top-0 right-0 bottom-0
        w-full sm:w-[90%] md:w-[480px] lg:w-[440px]
        bg-white
        rounded-none sm:rounded-l-2xl
        shadow-xl p-4 outline-none
        transform transition-transform duration-300 ease-in-out
        flex flex-col"
      style={{
        content: {
          transform: isOpen ? "translateX(0)" : "translateX(100%)"
        }
      }}
    >
      <div className="flex justify-between items-center mb-3">
        <h4 className="text-lg sm:text-xl font-semibold truncate">
          {title}
        </h4>

        <button
          onClick={onClose}
          className="text-gray-600 hover:text-black text-lg font-bold"
        >
          ✕
        </button>
      </div>

      <div className="flex-1 overflow-y-auto min-h-0">
        {children}
      </div>
    </ReactModal>
  );
};

export default SlideModal;