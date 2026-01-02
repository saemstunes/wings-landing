import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase, Product, submitContactForm, requestQuote, ContactSubmission } from '@/lib/supabase';
import { useLanguage } from '@/contexts/LanguageContext';
import {
  Search,
  Package,
  Filter,
  CheckCircle,
  Shield,
  Truck,
  MessageCircle,
  Phone,
  Mail,
  ChevronDown,
  Facebook,
  Instagram,
  Linkedin,
  Instagram as LinkedinIcon,
  Star,
  ShoppingCart,
  X,
  Menu,
  Globe,
  MapPin,
  Clock,
  Zap,
  Wrench,
  Settings,
  AlertCircle,
  FileText,
  Cog,
  Home,
  ShoppingBag,
  Headphones,
  Award,
  Users,
  HelpCircle,
  ExternalLink,
  ChevronRight,
  ChevronLeft,
  Plus,
  Trash2,
  Mail as MailIcon,
  MessageSquare,
  Bell,
  AlertTriangle,
  Check,
  Award as AwardIcon,
  Droplet,
  Wind,
  Link,
  Moon,
  Sun,
  ArrowUp,
  Navigation
} from 'lucide-react';

// ==================== TYPES & INTERFACES ====================
// SparePart extends Product with additional fields for parts-specific data
interface SparePart extends Omit<Product, 'model' | 'subcategory' | 'compatible_with' | 'dimensions'> {
  model: string;
  subcategory: string;
  part_number?: string;
  oem_equivalent?: string[];
  compatibility?: string[];
  material?: string;
  dimensions?: string | null;
  condition?: 'New/OEM' | 'Genuine' | 'Aftermarket' | 'Refurbished';
  lead_time_days?: number;
  minimum_order_quantity?: number;
  installation_notes?: string;
  warranty_months?: number;
  bulk_pricing?: Record<string, number>;
  technical_drawing_url?: string;
  installation_guide_url?: string;
}

interface QuoteItem {
  id: string;
  name: string;
  brand: string;
  part_number?: string;
  quantity: number;
  price?: number;
  currency: string;
  primary_image_url?: string;
}

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  company: string;
  subject: string;
  message: string;
  request_type: string;
  product_name: string;
  part_number: string;
  engine_model: string;
  quantity?: number;
  request_metadata?: Record<string, any>;
}

