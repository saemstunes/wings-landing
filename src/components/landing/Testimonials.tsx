// src/components/landing/Testimonials.tsx
import { useState, useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Card, CardContent } from "@/components/ui/card";
import { Star, Quote, Building, Factory, Hospital, University } from "lucide-react";

const Testimonials = ({ language = 'en' }: { language?: 'en' | 'sw' }) => {
  const { t } = useLanguage();
  const [activeIndex, setActiveIndex] = useState(0);

  const testimonials = [
    {
      id: 1,
      quote: language === 'en' 
        ? "Wings Engineering provided exceptional service during our emergency generator failure. Their technician arrived within 2 hours and had us back online the same day. Highly professional and reliable!"
        : "Wings Engineering ilitoa huduma bora wakati wa kushindwa kwa jenereta yetu ya dharura. Mhandisi wao alifika ndani ya masaa 2 na tukarudishwa mtandaoni siku hiyo hiyo. Kitaalamu sana na ya kuaminika!",
      quoteSwahili: "Wings Engineering ilitoa huduma bora wakati wa kushindwa kwa jenereta yetu ya dharura. Mhandisi wao alifika ndani ya masaa 2 na tukarudishwa mtandaoni siku hiyo hiyo. Kitaalamu sana na ya kuaminika!",
      clientName: "John Kamau",
      role: language === 'en' ? "Facilities Manager" : "Meneja wa Vifaa",
      company: "Thika Manufacturing Ltd",
      rating: 5,
      icon: <Factory className="h-6 w-6" />,
      color: "from-blue-500 to-blue-600"
    },
    {
      id: 2,
      quote: language === 'en' 
        ? "We have been sourcing our Lister Petter spare parts from Wings Engineering for over 5 years. Their parts are always genuine, prices are competitive, and delivery is prompt. Excellent partner!"
        : "Tumekuwa tukinunua vipuri vyetu vya Lister Petter kutoka Wings Engineering kwa zaidi ya miaka 5. Vipuri vyao daima ni halisi, bei ni mzinga, na uwasilishaji ni wa haraka. Mshirika bora!",
      quoteSwahili: "Tumekuwa tukinunua vipuri vyetu vya Lister Petter kutoka Wings Engineering kwa zaidi ya miaka 5. Vipuri vyao daima ni halisi, bei ni mzinga, na uwasilishaji ni wa haraka. Mshirika bora!",
      clientName: "Mary Wanjiku",
      role: language === 'en' ? "Procurement Officer" : "Afisa wa Ununuzi",
      company: "Nairobi Industrial Supplies",
      rating: 5,
      icon: <Building className="h-6 w-6" />,
      color: "from-green-500 to-green-600"
    },
    {
      id: 3,
      quote: language === 'en' 
        ? "The installation team was professional and thorough. They completed our 200kVA generator installation ahead of schedule and provided comprehensive training for our staff. Highly recommend!"
        : "Timu ya usakinishaji ilikuwa kitaalamu na makini. Walikamilisha usakinishaji wetu wa jenereta ya 200kVA kabla ya ratiba na wakatoa mafunzo kamili kwa wafanyikazi wetu. Ninasihi sana!",
      quoteSwahili: "Timu ya usakinishaji ilikuwa kitaalamu na makini. Walikamilisha usakinishaji wetu wa jenereta ya 200kVA kabla ya ratiba na wakatoa mafunzo kamili kwa wafanyikazi wetu. Ninasihi sana!",
      clientName: "Peter Ochieng",
      role: language === 'en' ? "Technical Director" : "Mkurugenzi wa Kiufundi",
      company: "Mombasa Port Authority",
      rating: 5,
      icon: <Hospital className="h-6 w-6" />,
      color: "from-purple-500 to-purple-600"
    },
    {
      id: 4,
      quote: language === 'en' 
        ? "Their preventative maintenance program has saved us thousands in emergency repairs. Regular service keeps our generators running efficiently with zero unexpected downtime."
        : "Mpango wao wa matengenezo ya kuzuia umetuokoa maelfu katika matengenezo ya dharura. Huduma ya kawaida inaweka jenereta zetu zinazofanya kazi kwa ufanisi bila muda wowote wa kusimamishwa usiyotarajiwa.",
      quoteSwahili: "Mpango wao wa matengenezo ya kuzuia umetuokoa maelfu katika matengenezo ya dharura. Huduma ya kawaida inaweka jenereta zetu zinazofanya kazi kwa ufanisi bila muda wowote wa kusimamishwa usiyotarajiwa.",
      clientName: "Sarah Mwangi",
      role: language === 'en' ? "Operations Director" : "Mkurugenzi wa Uendeshaji",
      company: "Kenya Logistics Ltd",
      rating: 5,
      icon: <University className="h-6 w-6" />,
      color: "from-amber-500 to-amber-600"
    },
  ];

  const stats = [
    { value: "500+", label: language === 'en' ? "Satisfied Clients" : "Wateja Walioridhika" },
    { value: "98%", label: language === 'en' ? "Retention Rate" : "Kiwango cha Kuzuia" },
    { value: "24/7", label: language === 'en' ? "Support Response" : "Jibu la Usaidizi" },
    { value: "15+", label: language === 'en' ? "Years Service" : "Miaka ya Huduma" },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white dark:from-gray-800 dark:to-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Quote className="h-4 w-4" />
            <span>{language === 'en' ? "Client Testimonials" : "Usuhuba wa Wateja"}</span>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {t("testimonials.title")}
          </h2>
          <p className="text-gray-700 dark:text-gray-300 text-lg max-w-2xl mx-auto">
            {t("testimonials.subtitle") || (language === 'en' 
              ? "Hear from businesses and organizations we've powered across East Africa"
              : "Sikia kutoka kwa biashara na mashirika tuliyoweka nguvu Afrika Mashariki")}
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          {/* Main Testimonial */}
          <div className="lg:col-span-2">
            <div className="relative h-full">
              <div className="absolute -top-4 -left-4 text-blue-200 dark:text-blue-900/30">
                <Quote className="h-24 w-24" />
              </div>
              
              <Card className="border-0 shadow-2xl h-full backdrop-blur-sm bg-white/80 dark:bg-gray-800/80">
                <CardContent className="pt-12 pb-8 px-8 h-full flex flex-col">
                  <Quote className="h-8 w-8 text-blue-400 mb-6" />
                  
                  <p className="text-xl text-gray-800 dark:text-gray-200 italic leading-relaxed mb-8 flex-1">
                    "{language === "en" ? testimonials[activeIndex].quote : testimonials[activeIndex].quoteSwahili}"
                  </p>
                  
                  <div className="flex items-center gap-1 mb-4">
                    {Array.from({ length: testimonials[activeIndex].rating }).map((_, i) => (
                      <Star
                        key={i}
                        className="h-5 w-5 fill-yellow-400 text-yellow-400"
                      />
                    ))}
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 bg-gradient-to-br ${testimonials[activeIndex].color} rounded-xl flex items-center justify-center text-white`}>
                      {testimonials[activeIndex].icon}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-white">
                        {testimonials[activeIndex].clientName}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {testimonials[activeIndex].role}, {testimonials[activeIndex].company}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Testimonial List */}
          <div className="space-y-4">
            {testimonials.map((testimonial, index) => (
              <button
                key={testimonial.id}
                onClick={() => setActiveIndex(index)}
                className={`w-full text-left p-6 rounded-xl border transition-all ${
                  activeIndex === index
                    ? "border-blue-300 dark:border-blue-500 bg-blue-50 dark:bg-blue-900/20"
                    : "border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600"
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className={`w-10 h-10 bg-gradient-to-br ${testimonial.color} rounded-lg flex items-center justify-center text-white flex-shrink-0`}>
                    {testimonial.icon}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-700 dark:text-gray-300 line-clamp-2 mb-2">
                      "{language === "en" ? testimonial.quote.split(' ').slice(0, 15).join(' ') + '...' : testimonial.quoteSwahili.split(' ').slice(0, 15).join(' ') + '...'}"
                    </p>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-900 dark:text-white">
                          {testimonial.clientName}
                        </p>
                        <p className="text-xs text-gray-600 dark:text-gray-400">
                          {testimonial.company}
                        </p>
                      </div>
                      <div className="flex items-center gap-1">
                        {Array.from({ length: testimonial.rating }).map((_, i) => (
                          <Star
                            key={i}
                            className="h-3 w-3 fill-yellow-400 text-yellow-400"
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800/50 rounded-2xl p-6 border border-gray-200 dark:border-gray-700 text-center hover:shadow-xl transition-all"
            >
              <div className="text-3xl md:text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                {stat.value}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Client Logos */}
        <div className="backdrop-blur-xl bg-white/80 dark:bg-gray-800/80 rounded-2xl p-8 border border-gray-200 dark:border-gray-700">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white text-center mb-8">
            {language === 'en' ? "Trusted by Industry Leaders" : "Tunaminika na Viongozi wa Tasnia"}
          </h3>
          
          <div className="grid grid-cols-3 md:grid-cols-6 gap-6">
            {[
              "Thika Manufacturing",
              "Nairobi Hospital",
              "Kenya Ports",
              "University of Nairobi",
              "Safaricom",
              "Kenya Power"
            ].map((client, index) => (
              <div
                key={index}
                className="bg-gray-100 dark:bg-gray-800/50 rounded-xl p-4 flex items-center justify-center hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              >
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300 text-center">
                  {client}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="text-center md:text-left">
                <p className="text-gray-900 dark:text-white font-semibold mb-2">
                  {language === 'en' ? "Ready to experience our service?" : "Tayari kujionea huduma yetu?"}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {language === 'en' 
                    ? "Join hundreds of satisfied clients across East Africa"
                    : "Jiunge na mamia ya wateja walioridhika Afrika Mashariki"}
                </p>
              </div>
              
              <button
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
              >
                {language === 'en' ? "Become a Client" : "Kuwa Mteja"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
