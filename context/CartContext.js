'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [couponCode, setCouponCode] = useState('');
  const [couponDiscount, setCouponDiscount] = useState(0);
  const [couponError, setCouponError] = useState('');
  const [placedOrder, setPlacedOrder] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load cart on client mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem('dosify_cart');
      if (stored) {
        setCart(JSON.parse(stored));
      }
    } catch (e) {
      console.error('Error loading cart', e);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // Save cart to localStorage
  const saveCart = (newCart) => {
    setCart(newCart);
    try {
      localStorage.setItem('dosify_cart', JSON.stringify(newCart));
    } catch (e) {
      console.error('Error saving cart', e);
    }
  };

  const addToCart = (product, quantity = 1, selectedSize = null, customPrice = null) => {
    const packSize = selectedSize || product.packSize || '500g';
    const price = customPrice !== null ? Number(customPrice) : Number(product.price);
    const originalPrice = product.originalPrice ? Number(product.originalPrice) : Math.round(price * 1.2);

    const existingIndex = cart.findIndex(
      (item) => item.id === product.id && item.packSize === packSize
    );

    let updated;
    if (existingIndex > -1) {
      updated = [...cart];
      updated[existingIndex].quantity += quantity;
    } else {
      updated = [
        ...cart,
        {
          id: product.id,
          name: product.name,
          slug: product.slug,
          image: product.image,
          packSize: packSize,
          price: price,
          originalPrice: originalPrice,
          quantity: quantity,
          stock: product.stock !== undefined ? product.stock : 20
        }
      ];
    }

    saveCart(updated);
    setIsCartOpen(true);
  };

  const removeFromCart = (productId, packSize) => {
    const updated = cart.filter(
      (item) => !(item.id === productId && item.packSize === packSize)
    );
    saveCart(updated);
  };

  const updateQuantity = (productId, packSize, delta) => {
    const updated = cart
      .map((item) => {
        if (item.id === productId && item.packSize === packSize) {
          const newQty = item.quantity + delta;
          return newQty > 0 ? { ...item, quantity: newQty } : null;
        }
        return item;
      })
      .filter(Boolean);

    saveCart(updated);
  };

  const clearCart = () => {
    saveCart([]);
    setCouponCode('');
    setCouponDiscount(0);
    setCouponError('');
  };

  const applyCoupon = (code) => {
    const cleanCode = (code || '').trim().toUpperCase();
    if (!cleanCode) {
      setCouponError('Please enter a coupon code');
      return false;
    }

    if (cleanCode === 'DOSA20' || cleanCode === 'FRESH20') {
      setCouponCode(cleanCode);
      setCouponDiscount(20); // 20% off
      setCouponError('');
      return true;
    } else if (cleanCode === 'FIRST50') {
      setCouponCode(cleanCode);
      setCouponDiscount(15); // 15% off
      setCouponError('');
      return true;
    } else {
      setCouponError('Invalid coupon code. Try "DOSA20" for 20% off!');
      return false;
    }
  };

  const removeCoupon = () => {
    setCouponCode('');
    setCouponDiscount(0);
    setCouponError('');
  };

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);

  const openCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const closeCheckout = () => {
    setIsCheckoutOpen(false);
  };

  // Calculations
  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const discountAmount = Math.round((subtotal * couponDiscount) / 100);
  const deliveryFee = subtotal > 0 ? (subtotal >= 299 ? 0 : 40) : 0;
  const total = Math.max(0, subtotal - discountAmount + deliveryFee);
  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  const placeOrder = (customerData) => {
    const orderId = `DOS-${Math.floor(10000 + Math.random() * 90000)}`;
    const newOrder = {
      id: orderId,
      customer: customerData.name,
      email: customerData.email,
      phone: customerData.phone,
      address: `${customerData.address}, ${customerData.city} - ${customerData.pincode}`,
      paymentMethod: customerData.paymentMethod || 'UPI',
      items: [...cart],
      subtotal,
      discountAmount,
      deliveryFee,
      total,
      status: 'Processing',
      date: new Date().toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    };

    // Store in localStorage
    try {
      const existingOrders = JSON.parse(localStorage.getItem('dosify_orders') || '[]');
      localStorage.setItem('dosify_orders', JSON.stringify([newOrder, ...existingOrders]));
    } catch (e) {
      console.error('Error saving order', e);
    }

    setPlacedOrder(newOrder);
    clearCart();
    return newOrder;
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        isCartOpen,
        isCheckoutOpen,
        couponCode,
        couponDiscount,
        couponError,
        subtotal,
        discountAmount,
        deliveryFee,
        total,
        totalItems,
        placedOrder,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        applyCoupon,
        removeCoupon,
        openCart,
        closeCart,
        openCheckout,
        closeCheckout,
        placeOrder,
        setPlacedOrder
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
