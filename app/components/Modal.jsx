import React from "react";

const Modal = ({ children, showModal, setShowModal }) => {
  return (
    showModal && (
      <div className="bg-black/45 fixed inset-0">
        <div className="flex justify-center items-center h-full">
          <div className="flex flex-col items-end bg-stone-200 w-1/2 p-5">
            <button
              className="text-2xl mb-3"
              onClick={() => setShowModal(false)}
            >
              &#215;
            </button>
            {children}
          </div>
        </div>
      </div>
    )
  );
};

export default Modal;
