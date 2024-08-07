import { MenuItem } from './menudata.types';

const menuData: MenuItem[]= [
    {
      id: 1,
      title: "Medicina Estética",
      path: "/medicina-estetica",
      image:"/images/estetica.menu.jpg",
      newTab: false,
      submenu: [
        { 
          name: 'Tratamientos Faciales', 
          path: '/tratamientos-faciales',
          imagePath:'/images/MenuEstetica/tratamientos-faciales.jpg',
          imageUrl: '/images/MenuEstetica/tratamientos-faciales.jpg',
          problems: [
            {
              name: 'Cejas Caídas',
              imageUrl: '/images/MenuEstetica/cejas-caidas.png',
              services: [
                { serviceName: 'HIFU', servicePath: '/tratamientos-faciales/cejas-caidas/hifu'},
                { serviceName: 'Hilos Tensores', servicePath: '/tratamientos-faciales/cejas-caidas/hilos-tensores'},
                { serviceName: 'Dermopigmentación', servicePath: '/tratamientos-faciales/cejas-caidas/dermopigmentacion'},
                { serviceName: 'Neuromoduladores', servicePath: '/tratamientos-faciales/cejas-caidas/neuromoduladores'},
              ]
            },
            {
              name: 'Corrección de Manchas',
              imageUrl: '/images/MenuEstetica/eliminar-manchas.png',
              services: [
                { serviceName: 'Peeling Químico', servicePath: '/tratamientos-faciales/corregir-manchas/peeling-quimico' },
                { serviceName: 'IPL Ellipse Light', servicePath: '/tratamientos-faciales/corregir-manchas/ipl'},
                { serviceName: 'Láser CO2 Fraccionado', servicePath: '/tratamientos-faciales/corregir-manchas/laser-co2'},
              ]
            },
            {
              name: 'Corrección de Malas Praxis',//
              imageUrl: '/images/ELIMINAR_MANCHAS PRP..png',
              services: [
                { serviceName: 'Micropigmentación', servicePath: '/tratamientos-faciales/corregir-malas-praxis/micropigmentacion'},
                { serviceName: 'Eliminación de tatuajes', servicePath: '/tratamientos-faciales/corregir-malas-praxis/eliminar-tatuajes'},
                { serviceName: 'Eliminar Ácido Hialurónico', servicePath: '/tratamientos-faciales/corregir-malas-praxis/hialuronico'},
              ]
            },
            {
              name: 'Elevación de Pómulos',
              imageUrl: '/images/MenuEstetica/elevar-pomulos.png',
              services: [
                { serviceName: 'Proyección de Pómulos', servicePath: '/tratamientos-faciales/elevar-pomulos/acido-hialuronico'},
                { serviceName: 'HIFU', servicePath: '/tratamientos-faciales/elevar-pomulos/hifu'},
                { serviceName: 'Hilos Tensores', servicePath: '/tratamientos-faciales/elevar-pomulos/hilos-tensores'},
              ]
            },
            {
              name: 'Eliminar Arrugas',
              imageUrl: '/images/MenuEstetica/eliminar-arrugas.png',
              services: [
                { serviceName: 'Ácido Hialurónico', servicePath: '/tratamientos-faciales/eliminar-arrugas/acido-hialuronico'},
                { serviceName: 'HIFU', servicePath: '/tratamientos-faciales/eliminar-arrugas/hifu'},
                { serviceName: 'Hilos Tensores', servicePath: '/tratamientos-faciales/eliminar-arrugas/hilos-faciales'},
                { serviceName: 'Láser CO2 Fraccionado', servicePath: '/tratamientos-faciales/eliminar-arrugas/laser-co2'},
                { serviceName: 'Dermapen', servicePath: '/tratamientos-faciales/eliminar-arrugas/dermapen'},
                { serviceName: 'Mesoterapia Facial', servicePath: '/tratamientos-faciales/eliminar-arrugas/mesoterapia'},
                { serviceName: 'Neuromoduladores', servicePath: '/tratamientos-faciales/eliminar-arrugas/neuromoduladores'},
                { serviceName: 'Plasma Rico en Plaquetas PRP', servicePath: '/tratamientos-faciales/eliminar-arrugas/plasma-rico-plaquetas'},
                { serviceName: 'Skinbooster', servicePath: '/tratamientos-faciales/eliminar-arrugas/skinboosterr'},
              ]
            },
            {
              name: 'Eliminar Bolsas',
              imageUrl: '/images/MenuEstetica/eliminar-bolsas.png',
              services: [
                { serviceName: 'Enzimas PB Serum', servicePath: '/tratamientos-faciales/eliminar-bolsas/enzimas-pb'},
                { serviceName: 'HIFU', servicePath: '/tratamientos-faciales/eliminar-bolsas/hifu'},
                { serviceName: 'Láser CO2 Fraccionado', servicePath: '/tratamientos-faciales/eliminar-bolsas/laser-co2'},
              ]
            },
            {
              name: 'Eliminar Ojeras',
              imageUrl: '/images/MenuEstetica/eliminar-ojeras.png',
              services: [
                { serviceName: 'Ácido hialurónico', servicePath: '/tratamientos-faciales/eliminar-ojeras/acido-hialuronico'},
                { serviceName: 'Láser CO2 Fraccionado', servicePath: '/tratamientos-faciales/eliminar-ojeras/laser-co2'},
              ]
            },
            {
              name: 'Eliminar Papada',
              imageUrl: '/images/MenuEstetica/eliminar-papada.png',
              services: [
                { serviceName: 'Lipopapada Enzimática', servicePath: '/tratamientos-faciales/eliminar-papada/lipopapada'},
              ]
            },
            {
              name: 'Embellecimiento de la Piel',
              imageUrl: '/images/MenuEstetica/embellecer-piel.png',
              services: [
                { serviceName: 'Arañas Vasculares', servicePath: '/tratamientos-faciales/embellecer-piel/aranas-vasculares'},
                { serviceName: 'Coctel de Vitaminas', servicePath: '/tratamientos-faciales/embellecer-piel/coctel-vitaminas'},
                { serviceName: 'Dermapen', servicePath: '/tratamientos-faciales/embellecer-piel/dermapen'},
                { serviceName: 'Elástica', servicePath: '/tratamientos-faciales/embellecer-piel/elastica'},
                { serviceName: 'Eliminar Verrugas', servicePath: '/tratamientos-faciales/embellecer-piel/eliminar-verrugas'},
                { serviceName: 'Láser CO2 Fraccionado', servicePath: '/tratamientos-faciales/embellecer-piel/laser-co2-fraccionado'},
                { serviceName: 'Poros Dilatados', servicePath: '/tratamientos-faciales/embellecer-piel/poros-dilatados'},
                { serviceName: 'Plasma Rico en Plaquetas', servicePath: '/tratamientos-faciales/embellecer-piel/rejuvenecimiento-prp'},
                { serviceName: 'Puntos de Rubí', servicePath: '/tratamientos-faciales/embellecer-piel/puntos-rubi'},
                { serviceName: 'Rosácea Couperosis', servicePath: '/tratamientos-faciales/embellecer-piel/rosacea-couperosis'},
                { serviceName: 'Skinbooster', servicePath: '/tratamientos-faciales/embellecer-piel/skinbooster'},
              ]
            },
            {
              name: 'Estética de la Nariz',
              imageUrl: '/images/MenuEstetica/estetica-nariz.jpg',
              services: [
                { serviceName: 'Rinomodelación no quirurgica', servicePath: '/tratamientos-faciales/estetica-nariz/rinomodelacion'},
              ]
            },
            {
              name: 'Corregir el Acné',
              imageUrl: '/images/MenuEstetica/corregir-acne.png',
              services: [
                { serviceName: 'Láser', servicePath: '/tratamientos-faciales/corregir-acne/laser'},
                { serviceName: 'Peeling Químico', servicePath: '/tratamientos-faciales/corregir-acne/peeling-quimico'},
                { serviceName: 'Mesoterapia Facial', servicePath: '/tratamientos-faciales/corregir-acne/mesoterapia'},
                { serviceName: 'IPL Pulsada Intensa', servicePath: '/tratamientos-faciales/corregir-acne/ipl'},
              ]
            },
            {
              name: 'Flacidez del Rostro',
              imageUrl: '/images/MenuEstetica/flacidez-rostro.png',
              services: [
                { serviceName: 'Elástica', servicePath: '/tratamientos-faciales/flacidez-rostro/elastica'},
                { serviceName: 'Enzimas Recombinantes', servicePath: '/tratamientos-faciales/flacidez-rostro/enzimas-recombinantes' },
                { serviceName: 'Fillers', servicePath: '/tratamientos-faciales/flacidez-rostro/fillers'},
                { serviceName: 'HIFU Lifting sin Cirugía', servicePath: '/tratamientos-faciales/flacidez-rostro/hifu'},
                { serviceName: 'Dermapen', servicePath: '/tratamientos-faciales/flacidez-rostro/dermapen'},
                { serviceName: 'Hilos Tensores', servicePath: '/tratamientos-faciales/flacidez-rostro/hilos-tensores'},
                { serviceName: 'Medilight Diodo Láser Frío', servicePath: '/tratamientos-faciales/flacidez-rostro/medilight'},
                { serviceName: 'Mesoterapia Facial', servicePath: '/tratamientos-faciales/flacidez-rostro/mesoterapia'},
                { serviceName: 'Neuromoduladores', servicePath: '/tratamientos-faciales/flacidez-rostro/neuromoduladores'},
                { serviceName: 'Skinbooster', servicePath: '/tratamientos-faciales/flacidez-rostro/skinbooster'},
              ]
            },
            {
              name: 'Párpados Caídos',
              imageUrl: '/images/MenuEstetica/parpados-caidos.png',
              services: [
                { serviceName: 'HIFU', servicePath: '/tratamientos-faciales/parpados-caidos/hifu'},
                { serviceName: 'Hilos Tensores', servicePath: '/tratamientos-faciales/parpados-caidos/hilos-tensores'},
                { serviceName: 'Blefaroplastia sin cirugía con láser CO2', servicePath: '/tratamientos-faciales/parpados-caidos/blefaroplastia'},
              ]
            },
            {
              name: 'Volumen Facial',
              imageUrl: '/images/MenuEstetica/volumen-facial.png',
              services: [
                { serviceName: 'Aumento de pómulos', servicePath: '/tratamientos-faciales/volumen-facial/aumento-pomulos'},
                { serviceName: 'Aumento de mentón', servicePath: ' /tratamientos-faciales/volumen-facial/mentoplastia'},
                { serviceName: 'Ácido hialurónico', servicePath: '/tratamientos-faciales/volumen-facial/acido-hialuronico'},
                { serviceName: 'Bichectomia sin cirugía', servicePath: '/tratamientos-faciales/volumen-facial/bichetomia'},
              ]
            },
          ]
        },
        { 
          name: 'Tratamientos Corporales', 
          path: '/tratamiento-corporales',
          imageUrl: '/images/MenuEstetica/tratamientos-corporales.jpg',
          imagePath:'/images/MenuEstetica/tratamientos-corporales.jpg',
          
          problems: [
            {
              name: 'Eliminar Celulitis',
              imageUrl: '/images/MenuEstetica/eliminar-celulitis.jpg',
              services: [
                { serviceName: 'HIFU Corporal', servicePath: '/tratamientos-corporales/eliminar-celulitis/hifu', },
                { serviceName: 'Ozonoterapia', servicePath: '/tratamientos-corporales/eliminar-celulitis/ozonoterapia'},
                { serviceName: 'Reducción enzimática de celulitis y flacidez', servicePath: '/tratamientos-corporales/eliminar-celulitis/reduccion-enzimatica'},
                { serviceName: 'TMT Systems - Mesoterapia Virtual', servicePath: '/tratamientos-corporales/eliminar-celulitis/tms-system'},
                { serviceName: 'Velashape', servicePath: '/tratamientos-corporales/eliminar-celulitis/velashape'},
                { serviceName: 'EMS Sculpting', servicePath: '/tratamientos-corporales/eliminar-celulitis/ems-sculpting'},
              ]
            },
         
            {
              name: 'Flacidez Corporal',
              imageUrl: '/images/MenuEstetica/flacidez-corporal.png',
              services: [
                { serviceName: 'EMS Sculpting', servicePath: '/tratamientos-corporales/flacidez-corporal/ems-sculpting'},
                { serviceName: 'HIFU Corporal', servicePath: '/tratamientos-corporales/flacidez-corporal/hifu'},
                { serviceName: 'Mesoterapia Corporal', servicePath: '/tratamientos-corporales/flacidez-corporal/mesoterapia'},
                { serviceName: 'Enzimas Recombinantes', servicePath: '/tratamientos-corporales/flacidez-corporal/enzimas-recombinantes' },
                { serviceName: 'Ozonoterapia', servicePath: '/tratamientos-corporales/flacidez-corporal/ozonoterapia' },
                { serviceName: 'Plasma Rico en Plaquetas', servicePath: '/tratamientos-corporales/flacidez-corporal/plasma-rico-plaquetas'},
                { serviceName: 'TMT Systems - Mesoterapia Virtual', servicePath: '/tratamientos-corporales/flacidez-corporal/tmt-system'},
                { serviceName: 'Velashape', servicePath: '/tratamientos-corporales/flacidez-corporal/velashape'},
                { serviceName: 'Láser CO2 Fraccionado', servicePath: '/tratamientos-corporales/flacidez-corporal/laser-co2-fraccionado'},
              ]
            },
            {
              name: 'Reducir Volumen Corporal',
              imageUrl: '/images/MenuEstetica/reducir-volumen-corporal.png',
              services: [
                { serviceName: 'EMS Sculpting', servicePath: '/tratamientos-corporales/reducir-volumen-corporal/electroestimulacion-ems'},
                { serviceName: 'HIFU Corporal', servicePath: '/tratamientos-corporales/reducir-volumen-corporal/hifu'},
                { serviceName: 'Láser Lipolítico', servicePath: '/tratamientos-corporales/reducir-volumen-corporal/laser-lipolitico'},
                { serviceName: 'Reducción Enzimática de la Celulitis', servicePath: '/tratamientos-corporales/reducir-volumen-corporal/reduccion-enzimatica' },
                { serviceName: 'Mesoterapia Lipolítica', servicePath: '/tratamientos-corporales/reducir-volumen-corporal/mesoterapia-lipolitica' },
                { serviceName: 'Ozonoterapia', servicePath: '/tratamientos-corporales/reducir-volumen-corporal/ozonoterapia' },
                { serviceName: 'TMT Systems - Mesoterapia Virtual', servicePath: '/tratamientos-corporales/reducir-volumen-corporal/tmt-system'},
                { serviceName: 'Velashape', servicePath: '/tratamientos-corporales/reducir-volumen-corporal/velashape'},
              ]
            },
            {
              name: 'Rejuvenecimiento de las Manos',
              imageUrl: '/images/MenuEstetica/rejuvenecimiento-manos.png',
              services: [
                { serviceName: 'Ácido hialurónico', servicePath: '/tratamientos-corporales/rejuvenecimiento-manos/acido-hialuronico'},
                { serviceName: 'HIFU Corporal', servicePath: '/tratamientos-corporales/rejuvenecimiento-manos/hifu'},
                { serviceName: 'IPL Ellipse Light', servicePath: '/tratamientos-corporales/rejuvenecimiento-manos/ipl'},
                { serviceName: 'Sudaración excesiva', servicePath: '/tratamientos-corporales/rejuvenecimiento-manos/sudor-excesivo'},
                { serviceName: 'Láser CO2 Fraccionado', servicePath: '/tratamientos-corporales/rejuvenecimiento-manos/laser-co2-fraccionado'},
                { serviceName: 'PRP Plasma Rico en Plaquetas', servicePath: '/tratamientos-corporales/rejuvenecimiento-manos/plasma-rico-plaquetas' },
                { serviceName: 'Skinbooster Rejuvenecimiento', servicePath: '/tratamientos-corporales/rejuvenecimiento-manos/skinbooster'},
              ]
            },

            {
              name: 'Sudoración Excesiva',
              imageUrl: '/images/MenuEstetica/eliminar-sudor.png',
              services: [
                { serviceName: 'Sudor Excesivo', servicePath: '/tratamientos-corporales/sudor-excesivo/eliminar-sudor'},
              ]
            },
            {
    
              name: 'Remodelación Glúteos',
              imageUrl: '/images/MenuEstetica/remodelacion-gluteos.jpg',
              services: [
                { serviceName: 'Hilos Tensores', servicePath: '/tratamientos-corporales/remodelacion-gluteos/hilos-tensores'},
                { serviceName: 'Velashape', servicePath: '/tratamientos-corporales/remodelacion-gluteos/velashape'},
                { serviceName: 'EMS Sculpting', servicePath: '/tratamientos-corporales/remodelacion-gluteos/ems-sculpting' },
              ]
            },
            {
              name: 'Eliminar Estrías',
              imageUrl: '/images/MenuEstetica/eliminar-estrias.png',
              services: [
                { serviceName: 'Láser CO2', servicePath: '/tratamientos-corporales/eliminar-estrias/laser-co2'},
                { serviceName: 'Velashape', servicePath: '/tratamientos-corporales/eliminar-estrias/velashape'},
                { serviceName: 'Plasma Rico en Plaquetas', servicePath: '/tratamientos-corporales/eliminar-estrias/plasma-rico-plaquetas'},
              ]
            },
          ]
        },
        { 
          name: 'Medicina Estética Masculina', 
          path: '/estetica-masculina',
          imageUrl: '/images/MenuEstetica/estetica-masculina.png',
          imagePath:'/images/MenuEstetica/estetica-masculina.png',
          problems: [
            {
              name: 'Corrección de la Nariz',
              imageUrl: '/images/MenuEstetica/masc-corregir-nariz.png',
              services: [
                { serviceName: 'Rinomodelación no quirurgica', servicePath: '/estetica-masculina/corregir-nariz/rinomodelacion'},
                { serviceName: 'Rinoplastia', servicePath: '/estetica-masculina/corregir-nariz/rinoplastia'},
              ]
            },
            {
              name: 'Definición Mandibular',
              imageUrl: '/images/MenuEstetica/masc-definicion-mandibular.png',
              services: [
                { serviceName: 'Marcación Mandibular', servicePath: '/estetica-masculina/definicion-mandibular/acido-hialuronico'},
                { serviceName: 'Mentoplastia', servicePath: '/estetica-masculina/definicion-mandibular/mentoplastia'},
                { serviceName: 'Proyección del Mentón', servicePath: '/estetica-masculina/definicion-mandibular/proyeccion-menton'},
              ]
            },
            {
              name: 'Marcación Abdominal',
              imageUrl: '/images/MenuEstetica/masc-marcacion-abdominal.png',
              services: [
                { serviceName: 'Marcación Abdominal', servicePath: '/estetica-masculina/marcar-adbominal/marcacion-abdominal'},
  
              ]
            },
            {
              name: 'Eliminar Bolsas',
              imageUrl: '/images/MenuEstetica/masc-eliminar-bolsas.png',
              services: [
                { serviceName: 'Enzimas PB Serum', servicePath: '/estetica-masculina/eliminar-bolsas/enzimas-pb'},
                { serviceName: 'Láser CO2 Fraccionado', servicePath: '/estetica-masculina/eliminar-bolsas/laser-co2'},
                { serviceName: 'Ácido Hialurónico', servicePath: '/estetica-masculina/eliminar-bolsas/acido-hialuronico'},
                { serviceName: 'HIFU', servicePath: '/estetica-masculina/eliminar-bolsas/hifu'},
              ]
            },
            {
              name: 'Eliminar o Suavizar Arrugas',
              imageUrl: '/images/MenuEstetica/masc-eliminar-arrugas.png',
              services: [
                { serviceName: 'Ácido Hialurónico', servicePath: '/estetica-masculina/eliminar-arrugas/acido-hialuronico'},
                { serviceName: 'Láser CO2 Fraccionado', servicePath: '/estetica-masculina/eliminar-arrugas/laser-co2'},
                { serviceName: 'Neuromoduladores', servicePath: '/estetica-masculina/eliminar-arrugas/neuromoduladores'},
                { serviceName: 'Hilos Tensores', servicePath: '/estetica-masculina/eliminar-arrugas/hilos-tensores'},
                { serviceName: 'Enzimas Recombinantes', servicePath: '/estetica-masculina/eliminar-arrugas/enzimas-recombinantes' },
              ]
            },
            {
              name: 'Elimina Papada sin Cirugía',
              imageUrl: '/images/MenuEstetica/masc-eliminar-papada.png',
              services: [
                { serviceName: 'Lipopapada Enzimática', servicePath: '/estetica-masculina/eliminar-papada/lipopapada-enzimatica'},
              ]
            },

            {
              name: 'Ginecomastia',
              imageUrl: '/images/MenuEstetica/masc-ginecomastia.png',
              services: [
                { serviceName: 'Ginecomastia', servicePath: 'estetica-masculinareducir-anomalia/ginecomastia'},
              ]
            },
            {
              name: 'Parpados Caidos',
              imageUrl: '/images/MenuEstetica/masc-parpados-caidos.jpg',
              services: [
               // { serviceName: 'HIFU', servicePath: '/estetica/estetica-masculina/parpados-caidos/hifu'},
                { serviceName: 'Blefaroplastia', servicePath: 'estetica-masculina/parpados-caidos/blefaroplastia'},
                { serviceName: 'Blefaroplastia sin cirugía con láser CO2', servicePath: '/estetica-masculina/parpados-caidos/laser-co2'},
              ]
            },
            {
              name: 'Reducir Volumen Corporal',
              imageUrl: '/images/MenuEstetica/masc-reducir-volumen-corporal.png',
              services: [
                { serviceName: 'HIFU Corporal', servicePath: '/estetica-masculina/reducir-volumen-corporal/hifu'},
               // { serviceName: 'Blefaroplastia sin cirugía con láser CO2', servicePath: '/estetica/masculina/blefaroplastia'},
                { serviceName: 'Mesoterapia Lipolítica', servicePath: '/estetica-masculina/reducir-volumen-corporal/mesoterapia-lipolitica' },
                { serviceName: 'Electroestimulación EMS', servicePath: '/estetica-masculina/reducir-volumen-corporal/electroestimulacion-ems' },
                { serviceName: 'Velashape', servicePath: '/estetica-masculina/reducir-volumen-corporal/velashape'},
                { serviceName: 'Cocktail Vitaminas', servicePath: '/estetica-masculina/reducir-volumen-corporal/cocktail-vitaminas'},
              ]
            },
            {
              name: 'Rejuvenecimiento Facial',
              imageUrl: '/images/MenuEstetica/masc-eliminar-arrugas.png',
              services: [
                { serviceName: 'Coctel de Vitaminas Mesoterapia', servicePath: '/estetica-masculina/rejuvenecimiento-facial/cocktail-vitaminas'},
                { serviceName: 'Enzimas Recombinantes', servicePath: '/estetica-masculina/rejuvenecimiento-facial/enzimas-recombinantes' },
                { serviceName: 'Plasma Rico en Plaquetas', servicePath: '/estetica-masculina/rejuvenecimiento-facial/plasma-rico-plaquetas'},
                { serviceName: 'HIFU Lifting sin Cirugía', servicePath: '/estetica-masculina/rejuvenecimiento-facial/hifu'},
              ]
            },
            {
              name: 'Corregir el Acné',
              imageUrl: '/images/MenuEstetica/masc-corregir-acne.png',
              services: [
                { serviceName: 'Peeling Químico', servicePath: '/estetica-masculina/corregir-acne/peeling-quimico' },
                { serviceName: 'IPL Pulsada Intensa', servicePath: '/estetica-masculina/corregir-acne/ipl'},
                { serviceName: 'Láser CO2 Fraccionado', servicePath: '/estetica-masculina/corregir-acne/laser-co2' },
                { serviceName: 'Mesoterapia Facial', servicePath: '/estetica-masculina/corregir-acne/mesoterapia'},
              ]
            },
            {
              name: 'Trastornos de la Piel',
              imageUrl: '/images/MenuEstetica/masc-trastornos-piel.png',
              services: [
                { serviceName: 'Arañas Vasculares', servicePath: '/estetica-masculina/trastornos-piel/aranas-vasculares'},
                { serviceName: 'Eliminar Verrugas', servicePath: '/estetica-masculina/trastornos-piel/eliminar-verrugas'},
                { serviceName: 'Poros Dilatados', servicePath: '/estetica-masculina/trastornos-piel/poros-dilatados'},
                { serviceName: 'Puntos de Rubí', servicePath: '/estetica-masculina/trastornos-piel/puntos-rubi'},
                { serviceName: 'Rosácea', servicePath: '/estetica-masculina/trastornos-piel/rosacea-couperosis'},
              ]
            },
          ]
        },
        
        { 
          name: 'Cirugías Medicoestéticas', 
          path: '/cirugias-medicoesteticas',
          imageUrl: '/images/MenuEstetica/cirugias-medicoesteticas.jpg',
          imagePath:'/images/MenuEstetica/cirugias-medicoesteticas.jpg',
          problems: [
            {
              name: 'Cirugía de Pecho',
              imageUrl: '/images/MenuEstetica/cirugiapecho.png',
              services: [
                { serviceName: 'Aumento de Pecho', servicePath: '/cirugias/cirugia-pecho/aumento-pecho'},
                { serviceName: 'Cambio de Prótesis', servicePath: '/cirugias/cirugia-pecho/cambio-protesis'},
                { serviceName: 'Elevación de Pecho', servicePath: '/cirugias/cirugia-pecho/elevacion-pecho'},
                { serviceName: 'Pezones Invertidos', servicePath: '/cirugias/cirugia-pecho/pezones-invertidos'},
                { serviceName: 'Reconstrucción Mamaria', servicePath: '/cirugias/cirugia-pecho/reconstruccion-mamaria'},
                { serviceName: 'Reducción de Pecho', servicePath: ' /cirugias/cirugia-pecho/reduccion-pecho'},
              ]
            },
            {
              name: 'Cirugía Estética Corporal',
              imageUrl: '/images/cirugiacorporal.jpeg',
              services: [
                { serviceName: 'Abdominoplastia', servicePath: '/cirugias/cirugia-cuerpo/abdominoplastia'},
                { serviceName: 'Aumento de Glúteos', servicePath: '/cirugias/cirugia-cuerpo/aumento-gluteos'},
                { serviceName: 'Lifting de Brazos', servicePath: '/cirugias/cirugia-cuerpo/lifting-brazos'},
                { serviceName: 'Lifting de Piernas', servicePath: '/cirugias/cirugia-cuerpo/lifting-piernas'},
                { serviceName: 'Lipofilling', servicePath: '/cirugias/cirugia-cuerpo/lipofilling'},
                { serviceName: 'Lipolaser', servicePath: '/cirugias/cirugia-cuerpo/lipolaser'},
                { serviceName: 'Liposucción', servicePath: '/cirugias/cirugia-cuerpo/liposuccion'},
              ]
            },
            {
              name: 'Cirugía Estética Facial',
              imageUrl: '/images/cirugiafacial.jpeg',
              services: [
                { serviceName: 'Rinoplastia', servicePath: '/cirugias/cirugia-facial/rinoplastia'},
                { serviceName: 'Bichectomia', servicePath: '/cirugias/cirugia-facial/bichetomia'},
                { serviceName: 'Blefaroplastia', servicePath: '/cirugias/cirugia-facial/blefaroplastia'},
                { serviceName: 'Lifting de Riesgo', servicePath: '/cirugias/cirugia-facial/lifting-riesgo'},
                { serviceName: 'Liting Facial', servicePath: ' /cirugias/cirugia-facial/lifting-facial'},
                { serviceName: 'Liposucción de Papada', servicePath: '/cirugias/cirugia-facial/liposuccion-papada'},
                { serviceName: 'Lobuloplastia', servicePath: '/cirugias/cirugia-facial/lobuloplastia'},
                { serviceName: 'Otoplastia', servicePath: '/cirugias/cirugia-facial/otoplastia'},
              ]
            },
          ]
        },
        { 
          name: 'Fotos Antes y Después', 
          path: '/antes-y-despues',
          imageUrl: '/images/MenuEstetica/antes-y-despues.jpg',
          imagePath:'/images/MenuEstetica/antes-y-despues.jpg',
          problems: [
          ]
        },
        { 
          name: 'Precios', 
          path: '/precios',
          imageUrl: '/images/MenuEstetica/precios.jpg',
          imagePath:'/images/MenuEstetica/precios.jpg',
          problems: [
          ]
        },
        ],
    },
    {
      id: 2,
      title: "Medicina Regenerativa",
      path: "/medicina-antiaging",
      
      image:"/images/antiaging.png",
      newTab: false,
      submenu: [
        { 
          name: 'Ozonoterapia Médica y Estética', 
          path: '/ozonoterapia-medicoestetica',
          imageUrl: '/images/MenuAntiAging/ozonoterapia.jpg',
          imagePath:'/images/MenuAntiAging/ozonoterapia.jpg',
          problems: [
            {
              name: 'Ozonoterapia Capilar',
              imageUrl: '/images/MenuAntiAging/ozonoterapia-capilar.jpg',
              services: [
                { serviceName: 'Ozonoterapia Capilar', servicePath: '/ozonoterapia-capilar/ozonoterapia-capilar'},
              ]
            },
            {
              name: 'Ozonoterapia Estética',
              imageUrl: '/images/MenuAntiAging/ozonoterapia-estetica.png',
              services: [
                { serviceName: 'Acné', servicePath: '/ozonoterapia/estetica/corregir-acne'},
                { serviceName: 'Celulitis', servicePath: '/ozonoterapia/estetica/eliminar-celulitis'},
                { serviceName: 'Embellecimiento de la Piel', servicePath: '/ozonoterapia/estetica/embellecer-piel'},
                { serviceName: 'Post-Cirugía', servicePath: '/ozonoterapia/estetica/post-cirugia'},
                { serviceName: 'Post-Dermopigmentación', servicePath: '/ozonoterapia/estetica/post-dermopigmentación'},
                { serviceName: 'Rejuvenecimiento Facial', servicePath: '/ozonoterapia/estetica/rejuvenecimiento-facial'},
                { serviceName: 'Rosácea', servicePath: '/ozonoterapia/estetica/rosacea'},
                { serviceName: 'Varices y Arañas Vasculares', servicePath: '/ozonoterapia/estetica/varices-y-aranas'},
              ]
            },
            {
              name: 'Ozonoterapia Médica',
              imageUrl: '/images/MenuAntiAging/ozonoterapia-medica.png',
              services: [
                { serviceName: 'Atrosis de Cadera', servicePath: '/ozonoterapia/medica/atrosis-cadera'},
                { serviceName: 'Bursitis de Cadera', servicePath: '/ozonoterapia/medica/bursitis-cadera'},
                { serviceName: 'Necrosis de Cadera', servicePath: '/ozonoterapia/medica/necrosis-cadera'},
                { serviceName: 'Trocanteritis de Cadera', servicePath: '/ozonoterapia/medica/trocanteritis-cadera'},
                { serviceName: 'Atrosis y Artritis de Codo', servicePath: '/ozonoterapia/medica/artritis-atrosis-codo'},
                { serviceName: 'Bursitis de Codo', servicePath: '/ozonoterapia/medica/bursitis-codo'},
                { serviceName: 'Epicondulitis de Codo', servicePath: '/ozonoterapia/medica/epicondulitis-codo'},
                { serviceName: 'Tendinitis de Codo', servicePath: '/ozonoterapia/medica/tendinitis-codo'},
                { serviceName: 'Atrosis de Columna', servicePath: '/ozonoterapia/medica/artrosis-columna'},
                { serviceName: 'Ciatica de Columna', servicePath: '/ozonoterapia/medica/ciatica-columna'},
                { serviceName: 'Dolor de Espalda', servicePath: '/ozonoterapia/medica/dolor-espalda'},
                { serviceName: 'Hernia Discal, Cervical, Dorsal y Lumbar', servicePath: '/ozonoterapia/medica/hernias'},
                { serviceName: 'Atrosis y Artritis de Hombro', servicePath: '/ozonoterapia/medica/artritis-atrosis-hombro'},
                { serviceName: 'Bursitis de Hombro', servicePath: '/ozonoterapia/medica/bursitis-hombro'},
                { serviceName: 'Tendinitis de Bicipital', servicePath: '/ozonoterapia/medica/tendinitis-bicipital'},
                { serviceName: 'Tendinitis del Supraespinoso', servicePath: '/ozonoterapia/medica/tendinitis-supraespinoso'},
                { serviceName: 'Tendinitis de Manguito Rotador', servicePath: '/ozonoterapia/medica/tendinitis-manguito'},
                { serviceName: 'Artrosis de Manos', servicePath: '/ozonoterapia/medica/atrosis-manos'},
                { serviceName: 'Túnel Carpiano', servicePath: '/ozonoterapia/medica/tunel-carpiano'},
                { serviceName: 'Artrosis de Rodilla', servicePath: '/ozonoterapia/medica/atrosis-rodilla'},
                { serviceName: 'Tendinopatía del tendón rotuliano', servicePath: '/ozonoterapia/medica/tendinopatia-rotuliana'},
                { serviceName: 'Inflamación de la banda Iliotibial', servicePath: '/ozonoterapia/medica/inflamacion-iliotibial'},
                { serviceName: 'Lesiones del Menisco', servicePath: '/ozonoterapia/medica/lesiones-menisco'},
                { serviceName: 'Lesión de los ligamentos de las rodillas', servicePath: '/ozonoterapia/medica/lesion-ligamentos-rodilla'},
                { serviceName: 'Atrosis y Artritis de Tobillo', servicePath: '/ozonoterapia/medica/artritis-atrosis-tobillo'},
                { serviceName: 'Lesión del tendón peroneo del tobillo', servicePath: '/ozonoterapia/medica/artrosis-y-artritis'},
                { serviceName: 'Tendinopatía de los tendones peroneos', servicePath: '/ozonoterapia/medica/tendinopatia-peronea'},
                { serviceName: 'Lesión del tendón peroneo del pie', servicePath: '/ozonoterapia/medica/lesion-tendon-peroneo'},
                { serviceName: 'Atrosis y Artritis de Pies', servicePath: '/ozonoterapia/medica/artritis-atrosis-pies'},
                { serviceName: 'Esguince de Pie', servicePath: '/ozonoterapia/medica/esguince-pie'},
                { serviceName: 'Fascitis Plantar', servicePath: '/ozonoterapia/medica/fascitis-plantar'},
                { serviceName: 'Neuroma de Morton', servicePath: '/ozonoterapia/medica/neuroma-morton'},
                { serviceName: 'Fibromialgia', servicePath: '/ozonoterapia/medica/fibriomalgia'},
                { serviceName: 'Infecciones Ginecológicas', servicePath: '/ozonoterapia/medica/infeccion-ginecologicas'},
              ]
            },
          ]
        },
        { 
          name: 'Test Epigenético', 
          path: '/terapia-epigenetica',
          imageUrl: '/images/placeholder_image.png',
          imagePath:'/images/antiaging.ozonoterapia.png',
          problems: [
            {
              name: 'Test',
              imageUrl: '/images/MenuAntiAging/terapia-epigenetica.jpg',
              services: [
                { serviceName: 'Informe Epigenético Alto Rendimiento', servicePath: '/terapia-epigenetica/rendimiento/optimizacion-alto-rendimiento'},
                { serviceName: 'Informe Epigenético Alto Beauty', servicePath: '/terapia-epigenetica/estetica/optimizacion-beauty'},
                { serviceName: 'Informe Epigenético Alto Wellness', servicePath: '/terapia-epigenetica/medica/optimizacion-wellness'},
              ]
            },
          ]
        },
        { name: 'Medicina Funcional y Nutrición Celular Ortomolecular', imagePath: '/images/MenuAntiAging/medicina-funcional.jpg', path: '/medicina-biologica/detox/medicina-funcional', imageUrl: '/images/placeholder_image.png'},
        { name: 'Sueroterapia', imagePath: '/images/MenuAntiAging/sueroterapia.png', path: '/terapia-ortomolecular/nutricion/sueroterapia', imageUrl: '/images/placeholder_image.png'},

        ],
    },
    {
      id: 3,
      title: "Alquiler y Venta de equipos",
      path: "/equipos",
      image:"/images/equipos.menu.png",
      newTab: false,
      submenu: [
        { name: 'Equipos médicos', imagePath: '/images/placeholder-image.png', path: '/medicos', imageUrl: '/images/placeholder_image.png'},
        { name: 'Equipos estéticos', imagePath: '/images/placeholder-image.png', path: '/esteticos', imageUrl: '/images/placeholder_image.png'},
        { name: 'Equipos de dermopigmentación', imagePath: '/images/placeholder-image.png', path: '/dermopigmentacion', imageUrl: '/images/placeholder_image.png'},
        { name: 'Dispositivos para el cuidado de salud', imagePath: '/images/placeholder-image.png', path: '/salud', imageUrl: '/images/placeholder_image.png'},
        ],
    },
    {
      id: 4,
      title: "Formaciones",
      path: "/formación",
      image:"/images/formación.png",
      newTab: false,
      submenu: [
        { name: 'Dermopigmentación', imagePath: '/images/formacion.dermopigmentacion.png', path: '/dermopigmentacion', imageUrl: '/images/placeholder_image.png'},
        { name: 'Medicina Estética', imagePath: '/images/formacion.medicinaestetica.png', path: '/medicina-estetica', imageUrl: '/images/placeholder_image.png'},
        { name: 'Aparatología', imagePath: '/images/formacion.aparatologia.png', path: '/aparatologia', imageUrl: '/images/placeholder_image.png'},
        ],
    },
    {
      id: 5,
      title: "Tienda",
      path: "/tienda",
      image:"/images/tienda.menu.png",
      newTab: false,
      submenu: [
        { name: 'Material de Prácticas', imagePath: '/images/tienda.practicas.png', path: '/material-practicas', imageUrl: '/images/placeholder_image.png'},
        { name: 'Cosmética', imagePath: '/images/tienda.cosmetica.png', path: '/cosmetica', imageUrl: '/images/placeholder_image.png'},
        { name: 'Suplementos', imagePath: '/images/tienda.suplementos.png', path: '/suplementos', imageUrl: '/images/placeholder_image.png'},
        { name: 'Salud y belleza', imagePath: '/images/tienda.salud.png', path: '/salud-y-belleza', imageUrl: '/images/placeholder_image.png'},
        { name: 'Aparatología profesional', imagePath: '/images/tienda.aparatologia.png', path: '/aparatologia', imageUrl: '/images/placeholder_image.png'},
        ],
    },
    {
      id: 6,
      title: "Packs",
      path: "/packs",
      image:"/images/packs.menu.png", 
      newTab: false,
      submenu: [
        { name: 'Packs Medicina Estetica', imagePath: '/images/packs.estetica.png', path: '/medicina-estetica', imageUrl: '/images/placeholder_image.png'},
        { name: 'Packs Medicina Anti-Aging', imagePath: '/images/packs.anti-aging.png', path: '/medicina-anti-aging', imageUrl: '/images/placeholder_image.png'},
        { name: 'Packs Equipos', imagePath: '/images/packs.equipos.png', path: '/equipos', imageUrl: '/images/placeholder_image.png'},
        { name: 'Packs Formación', imagePath: '/images/packs.formaciones.png', path: '/formaciones', imageUrl: '/images/placeholder_image.png'},

        ],
    },
  
  ];
  export default menuData;