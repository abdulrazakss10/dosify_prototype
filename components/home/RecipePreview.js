'use client';

import React, { useState } from 'react';
import {
  Box,
  Container,
  Grid,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Chip,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider
} from '@mui/material';
import { RECIPES_PREVIEW } from '../../data/mockData';
import { Utensils, X, Clock, Flame, CheckCircle2, ChevronRight } from 'lucide-react';

export default function RecipePreview() {
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  return (
    <Box
      id="recipes"
      sx={{
        py: { xs: 7, md: 9 },
        backgroundColor: '#FCFAF6',
        borderTop: '1px solid #EAE5DC'
      }}
    >
      <Container maxWidth="xl">
        <Box sx={{ textAlign: 'center', mb: 5 }}>
          <Typography variant="h4" fontWeight={900} letterSpacing="-0.02em" color="text.primary" gutterBottom>
            Inspiration from Our Kitchen
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 550, mx: 'auto' }}>
            Elevate your DOSIFY batter with delicious South Indian breakfast variations.
          </Typography>
        </Box>

        <Grid container spacing={3}>
          {RECIPES_PREVIEW.map((recipe) => (
            <Grid item xs={12} sm={6} md={3} key={recipe.id}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  borderRadius: 1,
                  border: '1px solid #EAE5DC',
                  backgroundColor: '#FFFFFF',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  transition: 'all 0.25s',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: '0 12px 24px rgba(0,0,0,0.08)'
                  }
                }}
                onClick={() => setSelectedRecipe(recipe)}
              >
                <Box sx={{ height: 170, backgroundColor: '#0F172A', overflow: 'hidden' }}>
                  <img
                    src={recipe.image}
                    alt={recipe.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </Box>
                <CardContent sx={{ p: 2.5, flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                    <Chip label={recipe.difficulty} size="small" sx={{ fontWeight: 700, fontSize: '0.7rem', backgroundColor: '#FEF3C7', color: '#B45309' }} />
                    <Typography variant="caption" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', gap: 0.5, fontWeight: 600 }}>
                      <Clock size={13} /> {recipe.time}
                    </Typography>
                  </Box>

                  <Typography variant="subtitle1" fontWeight={800} gutterBottom>
                    {recipe.title}
                  </Typography>

                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                      mb: 2,
                      fontSize: '0.85rem'
                    }}
                  >
                    {recipe.description}
                  </Typography>

                  <Button
                    variant="text"
                    color="secondary"
                    size="small"
                    endIcon={<ChevronRight size={16} />}
                    sx={{ mt: 'auto', p: 0, fontWeight: 800, justifyContent: 'flex-start' }}
                  >
                    View Recipe
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Recipe Modal */}
        <Dialog
          open={!!selectedRecipe}
          onClose={() => setSelectedRecipe(null)}
          maxWidth="sm"
          fullWidth
          PaperProps={{ sx: { borderRadius: 1, p: 1 } }}
        >
          {selectedRecipe && (
            <>
              <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', pb: 1 }}>
                <Box>
                  <Typography variant="h6" fontWeight={800} color="primary.main">
                    {selectedRecipe.title}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Prep Time: {selectedRecipe.time} • Difficulty: {selectedRecipe.difficulty}
                  </Typography>
                </Box>
                <IconButton onClick={() => setSelectedRecipe(null)} size="small">
                  <X size={20} />
                </IconButton>
              </DialogTitle>
              <DialogContent>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  {selectedRecipe.description}
                </Typography>

                <Typography variant="subtitle2" fontWeight={800} color="primary.main" gutterBottom>
                  Step-by-Step Instructions:
                </Typography>
                <List dense disablePadding>
                  {selectedRecipe.steps.map((step, idx) => (
                    <ListItem key={idx} alignItems="flex-start" sx={{ px: 0, py: 0.8 }}>
                      <ListItemIcon sx={{ minWidth: 28, mt: 0.3 }}>
                        <CheckCircle2 size={16} color="#16A34A" />
                      </ListItemIcon>
                      <ListItemText
                        primary={<Typography variant="body2" fontWeight={500}>{step}</Typography>}
                      />
                    </ListItem>
                  ))}
                </List>
              </DialogContent>
            </>
          )}
        </Dialog>
      </Container>
    </Box>
  );
}
