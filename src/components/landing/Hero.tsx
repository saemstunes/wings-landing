import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Phone, ArrowRight } from "lucide-react";

const Hero = () => {
  const { t } = useLanguage();

  const stats = [
    { value: t("hero.stat1"), label: t("hero.stat1Label") },
    { value: t("hero.stat2"), label: t("hero.stat2Label") },
    { value: t("hero.stat3"), label: t("hero.stat3Label") },
    { value: t("hero.stat4"), label: t("hero.stat4Label") },
  ];

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center pt-20 bg-gradient-to-br from-primary/10 via-background to-secondary/10"
    >
      <div className="absolute inset-0 bg-[url('/placeholder.svg')] bg-cover bg-center opacity-5" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
                {t("hero.headline")}
              </h1>
              <p className="text-xl md:text-2xl text-primary font-semibold">
                {t("hero.subheadline")}
              </p>
              <p className="text-lg text-muted-foreground max-w-xl">
                {t("hero.description")}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                className="bg-primary text-primary-foreground hover:bg-primary/90 gap-2"
                onClick={() => {
                  document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                {t("hero.cta1")}
                <ArrowRight className="h-5 w-5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="gap-2"
                asChild
              >
                <a href="tel:+254718234222">
                  <Phone className="h-5 w-5" />
                  {t("hero.cta2")}
                </a>
              </Button>
            </div>
          </div>

          <div className="hidden lg:block">
            <div className="relative">
              <div className="aspect-square bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full flex items-center justify-center">
                <div className="text-center p-8">
                  <div className="text-6xl font-bold text-primary">LP</div>
                  <p className="text-muted-foreground mt-2">Lister Petter Specialist</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Bar */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-card border border-border p-6 text-center"
            >
              <div className="text-3xl md:text-4xl font-bold text-primary">
                {stat.value}
              </div>
              <div className="text-sm text-muted-foreground mt-1">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
