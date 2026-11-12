import React, { useState, useEffect, useCallback } from "react";
import ReactModal from "react-modal";
import { IoIosCloseCircle } from "react-icons/io";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";

interface SlideModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  ImageList: string[];  // ARRAY OF URL STRINGS ONLY
  setModalRef: React.Dispatch<React.SetStateAction<HTMLElement | null>>;
}

ReactModal.setAppElement("#root");

const WeighmentModal = ({
  isOpen,
  onClose,
  title,
  ImageList,
  setModalRef
}: SlideModalProps) => {
  const [index, setIndex] = useState(0);

  // Reset index on open
  useEffect(() => {
    setIndex(0);
  }, [ImageList, isOpen]);

  const next = () => {
    setIndex((prev) => (prev + 1) % ImageList.length);
  };

  const prev = () => {
    setIndex((prev) => (prev - 1 + ImageList.length) % ImageList.length);
  };

  const modalContentRef = useCallback(
    (node: HTMLElement | null) => {
      setModalRef(node);
    },
    [setModalRef]
  );

  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onClose}
      overlayClassName="fixed inset-0 bg-black/50 z-60"
      className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[90%] h-[90%] max-w-5xl bg-white rounded-2xl shadow-xl p-3 border flex flex-col"
      contentRef={modalContentRef}
    >
      {/* Header */}
      <div className="flex justify-between items-center mb-2">
        <h4 className="text-xl text-black font-semibold">{title}</h4>

        <button
          type="button"
          onClick={onClose}
          className="text-gray-600 hover:text-black text-3xl cursor-pointer"
        >
          <IoIosCloseCircle />
        </button>
      </div>

      {/* IMAGE VIEWER */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative flex-1 border-2 border-gray-300 rounded-xl overflow-hidden flex items-center justify-center bg-black"
      >
        {ImageList.length > 0 ? (
          <>
            {/* Main image */}
            <img
              src={ImageList[index]}  // DIRECT URL
              className="object-contain w-full h-full transition-all duration-300"
              alt="preview"
            />

            {/* Left arrow */}
            <button
              type="button"
              onClick={prev}
              className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/40 text-white p-2 rounded-full hover:bg-black/60 cursor-pointer"
            >
              <IoChevronBack size={30} />
            </button>

            {/* Right arrow */}
            <button
              type="button"
              onClick={next}
              className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/40 text-white p-2 rounded-full hover:bg-black/60 cursor-pointer"
            >
              <IoChevronForward size={30} />
            </button>

            {/* Dots */}
            <div className="absolute bottom-3 flex gap-2">
              {ImageList.map((_, i) => (
                <div
                  key={i}
                  onClick={() => setIndex(i)}
                  className={`w-3 h-3 rounded-full cursor-pointer ${
                    i === index ? "bg-white" : "bg-gray-500"
                  }`}
                ></div>
              ))}
            </div>
          </>
        ) : (
          <div className="text-white text-lg">No images available</div>
        )}
      </div>
    </ReactModal>
  );
};

export default WeighmentModal;
