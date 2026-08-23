const fs = require('fs');
const path = require('path');

const content = `'use client';

import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  Box,
  Container,
  Grid,
  Breadcrumbs,
  Link as MuiLink,
  Typography,
  Button,
  CircularProgress,
  Paper
} from '@mui/material';
import { ChevronRight, ArrowLeft } from 'lucide-react';
import Header from '../../../components/common/Header';
import Footer from '../../../components/common/Footer';
import ProductGallery from '../../../components/product/ProductGallery';
import ProductInfo from '../../../components/product/ProductInfo';
import ProductTabs from '../../../components/product/ProductTabs';
import ProductCard from '../../../components/shop/ProductCard';
import { useProducts } from '../../../context/ProductContext';

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { products, isLoaded } = useProducts();

  const slug = params?.slug;

  const product = products.find(
    (p) => p.slug === slug || String(p.id) === String(slug)
  );

  const relatedProducts = products
    .filter((p) => p.id !== product?.id)
    .slice(0, 4);

  if (!isLoaded) {
    return (
      <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: '#FCFAF6' }}>
        <Header />
        <Box sx={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', py: 10 }}>
          <CircularProgress color="secondary" />
        </Box>
        <Footer />
      </Box>
    );
  }

  if (!product) {
    return (
      <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: '#FCFAF6' }}>
        <Header />
        <Container maxWidth="md" sx={{ flex: 1, py: 10, textAlign: 'center' }}>
          <Paper elevation={0} sx={{ p: 6, borderRadius: 3, border: '1px solid #EAE5DC', backgroundColor: '#FFFFFF' }}>
            <Typography variant="h5" fontWeight={800} gutterBottom>
              Product Not Found
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              We couldn't find the DOSIFY product you requested. It might have been updated or removed.
            </Typography>
            <Button
              variant="contained"
              color="secondary"
              component={Link}
              href="/shop"
              startIcon={<ArrowLeft size={16} />}
              sx={{ borderRadius: 2 }}
            >
              Back to Shop
            </Button>
          </Paper>
        </Container>
        <Footer />
      </Box>
    );
  }

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: '#FCFAF6' }}>
      <Header />

      <Box component="main" sx={{ flex: 1, py: { xs: 3, md: 5 } }}>
        <Container maxWidth="xl">
          {/* Breadcrumbs */}
          <Breadcrumbs
            separator={<ChevronRight size={14} />}
            aria-label="breadcrumb"
            sx={{ mb: 3.5, fontSize: '0.85rem' }}
          >
            <MuiLink component={Link} href="/" color="inherit" underline="hover">
              Home
            </MuiLink>
            <MuiLink component={Link} href="/shop" color="inherit" underline="hover">
              Shop
            </MuiLink>
            <Typography color="text.primary" fontWeight={700} fontSize="0.85rem">
              {product.name}
            </Typography>
          </Breadcrumbs>

          {/* Main 2-Column Product Layout */}
          <Grid container spacing={{ xs: 4, md: 6 }}>
            {/* Left Gallery */}
            <Grid item xs={12} md={6}>
              <ProductGallery product={product} />
            </Grid>

            {/* Right Details */}
            <Grid item xs={12} md={6}>
              <ProductInfo product={product} />
            </Grid>
          </Grid>

          {/* Deep Tabs Section */}
          <ProductTabs product={product} />

          {/* Related Products Section */}
          <Box sx={{ mt: 8, pt: 6, borderTop: '1px solid #EAE5DC' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
              <Typography variant="h4" fontWeight={900} letterSpacing="-0.02em" color="text.primary">
                You May Also Like
              </Typography>
              <Button
                component={Link}
                href="/shop"
                color="secondary"
                sx={{ fontWeight: 800 }}
              >
                View All
              </Button>
            </Box>

            <Grid container spacing={3}>
              {relatedProducts.map((rel) => (
                <Grid item xs={12} sm={6} md={3} key={rel.id}>
                  <ProductCard product={rel} />
                </Grid>
              ))}
            </Grid>
          </Box>
        </Container>
      </Box>

      <Footer />
    </Box>
  );
}
`;

fs.writeFileSync(path.join(__dirname, '../app/shop/[slug]/page.js'), content, 'utf8');
console.log('Product Details page written successfully!');
