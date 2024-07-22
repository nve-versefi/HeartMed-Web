import { notFound } from 'next/navigation';
import ServiceInfo from '@/components/serviceinfo';
import { Metadata } from 'next';

interface PageParams {
  params: { subcategory: string; problem: string; service: string };
}

export interface ServiceData {
  title: string;
  what: string;
  how: string;
  area: string;
  objective1: string;
  objective2: string;
  image1: string;
  image2: string;
  image3: string;
  time: string;
  finance: string;
  anesthesia: string;
  subtitle1?: string;
  subtitle2?: string;
  subtitle3?: string;
  subcategory: string;
  objectives: string[];
}

async function getServiceData(params: PageParams['params']): Promise<ServiceData | null> {
  const { subcategory, problem, service } = params;
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/${subcategory}/${problem}/${service}`, { cache: 'no-store' });
  
  if (!res.ok) {
    return null;
  }

  return res.json();
}

export async function generateMetadata({ params }: PageParams): Promise<Metadata> {
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

export default async function ServicePage({ params }: PageParams) {
  const serviceData = await getServiceData(params);

  if (!serviceData) {
    notFound();
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "http://schema.org",
          "@type": "Service",
          "serviceType": "TratamientoDeBelleza",
          "provider": {
            "@type": "Organization",
            "name": "Heart Med",
            "url": "https://heart-med.vercel.app",
          },
          "areaServed": {
            "@type": "Place",
            "name": "España"
          },
          "url": `https://heart-med.vercel.app/${serviceData.subcategory}/${serviceData.objectives[0]}/${serviceData.title}`,
          "name": serviceData.title,
          "description": serviceData.what
        })
      }} />
      <ServiceInfo serviceData={serviceData} />
    </>
  );
}