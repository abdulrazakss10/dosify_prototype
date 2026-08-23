'use client';

import React from 'react';
import { Box, Grid, Paper, Typography } from '@mui/material';
import { Package, CheckCircle2, AlertTriangle, ShoppingCart, TrendingUp } from 'lucide-react';
import { useProducts } from '../../context/ProductContext';

export default function DashboardStats() {
  const { products } = useProducts();

  const totalProducts = products.length;
  const activeProducts = products.filter((p) => p.status === 'Active' || (p.stock > 5 && p.status !== 'Out of Stock')).length;
  const lowStock = products.filter((p) => p.status === 'Low Stock' || (p.stock > 0 && p.stock <= 5)).length;
  const outOfStock = products.filter((p) => p.status === 'Out of Stock' || p.stock === 0).length;

  const stats = [
    {
      title: 'Total Products',
      value: totalProducts,
      subtitle: 'In Catalog',
      icon: <Package size={22} color="#2563EB" />,
      bgColor: '#EFF6FF',
      borderColor: '#DBEAFE'
    },
    {
      title: 'Active Products',
      value: activeProducts,
      subtitle: 'Ready to Ship',
      icon: <CheckCircle2 size={22} color="#16A34A" />,
      bgColor: '#F0FDF4',
      borderColor: '#DCFCE7'
    },
    {
      title: 'Low Stock Alerts',
      value: lowStock,
      subtitle: '< 5 units left',
      icon: <AlertTriangle size={22} color="#D97706" />,
      bgColor: '#FFFBEB',
      borderColor: '#FEF3C7'
    },
    {
      title: 'Total Orders',
      value: 248,
      subtitle: 'Prototype Orders',
      icon: <ShoppingCart size={22} color="#9333EA" />,
      bgColor: '#FAF5FF',
      borderColor: '#F3E8FF'
    }
  ];

  return (
    <Grid container spacing={2.5} sx={{ mb: 4 }}>
      {stats.map((stat, i) => (
        <Grid item xs={12} sm={6} md={3} key={stat.title}>
          <Paper
            elevation={0}
            sx={{
              p: 2.5,
              borderRadius: 3,
              border: '1px solid',
              borderColor: stat.borderColor,
              backgroundColor: '#FFFFFF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              boxShadow: '0 2px 6px rgba(0,0,0,0.02)'
            }}
          >
            <Box>
              <Typography variant="caption" color="text.secondary" fontWeight={700} letterSpacing="0.04em">
                {stat.title.toUpperCase()}
              </Typography>
              <Typography variant="h4" fontWeight={900} color="text.primary" sx={{ my: 0.5 }}>
                {stat.value}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {stat.subtitle}
              </Typography>
            </Box>

            <Box
              sx={{
                width: 48,
                height: 48,
                borderRadius: 2.5,
                backgroundColor: stat.bgColor,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              {stat.icon}
            </Box>
          </Paper>
        </Grid>
      ))}
    </Grid>
  );
}
