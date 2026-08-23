'use client';

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
import { X, Sparkles, Image as ImageIcon, Plus, Upload, Trash2 } from 'lucide-react';

const CATEGORIES = ['Dosa Mix', 'Masala Mix', 'Millet Mix', 'Combo Packs'];
const PACK_SIZES = ['500g', '700g', '1kg', 'Combo'];
const STATUSES = ['Active', 'Low Stock', 'Out of Stock'];
const ADD_NEW_CATEGORY = '__add_new__';

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
  const [categories, setCategories] = useState(CATEGORIES);
  const [addingCategory, setAddingCategory] = useState(false);
  const [newCategoryInput, setNewCategoryInput] = useState('');

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
    image: PRESET_FOOD_IMAGES[0].url,
    images: [PRESET_FOOD_IMAGES[0].url] // gallery images (presets + uploads)
  });

  // Track uploaded files separately so we can revoke object URLs on cleanup
  const [uploadedImages, setUploadedImages] = useState([]); // [{ url, file }]

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
        image: productToEdit.image || PRESET_FOOD_IMAGES[0].url,
        images: Array.isArray(productToEdit.images) && productToEdit.images.length
          ? productToEdit.images
          : [productToEdit.image || PRESET_FOOD_IMAGES[0].url]
      });
      if (productToEdit.category && !categories.includes(productToEdit.category)) {
        setCategories((prev) => [...prev, productToEdit.category]);
      }
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
        image: PRESET_FOOD_IMAGES[0].url,
        images: [PRESET_FOOD_IMAGES[0].url]
      });
    }
    setUploadedImages([]);
    setAddingCategory(false);
    setNewCategoryInput('');
    setErrors({});
  }, [productToEdit, open]);

  // Revoke object URLs on unmount to avoid memory leaks
  useEffect(() => {
    return () => {
      uploadedImages.forEach((img) => URL.revokeObjectURL(img.url));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'category' && value === ADD_NEW_CATEGORY) {
      setAddingCategory(true);
      return;
    }

    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleConfirmNewCategory = () => {
    const trimmed = newCategoryInput.trim();
    if (!trimmed) return;
    if (!categories.includes(trimmed)) {
      setCategories((prev) => [...prev, trimmed]);
    }
    setFormData((prev) => ({ ...prev, category: trimmed }));
    setAddingCategory(false);
    setNewCategoryInput('');
  };

  const toggleImageSelection = (url) => {
    setFormData((prev) => {
      const isSelected = prev.images.includes(url);
      const nextImages = isSelected
        ? prev.images.filter((img) => img !== url)
        : [...prev.images, url];

      // Ensure at least one image remains, and keep primary image in sync
      const finalImages = nextImages.length ? nextImages : [url];
      return {
        ...prev,
        images: finalImages,
        image: finalImages[0]
      };
    });
  };

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;

    const newUploads = files.map((file) => ({
      url: URL.createObjectURL(file),
      file
    }));

    setUploadedImages((prev) => [...prev, ...newUploads]);
    setFormData((prev) => {
      const nextImages = [...prev.images, ...newUploads.map((u) => u.url)];
      return {
        ...prev,
        images: nextImages,
        image: prev.image || nextImages[0]
      };
    });

    e.target.value = ''; // allow re-uploading the same file if removed
  };

  const removeUploadedImage = (url) => {
    URL.revokeObjectURL(url);
    setUploadedImages((prev) => prev.filter((img) => img.url !== url));
    setFormData((prev) => {
      const nextImages = prev.images.filter((img) => img !== url);
      const finalImages = nextImages.length ? nextImages : [PRESET_FOOD_IMAGES[0].url];
      return {
        ...prev,
        images: finalImages,
        image: finalImages[0]
      };
    });
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
      stock: Number(formData.stock),
      ingredients: formData.ingredients
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean)
      // Note: formData.images may include blob: URLs from uploads.
      // Upload the actual File objects (uploadedImages[].file) to your
      // storage/backend on save, then swap in the returned permanent URLs.
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
              {addingCategory ? (
                <Box sx={{ display: 'flex', gap: 0.5 }}>
                  <TextField
                    label="New Category"
                    value={newCategoryInput}
                    onChange={(e) => setNewCategoryInput(e.target.value)}
                    fullWidth
                    size="small"
                    autoFocus
                    placeholder="e.g. Idli Mix"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleConfirmNewCategory();
                      }
                    }}
                  />
                  <Button
                    onClick={handleConfirmNewCategory}
                    variant="contained"
                    color="secondary"
                    size="small"
                    sx={{ minWidth: 0, px: 1.2 }}
                  >
                    <Plus size={16} />
                  </Button>
                  <Button
                    onClick={() => { setAddingCategory(false); setNewCategoryInput(''); }}
                    variant="outlined"
                    size="small"
                    sx={{ minWidth: 0, px: 1.2 }}
                  >
                    <X size={16} />
                  </Button>
                </Box>
              ) : (
                <TextField
                  select
                  label="Category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  fullWidth
                  size="small"
                >
                  {categories.map((cat) => (
                    <MenuItem key={cat} value={cat}>{cat}</MenuItem>
                  ))}
                  <MenuItem value={ADD_NEW_CATEGORY} sx={{ color: 'secondary.main', fontWeight: 700 }}>
                    <Plus size={14} style={{ marginRight: 6 }} /> Add New Category
                  </MenuItem>
                </TextField>
              )}
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

            {/* Preset Food Photo Selector */}
            <Grid item xs={12}>
              <Typography variant="caption" fontWeight={700} color="text.secondary" display="block" sx={{ mb: 1 }}>
                Choose from Preset Images (tap to toggle):
              </Typography>
              <Box sx={{ display: 'flex', gap: 1.5, overflowX: 'auto', pb: 1 }}>
                {PRESET_FOOD_IMAGES.map((img) => {
                  const isSelected = formData.images.includes(img.url);
                  return (
                    <Paper
                      key={img.url}
                      elevation={0}
                      onClick={() => toggleImageSelection(img.url)}
                      sx={{
                        p: 0.8,
                        borderRadius: 2,
                        border: '2px solid',
                        borderColor: isSelected ? 'secondary.main' : '#EAE5DC',
                        backgroundColor: isSelected ? '#FEF3C7' : '#FCFAF6',
                        cursor: 'pointer',
                        textAlign: 'center',
                        minWidth: 100,
                        flexShrink: 0,
                        position: 'relative'
                      }}
                    >
                      <img src={img.url} alt={img.label} style={{ width: '100%', height: 50, objectFit: 'cover', borderRadius: 4 }} />
                      <Typography variant="caption" fontWeight={700} sx={{ fontSize: '0.7rem', display: 'block', mt: 0.5 }}>
                        {img.label}
                      </Typography>
                    </Paper>
                  );
                })}
              </Box>
            </Grid>

            {/* Upload Custom Images */}
            <Grid item xs={12}>
              <Typography variant="caption" fontWeight={700} color="text.secondary" display="block" sx={{ mb: 1 }}>
                Upload Your Own Images (one or more):
              </Typography>

              <Box sx={{ display: 'flex', gap: 1.5, overflowX: 'auto', pb: 1, alignItems: 'flex-start' }}>
                <Button
                  component="label"
                  variant="outlined"
                  color="secondary"
                  startIcon={<Upload size={16} />}
                  sx={{
                    borderRadius: 2,
                    borderStyle: 'dashed',
                    minWidth: 110,
                    height: 50 + 24 + 8, // roughly match preset card height (img + label + padding)
                    flexShrink: 0,
                    fontSize: '0.7rem',
                    fontWeight: 700,
                    flexDirection: 'column',
                    gap: 0.5
                  }}
                >
                  Upload
                  <input
                    type="file"
                    hidden
                    accept="image/*"
                    multiple
                    onChange={handleFileUpload}
                  />
                </Button>

                {uploadedImages.map((img) => (
                  <Paper
                    key={img.url}
                    elevation={0}
                    sx={{
                      p: 0.8,
                      borderRadius: 2,
                      border: '2px solid',
                      borderColor: formData.images.includes(img.url) ? 'secondary.main' : '#EAE5DC',
                      backgroundColor: '#FCFAF6',
                      textAlign: 'center',
                      minWidth: 100,
                      flexShrink: 0,
                      position: 'relative'
                    }}
                  >
                    <IconButton
                      size="small"
                      onClick={() => removeUploadedImage(img.url)}
                      sx={{
                        position: 'absolute',
                        top: -8,
                        right: -8,
                        backgroundColor: '#DC2626',
                        color: '#fff',
                        width: 20,
                        height: 20,
                        '&:hover': { backgroundColor: '#B91C1C' }
                      }}
                    >
                      <Trash2 size={12} />
                    </IconButton>
                    <img src={img.url} alt="Uploaded" style={{ width: '100%', height: 50, objectFit: 'cover', borderRadius: 4 }} />
                    <Typography variant="caption" fontWeight={700} sx={{ fontSize: '0.65rem', display: 'block', mt: 0.5 }}>
                      Custom
                    </Typography>
                  </Paper>
                ))}
              </Box>

              {formData.images.length === 0 && (
                <Typography variant="caption" color="error.main" sx={{ mt: 0.5, display: 'block' }}>
                  Select at least one image
                </Typography>
              )}
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