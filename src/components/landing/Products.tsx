// src/contexts/LanguageContext.tsx
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

type Language = 'en' | 'sw';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

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
    'hero.description': 'Your trusted partner for generators, engines, and industrial power solutions across Kenya.',
    'hero.cta1': 'Get a Quote',
    'hero.cta2': 'Call +254 718 234 222',
    'hero.stat1': '15+',
    'hero.stat1Label': 'Years Experience',
    'hero.stat2': '500+',
    'hero.stat2Label': 'Projects Completed',
    'hero.stat3': '24/7',
    'hero.stat3Label': 'Emergency Support',
    'hero.stat4': '100%',
    'hero.stat4Label': 'Genuine Parts',
    
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
    'categories.partsCount': '{count}+ parts',
    
    // Products
    'products.title': 'Popular Spare Parts',
    'products.subtitle': 'In stock and ready to ship',
    'products.searchPlaceholder': 'Search by part name, number, or engine model...',
    'products.filterAll': 'All Parts',
    'products.filterFilters': 'Filters',
    'products.filterGasketsSeals': 'Gaskets & Seals',
    'products.filterBearings': 'Bearings',
    'products.filterBeltsHoses': 'Belts & Hoses',
    'products.filterElectrical': 'Electrical',
    'products.filterFuelSystem': 'Fuel System',
    'products.filterCoolingSystem': 'Cooling System',
    'products.filterEngineParts': 'Engine Parts',
    'products.inStock': 'In Stock',
    'products.lowStock': 'Low Stock',
    'products.outOfStock': 'Out of Stock',
    'products.availableSoon': 'Available Soon',
    'products.requestQuote': 'Request Quote',
    'products.viewAll': 'View All Parts',
    'products.contactForPrice': 'Contact for price',
    'products.partNumber': 'Part #',
    'products.details': 'Details',
    
    // Product Descriptions
    'products.desc.oilFilter': 'Genuine Lister Petter oil filter for LPW/LPWS series engines. High-quality filtration for optimal engine protection.',
    'products.desc.fuelFilter': 'Genuine fuel filter element for Lister Petter engines. Removes water and contaminants from diesel fuel.',
    'products.desc.airFilter': 'Heavy-duty air filter for dusty operating environments. Extended service life with high dust-holding capacity.',
    'products.desc.cylinderHeadGasket': 'Complete cylinder head gasket set for 3-cylinder Lister Petter engines. Includes all seals and O-rings.',
    'products.desc.mainBearing': 'Standard size main bearing set for 4-cylinder Lister Petter engines. Precision-engineered for optimal fit.',
    'products.desc.connectingRodBearing': 'Connecting rod bearing set for Lister Petter engines. High-performance bearings for reliable operation.',
    'products.desc.alternatorBelt': 'Heavy-duty alternator V-belt for Lister Petter engines. Oil and heat resistant for long service life.',
    'products.desc.radiatorHose': 'Complete radiator hose kit including upper, lower, and bypass hoses. Silicone reinforced for durability.',
    
    // Compatibility Checker
    'compatibility.title': 'Find Parts for Your Engine',
    'compatibility.subtitle': 'Select your engine model to see compatible parts',
    'compatibility.engineBrand': 'Engine Brand',
    'compatibility.selectBrand': 'Select Brand...',
    'compatibility.engineModel': 'Engine Model',
    'compatibility.engineModelPlaceholder': 'e.g., LPW2, LPW3, LPW4',
    'compatibility.engineModelHelp': 'Not sure? Check the engine nameplate or contact us',
    'compatibility.partType': 'Part Type (Optional)',
    'compatibility.allParts': 'All Parts',
    'compatibility.findParts': 'Find Compatible Parts',
    'compatibility.showingResults': 'Showing {count} parts compatible with {model}',
    'compatibility.noResults': 'No compatible parts found for this model',
    'compatibility.brandListerPetter': 'Lister Petter',
    'compatibility.brandPerkins': 'Perkins',
    'compatibility.brandCAT': 'CAT',
    'compatibility.brandCummins': 'Cummins',
    'compatibility.brandOther': 'Other',
    
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
    'catalog.searchPlaceholder': 'Search parts...',
    'catalog.allCategories': 'All Categories',
    'catalog.allBrands': 'All Brands',
    'catalog.allItems': 'All Items',
    'catalog.sortByRelevance': 'Sort by: Relevance',
    'catalog.sortByPriceLow': 'Price: Low to High',
    'catalog.sortByPriceHigh': 'Price: High to Low',
    'catalog.sortByNameAZ': 'Name: A-Z',
    'catalog.sortByNewest': 'Newest First',
    'catalog.noPartsFound': 'No parts found',
    'catalog.tryAdjusting': 'Try adjusting your filters or search terms',
    'catalog.clearFilters': 'Clear all filters',
    'catalog.showingParts': 'Showing {start}-{end} of {total} parts',
    'catalog.inStockOnly': 'In Stock Only',
    'catalog.availableSoon': 'Available Soon',
    
    // Bulk Orders
    'bulkOrders.title': 'Bulk Orders & Fleet Accounts',
    'bulkOrders.description': 'Volume discounts for orders of 10+ parts',
    'bulkOrders.benefit1': 'Dedicated account manager for fleet operators',
    'bulkOrders.benefit2': 'Custom pricing for long-term contracts',
    'bulkOrders.benefit3': 'Priority shipping and handling',
    'bulkOrders.cta': 'Request Bulk Quote',
    
    // Parts Sourcing
    'partsSourcing.title': 'Parts Identification & Sourcing',
    'partsSourcing.description': 'Can\'t find your part? We can help',
    'partsSourcing.benefit1': 'Send us a photo for identification',
    'partsSourcing.benefit2': 'We source rare and discontinued parts',
    'partsSourcing.benefit3': 'Cross-reference service for aftermarket parts',
    'partsSourcing.cta': 'Get Help Finding Parts',
    
    // Testimonials
    'testimonials.title': 'What Our Clients Say',
    'testimonials.subtitle': 'Hear from our satisfied clients across East Africa',
    'testimonials.testimonial1': 'Wings Engineering provided exceptional service during our emergency generator failure. Their technician arrived within 2 hours and had us back online the same day. Highly professional and reliable!',
    'testimonials.testimonial1Name': 'John Kamau',
    'testimonials.testimonial1Role': 'Facilities Manager, Thika Manufacturing Ltd',
    'testimonials.testimonial2': 'We have been sourcing our Lister Petter spare parts from Wings Engineering for over 5 years. Their parts are always genuine, prices are competitive, and delivery is prompt. Excellent partner!',
    'testimonials.testimonial2Name': 'Mary Wanjiku',
    'testimonials.testimonial2Role': 'Procurement Officer, Nairobi Industrial Supplies',
    'testimonials.testimonial3': 'The installation team was professional and thorough. They completed our 200kVA generator installation ahead of schedule and provided comprehensive training for our staff. Highly recommend!',
    'testimonials.testimonial3Name': 'Peter Ochieng',
    'testimonials.testimonial3Role': 'Technical Director, Mombasa Port Authority',
    
    // Contact
    'contact.title': 'Get in Touch',
    'contact.subtitle': 'Get in touch with our team for quotes, service bookings, or technical support',
    'contact.form.submit': 'Send Inquiry',
    'contact.form.name': 'Name',
    'contact.form.email': 'Email',
    'contact.form.phone': 'Phone',
    'contact.form.company': 'Company',
    'contact.form.requestType': 'Request Type',
    'contact.form.requestTypeQuote': 'Quote',
    'contact.form.requestTypeService': 'Service Booking',
    'contact.form.requestTypeParts': 'Parts Inquiry',
    'contact.form.requestTypeGeneral': 'General',
    'contact.form.product': 'Product/Service Interest',
    'contact.form.message': 'Message',
    'contact.form.deliveryLocation': 'Delivery Location',
    'contact.form.deliveryPlaceholder': 'City, Area, or Full Address',
    'contact.form.additionalNotes': 'Additional Notes',
    'contact.form.notesPlaceholder': 'Any specific requirements, urgency, or questions...',
    'contact.info.title': 'Contact Information',
    'contact.info.address': 'P.O. Box 4529-01002 Madaraka, Thika, Kenya',
    'contact.info.phone': '+254 718 234 222',
    'contact.info.email': 'sales@wingsengineeringservices.com',
    'contact.info.hours': 'Mon-Fri: 8AM-6PM, Sat: 9AM-2PM',
    'contact.info.whatsapp': 'Chat on WhatsApp',
    'contact.success': 'Thank you! We\'ll respond within 2 hours.',
    'contact.error': 'Please fill in all required fields correctly.',
    
    // Quote Modal
    'quote.title': 'Request a Quote',
    'quote.description': 'Add parts to your quote request and we\'ll respond within 2 hours',
    'quote.partsTitle': 'Parts in Your Quote',
    'quote.noParts': 'No parts added yet. Browse our catalog and add parts to your quote.',
    'quote.totalItems': 'Total Items: {count}',
    'quote.continueBrowsing': 'Continue browsing parts',
    'quote.yourInformation': 'Your Information',
    'quote.fullName': 'Full Name',
    'quote.email': 'Email Address',
    'quote.phone': 'Phone Number',
    'quote.phonePlaceholder': '+2547XXXXXXXX',
    'quote.company': 'Company Name',
    'quote.submit': 'Submit Quote Request',
    'quote.responseTime': 'We\'ll respond with a detailed quote within 2 hours (business hours)',
    
    // Footer
    'footer.tagline': 'Powering East Africa\'s Industry',
    'footer.description': 'Your trusted partner for generators, engines, and industrial power solutions across Kenya.',
    'footer.quickLinks': 'Quick Links',
    'footer.contact': 'Contact',
    'footer.copyright': '© 2026 Wings Engineering Services Ltd. All rights reserved.',
    'footer.madeIn': 'Built with ❤️ in Kenya',
    
    // Search
    'search.title': 'Search Parts',
    'search.close': 'Close',
    
    // General
    'general.close': 'Close',
    'general.loading': 'Loading...',
    'general.error': 'Error',
    'general.success': 'Success',
    'general.yes': 'Yes',
    'general.no': 'No',
    'general.cancel': 'Cancel',
    'general.save': 'Save',
    'general.delete': 'Delete',
    'general.edit': 'Edit',
    'general.view': 'View',
    'general.add': 'Add',
    'general.remove': 'Remove',
    'general.quantity': 'Quantity',
    'general.price': 'Price',
    'general.total': 'Total',
    'general.subtotal': 'Subtotal',
    'general.tax': 'Tax',
    'general.discount': 'Discount',
    'general.shipping': 'Shipping',
    'general.free': 'Free',
    'general.paid': 'Paid',
    'general.pending': 'Pending',
    'general.completed': 'Completed',
    'general.failed': 'Failed',
    'general.refunded': 'Refunded',
    'general.currencyKES': 'KES',
    'general.currencyUSD': 'USD',
    'general.days': 'days',
    'general.hours': 'hours',
    'general.minutes': 'minutes',
    'general.seconds': 'seconds',
    'general.today': 'Today',
    'general.yesterday': 'Yesterday',
    'general.tomorrow': 'Tomorrow',
    'general.thisWeek': 'This Week',
    'general.lastWeek': 'Last Week',
    'general.nextWeek': 'Next Week',
    'general.thisMonth': 'This Month',
    'general.lastMonth': 'Last Month',
    'general.nextMonth': 'Next Month',
    'general.thisYear': 'This Year',
    'general.lastYear': 'Last Year',
    'general.nextYear': 'Next Year',
    'general.january': 'January',
    'general.february': 'February',
    'general.march': 'March',
    'general.april': 'April',
    'general.may': 'May',
    'general.june': 'June',
    'general.july': 'July',
    'general.august': 'August',
    'general.september': 'September',
    'general.october': 'October',
    'general.november': 'November',
    'general.december': 'December',
    'general.monday': 'Monday',
    'general.tuesday': 'Tuesday',
    'general.wednesday': 'Wednesday',
    'general.thursday': 'Thursday',
    'general.friday': 'Friday',
    'general.saturday': 'Saturday',
    'general.sunday': 'Sunday',
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
    'hero.description': 'Mshirika wako wa kuaminika kwa jenereta, injini, na ufumbuzi wa nguvu ya viwanda nchini Kenya.',
    'hero.cta1': 'Pata Nukuu',
    'hero.cta2': 'Piga +254 718 234 222',
    'hero.stat1': '15+',
    'hero.stat1Label': 'Miaka ya Uzoefu',
    'hero.stat2': '500+',
    'hero.stat2Label': 'Miradi Imekamilika',
    'hero.stat3': '24/7',
    'hero.stat3Label': 'Usaidizi wa Dharura',
    'hero.stat4': '100%',
    'hero.stat4Label': 'Vipuri Halisi',
    
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
    'categories.partsCount': 'Vipuri {count}+',
    
    // Products
    'products.title': 'Vipuri Maarufu',
    'products.subtitle': 'Vinapatikana na tayari kusafirishwa',
    'products.searchPlaceholder': 'Tafuta kwa jina la kipuri, nambari, au modeli ya injini...',
    'products.filterAll': 'Vipuri Vyote',
    'products.filterFilters': 'Vichujio',
    'products.filterGasketsSeals': 'Gasketi na Mihuri',
    'products.filterBearings': 'Bearings',
    'products.filterBeltsHoses': 'Mikanda na Mijeledi',
    'products.filterElectrical': 'Umeme',
    'products.filterFuelSystem': 'Mfumo wa Mafuta',
    'products.filterCoolingSystem': 'Mfumo wa Kupoa',
    'products.filterEngineParts': 'Vifaa vya Injini',
    'products.inStock': 'Inapatikana',
    'products.lowStock': 'Inakwisha',
    'products.outOfStock': 'Haipatikani',
    'products.availableSoon': 'Inapatikana Hivi Karibuni',
    'products.requestQuote': 'Omba Nukuu',
    'products.viewAll': 'Angalia Vipuri Vyote',
    'products.contactForPrice': 'Wasiliana kwa bei',
    'products.partNumber': 'Nambari ya Kipuri',
    'products.details': 'Maelezo',
    
    // Product Descriptions
    'products.desc.oilFilter': 'Kichujio cha mafuta halisi cha Lister Petter kwa injini za mfululizo wa LPW/LPWS. Uchujaji wa hali ya juu kwa ulinzi bora wa injini.',
    'products.desc.fuelFilter': 'Kipengee cha kichujio cha mafuta halisi kwa injini za Lister Petter. Inaondoa maji na uchafu kutoka kwa mafuta ya dizeli.',
    'products.desc.airFilter': 'Kichujio cha hewa chenye nguvu kwa mazingira ya uendeshaji yenye vumbi. Maisha marefu ya huduma na uwezo wa juu wa kushikilia vumbi.',
    'products.desc.cylinderHeadGasket': 'Seti kamili ya gasketi ya kichwa cha silinda kwa injini za Lister Petter zenye silinda 3. Inajumuisha mihuri yote na O-rings.',
    'products.desc.mainBearing': 'Seti ya kuzaa kuu ya saizi ya kawaida kwa injini za Lister Petter zenye silinda 4. Imebuniwa kwa usahihi kwa kufaa bora.',
    'products.desc.connectingRodBearing': 'Seti ya kuzaa ya fimbo ya kuunganisha kwa injini za Lister Petter. Bearings za hali ya juu kwa uendeshaji unaoweza kutegemewa.',
    'products.desc.alternatorBelt': 'Ukanda wa V wa alternator wenye nguvu kwa injini za Lister Petter. Upinzani wa mafuta na joto kwa maisha marefu ya huduma.',
    'products.desc.radiatorHose': 'Seti kamili ya bomba la radiota ikijumuisha bomba la juu, la chini, na la kupita. Imerejeshwa kwa silikoni kwa uimara.',
    
    // Compatibility Checker
    'compatibility.title': 'Tafuta Vipuri kwa Injini Yako',
    'compatibility.subtitle': 'Chagua modeli ya injini yako kuona vipuri vinavyofaa',
    'compatibility.engineBrand': 'Brandi ya Injini',
    'compatibility.selectBrand': 'Chagua Brandi...',
    'compatibility.engineModel': 'Modeli ya Injini',
    'compatibility.engineModelPlaceholder': 'mf., LPW2, LPW3, LPW4',
    'compatibility.engineModelHelp': 'Sijui? Angalia sahani ya jina la injini au wasiliana nasi',
    'compatibility.partType': 'Aina ya Kipuri (Hiari)',
    'compatibility.allParts': 'Vipuri Vyote',
    'compatibility.findParts': 'Tafuta Vipuri Vinavyofaa',
    'compatibility.showingResults': 'Inaonyesha vipuri {count} vinavyofaa na {model}',
    'compatibility.noResults': 'Hakuna vipuri vinavyofaa kwa modeli hii',
    'compatibility.brandListerPetter': 'Lister Petter',
    'compatibility.brandPerkins': 'Perkins',
    'compatibility.brandCAT': 'CAT',
    'compatibility.brandCummins': 'Cummins',
    'compatibility.brandOther': 'Nyingine',
    
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
    'catalog.searchPlaceholder': 'Tafuta vipuri...',
    'catalog.allCategories': 'Aina Zote',
    'catalog.allBrands': 'Brandi Zote',
    'catalog.allItems': 'Vitu Vyote',
    'catalog.sortByRelevance': 'Panga kwa: Muhimu',
    'catalog.sortByPriceLow': 'Bei: Chini hadi Juu',
    'catalog.sortByPriceHigh': 'Bei: Juu hadi Chini',
    'catalog.sortByNameAZ': 'Jina: A-Z',
    'catalog.sortByNewest': 'Mpya Zaidi Kwanza',
    'catalog.noPartsFound': 'Hakuna vipuri vilivyopatikana',
    'catalog.tryAdjusting': 'Jaribu kurekebisha vichujio vyako au maneno ya utafutaji',
    'catalog.clearFilters': 'Futa vichujio vyote',
    'catalog.showingParts': 'Inaonyesha {start}-{end} ya vipuri {total}',
    'catalog.inStockOnly': 'Vinavyopatikana Pekee',
    'catalog.availableSoon': 'Inapatikana Hivi Karibuni',
    
    // Bulk Orders
    'bulkOrders.title': 'Maagizo Makubwa na Akaunti za Meli',
    'bulkOrders.description': 'Ada ya wingi kwa maagizo ya vipuri 10+',
    'bulkOrders.benefit1': 'Meneja wa akaunti maalum kwa waendeshaji wa meli',
    'bulkOrders.benefit2': 'Bei maalum kwa mikataba ya muda mrefu',
    'bulkOrders.benefit3': 'Usafirishaji na usindikaji wa kipaumbele',
    'bulkOrders.cta': 'Omba Nukuu ya Wingi',
    
    // Parts Sourcing
    'partsSourcing.title': 'Utambulishaji na Utafutaji wa Vipuri',
    'partsSourcing.description': 'Hauwezi kupata kipuri chako? Tunaweza kusaidia',
    'partsSourcing.benefit1': 'Tutumie picha kwa utambulishaji',
    'partsSourcing.benefit2': 'Tunatafuta vipuri nadra na vilivyokoma',
    'partsSourcing.benefit3': 'Huduma ya kufananisha kwa vipuri vya aftermarket',
    'partsSourcing.cta': 'Pata Usaidizi wa Kupata Vipuri',
    
    // Testimonials
    'testimonials.title': 'Wateja Wetu Wanasema Nini',
    'testimonials.subtitle': 'Sikiliza kutoka kwa wateja wetu walioridhika Afrika Mashariki',
    'testimonials.testimonial1': 'Wings Engineering ilitoa huduma bora wakati wa kushindwa kwa jenereta yetu ya dharura. Mhandisi wao alifika ndani ya masaa 2 na tukarudishwa mtandaoni siku hiyo hiyo. Kitaalamu sana na inaweza kutegemewa!',
    'testimonials.testimonial1Name': 'John Kamau',
    'testimonials.testimonial1Role': 'Meneja wa Vifaa, Thika Manufacturing Ltd',
    'testimonials.testimonial2': 'Tumekuwa tukinunua vipuri vyetu vya Lister Petter kutoka kwa Wings Engineering kwa zaidi ya miaka 5. Vipuri vyake daima ni halisi, bei ni ushindani, na uwasilishaji ni wa haraka. Mshirika bora!',
    'testimonials.testimonial2Name': 'Mary Wanjiku',
    'testimonials.testimonial2Role': 'Afisa wa Uunuzi, Nairobi Industrial Supplies',
    'testimonials.testimonial3': 'Timu ya usakinishaji ilikuwa ya kitaalamu na ya kina. Walikamilisha usakinishaji wetu wa jenereta ya 200kVA kabla ya ratiba na walitoa mafunzo kamili kwa wafanyikazi wetu. Inapendekezwa sana!',
    'testimonials.testimonial3Name': 'Peter Ochieng',
    'testimonials.testimonial3Role': 'Mkurugenzi wa Kiufundi, Mombasa Port Authority',
    
    // Contact
    'contact.title': 'Wasiliana Nasi',
    'contact.subtitle': 'Wasiliana na timu yetu kwa nukuu, huduma za kuhudumia kitabu, au usaidizi wa kiufundi',
    'contact.form.submit': 'Tuma Ombi',
    'contact.form.name': 'Jina',
    'contact.form.email': 'Barua Pepe',
    'contact.form.phone': 'Simu',
    'contact.form.company': 'Kampuni',
    'contact.form.requestType': 'Aina ya Ombi',
    'contact.form.requestTypeQuote': 'Nukuu',
    'contact.form.requestTypeService': 'Kuhudumia Kitabu',
    'contact.form.requestTypeParts': 'Uchunguzi wa Vipuri',
    'contact.form.requestTypeGeneral': 'Jumla',
    'contact.form.product': 'Bidhaa/Huduma ya Kupendeza',
    'contact.form.message': 'Ujumbe',
    'contact.form.deliveryLocation': 'Mahali Pa Kufikishia',
    'contact.form.deliveryPlaceholder': 'Jiji, Eneo, au Anwani Kamili',
    'contact.form.additionalNotes': 'Maelezo Zaidi',
    'contact.form.notesPlaceholder': 'Mahitaji yoyote maalum, uharaka, au maswali...',
    'contact.info.title': 'Taarifa za Mawasiliano',
    'contact.info.address': 'S.L.P 4529-01002 Madaraka, Thika, Kenya',
    'contact.info.phone': '+254 718 234 222',
    'contact.info.email': 'sales@wingsengineeringservices.com',
    'contact.info.hours': 'Jumatatu-Ijumaa: 8AM-6PM, Jumamosi: 9AM-2PM',
    'contact.info.whatsapp': 'Piga Simu kwa WhatsApp',
    'contact.success': 'Asante! Tutajibu ndani ya masaa 2.',
    'contact.error': 'Tafadhali jaza sehemu zote zinazohitajika kwa usahihi.',
    
    // Quote Modal
    'quote.title': 'Omba Nukuu',
    'quote.description': 'Ongeza vipuri kwenye ombi lako la nukuu na tutajibu ndani ya masaa 2',
    'quote.partsTitle': 'Vipuri Kwenye Nukuu Yako',
    'quote.noParts': 'Hakuna vipuri vilivyoongezwa bado. Tembelea katalogi yetu na ongeza vipuri kwenye nukuu yako.',
    'quote.totalItems': 'Vitu Jumla: {count}',
    'quote.continueBrowsing': 'Endelea kutembelea vipuri',
    'quote.yourInformation': 'Taarifa Yako',
    'quote.fullName': 'Jina Kamili',
    'quote.email': 'Anwani ya Barua Pepe',
    'quote.phone': 'Nambari ya Simu',
    'quote.phonePlaceholder': '+2547XXXXXXXX',
    'quote.company': 'Jina la Kampuni',
    'quote.submit': 'Wasilisha Ombi la Nukuu',
    'quote.responseTime': 'Tutajibu kwa nukuu kamili ndani ya masaa 2 (masaa ya kazi)',
    
    // Footer
    'footer.tagline': 'Kuweka Nguvu ya Viwanda ya Afrika Mashariki',
    'footer.description': 'Mshirika wako wa kuaminika kwa jenereta, injini, na ufumbuzi wa nguvu ya viwanda nchini Kenya.',
    'footer.quickLinks': 'Viungo vya Haraka',
    'footer.contact': 'Mawasiliano',
    'footer.copyright': '© 2026 Wings Engineering Services Ltd. Haki zote zimehifadhiwa.',
    'footer.madeIn': 'Imejengwa kwa ❤️ nchini Kenya',
    
    // Search
    'search.title': 'Tafuta Vipuri',
    'search.close': 'Funga',
    
    // General
    'general.close': 'Funga',
    'general.loading': 'Inapakia...',
    'general.error': 'Hitilafu',
    'general.success': 'Mafanikio',
    'general.yes': 'Ndio',
    'general.no': 'Hapana',
    'general.cancel': 'Ghairi',
    'general.save': 'Hifadhi',
    'general.delete': 'Futa',
    'general.edit': 'Hariri',
    'general.view': 'Tazama',
    'general.add': 'Ongeza',
    'general.remove': 'Ondoa',
    'general.quantity': 'Kiasi',
    'general.price': 'Bei',
    'general.total': 'Jumla',
    'general.subtotal': 'Jumla Ndogo',
    'general.tax': 'Kodi',
    'general.discount': 'Punguzo',
    'general.shipping': 'Usafirishaji',
    'general.free': 'Bure',
    'general.paid': 'Imelipwa',
    'general.pending': 'Inasubiri',
    'general.completed': 'Imekamilika',
    'general.failed': 'Imeshindwa',
    'general.refunded': 'Imerudishwa',
    'general.currencyKES': 'KES',
    'general.currencyUSD': 'USD',
    'general.days': 'siku',
    'general.hours': 'masaa',
    'general.minutes': 'dakika',
    'general.seconds': 'sekunde',
    'general.today': 'Leo',
    'general.yesterday': 'Jana',
    'general.tomorrow': 'Kesho',
    'general.thisWeek': 'Wiki Hii',
    'general.lastWeek': 'Wiki Iliyopita',
    'general.nextWeek': 'Wiki Inayofuata',
    'general.thisMonth': 'Mwezi Huu',
    'general.lastMonth': 'Mwezi Ulopita',
    'general.nextMonth': 'Mwezi Ujao',
    'general.thisYear': 'Mwaka Huu',
    'general.lastYear': 'Mwaka Ulopita',
    'general.nextYear': 'Mwaka Ujao',
    'general.january': 'Januari',
    'general.february': 'Februari',
    'general.march': 'Machi',
    'general.april': 'Aprili',
    'general.may': 'Mei',
    'general.june': 'Juni',
    'general.july': 'Julai',
    'general.august': 'Agosti',
    'general.september': 'Septemba',
    'general.october': 'Oktoba',
    'general.november': 'Novemba',
    'general.december': 'Desemba',
    'general.monday': 'Jumatatu',
    'general.tuesday': 'Jumanne',
    'general.wednesday': 'Jumatano',
    'general.thursday': 'Alhamisi',
    'general.friday': 'Ijumaa',
    'general.saturday': 'Jumamosi',
    'general.sunday': 'Jumapili',
  }
} as const;

type TranslationKey = keyof typeof translations.en;

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem('wings-language');
    return (saved as Language) || 'en';
  });

  useEffect(() => {
    localStorage.setItem('wings-language', language);
  }, [language]);

  const t = (key: string, replacements?: Record<string, string | number>): string => {
    const keys = key.split('.');
    let value: any = translations[language];
    
    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k];
      } else {
        console.warn(`Translation key "${key}" not found in language "${language}"`);
        return key;
      }
    }
    
    let result = value || key;
    
    if (replacements) {
      Object.entries(replacements).forEach(([placeholder, replacement]) => {
        result = result.replace(new RegExp(`{${placeholder}}`, 'g'), String(replacement));
      });
    }
    
    return result;
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
