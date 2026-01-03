// src/pages/Index.tsx
import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { createClient } from '@supabase/supabase-js';
import { 
  Search, Package, Filter, CheckCircle, Shield, Truck, 
  MessageCircle, Phone, Mail, ChevronDown, Facebook, 
  Instagram, Linkedin, Star, ShoppingCart, X, Menu, 
  Globe, MapPin, Clock, Zap, Wrench, Settings, 
  AlertCircle, FileText, Cog, Headphones, Award, 
  Users, HelpCircle, ExternalLink, ChevronRight, 
  ChevronLeft, Plus, Trash2, Wind, Droplet, Link, 
  Moon, Sun, ArrowUp, Check, Truck as TruckIcon,
  MessageSquare, Home, ShoppingBag, Bell, AlertTriangle,
  Award as AwardIcon, Users as UsersIcon, ChevronUp,
  Shield as ShieldIcon, Clock as ClockIcon
} from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import Navigation from '@/components/landing/Navigation';
import Hero from '@/components/landing/Hero';
import Partners from '@/components/landing/Partners';
import About from '@/components/landing/About';
import Services from '@/components/landing/Services';
import Products from '@/components/landing/Products';
import WhyChooseUs from '@/components/landing/WhyChooseUs';
import Testimonials from '@/components/landing/Testimonials';
import Contact from '@/components/landing/Contact';
import Footer from '@/components/landing/Footer';
import WhatsAppButton from '@/components/landing/WhatsAppButton';

// Supabase Client
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Types
export interface SparePart {
  id: string;
  name: string;
  brand: string;
  model: string;
  category: string;
  subcategory: string;
  power_kva?: number;
  power_kw?: number;
  engine_brand?: string;
  engine_model?: string;
  engine_type?: string;
  cylinders?: number;
  cooling_type?: string;
  starting_type?: string;
  fuel_type?: string;
  voltage?: string;
  frequency?: string;
  rpm?: string;
  phase_type?: string;
  mounting_type?: string;
  weight_kg?: number;
  dimensions?: string;
  key_features: string[];
  short_description?: string;
  full_description?: string;
  applications: string[];
  service_interval_hours?: number;
  maintenance_notes?: string;
  compatible_with: string[];
  price?: number;
  currency: string;
  stock_quantity: number;
  primary_image_url?: string;
  additional_images: string[];
  status: string;
  created_at: string;
  updated_at: string;
  // Additional parts-specific fields
  part_number?: string;
  oem_equivalent?: string[];
  compatibility?: string[];
  material?: string;
  condition?: 'New/OEM' | 'Genuine' | 'Aftermarket' | 'Refurbished';
  lead_time_days?: number;
  minimum_order_quantity?: number;
  installation_notes?: string;
  warranty_months?: number;
  bulk_pricing?: Record<string, number>;
  technical_drawing_url?: string;
  installation_guide_url?: string;
}

