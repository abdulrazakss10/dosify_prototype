'use client';

import React from 'react';
import {
  Box,
  Typography,
  Button,
  FormGroup,
  FormControlLabel,
  Radio,
  RadioGroup,
  Slider,
  Divider,
  Paper,
  Stack
} from '@mui/material';
import { Filter, RotateCcw } from 'lucide-react';

export default function ProductFilters({
  selectedCategory,
  setSelectedCategory,
  selectedPackSize,
  setSelectedPackSize,
  priceRange,
  setPriceRange,
  selectedAvailability,
  setSelectedAvailability,
  onReset
}) {
  const categories = ['All', 'Dosa Mix', 'Masala Mix', 'Millet Mix', 'Combo Packs'];
  const packSizes = ['All', '500g', '700g', '1kg', 'Combo'];
  const availabilities = ['All', 'In Stock', 'Out of Stock'];

  return (
    <Paper
      elevation={0}
      sx={{
        p: 3,
        borderRadius: 1,
        border: '1px solid #EAE5DC',
        backgroundColor: '#FFFFFF'
      }}
    >
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2.5 }}>
        <Typography variant="subtitle1" fontWeight={900} letterSpacing="0.05em" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Filter size={18} color="#1E4D2B" /> FILTERS
        </Typography>
        <Button
          size="small"
          onClick={onReset}
          startIcon={<RotateCcw size={14} />}
          sx={{
            color: 'text.secondary',
            fontSize: '0.78rem',
            fontWeight: 700,
            p: 0,
            minWidth: 'auto',
            '&:hover': { color: 'secondary.main', backgroundColor: 'transparent' }
          }}
        >
          Clear All
        </Button>
      </Box>

      <Divider sx={{ mb: 2.5 }} />

      {/* 1. Category Filter */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="subtitle2" fontWeight={800} color="text.primary" gutterBottom>
          Category
        </Typography>
        <RadioGroup
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          {categories.map((cat) => (
            <FormControlLabel
              key={cat}
              value={cat}
              control={<Radio size="small" color="primary" sx={{ py: 0.6 }} />}
              label={<Typography variant="body2" fontWeight={selectedCategory === cat ? 700 : 400}>{cat}</Typography>}
            />
          ))}
        </RadioGroup>
      </Box>

      <Divider sx={{ mb: 2.5 }} />

      {/* 2. Pack Size Filter */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="subtitle2" fontWeight={800} color="text.primary" gutterBottom>
          Pack Size
        </Typography>
        <RadioGroup
          value={selectedPackSize}
          onChange={(e) => setSelectedPackSize(e.target.value)}
        >
          {packSizes.map((size) => (
            <FormControlLabel
              key={size}
              value={size}
              control={<Radio size="small" color="primary" sx={{ py: 0.6 }} />}
              label={<Typography variant="body2" fontWeight={selectedPackSize === size ? 700 : 400}>{size}</Typography>}
            />
          ))}
        </RadioGroup>
      </Box>

      <Divider sx={{ mb: 2.5 }} />

      {/* 3. Price Filter */}
      <Box sx={{ mb: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
          <Typography variant="subtitle2" fontWeight={800} color="text.primary">
            Price
          </Typography>
          <Typography variant="caption" fontWeight={700} color="secondary.main">
            Up to ₹{priceRange}
          </Typography>
        </Box>
        <Slider
          value={priceRange}
          onChange={(e, val) => setPriceRange(val)}
          min={100}
          max={600}
          step={20}
          color="secondary"
          sx={{
            '& .MuiSlider-thumb': {
              width: 16,
              height: 16,
              boxShadow: '0 2px 6px rgba(0,0,0,0.2)'
            }
          }}
        />
        <Box sx={{ display: 'flex', justifyContent: 'space-between', color: 'text.secondary', fontSize: '0.75rem' }}>
          <span>₹100</span>
          <span>₹600</span>
        </Box>
      </Box>

      <Divider sx={{ mb: 2.5 }} />

      {/* 4. Availability Filter */}
      <Box>
        <Typography variant="subtitle2" fontWeight={800} color="text.primary" gutterBottom>
          Availability
        </Typography>
        <RadioGroup
          value={selectedAvailability}
          onChange={(e) => setSelectedAvailability(e.target.value)}
        >
          {availabilities.map((avail) => (
            <FormControlLabel
              key={avail}
              value={avail}
              control={<Radio size="small" color="primary" sx={{ py: 0.6 }} />}
              label={<Typography variant="body2" fontWeight={selectedAvailability === avail ? 700 : 400}>{avail}</Typography>}
            />
          ))}
        </RadioGroup>
      </Box>
    </Paper>
  );
}
