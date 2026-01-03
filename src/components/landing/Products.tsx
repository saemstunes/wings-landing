// src/components/landing/Products.tsx
import { useState, useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Package, Search, Filter } from "lucide-react";
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';
const supabase = supabaseUrl && supabaseAnonKey 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

// Define the Part type
interface Part {
  id: string;
  name: string;
  brand: string;
  model: string;
  part_number?: string;
  category: string;
  subcategory: string;
  price?: number;
  currency: string;
  stock_quantity: number;
  lead_time_days?: number;
  short_description?: string;
  full_description?: string;
  primary_image_url?: string;
  key_features: string[];
  applications: string[];
  compatible_with: string[];
  created_at: string;
  updated_at: string;
}

const Products = () => {
  const { language, t } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [parts, setParts] = useState<Part[]>([]);
  const [filteredParts, setFilteredParts] = useState<Part[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [categories, setCategories] = useState<Array<{
    id: string;
    name: string;
    nameSwahili: string;
    count: number;
  }>>([]);

  // Fetch parts from Supabase
  useEffect(() => {
    fetchParts();
  }, []);

  const fetchParts = async () => {
    if (!supabase) {
      console.error("Supabase not configured");
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      
      // Fetch parts from Supabase
      const { data, error } = await supabase
        .from('product_catalog')
        .select('*')
        .in('category', ['parts', 'spare_parts'])
        .eq('status', 'active')
        .order('created_at', { ascending: false });

      if (error) throw error;

      if (data) {
        const partsData: Part[] = data.map((part: any) => ({
          ...part,
          key_features: part.key_features || [],
          applications: part.applications || [],
          compatible_with: part.compatible_with || [],
          part_number: part.model || part.part_number
        }));
        
        setParts(partsData);
        setFilteredParts(partsData);
        
        // Generate categories from data
        const categoryMap = new Map();
        partsData.forEach(part => {
          const category = part.subcategory || part.category;
          if (category) {
            const current = categoryMap.get(category) || 0;
            categoryMap.set(category, current + 1);
          }
        });

        const categoryList = Array.from(categoryMap.entries()).map(([name, count]) => ({
          id: name.toLowerCase().replace(/\s+/g, '_'),
          name,
          nameSwahili: getSwahiliCategory(name),
          count
        }));

        setCategories([
          { id: 'all', name: 'All Parts', nameSwahili: 'Vipuri Vyote', count: partsData.length },
          ...categoryList
        ]);
      }
    } catch (error) {
      console.error('Error fetching parts:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getSwahiliCategory = (category: string) => {
    const translations: Record<string, string> = {
      'Filters': 'Vichujio',
      'Engine Components': 'Vifaa vya Injini',
      'Gaskets & Seals': 'Gasketi na Mihuri',
      'Fuel System': 'Mfumo wa Mafuta',
      'Cooling System': 'Mfumo wa Kupoa',
      'Electrical': 'Umeme',
      'Belts & Hoses': 'Mikanda na Mijeledi',
      'Fasteners & Hardware': 'Vifungo na Vifaa'
    };
    return translations[category] || category;
  };

  // Filter parts based on category and search
  useEffect(() => {
    let result = [...parts];

    // Apply category filter
    if (selectedCategory !== "all") {
      const selectedCat = categories.find(c => c.id === selectedCategory);
      if (selectedCat) {
        result = result.filter(part => 
          (part.subcategory || part.category) === selectedCat.name
        );
      }
    }

    // Apply search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(part =>
        part.name.toLowerCase().includes(query) ||
        part.model.toLowerCase().includes(query) ||
        part.part_number?.toLowerCase().includes(query) ||
        part.brand.toLowerCase().includes(query) ||
        part.compatible_with.some(c => c.toLowerCase().includes(query))
      );
    }

    setFilteredParts(result);
  }, [selectedCategory, searchQuery, parts, categories]);

  const getStockStatus = (quantity: number, leadTime?: number) => {
    if (quantity > 10) return { 
      label: t("products.inStock"), 
      variant: "default" as const,
      color: "bg-green-500"
    };
    if (quantity > 0) return { 
      label: `${t("products.lowStock")}: ${quantity}`, 
      variant: "secondary" as const,
      color: "bg-yellow-500"
    };
    if (leadTime && leadTime <= 10) return { 
      label: `${t("products.availableSoon")}: ${leadTime} days`, 
      variant: "outline" as const,
      color: "bg-blue-500"
    };
    return { 
      label: t("products.outOfStock"), 
      variant: "destructive" as const,
      color: "bg-red-500"
    };
  };

  // Add to quote function (you need to implement this in parent or context)
  const addToQuote = (part: Part) => {
    // This should be implemented in your parent component or a context
    console.log('Add to quote:', part);
    // You can use window.dispatchEvent or a context to communicate with parent
    window.dispatchEvent(new CustomEvent('addToQuote', { detail: part }));
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

        {/* Search Bar */}
        <div className="max-w-xl mx-auto mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder={language === "en" ? "Search by part name, number, or engine model..." : "Tafuta kwa jina la kipuri, nambari, au modeli ya injini..."}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:text-white"
            />
          </div>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(category.id)}
              className="relative"
            >
              {language === "en" ? category.name : category.nameSwahili}
              <span className="ml-2 text-xs bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded">
                {category.count}
              </span>
            </Button>
          ))}
        </div>

        {/* Loading State */}
        {isLoading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <Card key={i} className="animate-pulse">
                <CardHeader>
                  <div className="aspect-square bg-muted rounded-lg mb-4" />
                  <div className="h-4 bg-muted rounded w-3/4 mb-2" />
                  <div className="h-3 bg-muted rounded w-1/2" />
                </CardHeader>
                <CardContent>
                  <div className="h-3 bg-muted rounded w-full mb-4" />
                  <div className="h-8 bg-muted rounded" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : filteredParts.length === 0 ? (
          <div className="text-center py-12">
            <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-foreground mb-2">
              {language === "en" ? "No parts found" : "Hakuna vipuri vilivyopatikana"}
            </h3>
            <p className="text-muted-foreground">
              {language === "en" 
                ? "Try adjusting your search or filter criteria"
                : "Jaribu kubadilisha utafutaji wako au vigezo vya kuchuja"}
            </p>
          </div>
        ) : (
          <>
            {/* Products Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredParts.slice(0, 8).map((part) => {
                const stockStatus = getStockStatus(part.stock_quantity, part.lead_time_days);
                return (
                  <Card
                    key={part.id}
                    className="group hover:shadow-lg transition-all duration-300 border-border hover:border-blue-200 dark:hover:border-blue-800"
                  >
                    <CardHeader className="pb-2">
                      <div className="aspect-square bg-muted rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary/5 transition-colors relative overflow-hidden">
                        {part.primary_image_url ? (
                          <img
                            src={part.primary_image_url}
                            alt={part.name}
                            className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        ) : (
                          <Package className="h-16 w-16 text-muted-foreground" />
                        )}
                        <div className={`absolute top-2 right-2 ${stockStatus.color} text-white text-xs font-semibold px-2 py-1 rounded-full`}>
                          {stockStatus.label}
                        </div>
                      </div>
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <CardTitle className="text-base line-clamp-2">
                            {part.name}
                          </CardTitle>
                          <CardDescription className="text-sm">
                            {part.brand} • {part.part_number || part.model}
                          </CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                        {part.short_description || part.key_features?.[0] || 'Industrial spare part'}
                      </p>
                      <div className="flex items-center justify-between mb-4">
                        <Badge variant={stockStatus.variant} className={stockStatus.color.replace('bg-', '')}>
                          {stockStatus.label.split(':')[0]}
                        </Badge>
                        {part.price ? (
                          <span className="font-semibold text-primary">
                            {part.currency} {part.price.toLocaleString()}
                          </span>
                        ) : (
                          <span className="text-sm text-muted-foreground">
                            {language === "en" ? "Contact for price" : "Wasiliana kwa bei"}
                          </span>
                        )}
                      </div>
                      <div className="flex gap-2">
                        <Button
                          className="flex-1"
                          size="sm"
                          onClick={() => addToQuote(part)}
                        >
                          {t("products.requestQuote")}
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            // View details or compatibility
                            const message = `Hi, I need more details about ${part.name} (Part #${part.part_number || part.model}) for ${part.compatible_with?.[0] || 'my engine'}`;
                            window.open(
                              `https://wa.me/254718234222?text=${encodeURIComponent(message)}`,
                              "_blank"
                            );
                          }}
                        >
                          {language === "en" ? "Details" : "Maelezo"}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {/* View All Button */}
            {filteredParts.length > 8 && (
              <div className="text-center mt-12">
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => {
                    // Scroll to full catalog section or show more
                    document.querySelector("#full-catalog")?.scrollIntoView({ behavior: "smooth" });
                  }}
                >
                  {t("products.viewAll")} ({filteredParts.length})
                </Button>
              </div>
            )}
          </>
        )}

        {/* Combined Reference Note */}
        <div className="mt-12 p-6 bg-blue-50 dark:bg-blue-900/20 rounded-2xl border border-blue-200 dark:border-blue-800">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-foreground mb-2">
                {language === "en" 
                  ? "Can't find your part? Try our combined search"
                  : "Hauwezi kupata kipuri chako? Jaribu utafutaji wetu wa pamoja"}
              </h3>
              <p className="text-sm text-muted-foreground">
                {language === "en"
                  ? "Search across OEM numbers, cross-references, and local names"
                  : "Tafuta kwenye nambari za OEM, rejea mbadala, na majina ya kienyeji"}
              </p>
            </div>
            <Button
              onClick={() => {
                // Navigate to advanced search/compatibility checker
                document.querySelector("#compatibility")?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              {language === "en" ? "Advanced Search" : "Utafutaji wa Juu"}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Products;
