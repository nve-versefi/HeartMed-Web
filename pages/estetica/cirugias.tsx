import Newsletter from '@/components/newsletter';
import SectionBreak from '@/components/sectionbreak';
import Card from '@/components/serviceinfo';
import ServiceMenu from '@/components/esteticamenu';
import Hero from '@/components/hero'
// ...

const Home: React.FC = () => {
  const serviceIdToDisplay = 3;
  return (
    <>
      <Card serviceId={serviceIdToDisplay} />
      <SectionBreak />
      <Newsletter />
      <Hero />
      <ServiceMenu/>
    </>
  );
};

export default Home;