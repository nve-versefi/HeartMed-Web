import React from 'react';
import { FaHourglassHalf, FaMoneyBillWave, FaSyringe } from 'react-icons/fa';
import AccordionComponent from './accordion';
import Head from 'next/head';

const renderTextWithLineBreaks = (text: string | undefined) => {
  if (!text) return null;

  return text.split('\n').map((line: string, index: number) => (
    <React.Fragment key={index}>
      {line}{index < text.split('\n').length - 1 && <br />}
    </React.Fragment>
  ));
};

interface ServiceInfoProps {
  serviceData: any;
}

const ServiceInfo: React.FC<ServiceInfoProps> = ({ serviceData }) => {
  if (!serviceData) {
    return <p>Loading...</p>;
  }

  //console.log('ServiceData:', serviceData); 

  return (
    <>
    <Head>
        <title>{serviceData.title} - HeartMed</title>
        <meta name="description" content={serviceData.what} />
        <meta property="og:title" content={serviceData.title} />
        <meta property="og:description" content={serviceData.what} />
        <meta property="og:type" content="website"/>
        <meta property="og:url" content={`https://heart-med.vercel.app/${serviceData.subcategory}/${serviceData.objectives}/${serviceData.title}`} />
        <link rel="canonical" href={`https://heart-med.vercel.app/${serviceData.subcategory}/${serviceData.objectives}/${serviceData.title}`} />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "http://schema.org",
            "@type": "Service",
            "serviceType": "TratamientoDeBelleza",
            "provider": {
              "@type": "Organization",
              "name": "Heart Med",
              "url": "https://heart-med.vercel.app",
              // "location": {
              //   "@type": "Place",
              //   "address": {
              //     "@type": "PostalAddress",
              //     "streetAddress": "Calle Falsa 123",
              //     "addressLocality": "Ciudad",
              //     "addressRegion": "Región",
              //     "postalCode": "12345",
              //     "addressCountry": "ES"
              //   }
              // }
            },
            "areaServed": {
              "@type": "Place",
              "name": "España"
            },
            "url": `https://heart-med.vercel.app/${serviceData.subcategory}/${serviceData.objectives}/${serviceData.title}`,
            "name": serviceData.title,
            "description": serviceData.what
          })}
        </script>
      </Head>
    <div className="container mx-auto">
      <div className="banner-container">
        <div className="w-screen h-64 overflow-hidden relative">
          <div
            className="bg-cover bg-center h-full w-screen flex items-center justify-center absolute top-0 left-0"
            style={{ backgroundImage: `url(${serviceData.image1 || ''})` }}
          >
            <h1 className="text-3xl font-bold text-white mb-4">{serviceData.title}</h1>
          </div>
        </div>
      </div>
      <div className="container mx-auto">
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8 mb-4">
          <div className="ml-8">
            <h2 className="text-2xl text-thunderbird-500 font-bold">{serviceData.subtitle1 ?? 'Subtitulo 1'}</h2>
            <p className="text-lg text-woodsmoke-700 font-regular">{renderTextWithLineBreaks(serviceData.what)}</p>
          </div>

          <div className="mr-12">
            <h2 className="text-2xl text-thunderbird-500 font-bold">{serviceData.subtitle2 ?? 'Subtitulo 2'}</h2>
            <p className="text-lg text-woodsmoke-700 font-regular">{renderTextWithLineBreaks(serviceData.how)}</p>
          </div>
        </div>

        <div className="mt-12">
            <h2 className="text-2xl text-center text-thunderbird-500 font-bold">{serviceData.subtitle3 ?? 'Subtitulo 3'}</h2>
            <p className="text-lg text-woodsmoke-700 font-regular">{renderTextWithLineBreaks(serviceData.area)}</p>
        </div>

        <div className="mb-4 text-center">
          <p className="text-lg">{renderTextWithLineBreaks(serviceData.objective1)}</p>
          <p className="text-lg">{renderTextWithLineBreaks(serviceData.objective2)}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
  <div className="w-full h-64">
    <img
      src={serviceData.image2 || "/images/placeholder-image.png"}
      alt="Service Image 1"
      className="w-full h-full object-cover"
    />
  </div>
  <div className="w-full h-64">
    <img
      src={serviceData.image3 || "/images/placeholder-image.png"}
      alt="Service Image 2"
      className="w-full h-full object-cover"
    />
  </div>
</div>



        <div className="p-6 my-8">
          <div className="grid grid-cols-3 gap-6">
            <div className="text-center">
              <FaHourglassHalf className="text-4xl text-thunderbird-500 mx-auto mb-4" />
              <p className="text-gray-700">
                <strong>Tiempo de realización</strong>
                <br />
                {renderTextWithLineBreaks(serviceData.time)}
              </p>
            </div>
            <div className="text-center">
              <FaMoneyBillWave className="text-4xl text-thunderbird-500 mx-auto mb-4" />
              <p className="text-gray-700">
                <strong>Financiación</strong>
                <br />
                {renderTextWithLineBreaks(serviceData.finance)}
              </p>
            </div>
            <div className="text-center">
              <FaSyringe className="text-4xl text-thunderbird-500 mx-auto mb-4" />
              <p className="text-gray-700">
                <strong>Anestesia</strong>
                <br />
                {renderTextWithLineBreaks(serviceData.anesthesia)}
              </p>
            </div>
          </div>
        </div>

        <AccordionComponent serviceData={serviceData} />
      </div>
    </div>
    </>
  );
};

export default ServiceInfo;
