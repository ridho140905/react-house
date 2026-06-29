import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const { profile } = useAuth();

  // Tier logic mapping
  const tierDiscounts = {
    silver: 0.05,
    gold: 0.15,
    platinum: 0.20
  };

  const tierMultipliers = {
    silver: 1,
    gold: 2,
    platinum: 5
  };

  const getDiscountRate = () => {
    if (!profile?.tier) return 0;
    return tierDiscounts[profile.tier.toLowerCase()] || 0;
  };

  const getPointsMultiplier = () => {
    if (!profile?.tier) return 1;
    return tierMultipliers[profile.tier.toLowerCase()] || 1;
  };

  const calculateTotal = () => {
    const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    const discountRate = getDiscountRate();
    const discountAmount = subtotal * discountRate;
    const finalTotal = subtotal - discountAmount;
    
    // Points calculation: 1 point per 10,000 IDR base
    const basePoints = Math.floor(finalTotal / 10000);
    const pointsEarned = basePoints * getPointsMultiplier();

    return { subtotal, discountAmount, finalTotal, pointsEarned };
  };

  const addToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, calculateTotal, getDiscountRate, getPointsMultiplier }}>
      {children}
    </CartContext.Provider>
  );
};
