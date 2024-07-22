import React from 'react';
import { FaHourglassHalf, FaMoneyBillWave, FaSyringe } from 'react-icons/fa';
import AccordionComponent from './accordion';
import { ServiceData } from '@/app/[subcategory]/[problem]/[service]/page';

interface ServiceInfoProps {
  serviceData: ServiceData;
}

const renderTextWithLineBreaks = (text: string | undefined) => {
  if (!text) return null;
  return text.split('\n').map((line: string, index: number) => (
    <React.Fragment key={index}>
      {line}
      {index < text.split('\n').length - 1 && <br />}
    </React.Fragment>
  ));
};

const ServiceInfo: React.FC<ServiceInfoProps> = ({ serviceData }) => {
  return (
    <div className="container mx-auto px-4">
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
          <div className="md:ml-8">
            <h2 className="text-2xl text-thunderbird-500 font-bold mb-4">{serviceData.subtitle1 ?? 'Subtitulo 1'}</h2>
            <p className="text-lg text-woodsmoke-700 font-regular">{renderTextWithLineBreaks(serviceData.what)}</p>
          </div>
          <div className="md:mr-12">
            <h2 className="text-2xl text-thunderbird-500 font-bold mb-4">{serviceData.subtitle2 ?? 'Subtitulo 2'}</h2>
            <p className="text-lg text-woodsmoke-700 font-regular">{renderTextWithLineBreaks(serviceData.how)}</p>
          </div>
        </div>
        <div className="mt-12">
            <h2 className="text-2xl text-center text-thunderbird-500 font-bold mb-4">{serviceData.subtitle3 ?? 'Subtitulo 3'}</h2>
            <p className="text-lg text-woodsmoke-700 font-regular text-center">{renderTextWithLineBreaks(serviceData.area)}</p>
        </div>
        <div className="mb-4 text-center">
          <p className="text-lg">{renderTextWithLineBreaks(serviceData.objective1)}</p>
          <p className="text-lg">{renderTextWithLineBreaks(serviceData.objective2)}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div className="flex justify-center" style={{ height: '450px', width: 'auto' }}>
            <img
              src={serviceData.image2 || "/mnt/data/image.png"}
              alt="Service Image 1"
              style={{ width: '450px', height: '450px', objectFit: 'cover' }}
            />
          </div>
          <div className="flex justify-center" style={{ height: '450px', width: 'auto' }}>
            <img
              src={serviceData.image3 || "/mnt/data/image.png"}
              alt="Service Image 2"
              style={{ width: '450px', height: '450px', objectFit: 'cover' }}
            />
          </div>
        </div>
        <div className="p-6 my-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <FaHourglassHalf className="text-4xl text-thunderbird-500 mx-auto mb-4" />
              <p className="text-gray-700">
                <strong>Tiempo de realización</strong>
                <br/>
                {renderTextWithLineBreaks(serviceData.time)}
              </p>
            </div>
            <div className="text-center">
              <FaMoneyBillWave className="text-4xl text-thunderbird-500 mx-auto mb-4" />
              <p className="text-gray-700">
                <strong>Financiación</strong>
                <br/>
                {renderTextWithLineBreaks(serviceData.finance)}
              </p>
            </div>
            <div className="text-center">
              <FaSyringe className="text-4xl text-thunderbird-500 mx-auto mb-4" />
              <p className="text-gray-700">
                <strong>Anestesia</strong>
                <br/>
                {renderTextWithLineBreaks(serviceData.anesthesia)}
              </p>
            </div>
          </div>
        </div>
        <AccordionComponent serviceData={serviceData} />
      </div>
    </div>
  );
};

export default ServiceInfo;
