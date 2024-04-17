import Newsletter from '@/components/newsletter';
import SectionBreak from '@/components/sectionbreak';
import Card from '@/components/serviceinfo';
import ServiceMenu from '@/components/esteticamenu';
import Hero from '@/components/hero'
import DefaultLayout from '@/app/(default)/layout';
import RootLayout from '@/app/layout';

const Corporal: React.FC = () => {
  const serviceIdToDisplay = 4;
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

export default Corporal;