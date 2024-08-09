'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'; // Use `next/navigation` for new app router
import dynamic from 'next/dynamic';

const ServiceManagement = dynamic(() => import('@/components/ServiceManagement'));
const ProductManagement = dynamic(() => import('@/components/ProductManagement'));
const TrainingManagement = dynamic(() => import('@/components/TrainingManagement'));
const MachineryManagement = dynamic(() => import('@/components/MachineryManagement'));
const MenuManagement = dynamic(() => import('@/components/NavbarManagement'));
const CarouselManagement = dynamic (() => import ('@/components/CarouselManagement'));
const PopUpsManagement = dynamic (() => import ('@/components/PopUpModalManagement'));

const AdminPage: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<string>('services');
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
      if (!loggedIn) {
        router.push('/login');
      } else {
        setIsLoggedIn(true);
      }
    }
  }, [router]);

  const renderContent = () => {
    switch (activeTab) {
      case 'menus':
        return <MenuManagement />;
      case 'services':
        return <ServiceManagement />;
      case 'products':
        return <ProductManagement />;
      case 'trainings':
        return <TrainingManagement />;
      case 'machinery':
        return <MachineryManagement />;
      case 'carousel':
        return <CarouselManagement />;
      case 'popups':
        return <PopUpsManagement />;
      default:
        return <ServiceManagement />;
    }
  };

  if (!isLoggedIn) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold my-4 text-center">Plataforma de Administración HeartMed</h1>
      <div className="flex justify-center mb-4">
        <button
          onClick={() => setActiveTab('menus')}
          className={`px-4 py-2 mr-2 ${activeTab === 'menus' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
        >
          Administrar Menús
        </button>
        <button
          onClick={() => setActiveTab('services')}
          className={`px-4 py-2 mr-2 ${activeTab === 'services' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
        >
          Administrar Tratamientos
        </button>
        <button
          onClick={() => setActiveTab('products')}
          className={`px-4 py-2 mr-2 ${activeTab === 'products' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
        >
          Administrar Productos
        </button>
        <button
          onClick={() => setActiveTab('trainings')}
          className={`px-4 py-2 mr-2 ${activeTab === 'trainings' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
        >
          Administrar Formaciones
        </button>
        <button
          onClick={() => setActiveTab('machinery')}
          className={`px-4 py-2  mr-2 ${activeTab === 'machinery' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
        >
          Administrar Aparatología
        </button>
        <button
          onClick={() => setActiveTab('menus')}
          className={`px-4 py-2 mr-2 ${activeTab === 'menus' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
        >
          Administrar Lista de Suscriptores
        </button>
        <button
          onClick={() => setActiveTab('carousel')}
          className={`px-4 py-2 mr-2 ${activeTab === 'carousel' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
        >
          Administrar Carousel de Página Principal
        </button>

        <button
          onClick={() => setActiveTab('popups')}
          className={`px-4 py-2 ${activeTab === 'popups' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
        >
          Administrar Pop-Ups
        </button>
      </div>
      <div>{renderContent()}</div>
    </div>
  );
};

export default AdminPage;
