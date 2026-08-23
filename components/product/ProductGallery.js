'use client';

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
    <Box sx={{ display: 'flex', flexDirection: { xs: 'column-reverse', sm: 'row' }, gap: 1.5 }}>
      {/* Thumbnail Selector Column (left on desktop, horizontal row on mobile) */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'row', sm: 'column' },
          gap: 1.5,
          overflowX: { xs: 'auto', sm: 'visible' },
          overflowY: { xs: 'visible', sm: 'auto' },
          maxHeight: { sm: 480 },
          pb: { xs: 1, sm: 0 },
          pr: { sm: 0.5 },
        }}
      >
        {images.map((img, idx) => (
          <Paper
            key={idx}
            elevation={0}
            onClick={() => setSelectedImage(idx)}
            sx={{
              width: 80,
              height: 80,
              borderRadius: 1,
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

      {/* Main Large Image Container */}
      <Paper
        elevation={0}
        sx={{
          borderRadius: 2,
          border: '1px solid #EAE5DC',
          backgroundColor: '#FFFFFF',
          overflow: 'hidden',
          height: { xs: 320, sm: 420, md: 480 },
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
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
    </Box>
  );
}