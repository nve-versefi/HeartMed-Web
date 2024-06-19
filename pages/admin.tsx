import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import ServiceManagement from '@/components/ServiceManagement';
import ProductManagement from '@/components/ProductManagement';

const AdminPage: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<string>('services');
  const router = useRouter();

  useEffect(() => {
    const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
    if (!loggedIn) {
      router.push('/login');
    } else {
      setIsLoggedIn(true);
    }
  }, [router]);

  const renderContent = () => {
    switch (activeTab) {
      case 'services':
        return <ServiceManagement />;
      case 'products':
        return <ProductManagement />;
      // Add more cases for other management pages
      default:
        return <ServiceManagement />;
    }
  };

  if (!isLoggedIn) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold my-4 text-center">Admin Panel</h1>
      <div className="flex justify-center mb-4">
        <button
          onClick={() => setActiveTab('services')}
          className={`px-4 py-2 mr-2 ${activeTab === 'services' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
        >
          Service Management
        </button>
        <button
          onClick={() => setActiveTab('products')}
          className={`px-4 py-2 ${activeTab === 'products' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
        >
          Product Management
        </button>
      </div>
      <div>{renderContent()}</div>
    </div>
  );
};

export default AdminPage;
