'use client';

import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';

type CartItem = {
  id: string;
  name: string;
  price: number;
  quantity: number;
};

type CartState = {
  items: CartItem[];
  total: number;
};

type CartAction =
  | { type: 'ADD_ITEM'; payload: CartItem }
  | { type: 'REMOVE_ITEM'; payload: string }
  | { type: 'CLEAR_CART' };

type CartContextType = {
  state: CartState;
  dispatch: React.Dispatch<CartAction>;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

function cartReducer(state: CartState, action: CartAction): CartState {
    console.log('Cart reducer called with action:', action.type, 'and payload:', 'payload' in action ? action.payload : 'No payload');
    console.log('Current state before update:', state);
  
    let newState: CartState;
    switch (action.type) {
      case 'ADD_ITEM':
        const existingItemIndex = state.items.findIndex(item => item.id === action.payload.id);
        if (existingItemIndex > -1) {
          const newItems = [...state.items];
          newItems[existingItemIndex].quantity += 1;
          newState = {
            ...state,
            items: newItems,
            total: state.total + action.payload.price
          };
        } else {
          newState = {
            ...state,
            items: [...state.items, { ...action.payload, quantity: 1 }],
            total: state.total + action.payload.price
          };
        }
        break;
      case 'REMOVE_ITEM':
        const updatedItems = state.items.filter(item => item.id !== action.payload);
        newState = {
          ...state,
          items: updatedItems,
          total: updatedItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
        };
        break;
        case 'CLEAR_CART':
            newState = { items: [], total: 0 };
            break;
          default:
            newState = state;
    }
  
    console.log('New state after update:', newState);
    return newState;
  }

  export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [state, dispatch] = useReducer(cartReducer, { items: [], total: 0 });
  
    useEffect(() => {
      console.log('Cart state updated in provider:', state);
    }, [state]);
  
    return (
      <CartContext.Provider value={{ state, dispatch }}>
        {children}
      </CartContext.Provider>
    );
  };
  
  export const useCart = () => {
    const context = useContext(CartContext);
    if (context === undefined) {
      throw new Error('useCart must be used within a CartProvider');
    }
    return context;
  };