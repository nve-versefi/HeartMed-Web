'use client'
import React, { useState } from 'react';
import menuData from '@/components/menudata'; // Adjust the path to where your menuData is located

// Navbar component
const Navbar = () => {
  return (
    <nav className="bg-gray-100 p-4 shadow-md">
      <ul className="flex justify-between items-center">
        {menuData.map((item) => (
          <NavItem key={item.id} item={item} />
        ))}
      </ul>
    </nav>
  );
};

// Navigation Item component, including the Dropdown
const NavItem = ({ item }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <li
      className="relative group p-2 rounded-md"
      onMouseOver={() => setIsHovered(true)}
      onMouseOut={() => setIsHovered(false)}
    >
      <button className="text-lg text-woodsmoke-700 font-medium hover:bg-gray-200">
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
const Dropdown = ({ items }) => {
  return (
    <div
      className="fixed inset-x-0 bg-white shadow-md rounded-md z-10"
    >
      <div className="flex justify-center items-center w-full h-auto">
        {items.map((subItem, index) => (
          <a
            key={index}
            href="#"
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