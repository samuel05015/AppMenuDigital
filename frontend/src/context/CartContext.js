import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('royalBurgerCart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('royalBurgerCart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (item, customizations = {}) => {
    const cartItem = {
      ...item,
      cartId: `${item.id}-${Date.now()}`,
      customizations,
      quantity: 1
    };
    setCart([...cart, cartItem]);
  };

  const removeFromCart = (cartId) => {
    setCart(cart.filter(item => item.cartId !== cartId));
  };

  const updateQuantity = (cartId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(cartId);
      return;
    }
    setCart(cart.map(item => 
      item.cartId === cartId ? { ...item, quantity } : item
    ));
  };

  const clearCart = () => {
    setCart([]);
  };

  const getCartTotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getCartCount = () => {
    return cart.reduce((count, item) => count + item.quantity, 0);
  };

  return (
    <CartContext.Provider value={{
      cart,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      getCartTotal,
      getCartCount
    }}>
      {children}
    </CartContext.Provider>
  );
};