export interface Service {
  id: string;
  name: string;
  category: string;
  service_type: string;
  description: string;
  duration_hours?: number;
  frequency?: string;
  interval_hours?: number;
  applicable_products: string[];
  equipment_brands: string[];
  base_price?: number;
  price_type?: string;
  currency: string;
  requirements: string[];
  included_items: string[];
  tools_required: string[];
  parts_included: boolean;
  advance_notice_days: number;
  available_locations: string[];
  mobile_service: boolean;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface QuoteItem {
  id: string;
  name: string;
  brand: string;
  model: string;
  part_number?: string;
  quantity: number;
  price?: number;
  currency: string;
  primary_image_url?: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  company: string;
  subject: string;
  message: string;
  request_type: string;
  product_name?: string;
  part_number?: string;
  engine_model?: string;
  quantity?: number;
  request_metadata?: Record<string, any>;
}

// Categories for filtering
const CATEGORIES = [
  { id: 'filters', name: 'Filters', icon: Filter, subcategory: 'Filters' },
  { id: 'engine_components', name: 'Engine Components', icon: Cog, subcategory: 'Engine Components' },
  { id: 'gaskets', name: 'Gaskets & Seals', icon: Package, subcategory: 'Gaskets & Seals' },
  { id: 'fuel_system', name: 'Fuel System', icon: Droplet, subcategory: 'Fuel System' },
  { id: 'cooling', name: 'Cooling System', icon: Wind, subcategory: 'Cooling System' },
  { id: 'electrical', name: 'Electrical', icon: Zap, subcategory: 'Electrical' },
  { id: 'belts', name: 'Belts & Hoses', icon: Link, subcategory: 'Belts & Hoses' },
  { id: 'hardware', name: 'Fasteners & Hardware', icon: Wrench, subcategory: 'Fasteners & Hardware' }
];

const Index = () => {
  const { language, setLanguage } = useLanguage();
  const [parts, setParts] = useState<SparePart[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [filteredParts, setFilteredParts] = useState<SparePart[]>([]);
  const [quoteItems, setQuoteItems] = useState<QuoteItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [showQuickNav, setShowQuickNav] = useState(false);
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [showQuoteModal, setShowQuoteModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedBrand, setSelectedBrand] = useState<string>('all');
  const [stockFilter, setStockFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('relevance');
  const [currentPage, setCurrentPage] = useState(1);
  const [compatibilityData, setCompatibilityData] = useState({
    brand: '',
    model: '',
    partType: 'all'
  });
  const [showCompatibilityResults, setShowCompatibilityResults] = useState(false);
  const [compatibleParts, setCompatibleParts] = useState<SparePart[]>([]);
  const [activeFAQ, setActiveFAQ] = useState<number | null>(null);
  const [contactForm, setContactForm] = useState<ContactFormData>({
    name: '',
    email: '',
    phone: '',
    company: '',
    subject: '',
    message: '',
    request_type: 'parts_inquiry'
  });

  const partsPerPage = 24;
  const heroRef = useRef<HTMLDivElement>(null);
  const partsRef = useRef<HTMLDivElement>(null);
  const compatibilityRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);
  const testimonialsRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);

  // Dark mode effect
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Scroll detection
  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Fetch data from Supabase
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      
      // Fetch spare parts
      const { data: partsData, error: partsError } = await supabase
        .from('product_catalog')
        .select('*')
        .in('category', ['parts', 'spare_parts'])
        .eq('status', 'active')
        .order('created_at', { ascending: false });

      if (partsError) throw partsError;

      // Fetch services
      const { data: servicesData, error: servicesError } = await supabase
        .from('service_catalog')
        .select('*')
        .eq('status', 'active')
        .order('created_at', { ascending: false });

      if (servicesError) throw servicesError;

      if (partsData) {
        const spareParts: SparePart[] = partsData.map(part => ({
          ...part,
          key_features: part.key_features || [],
          applications: part.applications || [],
          compatible_with: part.compatible_with || [],
          additional_images: part.additional_images || [],
          part_number: part.model,
          compatibility: part.compatible_with || []
        }));
        setParts(spareParts);
        setFilteredParts(spareParts);
      }

      if (servicesData) {
        setServices(servicesData);
      }

    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Filter and search functionality
  useEffect(() => {
    let result = [...parts];

    // Search filter
    if (searchQuery.trim()) {
      const term = searchQuery.toLowerCase();
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
      const category = CATEGORIES.find(c => c.id === selectedCategory);
      if (category) {
        result = result.filter(part => part.subcategory === category.subcategory);
      }
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
        if (searchQuery) {
          const term = searchQuery.toLowerCase();
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
  }, [searchQuery, selectedCategory, selectedBrand, stockFilter, sortBy, parts]);

  // Quote management
  const addToQuote = (part: SparePart) => {
    const existingItem = quoteItems.find(item => item.id === part.id);
    
    if (existingItem) {
      setQuoteItems(prev =>
        prev.map(item =>
          item.id === part.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setQuoteItems(prev => [
        ...prev,
        {
          id: part.id,
          name: part.name,
          brand: part.brand,
          model: part.model,
          part_number: part.part_number,
          quantity: 1,
          price: part.price,
          currency: part.currency,
          primary_image_url: part.primary_image_url
        }
      ]);
    }
  };

  const removeFromQuote = (partId: string) => {
    setQuoteItems(prev => prev.filter(item => item.id !== partId));
  };

  const updateQuantity = (partId: string, quantity: number) => {
    if (quantity < 1) {
      removeFromQuote(partId);
      return;
    }
    
    setQuoteItems(prev =>
      prev.map(item =>
        item.id === partId
          ? { ...item, quantity }
          : item
      )
    );
  };

  // Compatibility checker
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
        const compatibleSpareParts: SparePart[] = data.map(part => ({
          ...part,
          key_features: part.key_features || [],
          applications: part.applications || [],
          compatible_with: part.compatible_with || [],
          additional_images: part.additional_images || [],
          part_number: part.model,
          compatibility: part.compatible_with || []
        }));
        setCompatibleParts(compatibleSpareParts);
        setShowCompatibilityResults(true);
      }
    } catch (error) {
      console.error('Error checking compatibility:', error);
    }
  };

  // Contact form submission
  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const { data, error } = await supabase
        .from('contact_submissions')
        .insert([{
          ...contactForm,
          submission_date: new Date().toISOString(),
          created_at: new Date().toISOString()
        }]);

      if (error) throw error;

      // Create quote if there are items
      if (quoteItems.length > 0 && data && data.length > 0) {
        const quoteNumber = `Q-${new Date().getFullYear()}${(new Date().getMonth() + 1).toString().padStart(2, '0')}${new Date().getDate().toString().padStart(2, '0')}-${Math.floor(Math.random() * 1000).toString().padStart(4, '0')}`;
        
        const { error: quoteError } = await supabase
          .from('quotes')
          .insert([{
            contact_submission_id: data[0].id,
            quote_number: quoteNumber,
            amount: quoteItems.reduce((sum, item) => sum + ((item.price || 0) * item.quantity), 0),
            status: 'pending',
            valid_until: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
            notes: contactForm.message,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          }]);

        if (quoteError) throw quoteError;
      }

      // Reset form
      setContactForm({
        name: '',
        email: '',
        phone: '',
        company: '',
        subject: '',
        message: '',
        request_type: 'parts_inquiry'
      });
      setQuoteItems([]);
      setShowQuoteModal(false);

      alert(language === 'en' 
        ? 'Thank you! We\'ll respond within 2 hours.' 
        : 'Asante! Tutajibu ndani ya masaa 2.');

    } catch (error) {
      console.error('Error submitting form:', error);
      alert(language === 'en'
        ? 'There was an error submitting your request. Please try again or contact us directly.'
        : 'Kulikuwa na hitilafu wakati wa kuwasilisha ombi lako. Tafadhali jaribu tena au wasiliana nasi moja kwa moja.');
    }
  };

