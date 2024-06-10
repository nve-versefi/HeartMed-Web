import React from 'react';
import { Accordion, AccordionItem, AccordionButton, AccordionPanel, Box, Text } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { FaPlus } from 'react-icons/fa';

const MotionBox = motion(Box);

interface Service {
  id: number;
  title: string;
  image1: string;
  what: string;
  anesthesia: string;
  time: string;
  finance: string;
  how: string;
  area: string;
  objective1: string;
  objective2: string;
  extra?: string;
  image2?: string;
  image3?: string;
  faq1: string;
  answer1: string;
  faq2: string;
  answer2: string;
  faq3: string;
  answer3: string;
  faq4: string;
  answer4: string;
  faq5: string;
  answer5: string;
  faq6: string;
  answer6: string;
  faq7: string;
  answer7: string;
  faq8: string;
  answer8: string;
  faq9: string;
  answer9: string;
  category:string;
  subcategory:string;
  targetAreas?: string[];
  objectives?: string[];
  relatedProd?: string[];
}

interface AccordionComponentProps {
  serviceData: Service | null;
}

const AccordionComponent: React.FC<AccordionComponentProps> = ({ serviceData }) => {
  if (!serviceData) {
    return <div>No FAQ data available.</div>;
  }

  const faqEntries = Object.keys(serviceData)
    .filter(key => key.startsWith('faq'))
    .map((faqKey, index) => ({
      title: serviceData[faqKey as keyof Service],
      content: serviceData[`answer${index + 1}` as keyof Service],
    }))
    .filter(faq => faq.title && faq.content); // Filter out any empty FAQ entries

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
