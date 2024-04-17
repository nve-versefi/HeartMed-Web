import React from 'react';
import { Accordion, AccordionItem, AccordionButton, AccordionPanel, Box, Text } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { FaPlus } from "react-icons/fa";

const MotionBox = motion(Box);

const accordionData = [
  {
    title: 'Duración de los Resultados',
    content: 'Los resultados son permanentes, con la posibilidad de necesitar sesiones adicionales en casos específicos.',
  },
  {
    title: 'Tiempo del Procedimiento',
    content: 'Varía según el caso, pero en general, se completa en aproximadamente media hora.',
  },
  {
    title: 'Reposo Posterior',
    content: 'No es necesario, puedes retomar tus actividades normales de inmediato, con recomendaciones mínimas para las primeras horas posteriores al tratamiento.',
  },
  
  {
    title: 'Exámenes de Laboratorio',
    content: 'Los resultados son permanentes, con la posibilidad de necesitar sesiones adicionales en casos específicos.',
  },
  {
    title: 'Compatibilidad con Medicamentos',
    content: 'No hay problemas, excepto con ciertos medicamentos específicos.',
  },
  {
    title: 'Aplicabilidad en Diferentes Casos',
    content: 'Podemos resolver el 85% de las situaciones estéticas que se presentan, siempre bajo la evaluación de nuestro especialista.',
  },
  {
    title: 'Edad para el Procedimiento',
    content: 'A partir de los 15 o 16 años, con la autorización de los padres.',
  },
  {
    title: 'Sin Límite de Edad',
    content: 'Nuestro procedimiento puede aplicarse a cualquier edad, brindando resultados satisfactorios.',
  },
  {
    title: '¿Listo para transformar tu nariz sin cirugía?',
    content: '¡Contáctanos hoy mismo para programar tu consulta y descubre cómo podemos ayudarte a lograr la nariz de tus sueños de manera segura y efectiva en HeartMed!',
  },
];

const AccordionComponent = () => (
  <div  className='mx-64' > 
    <h2 className='text-center font-bold text-4xl text-thunderbird-500'>Preguntas Frecuentes</h2>
    <Accordion defaultIndex={[]} allowMultiple>
      {accordionData.map((item, index) => (
        <AccordionItem key={index}>
          {({ isExpanded }: { isExpanded: boolean }) => (
            <>
              <h2>
                <AccordionButton>
                  <Box flex="1" textAlign="left">
                    <Text className='text-pomegranate-400 font-bold text-3xl'>
                      {item.title}
                    </Text>
                  </Box>
                  <MotionBox animate={{ rotate: isExpanded ? -135 : 0 }} transition={{ duration: 0.2 }}>
                    <Box as="span">
                      <FaPlus className='w-8 h-8 text-2xl text-pomegranate-400 mb-8' />
                    </Box>
                  </MotionBox>
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>
                <Box>
                  <Text fontSize="lg" color="gray.600">
                    {item.content}
                  </Text>
                </Box>
              </AccordionPanel>
            </>
          )}
        </AccordionItem>
      ))}
    </Accordion>
  </div>
);

export default AccordionComponent;