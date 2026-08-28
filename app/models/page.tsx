import React from 'react';
import type { Metadata } from 'next';
import ModelsClient from './ModelsClient';

export const metadata: Metadata = {
  title: 'Katalog Semua Model Mobil Listrik XPENG Indonesia | G6, X9, G9, P7i',
  description: 'Daftar lengkap harga OTR, spesifikasi, dan promo mobil listrik cerdas XPENG Indonesia: XPENG G6 Coupe SUV, XPENG X9 MPV 7-Seater, XPENG G9 Flagship SUV, dan P7i Sports Sedan. Test drive gratis ke rumah.',
  keywords: [
    'Harga XPENG Indonesia',
    'XPENG G6 Indonesia',
    'XPENG X9 MPV',
    'XPENG G9 SUV',
    'XPENG P7i Sedan',
    'Dealer XPENG Jakarta',
    'Mobil Listrik Indonesia',
  ],
  openGraph: {
    title: 'Katalog Mobil Listrik XPENG Indonesia Resmi',
    description: 'Jelajahi lini mobil listrik pintar XPENG dengan teknologi 800V silicon carbide dan promo DP ringan.',
    type: 'website',
  },
};

export default function ModelsPage() {
  return <ModelsClient />;
}
