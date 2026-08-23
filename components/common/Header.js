'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  AppBar,
  Toolbar,
  Box,
  Typography,
  Button,
  IconButton,
  Badge,
  InputBase,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Container,
  Paper,
  ClickAwayListener,
  Avatar,
  Chip,
  Menu,
  MenuItem,
  useMediaQuery,
  useTheme,
  Divider
} from '@mui/material';
import {
  Search,
  ShoppingBag,
  Menu as MenuIcon,
  X,
  Heart,
  User,
  LogOut,
  LayoutDashboard,
  ShieldCheck,
  ArrowRight
} from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useProducts } from '../../context/ProductContext';
import { useAuth } from '../../context/AuthContext';

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const { totalItems, openCart } = useCart();
  const { products } = useProducts();
  const { currentUser, isAdminAuthenticated, isUserAuthenticated, logout } = useAuth();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchOpen, setSearchOpen] = useState(false);
  const [userMenuAnchor, setUserMenuAnchor] = useState(null);

  // Filter products for live search preview
  const searchResults = searchQuery.trim()
    ? products.filter(
        (p) =>
          p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.category.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 5)
    : [];

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/shop?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
    }
  };

  const handleLogout = () => {
    setUserMenuAnchor(null);
    logout();
    router.push('/login');
  };

  const navLinks = [
    { label: 'HOME', href: '/' },
    { label: 'SHOP', href: '/shop' },
    { label: 'RECIPES', href: '/#recipes' },
    { label: 'HOW IT WORKS', href: '/#how-it-works' },
    ...(isAdminAuthenticated
      ? [{ label: 'ADMIN DASHBOARD', href: '/admin/dashboard' }]
      : [])
  ];

  const isActive = (href) => {
    if (href === '/') return pathname === '/';
     if (href.includes('#')) {
    return false;
  }
    return pathname.startsWith(href);
  };

  return (
    <>
      <AppBar
      //   position="sticky"
      //   elevation={0}
      //   // sx={{
      //   //   backgroundColor: '#FCFAF6',
      //   //   borderBottom: '1px solid #EAE5DC',
      //   //   color: 'text.primary',
      //   //   zIndex: (theme) => theme.zIndex.drawer - 1
      //   // }}
      //  sx={{
      //     top: 0,
      //     backgroundColor: 'rgba(252, 250, 246, 0.94)',
      //     backdropFilter: 'blur(12px)',
      //     WebkitBackdropFilter: 'blur(12px)',
      //     borderBottom: '1px solid #EAE5DC',
      //     color: 'text.primary',
      //     zIndex: (theme) => theme.zIndex.appBar,
      //   }}
       position="fixed"
       elevation={0}
        sx={{
          top: 0,
          left: 0,
          right: 0,
          width: '100%',
          backgroundColor: 'rgba(252, 250, 246, 0.96)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          borderBottom: '1px solid #EAE5DC',
          color: 'text.primary',
          zIndex: (theme) => theme.zIndex.appBar,
        }}
      >
        <Container maxWidth="xl">
          <Toolbar
            disableGutters
            sx={{
              height: { xs: 70, md: 80 },
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}
          >
            {/* 1. Left: Brand Logo */}
            <Box
              component={Link}
              href="/"
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1.2,
                textDecoration: 'none',
                color: 'inherit'
              }}
            >
              <Box
                sx={{
                  width: 40,
                  height: 40,
                  borderRadius: 2,
                  backgroundColor: 'primary.main',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#FFFFFF',
                  fontWeight: 900,
                  fontSize: '1.25rem',
                  boxShadow: '0 4px 10px rgba(30, 77, 43, 0.3)'
                }}
              >
                D
              </Box>
              <Box>
                <Typography
                  variant="h5"
                  sx={{
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                    fontWeight: 900,
                    letterSpacing: '0.08em',
                    color: 'primary.main',
                    lineHeight: 1.1
                  }}
                >
                  DOSIFY
                </Typography>
                <Typography
                  variant="caption"
                  sx={{
                    fontSize: '0.62rem',
                    fontWeight: 700,
                    letterSpacing: '0.12em',
                    color: 'secondary.main',
                    display: 'block',
                    textTransform: 'uppercase'
                  }}
                >
                  Instant Dosa Batter Mix
                </Typography>
              </Box>
            </Box>

            {/* 2. Center: Desktop Navigation */}
            {!isMobile && (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                {navLinks.map((link) => {
                  const active = isActive(link.href);
                  return (
                    <Box
                      key={link.label}
                      component={Link}
                      href={link.href}
                      sx={{
                        position: 'relative',
                        fontSize: '0.78rem',
                        fontWeight: 700,
                        letterSpacing: '0.055em',
                        color: active ? 'secondary.main' : 'text.primary',
                        transition: 'color 0.2s ease',
                        py: 1,
                        '&:hover': {
                          color: 'secondary.main'
                        },
                        '&::after': active
                          ? {
                              content: '""',
                              position: 'absolute',
                              bottom: 0,
                              left: '10%',
                              width: '80%',
                              height: 3,
                              borderRadius: 2,
                              backgroundColor: 'secondary.main'
                            }
                          : {}
                      }}
                    >
                      {link.label}
                    </Box>
                  );
                })}
              </Box>
            )}

            {/* 3. Right: Search, Auth Status & Cart */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 1, sm: 2 } }}>
              {/* Desktop Search Bar */}
              {!isMobile && (
                <ClickAwayListener onClickAway={() => setSearchOpen(false)}>
                  <Box sx={{ position: 'relative' }}>
                    <Paper
                      component="form"
                      onSubmit={handleSearchSubmit}
                      elevation={0}
                      sx={{
                        p: '2px 8px',
                        display: 'flex',
                        alignItems: 'center',
                        width: { md: 220, lg: 260 },
                        borderRadius: 1,
                        border: '1.5px solid #EAE5DC',
                        backgroundColor: '#FFFFFF',
                        transition: 'all 0.2s',
                        '&:hover, &:focus-within': {
                          borderColor: 'primary.main',
                          boxShadow: '0 2px 8px rgba(0,0,0,0.06)'
                        }
                      }}
                    >
                      <InputBase
                        placeholder="Search for dosas..."
                        value={searchQuery}
                        onChange={(e) => {
                          setSearchQuery(e.target.value);
                          setSearchOpen(true);
                        }}
                        onFocus={() => setSearchOpen(true)}
                        sx={{ ml: 1, flex: 1, fontSize: '0.875rem' }}
                      />
                      <IconButton type="submit" size="small" sx={{ p: '6px', color: 'text.secondary' }}>
                        <Search size={17} />
                      </IconButton>
                    </Paper>

                    {/* Live Search Popup */}
                    {searchOpen && searchResults.length > 0 && (
                      <Paper
                        elevation={4}
                        sx={{
                          position: 'absolute',
                          top: '110%',
                          right: 0,
                          left: 0,
                          zIndex: 100,
                          borderRadius: 1,
                          overflow: 'hidden',
                          border: '1px solid #EAE5DC'
                        }}
                      >
                        {searchResults.map((item) => (
                          <Box
                            key={item.id}
                            component={Link}
                            href={`/shop/${item.slug}`}
                            onClick={() => setSearchOpen(false)}
                            sx={{
                              p: 1.5,
                              display: 'flex',
                              alignItems: 'center',
                              gap: 1.5,
                              borderBottom: '1px solid #F1EFE9',
                              textDecoration: 'none',
                              color: 'text.primary',
                              '&:hover': { backgroundColor: '#F7F2EB' }
                            }}
                          >
                            <img
                              src={item.image}
                              alt={item.name}
                              style={{ width: 36, height: 36, objectFit: 'cover', borderRadius: 2 }}
                            />
                            <Box sx={{ flex: 1 }}>
                              <Typography variant="body2" fontWeight={700}>
                                {item.name}
                              </Typography>
                              <Typography variant="caption" color="text.secondary">
                                {item.category} • ₹{item.price}
                              </Typography>
                            </Box>
                          </Box>
                        ))}
                      </Paper>
                    )}
                  </Box>
                </ClickAwayListener>
              )}

              {/* User Profile / Login Toggle */}
              {isUserAuthenticated ? (
                <>
                  <Box
                    onClick={(e) => setUserMenuAnchor(e.currentTarget)}
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1,
                      p: '4px 10px',
                      borderRadius: 30,
                      backgroundColor: currentUser?.role === 'admin' ? '#FEF3C7' : '#DCFCE7',
                      border: '1px solid',
                      borderColor: currentUser?.role === 'admin' ? '#FDE68A' : '#BBF7D0',
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                      '&:hover': { opacity: 0.9 }
                    }}
                  >
                    <Avatar
                      sx={{
                        width: 28,
                        height: 28,
                        bgcolor: currentUser?.role === 'admin' ? 'secondary.main' : 'primary.main',
                        fontSize: '0.8rem',
                        fontWeight: 800
                      }}
                    >
                      {currentUser?.avatar || 'U'}
                    </Avatar>
                    <Typography variant="caption" fontWeight={800} color={currentUser?.role === 'admin' ? '#92400E' : '#14532D'} sx={{ display: { xs: 'none', sm: 'block' } }}>
                      {currentUser?.name}
                    </Typography>
                  </Box>

                  <Menu
                    anchorEl={userMenuAnchor}
                    open={Boolean(userMenuAnchor)}
                    onClose={() => setUserMenuAnchor(null)}
                    PaperProps={{ sx: { borderRadius: 1, minWidth: 190, mt: 1 } }}
                  >
                    <Box sx={{ px: 2, py: 1 }}>
                      <Typography variant="subtitle2" fontWeight={800}>
                        {currentUser?.name}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {currentUser?.email}
                      </Typography>
                    </Box>
                    <Divider sx={{ my: 0.5 }} />
                    {currentUser?.role === 'admin' ? (
                      <MenuItem component={Link} href="/admin/dashboard" onClick={() => setUserMenuAnchor(null)}>
                        <LayoutDashboard size={16} style={{ marginRight: 10 }} /> Admin Dashboard
                      </MenuItem>
                    ) : (
                      <MenuItem component={Link} href="/shop" onClick={() => setUserMenuAnchor(null)}>
                        <ShoppingBag size={16} style={{ marginRight: 10 }} /> Shop Catalog
                      </MenuItem>
                    )}
                    <MenuItem onClick={handleLogout} sx={{ color: 'error.main', fontWeight: 700 }}>
                      <LogOut size={16} style={{ marginRight: 10 }} /> Logout
                    </MenuItem>
                  </Menu>
                </>
              ) : (
                <Button
                  component={Link}
                  href="/login"
                  variant="outlined"
                  color="primary"
                  size="small"
                  startIcon={<User size={15} />}
                  sx={{ borderRadius: 1, px: 2, fontWeight: 800 }}
                >
                  Sign In
                </Button>
              )}

              {/* Cart Drawer Trigger */}
              <IconButton
                onClick={openCart}
                sx={{
                  backgroundColor: '#FFFFFF',
                  border: '1.5px solid #EAE5DC',
                  color: 'primary.main',
                  p: 1.1,
                  '&:hover': {
                    backgroundColor: 'primary.main',
                    color: '#FFFFFF',
                    borderColor: 'primary.main'
                  }
                }}
              >
                <Badge
                  badgeContent={totalItems}
                  color="secondary"
                  sx={{
                    '& .MuiBadge-badge': {
                      fontWeight: 800,
                      fontSize: '0.75rem'
                    }
                  }}
                >
                  <ShoppingBag size={21} />
                </Badge>
              </IconButton>

              {/* Mobile Hamburger Toggle */}
              {isMobile && (
                <IconButton
                  onClick={() => setMobileMenuOpen(true)}
                  sx={{ color: 'text.primary', ml: 0.5 }}
                >
                  <MenuIcon size={24} />
                </IconButton>
              )}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      {/* Mobile Navigation Drawer */}
      <Drawer
        anchor="left"
        open={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        PaperProps={{
          sx: {
            width: 280,
            backgroundColor: '#FCFAF6',
            p: 2
          }
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Box
              sx={{
                width: 32,
                height: 32,
                borderRadius: 1.5,
                backgroundColor: 'primary.main',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#FFFFFF',
                fontWeight: 900
              }}
            >
              D
            </Box>
            <Typography variant="h6" fontWeight={900} color="primary.main">
              DOSIFY
            </Typography>
          </Box>
          <IconButton onClick={() => setMobileMenuOpen(false)} size="small">
            <X size={20} />
          </IconButton>
        </Box>

        <List>
          {navLinks.map((link) => (
            <ListItem key={link.label} disablePadding sx={{ mb: 1 }}>
              <ListItemButton
                component={Link}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                sx={{
                  borderRadius: 1,
                  backgroundColor: isActive(link.href) ? '#FEF3C7' : 'transparent',
                  color: isActive(link.href) ? 'secondary.main' : 'text.primary',
                  fontWeight: 700
                }}
              >
                <ListItemText
                  primary={link.label}
                  primaryTypographyProps={{
                    fontWeight: 700,
                    letterSpacing: '0.05em'
                  }}
                />
                <ArrowRight size={16} />
              </ListItemButton>
            </ListItem>
          ))}

          {!isUserAuthenticated ? (
            <ListItem disablePadding sx={{ mt: 2 }}>
              <Button
                component={Link}
                href="/login"
                variant="contained"
                color="secondary"
                fullWidth
                onClick={() => setMobileMenuOpen(false)}
                sx={{ borderRadius: 2, fontWeight: 800 }}
              >
                Sign In / Login
              </Button>
            </ListItem>
          ) : (
            <ListItem disablePadding sx={{ mt: 2 }}>
              <Button
                variant="outlined"
                color="error"
                fullWidth
                onClick={() => {
                  setMobileMenuOpen(false);
                  handleLogout();
                }}
                startIcon={<LogOut size={16} />}
                sx={{ borderRadius: 2, fontWeight: 700 }}
              >
                Logout ({currentUser?.name})
              </Button>
            </ListItem>
          )}
        </List>
      </Drawer>
    </>
  );
}
