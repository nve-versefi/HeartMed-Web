'use client'
import React from 'react';
import Link from 'next/link';
import DefaultLayout from '@/app/(default)/layout';
import Head from 'next/head';

interface Service {
  serviceName: string;
  servicePath: string;
}

interface Problem {
  name: string;
  imageUrl: string;
  services: Service[];
}

interface SubmenuItem {
  name: string;
  path?: string;
  imagePath?: string;
  problems?: Problem[];
}

interface TestEpigeneticoPageProps {
  initialData?: SubmenuItem[];
}

const TestEpigeneticoPage: React.FC<TestEpigeneticoPageProps> = ({ initialData }) => {
  const [testEpigenetico, setTestEpigenetico] = React.useState<SubmenuItem[]>(initialData || []);
  const [loading, setLoading] = React.useState(!initialData);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (!initialData) {
      const fetchTestEpigenetico = async (retries = 3) => {
        try {
          setLoading(true);
          const response = await fetch('/api/test-epigenetico');
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          const data = await response.json();
          if (data.error) {
            throw new Error(data.error);
          }
          setTestEpigenetico(data[0].submenu ? [data[0].submenu] : []);
          setError(null);
        } catch (err) {
          if (retries > 0) {
            setTimeout(() => fetchTestEpigenetico(retries - 1), 500);
          } else {
            setError('Error fetching Test Epigenético data. Please try again later.');
          }
        } finally {
          setLoading(false);
        }
      };

      fetchTestEpigenetico();
    }
  }, [initialData]);

  const groupProblems = (problems: Problem[]) => {
    // Sort problems by number of services
    const sortedProblems = [...problems].sort((a, b) => b.services.length - a.services.length);
    
    const pairs: Problem[][] = [];
    let i = 0;

    while (i < sortedProblems.length) {
      if (i + 1 < sortedProblems.length) {
        // If the difference in service count is too large, try to find a better match
        if (sortedProblems[i].services.length - sortedProblems[i+1].services.length > 3) {
          let bestMatchIndex = i + 1;
          for (let j = i + 2; j < sortedProblems.length; j++) {
            if (Math.abs(sortedProblems[i].services.length - sortedProblems[j].services.length) < 
                Math.abs(sortedProblems[i].services.length - sortedProblems[bestMatchIndex].services.length)) {
              bestMatchIndex = j;
            }
          }
          pairs.push([sortedProblems[i], sortedProblems[bestMatchIndex]]);
          sortedProblems.splice(bestMatchIndex, 1);
        } else {
          pairs.push([sortedProblems[i], sortedProblems[i+1]]);
          i++;
        }
      } else {
        pairs.push([sortedProblems[i]]);
      }
      i++;
    }

    return pairs;
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!testEpigenetico || testEpigenetico.length === 0) return <div>No Test Epigenético data found.</div>;

  return (
    <DefaultLayout>
      <Head>
        <title>Test Epigenético - HeartMed</title>
        <meta name="description" content="Explora nuestros servicios de Test Epigenético para una medicina personalizada." />
        <meta property="og:title" content="Test Epigenético - HeartMed" />
        <meta property="og:description" content="Explora nuestros servicios de Test Epigenético para una medicina personalizada." />
        <meta property="og:type" content="website"/>
        <meta property="og:url" content="https://heart-med.vercel.app/test-epigenetico" />
        <link rel="canonical" href="https://heart-med.vercel.app/test-epigenetico" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "http://schema.org",
            "@type": "MedicalTest",
            "name": "Test Epigenético",
            "description": "Servicios de Test Epigenético para una medicina personalizada y preventiva.",
            "usesDevice": {
              "@type": "MedicalDevice",
              "name": "Equipo de análisis epigenético"
            },
            "medicineSystem": "https://health-lifesci.schema.org/WesternMedicine",
            "relevantSpecialty": "https://health-lifesci.schema.org/Genetics",
            "provider": {
              "@type": "MedicalOrganization",
              "name": "Heart Med",
              "url": "https://heart-med.vercel.app"
            },
            "url": "https://heart-med.vercel.app/test-epigenetico"
          })}
        </script>
      </Head>
      <div className="estetica-menu mx-24">
        <div id="tratamientos" className="submenu-grid grid grid-cols-1 gap-8">
          {testEpigenetico.map((submenuItem, index) => (
            <div key={index} className="submenu-item">
              <div className="block submenu-item">
                <a href={submenuItem.path || '#'} className="group">
                  <div className="banner-container">
                    <div className="w-screen h-64 overflow-hidden relative">
                      <img
                        src={submenuItem.imagePath || '/mnt/data/image.png'}
                        alt={submenuItem.name}
                        className="object-cover h-full w-full absolute top-0 left-0"
                      />
                      <div className="w-screen h-64 flex items-center justify-center absolute top-0 left-0 bg-black bg-opacity-50 group-hover:bg-opacity-0 transition duration-300">
                        <h1 className="text-3xl font-bold text-white mb-4">{submenuItem.name}</h1>
                      </div>
                    </div>
                  </div>
                </a>
              </div>
              <div className="problems-grid space-y-8">
                {groupProblems(submenuItem.problems || []).map((pair, pairIndex) => (
                  <div key={pairIndex} className={`grid ${pair.length === 2 ? 'grid-cols-2' : 'grid-cols-1'} gap-8`}>
                    {pair.map((problem, problemIndex) => (
                      <div key={problemIndex} className={`problem-item ${pair.length === 1 ? 'mx-auto' : ''}`}>
                        <h3 className="text-3xl text-thunderbird-500 text-center font-bold mb-2">{problem.name}</h3>
                        <img src={problem.imageUrl} alt={problem.name} className="mb-4 w-full h-80 object-cover object-center" />
                        <div className="services-grid grid grid-cols-2 gap-4">
                          {problem.services.map((service, serviceIndex) => (
                            <Link key={serviceIndex} href={service.servicePath}>
                              <button className="bg-woodsmoke-300 hover:bg-thunderbird-500 text-white font-semibold py-2 px-4 rounded w-full">
                                {service.serviceName}
                              </button>
                            </Link>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </DefaultLayout>
  );
};

export default TestEpigeneticoPage;