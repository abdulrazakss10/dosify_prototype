'use client';

import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
  Typography,
  IconButton,
  Button,
  TextField,
  Grid,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  Divider,
  Paper,
  Stack,
  Alert,
  CircularProgress,
  Chip
} from '@mui/material';
import {
  X,
  CheckCircle2,
  MapPin,
  CreditCard,
  QrCode,
  Banknote,
  Truck,
  ShoppingBag,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { useCart } from '../../context/CartContext';

export default function CheckoutModal() {
  const {
    isCheckoutOpen,
    closeCheckout,
    cart,
    subtotal,
    discountAmount,
    deliveryFee,
    total,
    placeOrder,
    placedOrder,
    setPlacedOrder
  } = useCart();

  const [activeStep, setActiveStep] = useState(1); // 1: Details & Payment, 2: Loading, 3: Success
  const [formData, setFormData] = useState({
    name: 'Abdul razak',
    email: 'priya.sundaram@example.com',
    phone: '9876543210',
    address: 'Flat 402, Green View Apartments, 12th Main Indiranagar',
    city: 'Bangalore',
    state: 'Karnataka',
    pincode: '560038',
    paymentMethod: 'UPI'
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (!formData.phone.trim() || formData.phone.length < 10) newErrors.phone = 'Valid 10-digit phone required';
    if (!formData.address.trim()) newErrors.address = 'Delivery address is required';
    if (!formData.pincode.trim() || formData.pincode.length < 6) newErrors.pincode = 'Valid 6-digit PIN required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePlaceOrder = () => {
    if (!validate()) return;

    setActiveStep(2); // Show loading spinner
    setTimeout(() => {
      const order = placeOrder(formData);
      setActiveStep(3); // Success step

      // Trigger Confetti Celebration!
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (e) {
        // ignore
      }
    }, 1200);
  };

  const handleClose = () => {
    setActiveStep(1);
    setPlacedOrder(null);
    closeCheckout();
  };

  return (
    <Dialog
      open={isCheckoutOpen}
      onClose={activeStep === 2 ? undefined : handleClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 1,
          backgroundColor: '#FCFAF6',
          p: { xs: 1, sm: 2 }
        }
      }}
    >
      {/* Header */}
      <DialogTitle
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          pb: 1,
          borderBottom: '1px solid',
          borderColor: 'divider'
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <Box
            sx={{
              width: 38,
              height: 38,
              borderRadius: '50%',
              backgroundColor: '#E8F5E9',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <ShoppingBag size={20} color="#1E4D2B" />
          </Box>
          <Box>
            <Typography variant="h6" fontWeight={800} color="primary.main">
              {activeStep === 3 ? 'Order Confirmed!' : 'Mock Checkout'}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {activeStep === 3 ? 'Thank you for ordering with DOSIFY' : 'Prototype Demo • Instant Verification'}
            </Typography>
          </Box>
        </Box>
        {activeStep !== 2 && (
          <IconButton onClick={handleClose} size="small">
            <X size={20} />
          </IconButton>
        )}
      </DialogTitle>

      <DialogContent sx={{ mt: 2 }}>
        {/* Step 2: Loading animation */}
        {activeStep === 2 && (
          <Box sx={{ py: 10, textAlign: 'center' }}>
            <CircularProgress color="secondary" size={56} thickness={4} sx={{ mb: 3 }} />
            <Typography variant="h6" fontWeight={700}>
              Processing your Demo Order...
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Generating fresh batch tokens and instant confirmation
            </Typography>
          </Box>
        )}

        {/* Step 3: Success Screen */}
        {activeStep === 3 && placedOrder && (
          <Box sx={{ py: 3, textAlign: 'center' }}>
            <Box
              sx={{
                width: 76,
                height: 76,
                borderRadius: '50%',
                backgroundColor: '#DCFCE7',
                color: '#16A34A',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mx: 'auto',
                mb: 2
              }}
            >
              <CheckCircle2 size={46} />
            </Box>

            <Typography variant="h4" fontWeight={900} color="primary.main" gutterBottom>
              Order Placed Successfully!
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 480, mx: 'auto', mb: 3 }}>
              Your fresh DOSIFY batter packs will be delivered in <strong>2-3 business days</strong>.
            </Typography>

            <Paper
              elevation={0}
              sx={{
                p: 3,
                backgroundColor: '#FFFFFF',
                borderRadius: 2,
                border: '1px solid #EAE5DC',
                maxWidth: 540,
                mx: 'auto',
                textAlign: 'left'
              }}
            >
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Box>
                  <Typography variant="caption" color="text.secondary">
                    ORDER ID
                  </Typography>
                  <Typography variant="subtitle1" fontWeight={800} color="secondary.main">
                    #{placedOrder.id}
                  </Typography>
                </Box>
                <Chip
                  label="Processing Demo"
                  color="success"
                  size="small"
                  sx={{ fontWeight: 700 }}
                />
              </Box>

              <Divider sx={{ my: 1.5 }} />

              <Typography variant="subtitle2" fontWeight={700} gutterBottom>
                Delivery Address:
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                {placedOrder.customer} ({placedOrder.phone})<br />
                {placedOrder.address}
              </Typography>

              <Divider sx={{ my: 1.5 }} />

              <Typography variant="subtitle2" fontWeight={700} gutterBottom>
                Payment Summary:
              </Typography>
              <Stack spacing={0.5}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="body2" color="text.secondary">
                    Method:
                  </Typography>
                  <Typography variant="body2" fontWeight={600}>
                    {placedOrder.paymentMethod}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="body2" color="text.secondary">
                    Total Paid:
                  </Typography>
                  <Typography variant="subtitle2" fontWeight={800} color="secondary.main">
                    ₹{placedOrder.total}
                  </Typography>
                </Box>
              </Stack>
            </Paper>

            <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center', gap: 2 }}>
              <Button
                variant="contained"
                color="primary"
                onClick={handleClose}
                sx={{ px: 4, py: 1.2, borderRadius: 1 }}
              >
                Continue Shopping
              </Button>
            </Box>
          </Box>
        )}

        {/* Step 1: Input Form */}
        {activeStep === 1 && (
          <Grid container spacing={3}>
            {/* Left: Shipping & Payment Details */}
            <Grid item xs={12} md={7}>
              <Typography variant="subtitle1" fontWeight={800} color="primary.main" sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                <MapPin size={18} /> 1. Shipping Details
              </Typography>

              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Full Name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    error={!!errors.name}
                    helperText={errors.name}
                    fullWidth
                    size="small"
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Phone Number"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    error={!!errors.phone}
                    helperText={errors.phone}
                    fullWidth
                    size="small"
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Email Address"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    error={!!errors.email}
                    helperText={errors.email}
                    fullWidth
                    size="small"
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Flat / Street Address"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    error={!!errors.address}
                    helperText={errors.address}
                    fullWidth
                    size="small"
                    multiline
                    rows={2}
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    label="City"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    fullWidth
                    size="small"
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    label="State"
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                    fullWidth
                    size="small"
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    label="PIN Code"
                    name="pincode"
                    value={formData.pincode}
                    onChange={handleInputChange}
                    error={!!errors.pincode}
                    helperText={errors.pincode}
                    fullWidth
                    size="small"
                    required
                  />
                </Grid>
              </Grid>

              <Divider sx={{ my: 3 }} />

              <Typography variant="subtitle1" fontWeight={800} color="primary.main" sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
                <CreditCard size={18} /> 2. Payment Method
              </Typography>

              <FormControl component="fieldset" fullWidth>
                <RadioGroup
                  name="paymentMethod"
                  value={formData.paymentMethod}
                  onChange={handleInputChange}
                >
                  <Paper
                    variant="outlined"
                    sx={{
                      p: 1.5,
                      mb: 1.2,
                      borderRadius: 1,
                      borderColor: formData.paymentMethod === 'UPI' ? 'primary.main' : 'divider',
                      backgroundColor: formData.paymentMethod === 'UPI' ? '#F0FDF4' : '#FFFFFF'
                    }}
                  >
                    <FormControlLabel
                      value="UPI"
                      control={<Radio size="small" color="primary" />}
                      label={
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <QrCode size={18} color="#16A34A" />
                          <Typography variant="body2" fontWeight={700}>
                            UPI / QR (Google Pay, PhonePe, Paytm)
                          </Typography>
                        </Box>
                      }
                    />
                  </Paper>

                  <Paper
                    variant="outlined"
                    sx={{
                      p: 1.5,
                      mb: 1.2,
                      borderRadius: 1,
                      borderColor: formData.paymentMethod === 'Card' ? 'primary.main' : 'divider',
                      backgroundColor: formData.paymentMethod === 'Card' ? '#F0FDF4' : '#FFFFFF'
                    }}
                  >
                    <FormControlLabel
                      value="Card"
                      control={<Radio size="small" color="primary" />}
                      label={
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <CreditCard size={18} color="#2563EB" />
                          <Typography variant="body2" fontWeight={700}>
                            Credit / Debit Card (Visa, MasterCard, RuPay)
                          </Typography>
                        </Box>
                      }
                    />
                  </Paper>

                  <Paper
                    variant="outlined"
                    sx={{
                      p: 1.5,
                      borderRadius: 1,
                      borderColor: formData.paymentMethod === 'COD' ? 'primary.main' : 'divider',
                      backgroundColor: formData.paymentMethod === 'COD' ? '#F0FDF4' : '#FFFFFF'
                    }}
                  >
                    <FormControlLabel
                      value="COD"
                      control={<Radio size="small" color="primary" />}
                      label={
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Banknote size={18} color="#D97706" />
                          <Typography variant="body2" fontWeight={700}>
                            Cash on Delivery (COD)
                          </Typography>
                        </Box>
                      }
                    />
                  </Paper>
                </RadioGroup>
              </FormControl>
            </Grid>

            {/* Right: Order Summary Sidebar */}
            <Grid item xs={12} md={5}>
              <Paper
                elevation={0}
                sx={{
                  p: 2.5,
                  borderRadius: 1,
                  border: '1px solid #EAE5DC',
                  backgroundColor: '#FFFFFF'
                }}
              >
                <Typography variant="subtitle1" fontWeight={800} gutterBottom>
                  Order Items ({cart.reduce((a, b) => a + b.quantity, 0)})
                </Typography>

                <Box sx={{ maxHeight: 200, overflowY: 'auto', mb: 2 }}>
                  {cart.map((item) => (
                    <Box
                      key={`${item.id}-${item.packSize}`}
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        py: 1,
                        borderBottom: '1px dashed #EAE5DC'
                      }}
                    >
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                        <img
                          src={item.image}
                          alt={item.name}
                          style={{ width: 36, height: 36, objectFit: 'contain' }}
                        />
                        <Box>
                          <Typography variant="caption" fontWeight={700} display="block">
                            {item.name}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {item.packSize} • Qty: {item.quantity}
                          </Typography>
                        </Box>
                      </Box>
                      <Typography variant="caption" fontWeight={700}>
                        ₹{item.price * item.quantity}
                      </Typography>
                    </Box>
                  ))}
                </Box>

                <Stack spacing={1} sx={{ mb: 2.5 }}>
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
                        Coupon Discount
                      </Typography>
                      <Typography variant="body2" color="success.main" fontWeight={700}>
                        -₹{discountAmount}
                      </Typography>
                    </Box>
                  )}

                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="body2" color="text.secondary">
                      Delivery
                    </Typography>
                    <Typography variant="body2" fontWeight={600}>
                      {deliveryFee === 0 ? <span style={{ color: '#16A34A' }}>FREE</span> : `₹${deliveryFee}`}
                    </Typography>
                  </Box>

                  <Divider sx={{ my: 0.5 }} />

                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="subtitle1" fontWeight={800}>
                      Total to Pay
                    </Typography>
                    <Typography variant="h6" fontWeight={900} color="secondary.main">
                      ₹{total}
                    </Typography>
                  </Box>
                </Stack>

                <Button
                  variant="contained"
                  color="secondary"
                  fullWidth
                  size="large"
                  onClick={handlePlaceOrder}
                  endIcon={<ArrowRight size={18} />}
                  sx={{
                    py: 1.4,
                    fontSize: '1rem',
                    fontWeight: 800,
                    borderRadius: 1
                  }}
                >
                  PLACE DEMO ORDER
                </Button>
              </Paper>
            </Grid>
          </Grid>
        )}
      </DialogContent>
    </Dialog>
  );
}
