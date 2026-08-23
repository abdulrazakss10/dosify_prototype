const fs = require('fs');
const path = require('path');

// 1. AdminSidebar.js
const adminSidebar = `'use client';

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
            borderRadius: 2,
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
            borderRadius: 1.5,
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
`;

fs.writeFileSync(path.join(__dirname, '../components/admin/AdminSidebar.js'), adminSidebar, 'utf8');

// 2. DashboardStats.js
const dashboardStats = `'use client';

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
`;

fs.writeFileSync(path.join(__dirname, '../components/admin/DashboardStats.js'), dashboardStats, 'utf8');

// 3. ProductFormDialog.js
const productForm = `'use client';

import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
  Typography,
  TextField,
  Grid,
  Button,
  MenuItem,
  IconButton,
  InputAdornment,
  Divider,
  Paper
} from '@mui/material';
import { X, Upload, Sparkles, Image as ImageIcon } from 'lucide-react';

const CATEGORIES = ['Dosa Mix', 'Masala Mix', 'Millet Mix', 'Combo Packs'];
const PACK_SIZES = ['500g', '700g', '1kg', 'Combo'];
const STATUSES = ['Active', 'Low Stock', 'Out of Stock'];

const PRESET_IMAGES = [
  { label: 'Classic 500g', url: '/images/products/classic-500g.svg' },
  { label: 'Classic 1kg', url: '/images/products/classic-1kg.svg' },
  { label: 'Masala 700g', url: '/images/products/masala-700g.svg' },
  { label: 'Millet 500g', url: '/images/products/millet-500g.svg' },
  { label: 'Ragi 500g', url: '/images/products/ragi-500g.svg' },
  { label: 'Uttapam 500g', url: '/images/products/uttapam-500g.svg' },
  { label: 'Idli & Dosa 1kg', url: '/images/products/idli-dosa-1kg.svg' },
  { label: 'Combo Pack', url: '/images/products/combo-pack.svg' }
];

export default function ProductFormDialog({ open, onClose, onSave, productToEdit }) {
  const [formData, setFormData] = useState({
    name: '',
    category: 'Dosa Mix',
    packSize: '500g',
    price: '',
    originalPrice: '',
    stock: 20,
    status: 'Active',
    description: '',
    ingredients: 'Premium Rice, Urad Dal, Fenugreek, Salt',
    storage: 'Store in a cool, dry place in an airtight container.',
    image: '/images/products/classic-500g.svg'
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (productToEdit) {
      setFormData({
        name: productToEdit.name || '',
        category: productToEdit.category || 'Dosa Mix',
        packSize: productToEdit.packSize || '500g',
        price: productToEdit.price !== undefined ? String(productToEdit.price) : '',
        originalPrice: productToEdit.originalPrice !== undefined ? String(productToEdit.originalPrice) : '',
        stock: productToEdit.stock !== undefined ? productToEdit.stock : 20,
        status: productToEdit.status || 'Active',
        description: productToEdit.description || '',
        ingredients: Array.isArray(productToEdit.ingredients) ? productToEdit.ingredients.join(', ') : (productToEdit.ingredients || ''),
        storage: productToEdit.storage || '',
        image: productToEdit.image || '/images/products/classic-500g.svg'
      });
    } else {
      setFormData({
        name: '',
        category: 'Dosa Mix',
        packSize: '500g',
        price: '',
        originalPrice: '',
        stock: 20,
        status: 'Active',
        description: '',
        ingredients: 'Premium Parboiled Rice, Urad Dal, Fenugreek Seeds, Salt',
        storage: 'Store in a cool dry place. Consume within 45 days.',
        image: '/images/products/classic-500g.svg'
      });
    }
    setErrors({});
  }, [productToEdit, open]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Product name is required';
    if (!formData.price || Number(formData.price) <= 0) newErrors.price = 'Valid price required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    onSave({
      ...formData,
      price: Number(formData.price),
      originalPrice: formData.originalPrice ? Number(formData.originalPrice) : Math.round(Number(formData.price) * 1.2),
      stock: Number(formData.stock)
    });
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{ sx: { borderRadius: 3, p: 1 } }}
    >
      <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', pb: 1, borderBottom: '1px solid #EAE5DC' }}>
        <Box>
          <Typography variant="h6" fontWeight={800} color="primary.main">
            {productToEdit ? 'Edit Product' : 'Add New Product'}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {productToEdit ? 'Update product parameters & inventory' : 'Create new product mix entry'}
          </Typography>
        </Box>
        <IconButton onClick={onClose} size="small">
          <X size={20} />
        </IconButton>
      </DialogTitle>

      <Box component="form" onSubmit={handleSubmit}>
        <DialogContent sx={{ py: 3 }}>
          <Grid container spacing={2.5}>
            <Grid item xs={12} sm={8}>
              <TextField
                label="Product Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                error={!!errors.name}
                helperText={errors.name}
                fullWidth
                size="small"
                required
                placeholder="e.g. Organic Multigrain Dosa Mix – 500g"
              />
            </Grid>

            <Grid item xs={12} sm={4}>
              <TextField
                select
                label="Category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                fullWidth
                size="small"
              >
                {CATEGORIES.map((cat) => (
                  <MenuItem key={cat} value={cat}>{cat}</MenuItem>
                ))}
              </TextField>
            </Grid>

            <Grid item xs={12} sm={4}>
              <TextField
                select
                label="Pack Size"
                name="packSize"
                value={formData.packSize}
                onChange={handleChange}
                fullWidth
                size="small"
              >
                {PACK_SIZES.map((size) => (
                  <MenuItem key={size} value={size}>{size}</MenuItem>
                ))}
              </TextField>
            </Grid>

            <Grid item xs={12} sm={4}>
              <TextField
                label="Selling Price (₹)"
                name="price"
                type="number"
                value={formData.price}
                onChange={handleChange}
                error={!!errors.price}
                helperText={errors.price}
                fullWidth
                size="small"
                required
                InputProps={{ startAdornment: <InputAdornment position="start">₹</InputAdornment> }}
              />
            </Grid>

            <Grid item xs={12} sm={4}>
              <TextField
                label="Original Price (₹)"
                name="originalPrice"
                type="number"
                value={formData.originalPrice}
                onChange={handleChange}
                fullWidth
                size="small"
                placeholder="For discount display"
                InputProps={{ startAdornment: <InputAdornment position="start">₹</InputAdornment> }}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                label="Stock Quantity"
                name="stock"
                type="number"
                value={formData.stock}
                onChange={handleChange}
                fullWidth
                size="small"
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                select
                label="Status"
                name="status"
                value={formData.status}
                onChange={handleChange}
                fullWidth
                size="small"
              >
                {STATUSES.map((s) => (
                  <MenuItem key={s} value={s}>{s}</MenuItem>
                ))}
              </TextField>
            </Grid>

            {/* Packaging Graphic Selector */}
            <Grid item xs={12}>
              <Typography variant="caption" fontWeight={700} color="text.secondary" display="block" sx={{ mb: 1 }}>
                Choose Packaging Visual Graphic:
              </Typography>
              <Box sx={{ display: 'flex', gap: 1.5, overflowX: 'auto', pb: 1 }}>
                {PRESET_IMAGES.map((img) => (
                  <Paper
                    key={img.url}
                    elevation={0}
                    onClick={() => setFormData({ ...formData, image: img.url })}
                    sx={{
                      p: 1,
                      borderRadius: 2,
                      border: '2px solid',
                      borderColor: formData.image === img.url ? 'secondary.main' : '#EAE5DC',
                      backgroundColor: formData.image === img.url ? '#FEF3C7' : '#FCFAF6',
                      cursor: 'pointer',
                      textAlign: 'center',
                      minWidth: 90,
                      flexShrink: 0
                    }}
                  >
                    <img src={img.url} alt={img.label} style={{ width: 44, height: 44, margin: '0 auto', objectFit: 'contain' }} />
                    <Typography variant="caption" fontWeight={700} sx={{ fontSize: '0.7rem', display: 'block', mt: 0.5 }}>
                      {img.label}
                    </Typography>
                  </Paper>
                ))}
              </Box>
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                error={!!errors.description}
                helperText={errors.description}
                fullWidth
                size="small"
                multiline
                rows={2.5}
                required
                placeholder="Crispy, fragrant, restaurant-style batter mix details..."
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Ingredients (comma separated)"
                name="ingredients"
                value={formData.ingredients}
                onChange={handleChange}
                fullWidth
                size="small"
                placeholder="e.g. Parboiled Rice, Urad Dal, Fenugreek, Himalayan Salt"
              />
            </Grid>
          </Grid>
        </DialogContent>

        <DialogActions sx={{ p: 2.5, borderTop: '1px solid #EAE5DC' }}>
          <Button onClick={onClose} sx={{ color: 'text.secondary', fontWeight: 700 }}>
            CANCEL
          </Button>
          <Button type="submit" variant="contained" color="secondary" sx={{ px: 3, fontWeight: 800, borderRadius: 2 }}>
            {productToEdit ? 'UPDATE PRODUCT' : 'SAVE PRODUCT'}
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
}
`;

