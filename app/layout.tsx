import './css/style.css';
import { Inter, Architects_Daughter } from 'next/font/google';
import Head from 'next/head';
import CookieBanner from '@/components/cookieconsent';
import dynamic from 'next/dynamic';
import StickyIcons from '@/components/ui/StickyIcons';


const Header = dynamic(() => import('@/components/ui/header'), {
  ssr: false,
});

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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="icon" href="/images/logo.png" />
      </Head>

      
        <div className="flex flex-col bg-boulder-100 min-h-screen overflow-hidden">
          <Header />
          <div id="main-content">
            <div>{children}</div>
            <CookieBanner />
          </div>
          <StickyIcons />
        </div>
 
     
    </>
  );
}