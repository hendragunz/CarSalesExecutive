import React from 'react';
import type { Metadata } from 'next';
import { initialDealershipData } from '@/lib/initialData';
import PromoDetailClient from './PromoDetailClient';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const promo = initialDealershipData.promotions.find(
    (p) => p.slug === slug || p.id === slug
  );

  if (!promo) {
    return {
      title: 'Promo Tidak Ditemukan | XPENG Indonesia',
      description: 'Daftar promo dan penawaran spesial mobil listrik XPENG Indonesia.',
    };
  }

  const title = `${promo.title} | Promo Dealer Resmi XPENG Indonesia`;
  const description = `${promo.excerpt} Berlaku s/d ${promo.validUntil}. Hubungi Sales Resmi untuk klaim promo bunga 0%, free Wallbox, dan subsidi trade-in.`;

  return {
    title,
    description,
    keywords: [
      promo.title,
      'Promo XPENG',
      'Diskon XPENG',
      'Kredit Mobil Listrik XPENG',
      'Free Wallbox XPENG',
      'Trade In Mobil Listrik',
      'Bunga 0 Persen XPENG',
    ],
    openGraph: {
      title: `${promo.title} - Dealer Resmi XPENG`,
      description,
      images: [
        {
          url: promo.bannerImage,
          width: 1200,
          height: 630,
          alt: promo.title,
        },
      ],
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: promo.title,
      description,
      images: [promo.bannerImage],
    },
  };
}

export default async function PromoPage({ params }: Props) {
  const { slug } = await params;
  return <PromoDetailClient slug={slug} />;
}
