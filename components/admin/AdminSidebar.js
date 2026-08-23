'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Chip,
  Divider,
  Button,
  IconButton
} from '@mui/material';
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  Percent,
  BookOpen,
  Star,
  Settings,
  LogOut,
  ArrowLeft,
  Sparkles
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useProducts } from '../../context/ProductContext';

export default function AdminSidebar({ activeTab = 'products', setActiveTab, onCloseMobile }) {
  const router = useRouter();
  const { logout, adminUser } = useAuth();
  const { products } = useProducts();

  const handleLogout = () => {
    logout();
    router.push('/admin/login');
  };

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard size={19} />, badge: null, comingSoon: false },
    { id: 'products', label: 'Products', icon: <Package size={19} />, badge: products.length, comingSoon: false },
    { id: 'orders', label: 'Orders', icon: <ShoppingCart size={19} />, badge: '248', comingSoon: true },
    { id: 'customers', label: 'Customers', icon: <Users size={19} />, badge: null, comingSoon: true },
    { id: 'offers', label: 'Offers', icon: <Percent size={19} />, badge: null, comingSoon: true },
    { id: 'recipes', label: 'Recipes', icon: <BookOpen size={19} />, badge: null, comingSoon: true },
    { id: 'reviews', label: 'Reviews', icon: <Star size={19} />, badge: null, comingSoon: true },
    { id: 'settings', label: 'Settings', icon: <Settings size={19} />, badge: null, comingSoon: true },
  ];

  return (
    <Box
      sx={{
        width: 260,
        height: '100vh',
        backgroundColor: '#0F172A', // Sleek Charcoal Navy
        color: '#F8FAFC',
        display: 'flex',
        flexDirection: 'column',
        borderRight: '1px solid #1E293B'
      }}
    >
      {/* Brand Header */}
      <Box sx={{ p: 3, pb: 2, display: 'flex', alignItems: 'center', gap: 1.5 }}>
        <Box
          sx={{
            width: 38,
            height: 38,
            borderRadius: 3,
            backgroundColor: '#1E4D2B',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#FFFFFF',
            fontWeight: 900,
            fontSize: '1.2rem',
            border: '1px solid #22C55E'
          }}
        >
          D
        </Box>
        <Box>
          <Typography variant="subtitle1" fontWeight={900} letterSpacing="0.08em" color="#FFFFFF">
            DOSIFY
          </Typography>
          <Typography variant="caption" sx={{ color: '#FDE047', fontWeight: 700, fontSize: '0.68rem', letterSpacing: '0.08em' }}>
            ADMIN PORTAL
          </Typography>
        </Box>
      </Box>

      {/* Back to Client Store Link */}
      <Box sx={{ px: 2, pb: 1 }}>
        <Button
          component={Link}
          href="/"
          startIcon={<ArrowLeft size={14} />}
          fullWidth
          size="small"
          sx={{
            justifyContent: 'flex-start',
            color: '#94A3B8',
            fontSize: '0.75rem',
            py: 0.6,
            borderRadius: 1,
            '&:hover': { color: '#FFFFFF', backgroundColor: 'rgba(255,255,255,0.05)' }
          }}
        >
          Back to Customer Store
        </Button>
      </Box>

      <Divider sx={{ my: 1, borderColor: '#1E293B' }} />

      {/* Navigation List */}
      <List sx={{ px: 1.5, flex: 1, overflowY: 'auto' }}>
        {navItems.map((item) => {
          const isSelected = activeTab === item.id;
          return (
            <ListItem key={item.id} disablePadding sx={{ mb: 0.6 }}>
              <ListItemButton
                onClick={() => {
                  if (!item.comingSoon) {
                    setActiveTab(item.id);
                    if (onCloseMobile) onCloseMobile();
                  }
                }}
                disabled={item.comingSoon}
                sx={{
                  borderRadius: 2,
                  py: 1,
                  px: 1.8,
                  backgroundColor: isSelected ? 'rgba(34, 197, 94, 0.15)' : 'transparent',
                  border: isSelected ? '1px solid rgba(34, 197, 94, 0.4)' : '1px solid transparent',
                  color: isSelected ? '#4ADE80' : item.comingSoon ? '#64748B' : '#E2E8F0',
                  '&:hover': {
                    backgroundColor: isSelected ? 'rgba(34, 197, 94, 0.2)' : 'rgba(255,255,255,0.04)',
                    color: isSelected ? '#4ADE80' : '#FFFFFF'
                  }
                }}
              >
                <ListItemIcon sx={{ minWidth: 34, color: isSelected ? '#4ADE80' : item.comingSoon ? '#64748B' : '#94A3B8' }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={item.label}
                  primaryTypographyProps={{
                    fontSize: '0.88rem',
                    fontWeight: isSelected ? 800 : 500
                  }}
                />
                {item.badge && (
                  <Chip
                    label={item.badge}
                    size="small"
                    sx={{
                      height: 20,
                      fontSize: '0.7rem',
                      fontWeight: 800,
                      backgroundColor: isSelected ? '#22C55E' : '#1E293B',
                      color: isSelected ? '#0F172A' : '#94A3B8'
                    }}
                  />
                )}
                {item.comingSoon && (
                  <Typography variant="caption" sx={{ fontSize: '0.65rem', color: '#64748B', fontWeight: 600 }}>
                    Coming Soon
                  </Typography>
                )}
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>

      <Divider sx={{ borderColor: '#1E293B' }} />

      {/* User Info & Logout */}
      <Box sx={{ p: 2, backgroundColor: '#0B1120' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1.5 }}>
          <Box>
            <Typography variant="body2" fontWeight={700} color="#FFFFFF">
              Store Manager
            </Typography>
            <Typography variant="caption" color="#94A3B8">
              admin@dosify.com
            </Typography>
          </Box>
          <IconButton onClick={handleLogout} size="small" sx={{ color: '#EF4444', '&:hover': { backgroundColor: 'rgba(239, 68, 68, 0.1)' } }}>
            <LogOut size={18} />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
}
