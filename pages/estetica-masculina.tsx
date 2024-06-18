import React from 'react';
import Link from 'next/link';
import menuData from '@/components/menudata';
import DefaultLayout from '@/app/(default)/layout';
import RootLayout from '@/app/layout';
import Head from 'next/head';

const TratamientosFacialesPage: React.FC = () => {
  const esteticaMenu = menuData.find((menu) => menu.title === 'Medicina Estética');

  if (!esteticaMenu) {
    return <div>Medicina Estética Masculina menu not found.</div>;
  }

  const tratamientosFaciales = esteticaMenu.submenu.filter(submenuItem => submenuItem.name === 'Medicina Estética Masculina');

  return (
    <RootLayout>
        <DefaultLayout>
            <Head>
            <title>Medicina Estética Masculina - HeartMed</title>
            <meta name="description" content="Explora nuestra amplia gama en tratamientos de mecicina estética masculina." />
            <meta property="og:title" content="Medicina Estética Masculina - HeartMed" />
            <meta property="og:description" content="Explora nuestra amplia gama en tratamientos de mecicina estética masculina." />
            <meta property="og:type" content="website"/>
            <meta property="og:url" content="https://heart-med.vercel.app/estetica-masculina" />
            <link rel="canonical" href="https://heart-med.vercel.app/estetica-masculina" />
            <script type="application/ld+json">
                {JSON.stringify({
                "@context": "http://schema.org",
                "@type": "Service",
                "serviceType": "Tratamientos de Medicina Estética Masculina",
                "provider": {
                    "@type": "Organization",
                    "name": "Heart Med",
                    "url": "https://heart-med.vercel.app",
                //     "location": {
                //     "@type": "Place",
                //     "address": {
                //         "@type": "PostalAddress",
                //         "streetAddress": "Calle Falsa 123",
                //         "addressLocality": "Ciudad",
                //         "addressRegion": "Región",
                //         "postalCode": "12345",
                //         "addressCountry": "ES"
                //     }
                //     }
                },
                "areaServed": {
                    "@type": "Place",
                    "name": "España"
                },
                "url": "https://heart-med.vercel.app/estetica-masculina",
                "name": "Medicina Estética Masculina",
                "description": "Explora nuestra amplia gama en tratamientos de mecicina estética masculina.",
                // "aggregateRating": {
                //     "@type": "AggregateRating",
                //     "ratingValue": "4.5",
                //     "reviewCount": "20"
                // },
                // "priceRange": "€€€",
                // "availability": "http://schema.org/InStock"
                }) }
            </script>
            </Head>
            <div className="estetica-menu mx-24">
            <div id="tratamientos" className="submenu-grid grid grid-cols-1 gap-8">
                {tratamientosFaciales.map((submenuItem, index) => (
                <div key={index} className="submenu-item">
                    <div className="block submenu-item">
                    <a href={submenuItem.path || '#'} className="group">
                        <div className="banner-container">
                        <div className="w-screen h-64 overflow-hidden relative">
                            <img
                            src={submenuItem.imagePath || '/mnt/data/image.png'}
                            alt={submenuItem.name}
                            className="object-cover h-full w-full absolute top-0 left-0"
                            />
                            <div className="w-screen h-64 flex items-center justify-center absolute top-0 left-0 bg-black bg-opacity-50 group-hover:bg-opacity-0 transition duration-300">
                            <h1 className="text-3xl font-bold text-white mb-4">{submenuItem.name}</h1>
                            </div>
                        </div>
                        </div>
                    </a>
                    </div>
                    <div className="problems-grid grid grid-cols-2 gap-8">
                    {submenuItem.problems?.map((problem, problemIndex) => (
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
                ))}
            </div>
            </div>
        </DefaultLayout>
    </RootLayout>
  );
};


export default TratamientosFacialesPage;
