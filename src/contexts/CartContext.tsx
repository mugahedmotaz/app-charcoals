import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { CartContextType, CartItem, BurgerItem, BurgerExtra } from '../types/database';

const CartContext = createContext<CartContextType | undefined>(undefined);

type CartAction =
  | { type: 'ADD_ITEM'; payload: { product: BurgerItem; meatType: 'beef' | 'chicken'; extras: BurgerExtra[]; quantity?: number } }
  | { type: 'REMOVE_ITEM'; payload: string }
  | { type: 'UPDATE_QUANTITY'; payload: { id: string; quantity: number } }
  | { type: 'CLEAR_CART' };

interface CartState {
  items: CartItem[];
}

// دالة لإنشاء مفتاح فريد للمنتج بناءً على المنتج والإضافات
const createItemKey = (product: BurgerItem, meatType: 'beef' | 'chicken', extras: BurgerExtra[]): string => {
  const extrasIds = extras.map(extra => extra.id).sort().join(',');
  return `${product.id}-${meatType}-${extrasIds}`;
};

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'ADD_ITEM':
      const { product, meatType, extras, quantity = 1 } = action.payload;
      const extrasPrice = extras.reduce((sum, extra) => sum + extra.price, 0);
      const basePrice = meatType === 'beef' ? product.beef_price : product.chicken_price;
      const totalPrice = basePrice + extrasPrice;
      const itemKey = createItemKey(product, meatType, extras);
      
      // البحث عن منتج مشابه موجود في السلة
      const existingItemIndex = state.items.findIndex(item => {
        const existingKey = createItemKey(item.product, item.meat_type, item.selectedExtras);
        return existingKey === itemKey;
      });
      
      if (existingItemIndex !== -1) {
        // إذا كان المنتج موجود، زيادة الكمية
        return {
          ...state,
          items: state.items.map((item, index) =>
            index === existingItemIndex
              ? { ...item, quantity: item.quantity + quantity }
              : item
          )
        };
      } else {
        // إذا لم يكن موجود، إضافة منتج جديد
        const newItem: CartItem = {
          id: `${itemKey}-${Date.now()}`,
          product,
          meat_type: meatType,
          quantity,
          selectedExtras: extras,
          totalPrice
        };
        
        return {
          ...state,
          items: [...state.items, newItem]
        };
      }
    
    case 'REMOVE_ITEM':
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.payload)
      };
    
    case 'UPDATE_QUANTITY':
      return {
        ...state,
        items: state.items.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: Math.max(0, action.payload.quantity) }
            : item
        ).filter(item => item.quantity > 0)
      };
    
    case 'CLEAR_CART':
      return { items: [] };
    
    default:
      return state;
  }
};

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, { items: [] });

  const addItem = (product: BurgerItem, meatType: 'beef' | 'chicken', extras: BurgerExtra[], quantity = 1) => {
    dispatch({ type: 'ADD_ITEM', payload: { product, meatType, extras, quantity } });
  };

  const removeItem = (id: string) => {
    dispatch({ type: 'REMOVE_ITEM', payload: id });
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(id);
    } else {
      dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } });
    }
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  const totalItems = state.items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = state.items.reduce((sum, item) => sum + (item.totalPrice * item.quantity), 0);

  return (
    <CartContext.Provider value={{
      items: state.items,
      totalItems,
      totalPrice,
      addItem,
      removeItem,
      updateQuantity,
      clearCart
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};