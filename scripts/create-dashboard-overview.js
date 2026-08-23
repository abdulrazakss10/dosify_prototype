const fs = require('fs');

const content = `'use client';

import React, { useState } from 'react';
import {
  Box,
  Grid,
  Paper,
  Typography,
  Button,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  LinearProgress,
  IconButton,
  Divider,
  Stack,
  Alert
} from '@mui/material';
import {
  TrendingUp,
  Package,
  ShoppingCart,
  DollarSign,
  AlertTriangle,
  CheckCircle2,
  Plus
} from 'lucide-react';
import { ADMIN_STATS, REVENUE_CHART_DATA, RECENT_ORDERS } from '../../data/mockData';
import { useProducts } from '../../context/ProductContext';

export default function DashboardOverview({ onOpenAddProduct, onNavigateProducts }) {
  const { products, updateProduct } = useProducts();
  const [orders, setOrders] = useState(RECENT_ORDERS);
  const [restockSuccess, setRestockSuccess] = useState('');

  const lowStockProducts = products.filter(
    (p) => p.stock <= 5 || p.status === 'Low Stock' || p.status === 'Out of Stock'
  );

  const handleRestock = (productId) => {
    const p = products.find((prod) => prod.id === productId);
    if (p) {
      updateProduct(p.id, { stock: p.stock + 15, status: 'Active' });
      setRestockSuccess("Restocked 15 units for " + p.name + "!");
      setTimeout(() => setRestockSuccess(''), 3500);
    }
  };

  const handleUpdateOrderStatus = (orderId, newStatus) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o))
    );
  };

  const maxRevenue = Math.max(...REVENUE_CHART_DATA.map((d) => d.revenue));

  return (
    <Box>
      {/* Restock Toast Alert */}
      {restockSuccess && (
        <Alert severity="success" sx={{ mb: 3, borderRadius: 2, fontWeight: 700 }}>
          {restockSuccess}
        </Alert>
      )}

      {/* Top 4 KPI Metrics */}
      <Grid container spacing={2.5} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Paper
            elevation={0}
            sx={{
              p: 2.8,
              borderRadius: 3,
              border: '1px solid #DBEAFE',
              backgroundColor: '#FFFFFF'
            }}
          >
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="caption" fontWeight={800} color="text.secondary">
                TOTAL REVENUE
              </Typography>
              <Chip label="+18.4%" size="small" sx={{ backgroundColor: '#DCFCE7', color: '#15803D', fontWeight: 800, height: 22 }} />
            </Box>
            <Typography variant="h4" fontWeight={900} color="text.primary" sx={{ my: 0.8 }}>
              {ADMIN_STATS.revenue}
            </Typography>
            <Typography variant="caption" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <TrendingUp size={13} color="#16A34A" /> Avg order value: <strong>{ADMIN_STATS.avgOrderValue}</strong>
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Paper
            elevation={0}
            sx={{
              p: 2.8,
              borderRadius: 3,
              border: '1px solid #DCFCE7',
              backgroundColor: '#FFFFFF'
            }}
          >
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="caption" fontWeight={800} color="text.secondary">
                TOTAL ORDERS
              </Typography>
              <Chip label="99.2% On-Time" size="small" sx={{ backgroundColor: '#E0F2FE', color: '#0369A1', fontWeight: 800, height: 22 }} />
            </Box>
            <Typography variant="h4" fontWeight={900} color="text.primary" sx={{ my: 0.8 }}>
              {ADMIN_STATS.totalOrders}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Fulfilled across India
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Paper
            elevation={0}
            sx={{
              p: 2.8,
              borderRadius: 3,
              border: '1px solid #FEF3C7',
              backgroundColor: '#FFFFFF'
            }}
          >
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="caption" fontWeight={800} color="text.secondary">
                LIVE CATALOG
              </Typography>
              <Chip label={products.length + " Products"} size="small" sx={{ backgroundColor: '#FEF3C7', color: '#B45309', fontWeight: 800, height: 22 }} />
            </Box>
            <Typography variant="h4" fontWeight={900} color="text.primary" sx={{ my: 0.8 }}>
              {products.filter((p) => p.stock > 0).length} <span style={{ fontSize: '1rem', color: '#64748B' }}>Active</span>
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Instant batter mixes
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Paper
            elevation={0}
            sx={{
              p: 2.8,
              borderRadius: 3,
              border: '1px solid #FEE2E2',
              backgroundColor: '#FFFFFF'
            }}
          >
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="caption" fontWeight={800} color="text.secondary">
                LOW STOCK ALERTS
              </Typography>
              <Chip label={lowStockProducts.length + " Needs Restock"} size="small" sx={{ backgroundColor: '#FEE2E2', color: '#DC2626', fontWeight: 800, height: 22 }} />
            </Box>
            <Typography variant="h4" fontWeight={900} color="error.main" sx={{ my: 0.8 }}>
              {lowStockProducts.length}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Items under 5 units threshold
            </Typography>
          </Paper>
        </Grid>
      </Grid>

      {/* Row 2: 7-Day Revenue Visualizer & Top Selling Mixes */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {/* Left: Revenue Visualizer Chart */}
        <Grid item xs={12} lg={8}>
          <Paper
            elevation={0}
            sx={{
              p: 3,
              borderRadius: 3,
              border: '1px solid #E2E8F0',
              backgroundColor: '#FFFFFF',
              height: '100%'
            }}
          >
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
              <Box>
                <Typography variant="subtitle1" fontWeight={900} color="text.primary">
                  Weekly Sales & Revenue Trend
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Daily revenue comparison for current week
                </Typography>
              </Box>
              <Chip label="Live Metrics" color="success" size="small" sx={{ fontWeight: 800 }} />
            </Box>

            {/* Custom Interactive Bar Visualizer */}
            <Box sx={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', height: 210, pt: 2, px: 2 }}>
              {REVENUE_CHART_DATA.map((item) => {
                const heightPercent = Math.round((item.revenue / maxRevenue) * 100);
                return (
                  <Box key={item.day} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1 }}>
                    <Typography variant="caption" fontWeight={700} color="secondary.main" sx={{ mb: 1, fontSize: '0.72rem' }}>
                      ₹{(item.revenue / 1000).toFixed(1)}k
                    </Typography>
                    <Box
                      sx={{
                        width: { xs: 24, sm: 36 },
                        height: (heightPercent * 1.4) + "px",
                        borderRadius: '6px 6px 0 0',
                        backgroundColor: item.day === 'Sun' ? '#D97706' : '#1E4D2B',
                        transition: 'all 0.3s ease',
                        cursor: 'pointer',
                        '&:hover': {
                          opacity: 0.85,
                          transform: 'scaleY(1.04)'
                        }
                      }}
                    />
                    <Typography variant="caption" fontWeight={700} color="text.secondary" sx={{ mt: 1.2 }}>
                      {item.day}
                    </Typography>
                  </Box>
                );
              })}
            </Box>
          </Paper>
        </Grid>

        {/* Right: Top Selling Products */}
        <Grid item xs={12} lg={4}>
          <Paper
            elevation={0}
            sx={{
              p: 3,
              borderRadius: 3,
              border: '1px solid #E2E8F0',
              backgroundColor: '#FFFFFF',
              height: '100%'
            }}
          >
            <Typography variant="subtitle1" fontWeight={900} color="text.primary" gutterBottom>
              Top Selling Dosa Mixes
            </Typography>
            <Typography variant="caption" color="text.secondary" display="block" sx={{ mb: 3 }}>
              Contribution to monthly sales
            </Typography>

            <Stack spacing={2.5}>
              <Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                  <Typography variant="body2" fontWeight={700}>Classic Dosa Mix (500g)</Typography>
                  <Typography variant="caption" fontWeight={800} color="primary.main">38% (94 sold)</Typography>
                </Box>
                <LinearProgress variant="determinate" value={78} color="primary" sx={{ height: 8, borderRadius: 4 }} />
              </Box>

              <Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                  <Typography variant="body2" fontWeight={700}>Mysore Masala Mix (700g)</Typography>
                  <Typography variant="caption" fontWeight={800} color="secondary.main">28% (68 sold)</Typography>
                </Box>
                <LinearProgress variant="determinate" value={62} color="secondary" sx={{ height: 8, borderRadius: 4 }} />
              </Box>

              <Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                  <Typography variant="body2" fontWeight={700}>Millet Superfood Mix</Typography>
                  <Typography variant="caption" fontWeight={800}>18% (44 sold)</Typography>
                </Box>
                <LinearProgress variant="determinate" value={42} sx={{ height: 8, borderRadius: 4, backgroundColor: '#F1F5F9', '& .MuiLinearProgress-bar': { backgroundColor: '#10B981' } }} />
              </Box>

              <Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                  <Typography variant="body2" fontWeight={700}>Family Combo Pack</Typography>
                  <Typography variant="caption" fontWeight={800}>16% (39 sold)</Typography>
                </Box>
                <LinearProgress variant="determinate" value={35} sx={{ height: 8, borderRadius: 4, backgroundColor: '#F1F5F9', '& .MuiLinearProgress-bar': { backgroundColor: '#F59E0B' } }} />
              </Box>
            </Stack>
          </Paper>
        </Grid>
      </Grid>

      {/* Row 3: Low Stock Restock Quick-Action Box */}
      {lowStockProducts.length > 0 && (
        <Paper
          elevation={0}
          sx={{
            p: 3,
            mb: 4,
            borderRadius: 3,
            border: '1.5px solid #FDE68A',
            backgroundColor: '#FFFBEB'
          }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <AlertTriangle size={20} color="#D97706" />
              <Typography variant="subtitle1" fontWeight={900} color="#92400E">
                Low Inventory Action Required ({lowStockProducts.length} Items)
              </Typography>
            </Box>
            <Button
              size="small"
              onClick={onNavigateProducts}
              sx={{ color: '#B45309', fontWeight: 800 }}
            >
              View Full Catalog →
            </Button>
          </Box>

          <Grid container spacing={2}>
            {lowStockProducts.map((prod) => (
              <Grid item xs={12} sm={6} md={4} key={prod.id}>
                <Paper
                  elevation={0}
                  sx={{
                    p: 2,
                    borderRadius: 2,
                    backgroundColor: '#FFFFFF',
                    border: '1px solid #FCD34D',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                    <img src={prod.image} alt={prod.name} style={{ width: 42, height: 42, objectFit: 'cover', borderRadius: 4 }} />
                    <Box>
                      <Typography variant="subtitle2" fontWeight={800}>
                        {prod.name}
                      </Typography>
                      <Typography variant="caption" color="error.main" fontWeight={700}>
                        Only {prod.stock} left in stock
                      </Typography>
                    </Box>
                  </Box>

                  <Button
                    size="small"
                    variant="contained"
                    color="secondary"
                    onClick={() => handleRestock(prod.id)}
                    startIcon={<Plus size={14} />}
                    sx={{ borderRadius: 1.5, fontWeight: 800, fontSize: '0.75rem', px: 1.5 }}
                  >
                    Restock +15
                  </Button>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Paper>
      )}

      {/* Row 4: Recent Orders Management Table */}
      <Paper
        elevation={0}
        sx={{
          borderRadius: 3,
          border: '1px solid #E2E8F0',
          backgroundColor: '#FFFFFF',
          overflow: 'hidden'
        }}
      >
        <Box sx={{ p: 3, pb: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box>
            <Typography variant="subtitle1" fontWeight={900} color="text.primary">
              Recent Customer Orders
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Latest transactions placed on the storefront
            </Typography>
          </Box>
          <Chip label="5 Recent Orders" size="small" sx={{ fontWeight: 700 }} />
        </Box>

        <TableContainer>
          <Table sx={{ minWidth: 700 }}>
            <TableHead sx={{ backgroundColor: '#F8FAFC' }}>
              <TableRow>
                <TableCell sx={{ fontWeight: 800, color: 'text.secondary', fontSize: '0.78rem' }}>ORDER ID</TableCell>
                <TableCell sx={{ fontWeight: 800, color: 'text.secondary', fontSize: '0.78rem' }}>CUSTOMER</TableCell>
                <TableCell sx={{ fontWeight: 800, color: 'text.secondary', fontSize: '0.78rem' }}>ITEMS ORDERED</TableCell>
                <TableCell sx={{ fontWeight: 800, color: 'text.secondary', fontSize: '0.78rem' }}>AMOUNT</TableCell>
                <TableCell sx={{ fontWeight: 800, color: 'text.secondary', fontSize: '0.78rem' }}>PAYMENT</TableCell>
                <TableCell sx={{ fontWeight: 800, color: 'text.secondary', fontSize: '0.78rem' }}>STATUS</TableCell>
                <TableCell align="right" sx={{ fontWeight: 800, color: 'text.secondary', fontSize: '0.78rem' }}>UPDATE STATUS</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders.map((ord) => (
                <TableRow key={ord.id} hover>
                  <TableCell>
                    <Typography variant="body2" fontWeight={800} color="primary.main">
                      #{ord.id}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {ord.date}
                    </Typography>
                  </TableCell>

                  <TableCell>
                    <Typography variant="body2" fontWeight={700}>
                      {ord.customer}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {ord.address}
                    </Typography>
                  </TableCell>

                  <TableCell>
                    <Typography variant="body2" color="text.secondary">
                      {ord.items}
                    </Typography>
                  </TableCell>

                  <TableCell>
                    <Typography variant="subtitle2" fontWeight={900} color="secondary.main">
                      {ord.amount}
                    </Typography>
                  </TableCell>

                  <TableCell>
                    <Typography variant="caption" fontWeight={600}>
                      {ord.payment}
                    </Typography>
                  </TableCell>

                  <TableCell>
                    <Chip
                      label={ord.status}
                      size="small"
                      sx={{
                        fontWeight: 800,
                        fontSize: '0.72rem',
                        backgroundColor:
                          ord.status === 'Delivered'
                            ? '#DCFCE7'
                            : ord.status === 'Shipped'
                            ? '#E0F2FE'
                            : '#FEF3C7',
                        color:
                          ord.status === 'Delivered'
                            ? '#15803D'
                            : ord.status === 'Shipped'
                            ? '#0369A1'
                            : '#B45309'
                      }}
                    />
                  </TableCell>

                  <TableCell align="right">
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
                      {ord.status === 'Processing' && (
                        <Button
                          size="small"
                          variant="outlined"
                          onClick={() => handleUpdateOrderStatus(ord.id, 'Shipped')}
                          sx={{ fontSize: '0.72rem', py: 0.4, borderRadius: 1.5 }}
                        >
                          Mark Shipped
                        </Button>
                      )}
                      {ord.status === 'Shipped' && (
                        <Button
                          size="small"
                          variant="contained"
                          color="success"
                          onClick={() => handleUpdateOrderStatus(ord.id, 'Delivered')}
                          sx={{ fontSize: '0.72rem', py: 0.4, borderRadius: 1.5 }}
                        >
                          Mark Delivered
                        </Button>
                      )}
                      {ord.status === 'Delivered' && (
                        <CheckCircle2 size={18} color="#16A34A" />
                      )}
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
}
`;

fs.writeFileSync('components/admin/DashboardOverview.js', content, 'utf8');
console.log('DashboardOverview written successfully!');
