import React from 'react';
import { Accordion, AccordionItem, AccordionButton, AccordionPanel, Box, Text } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { FaPlus } from "react-icons/fa";

const MotionBox = motion(Box);

const accordionData = [
  {
    title: 'Section 1',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  },
  {
    title: 'Section 2',
    content: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
  },
  {
    title: 'Section 3',
    content: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
  },
];

const AccordionComponent = () => (
  <div>
    <h2 className='text-center font-bold text-4xl text-thunderbird-500'>Preguntas Frecuentes</h2>
    <Accordion defaultIndex={[]} allowMultiple>
      {accordionData.map((item, index) => (
        <AccordionItem key={index}>
          {({ isExpanded }: { isExpanded: boolean }) => (
            <>
              <h2>
                <AccordionButton>
                  <Box flex="1" textAlign="left">
                    <Text className='text-pomegranate-400 font-bold text-2xl'>
                      {item.title}
                    </Text>
                  </Box>
                  <MotionBox animate={{ rotate: isExpanded ? -135 : 0 }} transition={{ duration: 0.2 }}>
                    <Box as="span">
                      <FaPlus className='w-8 h-8 text-pomegranate-400 mb-8' />
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