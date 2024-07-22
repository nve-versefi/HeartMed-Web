import DefaultLayout from '@/app/(default)/layout';
import EsteticaMenu from '@/components/esteticamenu';
import type { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
  const structuredData = {
    "@context": "http://schema.org",
    "@type": "WebPage",
    "name": "Medicina Estética - HeartMed",
    "description": "Menú de medicina estética",
    "url": "https://heart-med.vercel.app/medicina-estetica",
    "publisher": {
      "@type": "Organization",
      "name": "HeartMed",
      "url": "https://heart-med.vercel.app"
    }
  };

  return {
    title: 'Medicina Estética - HeartMed',
    description: 'Descubre toda nuestra oferta de medicina estética, desde tratamientos faciales a cirugías, cubrimos todas tus necesidades',
    openGraph: {
      title: 'Medicina Estética - HeartMed',
      description: 'Descubre toda nuestra oferta de medicina estética, desde tratamientos faciales a cirugías, cubrimos todas tus necesidades',
      type: 'website',
      url: 'https://heart-med.vercel.app/medicina-estetica',
    },
    alternates: {
      canonical: 'https://heart-med.vercel.app/medicina-estetica',
      types: {
        'application/ld+json': JSON.stringify(structuredData),
      },
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Medicina Estética - HeartMed',
      description: 'Descubre toda nuestra oferta de medicina estética, desde tratamientos faciales a cirugías, cubrimos todas tus necesidades',
    },
    appLinks: {
      ios: {
        url: 'https://heart-med.vercel.app/medicina-estetica',
        app_name: 'HeartMed',
      },
      android: {
        package: 'com.heartmed.app',
        app_name: 'HeartMed',
      },
    },
  };
}
async function getMedicinaEsteticaDataWithRetry(retries = 3): Promise<any> {
  try {
    return await getMedicinaEsteticaData();
  } catch (error) {
    if (retries > 0) {
      console.log(`Retrying... (${retries} attempts left)`);
      await new Promise(resolve => setTimeout(resolve, 1000));
      return getMedicinaEsteticaDataWithRetry(retries - 1);
    }
    throw error;
  }
}

export default async function Estetica() {
  let submenuData;
  let error;

  try {
    submenuData = await getMedicinaEsteticaDataWithRetry();
  } catch (e) {
    console.error('Failed to fetch Medicina Estética data:', e);
    error = 'Failed to load Medicina Estética data. Please try again later.';
  }

  return (
    <DefaultLayout>
      <div className='md:mx-48 sm:mx-24'>
        <EsteticaMenu initialData={submenuData} error={error} />
      </div>
    </DefaultLayout>
  );
}