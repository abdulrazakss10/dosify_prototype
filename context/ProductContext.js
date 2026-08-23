'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { INITIAL_PRODUCTS } from '../data/mockData';

const ProductContext = createContext();

export function ProductProvider({ children }) {
  const [products, setProducts] = useState(INITIAL_PRODUCTS);
  const [isLoaded, setIsLoaded] = useState(false);

  // Hydrate from localStorage safely on client mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem('dosify_products');
      if (stored) {
        const parsed = JSON.parse(stored);
        // Ensure image paths point to /images/Dosa/ if they used old unsplash or svg
        const updated = parsed.map(p => {
          const matchInitial = INITIAL_PRODUCTS.find(ip => ip.id === p.id);
          if (matchInitial && (p.image.includes('unsplash.com') || p.image.includes('.svg'))) {
            return { ...p, image: matchInitial.image };
          }
          return p;
        });
        setProducts(updated);
        localStorage.setItem('dosify_products', JSON.stringify(updated));
      } else {
        localStorage.setItem('dosify_products', JSON.stringify(INITIAL_PRODUCTS));
      }
    } catch (e) {
      console.error('Error loading products from localStorage', e);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  const saveProducts = (newProducts) => {
    setProducts(newProducts);
    try {
      localStorage.setItem('dosify_products', JSON.stringify(newProducts));
    } catch (e) {
      console.error('Error saving products to localStorage', e);
    }
  };

  const addProduct = (productData) => {
    const newId = products.length > 0 ? Math.max(...products.map(p => Number(p.id) || 0)) + 1 : 1;
    const slug = productData.slug || productData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    
    const newProduct = {
      id: newId,
      slug: slug || `product-${newId}`,
      rating: 5.0,
      reviews: 1,
      isFeatured: false,
      status: productData.stock > 0 ? (productData.stock <= 5 ? 'Low Stock' : 'Active') : 'Out of Stock',
      image: productData.image || '/images/Dosa/classic-dosa-mix.jpg',
      highlights: productData.highlights || ['100% Natural', 'Crisp & Fresh', 'Ready in Minutes'],
      packSizesAvailable: [
        { size: productData.packSize || '500g', price: Number(productData.price), originalPrice: Number(productData.originalPrice || productData.price * 1.2), servings: '10-12 Dosas' }
      ],
      ingredients: productData.ingredients ? (Array.isArray(productData.ingredients) ? productData.ingredients : productData.ingredients.split(',').map(s => s.trim())) : ['Premium Rice', 'Urad Dal', 'Fenugreek', 'Salt'],
      nutrition: [
        { label: 'Energy / Calories', value: '350 kcal' },
        { label: 'Protein', value: '11.5 g' },
        { label: 'Carbohydrates', value: '72.0 g' }
      ],
      preparation: [
        { step: 1, title: 'MIX', desc: 'Whisk DOSIFY mix with water in a 1:1.25 ratio.' },
        { step: 2, title: 'PREPARE', desc: 'Rest batter for 5 minutes.' },
        { step: 3, title: 'POUR', desc: 'Pour onto hot tawa and roast with ghee till golden.' }
      ],
      storage: productData.storage || 'Store in a cool, dry place in an airtight container.',
      reviewList: [
        { author: 'Verified Customer', rating: 5, date: 'Just now', comment: 'Excellent quality and taste!' }
      ],
      ...productData,
      price: Number(productData.price),
      originalPrice: Number(productData.originalPrice || productData.price),
      stock: Number(productData.stock || 0),
      discount: productData.originalPrice > productData.price ? Math.round(((productData.originalPrice - productData.price) / productData.originalPrice) * 100) : 0
    };

    const updated = [newProduct, ...products];
    saveProducts(updated);
    return newProduct;
  };

  const updateProduct = (id, updatedFields) => {
    const updated = products.map((p) => {
      if (p.id === id || String(p.id) === String(id)) {
        const price = updatedFields.price !== undefined ? Number(updatedFields.price) : p.price;
        const originalPrice = updatedFields.originalPrice !== undefined ? Number(updatedFields.originalPrice) : p.originalPrice;
        const stock = updatedFields.stock !== undefined ? Number(updatedFields.stock) : p.stock;
        const discount = originalPrice > price ? Math.round(((originalPrice - price) / originalPrice) * 100) : 0;
        const status = updatedFields.status || (stock > 0 ? (stock <= 5 ? 'Low Stock' : 'Active') : 'Out of Stock');
        
        return {
          ...p,
          ...updatedFields,
          price,
          originalPrice,
          stock,
          discount,
          status
        };
      }
      return p;
    });

    saveProducts(updated);
  };

  const deleteProduct = (id) => {
    const updated = products.filter((p) => p.id !== id && String(p.id) !== String(id));
    saveProducts(updated);
  };

  const resetToDefault = () => {
    saveProducts(INITIAL_PRODUCTS);
  };

  const getProductBySlug = (slug) => {
    return products.find((p) => p.slug === slug || String(p.id) === String(slug));
  };

  const getProductById = (id) => {
    return products.find((p) => p.id === id || String(p.id) === String(id));
  };

  return (
    <ProductContext.Provider
      value={{
        products,
        isLoaded,
        addProduct,
        updateProduct,
        deleteProduct,
        resetToDefault,
        getProductBySlug,
        getProductById
      }}
    >
      {children}
    </ProductContext.Provider>
  );
}

export function useProducts() {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProducts must be used within a ProductProvider');
  }
  return context;
}
