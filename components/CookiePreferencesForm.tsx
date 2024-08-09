'use client';

import React, { useState, useEffect } from 'react';

const CookiePreferencesForm = () => {
  const [cookiePreferences, setCookiePreferences] = useState({
    essential: true,
    functional: false,
    analytics: false,
    marketing: false,
  });

  useEffect(() => {
    // Load saved preferences from local storage
    const savedPreferences = JSON.parse(localStorage.getItem('cookiePreferences') || '{}');
    setCookiePreferences(prev => ({ ...prev, ...savedPreferences, essential: true }));
  }, []);

  const handleToggle = (cookieType) => {
    setCookiePreferences(prev => ({
      ...prev,
      [cookieType]: !prev[cookieType],
    }));
  };

  const savePreferences = () => {
    localStorage.setItem('cookiePreferences', JSON.stringify(cookiePreferences));
    // Here you would also update your actual cookie settings
    alert('Preferences saved successfully!');
  };

  return (
    <div className="max-w-2xl mx-auto p-4 bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-bold mb-4">Manage Your Cookie Preferences</h2>
      <p className="mb-4">We use cookies to enhance your browsing experience and provide personalized content. You can choose which types of cookies you allow.</p>
      
      <div className="space-y-4">
        {Object.entries(cookiePreferences).map(([key, value]) => (
          <div key={key} className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold capitalize">{key} Cookies</h3>
              <p className="text-sm text-gray-600">
                {key === 'essential' 
                  ? 'These cookies are necessary for the website to function and cannot be switched off.'
                  : `These cookies are used for ${key} purposes.`}
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={value}
                onChange={() => key !== 'essential' && handleToggle(key)}
                disabled={key === 'essential'}
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
            </label>
          </div>
        ))}
      </div>

      <button 
        onClick={savePreferences}
        className="mt-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
      >
        Save Preferences
      </button>
    </div>
  );
};

export default CookiePreferencesForm;