// src/components/landing/WhyChooseUs.tsx
import { useLanguage } from "@/contexts/LanguageContext";
import { MapPin, Shield, Package, Clock, Award, Users, Truck, CheckCircle } from "lucide-react";

const WhyChooseUs = ({ language = 'en' }: { language?: 'en' | 'sw' }) => {
  const { t } = useLanguage();

  const reasons = [
    {
      icon: <MapPin className="h-8 w-8" />,
      title: t("whyUs.local.title"),
      description: t("whyUs.local.description"),
      features: [
        language === 'en' ? "Based in Thika, Nairobi County" : "Tukiwakaa Thika, Kaunti ya Nairobi",
        language === 'en' ? "Rapid on-site response" : "Jibu la haraka kwenye tovuti",
        language === 'en' ? "Local technical expertise" : "Utaalamu wa kiufundi wa ndani",
        language === 'en' ? "Knowledge of local conditions" : "Ujuzi wa hali za ndani"
      ],
      color: "from-blue-500 to-blue-600"
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: t("whyUs.verified.title"),
      description: t("whyUs.verified.description"),
      features: [
        language === 'en' ? "Registered Kenyan business" : "Biashara iliyoandikishwa Kenya",
        language === 'en' ? "Legal compliance verified" : "Kufuata sheria kumehakikiwa",
        language === 'en' ? "Transparent operations" : "Uendeshaji wa uwazi",
        language === 'en' ? "Court records available" : "Rekodi za mahakama zinapatikana"
      ],
      color: "from-green-500 to-green-600"
    },
    {
      icon: <Package className="h-8 w-8" />,
      title: t("whyUs.genuine.title"),
      description: t("whyUs.genuine.description"),
      features: [
        language === 'en' ? "Lister Petter certified specialist" : "Mtaalamu aliyeidhinishwa wa Lister Petter",
        language === 'en' ? "100% genuine OEM parts" : "Vipuri 100% halisi vya OEM",
        language === 'en' ? "No aftermarket substitutes" : "Hakuna mbadala wa aftermarket",
        language === 'en' ? "Warranty on all parts" : "Dhamana kwa vipuri vyote"
      ],
      color: "from-purple-500 to-purple-600"
    },
    {
      icon: <Clock className="h-8 w-8" />,
      title: t("whyUs.support.title"),
      description: t("whyUs.support.description"),
      features: [
        language === 'en' ? "24/7 emergency breakdown response" : "Jibu la dharura la kuvunjika 24/7",
        language === 'en' ? "Preventative maintenance packages" : "Vifurushi vya matengenezo ya kuzuia",
        language === 'en' ? "2-hour response time guarantee" : "Dhamana ya muda wa kujibu wa masaa 2",
        language === 'en' ? "Mobile service teams" : "Timu za huduma za rununu"
      ],
      color: "from-amber-500 to-amber-600"
    },
  ];

  const additionalBenefits = [
    {
      icon: <Award className="h-6 w-6" />,
      title: language === 'en' ? "15+ Years Experience" : "Uzoefu wa Zaidi ya Miaka 15",
      description: language === 'en' 
        ? "Deep expertise in industrial power systems"
        : "Uzoefu wa kina katika mifumo ya nguvu ya viwanda"
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: language === 'en' ? "Expert Technical Team" : "Timu ya Wataalamu wa Kiufundi",
      description: language === 'en' 
        ? "Certified engineers & technicians"
        : "Wahandisi na wateknisia walioidhinishwa"
    },
    {
      icon: <Truck className="h-6 w-6" />,
      title: language === 'en' ? "Fast Delivery" : "Uwasilishaji wa Haraka",
      description: language === 'en' 
        ? "Same-day dispatch for in-stock parts"
        : "Kutumwa siku hiyohiyo kwa vipuri vinavyopatikana"
    },
    {
      icon: <CheckCircle className="h-6 w-6" />,
      title: language === 'en' ? "Quality Guarantee" : "Dhamana ya Ubora",
      description: language === 'en' 
        ? "12-month warranty on all parts & services"
        : "Dhamana ya miezi 12 kwa vipuri na huduma zote"
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 to-white dark:from-gray-800 dark:to-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Award className="h-4 w-4" />
            <span>{language === 'en' ? "Why Choose Us" : "Kwa Nini Kuchagua Sisi"}</span>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {t("whyUs.title")}
          </h2>
          <p className="text-gray-700 dark:text-gray-300 text-lg max-w-2xl mx-auto">
            {t("whyUs.subtitle") || (language === 'en' 
              ? "Trusted by industrial clients across East Africa for reliable engineering solutions"
              : "Tunaminika na wateja wa viwanda Afrika Mashariki kwa suluhisho za uhandisi zinazoweza kuaminika")}
          </p>
        </div>

        {/* Main Reasons Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {reasons.map((reason, index) => (
            <div
              key={index}
              className="group relative backdrop-blur-sm bg-white/80 dark:bg-gray-800/80 rounded-2xl p-6 border border-gray-200 dark:border-gray-700 hover:shadow-xl hover:-translate-y-1 transition-all"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${reason.color} opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity`}></div>
              <div className="relative">
                <div className={`w-14 h-14 bg-gradient-to-br ${reason.color} rounded-xl flex items-center justify-center text-white mb-4`}>
                  {reason.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                  {reason.title}
                </h3>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  {reason.description}
                </p>
                
                <ul className="space-y-2">
                  {reason.features.map((feature, idx) => (
                    <li key={idx} className="text-sm text-gray-600 dark:text-gray-400 flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Benefits */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white text-center mb-8">
            {language === 'en' ? "Additional Benefits" : "Faida Zaidi"}
          </h3>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {additionalBenefits.map((benefit, index) => (
              <div
                key={index}
                className="bg-white/50 dark:bg-gray-800/50 rounded-xl p-4 border border-gray-200 dark:border-gray-700 text-center"
              >
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center text-blue-600 dark:text-blue-400 mx-auto mb-3">
                  {benefit.icon}
                </div>
                <h4 className="font-semibold text-gray-900 dark:text-white text-sm mb-1">
                  {benefit.title}
                </h4>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Comparison Table */}
        <div className="backdrop-blur-xl bg-white/80 dark:bg-gray-800/80 rounded-2xl p-8 border border-gray-200 dark:border-gray-700 shadow-lg">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white text-center mb-8">
            {language === 'en' ? "Why We're Different" : "Kwa Nini Sisi Ni Tofauti"}
          </h3>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <th className="text-left py-4 px-4 text-gray-900 dark:text-white font-semibold">
                    {language === 'en' ? "Feature" : "Kipengele"}
                  </th>
                  <th className="text-center py-4 px-4 text-blue-600 dark:text-blue-400 font-semibold">
                    {language === 'en' ? "Wings Engineering" : "Wings Engineering"}
                  </th>
                  <th className="text-center py-4 px-4 text-gray-500 dark:text-gray-400 font-semibold">
                    {language === 'en' ? "Other Suppliers" : "Wasambazaji Wengine"}
                  </th>
                </tr>
              </thead>
              <tbody>
                {[
                  {
                    feature: language === 'en' ? "Genuine OEM Parts" : "Vipuri Halisi vya OEM",
                    wings: language === 'en' ? "✓ Guaranteed" : "✓ Inahakikishiwa",
                    others: language === 'en' ? "Sometimes" : "Wakati mwingine"
                  },
