# DOSIFY – Premium Instant Dosa Batter Mix (Frontend Prototype)

> **"Instant Dosa Batter Mix. Fresh. Fast. Favorite."**
> A high-fidelity, interactive, responsive Next.js frontend prototype built with React, Material UI (MUI), Emotion, and Lucide Icons.

---

## 🌟 Overview & Features

This prototype implements a complete, modern South Indian food e-commerce website and admin catalog management experience matching the design reference:

1. **Home Page (`/`)**:
   - High-impact hero section with crispy dosa platter and DOSIFY pouch visual.
   - **"Made for Your Dosa Cravings"** bestseller product highlights with direct cart integration.
   - **"Why DOSIFY?"** 4 value proposition cards.
   - **"Dosa Made Simple"** 5-step visual preparation process (MIX, PREPARE, POUR, COOK, ENJOY).
   - **Customer Reviews** & verified buyer testimonials.
   - **Recipes & Inspiration Preview** with step-by-step modal guides.
   - Final CTA banner & rich South Indian brand footer.

2. **Shop Page (`/shop`)**:
   - Sidebar filters: Category, Pack Size, Interactive Price Slider (₹100 - ₹600), and Stock Availability.
   - Mobile-responsive sliding filter drawer.
   - Sorting dropdown: Recommended, Price: Low to High, Price: High to Low, Best Rated.
   - 8+ rich product cards with dual pricing, discounts, Add to Cart & Buy Now buttons.
   - Live search integration.

3. **Product Details Page (`/shop/[slug]`)**:
   - High-res product packaging image gallery with interactive thumbnails.
   - Dynamic pack size switcher (`500g`, `700g`, `1kg`) that recalculates unit price, savings, and serving yields in real time.
   - Quantity selector (`-` / `+`).
   - Tabbed content: Description, Ingredients, Nutrition table, 5-Minute Preparation Guide, Storage instructions, and Verified Customer Reviews with interactive "Write Review" modal.
   - Related products carousel.

4. **Admin Portal (`/admin/login` & `/admin/dashboard`)**:
   - **Mock Login**: Fast demo 1-click credential filler (`admin@dosify.com` / `admin123`).
   - **Dashboard Overview**: 4 live metric cards (Total Products, Active Products, Low Stock Alerts, Total Orders).
   - **Product CRUD**:
     - `+ ADD PRODUCT` dialog with packaging visual selector, price, stock, category, and ingredient inputs.
     - `EDIT PRODUCT` modal with prefilled data and instant updates.
     - `DELETE PRODUCT` safe confirmation dialog.
     - `PREVIEW PRODUCT` instant card view.
     - Pagination, live status badges (Active, Low Stock, Out of Stock), search, and filter chips.

5. **Cart Drawer & Demo Checkout**:
   - Right-side slide-out cart drawer with live quantity controls and delete actions.
   - Promo coupon code support (Try `DOSA20` for 20% off!).
   - Free shipping calculation threshold (Free over ₹299).
   - 3-step checkout flow (Shipping Details → Payment Method [UPI / Card / COD] → Demo Order Confirmation with celebratory confetti and Order ID `#DOS-XXXXX`).

6. **Local Persistence**:
   - Safe `localStorage` synchronization for `dosify_products`, `dosify_cart`, `dosify_admin_auth`, and `dosify_orders`. Any products added or edited in the Admin dashboard immediately reflect on the Home, Shop, and Product Details pages!

---

## 🚀 Quick Start

### 1. Install dependencies
```bash
npm install
```

### 2. Run the development server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Build for Production
```bash
npm run build
npm start
```

---

## 🔑 Demo Credentials
- **Admin Email**: `admin@dosify.com`
- **Admin Password**: `admin123`
- **Demo Coupon**: `DOSA20` (20% discount) or `FIRST50` (15% discount)

---

## 📁 Project Architecture
```text
dosify-prototype/
├── app/
│   ├── layout.js                 # Global Root Layout with Providers
│   ├── page.js                   # Page 1: Home Page
│   ├── ThemeRegistry.js          # MUI Emotion SSR Cache Provider
│   ├── shop/
│   │   ├── page.js               # Page 2: Shop Page (Product Listing)
│   │   └── [slug]/page.js        # Page 3: Product Details Page
│   └── admin/
│       ├── login/page.js         # Page 4A: Admin Login
│       └── dashboard/page.js     # Page 4B: Admin Product Management
├── components/
│   ├── common/                   # Header, Footer
│   ├── home/                     # Hero, Highlights, WhyDosify, HowItWorks, etc.
│   ├── shop/                     # ProductCard, ProductFilters
│   ├── product/                  # ProductGallery, ProductInfo, ProductTabs
│   ├── cart/                     # CartDrawer, CheckoutModal
│   └── admin/                    # AdminSidebar, DashboardStats, CRUD Dialogs
├── context/                      # ProductContext, CartContext, AuthContext
├── data/                         # mockData.js (Central Product Store)
├── public/images/                # SVG Packaging graphics & food illustrations
└── styles/                       # globals.css, theme.js
```
