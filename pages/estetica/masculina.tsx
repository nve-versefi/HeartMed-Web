// Home component
import { useEffect, useState } from 'react';
import ServiceInfo from '@/components/serviceinfo';
import DefaultLayout from '@/app/(default)/layout';
import RootLayout from '@/app/layout';

const Home: React.FC = () => {
  const [serviceData, setServiceData] = useState<any>(null);

  useEffect(() => {
    const fetchServiceData = async () => {
      try {
        const response = await fetch('/api/services/Neuromoduladores'); // Fetch service by title
        setServiceData(await response.json());
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