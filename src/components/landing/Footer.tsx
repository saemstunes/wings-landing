import { useLanguage } from "@/contexts/LanguageContext";
import { Settings, Facebook, Instagram, Linkedin } from "lucide-react";

const Footer = () => {
  const { t } = useLanguage();

  const quickLinks = [
    { href: "#home", label: t("nav.home") },
    { href: "#products", label: t("nav.products") },
    { href: "#services", label: t("nav.services") },
    { href: "#portfolio", label: t("nav.portfolio") },
    { href: "#contact", label: t("nav.contact") },
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="bg-foreground text-background py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          {/* Company Info */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Settings className="h-8 w-8" />
              <span className="font-bold text-xl">Wings Engineering</span>
            </div>
            <p className="text-background/60 mb-4">{t("footer.tagline")}</p>
            <p className="text-background/80">{t("footer.description")}</p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">{t("footer.quickLinks")}</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection(link.href);
                    }}
                    className="text-background/70 hover:text-background transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-lg mb-4">{t("footer.contact")}</h3>
            <div className="space-y-2 text-background/80">
              <p>{t("contact.info.address")}</p>
              <p>
                <a href="tel:+254718234222" className="hover:text-background">
                  {t("contact.info.phone")}
                </a>
              </p>
              <p>
                <a href="mailto:sales@wingsengineeringservices.com" className="hover:text-background">
                  {t("contact.info.email")}
                </a>
              </p>
            </div>
            <div className="flex gap-4 mt-6">
              <a href="#" className="text-background/60 hover:text-background transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-background/60 hover:text-background transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-background/60 hover:text-background transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-background/20 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-background/60 text-sm">{t("footer.copyright")}</p>
          <p className="text-background/60 text-sm">{t("footer.madeIn")}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
