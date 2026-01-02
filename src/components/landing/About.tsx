import { useLanguage } from "@/contexts/LanguageContext";
import { Check } from "lucide-react";

const About = () => {
  const { t } = useLanguage();

  const features = [
    t("about.feature1"),
    t("about.feature2"),
    t("about.feature3"),
    t("about.feature4"),
    t("about.feature5"),
    t("about.feature6"),
  ];

  return (
    <section id="about" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              {t("about.title")}
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed">
              {t("about.content")}
            </p>
            <p className="text-muted-foreground leading-relaxed">
              {t("about.content2")}
            </p>
            <div className="grid sm:grid-cols-2 gap-4 pt-4">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center">
                    <Check className="w-4 h-4 text-primary" />
                  </div>
                  <span className="text-foreground">{feature}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="relative">
            <div className="aspect-[4/3] bg-gradient-to-br from-primary/20 to-secondary/20 rounded-lg flex items-center justify-center">
              <div className="text-center p-8">
                <p className="text-lg font-medium text-primary">
                  P.O. Box 4529-01002 Madaraka
                </p>
                <p className="text-muted-foreground">Thika, Nairobi County, Kenya</p>
                <p className="text-2xl font-bold text-primary mt-4">+254 718 234 222</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
