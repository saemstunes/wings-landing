// src/components/landing/Navigation.tsx
import { useState, useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Menu, X, Settings, Search, ShoppingCart, Phone, Globe, Sun, Moon } from "lucide-react";

interface NavigationProps {
  language?: 'en' | 'sw';
  toggleLanguage?: () => void;
  darkMode?: boolean;
  toggleDarkMode?: () => void;
  quoteItems?: Array<any>;
  onQuoteClick?: () => void;
  onSearchClick?: () => void;
  onWhatsAppClick?: () => void;
  scrollToSection?: (section: string) => void;
}

const Navigation = ({
  language = 'en',
  toggleLanguage = () => {},
  darkMode = false,
  toggleDarkMode = () => {},
  quoteItems = [],
  onQuoteClick = () => {},
  onSearchClick = () => {},
  onWhatsAppClick = () => {},
  scrollToSection = () => {}
}: NavigationProps) => {
  const { t } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { id: "home", label: t("nav.home") },
    { id: "products", label: t("nav.products") },
    { id: "services", label: t("nav.services") },
    { id: "portfolio", label: t("nav.portfolio") },
    { id: "contact", label: t("nav.contact") },
  ];

  const handleNavClick = (sectionId: string) => {
    scrollToSection(sectionId);
    setIsMobileMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-lg"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => handleNavClick("home")}
              className="flex items-center gap-3 group"
            >
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform">
                <Settings className="h-6 w-6 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-lg text-gray-900 dark:text-white leading-tight">
                  Wings Engineering
                </span>
                <span className="text-xs text-gray-600 dark:text-gray-400 hidden sm:block">
                  {language === 'en' ? "Services Ltd." : "Huduma Ltd."}
                </span>
              </div>
            </button>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium relative group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300"></span>
              </button>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-4">
            {/* Search */}
            <button
              onClick={onSearchClick}
              className="p-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              aria-label="Search"
            >
              <Search className="h-5 w-5" />
            </button>

            {/* Quote Button */}
            <button
              onClick={onQuoteClick}
              className="relative p-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              aria-label="Quote"
            >
              <ShoppingCart className="h-5 w-5" />
              {quoteItems.length > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                  {quoteItems.length}
                </span>
              )}
            </button>

            {/* Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              className="p-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              aria-label="Toggle dark mode"
            >
              {darkMode ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </button>

            {/* Language Toggle */}
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              <Globe className="h-4 w-4" />
              <span className="text-sm font-medium">
                {language === "en" ? "EN" : "SW"}
              </span>
            </button>

            {/* WhatsApp */}
            <Button
              onClick={onWhatsAppClick}
              className="bg-green-600 hover:bg-green-700 text-white gap-2"
            >
              <Phone className="h-4 w-4" />
              {language === "en" ? "WhatsApp" : "WhatsApp"}
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Menu"
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6 text-gray-900 dark:text-white" />
            ) : (
              <Menu className="h-6 w-6 text-gray-900 dark:text-white" />
            )}
          </button>
        </nav>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 py-4 shadow-xl">
            <div className="flex flex-col gap-4 px-4">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className="text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium py-3 text-left border-b border-gray-100 dark:border-gray-800"
                >
                  {link.label}
                </button>
              ))}
              
              <div className="grid grid-cols-2 gap-3 pt-4">
                <button
                  onClick={onSearchClick}
                  className="flex items-center justify-center gap-2 p-3 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                >
                  <Search className="h-4 w-4" />
                  <span>{language === 'en' ? "Search" : "Tafuta"}</span>
                </button>
                
                <button
                  onClick={onQuoteClick}
                  className="flex items-center justify-center gap-2 p-3 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors relative"
                >
                  <ShoppingCart className="h-4 w-4" />
                  <span>{language === 'en' ? "Quote" : "Nukuu"}</span>
                  {quoteItems.length > 0 && (
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                      {quoteItems.length}
                    </span>
                  )}
                </button>
                
                <button
                  onClick={toggleDarkMode}
                  className="flex items-center justify-center gap-2 p-3 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                >
                  {darkMode ? (
                    <>
                      <Sun className="h-4 w-4" />
                      <span>{language === 'en' ? "Light" : "Mwanga"}</span>
                    </>
                  ) : (
                    <>
                      <Moon className="h-4 w-4" />
                      <span>{language === 'en' ? "Dark" : "Giza"}</span>
                    </>
                  )}
                </button>
                
                <button
                  onClick={toggleLanguage}
                  className="flex items-center justify-center gap-2 p-3 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                >
                  <Globe className="h-4 w-4" />
                  <span>{language === "en" ? "Switch to Swahili" : "Badilisha kwa Kiingereza"}</span>
                </button>
              </div>
              
              <div className="pt-4 space-y-3">
                <Button
                  onClick={onWhatsAppClick}
                  className="w-full bg-green-600 hover:bg-green-700 text-white gap-2"
                >
                  <Phone className="h-4 w-4" />
                  {language === 'en' ? "Chat on WhatsApp" : "Piga Simu kwa WhatsApp"}
                </Button>
                
                <Button
                  onClick={onQuoteClick}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white gap-2"
                >
                  <ShoppingCart className="h-4 w-4" />
                  {language === 'en' ? "Request Quote" : "Omba Nukuu"}
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navigation;
