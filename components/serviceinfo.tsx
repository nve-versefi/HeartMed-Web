// ServiceInfo.tsx
import React from 'react';
import servicesData from './servicedata'; // Adjust the path as needed

const renderTextWithLineBreaks = (text: string) => {
  return text.split('\n').map((line: string, index: number) => (
    <React.Fragment key={index}>
      {line}{index < text.split('\n').length - 1 && <br />}
    </React.Fragment>
  ));
};
interface Service {
  id: number;
  title: string;
  image1: string;
  what: string;
  how: string;
  area: string;
  objective1: string;
  objective2: string;
  extra?: string;
  image2?: string;
  image3?: string;
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
  targetAreas?: string[];
  objectives?: string[];
  relatedProd?: string[];
}

const ServiceInfo: React.FC<{ serviceId: number }> = ({ serviceId }) => {
  const service = servicesData.find(service => service.id === serviceId);

  if (!service) return <div>Service not found</div>;

  const accordionData = [];
  for (let i = 1; i <= 9; i++) {
    const faqKey = `faq${i}` as keyof Service;
    const answerKey = `answer${i}` as keyof Service;

    if (service[faqKey] && service[answerKey]) {
      const answer = service[answerKey];
      if (typeof answer === 'string') {
        accordionData.push({
          title: service[faqKey],
          content: renderTextWithLineBreaks(answer),
        });
      }
    }
  }

  return (
    <div className="container mx-auto">
      <div className="banner-container">
        <div className="w-screen h-64 overflow-hidden relative">
          <div
            className="bg-cover bg-center h-full w-screen flex items-center justify-center absolute top-0 left-0"
            style={{ backgroundImage: `url(${service.image1})` }}
          >
            <h1 className="text-2xl font-bold text-white mb-4">{service.title}</h1>
          </div>
        </div>
      </div>
    <div className="container mx-auto">
  <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8 mb-4">
    {/* What Section */}
    <div>
      <h2 className="text-2xl text-thunderbird-500 font-bold">¿Por qué elegir nuestra Rinomodelación?</h2>
      <p className="text-lg text-woodsmoke-700 font-regular"> {renderTextWithLineBreaks(service.what)} </p>
    </div>

    {/* How Section */}
    <div>
      <h2 className="text-2xl text-thunderbird-500 font-bold">No Invasiva</h2>
      <p className="text-lg text-woodsmoke-700 font-regular"> {renderTextWithLineBreaks(service.how)} </p>
    </div>

    {/* Area Section */}
    <div>
      <h2 className="text-2xl text-thunderbird-500 font-bold">Resultados Inmediatos</h2>
      <p className="text-lg text-woodsmoke-700 font-regular"> {renderTextWithLineBreaks(service.area)} </p>
    </div>

    {/* Extra Info Section */}
    {service.extra && (
      <div>
        <h2 className="text-2xl text-thunderbird-500 font-bold">¿Listo para transformar tu nariz sin cirugía?</h2>
        <p className="text-lg text-woodsmoke-700 font-regular"> {renderTextWithLineBreaks(service.extra)} </p>
      </div>
    )}
  </div>

  {/* Objectives Section */}
  <div className="mb-4 text-center">
    <h2 className="text-2xl text-thunderbird-500 font-bold"> Recuperación Rápida, Sin Marcas ni Cicatrices</h2>
    <p className="text-lg"> {renderTextWithLineBreaks(service.objective1)} </p>
    <p className="text-lg"> {renderTextWithLineBreaks(service.objective2)} </p>
  </div>

  {/* Images Section */}
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
  {service.image1 && (
    <div className="w-full h-64">
      <img
        src={service.image2}
        alt="Service Image 1"
        className="w-full h-full object-cover"
      />
    </div>
  )}
  {service.image2 && (
    <div className="w-full h-64">
      <img
        src={service.image3}
        alt="Service Image 2"
        className="w-full h-full object-cover"
      />
    </div>
  )}
</div>
</div>
</div>
  );
};

export default ServiceInfo;
