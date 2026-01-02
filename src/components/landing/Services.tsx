import { useLanguage } from "@/contexts/LanguageContext";
import { services } from "@/data/services";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Zap, Wrench, Settings, Calendar, AlertCircle, FileText } from "lucide-react";

const iconMap: Record<string, React.ReactNode> = {
  Zap: <Zap className="h-8 w-8" />,
  Wrench: <Wrench className="h-8 w-8" />,
  Settings: <Settings className="h-8 w-8" />,
  Calendar: <Calendar className="h-8 w-8" />,
  AlertCircle: <AlertCircle className="h-8 w-8" />,
  FileText: <FileText className="h-8 w-8" />,
};

const Services = () => {
  const { language, t } = useLanguage();

  return (
    <section id="services" className="py-20 bg-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {t("services.title")}
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            {t("services.subtitle")}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <Card
              key={service.id}
              className="group hover:shadow-lg transition-shadow duration-300 border-border"
            >
              <CardHeader>
                <div className="w-14 h-14 bg-primary/10 rounded-lg flex items-center justify-center text-primary mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  {iconMap[service.icon]}
                </div>
                <CardTitle className="text-xl">
                  {language === "en" ? service.name : service.nameSwahili}
                </CardTitle>
                <CardDescription className="text-muted-foreground">
                  {language === "en" ? service.description : service.descriptionSwahili}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 mb-6">
                  {(language === "en" ? service.features : service.featuresSwahili).map(
                    (feature, index) => (
                      <li key={index} className="text-sm text-muted-foreground flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-primary rounded-full" />
                        {feature}
                      </li>
                    )
                  )}
                </ul>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => {
                    document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
                  }}
                >
                  {t("services.bookService")}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
