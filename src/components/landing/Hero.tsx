// src/components/landing/Hero.tsx
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Phone, ArrowRight, Search, Package, Settings, Zap } from "lucide-react";

interface HeroProps {
  language?: 'en' | 'sw';
  searchQuery?: string;
  onSearchChange?: (query: string) => void;
  onSearch?: () => void;
  onBrowseParts?: () => void;
  onCheckCompatibility?: () => void;
}

const Hero = ({ 
  language = 'en',
  searchQuery = '',
  onSearchChange = () => {},
  onSearch = () => {},
  onBrowseParts = () => {},
  onCheckCompatibility = () => {}
}: HeroProps) => {
  const { t } = useLanguage();

  const stats = [
    { 
      value: t("hero.stat1"), 
      label: t("hero.stat1Label"),
      icon: <Package className="h-6 w-6" />
    },
    { 
      value: t("hero.stat2"), 
      label: t("hero.stat2Label"),
      icon: <Zap className="h-6 w-6" />
    },
    { 
      value: t("hero.stat3"), 
      label: t("hero.stat3Label"),
      icon: <Settings className="h-6 w-6" />
    },
    { 
      value: t("hero.stat4"), 
      label: t("hero.stat4Label"),
      icon: <Package className="h-6 w-6" />
    },
  ];

  const brands = [
    "Lister Petter", "Perkins", "CAT", "Cummins", "Deutz", "Volvo Penta", "John Deere", "Detroit Diesel"
  ];

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center pt-16 bg-gradient-to-br from-blue-50 via-white to-gray-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(59,130,246,0.1)_1px,transparent_0)] bg-[length:40px_40px]"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div className="space-y-8">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-4 py-2 rounded-full text-sm font-medium">
                <Settings className="h-4 w-4" />
                <span>{language === 'en' ? "Lister Petter Certified Specialist" : "Mtaalamu Alioidhinishwa wa Lister Petter"}</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white leading-tight">
                {t("hero.headline")}
              </h1>
              
              <p className="text-xl md:text-2xl text-blue-600 dark:text-blue-400 font-semibold">
                {t("hero.subheadline")}
              </p>
              
              <p className="text-lg text-gray-700 dark:text-gray-300 max-w-xl leading-relaxed">
                {t("hero.description")}
              </p>
            </div>

            {/* Search Bar */}
            <div className="max-w-xl">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder={t("hero.searchPlaceholder")}
                  value={searchQuery}
                  onChange={(e) => onSearchChange(e.target.value)}
                  className="w-full pl-12 pr-32 py-4 text-lg border-2 border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 transition-all"
                />
                <button
                  onClick={onSearch}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  {language === 'en' ? "Search" : "Tafuta"}
                </button>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                className="bg-blue-600 hover:bg-blue-700 text-white gap-2 px-8 py-6 text-lg"
                onClick={onBrowseParts}
              >
                {t("hero.cta1")}
                <ArrowRight className="h-5 w-5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="gap-2 px-8 py-6 text-lg border-2"
                onClick={onCheckCompatibility}
              >
                <Settings className="h-5 w-5" />
                {t("hero.cta2")}
              </Button>
            </div>

            {/* Quick Contact */}
            <div className="flex items-center gap-4 pt-4">
              <a
                href="tel:+254718234222"
                className="inline-flex items-center gap-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                  <Phone className="h-5 w-5 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <p className="font-semibold">+254 718 234 222</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {language === 'en' ? "24/7 Emergency Support" : "Usaidizi wa Dharura 24/7"}
                  </p>
                </div>
              </a>
            </div>
          </div>

          {/* Right Side - Brand Showcase */}
          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-3xl opacity-10 blur-xl"></div>
            <div className="relative backdrop-blur-xl bg-white/80 dark:bg-gray-800/80 rounded-2xl shadow-2xl p-8 border border-gray-200 dark:border-gray-700">
              <div className="text-center mb-8">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl font-bold text-white">LP</span>
                </div>
                <p className="text-blue-600 dark:text-blue-400 font-semibold text-lg">
                  {language === 'en' ? "Lister Petter Specialist" : "Mtaalamu wa Lister Petter"}
                </p>
                <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
                  {language === 'en' 
                    ? "Certified parts & service center"
                    : "Kituo kilichoidhinishwa cha vipuri na huduma"}
                </p>
              </div>

              {/* Brand Logos */}
              <div className="space-y-6">
                <h3 className="font-semibold text-gray-900 dark:text-white text-center">
                  {language === 'en' ? "Trusted by Major Brands" : "Tunaminika na Brandi Kubwa"}
                </h3>
                <div className="grid grid-cols-4 gap-4">
                  {brands.slice(0, 8).map((brand, index) => (
                    <div
                      key={index}
                      className="bg-gray-100 dark:bg-gray-700/50 rounded-xl p-3 flex items-center justify-center hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
                    >
                      <span className="text-xs font-medium text-gray-700 dark:text-gray-300 truncate">
                        {brand}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Service Badges */}
              <div className="mt-8 grid grid-cols-2 gap-3">
                {[
                  { label: language === 'en' ? "Genuine Parts" : "Vipuri Halisi", color: "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400" },
                  { label: language === 'en' ? "OEM Certified" : "Imeidhinishwa OEM", color: "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400" },
                  { label: language === 'en' ? "Fast Delivery" : "Uwasilishaji wa Haraka", color: "bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400" },
                  { label: language === 'en' ? "Warranty" : "Dhamana", color: "bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400" },
                ].map((badge, index) => (
                  <div
                    key={index}
                    className={`${badge.color} rounded-lg py-2 px-3 text-center text-sm font-medium`}
                  >
                    {badge.label}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Stats Bar */}
        <div className="mt-16 lg:mt-24 grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="backdrop-blur-xl bg-white/80 dark:bg-gray-800/80 border border-gray-200 dark:border-gray-700 rounded-2xl p-6 text-center hover:shadow-xl transition-all hover:-translate-y-1"
            >
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center text-blue-600 dark:text-blue-400 mx-auto mb-3">
                {stat.icon}
              </div>
              <div className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
                {stat.value}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <div className="animate-bounce">
          <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-gray-400 rounded-full mt-2"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
