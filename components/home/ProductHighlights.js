'use client';

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
    <Box sx={{ py: { xs: 6, md: 5 }, backgroundColor: '#FCFAF6' }}>
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
                    borderRadius: 1,
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
                          borderRadius: 1,
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
                          borderRadius: 1,
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
