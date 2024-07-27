// components/ui/StickyIconsWrapper.tsx
"use client";

import React from 'react';
import StickyIcons from './StickyIcons';
import { usePathname } from 'next/navigation';

const StickyIconsWrapper: React.FC = () => {
  const pathname = usePathname();

  if (pathname === '/admin') {
    return null;
  }

  return <StickyIcons />;
};

export default StickyIconsWrapper;
