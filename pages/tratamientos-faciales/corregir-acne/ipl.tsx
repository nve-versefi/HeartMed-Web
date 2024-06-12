import { useEffect, useState } from 'react';
import ServiceInfo from '@/components/serviceinfo';
import DefaultLayout from '@/app/(default)/layout';
import RootLayout from '@/app/layout';

const Home: React.FC = () => {
  const [serviceData, setServiceData] = useState<any>(null);

  useEffect(() => {
    const fetchServiceData = async () => {
      try {
        const encodedTitle = encodeURIComponent('IPL Luz Pulsada Intensa');
        const encodedObjectives = encodeURIComponent('corregir-acne');
        const encodedSubcategory = encodeURIComponent('tratamientos-faciales');
        const response = await fetch(`/api/services?title=${encodedTitle}&objectives=${encodedObjectives}&subcategory=${encodedSubcategory}`);
        
        if (response.ok) {
          const data = await response.json();
          console.log('Fetched service data:', data);
          setServiceData(data.service); 
        } else {
          console.error('Failed to fetch service:', response.statusText);
        }
      } catch (error) {
        console.error('Failed to fetch service:', error);
      }
    };
    fetchServiceData();
  }, []);

  return (
    <>
      <RootLayout>
        <DefaultLayout>
          <ServiceInfo serviceData={serviceData} />
        </DefaultLayout>
      </RootLayout>
    </>
  );
};

export default Home;