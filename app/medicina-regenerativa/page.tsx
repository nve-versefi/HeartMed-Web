import DefaultLayout from '@/app/(default)/layout';
import RegenerativaMenu from '@/components/regenerativamenu';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Medicina Regenerativa - HeartMed',
  description: 'Descubre nuestra oferta de medicina regenerativa, desde terapias celulares hasta tratamientos innovadores para la regeneración de tejidos.',
  openGraph: {
    title: 'Medicina Regenerativa - HeartMed',
    description: 'Descubre nuestra oferta de medicina regenerativa, desde terapias celulares hasta tratamientos innovadores para la regeneración de tejidos.',
    type: 'website',
    url: 'https://heart-med.vercel.app/medicina-regenerativa',
  },
  alternates: {
    canonical: 'https://heart-med.vercel.app/medicina-regenerativa',
  },
};

export default function Regenerativa() {
  return (
    <DefaultLayout>
      <div className='md:mx-48 sm:mx-24'>
        <RegenerativaMenu />
      </div>
    </DefaultLayout>
  );
}