export interface Service {
  id: string;
  name: string;
  nameSwahili: string;
  category: string;
  serviceType: string;
  description: string;
  descriptionSwahili: string;
  icon: string;
  features: string[];
  featuresSwahili: string[];
  basePrice: number | null;
  priceType: string;
  currency: string;
  mobileService: boolean;
  status: 'active' | 'inactive';
}

export const services: Service[] = [
  {
    id: 'service-generator-sales',
    name: 'Generator Sales & Hire',
    nameSwahili: 'Mauzo na Ukodishaji wa Jenereta',
    category: 'sales',
    serviceType: 'rental',
    description: 'New and refurbished diesel generators. Short-term hire and long-term leasing options for industrial and commercial use.',
    descriptionSwahili: 'Jenereta mpya na zilizorekebishwa. Ukodishaji wa muda mfupi na mrefu kwa matumizi ya viwanda na biashara.',
    icon: 'Zap',
    features: [
      'Various kVA ratings available',
      'Industrial & commercial use',
      'Delivery and setup included',
      'Flexible rental terms',
    ],
    featuresSwahili: [
      'Viwango mbalimbali vya kVA vinapatikana',
      'Matumizi ya viwanda na biashara',
      'Utoaji na usanidi umejumuishwa',
      'Masharti ya kukodisha yanayonyumbulika',
    ],
    basePrice: null,
    priceType: 'quote',
    currency: 'KES',
    mobileService: true,
    status: 'active',
  },
  {
    id: 'service-engine-repair',
    name: 'Engine Repair & Spare Parts',
    nameSwahili: 'Ukarabati wa Injini na Vipuri',
    category: 'repair',
    serviceType: 'repair',
    description: 'Genuine Lister Petter parts sourcing and mechanical overhaul services. OEM parts, diagnostic services, and engine rebuilds.',
    descriptionSwahili: 'Upataji wa vipuri halisi vya Lister Petter na huduma za ukarabati. Vipuri vya OEM, huduma za uchunguzi, na ujenzi upya wa injini.',
    icon: 'Wrench',
    features: [
      'OEM genuine parts',
      'Diagnostic services',
      'Complete engine rebuilds',
      'Performance testing',
    ],
    featuresSwahili: [
      'Vipuri halisi vya OEM',
      'Huduma za uchunguzi',
      'Ujenzi upya kamili wa injini',
      'Upimaji wa utendaji',
    ],
    basePrice: null,
    priceType: 'quote',
    currency: 'KES',
    mobileService: true,
    status: 'active',
  },
  {
    id: 'service-installation',
    name: 'Installation & Commissioning',
    nameSwahili: 'Usakinishaji na Uwekaji',
    category: 'installation',
    serviceType: 'installation',
    description: 'Site surveys, electrical integration, and professional handover. Complete installation with testing and documentation.',
    descriptionSwahili: 'Uchunguzi wa tovuti, ujumuishaji wa umeme, na ukabidhi wa kitaalamu. Usakinishaji kamili na upimaji na nyaraka.',
    icon: 'Settings',
    features: [
      'Professional site survey',
      'Electrical integration',
      'Complete documentation',
      'Training provided',
    ],
    featuresSwahili: [
      'Uchunguzi wa tovuti wa kitaalamu',
      'Ujumuishaji wa umeme',
      'Nyaraka kamili',
      'Mafunzo hutolewa',
    ],
    basePrice: null,
    priceType: 'quote',
    currency: 'KES',
    mobileService: true,
    status: 'active',
  },
  {
    id: 'service-maintenance',
    name: 'Preventative Maintenance',
    nameSwahili: 'Matengenezo ya Kuzuia',
    category: 'maintenance',
    serviceType: 'maintenance',
    description: 'Scheduled site visits, testing, and maintenance contracts. Custom schedules, oil analysis, and performance reports.',
    descriptionSwahili: 'Ziara za tovuti zilizopangwa, upimaji, na mikataba ya matengenezo. Ratiba maalum, uchambuzi wa mafuta, na ripoti za utendaji.',
    icon: 'Calendar',
    features: [
      'Custom maintenance schedules',
      'Oil analysis testing',
      'Performance reports',
      'Priority response',
    ],
    featuresSwahili: [
      'Ratiba maalum za matengenezo',
      'Upimaji wa uchambuzi wa mafuta',
      'Ripoti za utendaji',
      'Majibu ya kipaumbele',
    ],
    basePrice: null,
    priceType: 'quote',
    currency: 'KES',
    mobileService: true,
    status: 'active',
  },
  {
    id: 'service-emergency',
    name: 'Emergency Breakdown Support',
    nameSwahili: 'Msaada wa Dharura',
    category: 'emergency',
    serviceType: 'repair',
    description: 'Rapid response for critical plant outages – 24/7 availability. Same-day response and temporary power solutions.',
    descriptionSwahili: 'Majibu ya haraka kwa kushindwa kwa mimea muhimu – upatikanaji wa saa 24/7. Majibu ya siku moja na suluhisho za nguvu za muda.',
    icon: 'AlertCircle',
    features: [
      '24/7 availability',
      'Same-day response',
      'Temporary power solutions',
      'Emergency parts stock',
    ],
    featuresSwahili: [
      'Upatikanaji wa saa 24/7',
      'Majibu ya siku moja',
      'Suluhisho za nguvu za muda',
      'Hifadhi ya vipuri vya dharura',
    ],
    basePrice: null,
    priceType: 'quote',
    currency: 'KES',
    mobileService: true,
    status: 'active',
  },
  {
    id: 'service-consultation',
    name: 'Consultation & Energy Audits',
    nameSwahili: 'Ushauri na Ukaguzi wa Nishati',
    category: 'consultation',
    serviceType: 'consultation',
    description: 'Technical advice to improve uptime and efficiency. Load analysis, fuel optimization, and equipment recommendations.',
    descriptionSwahili: 'Ushauri wa kitaalamu ili kuboresha wakati wa kufanya kazi na ufanisi. Uchambuzi wa mzigo, uboreshaji wa mafuta, na mapendekezo ya vifaa.',
    icon: 'FileText',
    features: [
      'Load analysis',
      'Fuel optimization',
      'Equipment recommendations',
      'Efficiency reports',
    ],
    featuresSwahili: [
      'Uchambuzi wa mzigo',
      'Uboreshaji wa mafuta',
      'Mapendekezo ya vifaa',
      'Ripoti za ufanisi',
    ],
    basePrice: null,
    priceType: 'quote',
    currency: 'KES',
    mobileService: false,
    status: 'active',
  },
];
