'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Card,
  CardContent,
  Box,
  Typography,
  Button,
  IconButton,
  Chip,
  Rating,
  useTheme
} from '@mui/material';
import { Heart, ShoppingBag } from 'lucide-react';
import { useCart } from '../../context/CartContext';

export default function ProductCard({ product }) {
  const theme = useTheme();
  const { addToCart, openCheckout } = useCart();
  const [isWishlisted, setIsWishlisted] = useState(false);

  const discount = product.originalPrice > product.price
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : product.discount || 0;

  const isOutOfStock = product.stock <= 0 || product.status === 'Out of Stock';

  const handleBuyNow = (e) => {
    e.preventDefault();
    if (!isOutOfStock) {
      addToCart(product, 1);
      openCheckout();
    }
  };

  return (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        borderRadius: 1,
        border: '1px solid #EAE5DC',
        backgroundColor: '#FFFFFF',
        position: 'relative',
        overflow: 'hidden',
        transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: '0 12px 28px rgba(0,0,0,0.08)',
          borderColor: '#CBD5E1'
        }
      }}
    >
      {/* Top Badges */}
      <Box
        sx={{
          position: 'absolute',
          top: 12,
          left: 12,
          right: 12,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          zIndex: 2
        }}
      >
        {discount > 0 && !isOutOfStock && (
          <Chip
            label={discount + "% OFF"}
            size="small"
            sx={{
              backgroundColor: '#FEF3C7',
              color: '#B45309',
              fontWeight: 800,
              fontSize: '0.72rem',
              border: '1px solid #FDE68A'
            }}
          />
        )}

        {isOutOfStock && (
          <Chip
            label="Out of Stock"
            size="small"
            sx={{
              backgroundColor: '#FEE2E2',
              color: '#DC2626',
              fontWeight: 800,
              fontSize: '0.72rem',
              border: '1px solid #FECACA'
            }}
          />
        )}

        <IconButton
          size="small"
          onClick={() => setIsWishlisted(!isWishlisted)}
          sx={{
            ml: 'auto',
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            boxShadow: '0 2px 6px rgba(0,0,0,0.08)',
            p: 0.8,
            color: isWishlisted ? 'error.main' : '#94A3B8',
            '&:hover': {
              backgroundColor: '#FFFFFF',
              color: 'error.main'
            }
          }}
        >
          <Heart size={16} fill={isWishlisted ? '#DC2626' : 'none'} />
        </IconButton>
      </Box>

      {/* Real Dosa Food Image */}
      <Box
        component={Link}
        href={"/shop/" + product.slug}
        sx={{
          backgroundColor: '#FCFAF6',
          height: 200,
          overflow: 'hidden',
          cursor: 'pointer',
          display: 'block'
        }}
      >
        <img
          src={product.image}
          alt={product.name}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transition: 'transform 0.4s ease'
          }}
        />
      </Box>

      {/* Product Details */}
      <CardContent sx={{ p: 2.5, flex: 1, display: 'flex', flexDirection: 'column' }}>
        <Typography
          variant="subtitle1"
          fontWeight={800}
          component={Link}
          href={"/shop/" + product.slug}
          sx={{
            color: 'text.primary',
            textDecoration: 'none',
            display: '-webkit-box',
            WebkitLineClamp: 1,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            mb: 0.5,
            fontSize: '0.98rem',
            '&:hover': { color: 'primary.main' }
          }}
        >
          {product.name}
        </Typography>

        {/* Rating and Reviews */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.8, mb: 1.5 }}>
          <Rating
            value={product.rating || 4.8}
            precision={0.1}
            size="small"
            readOnly
            sx={{ color: '#F59E0B' }}
          />
          <Typography variant="caption" fontWeight={700} color="text.primary">
            {product.rating || 4.8}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            ({product.reviews || 120})
          </Typography>
        </Box>

        {/* Price Row */}
        <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 1, mb: 2, mt: 'auto' }}>
          <Typography variant="h6" fontWeight={900} color="secondary.main">
            ₹{product.price}
          </Typography>
          {product.originalPrice > product.price && (
            <Typography
              variant="body2"
              sx={{
                color: 'text.secondary',
                textDecoration: 'line-through',
                fontWeight: 500
              }}
            >
              ₹{product.originalPrice}
            </Typography>
          )}
        </Box>

        {/* Buttons Row */}
        {/* <Box sx={{ display: 'flex', gap: 1 }}>
          <Button
            variant="contained"
            color="secondary"
            fullWidth
            size="small"
            onClick={() => addToCart(product, 1)}
            disabled={isOutOfStock}
            sx={{
              py: 0.9,
              fontWeight: 800,
              fontSize: '0.82rem',
              borderRadius: 2,
              backgroundColor: isOutOfStock ? '#94A3B8' : 'secondary.main',
              boxShadow: 'none'
            }}
          >
            {isOutOfStock ? 'OUT OF STOCK' : 'ADD TO CART'}
          </Button>

          <Button
            variant="outlined"
            fullWidth
            size="small"
            onClick={handleBuyNow}
            disabled={isOutOfStock}
            sx={{
              py: 0.9,
              fontWeight: 800,
              fontSize: '0.82rem',
              borderRadius: 2,
              borderColor: '#D97706',
              color: '#D97706',
              '&:hover': {
                borderColor: '#B45309',
                backgroundColor: '#FEF3C7'
              }
            }}
          >
            BUY NOW
          </Button>
        </Box> */}
        <Box
  sx={{
    display: 'flex',
    gap: 1,
    width: '100%',
    alignItems: 'stretch',
  }}
>
  <Button
    variant="contained"
    color="secondary"
    size="small"
    onClick={() => addToCart(product, 1)}
    disabled={isOutOfStock}
    sx={{
      flex: 1,
      minWidth: 0,
      height: 38,
      px: { xs: 1, sm: 0 },
      py: 0,
      fontWeight: 800,
      fontSize: { xs: '0.72rem', sm: '0.78rem', md: '0.6rem' },
      lineHeight: 1,
      whiteSpace: 'nowrap',
      borderRadius: 0.5,
      backgroundColor: isOutOfStock ? '#94A3B8' : 'secondary.main',
      boxShadow: 'none',
      '&:hover': {
        boxShadow: 'none',
      },
    }}
  >
    {isOutOfStock ? 'OUT OF STOCK' : 'ADD TO CART'}
  </Button>

  <Button
    variant="outlined"
    size="small"
    onClick={handleBuyNow}
    disabled={isOutOfStock}
    sx={{
      flex: 1,
      minWidth: 0,
      height: 38,
      px: { xs: 1, sm: 0 },
      py: 0,
      fontWeight: 800,
      fontSize: { xs: '0.72rem', sm: '0.78rem', md: '0.6rem' },
      lineHeight: 1,
      whiteSpace: 'nowrap',
      borderRadius: 0.5,
      borderWidth: 1.5,
      borderColor: '#D97706',
      color: '#D97706',
      '&:hover': {
        borderWidth: 1.5,
        borderColor: '#B45309',
        backgroundColor: '#FEF3C7',
      },
    }}
  >
    BUY NOW
  </Button>
</Box>
      </CardContent>
    </Card>
  );
}
