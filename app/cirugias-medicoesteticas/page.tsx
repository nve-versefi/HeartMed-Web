'use client'
import React from 'react';
import Link from 'next/link';
import DefaultLayout from '@/app/(default)/layout';

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

const CirugiasMedicoesteticasPage: React.FC = () => {
  const [cirugiasMedicoesteticas, setCirugiasMedicoesteticas] = React.useState<SubmenuItem[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    const fetchCirugiasMedicoesteticas = async (retries = 3) => {
      try {
        setLoading(true);
        const response = await fetch('/api/cirugias-medicoesteticas');
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        if (data.error) {
          throw new Error(data.error);
        }
        setCirugiasMedicoesteticas(data[0].submenu ? [data[0].submenu] : []);
        setError(null);
      } catch (err) {
        if (retries > 0) {
          setTimeout(() => fetchCirugiasMedicoesteticas(retries - 1), 500);
        } else {
          setError('Error fetching Cirugías Medicoestéticas data. Please try again later.');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchCirugiasMedicoesteticas();
  }, []);

  const groupProblems = (problems: Problem[]) => {
    const sortedProblems = [...problems].sort((a, b) => b.services.length - a.services.length);
    
    const pairs: Problem[][] = [];
    for (let i = 0; i < sortedProblems.length; i += 2) {
      if (i + 1 < sortedProblems.length) {
        pairs.push([sortedProblems[i], sortedProblems[i + 1]]);
      } else {
        pairs.push([sortedProblems[i]]);
      }
    }

    return pairs;
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!cirugiasMedicoesteticas || cirugiasMedicoesteticas.length === 0) return <div>No Cirugías Medicoestéticas data found.</div>;

  return (
    <DefaultLayout>
      <div className="estetica-menu mx-24">
        <div id="tratamientos" className="submenu-grid grid grid-cols-1 gap-8">
          {cirugiasMedicoesteticas.map((submenuItem, index) => (
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
                  <div key={pairIndex} className={`grid gap-8 ${pair.length === 2 ? 'grid-cols-2' : 'grid-cols-1'}`}>
                    {pair.map((problem, problemIndex) => (
                      <div key={problemIndex} className={`problem-item w-full ${pair.length === 1 ? 'mx-auto max-w-[50%]' : ''}`}>
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

export default CirugiasMedicoesteticasPage;