fs.writeFileSync(path.join(__dirname, '../components/admin/ProductFormDialog.js'), productForm, 'utf8');

// 4. DeleteDialog.js
const deleteDialog = `'use client';

import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Button,
  Box
} from '@mui/material';
import { AlertTriangle } from 'lucide-react';

export default function DeleteDialog({ open, onClose, onConfirm, product }) {
  if (!product) return null;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="xs"
      fullWidth
      PaperProps={{ sx: { borderRadius: 3, p: 1 } }}
    >
      <DialogTitle sx={{ display: 'flex', alignItems: 'center', gap: 1.5, color: '#DC2626' }}>
        <Box sx={{ p: 1, borderRadius: '50%', backgroundColor: '#FEE2E2', display: 'flex' }}>
          <AlertTriangle size={22} color="#DC2626" />
        </Box>
        <Typography variant="h6" fontWeight={800}>
          Delete Product?
        </Typography>
      </DialogTitle>

      <DialogContent>
        <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6 }}>
          Are you sure you want to delete <strong>{product.name}</strong> from the DOSIFY product catalog?
        </Typography>
      </DialogContent>

      <DialogActions sx={{ p: 2 }}>
        <Button onClick={onClose} sx={{ color: 'text.secondary', fontWeight: 700 }}>
          CANCEL
        </Button>
        <Button
          onClick={onConfirm}
          variant="contained"
          color="error"
          sx={{ fontWeight: 800, borderRadius: 2, px: 2.5 }}
        >
          DELETE PRODUCT
        </Button>
      </DialogActions>
    </Dialog>
  );
}
`;

