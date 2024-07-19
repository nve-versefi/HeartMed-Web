import React from 'react';

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded w-full max-w-5xl mx-4 md:mx-0">
        <div className="flex justify-end p-2">
          <button onClick={onClose} className="text-red-500 text-lg font-bold">&times;</button>
        </div>
        <div className="p-4 max-h-[80vh] overflow-y-auto flex">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
