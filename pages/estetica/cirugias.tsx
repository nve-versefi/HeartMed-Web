import Newsletter from '@/components/newsletter';
import SectionBreak from '@/components/sectionbreak';
import Card from '@/components/serviceinfo';
import ServiceMenu from '@/components/esteticamenu';
import Hero from '@/components/hero'
import DefaultLayout from '@/app/(default)/layout';
import RootLayout from '@/app/layout';
import FAQs from '@/components/accordion copy'

const Home: React.FC = () => {
  const serviceIdToDisplay = 3;
  return (
    <>
    <RootLayout>
        <DefaultLayout>
          <Card serviceId={serviceIdToDisplay} />
          <FAQs/>
        </DefaultLayout>
    </RootLayout>
    </>
  );
};

export default Home;