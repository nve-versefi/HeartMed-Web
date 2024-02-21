import dynamic from 'next/dynamic';


import Newsletter from '@/components/newsletter';

import SectionBreak from '@/components/sectionbreak'; 
import Card from '@/components/serviceinfo'


export const metadata = {
  title: 'HeartMed',
  description: 'Page description',
}


const Home: React.FC = () => {
  // Define the service ID you want to display
  const serviceIdToDisplay = 3;

  return (
    <>
      <Card serviceId={serviceIdToDisplay} />
      <SectionBreak />
      <Newsletter />
    </>
  );
};

export default Home;