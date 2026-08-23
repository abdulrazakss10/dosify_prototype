'use client';

import React from 'react';
import Link from 'next/link';
import {
  Box,
  Container,
  Grid,
  Typography,
  Button,
  Chip,
  useTheme
} from '@mui/material';
import { ArrowRight, Sparkles, Utensils, CheckCircle2 } from 'lucide-react';
import { HERO_DATA } from '../../data/mockData';

export default function Hero() {
  const theme = useTheme();

  return (
    <Box
      sx={{
        backgroundColor: '#FCFAF6',
        pt: { xs: 10, md: 12 },
        pb: { xs: 3, md: 5 },
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      <Container maxWidth="xl">
        <Grid container spacing={{ xs: 4, md: 6 }} alignItems="center">
          {/* Left Column: Hero Copy & Actions */}
          <Grid item xs={12} md={6}>
            {/* Small Brand Pill */}
            <Box
              sx={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 1,
                backgroundColor: '#FEF3C7',
                color: '#92400E',
                px: 2,
                py: 0.8,
                borderRadius: 1,
                fontWeight: 700,
                fontSize: '0.85rem',
                mb: 3,
                border: '1px solid #FDE68A'
              }}
            >
              <Sparkles size={16} color="#D97706" />
              {HERO_DATA.badge}
            </Box>

            {/* Main Headline with "Fresh." in Gold Amber */}
            <Typography
              variant="h1"
              sx={{
                fontSize: { xs: '2.5rem', sm: '3.2rem', md: '3.8rem', lg: '3.2rem' },
                fontWeight: 900,
                lineHeight: 1.15,
                color: 'text.primary',
                mb: 2.5,
                letterSpacing: '-0.02em'
              }}
            >
              {HERO_DATA.headlinePrefix}{' '}
              <Box
                component="span"
                sx={{
                  color: 'secondary.main',
                  display: 'inline-block',
                  position: 'relative'
                }}
              >
                {HERO_DATA.headlineHighlight}
              </Box>{' '}
              {HERO_DATA.headlineSuffix}
            </Typography>

            {/* Subtext */}
            <Typography
              variant="h6"
              sx={{
                fontSize: { xs: '1rem', md: '1.2rem' },
                fontWeight: 400,
                color: 'text.secondary',
                lineHeight: 1.6,
                mb: 4,
                maxWidth: 520
              }}
            >
              {HERO_DATA.subtext}
            </Typography>

            {/* Hero CTAs */}
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, alignItems: 'center' }}>
              <Button
                variant="contained"
                color="secondary"
                size="large"
                component={Link}
                href="/shop"
                endIcon={<ArrowRight size={18} />}
                sx={{
                  px: 4,
                  py: 1.6,
                  fontSize: '1rem',
                  fontWeight: 800,
                  borderRadius: 1,
                  boxShadow: '0 8px 20px rgba(217, 119, 6, 0.3)'
                }}
              >
                {HERO_DATA.shopButtonText}
              </Button>

              <Button
                variant="outlined"
                color="primary"
                size="large"
                component="a"
                href="#recipes"
                startIcon={<Utensils size={18} />}
                sx={{
                  px: 3.5,
                  py: 1.6,
                  fontSize: '1rem',
                  fontWeight: 700,
                  borderRadius: 1,
                  backgroundColor: '#FFFFFF',
                  borderColor: '#CBD5E1',
                  color: 'text.primary',
                  '&:hover': {
                    borderColor: 'primary.main',
                    backgroundColor: '#F8FAFC'
                  }
                }}
              >
                {HERO_DATA.recipesButtonText}
              </Button>
            </Box>

            {/* Trust Badges */}
            <Box
              sx={{
                mt: 5,
                pt: 3,
                borderTop: '1px solid #EAE5DC',
                display: 'flex',
                flexWrap: 'wrap',
                gap: { xs: 2, sm: 4 },
                alignItems: 'center'
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <CheckCircle2 size={18} color="#16A34A" />
                <Typography variant="body2" fontWeight={600} color="text.secondary">
                  Ready in 5 Mins
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <CheckCircle2 size={18} color="#16A34A" />
                <Typography variant="body2" fontWeight={600} color="text.secondary">
                  Zero Preservatives
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <CheckCircle2 size={18} color="#16A34A" />
                <Typography variant="body2" fontWeight={600} color="text.secondary">
                  Restaurant Crispiness
                </Typography>
              </Box>
            </Box>
          </Grid>

          {/* Right Column: Hero Visual Graphic */}
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                position: 'relative',
                borderRadius: 2,
                overflow: 'hidden',
                boxShadow: '0 20px 40px -10px rgba(0,0,0,0.12)',
                border: '1px solid #EAE5DC',
                backgroundColor: '#FFFFFF',
                transition: 'transform 0.3s ease',
                '&:hover': {
                  transform: 'scale(1.01)'
                }
              }}
            >
              <img
                src="/images/Dosa/bannerimage.jpg"
                alt="DOSIFY Instant Dosa Batter Mix with Crispy Rolled Dosa Platter"
                style={{
                  width: '100%',
                  height: 'auto',
                  display: 'block'
                }}
              />
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
