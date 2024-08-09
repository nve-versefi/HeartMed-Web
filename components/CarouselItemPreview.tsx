import React from 'react';
import { Carousel } from 'antd';

interface CarouselItemPreviewProps {
  item: {
    imageUrl: string;
    title: string;
    buttonText: string;
  };
}

const CarouselItemPreview: React.FC<CarouselItemPreviewProps> = ({ item }) => {
  return (
    <div className="w-full max-w-xl mx-auto">
      <h3 className="text-lg font-semibold mb-2">Preview</h3>
      <Carousel autoplay>
        <div>
          <div
            style={{
              height: '200px',
              backgroundImage: `url("${item.imageUrl}")`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
            className="relative"
          >
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
              <h2 className="text-woodsmoke-600 font-bold text-xl mb-2">
                {item.title}
              </h2>
              <button className="bg-pomegranate-600 hover:bg-pomegranate-500 shadow text-sm text-white font-bold py-1 px-2 rounded">
                {item.buttonText}
              </button>
            </div>
          </div>
        </div>
      </Carousel>
    </div>
  );
};

export default CarouselItemPreview;