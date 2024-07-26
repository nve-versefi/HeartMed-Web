// app/[subcategory]/[problem]/[service]/page.tsx

import { notFound } from 'next/navigation';
import ServiceInfo from '@/components/serviceinfo';
import { Metadata } from 'next';

export interface ServiceData {
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

interface PageProps {
  params: { subcategory: string; problem: string; service: string };
}

async function getServiceData(params: PageProps['params']): Promise<ServiceData | null> {
  const { subcategory, problem, service } = params;
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
  const url = `${apiUrl}/api/${subcategory}/${problem}/${service}`;
  
  //console.log('Attempting to fetch data from:', url);

  try {
    //console.log('Initiating fetch request...');
    const res = await fetch(url, { 
      cache: 'no-store',
      headers: {
        'Content-Type': 'application/json',
      },
    });
  
    //console.log('Fetch request completed. Status:', res.status);

    if (!res.ok) {
      console.error(`API request failed with status ${res.status}`);
      const errorText = await res.text();
      console.error('Error response:', errorText);
      return null;
    }

    //console.log('Parsing JSON response...');
    const data = await res.json();
    //console.log('Received data:', JSON.stringify(data, null, 2));
    return data;
  } catch (error) {
    console.error('Error in getServiceData:', error);
    return null;
  }
}

export async function generateMetadata(
  { params }: PageProps
): Promise<Metadata> {
  const serviceData = await getServiceData(params);
  
  if (!serviceData) {
    return {
      title: 'Service Not Found',
    };
  }

  return {
    title: `${serviceData.title} - HeartMed`,
    description: serviceData.what,
    openGraph: {
      title: serviceData.title,
      description: serviceData.what,
      type: 'website',
      url: `https://heart-med.vercel.app/${serviceData.subcategory}/${serviceData.objectives[0]}/${serviceData.title}`,
    },
  };
}

export default async function ServicePage({ params }: PageProps) {
  //console.log('Rendering ServicePage with params:', params);
  
  try {
    //console.log('Attempting to fetch service data...');
    const serviceData = await getServiceData(params);

    //console.log('Service data fetch result:', serviceData);

    if (!serviceData) {
      //console.log('Service data not found, throwing error');
      throw new Error('Service not found');
    }

    //console.log('Rendering ServiceInfo component with data');
    return <ServiceInfo serviceData={serviceData} />;
  } catch (error) {
    //console.error('Error in ServicePage:', error);
    return (
      <div>
        <h1>Error</h1>
        <p>Failed to load service data. Please try again later.</p>
        <pre>{error instanceof Error ? error.message : String(error)}</pre>
        <p>Params: {JSON.stringify(params)}</p>
      </div>
    );
  }
}