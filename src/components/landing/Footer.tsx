// src/components/landing/Footer.tsx
import { useLanguage } from "@/contexts/LanguageContext";
import { Settings, Facebook, Instagram, Linkedin, Phone, Mail, MapPin, Clock } from "lucide-react";

const Footer = ({ 
  language = 'en',
  onQuoteClick = () => {}
}: { 
  language?: 'en' | 'sw',
  onQuoteClick?: () => void 
}) => {
  const { t } = useLanguage();

  const quickLinks = [
    { href: "#home", label: t("nav.home") },
    { href: "#products", label: t("nav.products") },
    { href: "#services", label: t("nav.services") },
    { href: "#portfolio", label: t("nav.portfolio") },
    { href: "#contact", label: t("nav.contact") },
  ];

  const servicesLinks = [
    { label: language === 'en' ? "Generator Sales" : "Mauzo ya Jenereta", href: "#" },
    { label: language === 'en' ? "Engine Repair" : "Matengenezo ya Injini", href: "#" },
    { label: language === 'en' ? "Spare Parts" : "Vipuri", href: "#" },
    { label: language === 'en' ? "Installation" : "Usakinishaji", href: "#" },
    { label: language === 'en' ? "Maintenance" : "Matengenezo", href: "#" },
    { label: language === 'en' ? "24/7 Emergency" : "Dharura 24/7", href: "#" },
  ];

  const socialLinks = [
    { icon: <Facebook className="h-5 w-5" />, href: "https://facebook.com/wingsengineering", label: "Facebook" },
    { icon: <Instagram className="h-5 w-5" />, href: "https://instagram.com/wingsengineering", label: "Instagram" },
    { icon: <Linkedin className="h-5 w-5" />, href: "https://linkedin.com/company/wingsengineering", label: "LinkedIn" },
    { icon: <Phone className="h-5 w-5" />, href: "tel:+254718234222", label: "Phone" },
  ];

  const contactInfo = [
    { icon: <MapPin className="h-4 w-4" />, text: t("contact.info.address") },
    { icon: <Phone className="h-4 w-4" />, text: t("contact.info.phone"), href: "tel:+254718234222" },
    { icon: <Mail className="h-4 w-4" />, text: t("contact.info.email"), href: "mailto:sales@wingsengineeringservices.com" },
    { icon: <Clock className="h-4 w-4" />, text: t("contact.info.hours") },
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center">
                <Settings className="h-6 w-6" />
              </div>
              <div>
                <span className="font-bold text-xl">Wings Engineering</span>
                <p className="text-sm text-gray-400">Services Ltd.</p>
              </div>
            </div>
            <p className="text-gray-300 leading-relaxed">
              {t("footer.description")}
            </p>
            
            <div className="flex gap-4 pt-2">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-gray-800 hover:bg-blue-600 rounded-full flex items-center justify-center text-gray-300 hover:text-white transition-all"
                  aria-label={social.label}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-lg mb-6 text-white">
              {t("footer.quickLinks")}
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection(link.href);
                    }}
                    className="text-gray-400 hover:text-blue-400 transition-colors flex items-center gap-2 group"
                  >
                    <div className="w-1 h-1 bg-blue-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    {link.label}
                  </a>
                </li>
              ))}
              <li>
                <button
                  onClick={onQuoteClick}
                  className="text-blue-400 hover:text-blue-300 transition-colors flex items-center gap-2 group"
                >
                  <div className="w-1 h-1 bg-blue-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  {language === 'en' ? "Request Quote" : "Omba Nukuu"}
                </button>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-bold text-lg mb-6 text-white">
              {language === 'en' ? "Our Services" : "Huduma Zetu"}
            </h3>
            <ul className="space-y-3">
              {servicesLinks.map((service, index) => (
                <li key={index}>
                  <a
                    href={service.href}
                    className="text-gray-400 hover:text-blue-400 transition-colors flex items-center gap-2 group"
                  >
                    <div className="w-1 h-1 bg-blue-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    {service.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-bold text-lg mb-6 text-white">
              {t("footer.contact")}
            </h3>
            <div className="space-y-4">
              {contactInfo.map((info, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="w-6 h-6 text-blue-400 flex-shrink-0 mt-0.5">
                    {info.icon}
                  </div>
                  {info.href ? (
                    <a
                      href={info.href}
                      className="text-gray-300 hover:text-blue-400 transition-colors text-sm leading-relaxed"
                    >
                      {info.text}
                    </a>
                  ) : (
                    <span className="text-gray-300 text-sm leading-relaxed">
                      {info.text}
                    </span>
                  )}
                </div>
              ))}
            </div>
            
            <div className="mt-6 p-4 bg-gray-800/50 rounded-lg border border-gray-700">
              <p className="text-sm text-gray-300">
                {language === 'en' 
                  ? "24/7 Emergency Support Available"
                  : "Usaidizi wa Dharura 24/7 Unapatikana"}
              </p>
              <a
                href="tel:+254718234222"
                className="text-blue-400 hover:text-blue-300 text-sm font-medium mt-1 inline-block"
              >
                +254 718 234 222
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-center md:text-left">
              <p className="text-gray-400 text-sm">
                {t("footer.copyright")}
              </p>
              <p className="text-gray-500 text-xs mt-1">
                {t("footer.madeIn")}
              </p>
            </div>
            
            <div className="flex items-center gap-6">
              <a 
                href="/privacy" 
                className="text-gray-400 hover:text-white text-sm transition-colors"
              >
                {language === 'en' ? "Privacy Policy" : "Sera ya Faragha"}
              </a>
              <a 
                href="/terms" 
                className="text-gray-400 hover:text-white text-sm transition-colors"
              >
                {language === 'en' ? "Terms of Service" : "Sheria na Masharti"}
              </a>
              <a 
                href="/sitemap" 
                className="text-gray-400 hover:text-white text-sm transition-colors"
              >
                {language === 'en' ? "Sitemap" : "Ramani ya Tovuti"}
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-center">
            <p className="text-gray-500 text-xs">
              {language === 'en' 
                ? "Registered in Kenya • Business Registration No: CPR/2021/12345 • VAT No: 123456789"
                : "Imeandikishwa Kenya • Nambari ya Usajili ya Biashara: CPR/2021/12345 • Nambari ya VAT: 123456789"}
            </p>
            <p className="text-blue-400 text-xs">
              {language === 'en' 
                ? "ISO 9001:2015 Certified Quality Management System"
                : "Mfumo wa Usimamizi wa Ubora Ulioidhinishwa ISO 9001:2015"}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
