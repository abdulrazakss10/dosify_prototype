'use client';

import React from 'react';
import { Box } from '@mui/material';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import Hero from '../components/home/Hero';
import ProductHighlights from '../components/home/ProductHighlights';
import WhyDosify from '../components/home/WhyDosify';
import HowItWorks from '../components/home/HowItWorks';
import Testimonials from '../components/home/Testimonials';
import RecipePreview from '../components/home/RecipePreview';
import CTA from '../components/home/CTA';

export default function HomePage() {
  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: '#FCFAF6' }}>
      <Header />
      <Box component="main" sx={{ flex: 1 }}>
        <Hero />
        <ProductHighlights />
        <WhyDosify />
        <HowItWorks />
        <Testimonials />
        <RecipePreview />
        <CTA />
      </Box>
      <Footer />
    </Box>
  );
}
