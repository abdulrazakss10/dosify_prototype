const fs = require('fs');

const galleryContent = `'use client';

import React, { useState } from 'react';
import { Box, Paper } from '@mui/material';

export default function ProductGallery({ product }) {
  const [selectedImage, setSelectedImage] = useState(0);

  // Gallery images list (using product image + variations)
  const images = [
    product.image,
    'https://images.unsplash.com/photo-1668236543090-82eba5ee5976?auto=format&fit=crop&w=1000&q=85',
    'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=1000&q=85',
    'https://images.unsplash.com/photo-1610192244261-3f33de3f55e4?auto=format&fit=crop&w=1000&q=85'
  ];

  return (
    <Box>
      {/* Main Large Image Container */}
      <Paper
        elevation={0}
        sx={{
          borderRadius: 3.5,
          border: '1px solid #EAE5DC',
          backgroundColor: '#FFFFFF',
          overflow: 'hidden',
          height: { xs: 320, sm: 420, md: 480 },
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          mb: 2,
          position: 'relative'
        }}
      >
        <img
          src={images[selectedImage]}
          alt={product.name}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transition: 'all 0.3s ease'
          }}
        />
      </Paper>

      {/* Thumbnail Selector Row */}
      <Box sx={{ display: 'flex', gap: 1.5, overflowX: 'auto', pb: 1 }}>
        {images.map((img, idx) => (
          <Paper
            key={idx}
            elevation={0}
            onClick={() => setSelectedImage(idx)}
            sx={{
              width: 80,
              height: 80,
              borderRadius: 2,
              overflow: 'hidden',
              border: '2.5px solid',
              borderColor: selectedImage === idx ? 'secondary.main' : '#EAE5DC',
              backgroundColor: '#FFFFFF',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
              transition: 'all 0.2s ease',
              '&:hover': {
                borderColor: 'secondary.light',
                transform: 'scale(1.04)'
              }
            }}
          >
            <img
              src={img}
              alt={"Thumbnail " + (idx + 1)}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </Paper>
        ))}
      </Box>
    </Box>
  );
}
`;

fs.writeFileSync('components/product/ProductGallery.js', galleryContent, 'utf8');

// Update ProductCard.js image container
const cardContent = `'use client';

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
        borderRadius: 3,
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
        <Box sx={{ display: 'flex', gap: 1 }}>
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
        </Box>
      </CardContent>
    </Card>
  );
}
`;

fs.writeFileSync('components/shop/ProductCard.js', cardContent, 'utf8');

// Update ProductHighlights.js
const highlightsContent = `'use client';

import React from 'react';
import Link from 'next/link';
import {
  Box,
  Container,
  Grid,
  Typography,
  Card,
  CardContent,
  Button,
  IconButton,
  Chip,
  Rating,
  useTheme
} from '@mui/material';
import { ArrowRight, ShoppingBag } from 'lucide-react';
import { useProducts } from '../../context/ProductContext';
import { useCart } from '../../context/CartContext';

export default function ProductHighlights() {
  const theme = useTheme();
  const { products } = useProducts();
  const { addToCart } = useCart();

  const highlightProducts = products.slice(0, 4);

  return (
    <Box sx={{ py: { xs: 6, md: 9 }, backgroundColor: '#FCFAF6' }}>
      <Container maxWidth="xl">
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
            <Typography variant="h4" fontWeight={900} color="text.primary" letterSpacing="-0.02em">
              Made for Your Dosa Cravings
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mt: 0.5 }}>
              Handpicked bestseller mixes for breakfast, brunch, and dinner.
            </Typography>
          </Box>

          <Button
            component={Link}
            href="/shop"
            endIcon={<ArrowRight size={16} />}
            sx={{
              color: 'secondary.main',
              fontWeight: 800,
              fontSize: '0.95rem',
              p: 0,
              '&:hover': {
                backgroundColor: 'transparent',
                color: 'secondary.dark'
              }
            }}
          >
            VIEW ALL PRODUCTS
          </Button>
        </Box>

        <Grid container spacing={3}>
          {highlightProducts.map((product) => {
            const discount = product.originalPrice > product.price
              ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
              : product.discount || 0;

            return (
              <Grid item xs={12} sm={6} md={3} key={product.id}>
                <Card
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    borderRadius: 3,
                    border: '1px solid #EAE5DC',
                    backgroundColor: '#FFFFFF',
                    position: 'relative',
                    overflow: 'hidden',
                    transition: 'all 0.25s ease-in-out',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: '0 12px 28px rgba(0,0,0,0.08)',
                      borderColor: '#CBD5E1'
                    }
                  }}
                >
                  {discount > 0 && (
                    <Chip
                      label={discount + "% OFF"}
                      size="small"
                      sx={{
                        position: 'absolute',
                        top: 14,
                        left: 14,
                        backgroundColor: '#FEF3C7',
                        color: '#B45309',
                        fontWeight: 800,
                        fontSize: '0.72rem',
                        zIndex: 2,
                        border: '1px solid #FDE68A'
                      }}
                    />
                  )}

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
                        mb: 0.8,
                        '&:hover': { color: 'primary.main' }
                      }}
                    >
                      {product.name}
                    </Typography>

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

                    <Box sx={{ display: 'flex', gap: 1 }}>
                      <Button
                        variant="contained"
                        color="secondary"
                        fullWidth
                        size="small"
                        onClick={() => addToCart(product, 1)}
                        disabled={product.stock <= 0}
                        sx={{
                          py: 1,
                          fontWeight: 800,
                          borderRadius: 2,
                          backgroundColor: product.stock <= 0 ? '#94A3B8' : 'secondary.main',
                          boxShadow: '0 2px 6px rgba(217, 119, 6, 0.25)'
                        }}
                      >
                        {product.stock <= 0 ? 'OUT OF STOCK' : 'ADD TO CART'}
                      </Button>

                      <IconButton
                        size="small"
                        onClick={() => addToCart(product, 1)}
                        disabled={product.stock <= 0}
                        sx={{
                          backgroundColor: '#FEF3C7',
                          color: '#B45309',
                          borderRadius: 2,
                          p: 1,
                          '&:hover': {
                            backgroundColor: '#FDE68A'
                          }
                        }}
                      >
                        <ShoppingBag size={18} />
                      </IconButton>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </Box>
  );
}
`;

fs.writeFileSync('components/home/ProductHighlights.js', highlightsContent, 'utf8');

console.log('Food photography components updated successfully!');
