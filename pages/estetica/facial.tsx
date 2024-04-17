import Newsletter from '@/components/newsletter';
import SectionBreak from '@/components/sectionbreak';
import Card from '@/components/serviceinfo';
import ServiceMenu from '@/components/esteticamenu';
import Hero from '@/components/hero'
import DefaultLayout from '@/app/(default)/layout';
import RootLayout from '@/app/layout';

const Facial: React.FC = () => {
  const serviceIdToDisplay = 5;
  return (
    <>
      <RootLayout>
        <DefaultLayout>
          <Card serviceId={serviceIdToDisplay} />
          <SectionBreak />
          <Newsletter />
          <Hero />
          <ServiceMenu/>
        </DefaultLayout>
    </RootLayout>
    </>
  );
};

export default Facial;