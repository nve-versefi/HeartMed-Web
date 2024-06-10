import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import ServiceManagement from '@/components/ServiceManagement';


const ManagementPage: React.FC = () => {
  const router = useRouter();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (!isLoggedIn) {
      router.push('/login');
    }
  }, []);

  return (
    <div>
      <ServiceManagement />

    </div>
  );
};

export default ManagementPage;