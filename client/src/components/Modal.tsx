import React from 'react';

interface ModalProps {
  children: React.ReactNode;
  open: boolean;
  handleClose: () => void;
}

const Modal = ({ children, open, handleClose }: ModalProps) => {
  const modalOpenClass = 'modal modal-open';
  const modalCloseClass = 'modal cursor-pointer';
  return (
    <div className={open ? modalOpenClass : modalCloseClass}>
      <div className="modal-box relative">
        <button
          className="btn btn-sm btn-outline btn-circle absolute right-2 top-2"
          onClick={handleClose}
        >
          ✕
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
