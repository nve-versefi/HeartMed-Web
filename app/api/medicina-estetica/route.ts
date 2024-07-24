import React from 'react';
import Link from 'next/link';

async function getMedicinaEsteticaData(): Promise<any> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/medicina-estetica`, { cache: 'no-store' });
  if (!res.ok) {
    throw new Error('Failed to fetch Medicina Estética data');
  }
  return res.json();
}

async function getMedicinaEsteticaDataWithRetry(retries = 3): Promise<any> {
  try {
    return await getMedicinaEsteticaData();
  } catch (error) {
    if (retries > 0) {
      console.log(`Retrying... (${retries} attempts left)`);
      await new Promise(resolve => setTimeout(resolve, 1000)); // Wait for 1 second before retrying
      return getMedicinaEsteticaDataWithRetry(retries - 1);
    } else {
      throw error;
    }
  }
}

export default async function MedicinaEsteticaPage() {
  let data;
  try {
    data = await getMedicinaEsteticaDataWithRetry();
  } catch (error) {
    console.error('Failed to fetch Medicina Estética data:', error);
    return <div>Error loading Medicina Estética data. Please try again later.</div>;
  }

  return (
    <div>
      <h1>Medicina Estética</h1>
      {data.map((item: any) => (
        <div key={item.name}>
          <h2>{item.name}</h2>
          <img src={item.imageUrl} alt={item.name} />
          <ul>
            {item.problems.map((problem: any) => (
              <li key={problem.name}>
                <Link href={`/medicina-estetica/${item.name}/${problem.name}`}>
                  {problem.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}