  // Stock status helper
  const getStockStatus = (part: SparePart) => {
    if (part.stock_quantity > 10) return { status: 'inStock', text: language === 'en' ? 'In Stock' : 'Inapatikana', color: 'bg-green-500' };
    if (part.stock_quantity > 0) return { status: 'lowStock', text: `${language === 'en' ? 'Low Stock' : 'Inakwisha'}: ${part.stock_quantity}`, color: 'bg-yellow-500' };
    if (part.lead_time_days) return { status: 'backorder', text: `${language === 'en' ? 'Available Soon' : 'Inapatikana Hivi Karibuni'}: ${part.lead_time_days} ${language === 'en' ? 'days' : 'siku'}`, color: 'bg-blue-500' };
    return { status: 'outOfStock', text: language === 'en' ? 'Out of Stock' : 'Haipatikani', color: 'bg-red-500' };
  };

  // Scroll to section
  const scrollToSection = (section: string) => {
    const refs: { [key: string]: React.RefObject<HTMLDivElement> } = {
      hero: heroRef,
      parts: partsRef,
      compatibility: compatibilityRef,
      services: servicesRef,
      testimonials: testimonialsRef,
      contact: contactRef
    };

    if (refs[section]?.current) {
      refs[section].current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setShowQuickNav(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Get unique brands
  const uniqueBrands = Array.from(new Set(parts.map(p => p.brand)));

  // Pagination
  const indexOfLastPart = currentPage * partsPerPage;
  const indexOfFirstPart = indexOfLastPart - partsPerPage;
  const currentParts = filteredParts.slice(indexOfFirstPart, indexOfLastPart);
  const totalPages = Math.ceil(filteredParts.length / partsPerPage);

  // Translation content
  const content = {
    en: {
      hero: {
        title: 'Genuine Spare Parts for Industrial Engines & Generators',
        subtitle: 'Lister Petter Specialist • OEM Quality • Fast Delivery Across East Africa',
        searchPlaceholder: 'Search by part name, number, or engine model...',
        stats: ['2,500+ Parts in Stock', 'Same Day Dispatch', 'All Major Brands', '12-Month Warranty']
      },
      categories: {
        title: 'Shop by Category',
        subtitle: 'Find exactly what you need'
      },
      featured: {
        title: 'Popular Spare Parts',
        subtitle: 'In stock and ready to ship'
      },
      compatibility: {
        title: 'Find Parts for Your Engine',
        subtitle: 'Select your engine model to see compatible parts'
      }
    },
    sw: {
      hero: {
        title: 'Vipuri Asilia kwa Injini na Jenereta za Viwandani',
        subtitle: 'Wataalam wa Lister Petter • Ubora wa OEM • Uwasilishaji wa Haraka Afrika Mashariki',
        searchPlaceholder: 'Tafuta kwa jina la kipuri, nambari, au modeli ya injini...',
        stats: ['Vipuri 2,500+ Vinapatikana', 'Kutumwa Siku Hiyohiyo', 'Brandi Zote Kubwa', 'Dhamana ya Miezi 12']
      },
      categories: {
        title: 'Nunua kwa Aina',
        subtitle: 'Pata hasa unachohitaji'
      },
      featured: {
        title: 'Vipuri Maarufu',
        subtitle: 'Vinapatikana na tayari kusafirishwa'
      },
      compatibility: {
        title: 'Tafuta Vipuri kwa Injini Yako',
        subtitle: 'Chagua modeli ya injini yako kuona vipuri vinavyofaa'
      }
    }
  };

  const t = content[language];

  return (
    <div className={`min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50/30 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-300`}>
      
      {/* Navigation */}
      <div ref={heroRef}>
        <Navigation
          language={language}
          toggleLanguage={() => setLanguage(language === 'en' ? 'sw' : 'en')}
          darkMode={darkMode}
          toggleDarkMode={() => setDarkMode(!darkMode)}
          quoteItems={quoteItems}
          onQuoteClick={() => setShowQuoteModal(true)}
          onSearchClick={() => setShowSearchModal(true)}
          onWhatsAppClick={() => window.open('https://wa.me/254718234222', '_blank')}
          scrollToSection={scrollToSection}
        />
      </div>

      {/* Hero Section */}
      <Hero
        language={language}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onSearch={() => setShowSearchModal(true)}
        onBrowseParts={() => scrollToSection('parts')}
        onCheckCompatibility={() => scrollToSection('compatibility')}
      />

      {/* Trust Badges */}
      <Partners language={language} />

      {/* Categories */}
      <div ref={partsRef} className="py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white text-center mb-4">
            {t.categories.title}
          </h2>
          <p className="text-lg text-gray-700 dark:text-gray-300 text-center mb-12">
            {t.categories.subtitle}
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {CATEGORIES.map((category) => {
              const count = parts.filter(p => p.subcategory === category.subcategory).length;
              return (
                <motion.button
                  key={category.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`relative h-80 lg:h-96 rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl group ${
                    selectedCategory === category.id ? 'ring-4 ring-blue-500' : ''
                  }`}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent z-10" />
                  <div className="absolute inset-0 bg-gray-100 dark:bg-gray-700">
                    <div className="w-full h-full bg-gradient-to-br from-blue-100 to-gray-100 dark:from-blue-900/30 dark:to-gray-800" />
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 z-20 p-6 text-left">
                    <category.icon className="w-8 h-8 text-white mb-2" />
                    <h3 className="text-xl font-bold text-white mb-1">
                      {category.name}
                    </h3>
                    <p className="text-sm text-gray-200">
                      {count}+ {language === 'en' ? 'parts' : 'vipuri'}
                    </p>
                  </div>
                </motion.button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Featured Parts */}
      <div className="py-20 bg-gray-50 dark:bg-gray-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white text-center mb-4">
            {t.featured.title}
          </h2>
          <p className="text-lg text-gray-700 dark:text-gray-300 text-center mb-12">
            {t.featured.subtitle}
          </p>

          <Products
            parts={currentParts}
            isLoading={isLoading}
            language={language}
            onAddToQuote={addToQuote}
            onViewAll={() => {
              setSelectedCategory('all');
              scrollToSection('parts');
            }}
          />
        </div>
      </div>

      {/* Compatibility Checker */}
      <div ref={compatibilityRef} className="py-24 bg-gradient-to-br from-blue-50 to-white dark:from-gray-800 dark:to-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white text-center mb-4">
            {t.compatibility.title}
          </h2>
          <p className="text-lg text-gray-700 dark:text-gray-300 text-center mb-12">
            {t.compatibility.subtitle}
          </p>

          <div className="max-w-3xl mx-auto backdrop-blur-xl bg-white/90 dark:bg-gray-800/90 rounded-3xl shadow-2xl p-8 lg:p-12">
            <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); checkCompatibility(); }}>
              {/* Engine Brand */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  {language === 'en' ? 'Engine Brand' : 'Brandi ya Injini'}
                </label>
                <select
                  value={compatibilityData.brand}
                  onChange={(e) => setCompatibilityData(prev => ({ ...prev, brand: e.target.value }))}
                  className="w-full px-4 py-4 rounded-xl border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all"
                >
                  <option value="">{language === 'en' ? 'Select Brand...' : 'Chagua Brandi...'}</option>
                  <option value="Lister Petter">Lister Petter</option>
                  <option value="Perkins">Perkins</option>
                  <option value="CAT">CAT</option>
                  <option value="Cummins">Cummins</option>
                  <option value="Other">{language === 'en' ? 'Other' : 'Nyingine'}</option>
                </select>
              </div>

              {/* Engine Model */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  {language === 'en' ? 'Engine Model' : 'Modeli ya Injini'}
                </label>
                <input
                  type="text"
                  value={compatibilityData.model}
                  onChange={(e) => setCompatibilityData(prev => ({ ...prev, model: e.target.value }))}
                  placeholder={language === 'en' ? 'e.g., LPW2, LPW3, LPW4' : 'mf., LPW2, LPW3, LPW4'}
                  className="w-full px-4 py-4 rounded-xl border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all"
                />
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                  {language === 'en' ? 'Not sure? Check the engine nameplate or ' : 'Sijui? Angalia sahani ya jina la injini au '}
                  <button
                    type="button"
                    onClick={() => window.open('https://wa.me/254718234222', '_blank')}
                    className="text-blue-600 hover:underline ml-1"
                  >
                    {language === 'en' ? 'contact us' : 'wasiliana nasi'}
                  </button>
                </p>
              </div>

              {/* Part Type */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  {language === 'en' ? 'Part Type (Optional)' : 'Aina ya Kipuri (Hiari)'}
                </label>
                <select
                  value={compatibilityData.partType}
                  onChange={(e) => setCompatibilityData(prev => ({ ...prev, partType: e.target.value }))}
                  className="w-full px-4 py-4 rounded-xl border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all"
                >
                  <option value="all">{language === 'en' ? 'All Parts' : 'Vipuri Vyote'}</option>
                  <option value="Filters">{language === 'en' ? 'Filters' : 'Vichujio'}</option>
                  <option value="Engine Components">{language === 'en' ? 'Engine Components' : 'Vifaa vya Injini'}</option>
                  <option value="Gaskets & Seals">{language === 'en' ? 'Gaskets & Seals' : 'Gasketi na Mihuri'}</option>
                  <option value="Fuel System">{language === 'en' ? 'Fuel System' : 'Mfumo wa Mafuta'}</option>
                  <option value="Electrical">{language === 'en' ? 'Electrical' : 'Umeme'}</option>
                </select>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-4 rounded-xl font-semibold text-lg hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl"
              >
                {language === 'en' ? 'Find Compatible Parts' : 'Tafuta Vipuri Vinavyofaa'}
              </button>
            </form>

            {/* Results */}
            {showCompatibilityResults && (
              <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
                <p className="text-center text-gray-600 dark:text-gray-400 mb-4">
                  {language === 'en' 
                    ? `Showing ${compatibleParts.length} parts compatible with ${compatibilityData.model}`
                    : `Inaonyesha vipuri ${compatibleParts.length} vinavyofaa na ${compatibilityData.model}`}
                </p>
                
                {compatibleParts.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {compatibleParts.slice(0, 4).map((part) => (
                      <div key={part.id} className="flex items-center space-x-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
                        {part.primary_image_url ? (
                          <img
                            src={part.primary_image_url}
                            alt={part.name}
                            className="w-16 h-16 object-cover rounded-lg"
                          />
                        ) : (
                          <div className="w-16 h-16 bg-gray-200 dark:bg-gray-600 rounded-lg flex items-center justify-center">
                            <Package className="w-8 h-8 text-gray-400 dark:text-gray-500" />
                          </div>
                        )}
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-900 dark:text-white">{part.name}</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400">{part.brand}</p>
                          <p className="text-xs text-gray-500 dark:text-gray-500">
                            {language === 'en' ? 'Part#' : 'Nambari ya Kipuri'}: {part.model || part.part_number}
                          </p>
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
                    <p className="text-gray-600 dark:text-gray-400">
                      {language === 'en' ? 'No compatible parts found for this model' : 'Hakuna vipuri vinavyofaa kwa modeli hii'}
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Why Choose Us */}
      <WhyChooseUs language={language} />

      {/* Full Catalog with Filters */}
      <div className="py-20 bg-gray-50 dark:bg-gray-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">
            {language === 'en' ? 'Complete Spare Parts Catalog' : 'Katalogi Kamili ya Vipuri'}
          </h2>
          
          {/* Filter Bar */}
          <div className="sticky top-16 z-40 backdrop-blur-xl bg-white/90 dark:bg-gray-800/90 border-y border-gray-200 dark:border-gray-700 px-4 py-4 mb-8">
            <div className="max-w-7xl mx-auto flex flex-wrap gap-4 items-center">
              {/* Search */}
              <div className="flex-1 min-w-[200px]">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={language === 'en' ? 'Search parts...' : 'Tafuta vipuri...'}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                />
              </div>
              
              {/* Category Filter */}
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
              >
                <option value="all">{language === 'en' ? 'All Categories' : 'Aina Zote'}</option>
                {CATEGORIES.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
              
              {/* Brand Filter */}
              <select
                value={selectedBrand}
                onChange={(e) => setSelectedBrand(e.target.value)}
                className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
              >
                <option value="all">{language === 'en' ? 'All Brands' : 'Brandi Zote'}</option>
                {uniqueBrands.map((brand) => (
                  <option key={brand} value={brand}>
                    {brand}
                  </option>
                ))}
              </select>
              
              {/* Stock Filter */}
              <select
                value={stockFilter}
                onChange={(e) => setStockFilter(e.target.value)}
                className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
              >
                <option value="all">{language === 'en' ? 'All Items' : 'Vitu Vyote'}</option>
                <option value="inStock">{language === 'en' ? 'In Stock Only' : 'Vinavyopatikana Pekee'}</option>
                <option value="availableSoon">{language === 'en' ? 'Available Soon' : 'Inapatikana Hivi Karibuni'}</option>
              </select>
              
              {/* Sort */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
              >
                <option value="relevance">{language === 'en' ? 'Sort by: Relevance' : 'Panga kwa: Muhimu'}</option>
                <option value="priceLow">{language === 'en' ? 'Price: Low to High' : 'Bei: Chini hadi Juu'}</option>
                <option value="priceHigh">{language === 'en' ? 'Price: High to Low' : 'Bei: Juu hadi Chini'}</option>
                <option value="nameAZ">{language === 'en' ? 'Name: A-Z' : 'Jina: A-Z'}</option>
                <option value="newest">{language === 'en' ? 'Newest First' : 'Mpya Zaidi Kwanza'}</option>
              </select>
            </div>
          </div>
          
          {/* Parts Grid */}
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                <div key={i} className="animate-pulse">
                  <div className="bg-gray-200 dark:bg-gray-700 rounded-3xl h-48 mb-4" />
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-2" />
                  <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-3/4" />
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
                            <Package className="w-12 h-12 text-gray-400 dark:text-gray-500" />
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
                                {part.currency === 'KES' ? 'KES ' : '$'}{part.price.toLocaleString()}
                              </p>
                            ) : (
                              <p className="text-sm text-gray-700 dark:text-gray-300">
                                {language === 'en' ? 'Contact for price' : 'Wasiliana kwa bei'}
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
                <div className="flex items-center justify-between mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {language === 'en' 
                      ? `Showing ${indexOfFirstPart + 1}-${Math.min(indexOfLastPart, filteredParts.length)} of ${filteredParts.length} parts`
                      : `Inaonyesha ${indexOfFirstPart + 1}-${Math.min(indexOfLastPart, filteredParts.length)} ya vipuri ${filteredParts.length}`}
                  </p>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                      disabled={currentPage === 1}
                      className="p-2 rounded-lg border border-gray-300 dark:border-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
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
                              : 'border border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700'
                          }`}
                        >
                          {pageNum}
                        </button>
                      );
                    })}
                    <button
                      onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                      disabled={currentPage === totalPages}
                      className="p-2 rounded-lg border border-gray-300 dark:border-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <ChevronRight size={16} />
                    </button>
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-20">
              <Package className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                {language === 'en' ? 'No parts found' : 'Hakuna vipuri vilivyopatikana'}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                {language === 'en' ? 'Try adjusting your filters or search terms' : 'Jaribu kurekebisha vichujio vyako au maneno ya utafutaji'}
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('all');
                  setSelectedBrand('all');
                  setStockFilter('all');
                  setSortBy('relevance');
                }}
                className="text-blue-600 hover:underline"
              >
                {language === 'en' ? 'Clear all filters' : 'Futa vichujio vyote'}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Bulk Orders & Services */}
      <div ref={servicesRef} className="py-20 bg-gradient-to-br from-gray-900 to-gray-800 dark:from-gray-950 dark:to-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Bulk Orders */}
            <div className="backdrop-blur-lg bg-white/10 rounded-3xl p-10">
              <div className="relative">
                <TruckIcon className="w-16 h-16 text-white/40 mb-6" />
                <h3 className="text-2xl font-bold mb-4">
                  {language === 'en' ? 'Bulk Orders & Fleet Accounts' : 'Maagizo Makubwa na Akaunti za Meli'}
                </h3>
                <p className="text-gray-300 mb-6">
                  {language === 'en' ? 'Volume discounts for orders of 10+ parts' : 'Ada ya wingi kwa maagizo ya vipuri 10+'}
                </p>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start space-x-3">
                    <Check className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-200">
                      {language === 'en' 
                        ? 'Dedicated account manager for fleet operators'
                        : 'Meneja wa akaunti maalum kwa waendeshaji wa meli'}
                    </span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <Check className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-200">
                      {language === 'en' 
                        ? 'Custom pricing for long-term contracts'
                        : 'Bei maalum kwa mikataba ya muda mrefu'}
                    </span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <Check className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-200">
                      {language === 'en' 
                        ? 'Priority shipping and handling'
                        : 'Usafirishaji na usindikaji wa kipaumbele'}
                    </span>
                  </li>
                </ul>
                <button
                  onClick={() => setShowQuoteModal(true)}
                  className="border-2 border-white text-white px-8 py-3 rounded-xl font-semibold hover:bg-white hover:text-gray-900 transition-colors"
                >
                  {language === 'en' ? 'Request Bulk Quote' : 'Omba Nukuu ya Wingi'}
                </button>
              </div>
            </div>
            
            {/* Parts Services */}
            <div className="backdrop-blur-lg bg-white/10 rounded-3xl p-10">
              <div className="relative">
                <Search className="w-16 h-16 text-white/40 mb-6" />
                <h3 className="text-2xl font-bold mb-4">
                  {language === 'en' ? 'Parts Identification & Sourcing' : 'Utambulishaji na Utafutaji wa Vipuri'}
                </h3>
                <p className="text-gray-300 mb-6">
                  {language === 'en' ? "Can't find your part? We can help" : 'Hauwezi kupata kipuri chako? Tunaweza kusaidia'}
                </p>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start space-x-3">
                    <Check className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-200">
                      {language === 'en' 
                        ? 'Send us a photo for identification'
                        : 'Tutumie picha kwa utambulishaji'}
                    </span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <Check className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-200">
                      {language === 'en' 
                        ? 'We source rare and discontinued parts'
                        : 'Tunatafuta vipuri nadra na vilivyokoma'}
                    </span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <Check className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-200">
                      {language === 'en' 
                        ? 'Cross-reference service for aftermarket parts'
                        : 'Huduma ya kufananisha kwa vipuri vya aftermarket'}
                    </span>
                  </li>
                </ul>
                <a
                  href="https://wa.me/254718234222"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2 border-2 border-white text-white px-8 py-3 rounded-xl font-semibold hover:bg-white hover:text-gray-900 transition-colors"
                >
                  <MessageCircle size={20} />
                  <span>{language === 'en' ? 'Get Help Finding Parts' : 'Pata Usaidizi wa Kupata Vipuri'}</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div ref={testimonialsRef} className="py-20 bg-gray-50 dark:bg-gray-800/50">
        <Testimonials language={language} />
      </div>

      {/* Contact Section */}
      <div ref={contactRef}>
        <Contact language={language} />
      </div>

      {/* Footer */}
      <Footer language={language} onQuoteClick={() => setShowQuoteModal(true)} />

      {/* WhatsApp Button */}
      <WhatsAppButton language={language} />

      {/* Back to Top Button */}
      {showBackToTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 md:bottom-6 md:right-32 bg-blue-600 dark:bg-blue-500 text-white p-4 rounded-full shadow-2xl hover:bg-blue-700 dark:hover:bg-blue-600 transition-all z-40"
          aria-label="Back to top"
        >
          <ArrowUp size={24} />
        </button>
      )}

      {/* Quick Navigation Toggle */}
      <button
        onClick={() => setShowQuickNav(!showQuickNav)}
        className="fixed bottom-20 right-6 md:hidden bg-blue-600 dark:bg-blue-500 text-white p-4 rounded-full shadow-2xl hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors z-40"
        aria-label="Quick navigation"
      >
        <Navigation size={24} />
      </button>

      {/* Quote Request Modal */}
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
                        {language === 'en' ? 'Request a Quote' : 'Omba Nukuu'}
                      </h2>
                      <p className="text-gray-700 dark:text-gray-300 mt-2">
                        {language === 'en' 
                          ? 'Add parts to your quote request and we\'ll respond within 2 hours'
                          : 'Ongeza vipuri kwenye ombi lako la nukuu na tutajibu ndani ya masaa 2'}
                      </p>
                    </div>
                    <button
                      onClick={() => setShowQuoteModal(false)}
                      className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl"
                    >
                      <X size={24} />
                    </button>
                  </div>
                  
                  {/* Quote Items */}
                  <div className="backdrop-blur-xl bg-white/90 dark:bg-gray-700/90 rounded-3xl shadow-2xl p-8 mb-8">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                      {language === 'en' ? 'Parts in Your Quote' : 'Vipuri Kwenye Nukuu Yako'}
                    </h3>
                    
                    {quoteItems.length === 0 ? (
                      <div className="text-center py-12 text-gray-600 dark:text-gray-400">
                        <Package className="w-12 h-12 mx-auto mb-4 text-gray-400 dark:text-gray-500" />
                        <p>
                          {language === 'en' 
                            ? 'No parts added yet. Browse our catalog and add parts to your quote.'
                            : 'Hakuna vipuri vilivyoongezwa bado. Tembelea katalogi yetu na ongeza vipuri kwenye nukuu yako.'}
                        </p>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {quoteItems.map((item) => (
                          <div
                            key={item.id}
                            className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-xl"
                          >
                            {item.primary_image_url ? (
                              <img
                                src={item.primary_image_url}
                                alt={item.name}
                                className="w-20 h-20 object-cover rounded-lg"
                              />
                            ) : (
                              <div className="w-20 h-20 bg-gray-200 dark:bg-gray-600 rounded-lg flex items-center justify-center">
                                <Package className="w-8 h-8 text-gray-400 dark:text-gray-500" />
                              </div>
                            )}
                            <div className="flex-1">
                              <p className="font-semibold text-gray-900 dark:text-white">
                                {item.name}
                              </p>
                              <p className="text-sm text-gray-600 dark:text-gray-400">
                                {item.brand}
                              </p>
                              <p className="text-xs text-gray-500 dark:text-gray-500">
                                {language === 'en' ? 'Part#' : 'Nambari ya Kipuri'}: {item.part_number || item.model}
                              </p>
                              {item.price && (
                                <p className="text-sm font-medium text-gray-900 dark:text-white mt-1">
                                  {item.currency === 'KES' ? 'KES ' : '$'}{(item.price * item.quantity).toLocaleString()}
                                </p>
                              )}
                            </div>
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                className="w-8 h-8 flex items-center justify-center border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600"
                              >
                                -
                              </button>
                              <input
                                type="number"
                                value={item.quantity}
                                onChange={(e) => updateQuantity(item.id, parseInt(e.target.value) || 1)}
                                className="w-16 px-2 py-1 border border-gray-300 dark:border-gray-600 rounded-lg text-center bg-white dark:bg-gray-800"
                                min="1"
                              />
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                className="w-8 h-8 flex items-center justify-center border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600"
                              >
                                +
                              </button>
                              <button
                                onClick={() => removeFromQuote(item.id)}
                                className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg"
                              >
                                <Trash2 size={18} />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                    
                    <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700 flex justify-between items-center">
                      <p className="text-lg font-semibold text-gray-900 dark:text-white">
                        {language === 'en' ? 'Total Items' : 'Vitu Jumla'}: {quoteItems.length}
                      </p>
                      <button
                        onClick={() => {
                          setShowQuoteModal(false);
                          scrollToSection('parts');
                        }}
                        className="text-blue-600 hover:underline"
                      >
                        {language === 'en' ? 'Continue browsing parts' : 'Endelea kutembelea vipuri'}
                      </button>
                    </div>
                  </div>
                  
                  {/* Quote Form */}
                  <div className="backdrop-blur-xl bg-white/90 dark:bg-gray-700/90 rounded-3xl shadow-2xl p-8">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                      {language === 'en' ? 'Your Information' : 'Taarifa Yako'}
                    </h3>
                    
                    <form onSubmit={handleContactSubmit} className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      {/* Name */}
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                          {language === 'en' ? 'Full Name*' : 'Jina Kamili*'}
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
                          {language === 'en' ? 'Email Address*' : 'Anwani ya Barua Pepe*'}
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
                          {language === 'en' ? 'Phone Number*' : 'Nambari ya Simu*'}
                        </label>
                        <input
                          type="tel"
                          required
                          value={contactForm.phone}
                          onChange={(e) => setContactForm(prev => ({ ...prev, phone: e.target.value }))}
                          placeholder="+2547XXXXXXXX"
                          className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                        />
                      </div>
                      
                      {/* Company */}
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                          {language === 'en' ? 'Company Name' : 'Jina la Kampuni'}
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
                          {language === 'en' ? 'Delivery Location*' : 'Mahali Pa Kufikishia*'}
                        </label>
                        <input
                          type="text"
                          required
                          value={contactForm.subject}
                          onChange={(e) => setContactForm(prev => ({ ...prev, subject: e.target.value }))}
                          placeholder={language === 'en' ? 'City, Area, or Full Address' : 'Jiji, Eneo, au Anwani Kamili'}
                          className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                        />
                      </div>
                      
                      {/* Additional Notes */}
                      <div className="lg:col-span-2">
                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                          {language === 'en' ? 'Additional Notes' : 'Maelezo Zaidi'}
                        </label>
                        <textarea
                          rows={4}
                          value={contactForm.message}
                          onChange={(e) => setContactForm(prev => ({ ...prev, message: e.target.value }))}
                          placeholder={language === 'en' ? 'Any specific requirements, urgency, or questions...' : 'Mahitaji yoyote maalum, uharaka, au maswali...'}
                          className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 resize-none"
                        />
                      </div>
                      
                      {/* Submit Button */}
                      <div className="lg:col-span-2">
                        <button
                          type="submit"
                          className="w-full bg-blue-600 text-white py-4 rounded-xl font-semibold text-lg hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl"
                        >
                          {language === 'en' ? 'Submit Quote Request' : 'Wasilisha Ombi la Nukuu'}
                        </button>
                        <p className="text-sm text-gray-600 dark:text-gray-400 text-center mt-3">
                          {language === 'en' 
                            ? 'We\'ll respond with a detailed quote within 2 hours (business hours)'
                            : 'Tutajibu kwa nukuu kamili ndani ya masaa 2 (masaa ya kazi)'}
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

      {/* Search Modal */}
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
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder={t.hero.searchPlaceholder}
                      className="w-full pl-12 pr-4 py-4 text-lg border-0 focus:ring-0 bg-transparent text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                    />
                    <button
                      onClick={() => setShowSearchModal(false)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
                    >
                      <X size={20} />
                    </button>
                  </div>
                  
                  {/* Search Results */}
                  {searchQuery && filteredParts.length > 0 && (
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
                              {part.currency === 'KES' ? 'KES ' : '$'}{part.price.toLocaleString()}
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

      {/* Quick Navigation Modal */}
      <AnimatePresence>
        {showQuickNav && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-20 right-6 md:hidden z-40"
          >
            <div className="backdrop-blur-xl bg-white/90 dark:bg-gray-800/90 rounded-2xl shadow-2xl p-4 border border-gray-200 dark:border-gray-700">
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => scrollToSection('parts')}
                  className="p-3 text-left bg-blue-50 dark:bg-blue-900/30 rounded-xl hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-colors"
                >
                  <Package size={20} className="text-blue-600 dark:text-blue-400 mb-1" />
                  <p className="text-xs font-semibold text-gray-900 dark:text-white">
                    {language === 'en' ? 'Browse Parts' : 'Vipuri'}
                  </p>
                </button>
                <button
                  onClick={() => scrollToSection('compatibility')}
                  className="p-3 text-left bg-purple-50 dark:bg-purple-900/30 rounded-xl hover:bg-purple-100 dark:hover:bg-purple-900/50 transition-colors"
                >
                  <Cog size={20} className="text-purple-600 dark:text-purple-400 mb-1" />
                  <p className="text-xs font-semibold text-gray-900 dark:text-white">
                    {language === 'en' ? 'Compatibility' : 'Ufanani'}
                  </p>
                </button>
                <button
                  onClick={() => scrollToSection('services')}
                  className="p-3 text-left bg-orange-50 dark:bg-orange-900/30 rounded-xl hover:bg-orange-100 dark:hover:bg-orange-900/50 transition-colors"
                >
                  <TruckIcon size={20} className="text-orange-600 dark:text-orange-400 mb-1" />
                  <p className="text-xs font-semibold text-gray-900 dark:text-white">
                    {language === 'en' ? 'Bulk Orders' : 'Maagizo Makubwa'}
                  </p>
                </button>
                <button
                  onClick={() => scrollToSection('contact')}
                  className="p-3 text-left bg-green-50 dark:bg-green-900/30 rounded-xl hover:bg-green-100 dark:hover:bg-green-900/50 transition-colors"
                >
                  <Phone size={20} className="text-green-600 dark:text-green-400 mb-1" />
                  <p className="text-xs font-semibold text-gray-900 dark:text-white">
                    {language === 'en' ? 'Contact' : 'Wasiliana'}
                  </p>
                </button>
              </div>
              <button
                onClick={() => setShowQuickNav(false)}
                className="w-full mt-2 p-2 text-gray-600 dark:text-gray-400 text-sm"
              >
                {language === 'en' ? 'Close' : 'Funga'}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Index;