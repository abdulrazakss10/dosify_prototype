'use client';

import React from 'react';
import Link from 'next/link';
import {
  Box,
  Container,
  Typography,
  Button,
  Stack
} from '@mui/material';
import { ArrowRight, Sparkles } from 'lucide-react';

export default function CTA() {
  return (
    <Box
      sx={{
        py: { xs: 8, md: 11 },
        backgroundColor: '#1E4D2B', // Rich Forest Green
        color: '#FFFFFF',
        position: 'relative',
        overflow: 'hidden',
        textAlign: 'center'
      }}
    >
      <Container maxWidth="md">
        <Box
          sx={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 1,
            backgroundColor: 'rgba(255, 255, 255, 0.12)',
            px: 2,
            py: 0.8,
            borderRadius: 1,
            fontWeight: 700,
            fontSize: '0.85rem',
            mb: 3,
            color: '#FDE047'
          }}
        >
          <Sparkles size={16} />
          Fresh • Fast • Favorite
        </Box>

        <Typography
          variant="h2"
          sx={{
            fontSize: { xs: '2.2rem', sm: '3rem', md: '3.5rem' },
            fontWeight: 900,
            letterSpacing: '-0.02em',
            mb: 2.5,
            color: '#FFFFFF'
          }}
        >
          Your Dosa Craving. Sorted.
        </Typography>

        <Typography
          variant="h6"
          sx={{
            color: '#E2E8F0',
            fontWeight: 400,
            lineHeight: 1.6,
            maxWidth: 580,
            mx: 'auto',
            mb: 4.5,
            fontSize: { xs: '1rem', md: '1.2rem' }
          }}
        >
          From quick breakfasts to weekend family meals, make delicious dosa the easy way. Order your batter pouch today.
        </Typography>

        <Button
          variant="contained"
          color="secondary"
          size="large"
          component={Link}
          href="/shop"
          endIcon={<ArrowRight size={20} />}
          sx={{
            px: 5,
            py: 1.8,
            fontSize: '1.1rem',
            fontWeight: 800,
            borderRadius: 1,
            boxShadow: '0 8px 25px rgba(0, 0, 0, 0.3)',
            backgroundColor: '#D97706',
            '&:hover': {
              backgroundColor: '#B45309'
            }
          }}
        >
          SHOP DOSIFY
        </Button>
      </Container>
    </Box>
  );
}
