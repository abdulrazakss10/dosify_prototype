const fs = require('fs');

const loginPageContent = `'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import {
  Box,
  Container,
  Paper,
  Typography,
  Tabs,
  Tab,
  TextField,
  Button,
  IconButton,
  InputAdornment,
  Alert,
  Divider,
  Chip,
  Grid,
  Stack,
  useTheme
} from '@mui/material';
import {
  User,
  ShieldCheck,
  Lock,
  Mail,
  Eye,
  EyeOff,
  ArrowRight,
  Sparkles,
  ShoppingBag,
  Store,
  LayoutDashboard,
  CheckCircle2
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const theme = useTheme();
  const { login, loginAsRole, currentUser, isAuthLoaded } = useAuth();

  const [activeTab, setActiveTab] = useState(0); // 0: Customer, 1: Admin
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Sync role param from URL
  useEffect(() => {
    const roleParam = searchParams.get('role');
    if (roleParam === 'admin') {
      setActiveTab(1);
      setEmail('admin@dosify.com');
      setPassword('admin123');
    } else {
      setEmail('user@dosify.com');
      setPassword('user123');
    }
  }, [searchParams]);

  const handleTabChange = (e, val) => {
    setActiveTab(val);
    setError('');
    if (val === 0) {
      setEmail('user@dosify.com');
      setPassword('user123');
    } else {
      setEmail('admin@dosify.com');
      setPassword('admin123');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    setTimeout(() => {
      const forcedRole = activeTab === 1 ? 'admin' : 'user';
      const res = login(email, password, forcedRole);
      setLoading(false);

      if (res.success) {
        if (res.role === 'admin') {
          router.push('/admin/dashboard');
        } else {
          router.push('/');
        }
      } else {
        setError(res.message);
      }
    }, 400);
  };

  const handleQuickLogin = (role) => {
    const res = loginAsRole(role);
    if (res.success) {
      if (role === 'admin') {
        router.push('/admin/dashboard');
      } else {
        router.push('/');
      }
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundColor: '#FCFAF6',
        backgroundImage: 'radial-gradient(#EAE5DC 1px, transparent 1px)',
        backgroundSize: '24px 24px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        p: { xs: 2, sm: 3 }
      }}
    >
      {/* Brand Header */}
      <Box sx={{ textAlign: 'center', mb: 3.5 }}>
        <Box
          sx={{
            width: 54,
            height: 54,
            borderRadius: 2.5,
            backgroundColor: '#1E4D2B',
            color: '#FFFFFF',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 900,
            fontSize: '1.75rem',
            mx: 'auto',
            mb: 1.5,
            boxShadow: '0 8px 20px rgba(30, 77, 43, 0.3)'
          }}
        >
          D
        </Box>
        <Typography variant="h4" fontWeight={900} letterSpacing="0.06em" color="primary.main">
          DOSIFY
        </Typography>
        <Typography variant="caption" sx={{ color: 'secondary.main', fontWeight: 800, letterSpacing: '0.14em', textTransform: 'uppercase' }}>
          Instant Dosa Batter Mix • Portal Sign-In
        </Typography>
      </Box>

      {/* Main Login Card */}
      <Container maxWidth="sm">
        <Paper
          elevation={0}
          sx={{
            borderRadius: 4,
            border: '1.5px solid #EAE5DC',
            backgroundColor: '#FFFFFF',
            overflow: 'hidden',
            boxShadow: '0 12px 35px rgba(0,0,0,0.06)'
          }}
        >
          {/* Role Tabs */}
          <Box sx={{ borderBottom: '1px solid #EAE5DC', backgroundColor: '#F8FAFC' }}>
            <Tabs
              value={activeTab}
              onChange={handleTabChange}
              variant="fullWidth"
              textColor="primary"
              indicatorColor="secondary"
              sx={{
                '& .MuiTab-root': {
                  py: 2.2,
                  fontWeight: 800,
                  fontSize: '0.95rem'
                }
              }}
            >
              <Tab
                icon={<User size={18} />}
                iconPosition="start"
                label="Customer Login"
              />
              <Tab
                icon={<ShieldCheck size={18} />}
                iconPosition="start"
                label="Admin Portal"
              />
            </Tabs>
          </Box>

          <Box sx={{ p: { xs: 3, sm: 4.5 } }}>
            {/* Context Badge */}
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                p: 1.5,
                mb: 3,
                borderRadius: 2,
                backgroundColor: activeTab === 0 ? '#F0FDF4' : '#EFF6FF',
                border: '1px solid',
                borderColor: activeTab === 0 ? '#DCFCE7' : '#DBEAFE'
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.2 }}>
                {activeTab === 0 ? (
                  <ShoppingBag size={20} color="#16A34A" />
                ) : (
                  <LayoutDashboard size={20} color="#2563EB" />
                )}
                <Box>
                  <Typography variant="subtitle2" fontWeight={800} color={activeTab === 0 ? '#15803D' : '#1D4ED8'}>
                    {activeTab === 0 ? 'Customer / Shopper Access' : 'Administrator Access'}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {activeTab === 0
                      ? 'Access Home, Shop, Product Details & Cart'
                      : 'Access Dashboard, Inventory, Orders & Product CRUD'}
                  </Typography>
                </Box>
              </Box>
            </Box>

            {error && (
              <Alert severity="error" sx={{ mb: 2.5, borderRadius: 2 }}>
                {error}
              </Alert>
            )}

            {/* Form */}
            <Box component="form" onSubmit={handleSubmit}>
              <Box sx={{ mb: 2.5 }}>
                <Typography variant="caption" fontWeight={700} color="text.secondary" sx={{ mb: 0.8, display: 'block' }}>
                  Email Address
                </Typography>
                <TextField
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={activeTab === 0 ? 'user@dosify.com' : 'admin@dosify.com'}
                  fullWidth
                  size="small"
                  required
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Mail size={17} color="#94A3B8" />
                      </InputAdornment>
                    )
                  }}
                  sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                />
              </Box>

              <Box sx={{ mb: 3 }}>
                <Typography variant="caption" fontWeight={700} color="text.secondary" sx={{ mb: 0.8, display: 'block' }}>
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
                        <Lock size={17} color="#94A3B8" />
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
                  sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                />
              </Box>

              <Button
                type="submit"
                variant="contained"
                color={activeTab === 0 ? 'primary' : 'secondary'}
                fullWidth
                size="large"
                disabled={loading}
                endIcon={<ArrowRight size={18} />}
                sx={{
                  py: 1.4,
                  fontWeight: 800,
                  fontSize: '0.95rem',
                  borderRadius: 2,
                  boxShadow: activeTab === 0 ? '0 4px 14px rgba(30, 77, 43, 0.3)' : '0 4px 14px rgba(217, 119, 6, 0.3)'
                }}
              >
                {loading
                  ? 'Signing in...'
                  : activeTab === 0
                  ? 'Login to Shop'
                  : 'Enter Admin Dashboard'}
              </Button>
            </Box>

            <Divider sx={{ my: 3 }} />

            {/* Fast 1-Click Demo Logins */}
            <Typography variant="caption" fontWeight={700} color="text.secondary" align="center" display="block" sx={{ mb: 1.5 }}>
              ⚡ FAST 1-CLICK DEMO LOGIN:
            </Typography>

            <Grid container spacing={1.5}>
              <Grid item xs={6}>
                <Button
                  variant="outlined"
                  fullWidth
                  onClick={() => handleQuickLogin('user')}
                  startIcon={<User size={16} />}
                  sx={{
                    py: 1,
                    fontSize: '0.82rem',
                    fontWeight: 700,
                    borderRadius: 2,
                    borderColor: '#16A34A',
                    color: '#15803D',
                    backgroundColor: '#F0FDF4',
                    '&:hover': {
                      backgroundColor: '#DCFCE7',
                      borderColor: '#15803D'
                    }
                  }}
                >
                  Customer Demo
                </Button>
              </Grid>

              <Grid item xs={6}>
                <Button
                  variant="outlined"
                  fullWidth
                  onClick={() => handleQuickLogin('admin')}
                  startIcon={<ShieldCheck size={16} />}
                  sx={{
                    py: 1,
                    fontSize: '0.82rem',
                    fontWeight: 700,
                    borderRadius: 2,
                    borderColor: '#D97706',
                    color: '#B45309',
                    backgroundColor: '#FEF3C7',
                    '&:hover': {
                      backgroundColor: '#FDE68A',
                      borderColor: '#B45309'
                    }
                  }}
                >
                  Admin Demo
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}
`;

fs.writeFileSync('app/login/page.js', loginPageContent, 'utf8');

// Update app/admin/login/page.js to reuse / redirect seamlessly
const adminLoginRedirect = `'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import LoginPage from '../../login/page';

export default function AdminLoginPage() {
  return <LoginPage />;
}
`;

fs.writeFileSync('app/admin/login/page.js', adminLoginRedirect, 'utf8');
console.log('Login pages created successfully!');
