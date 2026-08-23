const fs = require('fs');
const path = require('path');

// 1. app/admin/login/page.js
const adminLoginPage = `'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  Box,
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  IconButton,
  InputAdornment,
  Alert,
  Divider,
  Chip
} from '@mui/material';
import { Eye, EyeOff, Lock, Mail, ArrowLeft, KeyRound, Sparkles } from 'lucide-react';
import { useAuth } from '../../../context/AuthContext';

export default function AdminLoginPage() {
  const router = useRouter();
  const { login, isAdminAuthenticated } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isAdminAuthenticated) {
      router.replace('/admin/dashboard');
    }
  }, [isAdminAuthenticated, router]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    setTimeout(() => {
      const res = login(email, password);
      if (res.success) {
        router.push('/admin/dashboard');
      } else {
        setError(res.message);
        setLoading(false);
      }
    }, 400);
  };

  const handleFillDemo = () => {
    setEmail('admin@dosify.com');
    setPassword('admin123');
    setError('');
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundColor: '#0F172A', // Dark Admin Canvas
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        p: 2,
        position: 'relative'
      }}
    >
      {/* Back to Home button */}
      <Box sx={{ position: 'absolute', top: 24, left: 24 }}>
        <Button
          component={Link}
          href="/"
          startIcon={<ArrowLeft size={16} />}
          sx={{
            color: '#94A3B8',
            fontWeight: 700,
            '&:hover': { color: '#FFFFFF', backgroundColor: 'rgba(255,255,255,0.08)' }
          }}
        >
          Back to Store
        </Button>
      </Box>

      <Container maxWidth="xs">
        <Paper
          elevation={4}
          sx={{
            p: 4,
            borderRadius: 3.5,
            backgroundColor: '#1E293B',
            border: '1px solid #334155',
            color: '#FFFFFF',
            textAlign: 'center'
          }}
        >
          {/* Logo Badge */}
          <Box
            sx={{
              width: 52,
              height: 52,
              borderRadius: 2.5,
              backgroundColor: '#1E4D2B',
              color: '#FFFFFF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 900,
              fontSize: '1.6rem',
              mx: 'auto',
              mb: 2,
              boxShadow: '0 6px 16px rgba(30, 77, 43, 0.4)',
              border: '1px solid #22C55E'
            }}
          >
            D
          </Box>

          <Typography variant="h5" fontWeight={900} letterSpacing="0.06em" color="#FFFFFF">
            DOSIFY
          </Typography>
          <Typography variant="caption" sx={{ color: '#FDE047', fontWeight: 800, letterSpacing: '0.12em', display: 'block', mb: 3 }}>
            ADMIN PORTAL
          </Typography>

          {error && (
            <Alert severity="error" sx={{ mb: 2.5, textAlign: 'left', borderRadius: 2 }}>
              {error}
            </Alert>
          )}

          {/* Form */}
          <Box component="form" onSubmit={handleSubmit} sx={{ textAlign: 'left' }}>
            <Box sx={{ mb: 2 }}>
              <Typography variant="caption" sx={{ color: '#94A3B8', fontWeight: 700, mb: 0.5, display: 'block' }}>
                Admin Email
              </Typography>
              <TextField
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@dosify.com"
                fullWidth
                size="small"
                required
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Mail size={16} color="#94A3B8" />
                    </InputAdornment>
                  )
                }}
                sx={{
                  backgroundColor: '#0F172A',
                  borderRadius: 2,
                  '& input': { color: '#FFFFFF', fontSize: '0.9rem' },
                  '& .MuiOutlinedInput-notchedOutline': { borderColor: '#334155' }
                }}
              />
            </Box>

            <Box sx={{ mb: 3 }}>
              <Typography variant="caption" sx={{ color: '#94A3B8', fontWeight: 700, mb: 0.5, display: 'block' }}>
                Password
              </Typography>
              <TextField
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                fullWidth
                size="small"
                required
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Lock size={16} color="#94A3B8" />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                        size="small"
                        sx={{ color: '#94A3B8' }}
                      >
                        {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                      </IconButton>
                    </InputAdornment>
                  )
                }}
                sx={{
                  backgroundColor: '#0F172A',
                  borderRadius: 2,
                  '& input': { color: '#FFFFFF', fontSize: '0.9rem' },
                  '& .MuiOutlinedInput-notchedOutline': { borderColor: '#334155' }
                }}
              />
            </Box>

            <Button
              type="submit"
              variant="contained"
              color="secondary"
              fullWidth
              size="large"
              disabled={loading}
              sx={{
                py: 1.3,
                fontWeight: 800,
                fontSize: '0.95rem',
                borderRadius: 2,
                boxShadow: '0 4px 14px rgba(217, 119, 6, 0.4)',
                mb: 2.5
              }}
            >
              {loading ? 'Authenticating...' : 'Sign In to Admin Portal'}
            </Button>
          </Box>

          <Divider sx={{ my: 2, borderColor: '#334155' }} />

          {/* Quick Demo Fill Helper */}
          <Box
            sx={{
              p: 2,
              borderRadius: 2,
              backgroundColor: 'rgba(217, 119, 6, 0.1)',
              border: '1px dashed #D97706',
              textAlign: 'center'
            }}
          >
            <Typography variant="caption" color="#FDE047" fontWeight={700} display="block" gutterBottom>
              ⚡ Fast Demo Credentials
            </Typography>
            <Typography variant="caption" sx={{ color: '#CBD5E1', display: 'block', mb: 1.5, fontSize: '0.75rem' }}>
              <code>admin@dosify.com</code> / <code>admin123</code>
            </Typography>
            <Button
              size="small"
              variant="outlined"
              onClick={handleFillDemo}
              startIcon={<Sparkles size={14} />}
              sx={{
                color: '#FDE047',
                borderColor: '#D97706',
                fontWeight: 700,
                fontSize: '0.75rem',
                borderRadius: 1.5,
                '&:hover': { borderColor: '#F59E0B', backgroundColor: 'rgba(217, 119, 6, 0.2)' }
              }}
            >
              Autofill Demo Credentials
            </Button>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}
`;

