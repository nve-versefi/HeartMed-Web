import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { MenuItem, SubMenuItem } from '@/components/menudata.types';
import SearchBar from '../SearchBar';
import { useCart } from './CartContext';
import { FaShoppingCart } from 'react-icons/fa';
import CartDropdown from './Cart';

interface ClientHeaderProps {
  initialMenuData: MenuItem[];
}

const ClientHeader: React.FC<ClientHeaderProps> = ({ initialMenuData }) => {
  const { state } = useCart();
  const [isCartHovered, setIsCartHovered] = useState(false);
  const [menuData, setMenuData] = useState<MenuItem[]>(initialMenuData);

  return (
    <div className="bg-gray-100 shadow-md">
      <div className="flex justify-between items-center p-2">
        <div className="flex-1 flex justify-start items-center">
          <div className="pl-32">
            <SearchBar />
          </div>
        </div>
        <div className="flex-initial">
          <div style={{ width: '180px', height: '64px', position: 'relative' }}>
            <Image 
              src="/images/logo.png" 
              alt="Heart Med Logo" 
              layout="fill"
              objectFit="contain"
              quality={100}
              priority
            />
          </div>
        </div>
        <div className="flex-1 flex justify-end items-center">
          <div 
            className="mx-12 relative"
            onMouseEnter={() => setIsCartHovered(true)}
            onMouseLeave={() => setIsCartHovered(false)}
          >
            <FaShoppingCart 
              className={`text-3xl text-thunderbird-400 transition-transform duration-300 ${isCartHovered ? 'transform scale-110' : ''}`}
            />
            {state.items.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                {state.items.length}
              </span>
            )}
            {isCartHovered && <CartDropdown />}
          </div>
        </div>
      </div>
      
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

const NavItem = ({ item }: { item: MenuItem }) => {
  const [isHovered, setIsHovered] = React.useState(false);

  return (
    <li
      className="relative group p-2 rounded-md"
      onMouseOver={() => setIsHovered(true)}
      onMouseOut={() => setIsHovered(false)}
    >
      <a href={item.path}>
        <button className="text-xl font-semibold text-woodsmoke-700 hover:bg-gray-200">
          {item.title}
        </button>
      </a>
      {isHovered && item.submenu && item.submenu.length > 0 && (
        <Dropdown items={item.submenu} />
      )}
    </li>
  );
};

const Dropdown = ({ items }: { items: SubMenuItem[] }) => {
  return (
    <div className="fixed mt-2 inset-x-0 bg-white shadow-md rounded-md z-10">
      <div className="flex justify-center items-center w-full h-auto">
        {items.map((subItem, index) => (
          <a
            key={index}
            href={subItem.path}
            className="flex flex-col items-center justify-center flex-1"
          >
            <div className="w-full h-32 flex flex-col hover:bg-thunderbird-300">
              <div className="w-full h-full relative overflow-hidden flex-grow hover:bg-thunderbird-300">
                <Image
                  src={subItem.imagePath}
                  alt={subItem.name}
                  layout="fill"
                  objectFit="cover"
                />
              </div>
              <div className="w-full bg-gray-100 shadow-md p-2 text-center hover:bg-thunderbird-300">
                <span className="text-md text-woodsmoke-500 hover:text-white">{subItem.name}</span>
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};

export default ClientHeader;