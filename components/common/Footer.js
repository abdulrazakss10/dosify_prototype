'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Box,
  Container,
  Grid,
  Typography,
  TextField,
  Button,
  Divider,
  IconButton,
  Chip,
  Alert
} from '@mui/material';
import {
  Instagram,
  Facebook,
  Twitter,
  Mail,
  Phone,
  MapPin,
  CheckCircle,
  Sparkles,
  ShieldCheck
} from 'lucide-react';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: '#14381E', // Deep Forest Brand Background
        color: '#F1F5F9',
        pt: { xs: 6, md: 8 },
        pb: 4,
        borderTop: '4px solid #D97706'
      }}
    >
      <Container maxWidth="xl">
        <Grid container spacing={4}>
          {/* Brand Info */}
          <Grid item xs={12} md={4}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
              <Box
                sx={{
                  width: 44,
                  height: 44,
                  borderRadius: 2,
                  backgroundColor: '#D97706',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#FFFFFF',
                  fontWeight: 900,
                  fontSize: '1.4rem'
                }}
              >
                D
              </Box>
              <Box>
                <Typography variant="h5" fontWeight={900} letterSpacing="0.08em" color="#FFFFFF">
                  DOSIFY
                </Typography>
                <Typography variant="caption" sx={{ color: '#FDE047', letterSpacing: '0.1em', fontWeight: 700 }}>
                  INSTANT DOSA BATTER MIX
                </Typography>
              </Box>
            </Box>

            <Typography variant="body2" sx={{ color: '#CBD5E1', mb: 2.5, lineHeight: 1.7, maxWidth: 360 }}>
              Instant Dosa Batter Mix. Fresh. Fast. Favorite. Delivering crisp, golden, restaurant-style South Indian dosas without traditional lengthy fermentation.
            </Typography>

            <Box sx={{ display: 'flex', gap: 1.5 }}>
              <IconButton size="small" sx={{ color: '#F1F5F9', backgroundColor: 'rgba(255,255,255,0.08)', '&:hover': { backgroundColor: '#D97706' } }}>
                <Instagram size={18} />
              </IconButton>
              <IconButton size="small" sx={{ color: '#F1F5F9', backgroundColor: 'rgba(255,255,255,0.08)', '&:hover': { backgroundColor: '#D97706' } }}>
                <Facebook size={18} />
              </IconButton>
              <IconButton size="small" sx={{ color: '#F1F5F9', backgroundColor: 'rgba(255,255,255,0.08)', '&:hover': { backgroundColor: '#D97706' } }}>
                <Twitter size={18} />
              </IconButton>
            </Box>
          </Grid>

          {/* Quick Navigation Links */}
          <Grid item xs={6} sm={3} md={2}>
            <Typography variant="subtitle2" fontWeight={800} color="#FFFFFF" letterSpacing="0.05em" sx={{ mb: 2 }}>
              DISCOVER
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.2 }}>
              <Link href="/" style={{ color: '#CBD5E1', fontSize: '0.875rem' }}>Home</Link>
              <Link href="/shop" style={{ color: '#CBD5E1', fontSize: '0.875rem' }}>Shop All Products</Link>
              <Link href="/#how-it-works" style={{ color: '#CBD5E1', fontSize: '0.875rem' }}>How It Works</Link>
              <Link href="/#recipes" style={{ color: '#CBD5E1', fontSize: '0.875rem' }}>Dosa Recipes</Link>
              <Link href="/#why-dosify" style={{ color: '#CBD5E1', fontSize: '0.875rem' }}>Why DOSIFY?</Link>
            </Box>
          </Grid>

          {/* Shop Categories */}
          <Grid item xs={6} sm={3} md={2}>
            <Typography variant="subtitle2" fontWeight={800} color="#FFFFFF" letterSpacing="0.05em" sx={{ mb: 2 }}>
              PRODUCTS
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.2 }}>
              <Link href="/shop?category=Dosa Mix" style={{ color: '#CBD5E1', fontSize: '0.875rem' }}>Classic Dosa Mix</Link>
              <Link href="/shop?category=Masala Mix" style={{ color: '#CBD5E1', fontSize: '0.875rem' }}>Mysore Masala Mix</Link>
              <Link href="/shop?category=Millet Mix" style={{ color: '#CBD5E1', fontSize: '0.875rem' }}>Millet Superfood</Link>
              <Link href="/shop?category=Combo Packs" style={{ color: '#CBD5E1', fontSize: '0.875rem' }}>Family Combos</Link>
              <Link href="/admin/login" style={{ color: '#FDE047', fontSize: '0.875rem', fontWeight: 700 }}>Admin Portal →</Link>
            </Box>
          </Grid>

          {/* Newsletter Form */}
          <Grid item xs={12} sm={6} md={4}>
            <Typography variant="subtitle2" fontWeight={800} color="#FFFFFF" letterSpacing="0.05em" sx={{ mb: 1 }}>
              STAY CRISPY & UPDATED
            </Typography>
            <Typography variant="body2" sx={{ color: '#94A3B8', mb: 2 }}>
              Subscribe to get secret South Indian breakfast recipes and 10% off your first batter box!
            </Typography>

            {subscribed ? (
              <Alert severity="success" sx={{ backgroundColor: 'rgba(22, 163, 74, 0.2)', color: '#86EFAC' }}>
                🎉 You&apos;re in! Use coupon <strong>DOSA20</strong> for 20% off.
              </Alert>
            ) : (
              <Box component="form" onSubmit={handleSubscribe} sx={{ display: 'flex', gap: 1 }}>
                <TextField
                  placeholder="Enter your email"
                  size="small"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  fullWidth
                  sx={{
                    backgroundColor: 'rgba(255, 255, 255, 0.08)',
                    borderRadius: 1,
                    '& input': { color: '#FFFFFF', fontSize: '0.875rem' },
                    '& .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(255,255,255,0.2)' }
                  }}
                />
                <Button
                  type="submit"
                  variant="contained"
                  color="secondary"
                  sx={{ flexShrink: 0, px: 2.5, borderRadius: 1 }}
                >
                  Join
                </Button>
              </Box>
            )}

            <Box sx={{ mt: 2.5, display: 'flex', alignItems: 'center', gap: 1, color: '#94A3B8' }}>
              <ShieldCheck size={16} color="#86EFAC" />
              <Typography variant="caption">
                No spam, 100% natural ingredients & clean emails.
              </Typography>
            </Box>
          </Grid>
        </Grid>

        <Divider sx={{ my: 4, borderColor: 'rgba(255, 255, 255, 0.12)' }} />

        {/* Bottom Bar */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 2,
            color: '#94A3B8',
            fontSize: '0.8rem'
          }}
        >
          <Typography variant="caption" sx={{ color: '#94A3B8' }}>
            © {new Date().getFullYear()} DOSIFY Foods Pvt. Ltd. All rights reserved. Client Prototype Demo.
          </Typography>

          <Box sx={{ display: 'flex', gap: 3 }}>
            <span style={{ color: '#64748B' }}>Privacy Policy</span>
            <span style={{ color: '#64748B' }}>Terms of Service</span>
            <span style={{ color: '#64748B' }}>FSSAI Lic. #10022043000124</span>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
