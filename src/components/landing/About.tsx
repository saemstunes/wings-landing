// src/components/landing/About.tsx
import { useLanguage } from "@/contexts/LanguageContext";
import { Check, MapPin, Phone, Mail } from "lucide-react";

const About = () => {
  const { t } = useLanguage();

  const features = [
    t("about.features.experience"),
    t("about.features.parts"),
    t("about.features.support"),
    t("about.features.specialist"),
    t("about.trust.legal"),
    t("about.trust.certified"),
    t("about.trust.local")
  ];

  const contactInfo = [
    { icon: <MapPin className="h-5 w-5" />, label: "P.O. Box 4529-01002 Madaraka, Thika, Kenya" },
    { icon: <Phone className="h-5 w-5" />, label: "+254 718 234 222", href: "tel:+254718234222" },
    { icon: <Mail className="h-5 w-5" />, label: "sales@wingsengineeringservices.com", href: "mailto:sales@wingsengineeringservices.com" }
  ];

  return (
    <section id="about" className="py-20 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white">
                {t("about.title")}
              </h2>
              <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                {t("about.content")}
              </p>
              
              <div className="space-y-4 pt-4">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  {t("about.features.title") || "Our Key Strengths"}
                </h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  {features.slice(0, 4).map((feature, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-6 h-6 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mt-0.5">
                        <Check className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                      </div>
                      <span className="text-gray-800 dark:text-gray-200 text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-gray-200 dark:border-gray-700">
              {[
                { value: "15+", label: t("hero.stat1Label") },
                { value: "500+", label: t("hero.stat2Label") },
                { value: "24/7", label: t("hero.stat3Label") }
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-2xl md:text-3xl font-bold text-blue-600 dark:text-blue-400">{stat.value}</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="backdrop-blur-xl bg-white/80 dark:bg-gray-800/80 rounded-2xl shadow-2xl p-8 border border-gray-200 dark:border-gray-700">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                {t("contact.info.title")}
              </h3>
              
              <div className="space-y-4">
                {contactInfo.map((info, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center flex-shrink-0 text-blue-600 dark:text-blue-400">
                      {info.icon}
                    </div>
                    {info.href ? (
                      <a
                        href={info.href}
                        className="text-gray-800 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors pt-2"
                      >
                        {info.label}
                      </a>
                    ) : (
                      <span className="text-gray-800 dark:text-gray-200 pt-2">{info.label}</span>
                    )}
                  </div>
                ))}
                
                <div className="flex items-start gap-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                  <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center flex-shrink-0 text-green-600 dark:text-green-400">
                    <Check className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-gray-800 dark:text-gray-200 font-medium">
                      {t("about.trust.title") || "Verified & Certified"}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {t("about.trust.description") || "Registered business with legal compliance"}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-200 dark:border-blue-800">
                <p className="text-sm text-blue-800 dark:text-blue-300">
                  <span className="font-semibold">{t("about.serviceArea.title") || "Service Area:"}</span>{" "}
                  {t("about.serviceArea.description") || "Thika, Nairobi, Kiambu & across Kenya"}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-12 border-t border-gray-200 dark:border-gray-700">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white text-center mb-8">
            {t("about.trust.title") || "Why Trust Wings Engineering?"}
          </h3>
          
          <div className="grid md:grid-cols-3 gap-6">
            {features.slice(4).map((feature, index) => (
              <div key={index} className="bg-white/50 dark:bg-gray-800/50 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
                <div className="flex items-center gap-3 mb-3">
                  <Check className="w-5 h-5 text-green-600 dark:text-green-400" />
                  <span className="font-semibold text-gray-900 dark:text-white">
                    {feature.split(":")[0]}
                  </span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {feature.split(":").slice(1).join(":") || feature}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
