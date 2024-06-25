'use client'
import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

const CookieBanner = () => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const storedUserId = localStorage.getItem('userId');
    if (storedUserId) {
      setUserId(storedUserId);
    } else {
      const newUserId = uuidv4();
      localStorage.setItem('userId', newUserId);
      setUserId(newUserId);
    }
  }, []);

  useEffect(() => {
    const fetchCookieConsent = async () => {
      if (userId) {
        try {
          const response = await fetch(`/api/cookieConsent?userId=${userId}`);
          if (response.ok) {
            const data = await response.json();
            if (!data.consentDetails) {
              setIsVisible(true);
            }
          } else {
            setIsVisible(true);
          }
        } catch (error) {
          console.error('Error retrieving cookie consent:', error);
          setIsVisible(true);
        }
      }
    };

    fetchCookieConsent();
  }, [userId]);

  const handleConsentDecision = async (consentDetails: { essential: boolean; performance: boolean; marketing: boolean }) => {
    setIsVisible(false);

    try {
      await fetch('/api/cookieConsent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId,
          consentDetails,
          consentVersion: '1.0',
        }),
      });
    } catch (error) {
      console.error('Error updating cookie consent:', error);
    }
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 bg-white p-4 shadow-md text-center">
      <p className="text-sm mb-4">Usamos cookies para mejorar tu experiencia. Por favor indica tu preferencia abajo. Puedes modificarlas en cualquier momento</p>
      <div className="flex justify-center space-x-2">
        <button
          onClick={() =>
            handleConsentDecision({
              essential: true,
              performance: true,
              marketing: true,
            })
          }
          className="bg-pomegranate-500 text-white px-4 py-2 rounded hover:pomegranate-400"
        >
          Aceptar
        </button>
        <button
          onClick={() =>
            handleConsentDecision({
              essential: true,
              performance: true,
              marketing: false,
            })
          }
          className="bg-pomegranate-300 text-white px-4 py-2 rounded hover:bg-gray-600"
        >
          Aceptar solo las esenciales
        </button>
        <button
          onClick={() =>
            handleConsentDecision({
              essential: false,
              performance: false,
              marketing: false,
            })
          }
          className="bg-boulder-600 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Denegar
        </button>
      </div>
    </div>
  );
};

export default CookieBanner;