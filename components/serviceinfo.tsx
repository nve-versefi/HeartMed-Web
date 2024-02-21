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
const ServiceInfo: React.FC<{ serviceId: number }> = ({ serviceId }) => {
  const service = servicesData.find(service => service.id === serviceId);

  if (!service) return <div>Service not found</div>;

  return (
    <div className="container mx-auto mt-16 p-4">
      <div className="bg-cover bg-center h-64 flex items-center justify-center" style={{ backgroundImage: `url(${service.image1})` }}>
        <h1 className="text-2xl font-bold text-woodsmoke-700 mb-4">{service.title}</h1>
      </div>
      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        {/* What Section */}
        <div>
          <h2 className="text-lg text-woodsmoke-700 font-bold">What it is</h2>
          <p className="text-md text-woodsmoke-700 font-regular"> {renderTextWithLineBreaks(service.what)} </p>
        </div>

        {/* How Section */}
        <div>
          <h2 className="text-lg text-woodsmoke-700 font-bold">How it's done</h2>
          <p className="text-md text-woodsmoke-700 font-regular"> {renderTextWithLineBreaks(service.how)} </p>
        </div>

        {/* Area Section */}
        <div>
          <h2 className="text-lg text-woodsmoke-700 font-bold">Target Areas</h2>
          <p className="text-md text-woodsmoke-700 font-regular"> {renderTextWithLineBreaks(service.area)} </p>
        </div>

        {/* Extra Info Section */}
        {service.extra && (
          <div>
            <h2 className="text-lg text-woodsmoke-700 font-bold">Extra Information</h2>
            <p className="text-md text-woodsmoke-700 font-regular"> {renderTextWithLineBreaks(service.extra)} </p>
          </div>
        )}
      </div>

      {/* Objectives Section */}
      <div className="mb-4">
        <h2 className="text-lg text-woodsmoke-700 font-bold">Objectives</h2>
        <p> {renderTextWithLineBreaks(service.objective1)} </p>
        <p> {renderTextWithLineBreaks(service.objective2)} </p>
      </div>

      {/* Images Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        {service.image1 && (
          <img src={service.image1} alt="Service Image 1" className="w-full" />
        )}
        {service.image2 && (
          <img src={service.image2} alt="Service Image 2" className="w-full" />
        )}
      </div>
    </div>
  );
};

export default ServiceInfo;
