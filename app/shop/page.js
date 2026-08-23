'use client';

import React, { useState, useMemo, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import {
  Box,
  Container,
  Grid,
  Typography,
  Select,
  MenuItem,
  FormControl,
  Button,
  Drawer,
  IconButton,
  Breadcrumbs,
  Link as MuiLink,
  useTheme,
  useMediaQuery,
  Paper,
  CircularProgress
} from '@mui/material';
import Link from 'next/link';
import { Filter, X, Search, RotateCcw, ChevronRight } from 'lucide-react';
import Header from '../../components/common/Header';
import Footer from '../../components/common/Footer';
import ProductCard from '../../components/shop/ProductCard';
import ProductFilters from '../../components/shop/ProductFilters';
import { useProducts } from '../../context/ProductContext';

function ShopContent() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const searchParams = useSearchParams();
  const { products } = useProducts();

  // Filter States
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedPackSize, setSelectedPackSize] = useState('All');
  const [priceRange, setPriceRange] = useState(600);
  const [selectedAvailability, setSelectedAvailability] = useState('All');
  const [sortBy, setSortBy] = useState('Recommended');
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Sync URL query params if present
  useEffect(() => {
    const cat = searchParams.get('category');
    if (cat) setSelectedCategory(cat);
  }, [searchParams]);

  const handleReset = () => {
    setSelectedCategory('All');
    setSelectedPackSize('All');
    setPriceRange(600);
    setSelectedAvailability('All');
    setSortBy('Recommended');
  };

  // Filter & Sort Logic
  const filteredProducts = useMemo(() => {
    const query = (searchParams.get('q') || '').toLowerCase();

    return products
      .filter((product) => {
        // Search query filter
        if (query && !product.name.toLowerCase().includes(query) && !product.category.toLowerCase().includes(query)) {
          return false;
        }

        // Category filter
        if (selectedCategory !== 'All' && product.category !== selectedCategory) {
          return false;
        }

        // Pack Size filter
        if (selectedPackSize !== 'All') {
          if (selectedPackSize === 'Combo' && product.category !== 'Combo Packs') return false;
          if (selectedPackSize !== 'Combo' && !product.packSize.includes(selectedPackSize)) return false;
        }

        // Price filter
        if (product.price > priceRange) {
          return false;
        }

        // Availability filter
        if (selectedAvailability === 'In Stock' && product.stock <= 0) {
          return false;
        }
        if (selectedAvailability === 'Out of Stock' && product.stock > 0) {
          return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'Price: Low to High') return a.price - b.price;
        if (sortBy === 'Price: High to Low') return b.price - a.price;
        if (sortBy === 'Best Rated') return (b.rating || 0) - (a.rating || 0);
        return a.id - b.id;
      });
  }, [products, searchParams, selectedCategory, selectedPackSize, priceRange, selectedAvailability, sortBy]);

  return (
    <Box component="main" sx={{ flex: 1, py: { xs: 3, md: 5 } }}>
      <Container maxWidth="xl">
        {/* Breadcrumbs */}
        <Breadcrumbs
          separator={<ChevronRight size={14} />}
          aria-label="breadcrumb"
          sx={{ mb: 3, fontSize: '0.85rem' }}
        >
          <MuiLink component={Link} href="/" color="inherit" underline="hover">
            Home
          </MuiLink>
          <Typography color="text.primary" fontWeight={700} fontSize="0.85rem">
            Shop
          </Typography>
        </Breadcrumbs>

        {/* Page Banner & Sorting Row */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            justifyContent: 'space-between',
            alignItems: { xs: 'flex-start', md: 'center' },
            gap: 2,
            mb: 4
          }}
        >
          <Box>
            <Typography variant="h3" fontWeight={900} letterSpacing="-0.02em" color="text.primary">
              Shop DOSIFY
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mt: 0.5 }}>
              Everything you need for quick, delicious dosa.
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, width: { xs: '100%', sm: 'auto' } }}>
            {/* Mobile Filter Button */}
            {isMobile && (
              <Button
                variant="outlined"
                color="primary"
                startIcon={<Filter size={16} />}
                onClick={() => setMobileFilterOpen(true)}
                fullWidth
                sx={{ py: 1.2, borderRadius: 1 }}
              >
                Filters ({filteredProducts.length})
              </Button>
            )}

            {/* Sort Dropdown */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, ml: 'auto' }}>
              <Typography variant="body2" color="text.secondary" fontWeight={600} sx={{ whiteSpace: 'nowrap' }}>
                Sort by:
              </Typography>
              <FormControl size="small" sx={{ minWidth: 170 }}>
                <Select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  sx={{
                    backgroundColor: '#FFFFFF',
                    borderRadius: 1,
                    fontSize: '0.85rem',
                    fontWeight: 600
                  }}
                >
                  <MenuItem value="Recommended">Recommended</MenuItem>
                  <MenuItem value="Price: Low to High">Price: Low to High</MenuItem>
                  <MenuItem value="Price: High to Low">Price: High to Low</MenuItem>
                  <MenuItem value="Best Rated">Best Rated</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </Box>
        </Box>

        {/* Main Grid: Sidebar + Product Cards */}
        <Grid container spacing={3.5}>
          {/* Desktop Filters Sidebar */}
          {!isMobile && (
            <Grid item md={3} lg={2.8}>
              <Box sx={{ position: 'sticky', top: 100 }}>
                <ProductFilters
                  selectedCategory={selectedCategory}
                  setSelectedCategory={setSelectedCategory}
                  selectedPackSize={selectedPackSize}
                  setSelectedPackSize={setSelectedPackSize}
                  priceRange={priceRange}
                  setPriceRange={setPriceRange}
                  selectedAvailability={selectedAvailability}
                  setSelectedAvailability={setSelectedAvailability}
                  onReset={handleReset}
                />
              </Box>
            </Grid>
          )}

          {/* Product Cards Grid */}
          <Grid item xs={12} md={9} lg={9.2}>
            {filteredProducts.length === 0 ? (
              <Paper
                elevation={0}
                sx={{
                  p: 8,
                  textAlign: 'center',
                  borderRadius: 1,
                  border: '1px solid #EAE5DC',
                  backgroundColor: '#FFFFFF'
                }}
              >
                <Search size={48} color="#94A3B8" style={{ marginBottom: 16 }} />
                <Typography variant="h6" fontWeight={800} gutterBottom>
                  No products found
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                  We couldn't find any products matching your active filters or search terms.
                </Typography>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={handleReset}
                  startIcon={<RotateCcw size={16} />}
                  sx={{ px: 3, borderRadius: 1 }}
                >
                  Clear All Filters
                </Button>
              </Paper>
            ) : (
              <Grid container spacing={2.5}>
                {filteredProducts.map((product) => (
                  <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
                    <ProductCard product={product} />
                  </Grid>
                ))}
              </Grid>
            )}
          </Grid>
        </Grid>
      </Container>

      {/* Mobile Filters Drawer */}
      <Drawer
        anchor="left"
        open={mobileFilterOpen}
        onClose={() => setMobileFilterOpen(false)}
        PaperProps={{
          sx: {
            width: 320,
            p: 2,
            backgroundColor: '#FCFAF6'
          }
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h6" fontWeight={800} color="primary.main">
            Filters
          </Typography>
          <IconButton onClick={() => setMobileFilterOpen(false)} size="small">
            <X size={20} />
          </IconButton>
        </Box>

        <ProductFilters
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          selectedPackSize={selectedPackSize}
          setSelectedPackSize={setSelectedPackSize}
          priceRange={priceRange}
          setPriceRange={setPriceRange}
          selectedAvailability={selectedAvailability}
          setSelectedAvailability={setSelectedAvailability}
          onReset={handleReset}
        />

        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={() => setMobileFilterOpen(false)}
          sx={{ mt: 2, py: 1.2, borderRadius: 1 }}
        >
          Show {filteredProducts.length} Products
        </Button>
      </Drawer>
    </Box>
  );
}

export default function ShopPage() {
  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: '#FCFAF6' }}>
      <Header />
      <Suspense fallback={
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 12 }}>
          <CircularProgress color="secondary" />
        </Box>
      }>
        <ShopContent />
      </Suspense>
      <Footer />
    </Box>
  );
}
