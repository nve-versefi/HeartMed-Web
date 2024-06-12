import { MenuItem } from './menudata.types';

const menuData: MenuItem[]= [
    {
      id: 1,
      title: "Medicina Estética",
      path: "/estetica",
      image:"/images/estetica.menu.jpg",
      newTab: false,
      submenu: [
        { 
          name: 'Tratamientos Faciales', 
          path: '/estetica/facial',
          imagePath:'/images/placeholder_image.png',
          imageUrl: '/images/placeholder_image.png',
          problems: [
            {
              name: 'Cejas caídas',
              imageUrl: '/images/PORTADA_CEJAS.png',
              services: [
                { serviceName: 'HIFU', servicePath: '/tratamientos-faciales/cejas-caidas/hifu'},
                { serviceName: 'Hilos Tensores', servicePath: '/tratamientos-faciales/cejas-caidas/hilos-tensores'},
                { serviceName: 'Dermopigmentación', servicePath: '/tratamientos-faciales/dermopigmentacion'},
                { serviceName: 'Neuromoduladores', servicePath: '/tratamientos-faciales/cejas-caidas/neuromoduladores'},
              ]
            },
            {
              name: 'Corrección de manchas',
              imageUrl: '/images/PORTADA_EMBELLECIMIENTO_PIEL.png',
              services: [
                { serviceName: 'Peeling Químico', servicePath: '/tratamientos-faciales/corregir-manchas/peeling-quimico' },
                { serviceName: 'Rejuvenecimiento con IPL', servicePath: '/tratamientos-faciales/corregir-manchas/ipl'},
                { serviceName: 'Láser CO2 Fraccionado', servicePath: '/tratamientos-faciales/corregir-manchas/laser-co2'},
              ]
            },
            {
              name: 'Corracción malas praxis',
              imageUrl: '/images/ELIMINAR_MANCHAS PRP..png',
              services: [
                { serviceName: 'Micropigmentación', servicePath: '/tratamientos-faciales/corregir-mala-praxis/micropigmentacion'},
                { serviceName: 'Eliminación de tatuajes', servicePath: '/tratamientos-faciales/corregir-mala-praxis/eliminar-tatuajes'},
                { serviceName: 'Ácido hialurónico', servicePath: '/tratamientos-faciales/hialuronico'},
              ]
            },
            {
              name: 'Elevación de pómulos',
              imageUrl: '/images/POMULOS PORTADA.png',
              services: [
                { serviceName: 'Ácido hialurónico', servicePath: '/tratamientos-faciales/elevar-pomulos/acido-hialuronico'},
                { serviceName: 'HIFU', servicePath: '/tratamientos-faciales/elevar-pomulos/hifu'},
                { serviceName: 'Hilos Tensores', servicePath: '/tratamientos-faciales/elevar-pomulos/hilos-tensores'},
              ]
            },
            {
              name: 'Eliminar arrugas',
              imageUrl: '/images/PORTADA ARRUGAS.png',
              services: [
                { serviceName: 'Ácido hialurónico', servicePath: '/tratamientos-faciales/eliminar-arrugas/acido-hialuronico'},
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
              name: 'Eliminar bolsas',
              imageUrl: '/images/ELIMINAR BOLSAS PORTADA.png',
              services: [
                { serviceName: 'Enzimas PB Serum', servicePath: '/tratamientos-faciales/eliminar-bolsas/enzimas-pb'},
                { serviceName: 'HIFU', servicePath: '/tratamientos-faciales/eliminar-bolsas/hifu'},
                { serviceName: 'Láser CO2 Fraccionado', servicePath: '/tratamientos-faciales/eliminar-bolsas/laser-co2'},
              ]
            },
            {
              name: 'Eliminar ojeras',
              imageUrl: '/images/CEJAS NEUROMODULADORES.png',
              services: [
                { serviceName: 'Ácido hialurónico', servicePath: '/tratamientos-faciales/eliminar-ojeras/acido-hialuronico'},
                { serviceName: 'Láser CO2 Fraccionado', servicePath: '/tratamientos-faciales/eliminar-ojeras/laser-co2'},
              ]
            },
            {
              name: 'Eliminar papada',
              imageUrl: '/images/ELIMINARPAPADAPORTADA.png',
              services: [
                { serviceName: 'Lipopapada Enzimática', servicePath: '/tratamientos-faciales/eliminar-papada/lipopapada'},
              ]
            },
            {
              name: 'Embellecimiento de la piel',
              imageUrl: '/images/PORTADA_EMBELLECIMIENTO_PIEL.png',
              services: [
                { serviceName: 'Arañas Vasculares', servicePath: '/tratamientos-faciales/embellecer-piel/arañas-vasculares'},
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
              name: 'Estética de la nariz',
              imageUrl: '/images/RINOMODELACIÓN PORTADA.jpg',
              services: [
                { serviceName: 'Rinomodelación no quirurgica', servicePath: '/tratamientos-faciales/estetica-nariz/rinomodelacion'},
              ]
            },
            {
              name: 'Corregir el Acné',
              imageUrl: '/images/ACNE.png',
              services: [
                { serviceName: 'Láser', servicePath: '/tratamientos-faciales/corregir-acne/laser'},
                { serviceName: 'Peeling Químico', servicePath: '/tratamientos-faciales/corregir-acne/peeling-quimico'},
                { serviceName: 'Mesoterapia Facial', servicePath: '/tratamientos-faciales/corregir-acne/mesoterapia'},
                { serviceName: 'IPL Pulsada Intensa', servicePath: '/tratamientos-faciales/corregir-acne/ipl'},
              ]
            },
            {
              name: 'Flacidez de rostro',
              imageUrl: '/images/FLACIDEZ24.jpg',
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
              imageUrl: '/images/PARPADOS PORTADA.png',
              services: [
                { serviceName: 'HIFU', servicePath: '/tratamientos-faciales/parpados-caidos/hifu'},
                { serviceName: 'Hilos Tensores', servicePath: '/tratamientos-faciales/parpados-caidos/hilos-tensores'},
                { serviceName: 'Neuromoduladores', servicePath: '/tratamientos-faciales/parpados-caidos/neuromoduladores'},
                { serviceName: 'Blefaroplastia sin cirugía con láser CO2', servicePath: '/tratamientos-faciales/parpados-caidos/blefaroplastia'},
              ]
            },
            {
              name: 'Volumen Facial',
              imageUrl: '/images/ACIDO HIALURONICO.png',
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
          path: '/estetica/corporal',
          imageUrl: '/images/placeholder_image.png',
          imagePath:'/images/OZONOTERAPIA.CELULITIS.png',
          
          problems: [
            {
              name: 'Eliminar Celulitis',
              imageUrl: '/images/OZONOTERAPIA.CELULITIS.png',
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
              name: 'Sudoración Excesiva',
              imageUrl: '/images/SUDOR PORTADA.png',
              services: [
                { serviceName: 'Eliminar Sudoración Excesiva', servicePath: '/tratamientos-corporales/sudor-excesivo/eliminar-sudor'},
              ]
            },
            {
              name: 'Flacidez Corporal',
              imageUrl: '/images/FLACIDEZ CORPORAL PORTADA.png',
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
              imageUrl: '/images/PORTADA_VOL.png',
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
              name: 'Rejuvenecimiento de las manos',
              imageUrl: '/images/PORTADA EMBELLECIMIENTO MANOS.png',
              services: [
                { serviceName: 'Ácido hialurónico', servicePath: '/tratamientos-corporales/rejuvenecimiento-manos/acido-hialuronico'},
                { serviceName: 'HIFU Corporal', servicePath: '/tratamientos-corporales/rejuvenecimiento-manos/hifu'},
                { serviceName: 'IPL Eclipse Light', servicePath: '/tratamientos-corporales/rejuvenecimiento-manos/ipl'},
                { serviceName: 'Sudaración excesiva', servicePath: '/tratamientos-corporales/rejuvenecimiento-manos/sudor-excesivo'},
                { serviceName: 'Láser CO2 Fraccionado', servicePath: '/tratamientos-corporales/rejuvenecimiento-manos/laser-co2-fraccionado'},
                { serviceName: 'PRP Plasma Rico en Plaquetas', servicePath: '/tratamientos-corporales/rejuvenecimiento-manos/plasma-rico-plaquetas' },
               // { serviceName: 'TMT Systems - Mesoterapia Virtual', servicePath: '/tratamientos-corporales/rejuvenecimiento-manos/psoterapia-virtual'},
                { serviceName: 'Skinbooster Rejuvenecimiento', servicePath: '/tratamientos-corporales/rejuvenecimiento-manos/skinbooster'},
              ]
            },

            {
              name: 'Sudoración Excesiva',
              imageUrl: '/images/PORTADA EMBELLECIMIENTO MANOS.png',
              services: [
                { serviceName: 'Sudor Excesivo', servicePath: '/tratamientos-corporales/sudor-excesivo/eliminar-sudor'},
              ]
            },
            {
    
              name: 'Remodelación glúteos',
              imageUrl: '/images/GLUTEOS AUMENTO2.png',
              services: [
                { serviceName: 'Hilos Tensores', servicePath: '/tratamientos-corporales/remodelacion-gluteos/hilos-tensores'},
                { serviceName: 'Velashape', servicePath: '/tratamientos-corporales/remodelacion-gluteos/velashape'},
                { serviceName: 'EMS Sculpting', servicePath: '/tratamientos-corporales/remodelacion-gluteos/ems-sculpting' },
              ]
            },
            {
              name: 'Eliminar Estrías',
              imageUrl: '/images/PORTADA_ESTRIAS.png',
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
          path: '/estetica/masculina',
          imageUrl: '/images/placeholder_image.png',
          imagePath:'/images/estetica.masculina.png',
          problems: [
            {
              name: 'Corrección de la nariz',
              imageUrl: '/images/RINOMODELACIÓN.jpg',
              services: [
                { serviceName: 'Rinomodelación no quirurgica', servicePath: '/estetica-masculina/corregir-nariz/rinomodelacion'},
                { serviceName: 'Rinoplastia', servicePath: '/estetica-masculina/corregir-nariz/rinoplastia'},
              ]
            },
            {
              name: 'Definición Mandibular',
              imageUrl: '/images/MASC-DEFINICIÓN MANDIBULAR PORTADA.png',
              services: [
                { serviceName: 'Ácido Hialurónico', servicePath: '/estetica-masculina/definicion-mandibular/acido-hialuronico'},
                { serviceName: 'Mentoplastia', servicePath: '/estetica-masculina/definicion-mandibular/mentoplastia'},
              ]
            },
            {
              name: 'Marcar Abdominales',
              imageUrl: '/images/MASC-DEFINICIÓN MANDIBULAR PORTADA.png',
              services: [
                { serviceName: 'Marcación Abdominal', servicePath: '/estetica-masculina/marcar-adbominal/marcacion-abdominal'},
  
              ]
            },
            {
              name: 'Eliminar Bolsas',
              imageUrl: '/images/MASC-ELIMINAR BOLSAS PORTADA.png',
              services: [
                { serviceName: 'Enzimas PB Serum', servicePath: '/estetica-masculina/eliminar-bolsas/enzimas-pb'},
                { serviceName: 'Láser CO2 Fraccionado', servicePath: '/estetica-masculina/eliminar-bolsas/laser-co2'},
                { serviceName: 'Ácido Hialurónico', servicePath: '/estetica-masculina/eliminar-bolsas/acido-hialuronico'},
                { serviceName: 'HIFU', servicePath: '/estetica-masculina/eliminar-bolsas/hifu'},
              ]
            },
            {
              name: 'Eliminar o Suavizar Arrugas',
              imageUrl: '/images/MASCULIN-ELIMINAR ARRUGAS PORTADA.png',
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
              imageUrl: '/images/eliminapapada.jpeg',
              services: [
                { serviceName: 'Lipopapada Enzimática', servicePath: '/estetica-masculina/eliminar-arrugas/eliminar-papada/lipopapada-enzimatica'},
              ]
            },

            {
              name: 'Eliminar Anomalia??',
              imageUrl: '/images/eliminapapada.jpeg',
              services: [
                { serviceName: 'Ginecomastia', servicePath: 'estetica-masculina/eliminar-arrugas/reducir-anomalia/ginecomastia'},
              ]
            },
            {
              name: 'Parpados Caidos',
              imageUrl: '/images/MASC-PARPADO CAIDO PORTADA.jpg',
              services: [
               // { serviceName: 'HIFU', servicePath: '/estetica/estetica-masculina/parpados-caidos/hifu'},
                { serviceName: 'Láser CO2', servicePath: 'estetica-masculina/eliminar-arrugas/parpados-caidos/laser-co2'},
                { serviceName: 'Blefaroplastia sin cirugía con láser CO2', servicePath: '/estetica-masculina/eliminar-arrugas/parpados-caidos/blefaroplastia'},
              ]
            },
            {
              name: 'Reducir Volumen Corporal',
              imageUrl: '/images/MASC-REDUCIR VOLUMEN CORPORAL PORTADA.png',
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
              imageUrl: '/images/MASC-REJUVENECIMIENTO FACIAL HIFU.jpg',
              services: [
                { serviceName: 'Coctel de Vitaminas Mesoterapia', servicePath: '/estetica-masculina/rejuvenecimiento-facial/cocktail-vitaminas'},
                { serviceName: 'Enzimas Recombinantes', servicePath: '/estetica-masculina/rejuvenecimiento-facial/enzimas-recombinantes' },
                { serviceName: 'Plasma Rico en Plaquetas', servicePath: '/estetica-masculina/rejuvenecimiento-facial/plasma-rico-plaquetas'},
                { serviceName: 'HIFU Lifting sin Cirugía', servicePath: '/estetica-masculina/rejuvenecimiento-facial/hifu'},
              ]
            },
            {
              name: 'Corregir el Acné',
              imageUrl: '/images/MASC-CORREGIR ACNE PORTADA.png',
              services: [
                { serviceName: 'Peeling Químico', servicePath: '/estetica-masculina/corregir-acne/peeling-quimico' },
                { serviceName: 'IPL Pulsada Intensa', servicePath: '/estetica-masculina/corregir-acne/ipl'},
                { serviceName: 'Láser CO2', servicePath: '/estetica-masculina/corregir-acne/laser-co2' },
                { serviceName: 'Mesoterapia', servicePath: '/estetica-masculina/corregir-acne/mesoterapia'},
              ]
            },
            {
              name: 'Trastornos de la Piel',
              imageUrl: '/images/trastornospiel.jpeg',
              services: [
                { serviceName: 'Arañas Vasculares', servicePath: '/estetica-masculina/trastornos-piel/arañas-vasculares'},
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
          path: '/estetica/cirugias',
          imageUrl: '/images/placeholder_image.png',
          imagePath:'/images/estetica.cirugias.png',
          problems: [
            {
              name: 'Cirugía de Pecho',
              imageUrl: '/images/cirugiapecho.jpeg',
              services: [
                { serviceName: 'Aumento de Pecho', servicePath: '/cirugias-medicoesteticas/pecho/aumento-pecho'},
                { serviceName: 'Cambio de Prótesis', servicePath: '/cirugias-medicoesteticas/pecho/cambio-protesis'},
                { serviceName: 'Elevación de Pecho', servicePath: '/cirugias-medicoesteticas/pecho/elevacion-pecho'},
                { serviceName: 'Pezones Invertidos', servicePath: '/cirugias-medicoesteticas/pecho/pezones-invertidos'},
                { serviceName: 'Reconstrucción Mamaria', servicePath: '/cirugias-medicoesteticas/pecho/reconstruccion-mamaria'},
                { serviceName: 'Reducción de Pecho', servicePath: '/cirugias-medicoesteticas/pecho/reduccion-pecho'},
              ]
            },
            {
              name: 'Cirugía Estética Corporal',
              imageUrl: '/images/cirugiacorporal.jpeg',
              services: [
                { serviceName: 'Abdominoplastia', servicePath: '/cirugias-medicoesteticas/corporal/abdominoplastia'},
                { serviceName: 'Aumento de Glúteos', servicePath: '/cirugias-medicoesteticas/corporal/aumento-gluteos'},
                { serviceName: 'Lifting de Brazos', servicePath: '/cirugias-medicoesteticas/corporal/lifting-brazos'},
                { serviceName: 'Lifting de Piernas', servicePath: '/cirugias-medicoesteticas/corporal/lifting-piernas'},
                { serviceName: 'Lipofilling', servicePath: '/cirugias-medicoesteticas/corporal/lipofilling'},
                { serviceName: 'Lipolaser', servicePath: '/cirugias-medicoesteticas/corporal/lipolaser'},
                { serviceName: 'Liposucción', servicePath: '/cirugias-medicoesteticas/corporal/liposuccion'},
              ]
            },
            {
              name: 'Cirugía Estética Facial',
              imageUrl: '/images/cirugiafacial.jpeg',
              services: [
                { serviceName: 'Rinoplastia', servicePath: '/cirugias-medicoesteticas/facial/rinoplastia'},
                { serviceName: 'Bichectomia', servicePath: '/cirugias-medicoesteticas/facial/bichetomia'},
                { serviceName: 'Blefaroplastia', servicePath: '/cirugias-medicoesteticas/facial/blefaroplastia'},
                { serviceName: 'Lifting de Riesgo', servicePath: '/cirugias-medicoesteticas/facial/lifting-riesgo'},
                { serviceName: 'Liting Facial', servicePath: ' /cirugias-medicoesteticas/facial/lifting-facial'},
                { serviceName: 'Liposucción de Papada', servicePath: '/cirugias-medicoesteticas/facial/liposuccion-papada'},
                { serviceName: 'Lobuloplastia', servicePath: '/cirugias-medicoesteticas/facial/lobuloplastia'},
                { serviceName: 'Mentoplastia', servicePath: '/cirugias-medicoesteticas/facial/mentoplastia'},
                { serviceName: 'Otoplastia', servicePath: '/cirugias-medicoesteticas/facial/otoplastia '},
              ]
            },
          ]
        },
   
        ],
    },
    {
      id: 2,
      title: "Medicina Regenerativa",
      path: "/anti-aging",
      
      image:"/images/antiaging.png",
      newTab: false,
      submenu: [
        { 
          name: 'Ozonoterapia Médica y Estética', 
          path: '/ozonoterapia-medicoestetica',
          imageUrl: '/images/placeholder_image.png',
          imagePath:'/images/antiaging.ozonoterapia.png',
          problems: [
            {
              name: 'Ozonoterapia Capilar',
              imageUrl: '/images/ozonoterapiacapilar.jpeg',
              services: [
                { serviceName: 'Ozonoterapia Capilar', servicePath: '/ozonoterapia-capilar/ozonoterapia-capilar'},
              ]
            },
            {
              name: 'Ozonoterapia Estética',
              imageUrl: '/images/ozonoterapiaestetica.jpeg',
              services: [
                { serviceName: 'Acné', servicePath: '/ozonoterapia-estetica/corregir-acne'},
                { serviceName: 'Celulitis', servicePath: '/ozonoterapia-estetica/eliminar-celulitis'},
                { serviceName: 'Embellecimiento de la Piel', servicePath: '/ozonoterapia-estetica/embellecer-piel'},
                { serviceName: 'Post-Cirugía', servicePath: '/ozonoterapia-estetica/post-cirugia'},
                { serviceName: 'Post-Dermopigmentación', servicePath: '/ozonoterapia-estetica/post-dermopigmentacion'},
                { serviceName: 'Rejuvenecimiento Facial', servicePath: '/ozonoterapia-estetica/rejuvenecimiento-facial'},
                { serviceName: 'Rosácea', servicePath: '/ozonoterapia-estetica/rosacea-couperosis'},
                { serviceName: 'Varices y Arañas Vasculares', servicePath: '/ozonoterapia-estetica/arañas-y-varices'},
              ]
            },
            {
              name: 'Ozonoterapia Médica',
              imageUrl: '/images/ozonoterapiamedica.jpeg',
              services: [
                { serviceName: 'Atrosis de Cadera', servicePath: '/ozonoterapia-medica/cadera/atrosis'},
                { serviceName: 'Bursitis de Cadera', servicePath: '/ozonoterapia-medica/cadera/bursitis'},
                { serviceName: 'Necrosis de Cadera', servicePath: '/ozonoterapia-medica/cadera/necrosis'},
                { serviceName: 'Trocanteritis de Cadera', servicePath: '/ozonoterapia-medica/cadera/trocanteritis'},
                { serviceName: 'Atrosis y Artritis de Codo', servicePath: '/ozonoterapia-medica/codo/artrosis-y-artritis'},
                { serviceName: 'Bursitis de Codo', servicePath: '/ozonoterapia-medica/codo/bursitis'},
                { serviceName: 'Epicondulitis de Codo', servicePath: '/ozonoterapia-medica/codo/epicondulitis'},
                { serviceName: 'Tendinitis de Codo', servicePath: '/ozonoterapia-medica/codo/tendinitis'},
                { serviceName: 'Atrosis de Columna', servicePath: '/ozonoterapia-medica/espalda/atrosis-columna'},
                { serviceName: 'Ciatica de Columna', servicePath: '/ozonoterapia-medica/espalda/ciatica-columna'},
                { serviceName: 'Dolor de Espalda', servicePath: '/ozonoterapia-medica/espalda/dolor-espalda'},
                { serviceName: 'Hernia Discal, Cervical, Dorsal y Lumbar', servicePath: '/ozonoterapia-medica/espalda/hernias'},
                { serviceName: 'Atrosis y Artritis de Hombro', servicePath: '/ozonoterapia-medica/hombro/artrosis-y-artritis'},
                { serviceName: 'Bursitis de Hombro', servicePath: '/ozonoterapia-medica/hombro/bursitis'},
                { serviceName: 'Tendinitis de Bicipital', servicePath: '/ozonoterapia-medica/hombro/tendinitis-bicipital'},
                { serviceName: 'Tendinitis del Supraespinoso', servicePath: '/ozonoterapia-medica/hombro/tendinitis-supraespinoso'},
                { serviceName: 'Tendinitis de Manguito Rotador', servicePath: '/ozonoterapia-medica/hombro/tendinitis-manguito'},
              ]
            },
          ]
        },
        { name: 'Terapia con Péptidos', imagePath: '/images/estet.jpg', path: '/terapia-peptidos', imageUrl: '/images/placeholder_image.png'},
        { name: 'Medicina Funcional y Nutrición Celular Ortomolecular', imagePath: '/images/placeholder-image.png', path: '/medicina-ortomolecular', imageUrl: '/images/placeholder_image.png'},
        { name: 'Sueroterapia', imagePath: '/images/estetica.menu.jpg', path: '/sueroterapia', imageUrl: '/images/placeholder_image.png'},

        ],
    },
    {
      id: 3,
      title: "Alquiler y venta de equipos",
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