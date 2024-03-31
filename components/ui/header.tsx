'use client'
import React, { useState } from 'react';
import menuData from '@/components/menudata';
import { MenuItem, SubMenuItem } from '@/components/menudata.types';

// Navbar component
const Navbar = () => {
  return (
    <div className="bg-gray-100 shadow-md">
      {/* Flex container for all items */}
      <div className="flex justify-between items-center">
        {/* Invisible spacer to balance the flex space on the left */}
        <div className="flex-1"></div>
        
        {/* Logo centered in the middle column */}
        <div className="flex-initial">
          <img src="/images/logo.png" alt="Logo" className="h-16 w-auto" /> {/* Adjust size as needed */}
        </div>

        {/* Right-aligned "Sobre Nosotros" and Cart Icon in the right column */}
        <div className="flex-1 flex justify-end items-center">
          <a href="/nosotros" className="text-lg mr-8 text-woodsmoke-700 font-medium hover:underline mr-6">Sobre Nosotros</a>
          <a href="/carrito" className="mx-12 text-lg text-woodsmoke-700 font-medium hover:underline">
            <img src="/images/cart.png" alt="Carrito" className="h-8 w-auto" /> {/* Cart icon size adjustable */}
          </a>
        </div>
      </div>
      
      {/* Navigation Items */}
      <nav className="flex justify-center p-2">
        <ul className="flex space-x-24">
          {menuData.map((item) => (
            <NavItem key={item.id} item={item} />
          ))}
        </ul>
      </nav>
    </div>
  );
};

// Navigation Item component, including the Dropdown
const NavItem = ({ item }: { item: MenuItem }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <li
      className="relative group p-2 rounded-md"
      onMouseOver={() => setIsHovered(true)}
      onMouseOut={() => setIsHovered(false)}
    >
      <button className="text-xl font-semibold text-woodsmoke-700 hover:bg-gray-200">
        {item.title}
      </button>
      {isHovered && item.submenu && item.submenu.length > 0 && (
        <Dropdown items={item.submenu} />
      )}
    </li>
  );
};

// Dropdown component adjusted for full viewport width
// Dropdown component adjusted for full viewport width and fixed positioning
const Dropdown = ({ items }: { items: SubMenuItem[] }) => {
  return (
    <div
      className="fixed mt-2 inset-x-0 bg-white shadow-md rounded-md z-10"
    >
      <div className="flex justify-center items-center w-full h-auto">
        {items.map((subItem, index) => (
          <a
            key={index}
            href={subItem.path}
            className="flex flex-col items-center justify-center p-4 hover:bg-gray-50"
            style={{ flex: "1" }}
          >
            <img src={subItem.imageUrl} alt={subItem.name} className="w-16 h-16 object-cover" />
            <span className="mt-2 text-md text-woodsmoke-500">{subItem.name}</span>
          </a>
        ))}
      </div>
    </div>
  );
};


export default Navbar;