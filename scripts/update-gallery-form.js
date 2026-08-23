const fs = require('fs');

const galleryContent = `'use client';

import React, { useState } from 'react';
import { Box, Paper } from '@mui/material';

export default function ProductGallery({ product }) {
  const [selectedImage, setSelectedImage] = useState(0);

  // Gallery images list from /images/Dosa
  const images = [
    product.image || '/images/Dosa/classic-dosa-mix.jpg',
    '/images/Dosa/bannerimage.jpg',
    '/images/Dosa/multiImage1.jpg',
    '/images/Dosa/multiImage2.jpg',
    '/images/Dosa/multiImage3.jpg'
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

// Update ProductFormDialog presets
const formDialogContent = `'use client';

import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
  Typography,
  TextField,
  Grid,
  Button,
  MenuItem,
  IconButton,
  InputAdornment,
  Paper
} from '@mui/material';
import { X, Sparkles, Image as ImageIcon } from 'lucide-react';

const CATEGORIES = ['Dosa Mix', 'Masala Mix', 'Millet Mix', 'Combo Packs'];
const PACK_SIZES = ['500g', '700g', '1kg', 'Combo'];
const STATUSES = ['Active', 'Low Stock', 'Out of Stock'];

const PRESET_FOOD_IMAGES = [
  { label: 'Classic Dosa', url: '/images/Dosa/classic-dosa-mix.jpg' },
  { label: 'Masala Dosa', url: '/images/Dosa/masala-dosa-mix.jpg' },
  { label: 'Millet Dosa', url: '/images/Dosa/millet-dosa-mix.jpg' },
  { label: 'Ragi Dosa', url: '/images/Dosa/ragi-dosa-mix.jpg' },
  { label: 'Instant Uttapam', url: '/images/Dosa/instant-uttapam-mix.jpg' },
  { label: 'Family Combo', url: '/images/Dosa/family-compo-mix.jpg' },
  { label: 'Idli & Dosa', url: '/images/Dosa/Media (11).jpg' },
  { label: 'Banner Feast', url: '/images/Dosa/bannerimage.jpg' }
];

