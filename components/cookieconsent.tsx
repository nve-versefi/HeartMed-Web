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
      <p className="text-sm mb-4">We use cookies to enhance your experience. By continuing to visit this site you agree to our use of cookies.</p>
      <div className="flex justify-center space-x-2">
        <button onClick={() => handleConsentDecision('all')} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Accept All</button>
        <button onClick={() => handleConsentDecision('essential')} className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600">Accept Only Essential</button>
        <button onClick={() => handleConsentDecision('none')} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">Reject</button>
      </div>
    </div>
  );
};

export default CookieBanner;