import React from 'react';
import Image from 'next/image';

interface ImagePopupProps {
  images: string[];
  currentIndex: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}

const ImagePopup: React.FC<ImagePopupProps> = ({ images, currentIndex, onClose, onPrev, onNext }) => {
  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50"
      onClick={onClose}
    >
      <div className="relative max-w-4xl max-h-full">
        <button 
          className="absolute top-2 right-2 text-white text-4xl font-bold z-10"
          onClick={onClose}
        >
          ×
        </button>
        <div className="relative w-full h-[90vh]">
          <Image 
            src={images[currentIndex]} 
            alt={`Full size image ${currentIndex + 1}`} 
            layout="fill"
            objectFit="contain"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
        {currentIndex > 0 && (
          <button 
            className="absolute left-2 top-1/2 transform -translate-y-1/2 text-white text-4xl font-bold bg-black bg-opacity-50 px-3 py-1 rounded-full"
            onClick={(e) => { e.stopPropagation(); onPrev(); }}
          >
            ‹
          </button>
        )}
        {currentIndex < images.length - 1 && (
          <button 
            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-white text-4xl font-bold bg-black bg-opacity-50 px-3 py-1 rounded-full"
            onClick={(e) => { e.stopPropagation(); onNext(); }}
          >
            ›
          </button>
        )}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white">
          {currentIndex + 1} / {images.length}
        </div>
      </div>
    </div>
  );
};

export default ImagePopup;