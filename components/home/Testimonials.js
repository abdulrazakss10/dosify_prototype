'use client';

import React from 'react';
import {
  Box,
  Container,
  Grid,
  Typography,
  Paper,
  Rating,
  Avatar
} from '@mui/material';
import { TESTIMONIALS } from '../../data/mockData';
import { Quote, CheckCircle2 } from 'lucide-react';

export default function Testimonials() {
  return (
    <Box
      id="reviews"
      sx={{
        py: { xs: 7, md: 9 },
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
          Loved by Dosa Lovers
        </Typography>
        <Typography
          variant="body1"
          align="center"
          color="text.secondary"
          sx={{ mb: 6, maxWidth: 550, mx: 'auto' }}
        >
          Over 50,000+ crispy dosas served. Here is what our breakfast community says.
        </Typography>

        <Grid container spacing={3}>
          {TESTIMONIALS.map((t) => (
            <Grid item xs={12} md={4} key={t.id}>
              <Paper
                elevation={0}
                sx={{
                  p: 3.5,
                  height: '100%',
                  borderRadius: 2,
                  backgroundColor: '#FFFFFF',
                  border: '1px solid #EAE5DC',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  position: 'relative',
                  transition: 'all 0.2s',
                  '&:hover': {
                    boxShadow: '0 8px 24px rgba(0,0,0,0.06)'
                  }
                }}
              >
                <Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                    <Rating value={t.rating} precision={0.5} readOnly size="small" sx={{ color: '#F59E0B' }} />
                    <Quote size={24} color="#CBD5E1" />
                  </Box>

                  <Typography variant="subtitle1" fontWeight={800} gutterBottom>
                    &ldquo;{t.title}&rdquo;
                  </Typography>

                  <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.7, mb: 3 }}>
                    {t.comment}
                  </Typography>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, pt: 2, borderTop: '1px solid #F1EFE9' }}>
                  <Avatar sx={{ bgcolor: 'primary.main', width: 38, height: 38, fontWeight: 700, fontSize: '0.9rem' }}>
                    {t.name[0]}
                  </Avatar>
                  <Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                      <Typography variant="subtitle2" fontWeight={800}>
                        {t.name}
                      </Typography>
                      <CheckCircle2 size={14} color="#16A34A" />
                    </Box>
                    <Typography variant="caption" color="text.secondary">
                      Verified Buyer • {t.role}
                    </Typography>
                  </Box>
                </Box>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
