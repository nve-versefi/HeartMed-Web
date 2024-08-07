'use client';

import React, { useState, useEffect } from 'react';
import { MenuItem } from '@/components/menudata.types';
import ClientHeader from './ClientHeader';

async function fetchMenuData(): Promise<MenuItem[]> {
  const res = await fetch('/api/menu');
  if (!res.ok) {
    throw new Error(`Failed to fetch menu data: ${res.statusText}`);
  }
  return res.json();
}

export default function ServerHeader() {
  const [menuData, setMenuData] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchMenuData()
      .then(data => {
        setMenuData(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching menu data:', err);
        setError(err.message || 'Failed to load menu data');
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading menu...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <ClientHeader initialMenuData={menuData} />
  );
}