fs.writeFileSync(path.join(__dirname, '../app/admin/login/page.js'), adminLoginPage, 'utf8');

// 2. app/admin/dashboard/page.js
const adminDashboardPage = `'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  Box,
  Typography,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Chip,
  TextField,
  InputAdornment,
  Tabs,
  Tab,
  Snackbar,
  Alert,
  Drawer,
  Pagination,
  useMediaQuery,
  useTheme
} from '@mui/material';
import {
  Plus,
  Search,
  Edit2,
  Trash2,
  Eye,
  Menu as MenuIcon,
  Package,
  CheckCircle2,
  AlertTriangle,
  RotateCcw
} from 'lucide-react';
import AdminSidebar from '../../../components/admin/AdminSidebar';
import DashboardStats from '../../../components/admin/DashboardStats';
import ProductFormDialog from '../../../components/admin/ProductFormDialog';
import DeleteDialog from '../../../components/admin/DeleteDialog';
import ProductPreviewDialog from '../../../components/admin/ProductPreviewDialog';
import { useAuth } from '../../../context/AuthContext';
import { useProducts } from '../../../context/ProductContext';

export default function AdminDashboardPage() {
  const theme = useTheme();
  const router = useRouter();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const { isAdminAuthenticated, isAuthLoaded } = useAuth();
  const { products, addProduct, updateProduct, deleteProduct, resetToDefault } = useProducts();

  const [activeNavTab, setActiveNavTab] = useState('products');
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);

  // Table filtering & search
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [page, setPage] = useState(1);
  const rowsPerPage = 5;

  // Dialog States
  const [formDialogOpen, setFormDialogOpen] = useState(false);
  const [productToEdit, setProductToEdit] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  const [previewDialogOpen, setPreviewDialogOpen] = useState(false);
  const [productToPreview, setProductToPreview] = useState(null);

  // Toast Snackbar notification
  const [toast, setToast] = useState({ open: false, message: '', severity: 'success' });

  // Route protection
  useEffect(() => {
    if (isAuthLoaded && !isAdminAuthenticated) {
      router.replace('/admin/login');
    }
  }, [isAuthLoaded, isAdminAuthenticated, router]);

  // Filtered Products
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchSearch =
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.packSize.toLowerCase().includes(searchQuery.toLowerCase());

      if (!matchSearch) return false;

      if (statusFilter === 'All') return true;
      if (statusFilter === 'Active') return p.status === 'Active';
      if (statusFilter === 'Low Stock') return p.status === 'Low Stock' || (p.stock > 0 && p.stock <= 5);
      if (statusFilter === 'Out of Stock') return p.status === 'Out of Stock' || p.stock === 0;

      return true;
    });
  }, [products, searchQuery, statusFilter]);

  // Pagination calculation
  const totalPages = Math.ceil(filteredProducts.length / rowsPerPage) || 1;
  const paginatedProducts = filteredProducts.slice((page - 1) * rowsPerPage, page * rowsPerPage);

  // CRUD handlers
  const handleOpenAdd = () => {
    setProductToEdit(null);
    setFormDialogOpen(true);
  };

  const handleOpenEdit = (product) => {
    setProductToEdit(product);
    setFormDialogOpen(true);
  };

  const handleSaveProduct = (productData) => {
    if (productToEdit) {
      updateProduct(productToEdit.id, productData);
      setToast({ open: true, message: 'Product updated successfully in catalog!', severity: 'success' });
    } else {
      addProduct(productData);
      setToast({ open: true, message: 'New product added successfully to catalog!', severity: 'success' });
    }
    setFormDialogOpen(false);
  };

  const handleOpenDelete = (product) => {
    setProductToDelete(product);
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    if (productToDelete) {
      deleteProduct(productToDelete.id);
      setToast({ open: true, message: 'Product deleted successfully!', severity: 'success' });
      setDeleteDialogOpen(false);
      setProductToDelete(null);
    }
  };

  const handleOpenPreview = (product) => {
    setProductToPreview(product);
    setPreviewDialogOpen(true);
  };

  const getStatusChip = (status, stock) => {
    if (status === 'Out of Stock' || stock === 0) {
      return <Chip label="Out of Stock" size="small" sx={{ backgroundColor: '#FEE2E2', color: '#DC2626', fontWeight: 700 }} />;
    }
    if (status === 'Low Stock' || (stock > 0 && stock <= 5)) {
      return <Chip label="Low Stock" size="small" sx={{ backgroundColor: '#FEF3C7', color: '#D97706', fontWeight: 700 }} />;
    }
    return <Chip label="Active" size="small" sx={{ backgroundColor: '#DCFCE7', color: '#15803D', fontWeight: 700 }} />;
  };

  if (!isAuthLoaded || !isAdminAuthenticated) {
    return null;
  }

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', backgroundColor: '#F8FAFC' }}>
      {/* Desktop Left Sidebar */}
      {!isMobile && (
        <Box sx={{ flexShrink: 0, position: 'sticky', top: 0, height: '100vh' }}>
          <AdminSidebar activeTab={activeNavTab} setActiveTab={setActiveNavTab} />
        </Box>
      )}

      {/* Mobile Drawer */}
      {isMobile && (
        <Drawer
          anchor="left"
          open={mobileDrawerOpen}
          onClose={() => setMobileDrawerOpen(false)}
        >
          <AdminSidebar
            activeTab={activeNavTab}
            setActiveTab={setActiveNavTab}
            onCloseMobile={() => setMobileDrawerOpen(false)}
          />
        </Drawer>
      )}

      {/* Main Content Area */}
      <Box sx={{ flex: 1, p: { xs: 2.5, md: 4 }, overflowY: 'auto' }}>
        {/* Top Bar on Mobile */}
        {isMobile && (
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
            <IconButton onClick={() => setMobileDrawerOpen(true)} color="primary">
              <MenuIcon size={24} />
            </IconButton>
            <Typography variant="subtitle1" fontWeight={800} color="primary.main">
              DOSIFY ADMIN
            </Typography>
            <Box sx={{ width: 24 }} />
          </Box>
        )}

        {/* Dashboard Header Bar */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            justifyContent: 'space-between',
            alignItems: { xs: 'flex-start', sm: 'center' },
            gap: 2,
            mb: 4
          }}
        >
          <Box>
            <Typography variant="h4" fontWeight={900} letterSpacing="-0.02em" color="text.primary">
              Product Management
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
              Manage inventory, live retail prices, product packaging visuals and stock levels.
            </Typography>
          </Box>

          <Button
            variant="contained"
            color="secondary"
            size="large"
            onClick={handleOpenAdd}
            startIcon={<Plus size={18} />}
            sx={{
              px: 3,
              py: 1.2,
              fontWeight: 800,
              borderRadius: 2,
              boxShadow: '0 4px 14px rgba(217, 119, 6, 0.3)'
            }}
          >
            + ADD PRODUCT
          </Button>
        </Box>

        {/* Top 4 Stats Row */}
        <DashboardStats />

        {/* Table Filter & Search Controls */}
        <Paper
          elevation={0}
          sx={{
            p: 2.5,
            mb: 3,
            borderRadius: 3,
            border: '1px solid #E2E8F0',
            backgroundColor: '#FFFFFF',
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            justifyContent: 'space-between',
            alignItems: { xs: 'stretch', md: 'center' },
            gap: 2
          }}
        >
          {/* Search Input */}
          <TextField
            placeholder="Search products by name, category..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setPage(1);
            }}
            size="small"
            sx={{
              width: { xs: '100%', md: 320 },
              '& .MuiOutlinedInput-root': { borderRadius: 2 }
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search size={18} color="#94A3B8" />
                </InputAdornment>
              )
            }}
          />

          {/* Status Filter Chips */}
          <Box sx={{ display: 'flex', gap: 1, overflowX: 'auto', pb: { xs: 1, md: 0 } }}>
            {['All', 'Active', 'Low Stock', 'Out of Stock'].map((status) => (
              <Chip
                key={status}
                label={status}
                onClick={() => {
                  setStatusFilter(status);
                  setPage(1);
                }}
                variant={statusFilter === status ? 'filled' : 'outlined'}
                color={statusFilter === status ? 'primary' : 'default'}
                sx={{
                  fontWeight: 700,
                  fontSize: '0.82rem',
                  borderRadius: 2,
                  px: 1,
                  backgroundColor: statusFilter === status ? '#1E4D2B' : 'transparent',
                  color: statusFilter === status ? '#FFFFFF' : 'text.primary',
                  borderColor: '#CBD5E1'
                }}
              />
            ))}
          </Box>
        </Paper>

        {/* Products Data Table */}
        <Paper
          elevation={0}
          sx={{
            borderRadius: 3,
            border: '1px solid #E2E8F0',
            backgroundColor: '#FFFFFF',
            overflow: 'hidden',
            boxShadow: '0 2px 8px rgba(0,0,0,0.02)'
          }}
        >
          <TableContainer>
            <Table sx={{ minWidth: 700 }}>
              <TableHead sx={{ backgroundColor: '#F8FAFC', borderBottom: '1.5px solid #E2E8F0' }}>
                <TableRow>
                  <TableCell sx={{ fontWeight: 800, color: 'text.secondary', fontSize: '0.78rem' }}>IMAGE</TableCell>
                  <TableCell sx={{ fontWeight: 800, color: 'text.secondary', fontSize: '0.78rem' }}>PRODUCT NAME</TableCell>
                  <TableCell sx={{ fontWeight: 800, color: 'text.secondary', fontSize: '0.78rem' }}>CATEGORY</TableCell>
                  <TableCell sx={{ fontWeight: 800, color: 'text.secondary', fontSize: '0.78rem' }}>PACK SIZE</TableCell>
                  <TableCell sx={{ fontWeight: 800, color: 'text.secondary', fontSize: '0.78rem' }}>PRICE</TableCell>
                  <TableCell sx={{ fontWeight: 800, color: 'text.secondary', fontSize: '0.78rem' }}>STOCK</TableCell>
                  <TableCell sx={{ fontWeight: 800, color: 'text.secondary', fontSize: '0.78rem' }}>STATUS</TableCell>
                  <TableCell align="right" sx={{ fontWeight: 800, color: 'text.secondary', fontSize: '0.78rem' }}>ACTIONS</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {paginatedProducts.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} align="center" sx={{ py: 6 }}>
                      <Package size={40} color="#94A3B8" style={{ marginBottom: 8 }} />
                      <Typography variant="subtitle1" fontWeight={700}>
                        No products match your criteria
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        Try modifying search or filter parameters.
                      </Typography>
                    </TableCell>
                  </TableRow>
                ) : (
                  paginatedProducts.map((p) => (
                    <TableRow
                      key={p.id}
                      hover
                      sx={{
                        '&:last-child td, &:last-child th': { border: 0 },
                        transition: 'background-color 0.15s'
                      }}
                    >
                      {/* Image */}
                      <TableCell>
                        <Box
                          sx={{
                            width: 44,
                            height: 44,
                            borderRadius: 1.5,
                            backgroundColor: '#FCFAF6',
                            border: '1px solid #EAE5DC',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            p: 0.5
                          }}
                        >
                          <img src={p.image} alt={p.name} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                        </Box>
                      </TableCell>

                      {/* Name */}
                      <TableCell>
                        <Typography variant="body2" fontWeight={800} color="text.primary">
                          {p.name}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          SKU: DOS-{p.id} • ★ {p.rating || 4.8}
                        </Typography>
                      </TableCell>

                      {/* Category */}
                      <TableCell>
                        <Typography variant="body2" color="text.secondary">
                          {p.category}
                        </Typography>
                      </TableCell>

                      {/* Pack Size */}
                      <TableCell>
                        <Typography variant="body2" fontWeight={600}>
                          {p.packSize}
                        </Typography>
                      </TableCell>

                      {/* Price */}
                      <TableCell>
                        <Typography variant="body2" fontWeight={800} color="secondary.main">
                          ₹{p.price}
                        </Typography>
                        {p.originalPrice > p.price && (
                          <Typography variant="caption" sx={{ color: 'text.secondary', textDecoration: 'line-through' }}>
                            ₹{p.originalPrice}
                          </Typography>
                        )}
                      </TableCell>

                      {/* Stock */}
                      <TableCell>
                        <Typography variant="body2" fontWeight={700} color={p.stock <= 5 ? (p.stock === 0 ? 'error.main' : 'warning.main') : 'text.primary'}>
                          {p.stock} units
                        </Typography>
                      </TableCell>

                      {/* Status */}
                      <TableCell>
                        {getStatusChip(p.status, p.stock)}
                      </TableCell>

                      {/* Actions */}
                      <TableCell align="right">
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 0.5 }}>
                          <IconButton
                            size="small"
                            onClick={() => handleOpenPreview(p)}
                            sx={{ color: '#64748B', '&:hover': { color: 'primary.main', backgroundColor: '#F1F5F9' } }}
                            title="Preview"
                          >
                            <Eye size={17} />
                          </IconButton>

                          <IconButton
                            size="small"
                            onClick={() => handleOpenEdit(p)}
                            sx={{ color: '#64748B', '&:hover': { color: 'secondary.main', backgroundColor: '#FEF3C7' } }}
                            title="Edit"
                          >
                            <Edit2 size={17} />
                          </IconButton>

                          <IconButton
                            size="small"
                            onClick={() => handleOpenDelete(p)}
                            sx={{ color: '#64748B', '&:hover': { color: 'error.main', backgroundColor: '#FEE2E2' } }}
                            title="Delete"
                          >
                            <Trash2 size={17} />
                          </IconButton>
                        </Box>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>

          {/* Table Footer with Pagination */}
          <Box
            sx={{
              p: 2,
              px: 3,
              borderTop: '1px solid #E2E8F0',
              display: 'flex',
              flexDirection: { xs: 'column', sm: 'row' },
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: 2
            }}
          >
            <Typography variant="caption" color="text.secondary" fontWeight={600}>
              Showing {(page - 1) * rowsPerPage + 1} to {Math.min(page * rowsPerPage, filteredProducts.length)} of {filteredProducts.length} products
            </Typography>

            <Pagination
              count={totalPages}
              page={page}
              onChange={(e, val) => setPage(val)}
              color="primary"
              size="small"
              shape="rounded"
            />
          </Box>
        </Paper>
      </Box>

      {/* CRUD Modals */}
      <ProductFormDialog
        open={formDialogOpen}
        onClose={() => setFormDialogOpen(false)}
        onSave={handleSaveProduct}
        productToEdit={productToEdit}
      />

      <DeleteDialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        onConfirm={handleConfirmDelete}
        product={productToDelete}
      />

      <ProductPreviewDialog
        open={previewDialogOpen}
        onClose={() => setPreviewDialogOpen(false)}
        product={productToPreview}
      />

      {/* Snackbar Notifications */}
      <Snackbar
        open={toast.open}
        autoHideDuration={4000}
        onClose={() => setToast({ ...toast, open: false })}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert
          onClose={() => setToast({ ...toast, open: false })}
          severity={toast.severity}
          sx={{ width: '100%', borderRadius: 2, fontWeight: 700, boxShadow: '0 4px 14px rgba(0,0,0,0.1)' }}
        >
          {toast.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}
`;

fs.writeFileSync(path.join(__dirname, '../app/admin/dashboard/page.js'), adminDashboardPage, 'utf8');

console.log('Admin login and dashboard written successfully!');
