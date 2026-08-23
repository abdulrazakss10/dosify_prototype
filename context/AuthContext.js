'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [isAuthLoaded, setIsAuthLoaded] = useState(false);

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem('dosify_current_user');
      if (storedUser) {
        setCurrentUser(JSON.parse(storedUser));
      }
    } catch (e) {
      console.error('Error loading auth user', e);
    } finally {
      setIsAuthLoaded(true);
    }
  }, []);

  const login = (email, password, forcedRole = null) => {
    const cleanEmail = (email || '').trim().toLowerCase();
    
    // Check for Admin
    if (forcedRole === 'admin' || (cleanEmail === 'admin@dosify.com' && password === 'admin123')) {
      const adminData = {
        id: 'admin-1',
        name: 'Admin Manager',
        email: 'admin@dosify.com',
        role: 'admin',
        avatar: 'A'
      };
      setCurrentUser(adminData);
      try {
        localStorage.setItem('dosify_current_user', JSON.stringify(adminData));
        localStorage.setItem('dosify_admin_auth', 'true');
      } catch (e) {}
      return { success: true, role: 'admin', user: adminData };
    }

    // Check for Customer / User
    if (forcedRole === 'user' || (cleanEmail === 'user@dosify.com' && password === 'user123') || (!cleanEmail.includes('admin') && password)) {
      const userData = {
        id: 'user-1',
        name: cleanEmail.includes('priya') ? 'Abdul razak' : 'Abdul razak',
        email: cleanEmail || 'user@dosify.com',
        role: 'user',
        avatar: 'P',
        phone: '9876543210',
        address: 'Indiranagar, Bangalore'
      };
      setCurrentUser(userData);
      try {
        localStorage.setItem('dosify_current_user', JSON.stringify(userData));
      } catch (e) {}
      return { success: true, role: 'user', user: userData };
    }

    return {
      success: false,
      message: 'Invalid credentials. Use demo accounts: user@dosify.com / user123 OR admin@dosify.com / admin123'
    };
  };

  const loginAsRole = (role) => {
    if (role === 'admin') {
      return login('admin@dosify.com', 'admin123', 'admin');
    } else {
      return login('user@dosify.com', 'user123', 'user');
    }
  };

  const logout = () => {
    setCurrentUser(null);
    try {
      localStorage.removeItem('dosify_current_user');
      localStorage.removeItem('dosify_admin_auth');
    } catch (e) {}
  };

  const isAdminAuthenticated = currentUser?.role === 'admin';
  const isUserAuthenticated = !!currentUser;

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        isAdminAuthenticated,
        isUserAuthenticated,
        isAuthLoaded,
        login,
        loginAsRole,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
