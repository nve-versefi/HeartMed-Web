// components/ui/StickyIcons.tsx
import React from 'react';
import { FaEnvelope, FaWhatsapp, FaPhone } from 'react-icons/fa';

const StickyIcons: React.FC = () => {
  return (
    <div className="fixed right-4 top-1/2 transform -translate-y-1/2 flex flex-col space-y-6 z-50">
      <a
        href="mailto:eurocosmetica@gmail.es"
        className="bg-thunderbird-400 text-white px-2 py-4 rounded-full text-xl flex items-center justify-center"
      >
        <FaEnvelope className="mr-2" />
      </a>
      <a
        href="https://wa.me/1234567890"
        target="_blank"
        rel="noopener noreferrer"
        className="bg-pomegranate-300 text-white px-2 py-4 rounded-full text-xl flex items-center justify-center"
      >
        <FaWhatsapp className="mr-2" />
      </a>
      <a
        href="tel:1234567890"
        className="bg-boulder-500 text-white px-2 py-4 rounded-full text-xl flex items-center justify-center"
      >
        <FaPhone className="mr-2" />
      </a>
    </div>
  );
};

export default StickyIcons;