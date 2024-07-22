import './css/style.css';
import { Inter, Architects_Daughter } from 'next/font/google';
import ServerHeader from '@/components/ui/ServerHeader';
import CookieBanner from '@/components/cookieconsent';
import StickyIcons from '@/components/ui/StickyIcons';
import { CartProvider } from '@/components/ui/CartContext';
import { Metadata } from 'next'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const architects_daughter = Architects_Daughter({
  subsets: ['latin'],
  variable: '--font-architects-daughter',
  weight: '400',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'HeartMed',
  description: 'Your site description',
  icons: {
    icon: '/favicon.ico',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${architects_daughter.variable}`}>
      <body>
        <CartProvider>
          <div className="flex flex-col bg-boulder-100 min-h-screen overflow-hidden">
            <ServerHeader />
            <main id="main-content">
              {children}
              <CookieBanner />
            </main>
            <StickyIcons />
          </div>
        </CartProvider>
      </body>
    </html>
  );
}