import React from 'react';
import Link from 'next/link';
import menuData from '@/components/menudata';
import DefaultLayout from '@/app/(default)/layout';
import Head from 'next/head';

const TerapiaEpigeneticaPage: React.FC = () => {
  const regenerativaMenu = menuData.find((menu) => menu.title === 'Medicina Regenerativa');

  if (!regenerativaMenu) {
    return <div>Medicina Regenerativa menu not found.</div>;
  }

  const terapiaEpigenetica = regenerativaMenu.submenu.find(submenuItem => submenuItem.name === 'Ozonoterapia Médica');

  if (!terapiaEpigenetica) {
    return <div>Ozonoterapia Médica not found.</div>;
  }

  return (
    <DefaultLayout>
        <Head>
          <title>Ozonoterapia Médica - HeartMed</title>
          <meta name="description" content="Descubre nuestra Ozonoterapia Médica en HeartMed." />
          <meta property="og:title" content="Ozonoterapia Médica - HeartMed" />
          <meta property="og:description" content="Descubre nuestra Ozonoterapia Médica en HeartMed." />
          <meta property="og:type" content="website"/>
          <meta property="og:url" content="https://heart-med.vercel.app/ozonoterapia-medica" />
          <link rel="canonical" href="https://heart-med.vercel.app/ozonoterapia-medica" />
          <script type="application/ld+json">
            {JSON.stringify({
              "@context": "http://schema.org",
              "@type": "Service",
              "serviceType": "Ozonoterapia Médica",
              "provider": {
                "@type": "Organization",
                "name": "Heart Med",
                "url": "https://heart-med.vercel.app",
              },
              "areaServed": {
                "@type": "Place",
                "name": "España"
              },
              "url": "https://heart-med.vercel.app/ozonoterapia-medica",
              "name": "Ozonoterapia Médica",
              "description": "Descubre nuestra Ozonoterapia Médica en HeartMed.",
            })}
          </script>
        </Head>
        <div className="regenerativa-menu mx-24">
          <div id="ozonoterapia-medica" className="submenu-item">
            <div className="block submenu-item">
              <div className="banner-container">
                <div className="w-screen h-64 overflow-hidden relative">
                  <img
                    src={terapiaEpigenetica.imagePath || '/mnt/data/image.png'}
                    alt={terapiaEpigenetica.name}
                    className="object-cover h-full w-full absolute top-0 left-0"
                  />
                  <div className="w-screen h-64 flex items-center justify-center absolute top-0 left-0 bg-black bg-opacity-50">
                    <h1 className="text-3xl font-bold text-white mb-4">{terapiaEpigenetica.name}</h1>
                  </div>
                </div>
              </div>
            </div>
            <div className="problems-grid grid grid-cols-2 gap-8 mt-8">
              {terapiaEpigenetica.problems?.map((problem, problemIndex) => (
                <div key={problemIndex} className="problem-item">
                  <h3 className="text-3xl text-thunderbird-500 text-center font-bold mb-2">{problem.name}</h3>
                  <img src={problem.imageUrl} alt={problem.name} className="mb-4 w-full h-80 object-cover object-center" />
                  <div className="services-grid grid grid-cols-2 gap-4">
                    {problem.services.map((service, serviceIndex) => (
                      <Link key={serviceIndex} href={service.servicePath}>
                        <button className="bg-woodsmoke-300 hover:bg-thunderbird-500 text-white font-semibold py-2 px-4 rounded w-full">
                          {service.serviceName}
                        </button>
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </DefaultLayout>
  );
};

export default TerapiaEpigeneticaPage;