import './../styles/globals.css';
import ThemeRegistry from './ThemeRegistry';
import { ProductProvider } from '../context/ProductContext';
import { CartProvider } from '../context/CartContext';
import { AuthProvider } from '../context/AuthContext';
import CartDrawer from '../components/cart/CartDrawer';
import CheckoutModal from '../components/cart/CheckoutModal';

export const metadata = {
  title: 'DOSIFY – Instant Dosa Batter Mix | Fresh. Fast. Favorite.',
  description: 'Instant Dosa Batter Mix. Fresh. Fast. Favorite. Make crispy, delicious restaurant-style South Indian dosa anytime without traditional batter preparation.',
  keywords: 'dosa batter mix, instant dosa, south indian breakfast, crisp dosa, batter mix',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&family=Inter:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <ThemeRegistry>
          <AuthProvider>
            <ProductProvider>
              <CartProvider>
                {children}
                <CartDrawer />
                <CheckoutModal />
              </CartProvider>
            </ProductProvider>
          </AuthProvider>
        </ThemeRegistry>
      </body>
    </html>
  );
}
