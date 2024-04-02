'use client'
import { useState, useEffect } from 'react';

const CookieBanner = () => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  useEffect(() => {
    const consent = getCookie('userConsent');
    if (!consent) {
      setIsVisible(true);
    }
  }, []);

  const handleConsentDecision = (decision: 'all' | 'essential' | 'none') => {
    console.log("Current cookies:", document.cookie);
    setIsVisible(false);
    setCookie('userConsent', decision);
        console.log("Cookie set. Checking value...");
        console.log(`Cookie value for userConsent:`, getCookie('userConsent'));

    if (decision === 'all') {
      fetch('/api/storeConsent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ consent: decision }),
      });
    }
  };

  const setCookie = (name: string, value: string) => {
    document.cookie = `${name}=${value}; path=/; max-age=31536000`;
  };

  const getCookie = (name: string): string | null => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) {
      const cookiePart = parts.pop();
      if (cookiePart) {
        const cookieValue = cookiePart.split(';').shift();
        console.log(`Cookie value for ${name}:`, cookieValue);
        return cookieValue ? cookieValue : null;
      }
    }
    return null;
  };
  

  if (!isVisible) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 bg-white p-4 shadow-md text-center">
      <p className="text-sm mb-4">Usamos cookies para mejorar tu experiencia. Por favor indica tu preferencia abajo. Puedes modificarlas en cualquier momento</p>
      <div className="flex justify-center space-x-2">
        <button onClick={() => handleConsentDecision('all')} className="bg-pomegranate-500 text-white px-4 py-2 rounded hover:bg-pomegranate-700">Aceptar</button>
        <button onClick={() => handleConsentDecision('essential')} className="bg-pomegranate-300 text-white px-4 py-2 rounded hover:bg-pomegranate-400">Aceptar solo las esenciales</button>
        <button onClick={() => handleConsentDecision('none')} className="bg-boulder-600 text-white px-4 py-2 rounded hover:bg-boulder-700">Denegar</button>
      </div>
    </div>
  );
};

export default CookieBanner;