export default function ProductFormDialog({ open, onClose, onSave, productToEdit }) {
  const [formData, setFormData] = useState({
    name: '',
    category: 'Dosa Mix',
    packSize: '500g',
    price: '',
    originalPrice: '',
    stock: 20,
    status: 'Active',
    description: '',
    ingredients: 'Premium Rice, Urad Dal, Fenugreek, Salt',
    storage: 'Store in a cool, dry place in an airtight container.',
    image: PRESET_FOOD_IMAGES[0].url
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (productToEdit) {
      setFormData({
        name: productToEdit.name || '',
        category: productToEdit.category || 'Dosa Mix',
        packSize: productToEdit.packSize || '500g',
        price: productToEdit.price !== undefined ? String(productToEdit.price) : '',
        originalPrice: productToEdit.originalPrice !== undefined ? String(productToEdit.originalPrice) : '',
        stock: productToEdit.stock !== undefined ? productToEdit.stock : 20,
        status: productToEdit.status || 'Active',
        description: productToEdit.description || '',
        ingredients: Array.isArray(productToEdit.ingredients) ? productToEdit.ingredients.join(', ') : (productToEdit.ingredients || ''),
        storage: productToEdit.storage || '',
        image: productToEdit.image || PRESET_FOOD_IMAGES[0].url
      });
    } else {
      setFormData({
        name: '',
        category: 'Dosa Mix',
        packSize: '500g',
        price: '',
        originalPrice: '',
        stock: 20,
        status: 'Active',
        description: '',
        ingredients: 'Premium Parboiled Rice, Urad Dal, Fenugreek Seeds, Salt',
        storage: 'Store in a cool dry place. Consume within 45 days.',
        image: PRESET_FOOD_IMAGES[0].url
      });
    }
    setErrors({});
  }, [productToEdit, open]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Product name is required';
    if (!formData.price || Number(formData.price) <= 0) newErrors.price = 'Valid price required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    onSave({
      ...formData,
      price: Number(formData.price),
      originalPrice: formData.originalPrice ? Number(formData.originalPrice) : Math.round(Number(formData.price) * 1.2),
      stock: Number(formData.stock)
    });
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{ sx: { borderRadius: 3, p: 1 } }}
    >
      <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', pb: 1, borderBottom: '1px solid #EAE5DC' }}>
        <Box>
          <Typography variant="h6" fontWeight={800} color="primary.main">
            {productToEdit ? 'Edit Product' : 'Add New Product'}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {productToEdit ? 'Update product parameters & inventory' : 'Create new product mix entry'}
          </Typography>
        </Box>
        <IconButton onClick={onClose} size="small">
          <X size={20} />
        </IconButton>
      </DialogTitle>

      <Box component="form" onSubmit={handleSubmit}>
        <DialogContent sx={{ py: 3 }}>
          <Grid container spacing={2.5}>
            <Grid item xs={12} sm={8}>
              <TextField
                label="Product Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                error={!!errors.name}
                helperText={errors.name}
                fullWidth
                size="small"
                required
                placeholder="e.g. Organic Ghee Roast Dosa Mix – 500g"
              />
            </Grid>

            <Grid item xs={12} sm={4}>
              <TextField
                select
                label="Category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                fullWidth
                size="small"
              >
                {CATEGORIES.map((cat) => (
                  <MenuItem key={cat} value={cat}>{cat}</MenuItem>
                ))}
              </TextField>
            </Grid>

            <Grid item xs={12} sm={4}>
              <TextField
                select
                label="Pack Size"
                name="packSize"
                value={formData.packSize}
                onChange={handleChange}
                fullWidth
                size="small"
              >
                {PACK_SIZES.map((size) => (
                  <MenuItem key={size} value={size}>{size}</MenuItem>
                ))}
              </TextField>
            </Grid>

            <Grid item xs={12} sm={4}>
              <TextField
                label="Selling Price (₹)"
                name="price"
                type="number"
                value={formData.price}
                onChange={handleChange}
                error={!!errors.price}
                helperText={errors.price}
                fullWidth
                size="small"
                required
                InputProps={{ startAdornment: <InputAdornment position="start">₹</InputAdornment> }}
              />
            </Grid>

            <Grid item xs={12} sm={4}>
              <TextField
                label="Original Price (₹)"
                name="originalPrice"
                type="number"
                value={formData.originalPrice}
                onChange={handleChange}
                fullWidth
                size="small"
                placeholder="For discount display"
                InputProps={{ startAdornment: <InputAdornment position="start">₹</InputAdornment> }}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                label="Stock Quantity"
                name="stock"
                type="number"
                value={formData.stock}
                onChange={handleChange}
                fullWidth
                size="small"
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                select
                label="Status"
                name="status"
                value={formData.status}
                onChange={handleChange}
                fullWidth
                size="small"
              >
                {STATUSES.map((s) => (
                  <MenuItem key={s} value={s}>{s}</MenuItem>
                ))}
              </TextField>
            </Grid>

            {/* Food Photo Selector from Dosa folder */}
            <Grid item xs={12}>
              <Typography variant="caption" fontWeight={700} color="text.secondary" display="block" sx={{ mb: 1 }}>
                Choose Product Dosa Image:
              </Typography>
              <Box sx={{ display: 'flex', gap: 1.5, overflowX: 'auto', pb: 1 }}>
                {PRESET_FOOD_IMAGES.map((img) => (
                  <Paper
                    key={img.url}
                    elevation={0}
                    onClick={() => setFormData({ ...formData, image: img.url })}
                    sx={{
                      p: 0.8,
                      borderRadius: 2,
                      border: '2px solid',
                      borderColor: formData.image === img.url ? 'secondary.main' : '#EAE5DC',
                      backgroundColor: formData.image === img.url ? '#FEF3C7' : '#FCFAF6',
                      cursor: 'pointer',
                      textAlign: 'center',
                      minWidth: 100,
                      flexShrink: 0
                    }}
                  >
                    <img src={img.url} alt={img.label} style={{ width: '100%', height: 50, objectFit: 'cover', borderRadius: 4 }} />
                    <Typography variant="caption" fontWeight={700} sx={{ fontSize: '0.7rem', display: 'block', mt: 0.5 }}>
                      {img.label}
                    </Typography>
                  </Paper>
                ))}
              </Box>
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                error={!!errors.description}
                helperText={errors.description}
                fullWidth
                size="small"
                multiline
                rows={2.5}
                required
                placeholder="Crispy, fragrant, restaurant-style batter mix details..."
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Ingredients (comma separated)"
                name="ingredients"
                value={formData.ingredients}
                onChange={handleChange}
                fullWidth
                size="small"
                placeholder="e.g. Parboiled Rice, Urad Dal, Fenugreek, Himalayan Salt"
              />
            </Grid>
          </Grid>
        </DialogContent>

        <DialogActions sx={{ p: 2.5, borderTop: '1px solid #EAE5DC' }}>
          <Button onClick={onClose} sx={{ color: 'text.secondary', fontWeight: 700 }}>
            CANCEL
          </Button>
          <Button type="submit" variant="contained" color="secondary" sx={{ px: 3, fontWeight: 800, borderRadius: 2 }}>
            {productToEdit ? 'UPDATE PRODUCT' : 'SAVE PRODUCT'}
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
}
`;

fs.writeFileSync('components/admin/ProductFormDialog.js', formDialogContent, 'utf8');
console.log('ProductGallery and ProductFormDialog updated with /images/Dosa/ images!');