// ==================== TRANSLATIONS ====================
// Page-specific translations (more comprehensive than base LanguageContext)
const translations = {
  en: {
    nav: {
      home: 'Home',
      parts: 'Browse Parts',
      engine: 'Search by Engine',
      services: 'Services',
      contact: 'Contact',
      quote: 'My Quote'
    },
    hero: {
      title: 'Genuine Spare Parts for Industrial Engines & Generators',
      subtitle: 'Lister Petter Specialist • OEM Quality • Fast Delivery Across East Africa',
      searchPlaceholder: 'Search by part name, number, or engine model...',
      searchButton: 'Search Parts',
      popular: 'Popular: Oil Filters, Gaskets, Injectors, Piston Rings, Bearings',
      browseAll: 'Browse All Parts',
      checkCompatibility: 'Check Compatibility',
      whatsapp: 'WhatsApp: +254 718 234 222',
      stats: {
        partsInStock: '2,500+ Parts in Stock',
        sameDayDispatch: 'Same Day Dispatch',
        majorBrands: 'All Major Brands',
        warranty: '12-Month Warranty'
      }
    },
    trust: {
      title: 'Trusted by East Africa\'s Leading Industries',
      subtitle: 'Delivering genuine parts to maintenance teams across the region'
    },
    categories: {
      title: 'Shop by Category',
      subtitle: 'Find exactly what you need',
      filters: 'Filters',
      engineComponents: 'Engine Components',
      gaskets: 'Gaskets & Seals',
      fuelSystem: 'Fuel System',
      cooling: 'Cooling System',
      electrical: 'Electrical',
      belts: 'Belts & Hoses',
      hardware: 'Fasteners & Hardware',
      viewAll: 'View all in category'
    },
    featured: {
      title: 'Popular Spare Parts',
      subtitle: 'In stock and ready to ship',
      viewAll: 'View All 2,500+ Parts',
      inStock: 'In Stock',
      lowStock: 'Low Stock',
      outOfStock: 'Out of Stock',
      contactForPrice: 'Contact for price',
      addToQuote: 'Add to Quote',
      bulkDiscounts: 'Bulk discounts available'
    },
    compatibility: {
      title: 'Find Parts for Your Engine',
      subtitle: 'Select your engine model to see compatible parts',
      brand: 'Engine Brand',
      selectBrand: 'Select Brand...',
      model: 'Engine Model',
      modelPlaceholder: 'e.g., LPW2, LPW3, LPW4',
      notSure: 'Not sure? Check the engine nameplate or ',
      contactUs: 'contact us',
      partType: 'Part Type (Optional)',
      allParts: 'All Parts',
      findParts: 'Find Compatible Parts',
      showingResults: 'Showing {count} parts compatible with {model}'
    },
    whyChoose: {
      title: 'Why Choose Wings Engineering for Spare Parts',
      features: {
        genuine: {
          title: '100% Genuine OEM Parts',
          desc: 'Direct sourcing from authorized distributors, authenticity guarantee, counterfeit-free promise'
        },
        dispatch: {
          title: 'Same-Day Dispatch',
          desc: 'Orders before 2PM ship same day, express delivery across Nairobi, 3-5 days to Uganda & Tanzania'
        },
        support: {
          title: 'Expert Technical Support',
          desc: 'Part identification help, installation guidance, WhatsApp/phone/email support'
        },
        warranty: {
          title: '12-Month Warranty',
          desc: 'Comprehensive warranty coverage, easy returns & exchanges, quality you can trust'
        }
      }
    },
    catalog: {
      title: 'Complete Spare Parts Catalog',
      searchPlaceholder: 'Search parts...',
      allCategories: 'All Categories',
      allBrands: 'All Brands',
      allItems: 'All Items',
      inStockOnly: 'In Stock Only',
      availableSoon: 'Available Soon',
      sortBy: 'Sort by:',
      relevance: 'Relevance',
      priceLow: 'Price: Low to High',
      priceHigh: 'Price: High to Low',
      nameAZ: 'Name: A-Z',
      newest: 'Newest First',
      showing: 'Showing {start}-{end} of {total} parts',
      noResults: 'No parts found',
      tryAdjusting: 'Try adjusting your filters or search terms',
      clearFilters: 'Clear all filters'
    },
    common: {
      parts: 'parts',
      days: 'days'
    },
    bulk: {
      title: 'Bulk Orders & Fleet Accounts',
      subtitle: 'Volume discounts for orders of 10+ parts',
      features: [
        'Dedicated account manager for fleet operators',
        'Custom pricing for long-term contracts',
        'Priority shipping and handling'
      ],
      cta: 'Request Bulk Quote',
      servicesTitle: 'Parts Identification & Sourcing',
      servicesSubtitle: 'Can\'t find your part? We can help',
      servicesFeatures: [
        'Send us a photo for identification',
        'We source rare and discontinued parts',
        'Cross-reference service for aftermarket parts'
      ],
      servicesCta: 'Get Help Finding Parts'
    },
    testimonials: {
      title: 'Trusted by Maintenance Teams Across East Africa',
      testimonials: [
        {
          quote: 'Wings Engineering provided the exact Lister Petter parts we needed within 24 hours. Genuine OEM quality and excellent service.',
          author: 'John Kariuki',
          role: 'Maintenance Manager, Thika Manufacturing Ltd.',
          rating: 5
        },
        {
          quote: 'Their technical support helped us identify the right part for our old generator. Fast delivery to Mombasa.',
          author: 'Sarah Mwangi',
          role: 'Chief Engineer, Coastal Hospital',
          rating: 5
        },
        {
          quote: 'Bulk order pricing saved us 25% on our annual parts budget. Professional service throughout.',
          author: 'David Ochieng',
          role: 'Fleet Manager, TransEast Logistics',
          rating: 5
        }
      ]
    },
    quote: {
      title: 'Request a Quote',
      subtitle: 'Add parts to your quote request and we\'ll respond within 2 hours',
      partsInQuote: 'Parts in Your Quote',
      noPartsAdded: 'No parts added yet. Browse our catalog and add parts to your quote.',
      totalItems: 'Total Items',
      continueBrowsing: 'Continue browsing parts',
      yourInfo: 'Your Information',
      fullName: 'Full Name*',
      email: 'Email Address*',
      phone: 'Phone Number*',
      phonePlaceholder: '+2547XXXXXXXX',
      company: 'Company Name',
      delivery: 'Delivery Location*',
      deliveryPlaceholder: 'City, Area, or Full Address',
      notes: 'Additional Notes',
      notesPlaceholder: 'Any specific requirements, urgency, or questions...',
      submit: 'Submit Quote Request',
      responseTime: 'We\'ll respond with a detailed quote within 2 hours (business hours)'
    },
    contact: {
      title: 'Get in Touch',
      whatsapp: {
        title: 'WhatsApp Chat',
        desc: 'Fastest way to get help. Send us a message or photo of your part.',
        cta: 'Chat on WhatsApp'
      },
      phone: {
        title: 'Call Us',
        desc: 'Speak directly with our parts specialists.',
        cta: '+254 718 234 222',
        hours: 'Mon-Fri: 8AM-6PM | Sat: 9AM-2PM'
      },
      email: {
        title: 'Email',
        desc: 'Send detailed inquiries or technical documents.',
        cta: 'parts@wingsengineeringservices.com'
      },
      address: 'P.O. Box 4529-01002 Madaraka, Thika, Kenya',
      serviceAreas: 'Delivering to Nairobi, Kiambu, Thika, Mombasa, Kisumu, Nakuru, and across Uganda & Tanzania'
    },
    faq: {
      title: 'Frequently Asked Questions',
      questions: [
        {
          q: 'Are all your parts genuine OEM?',
          a: 'Yes, we source directly from authorized distributors. Every part comes with authenticity documentation and a 12-month warranty.'
        },
        {
          q: 'How do I know which part I need?',
          a: 'Use our compatibility checker, search by part number, or send us a photo via WhatsApp. Our experts will help identify the correct part for your engine.'
        },
        {
          q: 'Do you have parts for older engines?',
          a: 'Yes, we specialize in sourcing parts for discontinued models. Contact us with your engine details and we\'ll find the right part for you.'
        },
        {
          q: 'What\'s your warranty policy?',
          a: 'All parts come with a 12-month warranty covering manufacturing defects. Unused parts can be returned within 14 days of purchase.'
        },
        {
          q: 'How fast can you deliver?',
          a: 'Same-day dispatch for in-stock parts ordered before 2PM. Delivery: 1-2 days in Nairobi, 3-5 days to Uganda and Tanzania.'
        },
        {
          q: 'Can I return a part if it doesn\'t fit?',
          a: 'Yes, unused parts in original packaging can be returned within 14 days for exchange or refund. See our return policy for details.'
        },
        {
          q: 'What payment methods do you accept?',
          a: 'M-Pesa, bank transfer, cash on delivery (select areas), and credit facilities for approved commercial accounts.'
        },
        {
          q: 'Do you offer bulk discounts?',
          a: 'Yes, volume discounts are available for orders of 10+ parts. Contact us for custom pricing on large orders.'
        }
      ]
    },
    footer: {
      companyDesc: 'East Africa\'s trusted supplier of genuine industrial spare parts. Serving maintenance teams since 2010.',
      shop: 'Shop Parts',
      categories: [
        'Filters',
        'Engine Components',
        'Gaskets & Seals',
        'Fuel System',
        'Electrical',
        'Belts & Hoses'
      ],
      company: 'Company',
      companyLinks: [
        'About Us',
        'Our Services',
        'Portfolio',
        'Contact',
        'Careers',
        'Blog'
      ],
      support: 'Support',
      supportLinks: [
        'Help Center',
        'Shipping Policy',
        'Returns & Warranty',
        'Technical Support',
        'Order Tracking',
        'FAQ'
      ],
      legal: 'Legal',
      legalLinks: [
        'Terms of Service',
        'Privacy Policy',
        'Cookie Policy',
        'Compliance'
      ],
      copyright: '© 2024 Wings Engineering Services Ltd. All rights reserved.',
      builtWith: 'Built with ❤️ in Kenya'
    }
  },
  sw: {
    nav: {
      home: 'Nyumbani',
      parts: 'Vipuri',
      engine: 'Tafuta kwa Injini',
      services: 'Huduma',
      contact: 'Wasiliana',
      quote: 'Nukuu Yangu'
    },
    hero: {
      title: 'Vipuri Asilia kwa Injini na Jenereta za Viwandani',
      subtitle: 'Wataalam wa Lister Petter • Ubora wa OEM • Uwasilishaji wa Haraka Afrika Mashariki',
      searchPlaceholder: 'Tafuta kwa jina la kipuri, nambari, au modeli ya injini...',
      searchButton: 'Tafuta Vipuri',
      popular: 'Maarufu: Vichujio vya Mafuta, Gasketi, Injector, Pete za Piston, Mabearing',
      browseAll: 'Tazama Vipuri Vyote',
      checkCompatibility: 'Angalia Ufanani',
      whatsapp: 'WhatsApp: +254 718 234 222',
      stats: {
        partsInStock: 'Vipuri 2,500+ Vinapatikana',
        sameDayDispatch: 'Kutumwa Siku Hiyohiyo',
        majorBrands: 'Brandi Zote Kubwa',
        warranty: 'Dhamana ya Miezi 12'
      }
    },
    trust: {
      title: 'Tunaminikwa na Viwanda Vikuu vya Afrika Mashariki',
      subtitle: 'Tunawasilisha vipuri asilia kwa timu za matengenezo kote mkoa'
    },
    categories: {
      title: 'Nunua kwa Aina',
      subtitle: 'Pata hasa unachohitaji',
      filters: 'Vichujio',
      engineComponents: 'Vifaa vya Injini',
      gaskets: 'Gasketi na Mihuri',
      fuelSystem: 'Mfumo wa Mafuta',
      cooling: 'Mfumo wa Kupoza',
      electrical: 'Umeme',
      belts: 'Mikanda na Mabomba',
      hardware: 'Vifungashio na Vifaa',
      viewAll: 'Tazama vyote katika aina hii'
    },
    featured: {
      title: 'Vipuri Maarufu',
      subtitle: 'Vinapatikana na tayari kusafirishwa',
      viewAll: 'Tazama Vipuri 2,500+ Vyote',
      inStock: 'Inapatikana',
      lowStock: 'Inakwisha',
      outOfStock: 'Haipatikani',
      contactForPrice: 'Wasiliana kwa bei',
      addToQuote: 'Ongeza kwenye Nukuu',
      bulkDiscounts: 'Ada ya wingi inapatikana'
    },
    compatibility: {
      title: 'Tafuta Vipuri kwa Injini Yako',
      subtitle: 'Chagua modeli ya injini yako kuona vipuri vinavyofaa',
      brand: 'Brandi ya Injini',
      selectBrand: 'Chagua Brandi...',
      model: 'Modeli ya Injini',
      modelPlaceholder: 'mf., LPW2, LPW3, LPW4',
      notSure: 'Sijui? Angalia sahani ya jina la injini au ',
      contactUs: 'wasiliana nasi',
      partType: 'Aina ya Kipuri (Hiari)',
      allParts: 'Vipuri Vyote',
      findParts: 'Tafuta Vipuri Vinavyofaa',
      showingResults: 'Inaonyesha vipuri {count} vinavyofaa na {model}'
    },
    whyChoose: {
      title: 'Kwa Nini Chagua Wings Engineering kwa Vipuri',
      features: {
        genuine: {
          title: 'Vipuri 100% Asilia vya OEM',
          desc: 'Kununua moja kwa moja kutoka kwa wasambazaji walioidhinishwa, dhamana ya ukweli, ahadi isiyo na bandia'
        },
        dispatch: {
          title: 'Kutumwa Siku Hiyohiyo',
          desc: 'Maagizo kabla ya saa 2 hutuswa siku hiyo, uwasilishaji wa haraka Nairobi, siku 3-5 hadi Uganda na Tanzania'
        },
        support: {
          title: 'Usaidizi wa Kitaalam',
          desc: 'Usaidizi wa kutambua vipuri, mwongozo wa usakinishaji, usaidizi wa WhatsApp/simu/barua pepe'
        },
        warranty: {
          title: 'Dhamana ya Miezi 12',
          desc: 'Dhamana kamili, kurudi na kubadilishwa rahisi, ubora unaoweza kuaminika'
        }
      }
    },
    catalog: {
      title: 'Katalogi Kamili ya Vipuri',
      searchPlaceholder: 'Tafuta vipuri...',
      allCategories: 'Aina Zote',
      allBrands: 'Brandi Zote',
      allItems: 'Vitu Vyote',
      inStockOnly: 'Vinavyopatikana Pekee',
      availableSoon: 'Inapatikana Hivi Karibuni',
      sortBy: 'Panga kwa:',
      relevance: 'Muhimu',
      priceLow: 'Bei: Chini hadi Juu',
      priceHigh: 'Bei: Juu hadi Chini',
      nameAZ: 'Jina: A-Z',
      newest: 'Mpya Zaidi Kwanza',
      showing: 'Inaonyesha {start}-{end} ya vipuri {total}',
      noResults: 'Hakuna vipuri vilivyopatikana',
      tryAdjusting: 'Jaribu kurekebisha vichujio vyako au maneno ya utafutaji',
      clearFilters: 'Futa vichujio vyote'
    },
    common: {
      parts: 'vipuri',
      days: 'siku'
    },
    bulk: {
      title: 'Maagizo Makubwa na Akaunti za Meli',
      subtitle: 'Ada ya wingi kwa maagizo ya vipuri 10+',
      features: [
        'Meneja wa akaunti maalum kwa waendeshaji wa meli',
        'Bei maalum kwa mikataba ya muda mrefu',
        'Usafirishaji na usindikaji wa kipaumbele'
      ],
      cta: 'Omba Nukuu ya Wingi',
      servicesTitle: 'Utambulishaji na Utafutaji wa Vipuri',
      servicesSubtitle: 'Hauwezi kupata kipuri chako? Tunaweza kusaidia',
      servicesFeatures: [
        'Tutumie picha kwa utambulishaji',
        'Tunatafuta vipuri nadra na vilivyokoma',
        'Huduma ya kufananisha kwa vipuri vya aftermarket'
      ],
      servicesCta: 'Pata Usaidizi wa Kupata Vipuri'
    },
    testimonials: {
      title: 'Tunaminikwa na Timu za Matengenezo Kote Afrika Mashariki',
      testimonials: [
        {
          quote: 'Wings Engineering walitoa vipuri hasa vya Lister Petter tulivyohitaji ndani ya masaa 24. Ubora wa OEM asilia na huduma bora.',
          author: 'John Kariuki',
          role: 'Meneja wa Matengenezo, Thika Manufacturing Ltd.',
          rating: 5
        },
        {
          quote: 'Usaidizi wao wa kiufundi ulitusaidia kutambua kipuri sahihi kwa jenereta yetu ya zamani. Uwasilishaji wa haraka hadi Mombasa.',
          author: 'Sarah Mwangi',
          role: 'Mhandisi Mkuu, Coastal Hospital',
          rating: 5
        },
        {
          quote: 'Bei ya agizo kubwa ilituokoa 25% kwenye bajeti yetu ya mwaka ya vipuri. Huduma ya kiprofesa wakati wote.',
          author: 'David Ochieng',
          role: 'Meneja wa Meli, TransEast Logistics',
          rating: 5
        }
      ]
    },
    quote: {
      title: 'Omba Nukuu',
      subtitle: 'Ongeza vipuri kwenye ombi lako la nukuu na tutajibu ndani ya masaa 2',
      partsInQuote: 'Vipuri Kwenye Nukuu Yako',
      noPartsAdded: 'Hakuna vipuri vilivyoongezwa bado. Tembelea katalogi yetu na ongeza vipuri kwenye nukuu yako.',
      totalItems: 'Vitu Jumla',
      continueBrowsing: 'Endelea kutembelea vipuri',
      yourInfo: 'Taarifa Yako',
      fullName: 'Jina Kamili*',
      email: 'Anwani ya Barua Pepe*',
      phone: 'Nambari ya Simu*',
      phonePlaceholder: '+2547XXXXXXXX',
      company: 'Jina la Kampuni',
      delivery: 'Mahali Pa Kufikishia*',
      deliveryPlaceholder: 'Jiji, Eneo, au Anwani Kamili',
      notes: 'Maelezo Zaidi',
      notesPlaceholder: 'Mahitaji yoyote maalum, uharaka, au maswali...',
      submit: 'Wasilisha Ombi la Nukuu',
      responseTime: 'Tutajibu kwa nukuu kamili ndani ya masaa 2 (masaa ya kazi)'
    },
    contact: {
      title: 'Wasiliana Nasi',
      whatsapp: {
        title: 'Mazungumzo ya WhatsApp',
        desc: 'Njia ya haraka zaidi ya kupata usaidizi. Tutumie ujumbe au picha ya kipuri chako.',
        cta: 'Zungumza kwa WhatsApp'
      },
      phone: {
        title: 'Tupigie Simu',
        desc: 'Zungumza moja kwa moja na wataalam wetu wa vipuri.',
        cta: '+254 718 234 222',
        hours: 'Jumatatu-Ijumaa: 8AM-6PM | Jumamosi: 9AM-2PM'
      },
      email: {
        title: 'Barua Pepe',
        desc: 'Tuma maombi ya kina au hati za kiufundi.',
        cta: 'parts@wingsengineeringservices.com'
      },
      address: 'S.L.P 4529-01002 Madaraka, Thika, Kenya',
      serviceAreas: 'Tunawasilisha Nairobi, Kiambu, Thika, Mombasa, Kisumu, Nakuru, na kote Uganda na Tanzania'
    },
    faq: {
      title: 'Maswali Yanayoulizwa Mara Kwa Mara',
      questions: [
        {
          q: 'Je, vipuri vyote ni asili ya OEM?',
          a: 'Ndio, tunanunua moja kwa moja kutoka kwa wasambazaji walioidhinishwa. Kila kipuri kina hati ya ukweli na dhamana ya miezi 12.'
        },
        {
          q: 'Nifanyeje kujua ni kipuri gani ninachohitaji?',
          a: 'Tumia kiangaliaji wetu cha ufanani, tafuta kwa nambari ya kipuri, au tutumie picha kupitia WhatsApp. Wataalam wetu watasaidia kutambua kipuri sahihi kwa injini yako.'
        },
        {
          q: 'Je, mnayo vipuri kwa injini za zamani?',
          a: 'Ndio, tunajishughulisha na kutafuta vipuri kwa modeli zilizokoma. Wasiliana nasi kwa maelezo ya injini yako na tutapata kipuri sahihi kwako.'
        },
        {
          q: 'Je, sera yenu ya dhamana ni ipi?',
          a: 'Vipuri vyote vina dhamana ya miezi 12 inayofunika kasoro za utengenezaji. Vipuri visivyotumika vinaweza kurudishwa ndani ya siku 14 za ununuzi.'
        },
        {
          q: 'Je, mnaweza kusafirishaje haraka?',
          a: 'Kutumwa siku hiyohiyo kwa vipuri vinavyopatikana vilivyoagizwa kabla ya saa 2. Uwasilishaji: siku 1-2 Nairobi, siku 3-5 hadi Uganda na Tanzania.'
        },
        {
          q: 'Je, naweza kurudisha kipuri ikiwa hakifai?',
          a: 'Ndio, vipuri visivyotumika kwenye mfuko wa asili vinaweza kurudishwa ndani ya siku 14 kwa kubadilishana au kurudishiwa pesa. Angalia sera yetu ya kurudisha kwa maelezo.'
        },
        {
          q: 'Je, njia gani za malipo mnazokubali?',
          a: 'M-Pesa, hamisha benki, pesa taslimu wakati wa kufikishwa (maeneo fulani), na mikopo kwa akaunti za kibiashara zilizoidhinishwa.'
        },
        {
          q: 'Je, mna toleo la wingi?',
          a: 'Ndio, toleo la wingi linapatikana kwa maagizo ya vipuri 10+. Wasiliana nasi kwa bei maalum kwa maagizo makubwa.'
        }
      ]
    },
    footer: {
      companyDesc: 'Msambazaji anayeaminika wa vipuri asilia vya viwandani Afrika Mashariki. Inahudumia timu za matengenezo tangu 2010.',
      shop: 'Nunua Vipuri',
      categories: [
        'Vichujio',
        'Vifaa vya Injini',
        'Gasketi na Mihuri',
        'Mfumo wa Mafuta',
        'Umeme',
        'Mikanda na Mabomba'
      ],
      company: 'Kampuni',
      companyLinks: [
        'Kuhusu Sisi',
        'Huduma Zetu',
        'Portfolio',
        'Wasiliana',
        'Kazi',
        'Blogu'
      ],
      support: 'Usaidizi',
      supportLinks: [
        'Kituo cha Usaidizi',
        'Sera ya Usafirishaji',
        'Kurudi na Dhamana',
        'Usaidizi wa Kiufundi',
        'Kufuatilia Agizo',
        'Maswali'
      ],
      legal: 'Kisheria',
      legalLinks: [
        'Masharti ya Huduma',
        'Sera ya Faragha',
        'Sera ya Kuki',
        'Uzingatifu'
      ],
      copyright: '© 2024 Wings Engineering Services Ltd. Haki zote zimehifadhiwa.',
      builtWith: 'Imejengwa kwa ❤️ nchini Kenya'
    }
  }
};

