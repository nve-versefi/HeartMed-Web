'use client'
import React from 'react';
import { Accordion, AccordionItem, AccordionButton, AccordionPanel, Box, Text } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { FaPlus } from 'react-icons/fa';
import { ServiceData } from '@/app/[subcategory]/[problem]/[service]/page';

const MotionBox = motion(Box);

interface AccordionComponentProps {
  serviceData: ServiceData;
}

const AccordionComponent: React.FC<AccordionComponentProps> = ({ serviceData }) => {
  const faqEntries = Object.entries(serviceData)
    .filter(([key, value]) => key.startsWith('faq') && value)
    .map(([key, question]) => {
      const answerKey = `answer${key.slice(3)}` as keyof ServiceData;
      const answer = serviceData[answerKey];
      return { title: question as string, content: answer as string };
    })
    .filter(entry => entry.title && entry.content);

  if (faqEntries.length === 0) {
    return null; // Return null if there are no FAQs
  }

  return (
    <div className="mx-32">
      <h2 className="text-center font-bold text-4xl text-thunderbird-500">Preguntas Frecuentes</h2>
      <Accordion defaultIndex={[]} allowMultiple>
        {faqEntries.map((item, index) => (
          <AccordionItem key={index}>
            {({ isExpanded }: { isExpanded: boolean }) => (
              <>
                <h2>
                  <AccordionButton>
                    <Box flex="1" textAlign="left">
                      <Text className="text-pomegranate-400 font-bold text-3xl">
                        {item.title}
                      </Text>
                    </Box>
                    <MotionBox animate={{ rotate: isExpanded ? -135 : 0 }} transition={{ duration: 0.2 }}>
                      <Box as="span">
                        <FaPlus className="w-8 h-8 text-2xl text-pomegranate-400 mb-8" />
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
};

export default AccordionComponent;