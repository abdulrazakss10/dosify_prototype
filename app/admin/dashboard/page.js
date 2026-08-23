'use client';

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
  LayoutDashboard
} from 'lucide-react';
import AdminSidebar from '../../../components/admin/AdminSidebar';
import DashboardOverview from '../../../components/admin/DashboardOverview';
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
  const { products, addProduct, updateProduct, deleteProduct } = useProducts();

  const [activeNavTab, setActiveNavTab] = useState('dashboard');
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);

  // Table filtering & search
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [page, setPage] = useState(1);
  const rowsPerPage = 6;

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
      router.replace('/login?role=admin');
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

  const totalPages = Math.ceil(filteredProducts.length / rowsPerPage) || 1;
  const paginatedProducts = filteredProducts.slice((page - 1) * rowsPerPage, page * rowsPerPage);

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
      <Box sx={{ display: 'flex', height: '100vh', overflow: 'hidden', backgroundColor: '#F8FAFC' }}>
      {/* Desktop Left Sidebar */}
      {!isMobile && (
    <Box sx={{ flexShrink: 0, height: '100vh', overflowY: 'auto' }}>
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
    mb: 3
  }}
>
  <Box>
    <Typography variant="h5" fontWeight={900} letterSpacing="-0.02em" color="text.primary">
      {activeNavTab === 'dashboard' ? 'Admin Overview & Analytics' : 'Product Catalog Management'}
    </Typography>
    <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
      {activeNavTab === 'dashboard'
        ? 'Real-time sales performance, inventory restock alerts, and order tracking.'
        : 'Manage inventory, live retail prices, real dosa food visuals, and stock.'}
    </Typography>
  </Box>

    <Box
      sx={{
        display: 'flex',
        flexWrap: 'nowrap',
        gap: 1.5,
        width: { xs: '100%', sm: 'auto' },
        overflowX: { xs: 'auto', sm: 'visible' },
      }}
    >
      <Button
        variant={activeNavTab === 'dashboard' ? 'contained' : 'outlined'}
        color="primary"
        onClick={() => setActiveNavTab('dashboard')}
        startIcon={<LayoutDashboard size={16} />}
        sx={{
          borderRadius: 1,
          fontWeight: 700,
          flexShrink: 0,
          whiteSpace: 'nowrap',
          px: 2.5,
        }}
      >
        Dashboard
      </Button>

      <Button
        variant={activeNavTab === 'products' ? 'contained' : 'outlined'}
        color="primary"
        onClick={() => setActiveNavTab('products')}
        startIcon={<Package size={16} />}
        sx={{
          borderRadius: 1,
          fontWeight: 700,
          flexShrink: 0,
          whiteSpace: 'nowrap',
          px: 2.5,
        }}
      >
        Products ({products.length})
      </Button>

      <Button
        variant="contained"
        color="secondary"
        onClick={handleOpenAdd}
        startIcon={<Plus size={16} />}
        sx={{
          fontWeight: 800,
          borderRadius: 1,
          boxShadow: '0 4px 14px rgba(217, 119, 6, 0.3)',
          flexShrink: 0,
          whiteSpace: 'nowrap',
          px: 2.5,
        }}
      >
        ADD PRODUCT
      </Button>
    </Box>
</Box>

        {/* View 1: Super Useful Dashboard Overview */}
        {activeNavTab === 'dashboard' && (
          <DashboardOverview
            onOpenAddProduct={handleOpenAdd}
            onNavigateProducts={() => setActiveNavTab('products')}
          />
        )}

        {/* View 2: Product Management Table (CRUD) */}
        {activeNavTab === 'products' && (
          <Box>
            {/* Table Filter & Search Controls */}
            <Paper
              elevation={0}
              sx={{
                p: 2.5,
                mb: 3,
                borderRadius: 1,
                border: '1px solid #E2E8F0',
                backgroundColor: '#FFFFFF',
                display: 'flex',
                flexDirection: { xs: 'column', md: 'row' },
                justifyContent: 'space-between',
                alignItems: { xs: 'stretch', md: 'center' },
                gap: 2
              }}
            >
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
                  '& .MuiOutlinedInput-root': { borderRadius: 1 }
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search size={18} color="#94A3B8" />
                    </InputAdornment>
                  )
                }}
              />

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
                      borderRadius: 1,
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
                borderRadius: 1,
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
                      <TableCell sx={{ fontWeight: 800, color: 'text.secondary', fontSize: '0.78rem' }}>FOOD IMAGE</TableCell>
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
                          <TableCell>
                            <Box
                              sx={{
                                width: 48,
                                height: 48,
                                borderRadius: 1,
                                overflow: 'hidden',
                                backgroundColor: '#FCFAF6',
                                border: '1px solid #EAE5DC'
                              }}
                            >
                              <img src={p.image} alt={p.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            </Box>
                          </TableCell>

                          <TableCell>
                            <Typography variant="body2" fontWeight={800} color="text.primary">
                              {p.name}
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                              SKU: DOS-{p.id} • ★ {p.rating || 4.8}
                            </Typography>
                          </TableCell>

                          <TableCell>
                            <Typography variant="body2" color="text.secondary">
                              {p.category}
                            </Typography>
                          </TableCell>

                          <TableCell>
                            <Typography variant="body2" fontWeight={600}>
                              {p.packSize}
                            </Typography>
                          </TableCell>

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

                          <TableCell>
                            <Typography variant="body2" fontWeight={700} color={p.stock <= 5 ? (p.stock === 0 ? 'error.main' : 'warning.main') : 'text.primary'}>
                              {p.stock} units
                            </Typography>
                          </TableCell>

                          <TableCell>
                            {getStatusChip(p.status, p.stock)}
                          </TableCell>

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
        )}
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
