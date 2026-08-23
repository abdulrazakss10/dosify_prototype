'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Drawer,
  Box,
  Typography,
  IconButton,
  Button,
  Divider,
  TextField,
  Chip,
  Alert,
  Stack,
  useTheme
} from '@mui/material';
import {
  X,
  Plus,
  Minus,
  Trash2,
  ShoppingBag,
  ArrowRight,
  Tag,
  ShieldCheck,
  Truck
} from 'lucide-react';
import { useCart } from '../../context/CartContext';

export default function CartDrawer() {
  const theme = useTheme();
  const {
    cart,
    isCartOpen,
    closeCart,
    removeFromCart,
    updateQuantity,
    subtotal,
    discountAmount,
    deliveryFee,
    total,
    totalItems,
    couponCode,
    couponDiscount,
    couponError,
    applyCoupon,
    removeCoupon,
    openCheckout
  } = useCart();

  const [inputCode, setInputCode] = useState('');

  const handleApply = (e) => {
    e.preventDefault();
    applyCoupon(inputCode);
  };

  return (
    <Drawer
      anchor="right"
      open={isCartOpen}
      onClose={closeCart}
      PaperProps={{
        sx: {
          width: { xs: '100%', sm: 440 },
          maxWidth: '100%',
          backgroundColor: '#FFFFFF',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '-8px 0 25px rgba(0,0,0,0.12)'
        }
      }}
    >
      {/* Header */}
      <Box
        sx={{
          p: 2.5,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: '1px solid',
          borderColor: 'divider',
          backgroundColor: '#FCFAF6'
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <ShoppingBag size={22} color={theme.palette.primary.main} />
          <Typography variant="h6" fontWeight={800} color="primary.main">
            Your Cart
          </Typography>
          <Chip
            label={`${totalItems} item${totalItems === 1 ? '' : 's'}`}
            size="small"
            sx={{
              backgroundColor: '#E8F5E9',
              color: 'primary.main',
              fontWeight: 700,
              fontSize: '0.75rem'
            }}
          />
        </Box>
        <IconButton onClick={closeCart} size="small" sx={{ color: 'text.secondary' }}>
          <X size={20} />
        </IconButton>
      </Box>

      {/* Free Shipping Progress Bar */}
      <Box sx={{ px: 2.5, py: 1.5, backgroundColor: subtotal >= 299 ? '#F0FDF4' : '#FFFBEB', borderBottom: '1px solid', borderColor: 'divider' }}>
        <Typography variant="caption" sx={{ display: 'flex', alignItems: 'center', gap: 1, fontWeight: 700, color: subtotal >= 299 ? 'success.dark' : 'secondary.dark' }}>
          <Truck size={15} />
          {subtotal >= 299
            ? '🎉 You unlocked FREE Delivery!'
            : `Add ₹${299 - subtotal} more to get FREE Delivery!`}
        </Typography>
      </Box>

      {/* Cart Content Area */}
      <Box sx={{ flex: 1, overflowY: 'auto', p: 2.5 }}>
        {cart.length === 0 ? (
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              height: '100%',
              textAlign: 'center',
              py: 8
            }}
          >
            <Box
              sx={{
                width: 90,
                height: 90,
                borderRadius: '50%',
                backgroundColor: '#F7F2EB',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mb: 2.5
              }}
            >
              <ShoppingBag size={44} color="#94A3B8" />
            </Box>
            <Typography variant="h6" fontWeight={700} gutterBottom>
              Your cart is empty
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3, maxWidth: 260 }}>
              Looks like you haven&apos;t added any delicious dosa mixes yet.
            </Typography>
            <Button
              variant="contained"
              color="secondary"
              onClick={closeCart}
              component={Link}
              href="/shop"
              sx={{ px: 4, py: 1.2, borderRadius: 1 }}
            >
              Explore Products
            </Button>
          </Box>
        ) : (
          <Stack spacing={2}>
            {cart.map((item) => (
              <Box
                key={`${item.id}-${item.packSize}`}
                sx={{
                  display: 'flex',
                  gap: 2,
                  p: 1.5,
                  borderRadius: 1,
                  border: '1px solid',
                  borderColor: 'divider',
                  backgroundColor: '#FAFAF9',
                  transition: 'all 0.2s',
                  '&:hover': {
                    borderColor: '#CBD5E1',
                    boxShadow: '0 2px 6px rgba(0,0,0,0.04)'
                  }
                }}
              >
                {/* Product Image */}
                <Box
                  component={Link}
                  href={`/shop/${item.slug}`}
                  onClick={closeCart}
                  sx={{
                    width: 72,
                    height: 72,
                    borderRadius: 1,
                    overflow: 'hidden',
                    backgroundColor: '#FFFFFF',
                    border: '1px solid #EAE5DC',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                  />
                </Box>

                {/* Details */}
                <Box sx={{ flex: 1, minWidth: 0 }}>
                  <Typography
                    variant="subtitle2"
                    fontWeight={700}
                    noWrap
                    component={Link}
                    href={`/shop/${item.slug}`}
                    onClick={closeCart}
                    sx={{
                      color: 'text.primary',
                      display: 'block',
                      '&:hover': { color: 'primary.main' }
                    }}
                  >
                    {item.name}
                  </Typography>

                  <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 0.5 }}>
                    Pack Size: <strong>{item.packSize}</strong>
                  </Typography>

                  <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 1, mb: 1 }}>
                    <Typography variant="subtitle2" fontWeight={800} color="secondary.main">
                      ₹{item.price * item.quantity}
                    </Typography>
                    {item.quantity > 1 && (
                      <Typography variant="caption" color="text.secondary">
                        (₹{item.price} each)
                      </Typography>
                    )}
                  </Box>

                  {/* Quantity Controls */}
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Box
                      sx={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        border: '1px solid #CBD5E1',
                        borderRadius: 1,
                        padding: '5px',
                        backgroundColor: '#FFFFFF'
                      }}
                    >
                      <IconButton
                        size="small"
                        onClick={() => updateQuantity(item.id, item.packSize, -1)}
                        sx={{ p: 0.4 }}
                      >
                        <Minus size={14} />
                      </IconButton>
                      <Typography
                        variant="body2"
                        fontWeight={700}
                        sx={{ px: 1.5, minWidth: 24, textAlign: 'center' }}
                      >
                        {item.quantity}
                      </Typography>
                      <IconButton
                        size="small"
                        onClick={() => updateQuantity(item.id, item.packSize, 1)}
                        sx={{ p: 0.4 }}
                      >
                        <Plus size={14} />
                      </IconButton>
                    </Box>

                    <IconButton
                      size="small"
                      color="error"
                      onClick={() => removeFromCart(item.id, item.packSize)}
                      sx={{ p: 0.5, opacity: 0.8, '&:hover': { opacity: 1 } }}
                    >
                      <Trash2 size={16} />
                    </IconButton>
                  </Box>
                </Box>
              </Box>
            ))}
          </Stack>
        )}
      </Box>

      {/* Footer / Summary Area */}
      {cart.length > 0 && (
        <Box
          sx={{
            p: 2.5,
            borderTop: '1px solid',
            borderColor: 'divider',
            backgroundColor: '#FCFAF6'
          }}
        >
          {/* Coupon Code Section */}
          <Box sx={{ mb: 2 }}>
            {couponDiscount > 0 ? (
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  p: 1.2,
                  borderRadius: 1,
                  backgroundColor: '#DCFCE7',
                  border: '1px dashed #16A34A'
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Tag size={16} color="#16A34A" />
                  <Typography variant="body2" fontWeight={700} color="#15803D">
                    {couponCode} applied ({couponDiscount}% OFF)
                  </Typography>
                </Box>
                <Button
                  size="small"
                  color="error"
                  onClick={removeCoupon}
                  sx={{ minWidth: 'auto', p: 0.5, fontSize: '0.75rem', fontWeight: 700 }}
                >
                  Remove
                </Button>
              </Box>
            ) : (
              <Box component="form" onSubmit={handleApply} sx={{ display: 'flex', gap: 1 }}>
                <TextField
                  size="small"
                  placeholder="Coupon code (e.g. DOSA20)"
                  value={inputCode}
                  onChange={(e) => setInputCode(e.target.value)}
                  fullWidth
                  sx={{
                    backgroundColor: '#FFFFFF',
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 1,
                      fontSize: '0.85rem'
                    }
                  }}
                />
                <Button
                  type="submit"
                  variant="outlined"
                  color="primary"
                  sx={{ flexShrink: 0, px: 2, py:0, borderRadius: 1 }}
                >
                  Apply
                </Button>
              </Box>
            )}
            {couponError && (
              <Typography variant="caption" color="error.main" sx={{ mt: 0.5, display: 'block' }}>
                {couponError}
              </Typography>
            )}
          </Box>

          {/* Pricing Breakdown */}
          <Stack spacing={0.8} sx={{ mb: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="body2" color="text.secondary">
                Subtotal
              </Typography>
              <Typography variant="body2" fontWeight={600}>
                ₹{subtotal}
              </Typography>
            </Box>

            {discountAmount > 0 && (
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="body2" color="success.main" fontWeight={600}>
                  Discount ({couponDiscount}%)
                </Typography>
                <Typography variant="body2" color="success.main" fontWeight={700}>
                  -₹{discountAmount}
                </Typography>
              </Box>
            )}

            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="body2" color="text.secondary">
                Delivery Fee
              </Typography>
              <Typography variant="body2" fontWeight={600}>
                {deliveryFee === 0 ? (
                  <span style={{ color: '#16A34A' }}>FREE</span>
                ) : (
                  `₹${deliveryFee}`
                )}
              </Typography>
            </Box>

            <Divider sx={{ my: 0.5 }} />

            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
              <Typography variant="subtitle1" fontWeight={800}>
                Total Amount
              </Typography>
              <Typography variant="h6" fontWeight={900} color="secondary.main">
                ₹{total}
              </Typography>
            </Box>
          </Stack>

          {/* Checkout CTA */}
          <Button
            variant="contained"
            color="secondary"
            fullWidth
            size="large"
            onClick={openCheckout}
            endIcon={<ArrowRight size={18} />}
            sx={{
              py: 1.4,
              fontSize: '1rem',
              fontWeight: 800,
              borderRadius: 1,
              boxShadow: '0 4px 14px rgba(217, 119, 6, 0.35)'
            }}
          >
            PROCEED TO CHECKOUT
          </Button>

          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1, mt: 1.5 }}>
            <ShieldCheck size={14} color="#64748B" />
            <Typography variant="caption" color="text.secondary">
              Safe & Secure Demo Checkout • No Real Payment
            </Typography>
          </Box>
        </Box>
      )}
    </Drawer>
  );
}
