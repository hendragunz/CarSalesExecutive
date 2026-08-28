export interface CarColor {
  name: string;
  hex: string;
  image?: string;
}

export interface CarVariant {
  name: string;
  price: number;
  formattedPrice: string;
  range: string;
  acceleration: string;
  drivetrain: string;
  battery: string;
}

export interface VehicleModel {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  category: 'SUV' | 'MPV' | 'Sedan';
  startingPrice: number;
  formattedPrice: string;
  rangeKm: string;
  acceleration0to100: string;
  maxPower: string;
  batteryCapacity: string;
  fastChargeTime: string;
  driveType: string;
  heroImage: string;
  sideImage: string;
  interiorImage: string;
  rearImage?: string;
  gallery: string[];
  colors: CarColor[];
  variants: CarVariant[];
  highlights: string[];
  description: string;
  isFeatured: boolean;
  isHot?: boolean;
  isNew?: boolean;
  inStock: boolean;
  brochureUrl?: string;
}

export interface Promotion {
  id: string;
  slug: string;
  title: string;
  badge: string;
  period: string;
  excerpt: string;
  content: string;
  bannerImage: string;
  validUntil: string;
  terms: string[];
  isFeatured: boolean;
  publishDate: string;
  category: 'Special Promo' | 'Low DP & Interest' | 'Free Wallbox' | 'Trade-In';
}

export interface Testimonial {
  id: string;
  customerName: string;
  location: string;
  carModel: string;
  deliveryDate: string;
  rating: number;
  quote: string;
  photoUrl: string;
  verifiedPurchase: boolean;
  salesConsultant: string;
}

export interface DealerSocials {
  whatsapp: string; // digits e.g. 6281234567890
  whatsappDisplay: string;
  instagram: string; // handle
  instagramUrl: string;
  tiktok: string; // handle
  tiktokUrl: string;
  telegram: string; // handle
  telegramUrl: string;
  phone: string;
  phoneDisplay: string;
  email: string;
}

export interface DealerInfo {
  brandName: string;
  dealershipName: string;
  salesName: string;
  salesTitle: string;
  salesBadge: string;
  salesBio: string;
  salesAvatarUrl: string;
  salesIdNumber: string;
  socials: DealerSocials;
  whatsappDefaultText: string;
  address: string;
  city: string;
  operatingHours: string;
  googleMapsEmbedUrl: string;
  googleMapsLink: string;
  emergencyHotline: string;
  announcementTicker: string;
  bookingFeeAccount: {
    bankName: string;
    accountNumber: string;
    accountHolder: string;
    note: string;
  };
}

export interface HeroSlide {
  id: string;
  badge: string;
  title: string;
  subtitle: string;
  priceStart: string;
  range: string;
  acceleration: string;
  bgImage: string;
  ctaText: string;
  ctaLink: string;
  modelSlug: string;
}

export interface HomepageUSP {
  id: string;
  icon: string;
  title: string;
  desc: string;
}

export interface LeadSubmission {
  id: string;
  customerName: string;
  phone: string;
  city: string;
  selectedModel: string;
  inquiryType: 'Test Drive' | 'Price Quote' | 'Credit Simulation' | 'Brochure' | 'Consultation';
  preferredDate?: string;
  notes?: string;
  status: 'New' | 'Followed Up' | 'SPK / Deal' | 'Closed';
  createdAt: string;
}

export interface DealershipData {
  dealerInfo: DealerInfo;
  models: VehicleModel[];
  promotions: Promotion[];
  testimonials: Testimonial[];
  heroSlides: HeroSlide[];
  usps: HomepageUSP[];
  leads: LeadSubmission[];
  lastUpdated: string;
}
