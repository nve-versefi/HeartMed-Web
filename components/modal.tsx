import React, { ReactNode } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center overflow-y-auto">
      <div className="bg-white rounded w-full max-w-5xl mx-4 my-8 md:mx-auto max-h-[85vh] overflow-y-auto">
        <div className="flex justify-end p-2">
          <button onClick={onClose} className="text-red-500 text-lg font-bold">&times;</button>
        </div>
        <div className="p-4">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;