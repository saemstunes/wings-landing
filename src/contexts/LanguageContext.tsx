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
    
    // Hero
    'hero.headline': 'Wings Engineering Services Ltd – Reliable Mechanical & Electrical Engineering in Thika',
    'hero.subheadline': 'Generators • Engines • Spare Parts • Installation • Maintenance',
    'hero.cta.quote': 'Get a Quote',
    'hero.cta.call': 'Call +254 718 234 222',
    'hero.stats.experience': '15+ Years Experience',
    'hero.stats.projects': '500+ Projects Completed',
    'hero.stats.support': '24/7 Emergency Support',
    'hero.stats.parts': '100% Genuine Parts',
    
    // Partners
    'partners.title': 'Trusted by Leading Organizations',
    
    // About
    'about.title': 'About Wings Engineering Services Ltd',
    'about.content': 'Wings Engineering Services Ltd is a Thika-based engineering firm providing mechanical and electrical engineering solutions – from generator sales and servicing, engine spare parts, to installation and project maintenance. With a local presence in Thika, we serve industrial and commercial clients throughout Nairobi County.',
    'about.features.experience': '15+ Years Experience',
    'about.features.parts': 'Genuine Spare Parts',
    'about.features.support': '24/7 Emergency Support',
    'about.features.specialist': 'Lister Petter Specialist',
    'about.trust.legal': 'Verified Legal Presence: Environment & Land Court Records 2019-2020',
    'about.trust.certified': 'Certified Lister Petter Service Center',
    'about.trust.local': 'Local Kenyan Business - Serving East Africa',
    
    // Services
    'services.title': 'Our Services',
    'services.sales.name': 'Generator Sales & Hire',
    'services.sales.description': 'New and refurbished diesel generators. Short-term hire and long-term leasing options.',
    'services.repair.name': 'Engine Repair & Spare Parts',
    'services.repair.description': 'Genuine Lister Petter parts sourcing and mechanical overhaul services.',
    'services.installation.name': 'Installation & Commissioning',
    'services.installation.description': 'Site surveys, electrical integration, and handover.',
    'services.maintenance.name': 'Preventative Maintenance',
    'services.maintenance.description': 'Scheduled site visits, testing, and maintenance contracts.',
    'services.emergency.name': 'Emergency Breakdown Support',
    'services.emergency.description': 'Rapid response for critical plant outages – 24/7 availability.',
    'services.consultation.name': 'Consultation & Energy Audits',
    'services.consultation.description': 'Technical advice to improve uptime and efficiency.',
    'services.cta.learn': 'Learn More',
    'services.cta.book': 'Book Service',
    
    // Products
    'products.title': 'Featured Products',
    'products.viewAll': 'View All Products',
    'products.filter.all': 'All',
    'products.filter.generators': 'Generators',
    'products.filter.engines': 'Engines',
    'products.filter.parts': 'Parts',
    'products.specs.power': 'Power',
    'products.specs.engine': 'Engine',
    'products.specs.fuel': 'Fuel Type',
    'products.specs.voltage': 'Voltage',
    'products.cta.details': 'View Details',
    'products.cta.quote': 'Request Quote',
    'products.cta.whatsapp': 'Chat on WhatsApp',
    
    // Why Choose Us
    'why.title': 'Why Choose Wings Engineering',
    'why.local.title': 'Local Thika Team',
    'why.local.description': 'Hands-on technical experience with rapid on-site response',
    'why.legal.title': 'Verified Legal Presence',
    'why.legal.description': 'Company listings and court record transparency',
    'why.parts.title': 'Genuine Spare Parts',
    'why.parts.description': 'Lister Petter specialist - OEM parts only',
    'why.support.title': '24/7 Support',
    'why.support.description': 'Emergency breakdown response and preventative maintenance packages',
    
    // Portfolio
    'portfolio.title': 'Our Projects',
    'portfolio.project1.title': 'Nairobi Hospital Backup Generator Installation',
    'portfolio.project1.client': 'Major Nairobi Hospital',
    'portfolio.project1.description': '500kVA Lister Petter Genset installation with 3-day completion timeline',
    'portfolio.project2.title': 'Industrial Plant Emergency Repair',
    'portfolio.project2.client': 'Manufacturing Facility, Thika',
    'portfolio.project2.description': 'Same-day emergency diesel engine repair restoring production within 8 hours',
    'portfolio.project3.title': 'University Campus Generator Rental',
    'portfolio.project3.client': 'Local University',
    'portfolio.project3.description': '100kVA generator rental for campus event with full fuel service',
    'portfolio.cta.view': 'View Details',
    
    // Testimonials
    'testimonials.title': 'What Our Clients Say',
    'testimonials.1.quote': '"Wings Engineering provided exceptional service during our emergency generator failure. Their technician arrived within 2 hours and had us back online the same day. Highly professional!"',
    'testimonials.1.name': 'John Kamau',
    'testimonials.1.role': 'Facilities Manager, Thika Manufacturing Ltd.',
    'testimonials.2.quote': '"Reliable service and genuine parts. We\'ve been using their maintenance contract for 3 years with zero downtime. Trustworthy and professional."',
    'testimonials.2.name': 'Sarah Mwangi',
    'testimonials.2.role': 'Operations Director, Nairobi Logistics',
    'testimonials.3.quote': '"The team handled our 500kVA installation perfectly. From site survey to commissioning, everything was professional and on schedule."',
    'testimonials.3.name': 'David Omondi',
    'testimonials.3.role': 'Project Engineer, Industrial Plant',
    
    // Contact
    'contact.title': 'Get in Touch',
    'contact.form.name': 'Name',
    'contact.form.email': 'Email',
    'contact.form.phone': 'Phone',
    'contact.form.company': 'Company',
    'contact.form.type': 'Request Type',
    'contact.form.type.quote': 'Quote',
    'contact.form.type.service': 'Service Booking',
    'contact.form.type.parts': 'Parts Inquiry',
    'contact.form.type.general': 'General',
    'contact.form.product': 'Product/Service Interest',
    'contact.form.message': 'Message',
    'contact.form.contact': 'Preferred Contact Method',
    'contact.form.contact.phone': 'Phone',
    'contact.form.contact.email': 'Email',
    'contact.form.contact.whatsapp': 'WhatsApp',
    'contact.form.submit': 'Send Inquiry',
    'contact.info.title': 'Contact Information',
    'contact.info.address': 'P.O. Box 4529-01002 Madaraka, Thika, Kenya',
    'contact.info.phone': '+254 718 234 222',
    'contact.info.email': 'sales@wingsengineeringservices.com',
    'contact.info.hours.title': 'Business Hours',
    'contact.info.hours.weekdays': 'Monday-Friday 8AM-6PM',
    'contact.info.hours.saturday': 'Saturday 9AM-2PM',
    'contact.info.hours.sunday': 'Sunday Closed',
    'contact.success': 'Thank you! We\'ll respond within 24 hours.',
    'contact.error': 'Please fill in all required fields correctly.',
    
    // Footer
    'footer.tagline': 'Powering East Africa\'s Industry',
    'footer.description': 'Your trusted partner for generators, engines, and industrial power solutions across Kenya.',
    'footer.quicklinks': 'Quick Links',
    'footer.contact': 'Contact',
    'footer.privacy': 'Privacy Policy',
    'footer.terms': 'Terms of Service',
    'footer.copyright': '© 2026 Wings Engineering Services Ltd. All rights reserved.',
    'footer.built': 'Built with ❤️ in Kenya',
    
    // Modals
    'modal.quote.title': 'Request a Quote',
    'modal.quote.quantity': 'Quantity',
    'modal.quote.location': 'Delivery Location',
    'modal.quote.requirements': 'Additional Requirements',
    'modal.quote.budget': 'Budget Range',
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
    'modal.booking.submit': 'Book Appointment',
    'modal.booking.success': 'Booking request submitted! Our team will confirm within 2 hours.',
    'modal.close': 'Close',
    
    // WhatsApp
    'whatsapp.message': 'Hello Wings Engineering, I need assistance with...',
    
    // Validation
    'validation.required': 'This field is required',
    'validation.email': 'Please enter a valid email address',
    'validation.phone': 'Please enter a valid Kenyan phone number',
    'validation.minLength': 'Must be at least {length} characters',
  },
  sw: {
    // Navigation
    'nav.home': 'Nyumbani',
    'nav.products': 'Bidhaa',
    'nav.services': 'Huduma',
    'nav.portfolio': 'Miradi',
    'nav.contact': 'Wasiliana',
    'nav.language': 'Lugha',
    
    // Hero
    'hero.headline': 'Wings Engineering Services Ltd – Huduma za Uhandisi wa Umeme na Mitambo Thika',
    'hero.subheadline': 'Jenereta • Injini • Vipuri • Usakinishaji • Matengenezo',
    'hero.cta.quote': 'Pata Nukuu',
    'hero.cta.call': 'Piga +254 718 234 222',
    'hero.stats.experience': 'Uzoefu wa Zaidi ya Miaka 15',
    'hero.stats.projects': 'Miradi 500+ Imekamilika',
    'hero.stats.support': 'Usaidizi wa Dharura 24/7',
    'hero.stats.parts': 'Vipuri Halisi 100%',
    
    // Partners
    'partners.title': 'Tunaminika na Mashirika Makubwa',
    
    // About
    'about.title': 'Kuhusu Wings Engineering Services Ltd',
    'about.content': 'Wings Engineering Services Ltd ni kampuni ya uhandisi yenye makao yake Thika inayotoa ufumbuzi wa uhandisi wa mitambo na umeme – kutoka mauzo ya jenereta na huduma, vipuri vya injini, hadi usakinishaji na matengenezo ya miradi. Kwa uwepo wa ndani Thika, tunahudumia wateja wa viwanda na biashara katika Kaunti yote ya Nairobi.',
    'about.features.experience': 'Uzoefu wa Zaidi ya Miaka 15',
    'about.features.parts': 'Vipuri Halisi',
    'about.features.support': 'Usaidizi wa Dharura 24/7',
    'about.features.specialist': 'Mtaalamu wa Lister Petter',
    'about.trust.legal': 'Uwepo wa Kisheria Uliohakikiwa: Rekodi za Mahakama ya Mazingira na Ardhi 2019-2020',
    'about.trust.certified': 'Kituo cha Huduma Kilichothibitishwa cha Lister Petter',
    'about.trust.local': 'Biashara ya Kenya ya Ndani - Kuhudumia Afrika Mashariki',
    
    // Services
    'services.title': 'Huduma Zetu',
    'services.sales.name': 'Mauzo ya Jenereta na Kukodisha',
    'services.sales.description': 'Jenereta mpya za dizeli na zilizorekebishwa. Chaguo la kukodisha muda mfupi na muda mrefu.',
    'services.repair.name': 'Matengenezo ya Injini na Vipuri',
    'services.repair.description': 'Usambazaji wa vipuri halisi vya Lister Petter na huduma za ukarabati wa mitambo.',
    'services.installation.name': 'Usakinishaji na Kuanzishwa',
    'services.installation.description': 'Uchunguzi wa tovuti, uunganishaji wa umeme, na mkabala.',
    'services.maintenance.name': 'Matengenezo ya Kuzuia',
    'services.maintenance.description': 'Ziara zilizopangwa tovuti, upimaji, na mikataba ya matengenezo.',
    'services.emergency.name': 'Usaidizi wa Dharura wa Kuvunjika',
    'services.emergency.description': 'Jibu la haraka kwa kukatika kwa umeme muhimu – upatikanaji 24/7.',
    'services.consultation.name': 'Ushauri na Ukaguzi wa Nishati',
    'services.consultation.description': 'Ushauri wa kiufundi wa kuboresha wakati wa uendeshaji na ufanisi.',
    'services.cta.learn': 'Jifunze Zaidi',
    'services.cta.book': 'Huduma ya Kitabu',
    
    // Products
    'products.title': 'Bidhaa Maarufu',
    'products.viewAll': 'Tazama Bidhaa Zote',
    'products.filter.all': 'Zote',
    'products.filter.generators': 'Jenereta',
    'products.filter.engines': 'Injini',
    'products.filter.parts': 'Vipuri',
    'products.specs.power': 'Nguvu',
    'products.specs.engine': 'Injini',
    'products.specs.fuel': 'Aina ya Mafuta',
    'products.specs.voltage': 'Voltage',
    'products.cta.details': 'Tazama Maelezo',
    'products.cta.quote': 'Omba Nukuu',
    'products.cta.whatsapp': 'Piga Simu kwa WhatsApp',
    
    // Why Choose Us
    'why.title': 'Kwa Nini Kuchagua Wings Engineering',
    'why.local.title': 'Timu ya Ndani ya Thika',
    'why.local.description': 'Uzoefu wa kiufundi wa vitendo na jibu la haraka kwenye tovuti',
    'why.legal.title': 'Uwepo wa Kisheria Uliohakikiwa',
    'why.legal.description': 'Orodha ya kampuni na uwazi wa rekodi za mahakama',
    'why.parts.title': 'Vipuri Halisi',
    'why.parts.description': 'Mtaalamu wa Lister Petter - Vipuri vya OEM pekee',
    'why.support.title': 'Usaidizi 24/7',
    'why.support.description': 'Jibu la dharura la kuvunjika na vifurushi vya matengenezo ya kuzuia',
    
    // Portfolio
    'portfolio.title': 'Miradi Yetu',
    'portfolio.project1.title': 'Usakinishaji wa Jenereta ya Backup ya Hospitali ya Nairobi',
    'portfolio.project1.client': 'Hospitali Kuu ya Nairobi',
    'portfolio.project1.description': 'Usakinishaji wa Jenereta ya Lister Petter ya 500kVA na muda wa ukamilifu wa siku 3',
    'portfolio.project2.title': 'Matengenezo ya Dharura ya Kiwanda cha Viwanda',
    'portfolio.project2.client': 'Kiwanda cha Uzalishaji, Thika',
    'portfolio.project2.description': 'Matengenezo ya dharura ya injini ya dizeli ya siku moja kurejesha uzalishaji ndani ya masaa 8',
    'portfolio.project3.title': 'Ukodishaji wa Jenereta ya Chuo Kikuu',
    'portfolio.project3.client': 'Chuo Kikuu cha Ndani',
    'portfolio.project3.description': 'Ukodishaji wa jenereta ya 100kVA kwa hafla ya chuo kikuu na huduma kamili ya mafuta',
    'portfolio.cta.view': 'Tazama Maelezo',
    
    // Testimonials
    'testimonials.title': 'Wateja Wetu Wanasema Nini',
    'testimonials.1.quote': '"Wings Engineering ilitoa huduma bora wakati wa kushindwa kwa jenereta yetu ya dharura. Mhandisi wao alifika ndani ya masaa 2 na tukarudishwa mtandaoni siku hiyo hiyo. Kitaalamu sana!"',
    'testimonials.1.name': 'John Kamau',
    'testimonials.1.role': 'Meneja wa Vifaa, Thika Manufacturing Ltd.',
    'testimonials.2.quote': '"Huduma ya kuaminika na vipuri halisi. Tumekuwa tukitumia mkataba wao wa matengenezo kwa miaka 3 bila muda wowote wa kusimamishwa. Waaminifu na kitaalamu."',
    'testimonials.2.name': 'Sarah Mwangi',
    'testimonials.2.role': 'Mkurugenzi wa Uendeshaji, Nairobi Logistics',
    'testimonials.3.quote': '"Timu ilishughulikia usakinishaji wetu wa 500kVA kikamilifu. Kutoka uchunguzi wa tovuti hadi kuanzishwa, kila kitu kilikuwa kitaalamu na kwenye ratiba."',
    'testimonials.3.name': 'David Omondi',
    'testimonials.3.role': 'Mhandisi wa Mradi, Kiwanda cha Viwanda',
    
    // Contact
    'contact.title': 'Wasiliana Nasi',
    'contact.form.name': 'Jina',
    'contact.form.email': 'Barua Pepe',
    'contact.form.phone': 'Simu',
    'contact.form.company': 'Kampuni',
    'contact.form.type': 'Aina ya Ombi',
    'contact.form.type.quote': 'Nukuu',
    'contact.form.type.service': 'Kuhudumia Kitabu',
    'contact.form.type.parts': 'Uchunguzi wa Vipuri',
    'contact.form.type.general': 'Jumla',
    'contact.form.product': 'Bidhaa/Huduma ya Kupendeza',
    'contact.form.message': 'Ujumbe',
    'contact.form.contact': 'Njia ya Mawasiliano Iliyopendekezwa',
    'contact.form.contact.phone': 'Simu',
    'contact.form.contact.email': 'Barua Pepe',
    'contact.form.contact.whatsapp': 'WhatsApp',
    'contact.form.submit': 'Tuma Ombi',
    'contact.info.title': 'Taarifa za Mawasiliano',
    'contact.info.address': 'S.L.P 4529-01002 Madaraka, Thika, Kenya',
    'contact.info.phone': '+254 718 234 222',
    'contact.info.email': 'sales@wingsengineeringservices.com',
    'contact.info.hours.title': 'Saa za Biashara',
    'contact.info.hours.weekdays': 'Jumatatu-Ijumaa 8AM-6PM',
    'contact.info.hours.saturday': 'Jumamosi 9AM-2PM',
    'contact.info.hours.sunday': 'Jumapili Imefungwa',
    'contact.success': 'Asante! Tutajibu ndani ya masaa 24.',
    'contact.error': 'Tafadhali jaza sehemu zote zinazohitajika kwa usahihi.',
    
    // Footer
    'footer.tagline': 'Kuweka Nguvu ya Viwanda ya Afrika Mashariki',
    'footer.description': 'Mshirika wako wa kuaminika kwa jenereta, injini, na ufumbuzi wa nguvu ya viwanda nchini Kenya.',
    'footer.quicklinks': 'Viungo vya Haraka',
    'footer.contact': 'Mawasiliano',
    'footer.privacy': 'Sera ya Faragha',
    'footer.terms': 'Sheria na Masharti',
    'footer.copyright': '© 2026 Wings Engineering Services Ltd. Haki zote zimehifadhiwa.',
    'footer.built': 'Imejengwa kwa ❤️ nchini Kenya',
    
    // Modals
    'modal.quote.title': 'Omba Nukuu',
    'modal.quote.quantity': 'Kiasi',
    'modal.quote.location': 'Mahali Pa Kufikishia',
    'modal.quote.requirements': 'Mahitaji ya Ziada',
    'modal.quote.budget': 'Aina ya Bajeti',
    'modal.quote.submit': 'Wasilisha Ombi la Nukuu',
    'modal.quote.success': 'Ombi la nukuu limewasilishwa! Tutatuma nukuu ya kina ndani ya masaa 48.',
    'modal.booking.title': 'Huduma ya Kitabu cha Mkutano',
    'modal.booking.equipment': 'Aina ya Vifaa',
    'modal.booking.brand': 'Chapa/Modeli',
    'modal.booking.issue': 'Maelezo ya Tatizo',
    'modal.booking.urgency': 'Uharaka',
    'modal.booking.urgency.emergency': 'Dharura (24h)',
    'modal.booking.urgency.urgent': 'Haraka (siku 3)',
    'modal.booking.urgency.standard': 'Kawaida (wiki 1)',
    'modal.booking.date': 'Tarehe Iliyopendekezwa',
    'modal.booking.time': 'Muda Ulio Pendekezwa',
    'modal.booking.submit': 'Kitabu cha Mkutano',
    'modal.booking.success': 'Ombi la kuhudumia kitabu limewasilishwa! Timu yetu itathibitisha ndani ya masaa 2.',
    'modal.close': 'Funga',
    
    // WhatsApp
    'whatsapp.message': 'Habari Wings Engineering, Nahitaji usaidizi kuhusu...',
    
    // Validation
    'validation.required': 'Sehemu hii inahitajika',
    'validation.email': 'Tafadhali ingiza anwani halali ya barua pepe',
    'validation.phone': 'Tafadhali ingiza nambari halali ya simu ya Kenya',
    'validation.minLength': 'Lazima iwe angalau {length} herufi',
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
        return key // Fallback to key if translation not found
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