'use client'
import React, { useState, useEffect } from 'react';
import { Carousel } from 'antd';
import Link from 'next/link';

interface CarouselItem {
  _id: string;
  imageUrl: string;
  title: string;
  buttonText: string;
  link?: string;
}

const fetchWithRetries = async (url: string, retries: number = 3, backoff: number = 1000): Promise<any> => {
  for (let i = 0; i < retries; i++) {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      if (error instanceof Error) {
        console.error(`Attempt ${i + 1} failed: ${error.message}`);
      } else {
        console.error(`Attempt ${i + 1} failed: ${String(error)}`);
      }
      if (i < retries - 1) {
        await new Promise(resolve => setTimeout(resolve, backoff * Math.pow(2, i)));
      } else {
        throw error;
      }
    }
  }
};

const AutoCarousel: React.FC = () => {
  const [carouselItems, setCarouselItems] = useState<CarouselItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadCarouselItems = async () => {
      try {
        const data = await fetchWithRetries('/api/carousel');
        if (Array.isArray(data)) {
          setCarouselItems(data);
        } else if (typeof data === 'object' && data !== null) {
          setCarouselItems([data]);
        } else {
          throw new Error('Invalid data format received from API');
        }
        setError(null);
      } catch (error) {
        if (error instanceof Error) {
          console.error('Error fetching carousel data:', error.message);
          setError(error.message);
        } else {
          console.error('An unexpected error occurred:', String(error));
          setError('An unexpected error occurred');
        }
      } finally {
        setIsLoading(false);
      }
    };

    if (carouselItems.length === 0 && !error) {
      loadCarouselItems();
    }
  }, [carouselItems, error]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (carouselItems.length === 0) {
    return <div>No carousel items available.</div>;
  }

  return (
    <Carousel effect="fade" autoplay>
      {carouselItems.map((item) => (
        <div key={item._id}>
          <div
            style={{
              height: '400px',
              backgroundImage: `url("${item.imageUrl}")`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
            className="relative flex items-center justify-center"
          >
            <div className="absolute inset-0 bg-black bg-opacity-50" />  
            <div className="relative text-center z-10">
              <h2 className="text-white font-bold text-3xl mb-4">
                {item.title}
              </h2>
              {item.link ? (
                <Link href={item.link}>
                  <span className="bg-pomegranate-600 hover:bg-pomegranate-500 shadow text-xl text-white font-bold py-2 px-4 rounded transition duration-300">
                    {item.buttonText}
                  </span>
                </Link>
              ) : (
                <button className="bg-pomegranate-600 hover:bg-pomegranate-500 shadow text-xl text-white font-bold py-2 px-4 rounded transition duration-300">
                  {item.buttonText}
                </button>
              )}
            </div>
          </div>
        </div>
      ))}
    </Carousel>
  );
};

export default AutoCarousel;
