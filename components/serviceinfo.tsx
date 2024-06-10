import React from 'react';
import { FaHourglassHalf, FaMoneyBillWave, FaSyringe } from 'react-icons/fa';
import AccordionComponent from './accordion copy';

const renderTextWithLineBreaks = (text: string) => {
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
  if (!serviceData) return <div>Service not found</div>;

  return (
    <div className="container mx-auto">
      <div className="banner-container">
        <div className="w-screen h-64 overflow-hidden relative">
          <div
            className="bg-cover bg-center h-full w-screen flex items-center justify-center absolute top-0 left-0"
            style={{ backgroundImage: `url(${serviceData.image1})` }}
          >
            <h1 className="text-2xl font-bold text-white mb-4">{serviceData.title}</h1>
          </div>
        </div>
      </div>
      <div className="container mx-auto">
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8 mb-4">
          {/* What Section */}
          <div>
            <h2 className="text-2xl text-thunderbird-500 font-bold">¿Por qué elegir nuestra Rinomodelación?</h2>
            <p className="text-lg text-woodsmoke-700 font-regular">{renderTextWithLineBreaks(serviceData.what)}</p>
          </div>

          {/* How Section */}
          <div>
            <h2 className="text-2xl text-thunderbird-500 font-bold">No Invasiva</h2>
            <p className="text-lg text-woodsmoke-700 font-regular">{renderTextWithLineBreaks(serviceData.how)}</p>
          </div>

          {/* Area Section */}
          <div>
            <h2 className="text-2xl text-thunderbird-500 font-bold">Resultados Inmediatos</h2>
            <p className="text-lg text-woodsmoke-700 font-regular">{renderTextWithLineBreaks(serviceData.area)}</p>
          </div>

          {/* Extra Info Section */}
          {serviceData.extra && (
            <div>
              <h2 className="text-2xl text-thunderbird-500 font-bold">¿Listo para transformar tu nariz sin cirugía?</h2>
              <p className="text-lg text-woodsmoke-700 font-regular">{renderTextWithLineBreaks(serviceData.extra)}</p>
            </div>
          )}
        </div>

        {/* Objectives Section */}
        <div className="mb-4 text-center">
          <h2 className="text-2xl text-thunderbird-500 font-bold">Recuperación Rápida, Sin Marcas ni Cicatrices</h2>
          <p className="text-lg">{renderTextWithLineBreaks(serviceData.objective1)}</p>
          <p className="text-lg">{renderTextWithLineBreaks(serviceData.objective2)}</p>
        </div>

        {/* Images Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          {serviceData.image1 && (
            <div className="w-full h-64">
              <img
                src={serviceData.image2}
                alt="Service Image 1"
                className="w-full h-full object-cover"
              />
            </div>
          )}
          {serviceData.image2 && (
            <div className="w-full h-64">
              <img
                src={serviceData.image3}
                alt="Service Image 2"
                className="w-full h-full object-cover"
              />
            </div>
          )}
        </div>

        {/* Icons Section */}
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

        {/* Accordion Component */}
        <AccordionComponent serviceData={serviceData} />
      </div>
    </div>
  );
};

export default ServiceInfo;
