import React from 'react';
import type { Metadata } from 'next';
import PromotionsClient from './PromotionsClient';

export const metadata: Metadata = {
  title: 'Daftar Promo Mobil Listrik XPENG Indonesia Terbaru | Bunga 0% & Free Wallbox',
  description: 'Update promo resmi XPENG Indonesia: Free Wallbox 7kW + instalasi, program cicilan bunga 0% hingga 2 tahun, diskon trade-in semua merk mobil, free asuransi all risk, dan garansi baterai 8 tahun.',
  keywords: [
    'Promo XPENG',
    'Diskon XPENG',
    'Bunga 0 Persen Mobil Listrik',
    'Free Wallbox XPENG',
    'Trade In Mobil Listrik XPENG',
    'Dealer XPENG Jakarta',
  ],
  openGraph: {
    title: 'Promo Spesial Mobil Listrik XPENG Indonesia',
    description: 'Dapatkan penawaran bunga 0%, subsidi trade-in puluhan juta, dan free home charger 7kW.',
    type: 'website',
  },
};

export default function PromotionsPage() {
  return <PromotionsClient />;
}
