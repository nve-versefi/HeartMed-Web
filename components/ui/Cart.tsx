// components/ui/Cart.tsx
import React, { useEffect, useState, useRef } from 'react';
import { useCart } from './CartContext';

const CartDropdown: React.FC = () => {
  const { state, dispatch } = useCart();
  const [isMounted, setIsMounted] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsMounted(true);
    //console.log('CartDropdown rendering. Items:', state.items);
    //console.log('CartDropdown rendering. Total:', state.total);
  }, [state]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        //console.log('Clicked outside the cart dropdown');
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleCheckout = () => {
    if (typeof window !== 'undefined') {
      window.location.href = '/pagos';
    }
  };

  if (!isMounted) {
    return null;
  }

  return (
    <div ref={dropdownRef} className="absolute right-0 mt-2 w-64 bg-white rounded-md shadow-xl z-20 p-4 transition-all duration-300 ease-in-out">
      <h3 className="text-lg font-semibold mb-2">Carrito</h3>
      {state.items.length === 0 ? (
        <p>Tu carrito está vacío</p>
      ) : (
        <>
          {state.items.map((item) => (
            <div key={item.id} className="flex justify-between items-center mb-2">
              <span className="truncate">{item.name} (x{item.quantity})</span>
              <div>
                <span className="mr-2">€{(item.price * item.quantity).toFixed(2)}</span>
                <button 
                  onClick={() => dispatch({ type: 'REMOVE_ITEM', payload: item.id })}
                  className="text-red-500 text-sm hover:text-red-700"
                >
                  Eliminar
                </button>
              </div>
            </div>
          ))}
          <div className="mt-4 pt-2 border-t">
            <strong>Total: €{state.total.toFixed(2)}</strong>
          </div>
          <button 
            onClick={handleCheckout}
            className="mt-2 bg-blue-500 text-white px-4 py-2 rounded w-full hover:bg-blue-600 transition-colors duration-300"
          >
            Proceder al pago
          </button>
        </>
      )}
    </div>
  );
};

export default CartDropdown;