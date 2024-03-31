import React from 'react';
import { Carousel } from 'antd';

const AutoCarousel: React.FC = () => (
  <Carousel effect="fade" autoplay>
    <div>
      <div
        style={{
          height: '400px',
          backgroundImage: 'url("/images/medic.jpg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
        className="relative"
      >
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
          <h2 className="text-woodsmoke-600 font-bold text-3xl mb-4">
            Descubre los mejores tratamientos para tratar las varices estéticas.
          </h2>
          <button className="bg-pomegranate-600 hover:bg-pomegranate-500 shadow text-xl text-white font-bold py-2 px-4 rounded">
            DESCUBRE MÁS
          </button>
        </div>
      </div>
    </div>
    <div>
      <div
        style={{
          height: '400px',
          backgroundImage: 'url("/images/estet.jpg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
        className="relative"
      >
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
          <h2 className="text-woodsmoke-600 font-bold text-3xl mb-4">2x1 En tratamientos de dermapen.</h2>
          <button className="bg-pomegranate-600 hover:bg-pomegranate-500 shadow text-xl text-white font-bold py-2 px-4 rounded">
            ASEGURA TU PROMOCIÓN
          </button>
        </div>
      </div>
    </div>
    <div>
      <div
        style={{
          height: '400px',
          backgroundImage: 'url("/images/antiaging.jpg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
        className="relative"
      >
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
          <h2 className="text-woodsmoke-600 font-bold text-3xl mb-4">5% de descuento en cirugías faciales este mes.</h2>
          <button className="bg-pomegranate-600 hover:bg-pomegranate-500 shadow text-white text-xl font-bold py-2 px-4 rounded">
            AGENDA TU CITA
          </button>
        </div>
      </div>
    </div>
    {/* Add more slides with similar structure */}
  </Carousel>
);

export default AutoCarousel;