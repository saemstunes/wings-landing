import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { products, categories } from "@/data/products";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Package } from "lucide-react";

const Products = () => {
  const { language, t } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState("all");

  const filteredProducts =
    selectedCategory === "all"
      ? products
      : products.filter((p) => p.category === selectedCategory);

  const getStockStatus = (quantity: number) => {
    if (quantity > 20) return { label: t("products.inStock"), variant: "default" as const };
    if (quantity > 0) return { label: t("products.lowStock"), variant: "secondary" as const };
    return { label: t("products.outOfStock"), variant: "destructive" as const };
  };

  return (
    <section id="products" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {t("products.title")}
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            {t("products.subtitle")}
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(category.id)}
            >
              {language === "en" ? category.name : category.nameSwahili}
            </Button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.slice(0, 8).map((product) => {
            const stockStatus = getStockStatus(product.stockQuantity);
            return (
              <Card
                key={product.id}
                className="group hover:shadow-lg transition-all duration-300 border-border"
              >
                <CardHeader className="pb-2">
                  <div className="aspect-square bg-muted rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary/5 transition-colors">
                    <Package className="h-16 w-16 text-muted-foreground" />
                  </div>
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <CardTitle className="text-base line-clamp-2">
                        {product.name}
                      </CardTitle>
                      <CardDescription className="text-sm">
                        {product.brand} • {product.partNumber}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                    {product.shortDescription}
                  </p>
                  <div className="flex items-center justify-between mb-4">
                    <Badge variant={stockStatus.variant}>{stockStatus.label}</Badge>
                    {product.price && (
                      <span className="font-semibold text-primary">
                        {product.currency} {product.price.toLocaleString()}
                      </span>
                    )}
                  </div>
                  <Button
                    className="w-full"
                    size="sm"
                    onClick={() => {
                      const message = `Hi, I'm interested in ${product.name} (Part #${product.partNumber}). Can you provide more details and pricing?`;
                      window.open(
                        `https://wa.me/254718234222?text=${encodeURIComponent(message)}`,
                        "_blank"
                      );
                    }}
                  >
                    {t("products.requestQuote")}
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="text-center mt-12">
          <Button
            variant="outline"
            size="lg"
            onClick={() => {
              document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            {t("products.viewAll")}
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Products;
