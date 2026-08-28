import type { Metadata } from 'next';
import './globals.css';
import { DealershipProvider } from '@/context/DealershipContext';

export const metadata: Metadata = {
  title: 'XPeng Motors Indonesia | Dealer Resmi Mobil Listrik & Promo Terbaik',
  description: 'Website resmi Sales Dealership XPeng Indonesia. Dapatkan promo diskon, subsidi trade-in, bunga 0%, free Wallbox 7kW, katalog model XPENG G6, X9, G9, dan booking test drive ke rumah.',
  keywords: [
    'XPENG Indonesia',
    'Dealer XPENG Jakarta',
    'XPENG G6',
    'XPENG X9 MPV',
    'XPENG G9 SUV',
    'Mobil Listrik Indonesia',
    'Promo XPENG',
    'Simulasi Kredit XPENG',
    'Sales XPENG',
  ],
  openGraph: {
    title: 'XPeng Motors Indonesia - Sales Dealership Resmi',
    description: 'Pusat informasi promo resmi, simulasi kredit, dan booking test drive mobil listrik pintar XPeng.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'XPeng Motors Indonesia - Sales Dealership',
    description: 'Pusat informasi promo resmi dan test drive mobil listrik pintar XPeng.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className="scroll-smooth">
      <body className="bg-slate-50 text-slate-900 antialiased min-h-screen selection:bg-blue-600 selection:text-white font-sans" suppressHydrationWarning>
        <DealershipProvider>
          {children}
        </DealershipProvider>
      </body>
    </html>
  );
}
