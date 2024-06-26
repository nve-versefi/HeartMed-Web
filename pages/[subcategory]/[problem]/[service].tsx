import { GetServerSideProps } from 'next';
import ServiceInfo from '@/components/serviceinfo';
import RootLayout from '@/app/layout';
import DefaultLayout from '@/app/(default)/layout';

interface ServiceData {
  title: string;
  category: string;
  subcategory: string;
  image1_title: string;
  image2_title: string;
  image3_title: string;
  image1: string;
  image2: string;
  image3: string;
  subtitle1: string;
  what: string;
  subtitle2: string;
  how: string;
  subtitle3: string;
  area: string;
  time: string;
  anesthesia: string;
  finance: string;
  results: string;
  hospital: string;
  objective1: string;
  objective2: string;
  extra: string;
  faq1: string;
  answer1: string;
  faq2: string;
  answer2: string;
  faq3: string;
  answer3: string;
  faq4: string;
  answer4: string;
  faq5: string;
  answer5: string;
  faq6: string;
  answer6: string;
  faq7: string;
  answer7: string;
  faq8: string;
  answer8: string;
  faq9: string;
  answer9: string;
  targetAreas: string[];
  objectives: string[];
  relatedProd: string[];
}

interface ServicePageProps {
  serviceData: ServiceData | null;
}

const ServicePage: React.FC<ServicePageProps> = ({ serviceData }) => {
  if (!serviceData) {
    return <div>Service not found</div>;
  }

  // Wrap ServiceInfo in RootLayout and DefaultLayout
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

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { subcategory, problem, service } = context.params as { [key: string]: string };

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/services/${subcategory}/${problem}/${service}`);
    
    if (!res.ok) {
      console.error(`API responded with status: ${res.status}`);
      return { props: { serviceData: null } };
    }

    const serviceData = await res.json();

    return {
      props: {
        serviceData,
      },
    };
  } catch (error) {
    console.error('Error fetching service data:', error);
    return { props: { serviceData: null } };
  }
};

export default ServicePage;
