import React from 'react';
import Image from 'next/image';

const MyComponent: React.FC = () => {
  return (
    <div className="bg-thunderbird-50 w-full">
      <div className="bg-thunderbird-50 py-4 mx-48">
        <h2 className="text-3xl text-center text-thunderbird-500 font-bold mb-8">Bienvenido a HeartMed: Tu Centro de Medicina Estética de Confianza</h2>
        <div className="flex flex-col md:flex-row items-center justify-between mb-8">
            <div className="w-full md:w-1/2">
            <Image src="/images/placeholder-image.png" alt="Description of the image" width={500} height={500} />
            </div>
            <div className="w-full md:w-1/2">
            <p className="text-xl text-woodsmoke-500">
                En HeartMed, nos enorgullece ofrecerte un enfoque integral y personalizado para el cuidado de tu belleza y bienestar. Nuestro equipo de expertos en medicina estética está comprometido en brindarte tratamientos de última generación, combinando la ciencia más avanzada con un enfoque humano y cercano.
            </p>
            <p className="text-xl mt-8 text-woodsmoke-500">
            En nuestro centro, te recibiremos con los brazos abiertos para ayudarte a alcanzar tus metas estéticas y sentirte radiante tanto por dentro como por fuera. Entendemos que el deseo de modificar algún rasgo de nuestro aspecto físico surge de un anhelo profundo por agradar a los demás y/o a nosotros mismos.
            </p>
            </div>
        </div>
        <div className="mb-8 flex items-center justify-between">
            <p className="text-xl w-3/4">
            En HeartMed, siempre te aconsejaremos que realices esas modificaciones sin perder la esencia de tus rasgos genuinos. Corregir, disimular, resaltar, realzar o eliminar, ciertos aspectos de nuestra apariencia puede lograrse en la mayoría de los casos con tratamientos mínimamente invasivos y si fuese necesario recurrir a una técnica quirúrgica, contamos con los mejores cirujanos especializados en cada sector.
            </p>
            <div className="w-1/4 text-right ">
            <button className="bg-pomegranate-600 mr-20 ml-12 hover:bg-pomegranate-500 shadow text-white text-xl font-bold py-2 px-4 rounded-lg">
                Más Sobre Nosotros
            </button>
            </div>
        </div>
      </div>
    </div>
  );
};

export default MyComponent;