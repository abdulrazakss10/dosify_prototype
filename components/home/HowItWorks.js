'use client';

import React from 'react';
import {
  Box,
  Container,
  Grid,
  Typography,
  Paper
} from '@mui/material';
import { HOW_IT_WORKS } from '../../data/mockData';
import { Soup, Timer, Flame, ChefHat, Utensils } from 'lucide-react';

export default function HowItWorks() {
  const getStepIcon = (title) => {
    switch (title) {
      case 'MIX': return <Soup size={26} color="#1E4D2B" />;
      case 'PREPARE': return <Timer size={26} color="#1E4D2B" />;
      case 'POUR': return <Flame size={26} color="#1E4D2B" />;
      case 'COOK': return <ChefHat size={26} color="#1E4D2B" />;
      case 'ENJOY': default: return <Utensils size={26} color="#1E4D2B" />;
    }
  };

  return (
    <Box
      id="how-it-works"
      sx={{
        py: { xs: 7, md: 10 },
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
          gutterBottom
        >
          Dosa Made Simple
        </Typography>
        <Typography
          variant="body1"
          align="center"
          color="text.secondary"
          sx={{ mb: 6, maxWidth: 600, mx: 'auto' }}
        >
          From pouch to plate in under 5 minutes. 5 easy steps for foolproof crispy perfection.
        </Typography>

        <Grid container spacing={2.5}>
          {HOW_IT_WORKS.map((step, index) => (
            <Grid item xs={12} sm={6} md={2.4} key={step.title}>
              <Paper
                elevation={0}
                sx={{
                  p: 3,
                  height: '100%',
                  borderRadius: 2,
                  backgroundColor: '#FFFFFF',
                  border: '1px solid #EAE5DC',
                  position: 'relative',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center',
                  transition: 'all 0.25s ease',
                  '&:hover': {
                    borderColor: 'primary.main',
                    boxShadow: '0 8px 20px rgba(30, 77, 43, 0.08)',
                    transform: 'translateY(-3px)'
                  }
                }}
              >
                {/* Step Number Badge */}
                <Box
                  sx={{
                    position: 'absolute',
                    top: 12,
                    right: 14,
                    fontWeight: 900,
                    fontSize: '0.85rem',
                    color: 'secondary.main',
                    letterSpacing: '0.05em'
                  }}
                >
                  {step.step}
                </Box>

                {/* Icon */}
                <Box
                  sx={{
                    width: 58,
                    height: 58,
                    borderRadius: '50%',
                    backgroundColor: '#E8F5E9',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mb: 2,
                    mt: 1
                  }}
                >
                  {getStepIcon(step.title)}
                </Box>

                <Typography variant="subtitle1" fontWeight={900} color="primary.main" gutterBottom>
                  {step.title}
                </Typography>

                <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.82rem', lineHeight: 1.5 }}>
                  {step.desc}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
