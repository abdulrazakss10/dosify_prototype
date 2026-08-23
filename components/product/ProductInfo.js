'use client';

import React, { useState } from 'react';
import {
  Box,
  Typography,
  Rating,
  Chip,
  Button,
  IconButton,
  Grid,
  Divider,
  Paper,
  Stack,
  useTheme
} from '@mui/material';
import {
  Plus,
  Minus,
  ShoppingBag,
  Zap,
  ShieldCheck,
  Sparkles,
  Flame,
  Clock,
  CheckCircle2
} from 'lucide-react';
import { useCart } from '../../context/CartContext';

export default function ProductInfo({ product }) {
  const theme = useTheme();
  const { addToCart, openCheckout } = useCart();

  // Pack size selection
  const packSizes = product.packSizesAvailable && product.packSizesAvailable.length > 0
    ? product.packSizesAvailable
    : [
        { size: '500g', price: product.price, originalPrice: product.originalPrice, servings: '10-12 Dosas' },
        { size: '700g', price: Math.round(product.price * 1.35), originalPrice: Math.round(product.originalPrice * 1.35), servings: '15-18 Dosas' },
        { size: '1kg', price: Math.round(product.price * 1.7), originalPrice: Math.round(product.originalPrice * 1.7), servings: '22-25 Dosas' }
      ];

  const [selectedPackIndex, setSelectedPackIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);

  const currentPack = packSizes[selectedPackIndex] || packSizes[0];
  const currentPrice = currentPack.price;
  const currentOriginalPrice = currentPack.originalPrice;
  const discount = currentOriginalPrice > currentPrice
    ? Math.round(((currentOriginalPrice - currentPrice) / currentOriginalPrice) * 100)
    : 0;

  const isOutOfStock = product.stock <= 0 || product.status === 'Out of Stock';

  const handleAddToCart = () => {
    addToCart(product, quantity, currentPack.size, currentPrice);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity, currentPack.size, currentPrice);
    openCheckout();
  };

  return (
    <Box>
      {/* Title */}
      <Typography variant="h3" fontWeight={900} letterSpacing="-0.02em" color="text.primary" gutterBottom>
        {product.name}
      </Typography>

      {/* Ratings & Reviews */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
        <Rating
          value={product.rating || 4.8}
          precision={0.1}
          size="medium"
          readOnly
          sx={{ color: '#F59E0B' }}
        />
        <Typography variant="subtitle2" fontWeight={800} color="text.primary">
          {product.rating || 4.8}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          ({product.reviews || 124} customer reviews)
        </Typography>
      </Box>

      {/* Pricing Row */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 3 }}>
        <Typography variant="h4" fontWeight={900} color="secondary.main">
          ₹{currentPrice}
        </Typography>

        {currentOriginalPrice > currentPrice && (
          <Typography
            variant="h6"
            sx={{
              color: 'text.secondary',
              textDecoration: 'line-through',
              fontWeight: 500
            }}
          >
            ₹{currentOriginalPrice}
          </Typography>
        )}

        {discount > 0 && (
          <Chip
            label={`${discount}% OFF`}
            size="small"
            sx={{
              backgroundColor: '#FEF3C7',
              color: '#B45309',
              fontWeight: 800,
              border: '1px solid #FDE68A'
            }}
          />
        )}
      </Box>

      <Divider sx={{ my: 2.5 }} />

      {/* Pack Size Selector */}
      <Box sx={{ mb: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', mb: 1.5 }}>
          <Typography variant="subtitle2" fontWeight={800} color="text.primary">
            Select Pack Size:
          </Typography>
          <Typography variant="caption" color="text.secondary" fontWeight={600}>
            Yields: <strong>{currentPack.servings}</strong>
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5 }}>
          {packSizes.map((pack, idx) => {
            const isSelected = selectedPackIndex === idx;
            return (
              <Button
                key={pack.size}
                variant={isSelected ? 'contained' : 'outlined'}
                onClick={() => setSelectedPackIndex(idx)}
                sx={{
                  py: 1.2,
                  px: 2.5,
                  borderRadius: 1,
                  fontWeight: 800,
                  fontSize: '0.9rem',
                  backgroundColor: isSelected ? '#1E4D2B' : '#FFFFFF',
                  color: isSelected ? '#FFFFFF' : 'text.primary',
                  borderColor: isSelected ? '#1E4D2B' : '#CBD5E1',
                  '&:hover': {
                    backgroundColor: isSelected ? '#14381E' : '#F8FAFC',
                    borderColor: '#1E4D2B'
                  }
                }}
              >
                {pack.size}
              </Button>
            );
          })}
        </Box>
      </Box>

      {/* Quantity & Action CTAs */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="subtitle2" fontWeight={800} color="text.primary" sx={{ mb: 1.5 }}>
          Quantity:
        </Typography>

        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, alignItems: 'center' }}>
          {/* Counter */}
          <Box
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
              border: '1.5px solid #CBD5E1',
              borderRadius: 1,
              backgroundColor: '#FFFFFF',
              p: 0.5
            }}
          >
            <IconButton
              size="small"
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              disabled={quantity <= 1 || isOutOfStock}
              sx={{ p: 0.8 }}
            >
              <Minus size={16} />
            </IconButton>
            <Typography
              variant="body1"
              fontWeight={800}
              sx={{ px: 2, minWidth: 32, textAlign: 'center' }}
            >
              {quantity}
            </Typography>
            <IconButton
              size="small"
              onClick={() => setQuantity(quantity + 1)}
              disabled={isOutOfStock}
              sx={{ p: 0.8 }}
            >
              <Plus size={16} />
            </IconButton>
          </Box>

          {/* ADD TO CART */}
          <Button
            variant="contained"
            color="secondary"
            size="large"
            onClick={handleAddToCart}
            disabled={isOutOfStock}
            startIcon={<ShoppingBag size={18} />}
            sx={{
              py: 1.4,
              px: 4,
              fontWeight: 800,
              fontSize: '0.95rem',
              borderRadius: 1,
              flex: { xs: '1 1 100%', sm: 'auto' },
              boxShadow: '0 4px 14px rgba(217, 119, 6, 0.3)'
            }}
          >
            {isOutOfStock ? 'OUT OF STOCK' : 'ADD TO CART'}
          </Button>

          {/* BUY NOW */}
          <Button
            variant="outlined"
            size="large"
            onClick={handleBuyNow}
            disabled={isOutOfStock}
            sx={{
              py: 1.4,
              px: 3.5,
              fontWeight: 800,
              fontSize: '0.95rem',
              borderRadius: 1,
              borderColor: '#D97706',
              color: '#D97706',
              flex: { xs: '1 1 100%', sm: 'auto' },
              '&:hover': {
                borderColor: '#B45309',
                backgroundColor: '#FEF3C7'
              }
            }}
          >
            BUY NOW
          </Button>
        </Box>
      </Box>

      {/* Quality Highlight Badges Grid */}
      <Paper
        elevation={0}
        sx={{
          p: 2.5,
          borderRadius: 1,
          border: '1px solid #EAE5DC',
          backgroundColor: '#FCFAF6'
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={6} sm={3}>
            <Box sx={{ textAlign: 'center' }}>
              <ShieldCheck size={22} color="#1E4D2B" style={{ margin: '0 auto 4px' }} />
              <Typography variant="caption" fontWeight={700} display="block">
                No Preservatives
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={6} sm={3}>
            <Box sx={{ textAlign: 'center' }}>
              <Sparkles size={22} color="#16A34A" style={{ margin: '0 auto 4px' }} />
              <Typography variant="caption" fontWeight={700} display="block">
                100% Natural
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={6} sm={3}>
            <Box sx={{ textAlign: 'center' }}>
              <Clock size={22} color="#D97706" style={{ margin: '0 auto 4px' }} />
              <Typography variant="caption" fontWeight={700} display="block">
                Easy to Make
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={6} sm={3}>
            <Box sx={{ textAlign: 'center' }}>
              <Flame size={22} color="#EA580C" style={{ margin: '0 auto 4px' }} />
              <Typography variant="caption" fontWeight={700} display="block">
                Perfect Texture
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
}
