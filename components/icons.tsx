import React from 'react';
import { FaHourglassHalf, FaMoneyBillWave, FaSyringe } from 'react-icons/fa';

const Card: React.FC = () => {
  return (
    <div className="p-6 my-8">
      <div className="grid grid-cols-3 gap-6">
        <div className="text-center">
          <FaHourglassHalf className="text-4xl text-thunderbird-500 mx-auto mb-4" />
          <p className="text-gray-700">
            <strong>Tiempo de realización</strong>
            <br />
            1-3h
          </p>
        </div>
        <div className="text-center">
          <FaMoneyBillWave className="text-4xl text-thunderbird-500 mx-auto mb-4" />
          <p className="text-gray-700">
            <strong>Financiación</strong>
            <br />
            Hasta 36 meses
          </p>
        </div>
        <div className="text-center">
          <FaSyringe className="text-4xl text-thunderbird-500 mx-auto mb-4" />
          <p className="text-gray-700">
            <strong>Anestesia</strong>
            <br />
            General
          </p>
        </div>
      </div>
    </div>
  );
};

export default Card;