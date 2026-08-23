'use client';

import React from 'react';
import {
  Box,
  Container,
  Grid,
  Typography,
  Paper
} from '@mui/material';
import {
  Zap,
  Sparkles,
  Clock,
  Heart,
  Soup,
  Timer,
  CheckCircle2
} from 'lucide-react';
import { WHY_DOSIFY } from '../../data/mockData';

export default function WhyDosify() {
  const getIcon = (iconName) => {
    switch (iconName) {
      case 'bowl':
        return <Soup size={28} color="#D97706" />;
      case 'sparkles':
        return <Sparkles size={28} color="#16A34A" />;
      case 'clock':
        return <Timer size={28} color="#2563EB" />;
      case 'heart':
      default:
        return <Heart size={28} color="#DC2626" />;
    }
  };

  return (
    <Box
      id="why-dosify"
      sx={{
        py: { xs: 6, md: 8 },
        backgroundColor: '#FCFAF6',
        borderTop: '1px solid #EAE5DC'
      }}
    >
      <Container maxWidth="xl">
        <Typography
          variant="h4"
          align="center"
          fontWeight={900}
          letterSpacing="-0.02em"
          color="text.primary"
          sx={{ mb: 1 }}
        >
          Why DOSIFY?
        </Typography>
        <Typography
          variant="body1"
          align="center"
          color="text.secondary"
          sx={{ mb: 5, maxWidth: 600, mx: 'auto' }}
        >
          Experience authentic South Indian breakfast without the hours of soaking, grinding, and overnight waiting.
        </Typography>

        <Grid container spacing={3}>
          {WHY_DOSIFY.map((item, index) => (
            <Grid item xs={12} sm={6} md={3} key={item.title}>
              <Paper
                elevation={0}
                sx={{
                  p: 3.5,
                  height: '100%',
                  borderRadius: 2,
                  backgroundColor: '#FFFFFF',
                  border: '1px solid #EAE5DC',
                  textAlign: 'center',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  transition: 'all 0.25s ease',
                  '&:hover': {
                    transform: 'translateY(-3px)',
                    boxShadow: '0 8px 20px rgba(0,0,0,0.06)',
                    borderColor: '#CBD5E1'
                  }
                }}
              >
                {/* Icon Container */}
                <Box
                  sx={{
                    width: 64,
                    height: 64,
                    borderRadius: '50%',
                    backgroundColor: '#FEF3C7',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mb: 2.5
                  }}
                >
                  {getIcon(item.icon)}
                </Box>

                <Typography variant="h6" fontWeight={800} gutterBottom>
                  {item.title}
                </Typography>

                <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6 }}>
                  {item.desc}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
