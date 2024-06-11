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
                { serviceName: 'HIFU', servicePath: '/estetica/estetica/cejas-caidas/hifu'},
                { serviceName: 'Hilos Tensores', servicePath: '/estetica/estetica/cejas-caidas/hilos-tensores'},
                { serviceName: 'Dermopigmentación', servicePath: '/estetica/facial/dermopigmentacion'},
                { serviceName: 'Neuromoduladores', servicePath: '/estetica/estetica/cejas-caidas/neuromoduladores'},
              ]
            },
            {
              name: 'Corrección de manchas',
              imageUrl: '/images/PORTADA_EMBELLECIMIENTO_PIEL.png',
              services: [
                { serviceName: 'Peeling Químico', servicePath: '/estetica/facial/peeling' },
                { serviceName: 'Rejuvenecimiento con IPL', servicePath: '/estetica/facial/ipl'},
                { serviceName: 'Láser CO2 Fraccionado', servicePath: '/estetica/facial/laser-co2'},
              ]
            },
            {
              name: 'Corracción malas praxis',
              imageUrl: '/images/ELIMINAR_MANCHAS PRP..png',
              services: [
                { serviceName: 'Micropigmentación', servicePath: '/estetica/estetica/corregir-mala-praxis/micropigmentacion'},
                { serviceName: 'Eliminación de tatuajes', servicePath: '/estetica/estetica/corregir-mala-praxis/eliminar-tatuajes'},
                { serviceName: 'Ácido hialurónico', servicePath: '/estetica/facial/hialuronico'},
              ]
            },
            {
              name: 'Elevación de pómulos',
              imageUrl: '/images/POMULOS PORTADA.png',
              services: [
                { serviceName: 'Ácido hialurónico', servicePath: '/estetica/estetica/elevar-pomulos/acido-hialuronico'},
                { serviceName: 'HIFU', servicePath: '/estetica/estetica/elevar-pomulos/hifu'},
                { serviceName: 'Hilos Tensores', servicePath: '/estetica/estetica/elevar-pomulos/hilos-tensores'},
              ]
            },
            {
              name: 'Eliminar arrugas',
              imageUrl: '/images/PORTADA ARRUGAS.png',
              services: [
                { serviceName: 'Ácido hialurónico', servicePath: '/estetica/estetica/eliminar-arrugas/acido-hialuronico'},
                { serviceName: 'HIFU', servicePath: '/estetica/estetica/eliminar-arrugas/hifu'},
                { serviceName: 'Hilos Tensores', servicePath: '/estetica/estetica/eliminar-arrugas/hilos-faciales'},
                { serviceName: 'Láser CO2 Fraccionado', servicePath: '/estetica/estetica/eliminar-arrugas/laser-co2'},
                { serviceName: 'Dermapen', servicePath: '/estetica/estetica/eliminar-arrugas/dermapen'},
                { serviceName: 'Mesoterapia Facial', servicePath: '/estetica/estetica/eliminar-arrugas/mesoterapia'},
                { serviceName: 'Neuromoduladores', servicePath: '/estetica/estetica/eliminar-arrugas/neuromoduladores'},
                { serviceName: 'Plasma Rico en Plaquetas PRP', servicePath: '/estetica/estetica/eliminar-arrugas/plasma-rico-plaquetas'},
                { serviceName: 'Skinbooster', servicePath: '/estetica/estetica/eliminar-arrugas/skinboosterr'},
              ]
            },
            {
              name: 'Eliminar bolsas',
              imageUrl: '/images/ELIMINAR BOLSAS PORTADA.png',
              services: [
                { serviceName: 'Enzimas PB Serum', servicePath: '/estetica/estetica/eliminar-bolsas/enzimas-pb'},
                { serviceName: 'HIFU', servicePath: '/estetica/estetica/eliminar-bolsas/hifu'},
                { serviceName: 'Láser CO2 Fraccionado', servicePath: '/estetica/estetica/eliminar-bolsas/laser-co2'},
              ]
            },
            {
              name: 'Eliminar ojeras',
              imageUrl: '/images/CEJAS NEUROMODULADORES.png',
              services: [
                { serviceName: 'Ácido hialurónico', servicePath: '/estetica/estetica/eliminar-ojeras/acido-hialuronico'},
                { serviceName: 'Láser CO2 Fraccionado', servicePath: '/estetica/estetica/eliminar-ojeras/laser-co2'},
              ]
            },
            {
              name: 'Eliminar papada',
              imageUrl: '/images/ELIMINARPAPADAPORTADA.png',
              services: [
                { serviceName: 'Lipopapada Enzimática', servicePath: '/estetica/estetica/eliminar-papada/lipopapada'},
              ]
            },
            {
              name: 'Embellecimiento de la piel',
              imageUrl: '/images/PORTADA_EMBELLECIMIENTO_PIEL.png',
              services: [
                { serviceName: 'Arañas Vasculares', servicePath: '/estetica/estetica/embellecer-piel/arañas-vasculares'},
                { serviceName: 'Coctel de Vitaminas', servicePath: '/estetica/estetica/embellecer-piel/coctel-vitaminas'},
                { serviceName: 'Dermapen', servicePath: '/estetica/estetica/embellecer-piel/dermapen'},
                { serviceName: 'Elástica', servicePath: '/estetica/estetica/embellecer-piel/elastica'},
                { serviceName: 'Eliminar Verrugas', servicePath: '/estetica/estetica/embellecer-piel/eliminar-verrugas'},
                { serviceName: 'Láser CO2 Fraccionado', servicePath: '/estetica/estetica/embellecer-piel/laser-co2-fraccionado'},
                { serviceName: 'Poros Dilatados', servicePath: '/estetica/estetica/embellecer-piel/poros-dilatados'},
                { serviceName: 'Plasma Rico en Plaquetas', servicePath: '/estetica/estetica/embellecer-piel/rejuvenecimiento-prp'},
                { serviceName: 'Puntos de Rubí', servicePath: '/estetica/estetica/embellecer-piel/puntos-rubi'},
                { serviceName: 'Rosácea Couperosis', servicePath: '/estetica/estetica/embellecer-piel/rosacea-couperosis'},
                { serviceName: 'Skinbooster', servicePath: '/estetica/estetica/embellecer-piel/skinbooster'},
              ]
            },
            {
              name: 'Estética de la nariz',
              imageUrl: '/images/RINOMODELACIÓN PORTADA.jpg',
              services: [
                { serviceName: 'Rinomodelación no quirurgica', servicePath: '/estetica/estetica/estetica-nariz/rinomodelacion'},
              ]
            },
            {
              name: 'Corregir el Acné',
              imageUrl: '/images/ACNE.png',
              services: [
                { serviceName: 'Láser', servicePath: '/estetica/estetica/corregir-acne/laser'},
                { serviceName: 'Peeling Químico', servicePath: '/estetica/estetica/corregir-acne/peeling-quimico'},
                { serviceName: 'Mesoterapia Facial', servicePath: '/estetica/estetica/corregir-acne/mesoterapia'},
                { serviceName: 'IPL Pulsada Intensa', servicePath: '/estetica/estetica/corregir-acne/ipl'},
              ]
            },
            {
              name: 'Flacidez de rostro',
              imageUrl: '/images/FLACIDEZ24.jpg',
              services: [
                { serviceName: 'Elástica', servicePath: '/estetica/estetica/flacidez-rostro/elastica'},
                { serviceName: 'Enzimas Recombinantes', servicePath: '/estetica/estetica/flacidez-rostro/enzimas-recombinantes' },
                { serviceName: 'Fillers', servicePath: '/estetica/estetica/flacidez-rostro/fillers'},
                { serviceName: 'HIFU Lifting sin Cirugía', servicePath: '/estetica/estetica/flacidez-rostro/hifu'},
                { serviceName: 'Dermapen', servicePath: '/estetica/estetica/flacidez-rostro/dermapen'},
                { serviceName: 'Hilos Tensores', servicePath: '/estetica/estetica/flacidez-rostro/hilos-tensores'},
                { serviceName: 'Medilight Diodo Láser Frío', servicePath: '/estetica/estetica/flacidez-rostro/medilight'},
                { serviceName: 'Mesoterapia Facial', servicePath: '/estetica/estetica/flacidez-rostro/mesoterapia'},
                { serviceName: 'Neuromoduladores', servicePath: '/estetica/estetica/flacidez-rostro/neuromoduladores'},
                { serviceName: 'Skinbooster', servicePath: '/estetica/estetica/flacidez-rostro/skinbooster'},
              ]
            },
            {
              name: 'Párpados Caídos',
              imageUrl: '/images/PARPADOS PORTADA.png',
              services: [
                { serviceName: 'HIFU', servicePath: '/estetica/estetica/parpados-caidos/hifu'},
                { serviceName: 'Hilos Tensores', servicePath: '/estetica/estetica/parpados-caidos/hilos-tensores'},
                { serviceName: 'Neuromoduladores', servicePath: '/estetica/estetica/parpados-caidos/neuromoduladores'},
                { serviceName: 'Blefaroplastia sin cirugía con láser CO2', servicePath: '/estetica/estetica/parpados-caidos/blefaroplastia'},
              ]
            },
            {
              name: 'Volumen Facial',
              imageUrl: '/images/ACIDO HIALURONICO.png',
              services: [
                { serviceName: 'Aumento de pómulos', servicePath: '/estetica/estetica/volumen-facial/aumento-pomulos'},
                { serviceName: 'Aumento de mentón', servicePath: ' /estetica/estetica/volumen-facial/mentoplastia'},
                { serviceName: 'Ácido hialurónico', servicePath: '/estetica/estetica/volumen-facial/acido-hialuronico'},
                { serviceName: 'Bichectomia sin cirugía', servicePath: '/estetica/estetica/volumen-facial/bichetomia'},
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
                { serviceName: 'HIFU Corporal', servicePath: '/estetica/tratamientos-corporales/eliminar-celulitis/hifu', },
                { serviceName: 'Ozonoterapia', servicePath: '/estetica/tratamientos-corporales/eliminar-celulitis/ozonoterapia'},
                { serviceName: 'Reducción enzimática de celulitis y flacidez', servicePath: '/estetica/tratamientos-corporales/eliminar-celulitis/reduccion-enzimatica'},
                { serviceName: 'TMT Systems - Mesoterapia Virtual', servicePath: '/estetica/tratamientos-corporales/eliminar-celulitis/tms-system'},
                { serviceName: 'Velashape', servicePath: '/estetica/tratamientos-corporales/eliminar-celulitis/velashape'},
                { serviceName: 'EMS Sculpting', servicePath: '/estetica/tratamientos-corporales/eliminar-celulitis/ems-sculpting'},
              ]
            },
            {
              name: 'Dermopigmentación',
              imageUrl: '/images/DERMAPEN.png',
              services: [
                { serviceName: 'Areolas', servicePath: '/estetica/corporal/areolas'},
                { serviceName: 'Camuflaje de cicatrices y estrías', servicePath: '/estetica/corporal/camuflaje-imperfecciones'},
                { serviceName: 'Capilar', servicePath: '/estetica/corporal/capilar'},
              ]
            },
            {
              name: 'Sudoración Excesiva',
              imageUrl: '/images/SUDOR PORTADA.png',
              services: [
                { serviceName: 'Eliminar Sudoración Excesiva', servicePath: '/estetica/corporal/sudoracion-excesiva'},
              ]
            },
            {
              name: 'Flacidez Corporal',
              imageUrl: '/images/FLACIDEZ CORPORAL PORTADA.png',
              services: [
                { serviceName: 'EMS Sculpting', servicePath: '/estetica/tratamientos-corporales/flacidez-corporal/ems-sculpting'},
                { serviceName: 'HIFU Corporal', servicePath: '/estetica/tratamientos-corporales/flacidez-corporal/hifu'},
                { serviceName: 'Mesoterapia Corporal', servicePath: '/estetica/tratamientos-corporales/flacidez-corporal/mesoterapia'},
                { serviceName: 'Enzimas Recombinantes', servicePath: '/estetica/tratamientos-corporales/flacidez-corporal/enzimas-recombinantes' },
                { serviceName: 'Ozonoterapia', servicePath: '/estetica/tratamientos-corporales/flacidez-corporal/ozonoterapia' },
                { serviceName: 'Plasma Rico en Plaquetas', servicePath: '/estetica/tratamientos-corporales/flacidez-corporal/plasma-rico-plaquetas'},
                { serviceName: 'TMT Systems - Mesoterapia Virtual', servicePath: '/estetica/tratamientos-corporales/flacidez-corporal/tmt-system'},
                { serviceName: 'Velashape', servicePath: '/estetica/tratamientos-corporales/flacidez-corporal/velashape'},
                { serviceName: 'Láser CO2 Fraccionado', servicePath: '/estetica/tratamientos-corporales/flacidez-corporal/laser-co2-fraccionado'},
              ]
            },
            {
              name: 'Reducir Volumen Corporal',
              imageUrl: '/images/PORTADA_VOL.png',
              services: [
                { serviceName: 'EMS Sculpting', servicePath: '/estetica/tratamientos-corporales/reducir-volumen-corporal/electroestimulacion-ems'},
                { serviceName: 'HIFU Corporal', servicePath: '/estetica/tratamientos-corporales/reducir-volumen-corporal/hifu'},
                { serviceName: 'Láser Lipolítico', servicePath: '/estetica/tratamientos-corporales/reducir-volumen-corporal/laser-lipolitico'},
                { serviceName: 'Reducción Enzimática de la Celulitis', servicePath: '/estetica/tratamientos-corporales/reducir-volumen-corporal/reduccion-enzimatica' },
                { serviceName: 'Mesoterapia Lipolítica', servicePath: '/estetica/tratamientos-corporales/reducir-volumen-corporal/mesoterapia-lipolitica' },
                { serviceName: 'Ozonoterapia', servicePath: '/estetica/tratamientos-corporales/reducir-volumen-corporal/ozonoterapia' },
                { serviceName: 'TMT Systems - Mesoterapia Virtual', servicePath: '/estetica/tratamientos-corporales/reducir-volumen-corporal/tmt-system'},
                { serviceName: 'Velashape', servicePath: '/estetica/tratamientos-corporales/reducir-volumen-corporal/velashape'},
              ]
            },
            {
              name: 'Rejuvenecimiento de las manos',
              imageUrl: '/images/PORTADA EMBELLECIMIENTO MANOS.png',
              services: [
                { serviceName: 'Ácido hialurónico', servicePath: '/estetica/tratamientos-corporales/rejuvenecimiento-manos/acido-hialuronico'},
                { serviceName: 'HIFU Corporal', servicePath: '/estetica/tratamientos-corporales/rejuvenecimiento-manos/hifu'},
                { serviceName: 'IPL Eclipse Light', servicePath: '/estetica/tratamientos-corporales/rejuvenecimiento-manos/ipl'},
                { serviceName: 'Sudaración excesiva', servicePath: '/estetica/tratamientos-corporales/rejuvenecimiento-manos/sudor-excesivo'},
                { serviceName: 'Láser CO2 Fraccionado', servicePath: '/estetica/tratamientos-corporales/rejuvenecimiento-manos/laser-co2-fraccionado'},
                { serviceName: 'PRP Plasma Rico en Plaquetas', servicePath: '/estetica/tratamientos-corporales/rejuvenecimiento-manos/plasma-rico-plaquetas' },
               // { serviceName: 'TMT Systems - Mesoterapia Virtual', servicePath: '/estetica/corporal/mesoterapia-virtual'},
                { serviceName: 'Skinbooster Rejuvenecimiento', servicePath: '/estetica/tratamientos-corporales/rejuvenecimiento-manos/skinbooster'},
              ]
            },

            {
              name: 'Sudoración Excesiva',
              imageUrl: '/images/PORTADA EMBELLECIMIENTO MANOS.png',
              services: [
                { serviceName: 'Sudor Excesivo', servicePath: '/estetica/tratamientos-corporales/sudor-excesivo/eliminar-sudor'},
              ]
            },
            {
    
              name: 'Remodelación glúteos',
              imageUrl: '/images/GLUTEOS AUMENTO2.png',
              services: [
                { serviceName: 'Hilos Tensores', servicePath: '/estetica/tratamientos-corporales/remodelacion-gluteos/hilos-tensores'},
                { serviceName: 'Velashape', servicePath: '/estetica/tratamientos-corporales/remodelacion-gluteos/velashape'},
                { serviceName: 'EMS Sculpting', servicePath: '/estetica/tratamientos-corporales/remodelacion-gluteos/ems-sculpting' },
              ]
            },
            {
              name: 'Eliminar Estrías',
              imageUrl: '/images/PORTADA_ESTRIAS.png',
              services: [
                { serviceName: 'Láser CO2', servicePath: '/estetica/tratamientos-corporales/eliminar-estrias/laser-co2'},
                { serviceName: 'Velashape', servicePath: '/estetica/tratamientos-corporales/eliminar-estrias/velashape'},
                { serviceName: 'Plasma Rico en Plaquetas', servicePath: '/estetica/tratamientos-corporales/eliminar-estrias/plasma-rico-plaquetas'},
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
                { serviceName: 'Rinomodelación no quirurgica', servicePath: '/estetica/estetica-masculina/corregir-nariz/rinomodelacion'},
                { serviceName: 'Rinoplastia', servicePath: '/estetica/estetica-masculina/corregir-nariz/rinoplastia'},
              ]
            },
            {
              name: 'Definición Mandibular',
              imageUrl: '/images/MASC-DEFINICIÓN MANDIBULAR PORTADA.png',
              services: [
                { serviceName: 'Ácido Hialurónico', servicePath: '/estetica/estetica-masculina/definicion-mandibular/acido-hialuronico'},
                { serviceName: 'Mentoplastia', servicePath: '/estetica/estetica-masculina/definicion-mandibular/mentoplastia'},
              ]
            },
            {
              name: 'Marcar Abdominales',
              imageUrl: '/images/MASC-DEFINICIÓN MANDIBULAR PORTADA.png',
              services: [
                { serviceName: 'Marcación Abdominal', servicePath: '/estetica/estetica-masculina/marcar-adbominal/marcacion-abdominal'},
  
              ]
            },
            {
              name: 'Eliminar Bolsas',
              imageUrl: '/images/MASC-ELIMINAR BOLSAS PORTADA.png',
              services: [
                { serviceName: 'Enzimas PB Serum', servicePath: '/estetica/estetica-masculina/eliminar-bolsas/enzimas-pb'},
                { serviceName: 'Láser CO2 Fraccionado', servicePath: '/estetica/estetica-masculina/eliminar-bolsas/laser-co2'},
                { serviceName: 'Ácido Hialurónico', servicePath: '/estetica/estetica-masculina/eliminar-bolsas/acido-hialuronico'},
                { serviceName: 'HIFU', servicePath: '/estetica/estetica-masculina/eliminar-bolsas/hifu'},
              ]
            },
            {
              name: 'Eliminar o Suavizar Arrugas',
              imageUrl: '/images/MASCULIN-ELIMINAR ARRUGAS PORTADA.png',
              services: [
                { serviceName: 'Ácido Hialurónico', servicePath: '/estetica/facial/hialuronico'},
                { serviceName: 'Láser CO2 Fraccionado', servicePath: '/estetica/masculina/laser-co2'},
                { serviceName: 'Neuromoduladores', servicePath: '/estetica/masculina/neuromoduladores'},
                { serviceName: 'Hilos Tensores', servicePath: '/estetica/masculina/hilos-tensores'},
                { serviceName: 'Enzimas Recombinantes', servicePath: '/estetica/masculina/enzimas-recombinantes' },
              ]
            },
            {
              name: 'Elimina Papada sin Cirugía',
              imageUrl: '/images/eliminapapada.jpeg',
              services: [
                { serviceName: 'Lipopapada Enzimática', servicePath: '/estetica/estetica-masculina/eliminar-papada/lipopapada-enzimatica'},
              ]
            },

            {
              name: 'Eliminar Anomalia??',
              imageUrl: '/images/eliminapapada.jpeg',
              services: [
                { serviceName: 'Ginecomastia', servicePath: '/estetica/estetica-masculina/reducir-anomalia/ginecomastia'},
              ]
            },
            {
              name: 'Parpados Caidos',
              imageUrl: '/images/MASC-PARPADO CAIDO PORTADA.jpg',
              services: [
               // { serviceName: 'HIFU', servicePath: '/estetica/estetica-masculina/parpados-caidos/hifu'},
                { serviceName: 'Láser CO2', servicePath: '/estetica/estetica-masculina/parpados-caidos/laser-co2'},
                { serviceName: 'Blefaroplastia sin cirugía con láser CO2', servicePath: '/estetica/estetica-masculina/parpados-caidos/blefaroplastia'},
              ]
            },
            {
              name: 'Reducir Volumen Corporal',
              imageUrl: '/images/MASC-REDUCIR VOLUMEN CORPORAL PORTADA.png',
              services: [
                { serviceName: 'HIFU Corporal', servicePath: '/estetica/estetica-masculina/reducir-volumen-corporal/hifu'},
               // { serviceName: 'Blefaroplastia sin cirugía con láser CO2', servicePath: '/estetica/masculina/blefaroplastia'},
                { serviceName: 'Mesoterapia Lipolítica', servicePath: '/estetica/estetica-masculina/reducir-volumen-corporal/mesoterapia-lipolitica' },
                { serviceName: 'Electroestimulación EMS', servicePath: '/estetica/estetica-masculina/reducir-volumen-corporal/electroestimulacion-ems' },
                { serviceName: 'Velashape', servicePath: '/estetica/estetica-masculina/reducir-volumen-corporal/velashape'},
                { serviceName: 'Cocktail Vitaminas', servicePath: '/estetica/estetica-masculina/reducir-volumen-corporal/cocktail-vitaminas'},
              ]
            },
            {
              name: 'Rejuvenecimiento Facial',
              imageUrl: '/images/MASC-REJUVENECIMIENTO FACIAL HIFU.jpg',
              services: [
                { serviceName: 'Coctel de Vitaminas Mesoterapia', servicePath: '/estetica/estetica-masculina/rejuvenecimiento-facial/cocktail-vitaminas'},
                { serviceName: 'Enzimas Recombinantes', servicePath: '/estetica/estetica-masculina/rejuvenecimiento-facial/enzimas-recombinantes' },
                { serviceName: 'Plasma Rico en Plaquetas', servicePath: '/estetica/estetica-masculina/rejuvenecimiento-facial/plasma-rico-plaquetas'},
                { serviceName: 'HIFU Lifting sin Cirugía', servicePath: '/estetica/estetica-masculina/rejuvenecimiento-facial/hifu'},
              ]
            },
            {
              name: 'Corregir el Acné',
              imageUrl: '/images/MASC-CORREGIR ACNE PORTADA.png',
              services: [
                { serviceName: 'Peeling Químico', servicePath: '/estetica/estetica-masculina/corregir-acne/peeling-quimico' },
                { serviceName: 'IPL Pulsada Intensa', servicePath: '/estetica/estetica-masculina/corregir-acne/ipl'},
                { serviceName: 'Láser CO2', servicePath: '/estetica/estetica-masculina/corregir-acne/laser-co2' },
                { serviceName: 'Mesoterapia', servicePath: '/estetica/estetica-masculina/corregir-acne/mesoterapia'},
              ]
            },
            {
              name: 'Trastornos de la Piel',
              imageUrl: '/images/trastornospiel.jpeg',
              services: [
                { serviceName: 'Arañas Vasculares', servicePath: '/estetica/estetica-masculina/trastornos-piel/arañas-vasculares'},
                { serviceName: 'Eliminar Verrugas', servicePath: '/estetica/estetica-masculina/trastornos-piel/eliminar-verrugas'},
                { serviceName: 'Poros Dilatados', servicePath: '/estetica/estetica-masculina/trastornos-piel/poros-dilatados'},
                { serviceName: 'Puntos de Rubí', servicePath: '/estetica/estetica-masculina/trastornos-piel/puntos-rubi'},
                { serviceName: 'Rosácea', servicePath: '/estetica/estetica-masculina/trastornos-piel/rosacea'},
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
                { serviceName: 'Aumento de Pecho', servicePath: '/estetica/cirugias/aumento-pecho'},
                { serviceName: 'Cambio de Prótesis', servicePath: '/estetica/cirugias/cambio-protesis'},
                { serviceName: 'Elevación de Pecho', servicePath: '/estetica/cirugias/elevacion-pecho'},
                { serviceName: 'Pezones Invertidos', servicePath: '/estetica/cirugias/pezones-invertidos'},
                { serviceName: 'Reconstrucción Mamaria', servicePath: '/estetica/cirugias/reconstruccion-mamaria'},
                { serviceName: 'Reducción de Pecho', servicePath: '/estetica/cirugias/reduccion-pecho'},
              ]
            },
            {
              name: 'Cirugía Estética Corporal',
              imageUrl: '/images/cirugiacorporal.jpeg',
              services: [
                { serviceName: 'Abdominoplastia', servicePath: '/estetica/cirugias/cirugia-cuerpo/abdominoplastia'},
                { serviceName: 'Aumento de Glúteos', servicePath: '/estetica/cirugias/cirugia-cuerpo/aumento-gluteos'},
                { serviceName: 'Lifting de Brazos', servicePath: '/estetica/cirugias/cirugia-cuerpo/lifting-brazos'},
                { serviceName: 'Lifting de Piernas', servicePath: '/estetica/cirugias/cirugia-cuerpo/lifting-piernas'},
                { serviceName: 'Lipofilling', servicePath: '/estetica/cirugias/cirugia-cuerpo/lipofilling'},
                { serviceName: 'Lipolaser', servicePath: '/estetica/cirugias/cirugia-cuerpo/lipolaser'},
                { serviceName: 'Liposucción', servicePath: '/estetica/cirugias/cirugia-cuerpo/liposuccion'},
              ]
            },
            {
              name: 'Cirugía Estética Facial',
              imageUrl: '/images/cirugiafacial.jpeg',
              services: [
                { serviceName: 'Rinoplastia', servicePath: '/estetica/cirugias/cirugia-facial/rinoplastia'},
                { serviceName: 'Bichectomia', servicePath: '/estetica/cirugias/cirugia-facial/bichetomia'},
                { serviceName: 'Blefaroplastia', servicePath: '/estetica/cirugias/cirugia-facial/blefaroplastia'},
                { serviceName: 'Lifting de Riesgo', servicePath: '/estetica/cirugias/cirugia-facial/lifting-riesgo'},
                { serviceName: 'Liting Facial', servicePath: ' /estetica/cirugias/cirugia-facial/lifting-facial'},
                { serviceName: 'Liposucción de Papada', servicePath: '/estetica/cirugias/cirugia-facial/liposuccion-papada'},
                { serviceName: 'Lobuloplastia', servicePath: '/estetica/cirugias/cirugia-facial/lobuloplastia'},
                { serviceName: 'Mentoplastia', servicePath: '/estetica/cirugias/cirugia-facial/mentoplastia'},
                { serviceName: 'Otoplastia', servicePath: '/estetica/cirugias/cirugia-facial/otoplastia '},
              ]
            },
          ]
        },
   
        ],
    },
    {
      id: 2,
      title: "Medicina Anti-Aging",
      path: "/anti-aging",
      
      image:"/images/antiaging.png",
      newTab: false,
      submenu: [
        { 
          name: 'Ozonoterapia Médica y Estética', 
          path: '/anti-aging/ozonoterapia',
          imageUrl: '/images/placeholder_image.png',
          imagePath:'/images/antiaging.ozonoterapia.png',
          problems: [
            {
              name: 'Ozonoterapia Capilar',
              imageUrl: '/images/ozonoterapiacapilar.jpeg',
              services: [
                { serviceName: 'Ozonoterapia Capilar', servicePath: '/anti-aging/ozonoterapia/capilar'},
              ]
            },
            {
              name: 'Ozonoterapia Estética',
              imageUrl: '/images/ozonoterapiaestetica.jpeg',
              services: [
                { serviceName: 'Acné', servicePath: '/anti-aging/ozonoterapia/acne'},
                { serviceName: 'Celulitis', servicePath: '/anti-aging/ozonoterapia/celulitis'},
                { serviceName: 'Embellecimiento de la Piel', servicePath: '/anti-aging/ozonoterapia/embellecimiento-piel'},
                { serviceName: 'Post-Cirugía', servicePath: '/anti-aging/ozonoterapia/post-cirugia'},
                { serviceName: 'Post-Dermopigmentación', servicePath: '/anti-aging/ozonoterapia/post-dermopigmentacion'},
                { serviceName: 'Rejuvenecimiento Facial', servicePath: '/anti-aging/ozonoterapia/rejuvenecimiento-facial'},
                { serviceName: 'Rosácea', servicePath: '/anti-aging/ozonoterapia/rosacea'},
                { serviceName: 'Varices y Arañas Vasculares', servicePath: '/anti-aging/ozonoterapia/varices-aranas-vasculares'},
              ]
            },
            {
              name: 'Ozonoterapia Médica',
              imageUrl: '/images/ozonoterapiamedica.jpeg',
              services: [
                { serviceName: 'Atrosis de Cadera', servicePath: '/anti-aging/ozonoterapia/atrosis-cadera'},
                { serviceName: 'Bursitis de Cadera', servicePath: '/anti-aging/ozonoterapia/bursitis-cadera'},
                { serviceName: 'Necrosis de Cadera', servicePath: '/anti-aging/ozonoterapia/necrosis-cadera'},
                { serviceName: 'Trocanteritis de Cadera', servicePath: '/anti-aging/ozonoterapia/trocanteritis-cadera'},
                { serviceName: 'Atrosis y Artritis de Codo', servicePath: '/anti-aging/ozonoterapia/hifu'},
                { serviceName: 'Bursitis de Codo', servicePath: '/anti-aging/ozonoterapia/atrosis-codo'},
                { serviceName: 'Epicondulitis de Codo', servicePath: '/anti-aging/ozonoterapia/epicondulitis-codo'},
                { serviceName: 'Tendinitis de Codo', servicePath: '/anti-aging/ozonoterapia/tendinitis-codo'},
                { serviceName: 'Atrosis de Columna', servicePath: '/anti-aging/ozonoterapia/atrosis-columna'},
                { serviceName: 'Ciatica de Columna', servicePath: '/anti-aging/ozonoterapia/ciatica-columna'},
                { serviceName: 'Dolor de Espalda', servicePath: '/anti-aging/ozonoterapia/dolor-espalda'},
                { serviceName: 'Hernia Discal, Cervical, Dorsal y Lumbar', servicePath: '/anti-aging/ozonoterapia/hernias'},
                { serviceName: 'Atrosis y Artritis de Hombro', servicePath: '/anti-aging/ozonoterapia/atrosis-hombro'},
                { serviceName: 'Bursitis de Hombro', servicePath: '/anti-aging/ozonoterapia/bursitis-hombro'},
                { serviceName: 'Tendinitis de Bicipital', servicePath: '/anti-aging/ozonoterapia/tendinitis-bicipital'},
                { serviceName: 'Tendinitis del Supraespinoso', servicePath: '/anti-aging/ozonoterapia/tendinitis-supraespinoso'},
                { serviceName: 'Tendinitis de Manguito Rotador', servicePath: '/anti-aging/ozonoterapia/tendinitis-manguito-rotador'},
              ]
            },
          ]
        },
        { name: 'Equilibrio Hormonal Chip de la Juventud', imagePath: '/images/estet.jpg', path: '/anti-aging/chip-juventud', imageUrl: '/images/placeholder_image.png'},
        { name: 'Turismo de salud', imagePath: '/images/medic.jpg', path: '/anti-aging/turismo-salud', imageUrl: '/images/placeholder_image.png'},
        { name: 'Medicina Funcional y Nutrición Celular Ortomolecular', imagePath: '/images/placeholder-image.png', path: '/anti-aging/nutricion-funcional', imageUrl: '/images/placeholder_image.png'},
        { name: 'Sueroterapia', imagePath: '/images/estetica.menu.jpg', path: '/anti-aging/sueroterapia', imageUrl: '/images/placeholder_image.png'},

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