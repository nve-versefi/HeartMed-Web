import React from 'react';
import Link from 'next/link';
import menuData from './menudata';
import Form from './form';
import { FaCheckCircle, FaCog, FaUserTie, FaStar, FaMapMarkerAlt } from 'react-icons/fa';

const AntiAgingMenu: React.FC = () => {
  const antiagingMenu = menuData.find((menu) => menu.title === 'Medicina Anti-Aging');

  if (!antiagingMenu) {
    return <div>Medicina Estética menu not found.</div>;
  }

  return (
    <div className="estetica-menu mt-8">
      <h2 className="text-2xl font-bold mb-4 text-thunderbird-500 text-center">{antiagingMenu.title}</h2>

      <p className="my-4 text-center mx-16 mb-16">
        Ciencia salud y belleza unidas en armonía
      </p>

      <div className="text-sections">
        <h3 className="text-xl font-semibold text-thunderbird-500 text-center mx-16 mb-2">¿Qué es la Medicina Estética?</h3>
        <p className="mb-4 text-center mx-16">
          En HeartMed, nos especializamos en la Medicina Antiaging, un campo dedicado a mejorar la edad biológica, fomentando un envejecimiento saludable y una calidad de vida óptima. Nuestro enfoque científico y holístico se centra en revitalizar tanto el cuerpo como la mente, para que puedas disfrutar plenamente de la vida con una energía renovada.
        </p>
        <p className="mb-4 text-center mx-16">
          Ofrecemos una amplia variedad de tratamientos diseñados para abordar las necesidades individuales y los objetivos específicos de cada paciente.
        </p>
        <p className="mb-4 text-center mx-16">
          Para ello contamos con un elenco multidisciplinar de profesionales médicos y estéticos especializados en diferentes técnicas de vanguardia y en constante aprendizaje de los avances que nos ofrece la ciencia.
        </p>
        <p className="mb-4">Ya sea que busques:</p>
        <ul className="list-none mb-8">
          <li className="mb-2">
            <FaCheckCircle className="inline-block text-pomegranate-600 mr-2" />
            Aumentar tu energía
          </li>
          <li className="mb-2">
            <FaCheckCircle className="inline-block text-pomegranate-600 mr-2" />
            Mejorar tu líbido
          </li>
          <li className="mb-2">
            <FaCheckCircle className="inline-block text-pomegranate-600 mr-2" />
            Reducir el riesgo de enfermedades
          </li>
          <li className="mb-2">
            <FaCheckCircle className="inline-block text-pomegranate-600 mr-2" />
            Fortalecer tu sistema inmunológico
          </li>
          <li className="mb-2">
            <FaCheckCircle className="inline-block text-pomegranate-600 mr-2" />
            Optimizar tu composición corporal
          </li>
          <li className="mb-2">
            <FaCheckCircle className="inline-block text-pomegranate-600 mr-2" />
            Reducir la inflamación
          </li>
          <li className="mb-2">
            <FaCheckCircle className="inline-block text-pomegranate-600 mr-2" />
            Equilibrar tus hormonas
          </li>
        </ul>
        <p className="mb-4 text-center mx-16">
          Estamos aquí para ayudarte a alcanzar tus metas de salud y vitalidad.
        </p>
      </div>

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

      <div id="tratamientos" className="submenu-grid grid grid-cols-1 gap-8">
        <div className="flex">
          {antiagingMenu.submenu.slice(0, 4).map((submenuItem, index) => (
            <div key={index} className="submenu-item flex flex-col items-center w-1/2">
              <Link href={submenuItem.path}>
                <h3 className="text-xl font-semibold mb-2 cursor-pointer">{submenuItem.name}</h3>
                <img
                  src={submenuItem.imageUrl}
                  alt={submenuItem.name}
                  className="mb-4 w-48 h-48 object-cover cursor-pointer"
                />
              </Link>
              <div className="services grid grid-cols-2 gap-x-4 gap-y-2">
                {submenuItem.problems?.map((problem, problemIndex) => (
                  <div key={problemIndex} className="flex flex-col items-center w-full">
                    <h4 className="text-lg font-semibold mb-2">{problem.name}</h4>
                    <div className="grid grid-cols-1 gap-4 w-full">
                      {problem.services?.map((service, serviceIndex) => (
                        <Link key={serviceIndex} href={service.servicePath}>
                          <button className="bg-thunderbird-400 hover:bg-pomegranate-500 text-white font-semibold py-2 px-4 rounded w-full">
                            {service.serviceName}
                          </button>
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="submenu-item flex flex-col items-center">
          <Link href={antiagingMenu.submenu[4].path}>
            <h3 className="text-xl text-center font-semibold mb-2 cursor-pointer">
              {antiagingMenu.submenu[4].name}
            </h3>
            <img
              src={antiagingMenu.submenu[4].imageUrl}
              alt={antiagingMenu.submenu[4].name}
              className="mb-4 w-48 h-48 object-cover cursor-pointer"
            />
          </Link>
        </div>
      </div>

      <div id="masInformacion" className="mas-informacion my-8">
        <h3 className="text-xl font-semibold mb-4">MEDICINA ANTIAGING EN HEARTMED: TU SALUD Y VITALIDAD ENFOCADAS EN UN SOLO LUGAR</h3>
        <p className="mb-4">
          La Medicina Antiaging está dirigida a todas las personas que desean convertirse en la mejor versión de sí mismas, sin importar su edad. En HeartMed, te ofrecemos el apoyo y los recursos necesarios para que puedas disfrutar de una vida plena y activa, independientemente de tu edad cronológica. ¡Acompáñanos en este emocionante viaje hacia un envejecimiento saludable y lleno de vitalidad!
        </p>

        <p className="mb-4">
          La Medicina Antiaging se centra en mejorar la edad biológica y promover un envejecimiento saludable con calidad de vida óptima. En HeartMed, somos especialistas en este campo, utilizando un enfoque científico y holístico para revitalizar tu cuerpo y mente, devolviéndote la energía de la juventud.
        </p>

        <p className="mb-4">
          No importa tu edad, en HeartMed encontrarás el apoyo y los recursos necesarios para convertirte en la mejor versión de ti mismo. Únete a nosotros en este emocionante viaje hacia un envejecimiento saludable y lleno de vitalidad.
        </p>
      </div>

      <div className="feature-cards grid grid-cols-4 gap-8 my-16 mx-16">
        <div className="feature-card text-center border border-2 border-pomegranate-400 rounded-lg px-4 py-6">
          <FaCog className="text-4xl text-pomegranate-600 mx-auto mb-4" />
          <p className="font-semibold">Equipamiento de alta tecnología</p>
        </div>
        <div className="feature-card text-center border border-2 border-pomegranate-400 rounded-lg px-4 py-6">
          <FaUserTie className="text-4xl text-pomegranate-600 mx-auto mb-4" />
          <p className="font-semibold">Profesionales altamente cualificados</p>
        </div>
        <div className="feature-card text-center border border-2 border-pomegranate-400 rounded-lg px-4 py-6">
          <FaStar className="text-4xl text-pomegranate-600 mx-auto mb-4" />
          <p className="font-semibold">Los mejores estándares de calidad</p>
        </div>
        <div className="feature-card text-center border border-2 border-pomegranate-400 rounded-lg px-4 py-6">
          <FaMapMarkerAlt className="text-4xl text-pomegranate-600 mx-auto mb-4" />
          <p className="font-semibold">Tratamiento en St. Quirze</p>
        </div>
      </div>

      <div id="contacto" className="contacto">
        <Form />
      </div>
    </div>
  );
};

export default AntiAgingMenu;
