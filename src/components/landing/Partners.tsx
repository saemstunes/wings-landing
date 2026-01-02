import { useLanguage } from "@/contexts/LanguageContext";
import { partners } from "@/data/partners";

const Partners = () => {
  const { t } = useLanguage();

  return (
    <section className="py-16 bg-card border-y border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-center text-lg font-medium text-muted-foreground mb-8">
          {t("partners.title")}
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center">
          {partners.map((partner) => (
            <div
              key={partner.id}
              className="flex flex-col items-center justify-center p-4 grayscale hover:grayscale-0 transition-all duration-300 opacity-60 hover:opacity-100"
            >
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-2">
                <span className="text-xs font-bold text-muted-foreground">
                  {partner.name.substring(0, 2).toUpperCase()}
                </span>
              </div>
              <span className="text-xs text-muted-foreground text-center">
                {partner.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Partners;
