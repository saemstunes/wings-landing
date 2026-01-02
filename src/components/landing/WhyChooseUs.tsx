import { useLanguage } from "@/contexts/LanguageContext";
import { MapPin, Shield, Package, Clock } from "lucide-react";

const WhyChooseUs = () => {
  const { t } = useLanguage();

  const reasons = [
    {
      icon: <MapPin className="h-8 w-8" />,
      title: t("whyUs.local.title"),
      description: t("whyUs.local.description"),
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: t("whyUs.verified.title"),
      description: t("whyUs.verified.description"),
    },
    {
      icon: <Package className="h-8 w-8" />,
      title: t("whyUs.genuine.title"),
      description: t("whyUs.genuine.description"),
    },
    {
      icon: <Clock className="h-8 w-8" />,
      title: t("whyUs.support.title"),
      description: t("whyUs.support.description"),
    },
  ];

  return (
    <section className="py-20 bg-primary text-primary-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {t("whyUs.title")}
          </h2>
          <p className="text-primary-foreground/80 text-lg max-w-2xl mx-auto">
            {t("whyUs.subtitle")}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {reasons.map((reason, index) => (
            <div
              key={index}
              className="text-center p-6 bg-primary-foreground/5 rounded-lg border border-primary-foreground/10"
            >
              <div className="w-16 h-16 mx-auto mb-4 bg-primary-foreground/10 rounded-full flex items-center justify-center">
                {reason.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{reason.title}</h3>
              <p className="text-primary-foreground/70">{reason.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