// ==================== MAIN COMPONENT ====================
const Index = () => {
  const [parts, setParts] = useState<SparePart[]>([]);
  const [filteredParts, setFilteredParts] = useState<SparePart[]>([]);
  const [quoteParts, setQuoteParts] = useState<QuoteItem[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedBrand, setSelectedBrand] = useState<string>('all');
  const [stockFilter, setStockFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('relevance');
  const [currentPage, setCurrentPage] = useState(1);
  const [partsPerPage] = useState(24);
  const [showQuoteModal, setShowQuoteModal] = useState(false);
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [compatibilityData, setCompatibilityData] = useState({
    brand: '',
    model: '',
    partType: 'all'
  });
  const [showCompatibilityResults, setShowCompatibilityResults] = useState(false);
  const [compatibleParts, setCompatibleParts] = useState<SparePart[]>([]);
  const [activeFAQ, setActiveFAQ] = useState<number | null>(null);
  const [darkMode, setDarkMode] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [showQuickNav, setShowQuickNav] = useState(false);
  const [contactForm, setContactForm] = useState<ContactFormData>({
    name: '',
    email: '',
    phone: '',
    company: '',
    subject: '',
    message: '',
    request_type: 'parts_inquiry',
    product_name: '',
    part_number: '',
    engine_model: '',
    quantity: 1
  });

  // Use LanguageContext from contexts, but keep local translations for this page
  const { language, setLanguage } = useLanguage();
  const toggleLanguage = () => setLanguage(language === 'en' ? 'sw' : 'en');
  
  // Local translation function for this page's comprehensive translations
  const t = (key: string, params?: Record<string, string>) => {
    const keys = key.split('.');
    let value: any = translations[language];
    
    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k];
      } else {
        value = undefined;
        break;
      }
    }

    if (typeof value === 'string' && params) {
      return value.replace(/\{(\w+)\}/g, (_, param) => params[param] || '');
    }

    return value || key;
  };

  // Dark mode effect
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Scroll detection for back to top button
  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // ==================== DATA FETCHING ====================
  useEffect(() => {
    fetchParts();
  }, []);

  const fetchParts = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('product_catalog')
        .select('*')
        .in('category', ['parts', 'spare_parts'])
        .eq('status', 'active')
        .order('created_at', { ascending: false });

      if (error) throw error;

      if (data) {
        // Map Product to SparePart format
        const spareParts: SparePart[] = data.map((product: Product) => ({
          ...product,
          model: product.model || '',
          subcategory: product.subcategory || '',
          compatibility: product.compatible_with || [],
          part_number: product.model || undefined,
        }));
        setParts(spareParts);
        setFilteredParts(spareParts);
      }
    } catch (error) {
      console.error('Error fetching parts:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // ==================== FILTERS & SEARCH ====================
  useEffect(() => {
    let result = [...parts];

    // Search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(part =>
        part.name.toLowerCase().includes(term) ||
        part.model?.toLowerCase().includes(term) ||
        part.part_number?.toLowerCase().includes(term) ||
        part.compatibility?.some(c => c.toLowerCase().includes(term)) ||
        part.brand.toLowerCase().includes(term)
      );
    }

    // Category filter
    if (selectedCategory !== 'all') {
      result = result.filter(part => part.subcategory === selectedCategory);
    }

    // Brand filter
    if (selectedBrand !== 'all') {
      result = result.filter(part => part.brand === selectedBrand);
    }

    // Stock filter
    if (stockFilter === 'inStock') {
      result = result.filter(part => part.stock_quantity > 0);
    } else if (stockFilter === 'availableSoon') {
      result = result.filter(part => part.stock_quantity === 0 && part.lead_time_days && part.lead_time_days <= 10);
    }

    // Sorting
    switch (sortBy) {
      case 'priceLow':
        result.sort((a, b) => (a.price || 0) - (b.price || 0));
        break;
      case 'priceHigh':
        result.sort((a, b) => (b.price || 0) - (a.price || 0));
        break;
      case 'nameAZ':
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'newest':
        result.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
        break;
      default:
        // Relevance - prioritize matches with search term
        if (searchTerm) {
          const term = searchTerm.toLowerCase();
          result.sort((a, b) => {
            const aScore = [
              a.name.toLowerCase().includes(term),
              a.model?.toLowerCase().includes(term),
              a.part_number?.toLowerCase().includes(term)
            ].filter(Boolean).length;
            
            const bScore = [
              b.name.toLowerCase().includes(term),
              b.model?.toLowerCase().includes(term),
              b.part_number?.toLowerCase().includes(term)
            ].filter(Boolean).length;
            
            return bScore - aScore;
          });
        }
    }

    setFilteredParts(result);
    setCurrentPage(1);
  }, [searchTerm, selectedCategory, selectedBrand, stockFilter, sortBy, parts]);

  // ==================== QUOTE MANAGEMENT ====================
  const addToQuote = (part: SparePart) => {
    const existingItem = quoteParts.find(item => item.id === part.id);
    
    if (existingItem) {
      setQuoteParts(prev =>
        prev.map(item =>
          item.id === part.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setQuoteParts(prev => [
        ...prev,
        {
          id: part.id,
          name: part.name,
          brand: part.brand,
          part_number: part.part_number || part.model,
          quantity: 1,
          price: part.price,
          currency: part.currency,
          primary_image_url: part.primary_image_url
        }
      ]);
    }
  };

  const removeFromQuote = (partId: string) => {
    setQuoteParts(prev => prev.filter(item => item.id !== partId));
  };

  const updateQuantity = (partId: string, quantity: number) => {
    if (quantity < 1) {
      removeFromQuote(partId);
      return;
    }
    
    setQuoteParts(prev =>
      prev.map(item =>
        item.id === partId
          ? { ...item, quantity }
          : item
      )
    );
  };

  // ==================== COMPATIBILITY CHECKER ====================
  const checkCompatibility = async () => {
    if (!compatibilityData.model) return;

    try {
      const { data, error } = await supabase
        .from('product_catalog')
        .select('*')
        .in('category', ['parts', 'spare_parts'])
        .eq('status', 'active')
        .contains('compatible_with', [compatibilityData.model]);

      if (error) throw error;

      if (data) {
        // Map Product to SparePart format
        const compatibleSpareParts: SparePart[] = data.map((product: Product) => ({
          ...product,
          model: product.model || '',
          subcategory: product.subcategory || '',
          compatibility: product.compatible_with || [],
          part_number: product.model || undefined,
        }));
        setCompatibleParts(compatibleSpareParts);
        setShowCompatibilityResults(true);
      }
    } catch (error) {
      console.error('Error checking compatibility:', error);
    }
  };

  // ==================== FORM HANDLING ====================
  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // Use the helper function from supabase.ts
      const submissionData = {
        name: contactForm.name,
        email: contactForm.email,
        phone: contactForm.phone,
        company: contactForm.company,
        subject: contactForm.subject,
        message: contactForm.message,
        request_type: contactForm.request_type,
        product_name: contactForm.product_name || undefined,
      };

      const contactData = await submitContactForm(submissionData);

      // Create quote if there are items
      if (quoteParts.length > 0 && contactData && contactData.length > 0) {
        const quoteNumber = `Q-${new Date().getFullYear()}${(new Date().getMonth() + 1).toString().padStart(2, '0')}${new Date().getDate().toString().padStart(2, '0')}-${Math.floor(Math.random() * 1000).toString().padStart(4, '0')}`;
        
        const quoteData = {
          contact_submission_id: contactData[0].id,
          quote_number: quoteNumber,
          amount: quoteParts.reduce((sum, item) => sum + ((item.price || 0) * item.quantity), 0),
          status: 'pending',
          valid_until: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
          notes: contactForm.message,
        };

        await requestQuote(quoteData);
      }

      // Reset form
      setContactForm({
        name: '',
        email: '',
        phone: '',
        company: '',
        subject: '',
        message: '',
        request_type: 'parts_inquiry',
        product_name: '',
        part_number: '',
        engine_model: '',
        quantity: 1
      });
      setQuoteParts([]);
      setShowQuoteModal(false);

      alert(t('quote.responseTime'));

    } catch (error) {
      console.error('Error submitting form:', error);
      alert('There was an error submitting your request. Please try again or contact us directly.');
    }
  };

  // ==================== PAGINATION ====================
  const indexOfLastPart = currentPage * partsPerPage;
  const indexOfFirstPart = indexOfLastPart - partsPerPage;
  const currentParts = filteredParts.slice(indexOfFirstPart, indexOfLastPart);
  const totalPages = Math.ceil(filteredParts.length / partsPerPage);

  // ==================== CATEGORIES ====================
  const categories = [
    { id: 'filters', name: t('categories.filters'), icon: Filter, count: parts.filter(p => p.subcategory === 'Filters').length },
    { id: 'engine_components', name: t('categories.engineComponents'), icon: Cog, count: parts.filter(p => p.subcategory === 'Engine Components').length },
    { id: 'gaskets', name: t('categories.gaskets'), icon: Package, count: parts.filter(p => p.subcategory === 'Gaskets & Seals').length },
    { id: 'fuel_system', name: t('categories.fuelSystem'), icon: Droplet, count: parts.filter(p => p.subcategory === 'Fuel System').length },
    { id: 'cooling', name: t('categories.cooling'), icon: Wind, count: parts.filter(p => p.subcategory === 'Cooling System').length },
    { id: 'electrical', name: t('categories.electrical'), icon: Zap, count: parts.filter(p => p.subcategory === 'Electrical').length },
    { id: 'belts', name: t('categories.belts'), icon: Link, count: parts.filter(p => p.subcategory === 'Belts & Hoses').length },
    { id: 'hardware', name: t('categories.hardware'), icon: Wrench, count: parts.filter(p => p.subcategory === 'Fasteners & Hardware').length }
  ];

  // ==================== STOCK STATUS ====================
  const getStockStatus = (part: SparePart) => {
    if (part.stock_quantity > 10) return { status: 'inStock', text: t('featured.inStock'), color: 'bg-green-500' };
    if (part.stock_quantity > 0) return { status: 'lowStock', text: `${t('featured.lowStock')}: ${part.stock_quantity}`, color: 'bg-yellow-500' };
    if (part.lead_time_days) return { status: 'backorder', text: `${t('catalog.availableSoon')}: ${part.lead_time_days} ${t('common.days')}`, color: 'bg-blue-500' };
    return { status: 'outOfStock', text: t('featured.outOfStock'), color: 'bg-red-500' };
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setShowQuickNav(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className={`min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50/30 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-300`}>
        {/* ==================== NAVIGATION ==================== */}
        <nav className="sticky top-0 z-50 backdrop-blur-xl bg-white/80 dark:bg-gray-900/80 border-b border-gray-200/50 dark:border-gray-700/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              {/* Logo */}
              <div className="flex items-center">
                <div className="flex items-center space-x-2">
                  <Cog className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                  <span className="text-xl font-semibold text-gray-900 dark:text-white">Wings Engineering</span>
                </div>
              </div>

              {/* Desktop Navigation */}
              <div className="hidden md:flex items-center space-x-8">
                <a href="#parts" className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  {t('nav.parts')}
                </a>
                <a href="#compatibility" className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  {t('nav.engine')}
                </a>
                <a href="#services" className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  {t('nav.services')}
                </a>
                <a href="#contact" className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  {t('nav.contact')}
                </a>
                
                {/* Search Icon */}
                <button
                  onClick={() => setShowSearchModal(true)}
                  className="p-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                >
                  <Search size={20} />
                </button>

                {/* Dark Mode Toggle */}
                <button
                  onClick={() => setDarkMode(!darkMode)}
                  className="p-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                  aria-label="Toggle dark mode"
                >
                  {darkMode ? <Sun size={20} /> : <Moon size={20} />}
                </button>

                {/* Language Toggle */}
                <button
                  onClick={toggleLanguage}
                  className="flex items-center space-x-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                >
                  <Globe size={16} />
                  <span>{language === 'en' ? 'EN' : 'SW'}</span>
                </button>

                {/* Quote Button */}
                <button
                  onClick={() => setShowQuoteModal(true)}
                  className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-xl font-semibold hover:bg-blue-700 transition-colors"
                >
                  <ShoppingCart size={16} />
                  <span>{t('nav.quote')}</span>
                  {quoteParts.length > 0 && (
                    <span className="bg-white text-blue-600 text-xs font-bold px-2 py-1 rounded-full">
                      {quoteParts.length}
                    </span>
                  )}
                </button>

                {/* WhatsApp */}
                <a
                  href="https://wa.me/254718234222"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-green-500 text-white p-2 rounded-lg hover:bg-green-600 transition-colors"
                >
                  <MessageCircle size={20} />
                </a>
              </div>

              {/* Mobile Menu Button */}
              <div className="md:hidden flex items-center space-x-4">
                <button
                  onClick={() => setShowQuoteModal(true)}
                  className="relative p-2"
                >
                  <ShoppingCart size={20} />
                  {quoteParts.length > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                      {quoteParts.length}
                    </span>
                  )}
                </button>
                <button
                  onClick={() => setShowMobileMenu(!showMobileMenu)}
                  className="p-2"
                >
                  <Menu size={24} />
                </button>
              </div>
            </div>
          </div>

          {/* Mobile Menu */}
          <AnimatePresence>
            {showMobileMenu && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="md:hidden backdrop-blur-xl bg-white/95 dark:bg-gray-900/95 border-t border-gray-200 dark:border-gray-700"
              >
                <div className="px-4 py-4 space-y-4">
                  <a href="#parts" className="block text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 py-2">
                    {t('nav.parts')}
                  </a>
                  <a href="#compatibility" className="block text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 py-2">
                    {t('nav.engine')}
                  </a>
                  <a href="#services" className="block text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 py-2">
                    {t('nav.services')}
                  </a>
                  <a href="#contact" className="block text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 py-2">
                    {t('nav.contact')}
                  </a>
                  <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
                    <button
                      onClick={() => setDarkMode(!darkMode)}
                      className="p-2 text-gray-700 dark:text-gray-300"
                      aria-label="Toggle dark mode"
                    >
                      {darkMode ? <Sun size={20} /> : <Moon size={20} />}
                    </button>
                    <button
                      onClick={toggleLanguage}
                      className="flex items-center space-x-2 text-gray-700 dark:text-gray-300"
                    >
                      <Globe size={16} />
                      <span>{language === 'en' ? 'English' : 'Kiswahili'}</span>
                    </button>
                    <a
                      href="https://wa.me/254718234222"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-green-500 text-white px-4 py-2 rounded-lg flex items-center space-x-2"
                    >
                      <MessageCircle size={16} />
                      <span>WhatsApp</span>
                    </a>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </nav>

        {/* ==================== HERO SECTION ==================== */}
        <section className="min-h-screen flex items-center justify-center pt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
            <div className="text-center">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-5xl lg:text-7xl font-bold tracking-tight text-gray-900 dark:text-white leading-tight"
              >
                {t('hero.title')}
              </motion.h1>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-lg lg:text-xl font-normal text-gray-700 dark:text-gray-300 max-w-2xl mx-auto mt-6"
              >
                {t('hero.subtitle')}
              </motion.p>

              {/* Search Bar */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="max-w-2xl mx-auto mt-12"
              >
                <div className="relative">
                  <input
                    type="text"
                    placeholder={t('hero.searchPlaceholder')}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full px-6 py-5 text-lg rounded-2xl shadow-2xl border border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all backdrop-blur-xl bg-white/90"
                  />
                  <button
                    onClick={() => setShowSearchModal(true)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-blue-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors"
                  >
                    {t('hero.searchButton')}
                  </button>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-3 text-center">
                  {t('hero.popular')}
                </p>
              </motion.div>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8"
              >
                <a
                  href="#parts"
                  className="bg-blue-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl"
                >
                  {t('hero.browseAll')}
                </a>
                <a
                  href="#compatibility"
                  className="border-2 border-blue-600 text-blue-600 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-blue-50 transition-colors"
                >
                  {t('hero.checkCompatibility')}
                </a>
                <a
                  href="https://wa.me/254718234222"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 text-gray-600 hover:text-green-600 transition-colors"
                >
                  <MessageCircle size={20} />
                  <span>{t('hero.whatsapp')}</span>
                </a>
              </motion.div>

              {/* Stats */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-12 max-w-4xl mx-auto"
              >
                {[
                  { icon: Package, text: t('hero.stats.partsInStock') },
                  { icon: Zap, text: t('hero.stats.sameDayDispatch') },
                  { icon: CheckCircle, text: t('hero.stats.majorBrands') },
                  { icon: Shield, text: t('hero.stats.warranty') }
                ].map((stat, index) => (
                  <div
                    key={index}
                    className="backdrop-blur-xl bg-white/60 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow"
                  >
                    <stat.icon className="w-8 h-8 text-blue-600 mx-auto mb-3" />
                    <p className="text-sm font-medium text-gray-700 text-center">
                      {stat.text}
                    </p>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </section>

        {/* ==================== TRUST BADGES ==================== */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-semibold text-gray-900 dark:text-white text-center mb-12">
              {t('trust.title')}
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
              {[
                'Lister Petter',
                'Safaricom',
                'Nairobi Hospital',
                'Thika Manufacturing',
                'Coastal Power',
                'TransEast Logistics'
              ].map((company, index) => (
                <div
                  key={index}
                  className="backdrop-blur-md bg-white/40 rounded-xl p-6 h-24 flex items-center justify-center hover:-translate-y-1 transition-transform grayscale hover:grayscale-0"
                >
                  <span className="text-lg font-semibold text-gray-700">{company}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ==================== CATEGORIES ==================== */}
        <section id="parts" className="py-20 lg:py-32">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white text-center mb-4">
              {t('categories.title')}
            </h2>
            <p className="text-lg text-gray-700 dark:text-gray-300 text-center mb-12">
              {t('categories.subtitle')}
            </p>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {categories.map((category) => (
                <motion.button
                  key={category.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setSelectedCategory(category.id === 'all' ? 'all' : category.name)}
                  className="relative h-80 lg:h-96 rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl group"
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent z-10" />
                  <div className="absolute inset-0 bg-gray-100">
                    {/* Placeholder image - in production would be actual category image */}
                    <div className="w-full h-full bg-gradient-to-br from-blue-100 to-gray-100" />
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 z-20 p-6 text-left">
                    <category.icon className="w-8 h-8 text-white mb-2" />
                    <h3 className="text-xl font-bold text-white mb-1">
                      {category.name}
                    </h3>
                    <p className="text-sm text-gray-200">
                      {category.count}+ {t('common.parts')}
                    </p>
                  </div>
                </motion.button>
              ))}
            </div>
          </div>
        </section>

        {/* ==================== FEATURED PARTS ==================== */}
        <section className="py-20 bg-gray-50 dark:bg-gray-800/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white text-center mb-4">
              {t('featured.title')}
            </h2>
            <p className="text-lg text-gray-700 dark:text-gray-300 text-center mb-12">
              {t('featured.subtitle')}
            </p>

            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="animate-pulse">
                    <div className="bg-gray-200 rounded-3xl h-64 mb-4" />
                    <div className="h-4 bg-gray-200 rounded mb-2" />
                    <div className="h-3 bg-gray-200 rounded w-3/4" />
                  </div>
                ))}
              </div>
            ) : currentParts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {currentParts.slice(0, 8).map((part) => {
                  const stockStatus = getStockStatus(part);
                  return (
                    <motion.div
                      key={part.id}
                      whileHover={{ scale: 1.02 }}
                      className="backdrop-blur-xl bg-white/80 dark:bg-gray-800/80 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group cursor-pointer"
                    >
                      {/* Image Container */}
                      <div className="relative h-64 bg-gray-100 overflow-hidden">
                        {part.primary_image_url ? (
                          <img
                            src={part.primary_image_url}
                            alt={part.name}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-blue-100 to-gray-100 flex items-center justify-center">
                            <Package className="w-16 h-16 text-gray-400" />
                          </div>
                        )}
                        {/* Stock Badge */}
                        <div className={`absolute top-4 right-4 ${stockStatus.color} text-white text-xs font-semibold px-3 py-1 rounded-full`}>
                          {stockStatus.text}
                        </div>
                        {/* Quick View Button */}
                        <button className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <span className="text-white font-semibold text-lg">
                            Quick View
                          </span>
                        </button>
                      </div>
                      
                      {/* Content */}
                      <div className="p-6">
                        {/* Brand */}
                        <p className="text-xs font-medium text-blue-600 uppercase tracking-wider mb-1">
                          {part.brand}
                        </p>
                        
                        {/* Part Name */}
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white line-clamp-2 mb-2">
                          {part.name}
                        </h3>
                        
                        {/* Part Number */}
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                          Part#: {part.model || part.part_number || t('featured.contactForPrice')}
                        </p>
                        
                        {/* Compatibility Tags */}
                        {part.compatibility && part.compatibility.length > 0 && (
                          <div className="flex flex-wrap gap-1 mb-4">
                            {part.compatibility.slice(0, 3).map((model) => (
                              <span
                                key={model}
                                className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-md"
                              >
                                {model}
                              </span>
                            ))}
                          </div>
                        )}
                        
                        {/* Price Row */}
                        <div className="flex items-center justify-between">
                          <div>
                            {part.price ? (
                              <>
                                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                                  KES {part.price.toLocaleString()}
                                </p>
                                {part.bulk_pricing && (
                                  <p className="text-xs text-gray-600 dark:text-gray-400">
                                    {t('featured.bulkDiscounts')}
                                  </p>
                                )}
                              </>
                            ) : (
                              <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                {t('featured.contactForPrice')}
                              </p>
                            )}
                          </div>
                          
                          {/* Add to Quote Button */}
                          <button
                            onClick={() => addToQuote(part)}
                            className="bg-blue-600 text-white p-3 rounded-xl hover:bg-blue-700 transition-colors"
                          >
                            <Plus size={20} />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-12">
                <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">{t('catalog.noResults')}</p>
              </div>
            )}

            <div className="text-center mt-12">
              <a
                href="#catalog"
                className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-700 text-lg font-semibold"
              >
                <span>{t('featured.viewAll')}</span>
                <ChevronRight size={20} />
              </a>
            </div>
          </div>
        </section>

        {/* ==================== COMPATIBILITY CHECKER ==================== */}
        <section id="compatibility" className="py-24 bg-gradient-to-br from-blue-50 to-white dark:from-gray-800 dark:to-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white text-center mb-4">
              {t('compatibility.title')}
            </h2>
            <p className="text-lg text-gray-700 dark:text-gray-300 text-center mb-12">
              {t('compatibility.subtitle')}
            </p>

            <div className="max-w-3xl mx-auto backdrop-blur-xl bg-white/90 dark:bg-gray-800/90 rounded-3xl shadow-2xl p-8 lg:p-12">
              <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); checkCompatibility(); }}>
                {/* Engine Brand */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    {t('compatibility.brand')}
                  </label>
                  <select
                    value={compatibilityData.brand}
                    onChange={(e) => setCompatibilityData(prev => ({ ...prev, brand: e.target.value }))}
                    className="w-full px-4 py-4 rounded-xl border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all"
                  >
                    <option value="">{t('compatibility.selectBrand')}</option>
                    <option value="Lister Petter">Lister Petter</option>
                    <option value="Perkins">Perkins</option>
                    <option value="CAT">CAT</option>
                    <option value="Cummins">Cummins</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                {/* Engine Model */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    {t('compatibility.model')}
                  </label>
                  <input
                    type="text"
                    value={compatibilityData.model}
                    onChange={(e) => setCompatibilityData(prev => ({ ...prev, model: e.target.value }))}
                    placeholder={t('compatibility.modelPlaceholder')}
                    className="w-full px-4 py-4 rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all"
                  />
                  <p className="text-xs text-gray-500 mt-2">
                    {t('compatibility.notSure')}
                    <button
                      type="button"
                      onClick={() => window.open('https://wa.me/254718234222', '_blank')}
                      className="text-blue-600 hover:underline ml-1"
                    >
                      {t('compatibility.contactUs')}
                    </button>
                  </p>
                </div>

                {/* Part Type */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    {t('compatibility.partType')}
                  </label>
                  <select
                    value={compatibilityData.partType}
                    onChange={(e) => setCompatibilityData(prev => ({ ...prev, partType: e.target.value }))}
                    className="w-full px-4 py-4 rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all"
                  >
                    <option value="all">{t('compatibility.allParts')}</option>
                    <option value="Filters">Filters</option>
                    <option value="Engine Components">Engine Components</option>
                    <option value="Gaskets & Seals">Gaskets & Seals</option>
                    <option value="Fuel System">Fuel System</option>
                    <option value="Electrical">Electrical</option>
                  </select>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-4 rounded-xl font-semibold text-lg hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl"
                >
                  {t('compatibility.findParts')}
                </button>
              </form>

              {/* Results */}
              {showCompatibilityResults && (
                <div className="mt-8 pt-8 border-t border-gray-200">
                  <p className="text-center text-gray-600 mb-4">
                    {t('compatibility.showingResults', {
                      count: compatibleParts.length.toString(),
                      model: compatibilityData.model
                    })}
                  </p>
                  
                  {compatibleParts.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {compatibleParts.slice(0, 4).map((part) => (
                        <div key={part.id} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-xl">
                          {part.primary_image_url ? (
                            <img
                              src={part.primary_image_url}
                              alt={part.name}
                              className="w-16 h-16 object-cover rounded-lg"
                            />
                          ) : (
                            <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center">
                              <Package className="w-8 h-8 text-gray-400" />
                            </div>
                          )}
                          <div className="flex-1">
                            <h4 className="font-semibold text-gray-900">{part.name}</h4>
                            <p className="text-sm text-gray-600">{part.brand}</p>
                            <p className="text-xs text-gray-500">Part#: {part.model || part.part_number}</p>
                          </div>
                          <button
                            onClick={() => addToQuote(part)}
                            className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700"
                          >
                            <Plus size={16} />
                          </button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <Package className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-600">No compatible parts found for this model</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </section>

        {/* ==================== WHY CHOOSE US ==================== */}
        <section className="py-20 lg:py-32 bg-white dark:bg-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white text-center mb-16">
              {t('whyChoose.title')}
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  icon: Shield,
                  color: 'text-blue-600',
                  title: t('whyChoose.features.genuine.title'),
                  features: t('whyChoose.features.genuine.desc').split(', ')
                },
                {
                  icon: Zap,
                  color: 'text-orange-600',
                  title: t('whyChoose.features.dispatch.title'),
                  features: t('whyChoose.features.dispatch.desc').split(', ')
                },
                {
                  icon: Headphones,
                  color: 'text-green-600',
                  title: t('whyChoose.features.support.title'),
                  features: t('whyChoose.features.support.desc').split(', ')
                },
                {
                  icon: Award,
                  color: 'text-blue-600',
                  title: t('whyChoose.features.warranty.title'),
                  features: t('whyChoose.features.warranty.desc').split(', ')
                }
              ].map((feature, index) => (
                <div
                  key={index}
                  className="backdrop-blur-md bg-gradient-to-br from-white to-gray-50/50 dark:from-gray-800 dark:to-gray-700/50 rounded-3xl p-8 shadow-lg hover:shadow-xl transition-shadow border border-gray-100 dark:border-gray-700"
                >
                  <feature.icon className={`w-16 h-16 ${feature.color} mb-6`} />
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                    {feature.title}
                  </h3>
                  <ul className="space-y-2">
                    {feature.features.map((item, i) => (
                      <li key={i} className="flex items-start space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-500 dark:text-green-400 mt-1 flex-shrink-0" />
                        <span className="text-sm text-gray-700 dark:text-gray-300">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ==================== FULL CATALOG ==================== */}
        <section id="catalog" className="py-20 bg-gray-50 dark:bg-gray-800/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">
              {t('catalog.title')}
            </h2>
            
            {/* Filter Bar */}
            <div className="sticky top-16 z-40 backdrop-blur-xl bg-white/90 dark:bg-gray-800/90 border-y border-gray-200 dark:border-gray-700 px-4 py-4 mb-8">
              <div className="max-w-7xl mx-auto flex flex-wrap gap-4 items-center">
                {/* Search */}
                <div className="flex-1 min-w-[200px]">
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder={t('catalog.searchPlaceholder')}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                  />
                </div>
                
                {/* Category Filter */}
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                >
                  <option value="all">{t('catalog.allCategories')}</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.name}>
                      {cat.name} ({cat.count})
                    </option>
                  ))}
                </select>
                
                {/* Brand Filter */}
                <select
                  value={selectedBrand}
                  onChange={(e) => setSelectedBrand(e.target.value)}
                  className="px-4 py-2 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                >
                  <option value="all">{t('catalog.allBrands')}</option>
                  {Array.from(new Set(parts.map(p => p.brand))).map((brand) => (
                    <option key={brand} value={brand}>
                      {brand}
                    </option>
                  ))}
                </select>
                
                {/* Stock Filter */}
                <select
                  value={stockFilter}
                  onChange={(e) => setStockFilter(e.target.value)}
                  className="px-4 py-2 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                >
                  <option value="all">{t('catalog.allItems')}</option>
                  <option value="inStock">{t('catalog.inStockOnly')}</option>
                  <option value="availableSoon">{t('catalog.availableSoon')}</option>
                </select>
                
                {/* Sort */}
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-2 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                >
                  <option value="relevance">{t('catalog.sortBy')} {t('catalog.relevance')}</option>
                  <option value="priceLow">{t('catalog.priceLow')}</option>
                  <option value="priceHigh">{t('catalog.priceHigh')}</option>
                  <option value="nameAZ">{t('catalog.nameAZ')}</option>
                  <option value="newest">{t('catalog.newest')}</option>
                </select>
              </div>
            </div>
            
            {/* Parts Grid */}
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                  <div key={i} className="animate-pulse">
                    <div className="bg-gray-200 rounded-3xl h-48 mb-4" />
                    <div className="h-4 bg-gray-200 rounded mb-2" />
                    <div className="h-3 bg-gray-200 rounded w-3/4" />
                  </div>
                ))}
              </div>
            ) : filteredParts.length > 0 ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {currentParts.map((part) => {
                    const stockStatus = getStockStatus(part);
                    return (
                      <div
                        key={part.id}
                      className="backdrop-blur-md bg-white/90 dark:bg-gray-800/90 rounded-2xl shadow-md hover:shadow-xl transition-shadow overflow-hidden"
                    >
                      {/* Image */}
                      <div className="relative h-48 bg-gray-100 dark:bg-gray-700">
                          {part.primary_image_url ? (
                            <img
                              src={part.primary_image_url}
                              alt={part.name}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <Package className="w-12 h-12 text-gray-400" />
                            </div>
                          )}
                          <div className={`absolute top-2 right-2 ${stockStatus.color} text-white text-xs font-semibold px-2 py-1 rounded`}>
                            {stockStatus.text}
                          </div>
                        </div>
                        
                        {/* Content */}
                        <div className="p-4">
                          <p className="text-xs font-medium text-blue-600 dark:text-blue-400 uppercase tracking-wider mb-1">
                            {part.brand}
                          </p>
                          <h3 className="font-semibold text-gray-900 dark:text-white line-clamp-2 mb-2">
                            {part.name}
                          </h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                            {part.model || part.part_number}
                          </p>
                          
                          <div className="flex items-center justify-between">
                            <div>
                              {part.price ? (
                                <p className="text-lg font-bold text-gray-900 dark:text-white">
                                  KES {part.price.toLocaleString()}
                                </p>
                              ) : (
                                <p className="text-sm text-gray-700 dark:text-gray-300">
                                  {t('featured.contactForPrice')}
                                </p>
                              )}
                            </div>
                            <button
                              onClick={() => addToQuote(part)}
                              className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700"
                            >
                              <Plus size={16} />
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
                
                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex items-center justify-between mt-8 pt-8 border-t border-gray-200">
                    <p className="text-sm text-gray-600">
                      {t('catalog.showing', {
                        start: (indexOfFirstPart + 1).toString(),
                        end: Math.min(indexOfLastPart, filteredParts.length).toString(),
                        total: filteredParts.length.toString()
                      })}
                    </p>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                        disabled={currentPage === 1}
                        className="p-2 rounded-lg border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <ChevronLeft size={16} />
                      </button>
                      {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                        let pageNum;
                        if (totalPages <= 5) {
                          pageNum = i + 1;
                        } else if (currentPage <= 3) {
                          pageNum = i + 1;
                        } else if (currentPage >= totalPages - 2) {
                          pageNum = totalPages - 4 + i;
                        } else {
                          pageNum = currentPage - 2 + i;
                        }
                        
                        return (
                          <button
                            key={pageNum}
                            onClick={() => setCurrentPage(pageNum)}
                            className={`w-8 h-8 rounded-lg ${
                              currentPage === pageNum
                                ? 'bg-blue-600 text-white'
                                : 'border border-gray-300 text-gray-600 hover:bg-gray-50'
                            }`}
                          >
                            {pageNum}
                          </button>
                        );
                      })}
                      <button
                        onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                        disabled={currentPage === totalPages}
                        className="p-2 rounded-lg border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <ChevronRight size={16} />
                      </button>
                    </div>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-20">
                <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  {t('catalog.noResults')}
                </h3>
                <p className="text-gray-600 mb-6">
                  {t('catalog.tryAdjusting')}
                </p>
                <button
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedCategory('all');
                    setSelectedBrand('all');
                    setStockFilter('all');
                    setSortBy('relevance');
                  }}
                  className="text-blue-600 hover:underline"
                >
                  {t('catalog.clearFilters')}
                </button>
              </div>
            )}
          </div>
        </section>

        {/* ==================== BULK ORDERS & SERVICES ==================== */}
        <section id="services" className="py-20 bg-gradient-to-br from-gray-900 to-gray-800 dark:from-gray-950 dark:to-gray-900 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Bulk Orders */}
              <div className="backdrop-blur-lg bg-white/10 rounded-3xl p-10">
                <div className="relative">
                  <Truck className="w-16 h-16 text-white/40 mb-6" />
                  <h3 className="text-2xl font-bold mb-4">
                    {t('bulk.title')}
                  </h3>
                  <p className="text-gray-300 mb-6">
                    {t('bulk.subtitle')}
                  </p>
                  <ul className="space-y-3 mb-8">
                    {(() => {
                      const features = t('bulk.features') as any;
                      return Array.isArray(features) ? (features as string[]).map((feature: string, index: number) => (
                        <li key={index} className="flex items-start space-x-3">
                          <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-200">{feature}</span>
                        </li>
                      )) : [];
                    })()}
                  </ul>
                  <button
                    onClick={() => setShowQuoteModal(true)}
                    className="border-2 border-white text-white px-8 py-3 rounded-xl font-semibold hover:bg-white hover:text-gray-900 transition-colors"
                  >
                    {t('bulk.cta')}
                  </button>
                </div>
              </div>
              
              {/* Parts Services */}
              <div className="backdrop-blur-lg bg-white/10 rounded-3xl p-10">
                <div className="relative">
                  <Search className="w-16 h-16 text-white/40 mb-6" />
                  <h3 className="text-2xl font-bold mb-4">
                    {t('bulk.servicesTitle')}
                  </h3>
                  <p className="text-gray-300 mb-6">
                    {t('bulk.servicesSubtitle')}
                  </p>
                  <ul className="space-y-3 mb-8">
                    {(() => {
                      const features = t('bulk.servicesFeatures') as any;
                      return Array.isArray(features) ? (features as string[]).map((feature: string, index: number) => (
                        <li key={index} className="flex items-start space-x-3">
                          <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-200">{feature}</span>
                        </li>
                      )) : [];
                    })()}
                  </ul>
                  <a
                    href="https://wa.me/254718234222"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-2 border-2 border-white text-white px-8 py-3 rounded-xl font-semibold hover:bg-white hover:text-gray-900 transition-colors"
                  >
                    <MessageCircle size={20} />
                    <span>{t('bulk.servicesCta')}</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ==================== TESTIMONIALS ==================== */}
        <section className="py-20 bg-gray-50 dark:bg-gray-800/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white text-center mb-12">
              {t('testimonials.title')}
            </h2>
            
            <div className="flex overflow-x-auto space-x-6 pb-6 scrollbar-hide">
              {(() => {
                const testimonials = t('testimonials.testimonials') as any;
                return Array.isArray(testimonials) ? (testimonials as Array<{quote: string; author: string; role: string; rating: number}>).map((testimonial: {quote: string; author: string; role: string; rating: number}, index: number) => (
                  <div
                    key={index}
                  className="backdrop-blur-xl bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-lg min-w-[300px] lg:min-w-[400px] flex-shrink-0"
                >
                  {/* Rating */}
                  <div className="flex gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-5 h-5 fill-yellow-400 text-yellow-400"
                      />
                    ))}
                  </div>
                  
                  {/* Quote */}
                  <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed mb-6">
                    "{testimonial.quote}"
                  </p>
                  
                  {/* Author */}
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 font-bold flex items-center justify-center text-xl">
                      {testimonial.author.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-white">
                        {testimonial.author}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {testimonial.role}
                      </p>
                    </div>
                  </div>
                </div>
                )) : [];
              })()}
            </div>
          </div>
        </section>

        {/* ==================== QUOTE REQUEST MODAL ==================== */}
        <AnimatePresence>
          {showQuoteModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 overflow-y-auto"
            >
              <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center">
                {/* Backdrop */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 bg-black/50 backdrop-blur-sm"
                  onClick={() => setShowQuoteModal(false)}
                />
                
                {/* Modal */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: 20 }}
                  className="relative bg-white dark:bg-gray-800 rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
                >
                  <div className="p-8">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-8">
                      <div>
                        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                          {t('quote.title')}
                        </h2>
                        <p className="text-gray-700 dark:text-gray-300 mt-2">
                          {t('quote.subtitle')}
                        </p>
                      </div>
                      <button
                        onClick={() => setShowQuoteModal(false)}
                        className="p-2 hover:bg-gray-100 rounded-xl"
                      >
                        <X size={24} />
                      </button>
                    </div>
                    
                    {/* Quote Items */}
                    <div className="backdrop-blur-xl bg-white/90 dark:bg-gray-700/90 rounded-3xl shadow-2xl p-8 mb-8">
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                        {t('quote.partsInQuote')}
                      </h3>
                      
                      {quoteParts.length === 0 ? (
                        <div className="text-center py-12 text-gray-600 dark:text-gray-400">
                          <Package className="w-12 h-12 mx-auto mb-4 text-gray-400 dark:text-gray-500" />
                          <p>{t('quote.noPartsAdded')}</p>
                        </div>
                      ) : (
                        <div className="space-y-4">
                          {quoteParts.map((item) => (
                            <div
                              key={item.id}
                              className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl"
                            >
                              {item.primary_image_url ? (
                                <img
                                  src={item.primary_image_url}
                                  alt={item.name}
                                  className="w-20 h-20 object-cover rounded-lg"
                                />
                              ) : (
                                <div className="w-20 h-20 bg-gray-200 rounded-lg flex items-center justify-center">
                                  <Package className="w-8 h-8 text-gray-400" />
                                </div>
                              )}
                              <div className="flex-1">
                                <p className="font-semibold text-gray-900">
                                  {item.name}
                                </p>
                                <p className="text-sm text-gray-600">
                                  {item.brand}
                                </p>
                                <p className="text-xs text-gray-500">
                                  Part#: {item.part_number}
                                </p>
                                {item.price && (
                                  <p className="text-sm font-medium text-gray-900 mt-1">
                                    KES {(item.price * item.quantity).toLocaleString()}
                                  </p>
                                )}
                              </div>
                              <div className="flex items-center gap-2">
                                <button
                                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                  className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-lg hover:bg-gray-100"
                                >
                                  -
                                </button>
                                <input
                                  type="number"
                                  value={item.quantity}
                                  onChange={(e) => updateQuantity(item.id, parseInt(e.target.value) || 1)}
                                  className="w-16 px-2 py-1 border border-gray-300 rounded-lg text-center"
                                  min="1"
                                />
                                <button
                                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                  className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-lg hover:bg-gray-100"
                                >
                                  +
                                </button>
                                <button
                                  onClick={() => removeFromQuote(item.id)}
                                  className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg"
                                >
                                  <Trash2 size={18} />
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                      
                      <div className="mt-6 pt-6 border-t border-gray-200 flex justify-between items-center">
                        <p className="text-lg font-semibold text-gray-900">
                          {t('quote.totalItems')}: {quoteParts.length}
                        </p>
                        <button
                          onClick={() => {
                            setShowQuoteModal(false);
                            document.getElementById('catalog')?.scrollIntoView();
                          }}
                          className="text-blue-600 hover:underline"
                        >
                          {t('quote.continueBrowsing')}
                        </button>
                      </div>
                    </div>
                    
                    {/* Quote Form */}
                    <div className="backdrop-blur-xl bg-white/90 dark:bg-gray-700/90 rounded-3xl shadow-2xl p-8">
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                        {t('quote.yourInfo')}
                      </h3>
                      
                      <form onSubmit={handleContactSubmit} className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Name */}
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                            {t('quote.fullName')}
                          </label>
                          <input
                            type="text"
                            required
                            value={contactForm.name}
                            onChange={(e) => setContactForm(prev => ({ ...prev, name: e.target.value }))}
                            className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                          />
                        </div>
                        
                        {/* Email */}
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                            {t('quote.email')}
                          </label>
                          <input
                            type="email"
                            required
                            value={contactForm.email}
                            onChange={(e) => setContactForm(prev => ({ ...prev, email: e.target.value }))}
                            className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                          />
                        </div>
                        
                        {/* Phone */}
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                            {t('quote.phone')}
                          </label>
                          <input
                            type="tel"
                            required
                            value={contactForm.phone}
                            onChange={(e) => setContactForm(prev => ({ ...prev, phone: e.target.value }))}
                            placeholder={t('quote.phonePlaceholder')}
                            className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                          />
                        </div>
                        
                        {/* Company */}
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                            {t('quote.company')}
                          </label>
                          <input
                            type="text"
                            value={contactForm.company}
                            onChange={(e) => setContactForm(prev => ({ ...prev, company: e.target.value }))}
                            className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                          />
                        </div>
                        
                        {/* Delivery Location */}
                        <div className="lg:col-span-2">
                          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                            {t('quote.delivery')}
                          </label>
                          <input
                            type="text"
                            required
                            value={contactForm.subject}
                            onChange={(e) => setContactForm(prev => ({ ...prev, subject: e.target.value }))}
                            placeholder={t('quote.deliveryPlaceholder')}
                            className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                          />
                        </div>
                        
                        {/* Additional Notes */}
                        <div className="lg:col-span-2">
                          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                            {t('quote.notes')}
                          </label>
                          <textarea
                            rows={4}
                            value={contactForm.message}
                            onChange={(e) => setContactForm(prev => ({ ...prev, message: e.target.value }))}
                            placeholder={t('quote.notesPlaceholder')}
                            className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 resize-none"
                          />
                        </div>
                        
                        {/* Submit Button */}
                        <div className="lg:col-span-2">
                          <button
                            type="submit"
                            className="w-full bg-blue-600 text-white py-4 rounded-xl font-semibold text-lg hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl"
                          >
                            {t('quote.submit')}
                          </button>
                          <p className="text-sm text-gray-600 dark:text-gray-400 text-center mt-3">
                            {t('quote.responseTime')}
                          </p>
                        </div>
                      </form>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ==================== CONTACT & SUPPORT ==================== */}
        <section id="contact" className="py-20 lg:py-32 bg-gradient-to-br from-blue-50 to-white dark:from-gray-800 dark:to-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white text-center mb-12">
              {t('contact.title')}
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              {/* WhatsApp */}
              <div className="backdrop-blur-xl bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-lg text-center">
                <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MessageCircle size={32} className="text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  {t('contact.whatsapp.title')}
                </h3>
                <p className="text-gray-700 dark:text-gray-300 mb-6">
                  {t('contact.whatsapp.desc')}
                </p>
                <a
                  href="https://wa.me/254718234222?text=Hello%20Wings%20Engineering,%20I%20need%20spare%20parts%20for..."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-green-500 text-white px-6 py-3 rounded-xl font-semibold hover:bg-green-600 transition-colors"
                >
                  <MessageCircle size={20} />
                  {t('contact.whatsapp.cta')}
                </a>
              </div>
              
              {/* Phone */}
              <div className="backdrop-blur-xl bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-lg text-center">
                <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Phone size={32} className="text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  {t('contact.phone.title')}
                </h3>
                <p className="text-gray-700 dark:text-gray-300 mb-6">
                  {t('contact.phone.desc')}
                </p>
                <a
                  href="tel:+254718234222"
                  className="inline-block text-2xl font-bold text-blue-600 hover:text-blue-700 mb-2"
                >
                  {t('contact.phone.cta')}
                </a>
                <p className="text-sm text-gray-500">
                  {t('contact.phone.hours')}
                </p>
              </div>
              
              {/* Email */}
              <div className="backdrop-blur-xl bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-lg text-center">
                <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Mail size={32} className="text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  {t('contact.email.title')}
                </h3>
                <p className="text-gray-700 dark:text-gray-300 mb-6">
                  {t('contact.email.desc')}
                </p>
                <a
                  href="mailto:parts@wingsengineeringservices.com"
                  className="inline-block text-lg font-semibold text-blue-600 hover:text-blue-700 hover:underline"
                >
                  {t('contact.email.cta')}
                </a>
              </div>
            </div>
            
            {/* Location & Service Areas */}
            <div className="text-center">
              <div className="inline-flex items-center gap-2 text-gray-700 dark:text-gray-300 mb-2">
                <MapPin size={16} />
                <span>{t('contact.address')}</span>
              </div>
              <p className="text-gray-700 dark:text-gray-300">
                {t('contact.serviceAreas')}
              </p>
            </div>
          </div>
        </section>

        {/* ==================== FAQ ==================== */}
        <section className="py-20 bg-white dark:bg-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white text-center mb-12">
              {t('faq.title')}
            </h2>
            
            <div className="max-w-3xl mx-auto space-y-4">
              {(() => {
                const questions = t('faq.questions') as any;
                return Array.isArray(questions) ? (questions as Array<{q: string; a: string}>).map((faq: {q: string; a: string}, index: number) => (
                  <div
                    key={index}
                    className="backdrop-blur-xl bg-white dark:bg-gray-800 rounded-2xl shadow-md overflow-hidden border border-gray-100 dark:border-gray-700"
                  >
                    <button
                      onClick={() => setActiveFAQ(activeFAQ === index ? null : index)}
                      className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                    >
                      <span className="font-semibold text-gray-900 dark:text-white pr-4">
                        {faq.q}
                      </span>
                      <ChevronDown
                        size={24}
                        className={`text-gray-400 dark:text-gray-500 transition-transform ${
                          activeFAQ === index ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                    {activeFAQ === index && (
                      <div className="px-6 pb-5 text-gray-700 dark:text-gray-300 leading-relaxed">
                        {faq.a}
                      </div>
                    )}
                  </div>
                )) : [];
              })()}
            </div>
          </div>
        </section>

        {/* ==================== FOOTER ==================== */}
        <footer className="bg-gray-900 dark:bg-gray-950 text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
              {/* Company Info */}
              <div>
                <div className="flex items-center space-x-2 mb-4">
                  <Cog className="w-8 h-8 text-blue-400" />
                  <span className="text-xl font-bold">Wings Engineering</span>
                </div>
                <p className="text-gray-400 mb-4 leading-relaxed">
                  {t('footer.companyDesc')}
                </p>
                <div className="flex gap-4">
                  <a
                    href="#"
                    className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors"
                  >
                    <Facebook size={20} />
                  </a>
                  <a
                    href="#"
                    className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors"
                  >
                    <Instagram size={20} />
                  </a>
                  <a
                    href="#"
                    className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors"
                  >
                    <Linkedin size={20} />
                  </a>
                </div>
              </div>
              
              {/* Shop Parts */}
              <div>
                <h4 className="font-semibold mb-4">{t('footer.shop')}</h4>
                <ul className="space-y-2 text-gray-400">
                  {(() => {
                    const categories = t('footer.categories') as any;
                    return Array.isArray(categories) ? (categories as string[]).map((category: string, index: number) => (
                      <li key={index}>
                        <a
                          href="#"
                          className="hover:text-white transition-colors"
                        >
                          {category}
                        </a>
                      </li>
                    )) : [];
                  })()}
                </ul>
              </div>
              
              {/* Company */}
              <div>
                <h4 className="font-semibold mb-4">{t('footer.company')}</h4>
                <ul className="space-y-2 text-gray-400">
                  {(() => {
                    const companyLinks = t('footer.companyLinks') as any;
                    return Array.isArray(companyLinks) ? (companyLinks as string[]).map((link: string, index: number) => (
                      <li key={index}>
                        <a
                          href="#"
                          className="hover:text-white transition-colors"
                        >
                          {link}
                        </a>
                      </li>
                    )) : [];
                  })()}
                </ul>
              </div>
              
              {/* Support & Legal */}
              <div>
                <h4 className="font-semibold mb-4">{t('footer.support')}</h4>
                <ul className="space-y-2 text-gray-400 mb-6">
                  {(() => {
                    const supportLinks = t('footer.supportLinks') as any;
                    return Array.isArray(supportLinks) ? (supportLinks as string[]).map((link: string, index: number) => (
                      <li key={index}>
                        <a
                          href="#"
                          className="hover:text-white transition-colors"
                        >
                          {link}
                        </a>
                      </li>
                    )) : [];
                  })()}
                </ul>
                <h4 className="font-semibold mb-4 mt-8">{t('footer.legal')}</h4>
                <ul className="space-y-2 text-gray-400">
                  {(() => {
                    const legalLinks = t('footer.legalLinks') as any;
                    return Array.isArray(legalLinks) ? (legalLinks as string[]).map((link: string, index: number) => (
                      <li key={index}>
                        <a
                          href="#"
                          className="hover:text-white transition-colors"
                        >
                          {link}
                        </a>
                      </li>
                    )) : [];
                  })()}
                </ul>
              </div>
            </div>
            
            {/* Bottom Bar */}
            <div className="pt-8 border-t border-gray-800 flex flex-col md:flex-row items-center justify-between">
              <p className="text-gray-400 text-sm">
                {t('footer.copyright')}
              </p>
              <div className="flex items-center space-x-6 mt-4 md:mt-0">
                <button
                  onClick={toggleLanguage}
                  className="text-gray-400 hover:text-white text-sm"
                >
                  {language === 'en' ? 'English' : 'Kiswahili'}
                </button>
                <a
                  href="https://wa.me/254718234222"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white text-sm"
                >
                  WhatsApp Support
                </a>
                <span className="text-gray-400 text-sm">
                  {t('footer.builtWith')}
                </span>
              </div>
            </div>
          </div>
        </footer>

        {/* ==================== MOBILE QUICK NAVIGATION ==================== */}
        {showQuickNav && (
          <div className="fixed bottom-20 left-4 right-4 md:hidden z-40">
            <div className="backdrop-blur-xl bg-white/90 dark:bg-gray-800/90 rounded-2xl shadow-2xl p-4 border border-gray-200 dark:border-gray-700">
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => scrollToSection('parts')}
                  className="p-3 text-left bg-blue-50 dark:bg-blue-900/30 rounded-xl hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-colors"
                >
                  <Package size={20} className="text-blue-600 dark:text-blue-400 mb-1" />
                  <p className="text-xs font-semibold text-gray-900 dark:text-white">{t('nav.parts')}</p>
                </button>
                <button
                  onClick={() => scrollToSection('compatibility')}
                  className="p-3 text-left bg-purple-50 dark:bg-purple-900/30 rounded-xl hover:bg-purple-100 dark:hover:bg-purple-900/50 transition-colors"
                >
                  <Cog size={20} className="text-purple-600 dark:text-purple-400 mb-1" />
                  <p className="text-xs font-semibold text-gray-900 dark:text-white">{t('nav.engine')}</p>
                </button>
                <button
                  onClick={() => scrollToSection('services')}
                  className="p-3 text-left bg-orange-50 dark:bg-orange-900/30 rounded-xl hover:bg-orange-100 dark:hover:bg-orange-900/50 transition-colors"
                >
                  <Truck size={20} className="text-orange-600 dark:text-orange-400 mb-1" />
                  <p className="text-xs font-semibold text-gray-900 dark:text-white">{t('nav.services')}</p>
                </button>
                <button
                  onClick={() => scrollToSection('contact')}
                  className="p-3 text-left bg-green-50 dark:bg-green-900/30 rounded-xl hover:bg-green-100 dark:hover:bg-green-900/50 transition-colors"
                >
                  <Phone size={20} className="text-green-600 dark:text-green-400 mb-1" />
                  <p className="text-xs font-semibold text-gray-900 dark:text-white">{t('nav.contact')}</p>
                </button>
              </div>
              <button
                onClick={() => setShowQuickNav(false)}
                className="w-full mt-2 p-2 text-gray-600 dark:text-gray-400 text-sm"
              >
                Close
              </button>
            </div>
          </div>
        )}

        {/* ==================== QUICK NAV TOGGLE (MOBILE) ==================== */}
        <button
          onClick={() => setShowQuickNav(!showQuickNav)}
          className="fixed bottom-20 right-6 md:hidden bg-blue-600 dark:bg-blue-500 text-white p-4 rounded-full shadow-2xl hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors z-40"
          aria-label="Quick navigation"
        >
          <Navigation size={24} />
        </button>

        {/* ==================== BACK TO TOP BUTTON ==================== */}
        {showBackToTop && (
          <button
            onClick={scrollToTop}
            className="fixed bottom-6 right-6 md:bottom-24 bg-blue-600 dark:bg-blue-500 text-white p-4 rounded-full shadow-2xl hover:bg-blue-700 dark:hover:bg-blue-600 transition-all z-40 animate-bounce"
            aria-label="Back to top"
          >
            <ArrowUp size={24} />
          </button>
        )}

        {/* ==================== WHATSAPP BUTTON ==================== */}
        <a
          href="https://wa.me/254718234222"
          target="_blank"
          rel="noopener noreferrer"
          className="fixed bottom-6 right-6 md:bottom-6 md:right-20 bg-green-500 text-white p-4 rounded-full shadow-2xl hover:bg-green-600 transition-colors z-40 animate-pulse"
        >
          <MessageCircle size={24} />
        </a>

        {/* ==================== SEARCH MODAL ==================== */}
        <AnimatePresence>
          {showSearchModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50"
            >
              <div className="flex items-center justify-center min-h-screen px-4">
                {/* Backdrop */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 bg-black/50 backdrop-blur-sm"
                  onClick={() => setShowSearchModal(false)}
                />
                
                {/* Modal */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: 20 }}
                  className="relative backdrop-blur-xl bg-white/95 dark:bg-gray-800/95 rounded-3xl shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-hidden"
                >
                  <div className="p-6">
                    <div className="relative">
                      <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500" />
                      <input
                        type="text"
                        autoFocus
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder={t('hero.searchPlaceholder')}
                        className="w-full pl-12 pr-4 py-4 text-lg border-0 focus:ring-0 bg-transparent text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                      />
                      <button
                        onClick={() => setShowSearchModal(false)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 p-2 hover:bg-gray-100 rounded-lg"
                      >
                        <X size={20} />
                      </button>
                    </div>
                    
                    {/* Search Results */}
                    {searchTerm && (
                      <div className="mt-4 max-h-[60vh] overflow-y-auto">
                        {filteredParts.slice(0, 10).map((part) => (
                          <button
                            key={part.id}
                            onClick={() => {
                              addToQuote(part);
                              setShowSearchModal(false);
                            }}
                            className="w-full flex items-center gap-4 p-4 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-xl text-left"
                          >
                            {part.primary_image_url ? (
                              <img
                                src={part.primary_image_url}
                                alt={part.name}
                                className="w-12 h-12 object-cover rounded-lg"
                              />
                            ) : (
                              <div className="w-12 h-12 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                                <Package className="w-6 h-6 text-gray-400 dark:text-gray-500" />
                              </div>
                            )}
                            <div className="flex-1">
                              <p className="font-medium text-gray-900 dark:text-white">
                                {part.name}
                              </p>
                              <p className="text-sm text-gray-700 dark:text-gray-300">
                                {part.brand} • {part.model || part.part_number}
                              </p>
                            </div>
                            {part.price && (
                              <span className="font-semibold text-gray-900 dark:text-white">
                                KES {part.price.toLocaleString()}
                              </span>
                            )}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
  );
};

export default Index;