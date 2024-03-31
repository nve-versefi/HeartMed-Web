import React, { useEffect, useRef, useState } from 'react';

const logoUrls = [
  '/images/indiba.jpg',
  '/images/uthera.jpg',
  '/images/allergan.png',
  '/images/syneron.png',
  '/images/cynosure.jpg',

];

const logoStyles = [
    { maxWidth: '170px', height: 'auto' }, 
    { maxWidth: '175px', height: 'auto' }, 
    { maxWidth: '130px', height: 'auto' }, 
    { maxWidth: '130px', height: 'auto' }, 
    { maxWidth: '270px', height: 'auto' }, 
]
const imageMargin = '150px';
const defaultStyle = { maxWidth: '170px', height: 'auto', marginRight: imageMargin, marginLeft: imageMargin };


const TechStack: React.FC = () => {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState(0);
  const [dragStartX, setDragStartX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const dragOffsetRef = useRef(0);
  const autoMoveRef = useRef<NodeJS.Timeout | null>(null);

const calculateTotalWidth = () => logoStyles.reduce((acc, style) => acc + parseInt(style.maxWidth, 10) + 2 * parseInt(imageMargin, 10), 0) * logoUrls.length * 3; // Example: 3 times repetition

const startAutoMove = () => {
  if (autoMoveRef.current) clearInterval(autoMoveRef.current);
  autoMoveRef.current = setInterval(() => {
    setOffset((prevOffset) => {
      let newOffset = prevOffset - 1;
      
      if (Math.abs(newOffset) >= calculateTotalWidth() / 3) newOffset = 0; 
      return newOffset;
    });
  }, 10);
};

  const stopAutoMove = () => {
    if (autoMoveRef.current) {
      clearInterval(autoMoveRef.current);
      autoMoveRef.current = null;
    }
  };

  const handleDragStart = (event: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
    stopAutoMove();
    setIsDragging(true);
    const clientX = event.type.includes('mouse') ? (event as React.MouseEvent).clientX : (event as React.TouchEvent).touches[0].clientX;
    setDragStartX(clientX);
    dragOffsetRef.current = offset; 
    event.preventDefault();
  };

  const handleDragging = (clientX: number) => {
    if (!isDragging) return;
    const dragOffset = clientX - dragStartX;
    setOffset(dragOffsetRef.current + dragOffset); 
  };

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => handleDragging(event.clientX);
    const handleTouchMove = (event: TouchEvent) => handleDragging(event.touches[0].clientX);

    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('touchmove', handleTouchMove);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('touchmove', handleTouchMove);
    };
  }, [isDragging, dragStartX]);

  useEffect(() => {
    const handleMouseUp = () => {
      if (isDragging) {
        setIsDragging(false);
        setTimeout(startAutoMove, 5000); 
      }
    };
    const handleTouchEnd = () => {
      if (isDragging) {
        setIsDragging(false);
        setTimeout(startAutoMove, 5000); 
      }
    };

    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('touchend', handleTouchEnd);

    return () => {
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('touchend', handleTouchEnd);
    };
  }, [isDragging]);

  useEffect(() => {
    startAutoMove(); 

    return () => stopAutoMove();
  }, []);

  return (
    <div className="text-center px-4 mb-5">
        <h2 className="text-3xl font-bold text-blueribbon-500 mb-2">Nos mantenemos siempre a la vanguardia.</h2>
        <p className="mb-4 mt-4 text-xl mx-12 text-aztec-700 font-medium">
        Nos enorgullece contar con un amplio portfolio de marcas y certificaciones a la disposición del cliente para garantizar los mejores resultados.
        </p>
        <div
            className="carousel-container relative mt-8"
            style={{ overflow: 'hidden', width: '100%', height: '150px', cursor: isDragging ? 'grabbing' : 'grab' }}
            onMouseDown={handleDragStart as any}
            onTouchStart={handleDragStart as any}
        >
            <div
        ref={carouselRef}
        className="flex"
        style={{
            width: `${calculateTotalWidth()}px`,
            transform: `translateX(${offset}px)`,
            transition: isDragging ? 'none' : 'transform 0.2s ease-out',
            height: '150px',
        }}
        >
        {Array(5).fill(logoUrls).flat().map((logoUrl, index) => {
            const itemStyle = { 
            maxWidth: '100%', 
            height: 'auto',
            marginRight: '120px',
            marginLeft: '120px',
            };
            return <img key={index} src={logoUrl} alt={`Logo ${index}`} style={itemStyle} />;
        })}
        </div>
            <div style={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: 0,
            width: '300px',
            background: 'linear-gradient(to right, #fcf8f2, transparent)',
            zIndex: 2,
            pointerEvents: 'none',
            }}></div>
            <div style={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            right: 0,
            width: '300px',
            background: 'linear-gradient(to left, #fcf8f2, transparent)',
            zIndex: 2,
            pointerEvents: 'none',
            }}></div>
        </div>
    </div>
  );
};

export default TechStack;