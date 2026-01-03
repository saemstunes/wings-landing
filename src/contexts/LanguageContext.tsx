// src/contexts/LanguageContext.tsx
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react'

type Language = 'en' | 'sw'

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

const translations = {
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.products': 'Products',
    'nav.services': 'Services',
    'nav.portfolio': 'Portfolio',
    'nav.contact': 'Contact',
    'nav.language': 'Language',
    'nav.search': 'Search parts...',
    'nav.getQuote': 'Get Quote',
    'nav.quoteItems': 'Quote Items',
    
    // Hero Section
    'hero.headline': 'Wings Engineering Services Ltd',
    'hero.subheadline': 'Genuine Spare Parts for Industrial Engines & Generators',
    'hero.description': 'Lister Petter Specialist • OEM Quality • Fast Delivery Across East Africa',
    'hero.cta1': 'Browse Parts',
    'hero.cta2': 'Check Compatibility',
    'hero.searchPlaceholder': 'Search by part name, number, or engine model...',
    'hero.stat1': '2,500+',
    'hero.stat1Label': 'Parts in Stock',
    'hero.stat2': 'Same Day',
    'hero.stat2Label': 'Dispatch',
    'hero.stat3': 'All Major',
    'hero.stat3Label': 'Brands',
    'hero.stat4': '12-Month',
    'hero.stat4Label': 'Warranty',
    
    // Partners
    'partners.title': 'Trusted by Leading Organizations',
    
    // Categories
    'categories.title': 'Shop by Category',
    'categories.subtitle': 'Find exactly what you need',
    'categories.filters': 'Filters',
    'categories.engineComponents': 'Engine Components',
    'categories.gasketsSeals': 'Gaskets & Seals',
    'categories.fuelSystem': 'Fuel System',
    'categories.coolingSystem': 'Cooling System',
    'categories.electrical': 'Electrical',
    'categories.beltsHoses': 'Belts & Hoses',
    'categories.fastenersHardware': 'Fasteners & Hardware',
    'categories.parts': 'parts',
    
    // Products
    'products.title': 'Popular Spare Parts',
    'products.subtitle': 'In stock and ready to ship',
    'products.inStock': 'In Stock',
    'products.lowStock': 'Low Stock',
    'products.outOfStock': 'Out of Stock',
    'products.availableSoon': 'Available Soon',
    'products.requestQuote': 'Request Quote',
    'products.viewAll': 'View All Parts',
    'products.contactForPrice': 'Contact for price',
    'products.addToQuote': 'Add to Quote',
    'products.details': 'Details',
    'products.partNumber': 'Part#',
    
    // Compatibility Checker
    'compatibility.title': 'Find Parts for Your Engine',
    'compatibility.subtitle': 'Select your engine model to see compatible parts',
    'compatibility.engineBrand': 'Engine Brand',
    'compatibility.selectBrand': 'Select Brand...',
    'compatibility.engineModel': 'Engine Model',
    'compatibility.modelPlaceholder': 'e.g., LPW2, LPW3, LPW4',
    'compatibility.notSure': 'Not sure? Check the engine nameplate or contact us',
    'compatibility.partType': 'Part Type (Optional)',
    'compatibility.allParts': 'All Parts',
    'compatibility.findParts': 'Find Compatible Parts',
    'compatibility.showing': 'Showing {count} parts compatible with {model}',
    'compatibility.noParts': 'No compatible parts found for this model',
    
    // Why Choose Us
    'whyUs.title': 'Why Choose Wings Engineering',
    'whyUs.subtitle': 'Trusted by industrial clients across East Africa',
    'whyUs.local.title': 'Local Thika Team',
    'whyUs.local.description': 'Hands-on technical experience with rapid on-site response',
    'whyUs.verified.title': 'Verified Legal Presence',
    'whyUs.verified.description': 'Company listings and court record transparency',
    'whyUs.genuine.title': 'Genuine Spare Parts',
    'whyUs.genuine.description': 'Lister Petter specialist - OEM parts only',
    'whyUs.support.title': '24/7 Support',
    'whyUs.support.description': 'Emergency breakdown response and preventative maintenance packages',
    
    // Catalog
    'catalog.title': 'Complete Spare Parts Catalog',
    'catalog.search': 'Search parts...',
    'catalog.allCategories': 'All Categories',
    'catalog.allBrands': 'All Brands',
    'catalog.allItems': 'All Items',
    'catalog.inStockOnly': 'In Stock Only',
    'catalog.availableSoon': 'Available Soon',
    'catalog.sortRelevance': 'Sort by: Relevance',
    'catalog.sortPriceLow': 'Price: Low to High',
    'catalog.sortPriceHigh': 'Price: High to Low',
    'catalog.sortNameAZ': 'Name: A-Z',
    'catalog.sortNewest': 'Newest First',
    'catalog.showing': 'Showing {start}-{end} of {total} parts',
    'catalog.noParts': 'No parts found',
    'catalog.tryAdjusting': 'Try adjusting your filters or search terms',
    'catalog.clearFilters': 'Clear all filters',
    
    // Bulk Orders & Services
    'bulk.title': 'Bulk Orders & Fleet Accounts',
    'bulk.subtitle': 'Volume discounts for orders of 10+ parts',
    'bulk.point1': 'Dedicated account manager for fleet operators',
    'bulk.point2': 'Custom pricing for long-term contracts',
    'bulk.point3': 'Priority shipping and handling',
    'bulk.requestQuote': 'Request Bulk Quote',
    
    'services.title': 'Parts Identification & Sourcing',
    'services.subtitle': 'Can\'t find your part? We can help',
    'services.point1': 'Send us a photo for identification',
    'services.point2': 'We source rare and discontinued parts',
    'services.point3': 'Cross-reference service for aftermarket parts',
    'services.getHelp': 'Get Help Finding Parts',
    
    // Testimonials
    'testimonials.title': 'What Our Clients Say',
    'testimonials.subtitle': 'Hear from our satisfied clients across East Africa',
    
    // Contact
    'contact.title': 'Get in Touch',
    'contact.subtitle': 'Get in touch with our team for quotes, service bookings, or technical support',
    'contact.form.submit': 'Send Inquiry',
    'contact.form.name': 'Name',
    'contact.form.email': 'Email',
    'contact.form.phone': 'Phone',
    'contact.form.company': 'Company',
    'contact.form.requestType': 'Request Type',
    'contact.form.selectType': 'Select...',
    'contact.form.product': 'Product/Service Interest',
    'contact.form.message': 'Message',
    'contact.info.title': 'Contact Information',
    'contact.info.address': 'P.O. Box 4529-01002 Madaraka, Thika, Kenya',
    'contact.info.phone': '+254 718 234 222',
    'contact.info.email': 'sales@wingsengineeringservices.com',
    'contact.info.hours': 'Mon-Fri: 8AM-6PM, Sat: 9AM-2PM',
    'contact.info.whatsapp': 'Chat on WhatsApp',
    
    // Footer
    'footer.tagline': 'Powering East Africa\'s Industry',
    'footer.description': 'Your trusted partner for generators, engines, and industrial power solutions across Kenya.',
    'footer.quickLinks': 'Quick Links',
    'footer.contact': 'Contact',
    'footer.copyright': '© 2026 Wings Engineering Services Ltd. All rights reserved.',
    'footer.madeIn': 'Built with ❤️ in Kenya',
    
    // Quote Modal
    'quote.title': 'Request a Quote',
    'quote.subtitle': 'Add parts to your quote request and we\'ll respond within 2 hours',
    'quote.items': 'Parts in Your Quote',
    'quote.noItems': 'No parts added yet. Browse our catalog and add parts to your quote.',
    'quote.continueBrowsing': 'Continue browsing parts',
    'quote.yourInfo': 'Your Information',
    'quote.fullName': 'Full Name*',
    'quote.email': 'Email Address*',
    'quote.phone': 'Phone Number*',
    'quote.company': 'Company Name',
    'quote.delivery': 'Delivery Location*',
    'quote.deliveryPlaceholder': 'City, Area, or Full Address',
    'quote.notes': 'Additional Notes',
    'quote.notesPlaceholder': 'Any specific requirements, urgency, or questions...',
    'quote.submit': 'Submit Quote Request',
    'quote.response': 'We\'ll respond with a detailed quote within 2 hours (business hours)',
    'quote.totalItems': 'Total Items',
    
    // Search Modal
    'search.placeholder': 'Search by part name, number, or engine model...',
    
    // Quick Navigation
    'quickNav.browse': 'Browse Parts',
    'quickNav.compatibility': 'Compatibility',
    'quickNav.bulk': 'Bulk Orders',
    'quickNav.contact': 'Contact',
    'quickNav.close': 'Close',
    
    // Messages
    'message.thanks': 'Thank you! We\'ll respond within 2 hours.',
    'message.error': 'There was an error submitting your request. Please try again or contact us directly.',
    'message.contactUs': 'contact us',
    
    // Actions
    'action.close': 'Close',
    'action.backToTop': 'Back to top',
    
    // Brands
    'brand.listerPetter': 'Lister Petter',
    'brand.perkins': 'Perkins',
    'brand.cat': 'CAT',
    'brand.cummins': 'Cummins',
    'brand.other': 'Other',
    
    // Part Types
    'partType.filters': 'Filters',
    'partType.engineComponents': 'Engine Components',
    'partType.gaskets': 'Gaskets & Seals',
    'partType.fuel': 'Fuel System',
    'partType.electrical': 'Electrical',
  },
  sw: {
    // Navigation
    'nav.home': 'Nyumbani',
    'nav.products': 'Bidhaa',
    'nav.services': 'Huduma',
    'nav.portfolio': 'Miradi',
    'nav.contact': 'Wasiliana',
    'nav.language': 'Lugha',
    'nav.search': 'Tafuta vipuri...',
    'nav.getQuote': 'Pata Nukuu',
    'nav.quoteItems': 'Vipuri kwenye Nukuu',
    
    // Hero Section
    'hero.headline': 'Wings Engineering Services Ltd',
    'hero.subheadline': 'Vipuri Asilia kwa Injini na Jenereta za Viwandani',
    'hero.description': 'Wataalam wa Lister Petter • Ubora wa OEM • Uwasilishaji wa Haraka Afrika Mashariki',
    'hero.cta1': 'Tembelea Vipuri',
    'hero.cta2': 'Angalia Ufanani',
    'hero.searchPlaceholder': 'Tafuta kwa jina la kipuri, nambari, au modeli ya injini...',
    'hero.stat1': '2,500+',
    'hero.stat1Label': 'Vipuri Vinapatikana',
    'hero.stat2': 'Siku Hiyohiyo',
    'hero.stat2Label': 'Kutumwa',
    'hero.stat3': 'Brandi Zote',
    'hero.stat3Label': 'Kubwa',
    'hero.stat4': 'Dhamana ya',
    'hero.stat4Label': 'Miezi 12',
    
    // Partners
    'partners.title': 'Tunaminika na Mashirika Makubwa',
    
    // Categories
    'categories.title': 'Nunua kwa Aina',
    'categories.subtitle': 'Pata hasa unachohitaji',
    'categories.filters': 'Vichujio',
    'categories.engineComponents': 'Vifaa vya Injini',
    'categories.gasketsSeals': 'Gasketi na Mihuri',
    'categories.fuelSystem': 'Mfumo wa Mafuta',
    'categories.coolingSystem': 'Mfumo wa Kupoa',
    'categories.electrical': 'Umeme',
    'categories.beltsHoses': 'Mikanda na Mijeledi',
    'categories.fastenersHardware': 'Vifungo na Vifaa',
    'categories.parts': 'vipuri',
    
    // Products
    'products.title': 'Vipuri Maarufu',
    'products.subtitle': 'Vinapatikana na tayari kusafirishwa',
    'products.inStock': 'Inapatikana',
    'products.lowStock': 'Inakwisha',
    'products.outOfStock': 'Haipatikani',
    'products.availableSoon': 'Inapatikana Hivi Karibuni',
    'products.requestQuote': 'Omba Nukuu',
    'products.viewAll': 'Angalia Vipuri Vyote',
    'products.contactForPrice': 'Wasiliana kwa bei',
    'products.addToQuote': 'Ongeza kwenye Nukuu',
    'products.details': 'Maelezo',
    'products.partNumber': 'Nambari ya Kipuri',
    
    // Compatibility Checker
    'compatibility.title': 'Tafuta Vipuri kwa Injini Yako',
    'compatibility.subtitle': 'Chagua modeli ya injini yako kuona vipuri vinavyofaa',
    'compatibility.engineBrand': 'Brandi ya Injini',
    'compatibility.selectBrand': 'Chagua Brandi...',
    'compatibility.engineModel': 'Modeli ya Injini',
    'compatibility.modelPlaceholder': 'mf., LPW2, LPW3, LPW4',
    'compatibility.notSure': 'Sijui? Angalia sahani ya jina la injini au wasiliana nasi',
    'compatibility.partType': 'Aina ya Kipuri (Hiari)',
    'compatibility.allParts': 'Vipuri Vyote',
    'compatibility.findParts': 'Tafuta Vipuri Vinavyofaa',
    'compatibility.showing': 'Inaonyesha vipuri {count} vinavyofaa na {model}',
    'compatibility.noParts': 'Hakuna vipuri vinavyofaa kwa modeli hii',
    
    // Why Choose Us
    'whyUs.title': 'Kwa Nini Kuchagua Wings Engineering',
    'whyUs.subtitle': 'Tunaminika na wateja wa viwanda Afrika Mashariki',
    'whyUs.local.title': 'Timu ya Ndani ya Thika',
    'whyUs.local.description': 'Uzoefu wa kiufundi wa vitendo na jibu la haraka kwenye tovuti',
    'whyUs.verified.title': 'Uwepo wa Kisheria Uliohakikiwa',
    'whyUs.verified.description': 'Orodha ya kampuni na uwazi wa rekodi za mahakama',
    'whyUs.genuine.title': 'Vipuri Halisi',
    'whyUs.genuine.description': 'Mtaalamu wa Lister Petter - Vipuri vya OEM pekee',
    'whyUs.support.title': 'Usaidizi 24/7',
    'whyUs.support.description': 'Jibu la dharura la kuvunjika na vifurushi vya matengenezo ya kuzuia',
    
    // Catalog
    'catalog.title': 'Katalogi Kamili ya Vipuri',
    'catalog.search': 'Tafuta vipuri...',
    'catalog.allCategories': 'Aina Zote',
    'catalog.allBrands': 'Brandi Zote',
    'catalog.allItems': 'Vitu Vyote',
    'catalog.inStockOnly': 'Vinavyopatikana Pekee',
    'catalog.availableSoon': 'Inapatikana Hivi Karibuni',
    'catalog.sortRelevance': 'Panga kwa: Muhimu',
    'catalog.sortPriceLow': 'Bei: Chini hadi Juu',
    'catalog.sortPriceHigh': 'Bei: Juu hadi Chini',
    'catalog.sortNameAZ': 'Jina: A-Z',
    'catalog.sortNewest': 'Mpya Zaidi Kwanza',
    'catalog.showing': 'Inaonyesha {start}-{end} ya vipuri {total}',
    'catalog.noParts': 'Hakuna vipuri vilivyopatikana',
    'catalog.tryAdjusting': 'Jaribu kurekebisha vichujio vyako au maneno ya utafutaji',
    'catalog.clearFilters': 'Futa vichujio vyote',
    
    // Bulk Orders & Services
    'bulk.title': 'Maagizo Makubwa na Akaunti za Meli',
    'bulk.subtitle': 'Ada ya wingi kwa maagizo ya vipuri 10+',
    'bulk.point1': 'Meneja wa akaunti maalum kwa waendeshaji wa meli',
    'bulk.point2': 'Bei maalum kwa mikataba ya muda mrefu',
    'bulk.point3': 'Usafirishaji na usindikaji wa kipaumbele',
    'bulk.requestQuote': 'Omba Nukuu ya Wingi',
    
    'services.title': 'Utambulishaji na Utafutaji wa Vipuri',
    'services.subtitle': 'Hauwezi kupata kipuri chako? Tunaweza kusaidia',
    'services.point1': 'Tutumie picha kwa utambulishaji',
    'services.point2': 'Tunatafuta vipuri nadra na vilivyokoma',
    'services.point3': 'Huduma ya kufananisha kwa vipuri vya aftermarket',
    'services.getHelp': 'Pata Usaidizi wa Kupata Vipuri',
    
    // Testimonials
    'testimonials.title': 'Wateja Wetu Wanasema Nini',
    'testimonials.subtitle': 'Sikiliza kutoka kwa wateja wetu walioridhika Afrika Mashariki',
    
    // Contact
    'contact.title': 'Wasiliana Nasi',
    'contact.subtitle': 'Wasiliana na timu yetu kwa nukuu, huduma za kuhudumia kitabu, au usaidizi wa kiufundi',
    'contact.form.submit': 'Tuma Ombi',
    'contact.form.name': 'Jina',
    'contact.form.email': 'Barua Pepe',
    'contact.form.phone': 'Simu',
    'contact.form.company': 'Kampuni',
    'contact.form.requestType': 'Aina ya Ombi',
    'contact.form.selectType': 'Chagua...',
    'contact.form.product': 'Bidhaa/Huduma ya Kupendeza',
    'contact.form.message': 'Ujumbe',
    'contact.info.title': 'Taarifa za Mawasiliano',
    'contact.info.address': 'S.L.P 4529-01002 Madaraka, Thika, Kenya',
    'contact.info.phone': '+254 718 234 222',
    'contact.info.email': 'sales@wingsengineeringservices.com',
    'contact.info.hours': 'Jumatatu-Ijumaa: 8AM-6PM, Jumamosi: 9AM-2PM',
    'contact.info.whatsapp': 'Piga Simu kwa WhatsApp',
    
    // Footer
    'footer.tagline': 'Kuweka Nguvu ya Viwanda ya Afrika Mashariki',
    'footer.description': 'Mshirika wako wa kuaminika kwa jenereta, injini, na ufumbuzi wa nguvu ya viwanda nchini Kenya.',
    'footer.quickLinks': 'Viungo vya Haraka',
    'footer.contact': 'Mawasiliano',
    'footer.copyright': '© 2026 Wings Engineering Services Ltd. Haki zote zimehifadhiwa.',
    'footer.madeIn': 'Imejengwa kwa ❤️ nchini Kenya',
    
    // Quote Modal
    'quote.title': 'Omba Nukuu',
    'quote.subtitle': 'Ongeza vipuri kwenye ombi lako la nukuu na tutajibu ndani ya masaa 2',
    'quote.items': 'Vipuri Kwenye Nukuu Yako',
    'quote.noItems': 'Hakuna vipuri vilivyoongezwa bado. Tembelea katalogi yetu na ongeza vipuri kwenye nukuu yako.',
    'quote.continueBrowsing': 'Endelea kutembelea vipuri',
    'quote.yourInfo': 'Taarifa Yako',
    'quote.fullName': 'Jina Kamili*',
    'quote.email': 'Anwani ya Barua Pepe*',
    'quote.phone': 'Nambari ya Simu*',
    'quote.company': 'Jina la Kampuni',
    'quote.delivery': 'Mahali Pa Kufikishia*',
    'quote.deliveryPlaceholder': 'Jiji, Eneo, au Anwani Kamili',
    'quote.notes': 'Maelezo Zaidi',
    'quote.notesPlaceholder': 'Mahitaji yoyote maalum, uharaka, au maswali...',
    'quote.submit': 'Wasilisha Ombi la Nukuu',
    'quote.response': 'Tutajibu kwa nukuu kamili ndani ya masaa 2 (masaa ya kazi)',
    'quote.totalItems': 'Vitu Jumla',
    
    // Search Modal
    'search.placeholder': 'Tafuta kwa jina la kipuri, nambari, au modeli ya injini...',
    
    // Quick Navigation
    'quickNav.browse': 'Vipuri',
    'quickNav.compatibility': 'Ufanani',
    'quickNav.bulk': 'Maagizo Makubwa',
    'quickNav.contact': 'Wasiliana',
    'quickNav.close': 'Funga',
    
    // Messages
    'message.thanks': 'Asante! Tutajibu ndani ya masaa 2.',
    'message.error': 'Kulikuwa na hitilafu wakati wa kuwasilisha ombi lako. Tafadhali jaribu tena au wasiliana nasi moja kwa moja.',
    'message.contactUs': 'wasiliana nasi',
    
    // Actions
    'action.close': 'Funga',
    'action.backToTop': 'Rudi juu',
    
    // Brands
    'brand.listerPetter': 'Lister Petter',
    'brand.perkins': 'Perkins',
    'brand.cat': 'CAT',
    'brand.cummins': 'Cummins',
    'brand.other': 'Nyingine',
    
    // Part Types
    'partType.filters': 'Vichujio',
    'partType.engineComponents': 'Vifaa vya Injini',
    'partType.gaskets': 'Gasketi na Mihuri',
    'partType.fuel': 'Mfumo wa Mafuta',
    'partType.electrical': 'Umeme',
  }
} as const

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem('wings-language')
    return (saved as Language) || 'en'
  })

  useEffect(() => {
    localStorage.setItem('wings-language', language)
  }, [language])

  const t = (key: string): string => {
    const keys = key.split('.')
    let value: any = translations[language]
    
    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k]
      } else {
        console.warn(`Translation missing for key: ${key} in language: ${language}`)
        return key
      }
    }
    
    return value || key
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}
