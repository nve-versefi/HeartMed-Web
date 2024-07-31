'use client'
import React, { useState, useEffect } from 'react';

interface ToastProps {
  message: string;
  type: 'error' | 'success';
  onClose: () => void;
}

const Toast: React.FC<ToastProps> = ({ message, type, onClose }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      onClose();
    }, 10000);

    return () => clearTimeout(timer);
  }, [onClose]);

  if (!isVisible) return null;

  return (
    <div className={`fixed bottom-4 justify-center p-4 rounded-md text-white ${type === 'error' ? 'bg-red-500' : 'bg-green-500'}`}>
      {message}
      <button onClick={() => setIsVisible(false)} className="ml-2 font-bold">
        &times;
      </button>
    </div>
  );
};

export default Toast;