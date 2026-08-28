import React from 'react';
import type { Metadata } from 'next';
import { initialDealershipData } from '@/lib/initialData';
import ModelDetailClient from './ModelDetailClient';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const model = initialDealershipData.models.find(
    (m) => m.slug === slug || m.id === slug
  );

  if (!model) {
    return {
      title: 'Model Mobil Listrik Tidak Ditemukan | XPENG Indonesia',
      description: 'Katalog mobil listrik pintar XPENG Indonesia resmi.',
    };
  }

  const title = `XPENG ${model.name} Indonesia - Harga OTR ${model.formattedPrice}, Spesifikasi & Promo`;
  const description = `${model.tagline}. Dapatkan promo XPENG ${model.name} OTR mulai ${model.formattedPrice}, jarak tempuh ${model.rangeKm}, supercharge 800V 15 menit, bunga 0%, dan test drive gratis di Jakarta & sekitarnya.`;

  return {
    title,
    description,
    keywords: [
      `XPENG ${model.name}`,
      `Harga XPENG ${model.name}`,
      `Promo XPENG ${model.name}`,
      `Spesifikasi XPENG ${model.name}`,
      'Mobil Listrik XPENG',
      'Dealer XPENG Jakarta',
      'Kredit XPENG DP Ringan',
    ],
    openGraph: {
      title: `XPENG ${model.name} - Harga ${model.formattedPrice} | Dealer Resmi`,
      description,
      images: [
        {
          url: model.heroImage,
          width: 1200,
          height: 630,
          alt: `XPENG ${model.name}`,
        },
      ],
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: `XPENG ${model.name} Indonesia - Spesifikasi & Promo`,
      description,
      images: [model.heroImage],
    },
  };
}

export default async function ModelPage({ params }: Props) {
  const { slug } = await params;
  return <ModelDetailClient slug={slug} />;
}
