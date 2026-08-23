'use client';

import React, { useState } from 'react';
import {
  Box,
  Tabs,
  Tab,
  Typography,
  Paper,
  Grid,
  Rating,
  LinearProgress,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Avatar,
  Chip,
  Stack
} from '@mui/material';
import {
  CheckCircle2,
  Soup,
  Timer,
  Flame,
  ChefHat,
  Utensils,
  Sparkles,
  ShieldCheck,
  Star,
  X
} from 'lucide-react';

export default function ProductTabs({ product }) {
  const [activeTab, setActiveTab] = useState(0);
  const [reviewModalOpen, setReviewModalOpen] = useState(false);
  const [reviewsList, setReviewsList] = useState(product.reviewList || []);
  const [newReview, setNewReview] = useState({ name: '', rating: 5, comment: '' });

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handleAddReview = (e) => {
    e.preventDefault();
    if (newReview.name.trim() && newReview.comment.trim()) {
      setReviewsList([
        {
          author: newReview.name,
          rating: newReview.rating,
          date: 'Just now',
          comment: newReview.comment
        },
        ...reviewsList
      ]);
      setNewReview({ name: '', rating: 5, comment: '' });
      setReviewModalOpen(false);
    }
  };

  return (
    <Box sx={{ mt: 6 }}>
      {/* Tabs Header */}
      <Paper
        elevation={0}
        sx={{
          borderRadius: 1,
          border: '1px solid #EAE5DC',
          backgroundColor: '#FFFFFF',
          mb: 3,
          overflow: 'hidden'
        }}
      >
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          variant="scrollable"
          scrollButtons="auto"
          textColor="primary"
          indicatorColor="secondary"
          sx={{
            px: 2,
            '& .MuiTab-root': {
              fontWeight: 800,
              fontSize: '0.88rem',
              py: 2,
              letterSpacing: '0.04em'
            }
          }}
        >
          <Tab label="DESCRIPTION" />
          <Tab label="INGREDIENTS" />
          <Tab label="NUTRITION" />
          <Tab label="HOW TO PREPARE" />
          <Tab label="STORAGE" />
          <Tab label={`REVIEWS (${reviewsList.length + 120})`} />
        </Tabs>
      </Paper>

      {/* Tab 0: Description */}
      {activeTab === 0 && (
        <Paper elevation={0} sx={{ p: 4, borderRadius: 1, border: '1px solid #EAE5DC', backgroundColor: '#FFFFFF' }}>
          <Typography variant="h6" fontWeight={800} color="primary.main" gutterBottom>
            About {product.name}
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.8, mb: 3 }}>
            {product.description}
          </Typography>

          <Typography variant="subtitle1" fontWeight={800} gutterBottom sx={{ mt: 2 }}>
            Key Product Highlights:
          </Typography>
          <Grid container spacing={2}>
            {(product.highlights || ['Crisp & Golden Finish', 'No Fermentation Needed', 'Consistent Restaurant Taste', '100% Preservative Free']).map((hl, i) => (
              <Grid item xs={12} sm={6} key={i}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                  <CheckCircle2 size={18} color="#16A34A" />
                  <Typography variant="body2" fontWeight={600}>
                    {hl}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Paper>
      )}

      {/* Tab 1: Ingredients */}
{activeTab === 1 && (
  <Paper elevation={0} sx={{ p: 4, borderRadius: 1, border: '1px solid #EAE5DC', backgroundColor: '#FFFFFF' }}>
    <Typography variant="h6" fontWeight={800} color="primary.main" gutterBottom>
      Pure, Honest & Simple Ingredients
    </Typography>
    <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
      Made exclusively with natural South Indian pantry staples. Absolutely zero palm oil, zero synthetic colorants, and zero artificial flavors.
    </Typography>

    <Grid container spacing={1.5}>
      {(() => {
        const raw = product.ingredients;
        const ingredientList = Array.isArray(raw)
          ? raw
          : typeof raw === 'string' && raw.trim()
          ? raw.split(',').map((s) => s.trim()).filter(Boolean)
          : ['Premium Parboiled Rice', 'Urad Dal', 'Fenugreek Seeds', 'Iodized Salt'];

        return ingredientList.map((ing, i) => (
          <Grid item xs={12} sm={6} key={i}>
            <Paper
              elevation={0}
              sx={{
                p: 1.8,
                borderRadius: 1,
                backgroundColor: '#FCFAF6',
                border: '1px solid #EAE5DC',
                display: 'flex',
                alignItems: 'center',
                gap: 1.5
              }}
            >
              <Sparkles size={16} color="#1E4D2B" />
              <Typography variant="body2" fontWeight={700}>
                {ing}
              </Typography>
            </Paper>
          </Grid>
        ));
      })()}
    </Grid>
  </Paper>
)}

      {/* Tab 2: Nutrition */}
      {activeTab === 2 && (
        <Paper elevation={0} sx={{ p: 4, borderRadius: 1, border: '1px solid #EAE5DC', backgroundColor: '#FFFFFF' }}>
          <Typography variant="h6" fontWeight={800} color="primary.main" gutterBottom>
            Nutritional Values (Per 100g)
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            Approximate values per 100g of dry mix.
          </Typography>

          <Box sx={{ maxWidth: 500 }}>
            {(product.nutrition || [
              { label: 'Energy / Calories', value: '354 kcal' },
              { label: 'Protein', value: '11.8 g' },
              { label: 'Carbohydrates', value: '72.4 g' },
              { label: 'Dietary Fiber', value: '4.2 g' },
              { label: 'Total Fat', value: '1.2 g' },
              { label: 'Sodium', value: '480 mg' }
            ]).map((nut, idx) => (
              <Box
                key={nut.label}
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  py: 1.2,
                  borderBottom: '1px solid #F1EFE9',
                  backgroundColor: idx % 2 === 0 ? '#FCFAF6' : 'transparent',
                  px: 2,
                  borderRadius: 1
                }}
              >
                <Typography variant="body2" fontWeight={600} color="text.primary">
                  {nut.label}
                </Typography>
                <Typography variant="body2" fontWeight={800} color="primary.main">
                  {nut.value}
                </Typography>
              </Box>
            ))}
          </Box>
        </Paper>
      )}

      {/* Tab 3: How to Prepare */}
      {activeTab === 3 && (
        <Paper elevation={0} sx={{ p: 4, borderRadius: 1, border: '1px solid #EAE5DC', backgroundColor: '#FFFFFF' }}>
          <Typography variant="h6" fontWeight={800} color="primary.main" gutterBottom>
            5-Minute Preparation Method
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            Follow these simple steps for golden crispy restaurant-style dosas at home.
          </Typography>

          <Grid container spacing={2.5}>
            {(product.preparation || [
              { step: 1, title: 'MIX', desc: 'Whisk 1 cup DOSIFY mix with 1.25 cups room-temperature water.' },
              { step: 2, title: 'PREPARE', desc: 'Allow batter to rest for 5 minutes for optimal hydration.' },
              { step: 3, title: 'POUR', desc: 'Heat a tawa on medium-high and pour a ladleful in center.' },
              { step: 4, title: 'COOK', desc: 'Spread smoothly, drizzle ghee, and roast till golden.' },
              { step: 5, title: 'ENJOY', desc: 'Fold and serve hot with fresh chutneys and sambar.' }
            ]).map((p) => (
              <Grid item xs={12} sm={6} md={2.4} key={p.step}>
                <Paper
                  elevation={0}
                  sx={{
                    p: 2.5,
                    height: '100%',
                    borderRadius: 1,
                    backgroundColor: '#FCFAF6',
                    border: '1px solid #EAE5DC',
                    textAlign: 'center'
                  }}
                >
                  <Chip label={`Step ${p.step}`} size="small" sx={{ mb: 1.5, fontWeight: 800, backgroundColor: '#E8F5E9', color: '#1E4D2B' }} />
                  <Typography variant="subtitle2" fontWeight={800} gutterBottom>
                    {p.title}
                  </Typography>
                  <Typography variant="caption" color="text.secondary" sx={{ display: 'block', lineHeight: 1.5 }}>
                    {p.desc}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Paper>
      )}

      {/* Tab 4: Storage */}
      {activeTab === 4 && (
        <Paper elevation={0} sx={{ p: 4, borderRadius: 1, border: '1px solid #EAE5DC', backgroundColor: '#FFFFFF' }}>
          <Typography variant="h6" fontWeight={800} color="primary.main" gutterBottom>
            Storage & Shelf Life
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.8, maxWidth: 650 }}>
            {product.storage || 'Store in a cool, dry place away from direct sunlight. Once opened, transfer contents into an airtight container or zip lock tightly. Consume within 45 days of opening.'}
          </Typography>
        </Paper>
      )}

      {/* Tab 5: Reviews */}
      {activeTab === 5 && (
        <Paper elevation={0} sx={{ p: 4, borderRadius: 1, border: '1px solid #EAE5DC', backgroundColor: '#FFFFFF' }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 2, mb: 4 }}>
            <Box>
              <Typography variant="h5" fontWeight={900} color="primary.main">
                Customer Reviews
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 0.5 }}>
                <Rating value={product.rating || 4.8} precision={0.1} readOnly sx={{ color: '#F59E0B' }} />
                <Typography variant="subtitle1" fontWeight={800}>
                  {product.rating || 4.8} out of 5
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  (Based on {reviewsList.length + 120} verified reviews)
                </Typography>
              </Box>
            </Box>

            <Button
              variant="contained"
              color="secondary"
              onClick={() => setReviewModalOpen(true)}
              startIcon={<Star size={16} />}
              sx={{ borderRadius: 1, fontWeight: 800 }}
            >
              Write a Review
            </Button>
          </Box>

          <Divider sx={{ mb: 4 }} />

          {/* Reviews List */}
          <Stack spacing={3}>
            {reviewsList.map((rev, index) => (
              <Box key={index} sx={{ pb: 2.5, borderBottom: '1px solid #F1EFE9' }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                    <Avatar sx={{ bgcolor: 'primary.main', width: 34, height: 34, fontSize: '0.85rem', fontWeight: 700 }}>
                      {rev.author[0]}
                    </Avatar>
                    <Box>
                      <Typography variant="subtitle2" fontWeight={800}>
                        {rev.author}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        Verified Buyer • {rev.date}
                      </Typography>
                    </Box>
                  </Box>
                  <Rating value={rev.rating} precision={0.5} size="small" readOnly sx={{ color: '#F59E0B' }} />
                </Box>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 1, lineHeight: 1.7 }}>
                  {rev.comment}
                </Typography>
              </Box>
            ))}
          </Stack>
        </Paper>
      )}

      {/* Write Review Dialog */}
      <Dialog
        open={reviewModalOpen}
        onClose={() => setReviewModalOpen(false)}
        maxWidth="xs"
        fullWidth
        PaperProps={{ sx: { borderRadius: 1, p: 1 } }}
      >
        <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6" fontWeight={800}>Write a Review</Typography>
          <Button onClick={() => setReviewModalOpen(false)} size="small" sx={{ minWidth: 'auto', p: 0.5 }}>
            <X size={20} />
          </Button>
        </DialogTitle>
        <Box component="form" onSubmit={handleAddReview}>
          <DialogContent>
            <Box sx={{ mb: 2, textAlign: 'center' }}>
              <Typography variant="caption" color="text.secondary" display="block" sx={{ mb: 0.5 }}>
                Your Rating
              </Typography>
              <Rating
                value={newReview.rating}
                onChange={(e, val) => setNewReview({ ...newReview, rating: val })}
                size="large"
                sx={{ color: '#F59E0B' }}
              />
            </Box>
            <TextField
              label="Your Name"
              value={newReview.name}
              onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
              fullWidth
              size="small"
              required
              sx={{ mb: 2 }}
            />
            <TextField
              label="Your Review"
              value={newReview.comment}
              onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
              fullWidth
              size="small"
              multiline
              rows={3}
              required
              placeholder="How crisp and easy was your dosa preparation?"
            />
          </DialogContent>
          <DialogActions sx={{ p: 2, pt: 0 }}>
            <Button onClick={() => setReviewModalOpen(false)}>Cancel</Button>
            <Button type="submit" variant="contained" color="secondary" sx={{ borderRadius: 1 }}>
              Submit Review
            </Button>
          </DialogActions>
        </Box>
      </Dialog>
    </Box>
  );
}
