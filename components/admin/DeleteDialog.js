'use client';

import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Button,
  Box
} from '@mui/material';
import { AlertTriangle } from 'lucide-react';

export default function DeleteDialog({ open, onClose, onConfirm, product }) {
  if (!product) return null;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="xs"
      fullWidth
      PaperProps={{ sx: { borderRadius: 3, p: 1 } }}
    >
      <DialogTitle sx={{ display: 'flex', alignItems: 'center', gap: 1.5, color: '#DC2626' }}>
        <Box sx={{ p: 1, borderRadius: '50%', backgroundColor: '#FEE2E2', display: 'flex' }}>
          <AlertTriangle size={22} color="#DC2626" />
        </Box>
        <Typography variant="h6" fontWeight={800}>
          Delete Product?
        </Typography>
      </DialogTitle>

      <DialogContent>
        <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6 }}>
          Are you sure you want to delete <strong>{product.name}</strong> from the DOSIFY product catalog?
        </Typography>
      </DialogContent>

      <DialogActions sx={{ p: 2 }}>
        <Button onClick={onClose} sx={{ color: 'text.secondary', fontWeight: 700 }}>
          CANCEL
        </Button>
        <Button
          onClick={onConfirm}
          variant="contained"
          color="error"
          sx={{ fontWeight: 800, borderRadius: 2, px: 2.5 }}
        >
          DELETE PRODUCT
        </Button>
      </DialogActions>
    </Dialog>
  );
}
