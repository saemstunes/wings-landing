export interface Partner {
  id: string;
  name: string;
  description: string;
  logoUrl: string;
}

export const partners: Partner[] = [
  {
    id: 'lister-petter',
    name: 'Lister Petter',
    description: 'Primary Engine Partner',
    logoUrl: '/placeholder.svg',
  },
  {
    id: 'davis-shirtliff',
    name: 'Davis & Shirtliff',
    description: 'Engineering Partner',
    logoUrl: '/placeholder.svg',
  },
  {
    id: 'kenya-power',
    name: 'Kenya Power',
    description: 'Utility Partner',
    logoUrl: '/placeholder.svg',
  },
  {
    id: 'safaricom',
    name: 'Safaricom',
    description: 'IoT Solutions Partner',
    logoUrl: '/placeholder.svg',
  },
  {
    id: 'kebs',
    name: 'KEBS',
    description: 'Standards Certification',
    logoUrl: '/placeholder.svg',
  },
  {
    id: 'nema',
    name: 'NEMA',
    description: 'Environmental Compliance',
    logoUrl: '/placeholder.svg',
  },
];
