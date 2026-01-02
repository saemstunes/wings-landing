import { useLanguage } from "@/contexts/LanguageContext";
import { testimonials } from "@/data/testimonials";
import { Card, CardContent } from "@/components/ui/card";
import { Star, Quote } from "lucide-react";

const Testimonials = () => {
  const { language, t } = useLanguage();

  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {t("testimonials.title")}
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            {t("testimonials.subtitle")}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.slice(0, 3).map((testimonial) => (
            <Card
              key={testimonial.id}
              className="border-border hover:shadow-lg transition-shadow"
            >
              <CardContent className="pt-6">
                <Quote className="h-8 w-8 text-primary/30 mb-4" />
                <p className="text-muted-foreground italic mb-6 leading-relaxed">
                  "{language === "en" ? testimonial.quote : testimonial.quoteSwahili}"
                </p>
                <div className="flex items-center gap-1 mb-4">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star
                      key={i}
                      className="h-4 w-4 fill-primary text-primary"
                    />
                  ))}
                </div>
                <div>
                  <p className="font-semibold text-foreground">
                    {testimonial.clientName}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {testimonial.role}, {testimonial.company}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
