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
                { serviceName: 'HIFU', servicePath: '/estetica/facial/hifu'},
                { serviceName: 'Hilos Tensores', servicePath: '/estetica/facial/hilos-tensores'},
                { serviceName: 'Dermopigmentación', servicePath: '/estetica/facial/dermopigmentacion'},
                { serviceName: 'Neuromoduladores', servicePath: '/estetica/facial/neuromoduladores'},
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
                { serviceName: 'Dermopigmentación', servicePath: '/estetica/facial/dermopigmentacion'},
                { serviceName: 'Eliminación de tatuajes', servicePath: '/estetica/facial/elimina-tatuajes'},
                { serviceName: 'Ácido hialurónico', servicePath: '/estetica/facial/hialuronico'},
              ]
            },
            {
              name: 'Elevación de pómulos',
              imageUrl: '/images/POMULOS PORTADA.png',
              services: [
                { serviceName: 'Ácido hialurónico', servicePath: '/estetica/facial/hialuronico'},
                { serviceName: 'HIFU', servicePath: '/estetica/facial/hifu'},
                { serviceName: 'Hilos Tensores', servicePath: '/estetica/facial/hilos-tensores'},
              ]
            },
            {
              name: 'Eliminar arrugas',
              imageUrl: '/images/PORTADA ARRUGAS.png',
              services: [
                { serviceName: 'Ácido hialurónico', servicePath: '/estetica/facial/hialuronico'},
                { serviceName: 'HIFU', servicePath: '/estetica/facial/hifu'},
                { serviceName: 'Hilos Tensores', servicePath: '/estetica/facial/hilos-tensores'},
                { serviceName: 'Láser CO2 Fraccionado', servicePath: '/estetica/facial/laser-co2'},
                { serviceName: 'Dermapen', servicePath: '/estetica/facial/dermapen'},
                { serviceName: 'Mesoterapia Facial', servicePath: '/estetica/facial/mesoterapia-facial'},
                { serviceName: 'Neuromoduladores', servicePath: '/estetica/facial/neuromoduladores'},
                { serviceName: 'Plasma Rico en Plaquetas PRP', servicePath: '/estetica/facial/plasma-prp'},
                { serviceName: 'Skinbooster', servicePath: '/estetica/facial/skinbooster'},
              ]
            },
            {
              name: 'Eliminar bolsas',
              imageUrl: '/images/ELIMINAR BOLSAS PORTADA.png',
              services: [
                { serviceName: 'Enzimas PB Serum', servicePath: '/estetica/facial/pbserum'},
                { serviceName: 'HIFU', servicePath: '/estetica/facial/hifu'},
                { serviceName: 'Láser CO2 Fraccionado', servicePath: '/estetica/facial/laser-co2'},
              ]
            },
            {
              name: 'Eliminar ojeras',
              imageUrl: '/images/CEJAS NEUROMODULADORES.png',
              services: [
                { serviceName: 'Ácido hialurónico', servicePath: '/estetica/facial/hialuronico'},
                { serviceName: 'Láser CO2 Fraccionado', servicePath: '/estetica/facial/laser-co2'},
              ]
            },
            {
              name: 'Eliminar papada',
              imageUrl: '/images/ELIMINARPAPADAPORTADA.png',
              services: [
                { serviceName: 'Lipopapada Enzimática', servicePath: '/estetica/facial/lipopapada'},
              ]
            },
            {
              name: 'Embellecimiento de la piel',
              imageUrl: '/images/PORTADA_EMBELLECIMIENTO_PIEL.png',
              services: [
                { serviceName: 'Arañas Vasculares', servicePath: '/estetica/facial/aranas-vasculares'},
                { serviceName: 'Coctel de Vitaminas', servicePath: '/estetica/facial/coctel-vitaminas'},
                { serviceName: 'Dermapen', servicePath: '/estetica/facial/dermapen'},
                { serviceName: 'Elástica Plateada', servicePath: '/estetica/facial/elastica-plateada'},
                { serviceName: 'Eliminar Verrugas', servicePath: '/estetica/facial/elimina-verrugas'},
                { serviceName: 'Láser CO2 Fraccionado', servicePath: '/estetica/facial/laser-co2'},
                { serviceName: 'Poros Dilatados', servicePath: '/estetica/facial/poros-dilatados'},
                { serviceName: 'Plasma Rico en Plaquetas', servicePath: '/estetica/facial/plasma-plaquetas'},
                { serviceName: 'Puntos de Rubí', servicePath: '/estetica/facial/punto-srubi'},
                { serviceName: 'Rosácea Couperosis', servicePath: '/estetica/facial/rosacea'},
                { serviceName: 'Skinbooster', servicePath: '/estetica/facial/skinbooster'},
              ]
            },
            {
              name: 'Estética de la nariz',
              imageUrl: '/images/RINOMODELACIÓN PORTADA.jpg',
              services: [
                { serviceName: 'Rinomodelación no quirurgica', servicePath: '/estetica/facial/rinomodelacion'},
              ]
            },
            {
              name: 'Corregir el Acné',
              imageUrl: '/images/ACNE.png',
              services: [
                { serviceName: 'Peeling Químico', servicePath: '/estetica/facial/peeling' },
                { serviceName: 'Láser', servicePath: '/estetica/facial/laser' },
                { serviceName: 'Peeling Químico', servicePath: '/estetica/facial/peeling' },
                { serviceName: 'Mesoterapia Facial', servicePath: '/estetica/facial/mesoterapia-facial'},
                { serviceName: 'IPL Pulsada Intensa', servicePath: '/estetica/facial/ipl-pulsada'},
              ]
            },
            {
              name: 'Flacidez de rostro',
              imageUrl: '/images/FLACIDEZ24.jpg',
              services: [
                { serviceName: 'Elástica', servicePath: '/estetica/facial/elastica'},
                { serviceName: 'Enzimas Recombinantes', servicePath: '/estetica/facial/enzimas-recombinantes' },
                { serviceName: 'Fillers', servicePath: '/estetica/facial/fillers'},
                { serviceName: 'HIFU Lifting sin Cirugía', servicePath: '/estetica/facial/hifu-lifting'},
                { serviceName: 'Dermapen', servicePath: '/estetica/facial/dermapen'},
                { serviceName: 'Hilos Tensores', servicePath: '/estetica/facial/hilos-tensores'},
                { serviceName: 'Medilight Diodo Láser Frío', servicePath: '/estetica/facial/medilight-diodo'},
                { serviceName: 'Mesoterapia Facial', servicePath: '/estetica/facial/mesoterapia-facial'},
                { serviceName: 'Neuromoduladores', servicePath: '/estetica/facial/neuromoduladores'},
                { serviceName: 'Skinbooster', servicePath: '/estetica/facial/skinbooster'},
              ]
            },
            {
              name: 'Párpados Caídos',
              imageUrl: '/images/PARPADOS PORTADA.png',
              services: [
                { serviceName: 'HIFU', servicePath: '/estetica/facial/hifu'},
                { serviceName: 'Hilos Tensores', servicePath: '/estetica/facial/hilos-tensores'},
                { serviceName: 'Neuromoduladores', servicePath: '/estetica/facial/neuromoduladores'},
                { serviceName: 'Blefaroplastia sin cirugía con láser CO2', servicePath: '/estetica/facial/blefaroplastia'},
              ]
            },
            {
              name: 'Volumen Facial',
              imageUrl: '/images/ACIDO HIALURONICO.png',
              services: [
                { serviceName: 'Aumento de pómulos', servicePath: '/estetica/facial/hifu'},
                { serviceName: 'Aumento de mentón', servicePath: '/estetica/facial/hilos-tensores'},
                { serviceName: 'Ácido hialurónico', servicePath: '/estetica/facial/hialuronico'},
                { serviceName: 'Bichectomia sin cirugía', servicePath: '/estetica/facial/bichectomia'},
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
                { serviceName: 'HIFU Corporal', servicePath: '/estetica/corporal/hifu-corporal', },
                { serviceName: 'Ozonoterapia', servicePath: '/estetica/corporal/ozonoterapia'},
                { serviceName: 'Reducción enzimática de celulitis y flacidez', servicePath: '/estetica/corporal/reduccion-flacidez'},
                { serviceName: 'TMT Systems - Mesoterapia Virtual', servicePath: '/estetica/corporal/mesoterapia-virtual'},
                { serviceName: 'Velashape', servicePath: '/estetica/corporal/velashape'},
                { serviceName: 'EMS Sculpting', servicePath: '/estetica/corporal/emsculpting'},
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
                { serviceName: 'EMS Sculpting', servicePath: '/estetica/corporal/emsculpting'},
                { serviceName: 'HIFU Corporal', servicePath: '/estetica/corporal/hifu-corporal'},
                { serviceName: 'Mesoterapia Corporal', servicePath: '/estetica/corporal/mesoterapia-corporal'},
                { serviceName: 'Enzimas Recombinantes', servicePath: '/estetica/corporal/enzimas-recombinantes' },
                { serviceName: 'Ozonoterapia', servicePath: '/estetica/corporal/ozonoterapia' },
                { serviceName: 'Plasma Rico en Plaquetas', servicePath: '/estetica/corporal/plasma-plaquetas'},
                { serviceName: 'TMT Systems - Mesoterapia Virtual', servicePath: '/estetica/corporal/mesoterapia-virtual'},
                { serviceName: 'Velashape', servicePath: '/estetica/corporal/velashape'},
                { serviceName: 'Láser CO2 Fraccionado', servicePath: '/estetica/corporal/laser-co2'},
              ]
            },
            {
              name: 'Reducir Volumen Corporal',
              imageUrl: '/images/PORTADA_VOL.png',
              services: [
                { serviceName: 'EMS Sculpting', servicePath: '/estetica/corporal/emsculpting'},
                { serviceName: 'HIFU Corporal', servicePath: '/estetica/corporal/hifu-corporal'},
                { serviceName: 'Láser Lipolítico', servicePath: '/estetica/corporal/laser-lipolitico'},
                { serviceName: 'Reducción Enzimática de la Celulitis', servicePath: '/estetica/corporal/reduccion-enzimatica' },
                { serviceName: 'Mesoterapia Lipolítica', servicePath: '/estetica/corporal/mesoterapia-lipolitica' },
                { serviceName: 'Ozonoterapia', servicePath: '/estetica/corporal/ozonoterapia' },
                { serviceName: 'TMT Systems - Mesoterapia Virtual', servicePath: '/estetica/corporal/mesoterapia-virtual'},
                { serviceName: 'Velashape', servicePath: '/estetica/corporal/velashape'},
              ]
            },
            {
              name: 'Rejuvenecimiento de las manos',
              imageUrl: '/images/PORTADA EMBELLECIMIENTO MANOS.png',
              services: [
                { serviceName: 'Ácido hialurónico', servicePath: '/estetica/corporal/hialuronico'},
                { serviceName: 'HIFU Corporal', servicePath: '/estetica/corporal/hifu-corporal'},
                { serviceName: 'IPL Eclipse Light', servicePath: '/estetica/corporal/ipl-eclipse'},
                { serviceName: 'Sudaración excesiva', servicePath: '/estetica/corporal/sudoracion-excesiva' },
                { serviceName: 'Láser CO2 Fraccionado', servicePath: '/estetica/corporal/laser-co2'},
                { serviceName: 'Ozonoterapia', servicePath: '/estetica/corporal/ozonoterapia' },
                { serviceName: 'TMT Systems - Mesoterapia Virtual', servicePath: '/estetica/corporal/mesoterapia-virtual'},
                { serviceName: 'Skinbooster Rejuvenecimiento', servicePath: '/estetica/corporal/skinbooster-rejuvenecimiento'},
              ]
            },
            {
              name: 'Remodelación glúteos',
              imageUrl: '/images/GLUTEOS AUMENTO2.png',
              services: [
                { serviceName: 'Aumento de Glúteos', servicePath: '/estetica/corporal/aumento-gluteos'},
                { serviceName: 'Hilos Tensores', servicePath: '/estetica/corporal/hilos-tensores'},
                { serviceName: 'Velashape', servicePath: '/estetica/corporal/velashape'},
                { serviceName: 'EMS Sculpting', servicePath: '/estetica/corporal/emsculpting' },
              ]
            },
            {
              name: 'Eliminar Estrías',
              imageUrl: '/images/PORTADA_ESTRIAS.png',
              services: [
                { serviceName: 'Láser CO2', servicePath: '/estetica/corporal/laserco2'},
                { serviceName: 'Velashape', servicePath: '/estetica/corporal/velashape'},
                { serviceName: 'Plasma Rico en Plaquetas', servicePath: '/estetica/corporal/plasma-plaquetas'},
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
                { serviceName: 'Rinomodelación no quirurgica', servicePath: '/estetica/masculina/rinomodelacion'},
                { serviceName: 'Rinoplastia', servicePath: '/estetica/masculina/rinoplastia'},
              ]
            },
            {
              name: 'Definición Mandibular',
              imageUrl: '/images/MASC-DEFINICIÓN MANDIBULAR PORTADA.png',
              services: [
                { serviceName: 'Ácido Hialurónico', servicePath: '/estetica/facial/hialuronico'},
                { serviceName: 'Mentoplastia', servicePath: '/estetica/masculina/mentoplastia'},
              ]
            },
            {
              name: 'Eliminar Bolsas',
              imageUrl: '/images/MASC-ELIMINAR BOLSAS PORTADA.png',
              services: [
                { serviceName: 'Enzimas PB Serum', servicePath: '/estetica/masculina/pbserum'},
                { serviceName: 'Láser CO2 Fraccionado', servicePath: '/estetica/masculina/laser-co2'},
                { serviceName: 'HIFU', servicePath: '/estetica/masculina/hifu'},
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
                { serviceName: 'Lipopapada Enzimática', servicePath: '/estetica/facial/lipopapada'},
              ]
            },
            {
              name: 'Parpados Caidos',
              imageUrl: '/images/MASC-PARPADO CAIDO PORTADA.jpg',
              services: [
                { serviceName: 'HIFU', servicePath: '/estetica/masculina/hifu'},
                { serviceName: 'Blefaroplastia sin cirugía con láser CO2', servicePath: '/estetica/masculina/blefaroplastia'},
              ]
            },
            {
              name: 'Reducir Volumen Corporal',
              imageUrl: '/images/MASC-REDUCIR VOLUMEN CORPORAL PORTADA.png',
              services: [
                { serviceName: 'HIFU Corporal', servicePath: '/estetica/masculina/hifu-corporal'},
                { serviceName: 'Blefaroplastia sin cirugía con láser CO2', servicePath: '/estetica/masculina/blefaroplastia'},
                { serviceName: 'Mesoterapia Lipolítica', servicePath: '/estetica/masculina/mesoterapia-lipolitica' },
                { serviceName: 'Velashape', servicePath: '/estetica/corporal/velashape'},
              ]
            },
            {
              name: 'Rejuvenecimiento Facial',
              imageUrl: '/images/MASC-REJUVENECIMIENTO FACIAL HIFU.jpg',
              services: [
                { serviceName: 'Coctel de Vitaminas Mesoterapia', servicePath: '/estetica/masculina/mesoterapia-vitaminas'},
                { serviceName: 'Enzimas Recombinantes', servicePath: '/estetica/masculina/enzimas-recombinantes' },
                { serviceName: 'Plasma Rico en Plaquetas', servicePath: '/estetica/masculina/plasma-plaquetas'},
                { serviceName: 'HIFU Lifting sin Cirugía', servicePath: '/estetica/masculina/hifu-lifting'},
              ]
            },
            {
              name: 'Corregir el Acné',
              imageUrl: '/images/MASC-CORREGIR ACNE PORTADA.png',
              services: [
                { serviceName: 'Peeling Químico', servicePath: '/estetica/masculina/peeling' },
                { serviceName: 'IPL Pulsada Intensa', servicePath: '/estetica/masculina/ipl-pulsada'},
                { serviceName: 'Láser', servicePath: '/estetica/masculina/laser' },
                { serviceName: 'Mesoterapia', servicePath: '/estetica/masculina/mesoterapia'},
              ]
            },
            {
              name: 'Trastornos de la Piel',
              imageUrl: '/images/trastornospiel.jpeg',
              services: [
                { serviceName: 'Arañas Vasculares', servicePath: '/estetica/facial/aranas-vasculares'},
                { serviceName: 'Eliminar Verrugas', servicePath: '/estetica/masculina/elimina-verrugas'},
                { serviceName: 'Poros Dilatados', servicePath: '/estetica/masculina/poros-dilatados'},
                { serviceName: 'Puntos de Rubí', servicePath: '/estetica/masculina/puntos-rubi'},
                { serviceName: 'Rosácea', servicePath: '/estetica/masculina/rosacea'},
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
                { serviceName: 'Abdominoplastia', servicePath: '/estetica/cirugias/abdominoplastia'},
                { serviceName: 'Aumento de Glúteos', servicePath: '/estetica/cirugias/aumento-gluteos'},
                { serviceName: 'Lifting de Brazos', servicePath: '/estetica/cirugias/lifting-brazos'},
                { serviceName: 'Lifting de Piernas', servicePath: '/estetica/cirugias/lifting-piernas'},
                { serviceName: 'Lipofilling', servicePath: '/estetica/cirugias/lipofilling'},
                { serviceName: 'Lipolaser', servicePath: '/estetica/cirugias/lipolaser'},
                { serviceName: 'Liposucción', servicePath: '/estetica/cirugias/liposuccion'},
              ]
            },
            {
              name: 'Cirugía Estética Facial',
              imageUrl: '/images/cirugiafacial.jpeg',
              services: [
                { serviceName: 'Rinoplastia', servicePath: '/estetica/cirugias/rinoplastia'},
                { serviceName: 'Bichectomia', servicePath: '/estetica/cirugias/bichectomia'},
                { serviceName: 'Blefaroplastia', servicePath: '/estetica/cirugias/blefaroplastia'},
                { serviceName: 'Lifting de Riesgo', servicePath: '/estetica/cirugias/lifting-riesgo'},
                { serviceName: 'Liting Facial', servicePath: '/estetica/cirugias/lifting-facial'},
                { serviceName: 'Liposucción de Papada', servicePath: '/estetica/cirugias/liposuccion-papada'},
                { serviceName: 'Lobuloplastia', servicePath: '/estetica/cirugias/lobuloplastia'},
                { serviceName: 'Mentoplastia', servicePath: '/estetica/cirugias/mentoplastia'},
                { serviceName: 'Otoplastia', servicePath: '/estetica/cirugias/otoplastia'},
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