fs.writeFileSync(path.join(__dirname, '../components/admin/DeleteDialog.js'), deleteDialog, 'utf8');

// 5. ProductPreviewDialog.js
const previewDialog = `'use client';

import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Box,
  Typography,
  Chip,
  Rating,
  Divider,
  Grid
} from '@mui/material';
import { X, CheckCircle2 } from 'lucide-react';

export default function ProductPreviewDialog({ open, onClose, product }) {
  if (!product) return null;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{ sx: { borderRadius: 3, p: 1 } }}
    >
      <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', pb: 1, borderBottom: '1px solid #EAE5DC' }}>
        <Typography variant="h6" fontWeight={800} color="primary.main">
          Product Preview
        </Typography>
        <IconButton onClick={onClose} size="small">
          <X size={20} />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ py: 3 }}>
        <Grid container spacing={3} alignItems="center">
          <Grid item xs={12} sm={5}>
            <Box
              sx={{
                p: 2,
                borderRadius: 2.5,
                backgroundColor: '#FCFAF6',
                border: '1px solid #EAE5DC',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: 200
              }}
            >
              <img src={product.image} alt={product.name} style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain' }} />
            </Box>
          </Grid>

          <Grid item xs={12} sm={7}>
            <Chip
              label={product.category}
              size="small"
              sx={{ mb: 1, fontWeight: 700, backgroundColor: '#E8F5E9', color: '#1E4D2B' }}
            />
            <Typography variant="h6" fontWeight={800} gutterBottom>
              {product.name}
            </Typography>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
              <Rating value={product.rating || 4.8} precision={0.1} size="small" readOnly sx={{ color: '#F59E0B' }} />
              <Typography variant="caption" fontWeight={700}>
                {product.rating || 4.8} ({product.reviews || 120} reviews)
              </Typography>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 1, mb: 1 }}>
              <Typography variant="h5" fontWeight={900} color="secondary.main">
                ₹{product.price}
              </Typography>
              {product.originalPrice > product.price && (
                <Typography variant="body2" sx={{ color: 'text.secondary', textDecoration: 'line-through' }}>
                  ₹{product.originalPrice}
                </Typography>
              )}
            </Box>

            <Typography variant="caption" color="text.secondary" display="block">
              Stock available: <strong>{product.stock} units</strong> • Status: <strong>{product.status}</strong>
            </Typography>
          </Grid>
        </Grid>

        <Divider sx={{ my: 2.5 }} />

        <Typography variant="subtitle2" fontWeight={800} gutterBottom>
          Description:
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6, mb: 2 }}>
          {product.description}
        </Typography>
      </DialogContent>
    </Dialog>
  );
}
`;

fs.writeFileSync(path.join(__dirname, '../components/admin/ProductPreviewDialog.js'), previewDialog, 'utf8');

console.log('All admin support components written successfully!');
