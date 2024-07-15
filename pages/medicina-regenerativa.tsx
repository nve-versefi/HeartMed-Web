import RootLayout from '@/app/layout';
import DefaultLayout from '@/app/(default)/layout';
import Head from 'next/head';
import AntiAgingMenu from '@/components/antiagingmenu';


const Estetica: React.FC = () => {
  return (
    <>
     <Head>
      <title>Medicina Regenerativa - HeartMed</title>
      <meta name="description" content="Descubre toda nuestra oferta de medicina anti-aging, desde ozonoterapia a medicina epigenética, cubrimos todas tus necesidades" />
      <meta property="og:title" content="Medicina AntiAging - HeartMed"/>
      <meta property="og:description" content="Descubre toda nuestra oferta de medicina estética, desde tratamientos faciales a cirugías, cubrimos todas tus necesidades" />
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://heart-med.vercel.app/medicina-estetica" />
      <link rel="canonical" href="https://heart-med.vercel.app/medicina-estetica" />
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "http://schema.org",
          "@type": "WebPage",
          "name": "Medicina AntiAging - HeartMed",
          "description": "Menú de medicina estética",
          "url": "https://heart-med.vercel.app/medicina-estetica",
          "publisher": {
            "@type": "Organization",
            "name": "HeartMed",
            "url": "https://heart-med.vercel.app"
          }
        })}
      </script>
    </Head>
    <RootLayout>
        <DefaultLayout>
          <div className='md:mx-48 sm:mx-24'>
            <AntiAgingMenu/>

          </div>
        </DefaultLayout>
    </RootLayout>
    </>
  );
};

export default Estetica;