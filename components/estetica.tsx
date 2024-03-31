// components/estetica.tsx
import React from 'react';
import Link from 'next/link';
import menuData from './menudata';
import Form from  '../components/form';
import { FaCheckCircle, FaCog, FaUserTie, FaStar, FaMapMarkerAlt} from 'react-icons/fa';

const EsteticaMenu: React.FC = () => {
  const esteticaMenu = menuData.find((menu) => menu.title === 'Medicina Estética');

  if (!esteticaMenu) {
    return <div>Medicina Estética menu not found.</div>;
  }

  return (
    <div className="estetica-menu mt-8">
      <h2 className="text-2xl font-bold mb-4 text-center">{esteticaMenu.title}</h2>

      <p className="my-4 text-center mx-16 mb-16">
      Ciencia salud y belleza unidas en armonía
      </p>

      {/* Add text sections */}
      <div className="text-sections">
        <h3 className="text-xl font-semibold text-center mx-16 mb-2">¿Que es la Medicina Estética?</h3>
        <p className="mb-4 text-center mx-16">
        En HeartMed estamos comprometidos con una medicina estética basada en la ciencia médica, la salud, el bienestar y la confianza.
        </p>
        <p className="mb-4 text-center mx-16">
        Nuestro principal objetivo: la restauración de la armonía facial y corporal, la mejora de la calidad de la piel y el retraso del envejecimiento.
        </p>
        <p className="mb-4 text-center mx-16">
        Para ello contamos con un elenco multidisciplinar de profesionales médicos y estéticos especializados en diferentes técnicas de vanguardia y en constante aprendizaje de los avances que nos ofrece la ciencia.
        </p>
        <p className="mb-4 text-center mx-16">
        LA FELICIDAD COMIENZA POR SENTIRSE BIEN CON UNO MISMO
        </p>
      </div>

      {/* Add directory of sections */}
      <div className="directory-sections grid grid-cols-3 gap-8 my-8">
        <a href="#tratamientos" className="directory-item text-lg font-semibold text-center">
          Tratamientos
        </a>
        <a href="#masInformacion" className="directory-item text-lg font-semibold text-center">
          Más Información
        </a>
        <a href="#contacto" className="directory-item text-lg font-semibold text-center">
          Contacto
        </a>
      </div>

      {/* Add target sections */}
      <div id="tratamientos" className="submenu-grid grid grid-cols-3 gap-8">
  {esteticaMenu.submenu.map((submenuItem, index) => (
    <div key={index} className="submenu-item flex flex-col items-center">
      {submenuItem.path ? (
        <Link href={submenuItem.path}>
          <div className="cursor-pointer">
            <h3 className="text-xl text-center font-semibold mb-2">{submenuItem.name}</h3>
            <img
              src={submenuItem.imageUrl}
              alt={submenuItem.name}
              className="mb-4 w-48 h-48 object-cover"
            />
          </div>
        </Link>
      ) : (
        <div>
          <h3 className="text-xl font-semibold mb-2">{submenuItem.name}</h3>
          <img
            src={submenuItem.imageUrl}
            alt={submenuItem.name}
            className="mb-4 w-48 h-48 object-cover"
          />
        </div>
      )}
      <div className="services grid grid-cols-1 gap-2">
        {submenuItem.services &&
          submenuItem.services.map((service, serviceIndex) => (
            <Link key={serviceIndex} href={service.servicePath}>
              <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded w-full">
                {service.serviceName}
              </button>
            </Link>
          ))}
      </div>
    </div>
  ))}
</div>

      
      <div id="masInformacion" className="mas-informacion my-8 mx-36">
        <h3 className="text-xl font-semibold mb-4">Tratamientos de Medicina Estética más demandados</h3>
        <p className="mb-4">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nulla sit amet aliquam lacinia, nisl nisl aliquam nisl, nec aliquam nisl nisl sit amet nisl. Sed euismod, nulla sit amet aliquam lacinia, nisl nisl aliquam nisl, nec aliquam nisl nisl sit amet nisl.
        </p>
        <ul className="list-none mb-8">
          <li className="mb-2">
            <FaCheckCircle className="inline-block text-blue-500 mr-2" />
            Prevención y tratamiento del envejecimiento cutáneo
          </li>
          <li className="mb-2">
            <FaCheckCircle className="inline-block text-blue-500 mr-2" />
            El fotoenvejecimiento
          </li>
          <li className="mb-2">
            <FaCheckCircle className="inline-block text-blue-500 mr-2" />
            Depresiones y arrugas
          </li>
          {/* ... */}
        </ul>
        <p className="mb-4">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nulla sit amet aliquam lacinia, nisl nisl aliquam nisl, nec aliquam nisl nisl sit amet nisl. Sed euismod, nulla sit amet aliquam lacinia, nisl nisl aliquam nisl, nec aliquam nisl nisl sit amet nisl.
        </p>
      </div>

      <div className="feature-cards grid grid-cols-4 gap-8 my-16 mx-16">
        <div className="feature-card text-center border border-2 rounded-lg px-4 py-6">
          <FaCog className="text-4xl text-blue-500 mx-auto mb-4" />
          <p className="font-semibold">Equipamiento de alta tecnología</p>
        </div>
        <div className="feature-card text-center border border-2 rounded-lg px-4 py-6">
          <FaUserTie className="text-4xl text-blue-500 mx-auto mb-4" />
          <p className="font-semibold">Profesionales altamente cualificados</p>
        </div>
        <div className="feature-card text-center border border-2 rounded-lg px-4 py-6">
          <FaStar className="text-4xl text-blue-500 mx-auto mb-4" />
          <p className="font-semibold">Los mejores estándares de calidad</p>
        </div>
        <div className="feature-card text-center border border-2 rounded-lg px-4 py-6">
          <FaMapMarkerAlt className="text-4xl text-blue-500 mx-auto mb-4" />
          <p className="font-semibold">Tratamiento en St. Quirze</p>
        </div>
      </div>

      <div id="contacto" className="contacto">
      <Form />
      </div>
    </div>
  );
};

export default EsteticaMenu;