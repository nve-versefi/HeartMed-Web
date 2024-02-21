'use client'
import React, { useState, useEffect } from 'react';

export default function SectionBreak() {
  const [offsetY, setOffsetY] = useState(0);
  const handleScroll = () => setOffsetY(window.pageYOffset);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="parallax-container">
      <img 
        src="path-to-your-image.jpg" 
        className="parallax-image" 
        style={{ transform: `translateY(${offsetY * 0.5}px)` }}
        alt="Section Break"
      />
    </div>
  );
}

