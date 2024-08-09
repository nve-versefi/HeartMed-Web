import React from 'react';

interface PopUpModal {
  _id: string;
  title: string;
  mainText: string;
  imageUrl: string;
  triggerType: 'time' | 'scroll' | 'exit';
  triggerValue: number;
  isActive: boolean;
  template: 'template1' | 'template2';
  ctaButtonText: string;
  ctaButtonLink: string;
  inputLabel1?: string;
  inputLabel2?: string;
  smallText?: string;
}

interface PopUpModalPreviewProps {
  modalData: PopUpModal;
}

const PopUpModalPreview: React.FC<PopUpModalPreviewProps> = ({ modalData }) => {
  if (!modalData) return null;

  const renderTemplate1 = () => (
    <div className="bg-white p-8 rounded-lg max-w-md w-full flex">
      <div className="w-1/2 pr-4">
        <img src={modalData.imageUrl} alt={modalData.title} className="w-full h-auto object-cover rounded" />
      </div>
      <div className="w-1/2">
        <h2 className="text-2xl font-bold mb-4">{modalData.title}</h2>
        <input type="text" placeholder={modalData.inputLabel1} className="w-full mb-2 p-2 border rounded" />
        <input type="text" placeholder={modalData.inputLabel2} className="w-full mb-2 p-2 border rounded" />
        <div className="flex items-center mb-2">
          <input type="checkbox" id="terms" className="mr-2" />
          <label htmlFor="terms">I accept the Terms & Conditions</label>
        </div>
        <a href={modalData.ctaButtonLink} className="bg-blue-500 text-white px-4 py-2 rounded inline-block hover:bg-blue-600 transition-colors">
          {modalData.ctaButtonText}
        </a>
      </div>
    </div>
  );

  const renderTemplate2 = () => (
    <div className="bg-white p-8 rounded-lg max-w-md w-full text-center">
      <img src={modalData.imageUrl} alt={modalData.title} className="w-32 h-32 mx-auto mb-4 object-cover rounded" />
      <h2 className="text-2xl font-bold mb-2">{modalData.title}</h2>
      <p className="text-sm mb-4">{modalData.smallText}</p>
      <a href={modalData.ctaButtonLink} className="bg-blue-500 text-white px-4 py-2 rounded inline-block hover:bg-blue-600 transition-colors">
        {modalData.ctaButtonText}
      </a>
    </div>
  );

  return (
    <div className="relative bg-white p-4 rounded shadow-md">
      {modalData.template === 'template1' ? renderTemplate1() : renderTemplate2()}
    </div>
  );
};

export default PopUpModalPreview;
