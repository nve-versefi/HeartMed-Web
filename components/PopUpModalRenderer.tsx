'use client'

import React, { useState, useEffect } from 'react';

interface PopUpModal {
    _id: string;
    title: string;
    mainText: string;
    imageUrl: string;
    triggerType: 'time' | 'scroll' | 'exit';
    triggerValue: number;
    isActive: boolean;
    template: 'template1' | 'template2';
    ctaButtonText: string;
    ctaButtonLink: string;
    inputLabel1?: string;
    inputLabel2?: string;
    smallText?: string;
}

const fetchWithRetries = async (url: string, options: RequestInit = {}, retries: number = 3, backoff: number = 1000) => {
  for (let i = 0; i < retries; i++) {
    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
        if (error instanceof Error) {
          console.error('Failed to fetch pop-up modals:', error.message);
        } else {
          console.error('An unexpected error occurred:', error);
        }
    }
  }
};

const PopUpModalRenderer: React.FC = () => {
  const [popUpModals, setPopUpModals] = useState<PopUpModal[]>([]);
  const [activeModal, setActiveModal] = useState<PopUpModal | null>(null);

  useEffect(() => {
    fetchPopUpModals();
  }, []);

  const fetchPopUpModals = async () => {
    try {
      const data = await fetchWithRetries('/api/popUpModals', {}, 3, 1000);
      setPopUpModals(data.filter((modal: PopUpModal) => modal.isActive));
    } catch (error) {
      console.error('Failed to fetch pop-up modals after multiple attempts:', error);
    }
  };

  useEffect(() => {
    if (popUpModals.length > 0) {
      setupModalTriggers();
    }
  }, [popUpModals]);

  const setupModalTriggers = () => {
    popUpModals.forEach(modal => {
      switch (modal.triggerType) {
        case 'time':
          setTimeout(() => setActiveModal(modal), modal.triggerValue * 1000);
          break;
        case 'scroll':
          const handleScroll = () => {
            const scrollPercentage = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
            if (scrollPercentage >= modal.triggerValue) {
              setActiveModal(modal);
              window.removeEventListener('scroll', handleScroll); // Remove the event listener once the modal is triggered
            }
          };
          window.addEventListener('scroll', handleScroll);
          break;
        case 'exit':
          const handleExit = () => {
            setActiveModal(modal);
            document.removeEventListener('mouseleave', handleExit); // Remove the event listener once the modal is triggered
          };
          document.addEventListener('mouseleave', handleExit);
          break;
      }
    });
  };

  const closeModal = () => {
    setActiveModal(null);
  };

  if (!activeModal) return null;

  const renderTemplate1 = (modal: PopUpModal) => (
    <div className="bg-white p-8 rounded-lg max-w-md w-full flex relative">
      <div className="w-1/2 pr-4">
        <img src={modal.imageUrl} alt={modal.title} className="w-full h-auto object-cover rounded" />
      </div>
      <div className="w-1/2">
        <h2 className="text-2xl font-bold mb-4">{modal.title}</h2>
        <input type="text" placeholder={modal.inputLabel1} className="w-full mb-2 p-2 border rounded" />
        <input type="text" placeholder={modal.inputLabel2} className="w-full mb-2 p-2 border rounded" />
        <div className="flex items-center mb-2">
          <input type="checkbox" id="terms" className="mr-2" />
          <label htmlFor="terms">Acepto los Términos y Condiciones de Uso</label>
        </div>
        <a href={modal.ctaButtonLink} className="bg-blue-500 text-white px-4 py-2 rounded inline-block hover:bg-blue-600 transition-colors">
          {modal.ctaButtonText}
        </a>
      </div>
      <button onClick={closeModal} className="absolute top-2 right-2 text-black text-xl">
        &times;
      </button>
    </div>
  );

  const renderTemplate2 = (modal: PopUpModal) => (
    <div className="bg-white p-8 rounded-lg max-w-md w-full text-center relative">
      <img src={modal.imageUrl} alt={modal.title} className="w-32 h-32 mx-auto mb-4 object-cover rounded" />
      <h2 className="text-2xl font-bold mb-2">{modal.title}</h2>
      <p className="text-sm mb-4">{modal.smallText}</p>
      <a href={modal.ctaButtonLink} className="bg-blue-500 text-white px-4 py-2 rounded inline-block hover:bg-blue-600 transition-colors">
        {modal.ctaButtonText}
      </a>
      <button onClick={closeModal} className="absolute top-2 right-2 text-black text-xl">
        &times;
      </button>
    </div>
  );

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      {activeModal.template === 'template1' ? renderTemplate1(activeModal) : renderTemplate2(activeModal)}
    </div>
  );
};

export default PopUpModalRenderer;
