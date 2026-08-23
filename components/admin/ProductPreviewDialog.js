'use client';

import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Box,
  Typography,
  Chip,
  Rating,
  Divider,
  Grid
} from '@mui/material';
import { X, CheckCircle2 } from 'lucide-react';

export default function ProductPreviewDialog({ open, onClose, product }) {
  if (!product) return null;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{ sx: { borderRadius: 3, p: 1 } }}
    >
      <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', pb: 1, borderBottom: '1px solid #EAE5DC' }}>
        <Typography variant="h6" fontWeight={800} color="primary.main">
          Product Preview
        </Typography>
        <IconButton onClick={onClose} size="small">
          <X size={20} />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ py: 3 }}>
        <Grid container spacing={3} alignItems="center">
          <Grid item xs={12} sm={5}>
            <Box
              sx={{
                p: 2,
                borderRadius: 2.5,
                backgroundColor: '#FCFAF6',
                border: '1px solid #EAE5DC',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: 200
              }}
            >
              <img src={product.image} alt={product.name} style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain' }} />
            </Box>
          </Grid>

          <Grid item xs={12} sm={7}>
            <Chip
              label={product.category}
              size="small"
              sx={{ mb: 1, fontWeight: 700, backgroundColor: '#E8F5E9', color: '#1E4D2B' }}
            />
            <Typography variant="h6" fontWeight={800} gutterBottom>
              {product.name}
            </Typography>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
              <Rating value={product.rating || 4.8} precision={0.1} size="small" readOnly sx={{ color: '#F59E0B' }} />
              <Typography variant="caption" fontWeight={700}>
                {product.rating || 4.8} ({product.reviews || 120} reviews)
              </Typography>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 1, mb: 1 }}>
              <Typography variant="h5" fontWeight={900} color="secondary.main">
                ₹{product.price}
              </Typography>
              {product.originalPrice > product.price && (
                <Typography variant="body2" sx={{ color: 'text.secondary', textDecoration: 'line-through' }}>
                  ₹{product.originalPrice}
                </Typography>
              )}
            </Box>

            <Typography variant="caption" color="text.secondary" display="block">
              Stock available: <strong>{product.stock} units</strong> • Status: <strong>{product.status}</strong>
            </Typography>
          </Grid>
        </Grid>

        <Divider sx={{ my: 2.5 }} />

        <Typography variant="subtitle2" fontWeight={800} gutterBottom>
          Description:
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6, mb: 2 }}>
          {product.description}
        </Typography>
      </DialogContent>
    </Dialog>
  );
}
