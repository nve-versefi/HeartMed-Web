import React, { useEffect } from 'react';
import { useCart } from './CartContext';

const CartDropdown: React.FC = () => {
  const { state, dispatch } = useCart();

  useEffect(() => {
    console.log('CartDropdown rendering. Items:', state.items);
    console.log('CartDropdown rendering. Total:', state.total);
  }, [state]);

  return (
    <div className="absolute right-0 mt-2 w-64 bg-white rounded-md shadow-xl z-20 p-4 transition-all duration-300 ease-in-out">
      <h3 className="text-lg font-semibold mb-2">Cart</h3>
      {state.items.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <>
          {state.items.map((item) => (
            <div key={item.id} className="flex justify-between items-center mb-2">
              <span className="truncate">{item.name}</span>
              <div>
                <span className="mr-2">${(item.price * item.quantity).toFixed(2)}</span>
                <button onClick={() => dispatch({ type: 'REMOVE_ITEM', payload: item.id })} className="text-red-500 text-sm">
                  Remove
                </button>
              </div>
            </div>
          ))}
          <div className="mt-4 pt-2 border-t">
            <strong>Total: ${state.total.toFixed(2)}</strong>
          </div>
          <button className="mt-2 bg-blue-500 text-white px-4 py-2 rounded w-full hover:bg-blue-600 transition-colors duration-300">
            Checkout
          </button>
        </>
      )}
    </div>
  );
};

export default CartDropdown;