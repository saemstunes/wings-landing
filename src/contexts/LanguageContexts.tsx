import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'en' | 'sw';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.products': 'Products',
    'nav.services': 'Services',
    'nav.portfolio': 'Portfolio',
    'nav.contact': 'Contact',
    'nav.about': 'About',
    
    // Hero
    'hero.headline': 'Wings Engineering Services Ltd',
    'hero.subheadline': 'Reliable Mechanical & Electrical Engineering in Thika',
    'hero.description': 'Generators • Engines • Spare Parts • Installation • Maintenance – trusted technical solutions for industry and commerce in Thika and Nairobi County',
    'hero.cta1': 'Get a Quote',
    'hero.cta2': 'Call Us Now',
    'hero.stat1': '15+ Years',
    'hero.stat1Label': 'Experience',
    'hero.stat2': '500+',
    'hero.stat2Label': 'Projects Completed',
    'hero.stat3': '24/7',
    'hero.stat3Label': 'Emergency Support',
    'hero.stat4': '100%',
    'hero.stat4Label': 'Genuine Parts',
    
    // Partners
    'partners.title': 'Trusted by Leading Organizations',
    
    // About
    'about.title': 'About Wings Engineering Services Ltd',
    'about.content': 'Wings Engineering Services Ltd is a Thika-based engineering firm providing mechanical and electrical engineering solutions – from generator sales and servicing, engine spare parts, to installation and project maintenance. With a local presence in Thika, we serve industrial and commercial clients throughout Nairobi County.',
    'about.content2': 'Our team of experienced technicians specializes in Lister Petter engines and generators, offering genuine spare parts sourcing, professional installation and commissioning, 24/7 emergency breakdown support, preventative maintenance contracts, and custom engine solutions.',
    'about.feature1': 'Genuine Spare Parts Sourcing',
    'about.feature2': 'Professional Installation & Commissioning',
    'about.feature3': '24/7 Emergency Breakdown Support',
    'about.feature4': 'Preventative Maintenance Contracts',
    'about.feature5': 'Custom Engine Solutions & R&D',
    'about.feature6': 'Certified Lister Petter Service Center',
    
    // Services
    'services.title': 'Our Services',
    'services.subtitle': 'Comprehensive engineering solutions for all your power needs',
    'services.learnMore': 'Learn More',
    'services.bookService': 'Book Service',
    
    'services.generator.title': 'Generator Sales & Hire',
    'services.generator.description': 'New and refurbished diesel generators. Short-term hire and long-term leasing options for industrial and commercial use.',
    
    'services.repair.title': 'Engine Repair & Spare Parts',
    'services.repair.description': 'Genuine Lister Petter parts sourcing and mechanical overhaul services. OEM parts, diagnostic services, and engine rebuilds.',
    
    'services.installation.title': 'Installation & Commissioning',
    'services.installation.description': 'Site surveys, electrical integration, and professional handover. Complete installation with testing and documentation.',
    
    'services.maintenance.title': 'Preventative Maintenance',
    'services.maintenance.description': 'Scheduled site visits, testing, and maintenance contracts. Custom schedules, oil analysis, and performance reports.',
    
    'services.emergency.title': 'Emergency Breakdown Support',
    'services.emergency.description': 'Rapid response for critical plant outages – 24/7 availability. Same-day response and temporary power solutions.',
    
    'services.consultation.title': 'Consultation & Energy Audits',
    'services.consultation.description': 'Technical advice to improve uptime and efficiency. Load analysis, fuel optimization, and equipment recommendations.',
    
    // Products
    'products.title': 'Spare Parts Catalog',
    'products.subtitle': 'Genuine OEM spare parts for Lister Petter and other leading engine brands',
    'products.viewAll': 'View All Parts',
    'products.requestQuote': 'Request Quote',
    'products.inStock': 'In Stock',
    'products.lowStock': 'Low Stock',
    'products.outOfStock': 'Out of Stock',
    'products.filter': 'Filter by Category',
    'products.all': 'All Parts',
    
    // Why Choose Us
    'whyUs.title': 'Why Choose Wings Engineering',
    'whyUs.subtitle': 'Your trusted partner for power solutions in East Africa',
    
    'whyUs.local.title': 'Local Thika Team',
    'whyUs.local.description': 'Hands-on technical experience with rapid on-site response across Nairobi County',
    
    'whyUs.verified.title': 'Verified Legal Presence',
    'whyUs.verified.description': 'Company listings and court record transparency – trusted and established',
    
    'whyUs.genuine.title': 'Genuine Spare Parts',
    'whyUs.genuine.description': 'Lister Petter specialist – only OEM parts with full warranty coverage',
    
    'whyUs.support.title': '24/7 Support',
    'whyUs.support.description': 'Emergency breakdown response and preventative maintenance packages',
    
    // Portfolio
    'portfolio.title': 'Our Projects',
    'portfolio.subtitle': 'Successful installations and services across East Africa',
    'portfolio.viewDetails': 'View Details',
    
    // Testimonials
    'testimonials.title': 'What Our Clients Say',
    'testimonials.subtitle': 'Trusted by businesses across Kenya',
    
    // Contact
    'contact.title': 'Get in Touch',
    'contact.subtitle': 'We\'re here to help with all your engineering needs',
    'contact.form.name': 'Full Name',
    'contact.form.email': 'Email Address',
    'contact.form.phone': 'Phone Number',
    'contact.form.company': 'Company (Optional)',
    'contact.form.requestType': 'Request Type',
    'contact.form.requestType.quote': 'Quote Request',
    'contact.form.requestType.service': 'Service Booking',
    'contact.form.requestType.parts': 'Parts Inquiry',
    'contact.form.requestType.general': 'General Inquiry',
    'contact.form.product': 'Product/Service Interest',
    'contact.form.message': 'Your Message',
    'contact.form.submit': 'Send Inquiry',
    'contact.form.submitting': 'Sending...',
    'contact.form.success': 'Thank you! We\'ll respond within 24 hours.',
    'contact.form.error': 'Submission failed. Please try again or contact us directly.',
    
    'contact.info.title': 'Contact Information',
    'contact.info.address': 'P.O. Box 4529-01002 Madaraka, Thika, Kenya',
    'contact.info.phone': '+254 718 234 222',
    'contact.info.email': 'sales@wingsengineeringservices.com',
    'contact.info.hours': 'Monday-Friday 8AM-6PM, Saturday 9AM-2PM',
    'contact.info.whatsapp': 'Chat on WhatsApp',
    
    // Footer
    'footer.tagline': 'Powering East Africa\'s Industry',
    'footer.description': 'Your trusted partner for generators, engines, and industrial power solutions across Kenya.',
    'footer.quickLinks': 'Quick Links',
    'footer.contact': 'Contact',
    'footer.privacy': 'Privacy Policy',
    'footer.terms': 'Terms of Service',
    'footer.copyright': '© 2026 Wings Engineering Services Ltd. All rights reserved.',
    'footer.madeIn': 'Built with ❤️ in Kenya',
    
    // Modals
    'modal.quote.title': 'Request a Quote',
    'modal.quote.product': 'Product/Service',
    'modal.quote.quantity': 'Quantity',
    'modal.quote.location': 'Delivery Location',
    'modal.quote.requirements': 'Additional Requirements',
    'modal.quote.submit': 'Submit Quote Request',
    'modal.quote.success': 'Quote request submitted! We\'ll send a detailed quote within 48 hours.',
    
    'modal.booking.title': 'Book a Service Appointment',
    'modal.booking.equipment': 'Equipment Type',
    'modal.booking.brand': 'Brand/Model',
    'modal.booking.issue': 'Issue Description',
    'modal.booking.urgency': 'Urgency',
    'modal.booking.urgency.emergency': 'Emergency (24h)',
    'modal.booking.urgency.urgent': 'Urgent (3 days)',
    'modal.booking.urgency.standard': 'Standard (1 week)',
    'modal.booking.date': 'Preferred Date',
    'modal.booking.time': 'Preferred Time',
    'modal.booking.submit': 'Submit Booking Request',
    'modal.booking.success': 'Booking request submitted! Our team will confirm within 2 hours.',
    
    // WhatsApp
    'whatsapp.tooltip': 'Chat with us on WhatsApp',
    'whatsapp.prefilledMessage': 'Hello Wings Engineering, I need assistance with...',
  },
  sw: {
    // Navigation
    'nav.home': 'Nyumbani',
    'nav.products': 'Bidhaa',
    'nav.services': 'Huduma',
    'nav.portfolio': 'Miradi',
    'nav.contact': 'Wasiliana',
    'nav.about': 'Kuhusu',
    
    // Hero
    'hero.headline': 'Wings Engineering Services Ltd',
    'hero.subheadline': 'Huduma za Uhandisi wa Umeme na Mitambo Thika',
    'hero.description': 'Jenereta • Injini • Vipuri • Usakinishaji • Matengenezo – suluhisho za kitaalamu kwa viwanda na biashara Thika na Nairobi',
    'hero.cta1': 'Pata Nukuu',
    'hero.cta2': 'Piga Simu',
    'hero.stat1': 'Miaka 15+',
    'hero.stat1Label': 'Uzoefu',
    'hero.stat2': '500+',
    'hero.stat2Label': 'Miradi Iliyokamilika',
    'hero.stat3': '24/7',
    'hero.stat3Label': 'Msaada wa Dharura',
    'hero.stat4': '100%',
    'hero.stat4Label': 'Vipuri Halisi',
    
    // Partners
    'partners.title': 'Tunaminika na Mashirika Makubwa',
    
    // About
    'about.title': 'Kuhusu Wings Engineering Services Ltd',
    'about.content': 'Wings Engineering Services Ltd ni kampuni ya uhandisi iliyoko Thika inayotoa suluhisho za uhandisi wa mitambo na umeme – kutoka mauzo ya jenereta na huduma, vipuri vya injini, hadi usakinishaji na matengenezo ya miradi. Tuko Thika na tunahudumia wateja wa viwanda na biashara kote Nairobi.',
    'about.content2': 'Timu yetu ya mafundi wenye uzoefu wanabobea katika injini za Lister Petter na jenereta, wakitoa vipuri halisi, usakinishaji wa kitaalamu, msaada wa dharura wa saa 24/7, mikataba ya matengenezo ya kuzuia, na suluhisho maalum za injini.',
    'about.feature1': 'Upataji wa Vipuri Halisi',
    'about.feature2': 'Usakinishaji wa Kitaalamu',
    'about.feature3': 'Msaada wa Dharura 24/7',
    'about.feature4': 'Mikataba ya Matengenezo',
    'about.feature5': 'Suluhisho Maalum za Injini',
    'about.feature6': 'Kituo cha Huduma cha Lister Petter',
    
    // Services
    'services.title': 'Huduma Zetu',
    'services.subtitle': 'Suluhisho kamili za uhandisi kwa mahitaji yako yote ya nguvu',
    'services.learnMore': 'Soma Zaidi',
    'services.bookService': 'Weka Huduma',
    
    'services.generator.title': 'Mauzo na Ukodishaji wa Jenereta',
    'services.generator.description': 'Jenereta mpya na zilizorekebishwa. Ukodishaji wa muda mfupi na mrefu kwa matumizi ya viwanda na biashara.',
    
    'services.repair.title': 'Ukarabati wa Injini na Vipuri',
    'services.repair.description': 'Upataji wa vipuri halisi vya Lister Petter na huduma za ukarabati. Vipuri vya OEM, huduma za uchunguzi, na ujenzi upya wa injini.',
    
    'services.installation.title': 'Usakinishaji na Uwekaji',
    'services.installation.description': 'Uchunguzi wa tovuti, ujumuishaji wa umeme, na ukabidhi wa kitaalamu. Usakinishaji kamili na upimaji na nyaraka.',
    
    'services.maintenance.title': 'Matengenezo ya Kuzuia',
    'services.maintenance.description': 'Ziara za tovuti zilizopangwa, upimaji, na mikataba ya matengenezo. Ratiba maalum, uchambuzi wa mafuta, na ripoti za utendaji.',
    
    'services.emergency.title': 'Msaada wa Dharura',
    'services.emergency.description': 'Majibu ya haraka kwa kushindwa kwa mimea muhimu – upatikanaji wa saa 24/7. Majibu ya siku moja na suluhisho za nguvu za muda.',
    
    'services.consultation.title': 'Ushauri na Ukaguzi wa Nishati',
    'services.consultation.description': 'Ushauri wa kitaalamu ili kuboresha wakati wa kufanya kazi na ufanisi. Uchambuzi wa mzigo, uboreshaji wa mafuta, na mapendekezo ya vifaa.',
    
    // Products
    'products.title': 'Orodha ya Vipuri',
    'products.subtitle': 'Vipuri halisi vya OEM kwa Lister Petter na chapa nyingine za injini',
    'products.viewAll': 'Angalia Vipuri Vyote',
    'products.requestQuote': 'Omba Nukuu',
    'products.inStock': 'Inapatikana',
    'products.lowStock': 'Hisa Chache',
    'products.outOfStock': 'Hakuna Hisa',
    'products.filter': 'Chuja kwa Kategoria',
    'products.all': 'Vipuri Vyote',
    
    // Why Choose Us
    'whyUs.title': 'Kwa Nini Uchague Wings Engineering',
    'whyUs.subtitle': 'Mshirika wako wa kuaminika kwa suluhisho za nguvu Afrika Mashariki',
    
    'whyUs.local.title': 'Timu ya Thika',
    'whyUs.local.description': 'Uzoefu wa vitendo na majibu ya haraka kote Nairobi',
    
    'whyUs.verified.title': 'Uwepo wa Kisheria Uliothibitishwa',
    'whyUs.verified.description': 'Orodha za kampuni na uwazi wa rekodi za mahakama – inayoaminika',
    
    'whyUs.genuine.title': 'Vipuri Halisi',
    'whyUs.genuine.description': 'Mtaalamu wa Lister Petter – vipuri vya OEM pekee na dhamana kamili',
    
    'whyUs.support.title': 'Msaada 24/7',
    'whyUs.support.description': 'Majibu ya dharura na vifurushi vya matengenezo ya kuzuia',
    
    // Portfolio
    'portfolio.title': 'Miradi Yetu',
    'portfolio.subtitle': 'Usakinishaji na huduma zilizofanikiwa kote Afrika Mashariki',
    'portfolio.viewDetails': 'Angalia Maelezo',
    
    // Testimonials
    'testimonials.title': 'Maoni ya Wateja Wetu',
    'testimonials.subtitle': 'Tunaaminiwa na biashara kote Kenya',
    
    // Contact
    'contact.title': 'Wasiliana Nasi',
    'contact.subtitle': 'Tuko hapa kusaidia na mahitaji yako yote ya uhandisi',
    'contact.form.name': 'Jina Kamili',
    'contact.form.email': 'Anwani ya Barua Pepe',
    'contact.form.phone': 'Nambari ya Simu',
    'contact.form.company': 'Kampuni (Hiari)',
    'contact.form.requestType': 'Aina ya Ombi',
    'contact.form.requestType.quote': 'Ombi la Nukuu',
    'contact.form.requestType.service': 'Uhifadhi wa Huduma',
    'contact.form.requestType.parts': 'Uchunguzi wa Vipuri',
    'contact.form.requestType.general': 'Uchunguzi wa Jumla',
    'contact.form.product': 'Bidhaa/Huduma Inayovutia',
    'contact.form.message': 'Ujumbe Wako',
    'contact.form.submit': 'Tuma Ombi',
    'contact.form.submitting': 'Inatuma...',
    'contact.form.success': 'Asante! Tutajibu ndani ya masaa 24.',
    'contact.form.error': 'Uwasilishaji umeshindwa. Tafadhali jaribu tena au wasiliana nasi moja kwa moja.',
    
    'contact.info.title': 'Maelezo ya Mawasiliano',
    'contact.info.address': 'S.L.P. 4529-01002 Madaraka, Thika, Kenya',
    'contact.info.phone': '+254 718 234 222',
    'contact.info.email': 'sales@wingsengineeringservices.com',
    'contact.info.hours': 'Jumatatu-Ijumaa 8AM-6PM, Jumamosi 9AM-2PM',
    'contact.info.whatsapp': 'Ongea WhatsApp',
    
    // Footer
    'footer.tagline': 'Kuendesha Viwanda vya Afrika Mashariki',
    'footer.description': 'Mshirika wako wa kuaminika kwa jenereta, injini, na suluhisho za nguvu za viwanda kote Kenya.',
    'footer.quickLinks': 'Viungo vya Haraka',
    'footer.contact': 'Mawasiliano',
    'footer.privacy': 'Sera ya Faragha',
    'footer.terms': 'Masharti ya Huduma',
    'footer.copyright': '© 2026 Wings Engineering Services Ltd. Haki zote zimehifadhiwa.',
    'footer.madeIn': 'Imejengwa kwa ❤️ Kenya',
    
    // Modals
    'modal.quote.title': 'Omba Nukuu',
    'modal.quote.product': 'Bidhaa/Huduma',
    'modal.quote.quantity': 'Idadi',
    'modal.quote.location': 'Mahali pa Utoaji',
    'modal.quote.requirements': 'Mahitaji ya Ziada',
    'modal.quote.submit': 'Wasilisha Ombi la Nukuu',
    'modal.quote.success': 'Ombi la nukuu limewasilishwa! Tutatuma nukuu ya kina ndani ya masaa 48.',
    
    'modal.booking.title': 'Weka Miadi ya Huduma',
    'modal.booking.equipment': 'Aina ya Vifaa',
    'modal.booking.brand': 'Chapa/Modeli',
    'modal.booking.issue': 'Maelezo ya Tatizo',
    'modal.booking.urgency': 'Dharura',
    'modal.booking.urgency.emergency': 'Dharura (24h)',
    'modal.booking.urgency.urgent': 'Haraka (siku 3)',
    'modal.booking.urgency.standard': 'Kawaida (wiki 1)',
    'modal.booking.date': 'Tarehe Inayopendelewa',
    'modal.booking.time': 'Wakati Unaopendelewa',
    'modal.booking.submit': 'Wasilisha Ombi la Uhifadhi',
    'modal.booking.success': 'Ombi la uhifadhi limewasilishwa! Timu yetu itathibitisha ndani ya masaa 2.',
    
    // WhatsApp
    'whatsapp.tooltip': 'Ongea nasi WhatsApp',
    'whatsapp.prefilledMessage': 'Habari Wings Engineering, nahitaji msaada na...',
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string): string => {
    const langTranslations = translations[language];
    return (langTranslations as Record<string, string>)[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
