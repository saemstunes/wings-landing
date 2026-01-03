// src/components/landing/Services.tsx
import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Zap, Wrench, Settings, Calendar, AlertCircle, FileText, 
  Truck, Search, Shield, Clock, Package, Users 
} from "lucide-react";

const Services = ({ language = 'en' }: { language?: 'en' | 'sw' }) => {
  const { t } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState("all");

  const services = [
    {
      id: 1,
      name: language === 'en' ? "Generator Sales & Hire" : "Mauzo ya Jenereta na Kukodisha",
      nameSwahili: "Mauzo ya Jenereta na Kukodisha",
      icon: "Zap",
      category: "sales",
      description: language === 'en' 
        ? "New and refurbished diesel generators from 10kVA to 2000kVA. Short-term hire and long-term leasing options with full maintenance included."
        : "Jenereta mpya za dizeli na zilizorekebishwa kutoka 10kVA hadi 2000kVA. Chaguo la kukodisha muda mfupi na muda mrefu na matengenezo kamili yamejumuishwa.",
      features: [
        language === 'en' ? "10kVA - 2000kVA range" : "Aina ya 10kVA - 2000kVA",
        language === 'en' ? "New & refurbished units" : "Vifaa vipya na vilivyorekebishwa",
        language === 'en' ? "Short & long term hire" : "Kukodisha muda mfupi na mrefu",
        language === 'en' ? "Delivery & installation" : "Uwasilishaji na usakinishaji",
        language === 'en' ? "Full maintenance included" : "Matengenezo kamili yamejumuishwa"
      ],
      color: "from-blue-500 to-blue-600"
    },
    {
      id: 2,
      name: language === 'en' ? "Engine Repair & Spare Parts" : "Matengenezo ya Injini na Vipuri",
      nameSwahili: "Matengenezo ya Injini na Vipuri",
      icon: "Wrench",
      category: "repair",
      description: language === 'en' 
        ? "Complete engine overhaul services and genuine Lister Petter parts sourcing. Specialized in industrial diesel engines with on-site repair capabilities."
        : "Huduma kamili za ukarabati wa injini na usambazaji wa vipuri halisi vya Lister Petter. Maalum katika injini za dizeli za viwanda na uwezo wa matengenezo kwenye tovuti.",
      features: [
        language === 'en' ? "Complete engine overhauls" : "Ukarabati kamili wa injini",
        language === 'en' ? "Genuine Lister Petter parts" : "Vipuri halisi vya Lister Petter",
        language === 'en' ? "On-site repair service" : "Huduma ya matengenezo kwenye tovuti",
        language === 'en' ? "Diagnostic testing" : "Upimaji wa utambuzi",
        language === 'en' ? "Performance optimization" : "Uboreshaji wa utendaji"
      ],
      color: "from-green-500 to-green-600"
    },
    {
      id: 3,
      name: language === 'en' ? "Installation & Commissioning" : "Usakinishaji na Kuanzishwa",
      nameSwahili: "Usakinishaji na Kuanzishwa",
      icon: "Settings",
      category: "installation",
      description: language === 'en' 
        ? "Professional generator installation including site surveys, electrical integration, control panel setup, and complete commissioning with staff training."
        : "Usakinishaji wa kitaalam wa jenereta ukijumuisha uchunguzi wa tovuti, uunganishaji wa umeme, usanidi wa paneli ya udhibiti, na kuanzishwa kamili na mafunzo ya wafanyikazi.",
      features: [
        language === 'en' ? "Site surveys & planning" : "Uchunguzi wa tovuti na kupanga",
        language === 'en' ? "Electrical integration" : "Uunganishaji wa umeme",
        language === 'en' ? "Control panel setup" : "Kusanidi paneli ya udhibiti",
        language === 'en' ? "Complete commissioning" : "Kuanzishwa kamili",
        language === 'en' ? "Staff training" : "Mafunzo ya wafanyikazi"
      ],
      color: "from-purple-500 to-purple-600"
    },
    {
      id: 4,
      name: language === 'en' ? "Preventative Maintenance" : "Matengenezo ya Kuzuia",
      nameSwahili: "Matengenezo ya Kuzuia",
      icon: "Calendar",
      category: "maintenance",
      description: language === 'en' 
        ? "Scheduled maintenance contracts with regular site visits, oil analysis, load testing, and performance monitoring to prevent unexpected breakdowns."
        : "Mikataba ya matengenezo iliyopangwa na ziara za kawaida za tovuti, uchambuzi wa mafuta, kupima mzigo, na ufuatiliaji wa utendaji kuzuia kuvunjika kwa ghafla.",
      features: [
        language === 'en' ? "Scheduled site visits" : "Ziara za kawaida za tovuti",
        language === 'en' ? "Oil & filter analysis" : "Uchambuzi wa mafuta na vichujio",
        language === 'en' ? "Load bank testing" : "Kupima mzigo wa benki",
        language === 'en' ? "Performance reports" : "Ripoti za utendaji",
        language === 'en' ? "Priority emergency response" : "Jibu la kipaumbele la dharura"
      ],
      color: "from-amber-500 to-amber-600"
    },
    {
      id: 5,
      name: language === 'en' ? "Emergency Breakdown Support" : "Usaidizi wa Dharura wa Kuvunjika",
      nameSwahili: "Usaidizi wa Dharura wa Kuvunjika",
      icon: "AlertCircle",
      category: "emergency",
      description: language === 'en' 
        ? "24/7 emergency response for critical plant outages. Rapid deployment of technical teams with mobile workshop capabilities to minimize downtime."
        : "Jibu la dharura 24/7 kwa kukatika kwa umeme muhimu wa kiwanda. Upelekaji wa haraka wa timu za kiufundi na uwezo wa warsha ya rununu kupunguza muda wa kusimamishwa.",
      features: [
        language === 'en' ? "24/7 emergency response" : "Jibu la dharura 24/7",
        language === 'en' ? "2-hour response time guarantee" : "Dhamana ya muda wa kujibu wa masaa 2",
        language === 'en' ? "Mobile workshop vans" : "Magari ya warsha ya rununu",
        language === 'en' ? "Critical parts inventory" : "Hisa ya vipuri muhimu",
        language === 'en' ? "Temporary power solutions" : "Suluhisho za muda za umeme"
      ],
      color: "from-red-500 to-red-600"
    },
    {
      id: 6,
      name: language === 'en' ? "Consultation & Energy Audits" : "Ushauri na Ukaguzi wa Nishati",
      nameSwahili: "Ushauri na Ukaguzi wa Nishati",
      icon: "FileText",
      category: "consultation",
      description: language === 'en' 
        ? "Technical consultation services and comprehensive energy audits to optimize power systems, improve efficiency, and reduce operational costs."
        : "Huduma za ushauri wa kiufundi na ukaguzi kamili wa nishati kuongeza ufanisi wa mifumo ya nguvu, kuboresha ufanisi, na kupunguza gharama za uendeshaji.",
      features: [
        language === 'en' ? "Power system analysis" : "Uchambuzi wa mfumo wa nguvu",
        language === 'en' ? "Energy efficiency audits" : "Ukaguzi wa ufanisi wa nishati",
        language === 'en' ? "Load profiling" : "Uchambuzi wa mzigo",
        language === 'en' ? "Cost reduction strategies" : "Mikakati ya kupunguza gharama",
        language === 'en' ? "Upgrade recommendations" : "Mapendekezo ya uboreshaji"
      ],
      color: "from-indigo-500 to-indigo-600"
    },
  ];

  const serviceCategories = [
    { id: "all", label: language === 'en' ? "All Services" : "Huduma Zote", icon: <Settings className="h-4 w-4" /> },
    { id: "sales", label: language === 'en' ? "Sales & Hire" : "Mauzo na Kukodisha", icon: <Truck className="h-4 w-4" /> },
    { id: "repair", label: language === 'en' ? "Repair & Parts" : "Matengenezo na Vipuri", icon: <Wrench className="h-4 w-4" /> },
    { id: "installation", label: language === 'en' ? "Installation" : "Usakinishaji", icon: <Settings className="h-4 w-4" /> },
    { id: "maintenance", label: language === 'en' ? "Maintenance" : "Matengenezo", icon: <Calendar className="h-4 w-4" /> },
    { id: "emergency", label: language === 'en' ? "Emergency" : "Dharura", icon: <AlertCircle className="h-4 w-4" /> },
  ];

  const iconMap: Record<string, React.ReactNode> = {
    Zap: <Zap className="h-8 w-8" />,
    Wrench: <Wrench className="h-8 w-8" />,
    Settings: <Settings className="h-8 w-8" />,
    Calendar: <Calendar className="h-8 w-8" />,
    AlertCircle: <AlertCircle className="h-8 w-8" />,
    FileText: <FileText className="h-8 w-8" />,
    Truck: <Truck className="h-8 w-8" />,
    Search: <Search className="h-8 w-8" />,
    Shield: <Shield className="h-8 w-8" />,
    Clock: <Clock className="h-8 w-8" />,
    Package: <Package className="h-8 w-8" />,
    Users: <Users className="h-8 w-8" />,
  };

  const filteredServices = selectedCategory === "all" 
    ? services 
    : services.filter(service => service.category === selectedCategory);

  const serviceStats = [
    { value: "2,500+", label: language === 'en' ? "Parts in Stock" : "Vipuri Vinapatikana", icon: <Package className="h-5 w-5" /> },
    { value: "15+", label: language === 'en' ? "Years Experience" : "Miaka ya Uzoefu", icon: <Calendar className="h-5 w-5" /> },
    { value: "500+", label: language === 'en' ? "Projects Completed" : "Miradi Imekamilika", icon: <Settings className="h-5 w-5" /> },
    { value: "24/7", label: language === 'en' ? "Support Available" : "Usaidizi Unapatikana", icon: <Clock className="h-5 w-5" /> },
  ];

  return (
    <section id="services" className="py-20 bg-gradient-to-b from-white to-gray-50 dark:from-gray-800 dark:to-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Settings className="h-4 w-4" />
            <span>{language === 'en' ? "Our Services" : "Huduma Zetu"}</span>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {t("services.title")}
          </h2>
          <p className="text-gray-700 dark:text-gray-300 text-lg max-w-2xl mx-auto">
            {t("services.subtitle") || (language === 'en' 
              ? "Comprehensive engineering solutions for industrial power systems across East Africa"
              : "Suluhisho kamili za uhandisi kwa mifumo ya nguvu ya viwanda Afrika Mashariki")}
          </p>
        </div>

        {/* Service Categories */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {serviceCategories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                selectedCategory === category.id
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
              }`}
            >
              {category.icon}
              {category.label}
            </button>
          ))}
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {filteredServices.map((service) => (
            <Card
              key={service.id}
              className="group hover:shadow-2xl transition-all duration-300 border border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-500 overflow-hidden"
            >
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-14 h-14 bg-gradient-to-br ${service.color} rounded-xl flex items-center justify-center text-white`}>
                    {iconMap[service.icon]}
                  </div>
                  <span className={`text-xs font-medium px-3 py-1 rounded-full bg-gradient-to-r ${service.color} text-white`}>
                    {serviceCategories.find(c => c.id === service.category)?.label}
                  </span>
                </div>
                <CardTitle className="text-xl group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {language === "en" ? service.name : service.nameSwahili}
                </CardTitle>
                <CardDescription className="text-gray-700 dark:text-gray-300">
                  {service.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 mb-6">
                  {service.features.map((feature, index) => (
                    <li key={index} className="text-sm text-gray-700 dark:text-gray-300 flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
                <div className="flex gap-2">
                  <Button
                    variant="default"
                    className="flex-1 bg-blue-600 hover:bg-blue-700"
                    onClick={() => {
                      document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
                    }}
                  >
                    {language === 'en' ? "Book Service" : "Huduma ya Kitabu"}
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => {
                      const message = `I'm interested in ${service.name} service. Can you provide more details and pricing?`;
                      window.open(
                        `https://wa.me/254718234222?text=${encodeURIComponent(message)}`,
                        "_blank"
                      );
                    }}
                  >
                    {language === 'en' ? "WhatsApp" : "WhatsApp"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Service Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          {serviceStats.map((stat, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800/50 rounded-2xl p-6 border border-gray-200 dark:border-gray-700 text-center hover:shadow-xl transition-all"
            >
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center text-blue-600 dark:text-blue-400 mx-auto mb-3">
                {stat.icon}
              </div>
              <div className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                {stat.value}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Service Process */}
        <div className="backdrop-blur-xl bg-white/80 dark:bg-gray-800/80 rounded-2xl p-8 border border-gray-200 dark:border-gray-700 shadow-lg">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white text-center mb-8">
            {language === 'en' ? "Our Service Process" : "Mchakato Wetu wa Huduma"}
          </h3>
          
          <div className="grid md:grid-cols-4 gap-6">
            {[
              {
                step: "1",
                title: language === 'en' ? "Consultation" : "Ushauri",
                description: language === 'en' 
                  ? "Discuss your requirements and site assessment"
                  : "Jadili mahitaji yako na tathmini ya tovuti"
              },
              {
                step: "2",
                title: language === 'en' ? "Solution Design" : "Ubunifu wa Suluhisho",
                description: language === 'en' 
                  ? "Custom solution proposal with detailed quote"
                  : "Pendekezo la suluhisho maalum na nukuu ya kina"
              },
              {
                step: "3",
                title: language === 'en' ? "Implementation" : "Utendaji",
                description: language === 'en' 
                  ? "Professional installation & commissioning"
                  : "Usakinishaji wa kitaalam na kuanzishwa"
              },
              {
                step: "4",
                title: language === 'en' ? "Support" : "Usaidizi",
                description: language === 'en' 
                  ? "Ongoing maintenance & 24/7 emergency support"
                  : "Matengenezo ya kuendelea & usaidizi wa dharura 24/7"
              },
            ].map((process, index) => (
              <div key={index} className="text-center relative">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center text-white font-bold text-xl mx-auto mb-4">
                  {process.step}
                </div>
                {index < 3 && (
                  <div className="hidden md:block absolute top-6 left-3/4 w-full h-0.5 bg-gradient-to-r from-blue-500 to-purple-500"></div>
                )}
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                  {process.title}
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {process.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <div className="inline-flex flex-col sm:flex-row items-center justify-center gap-6 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
            <div className="text-left">
              <h3 className="text-2xl font-bold mb-2">
                {language === 'en' ? "Need Immediate Assistance?" : "Unahitaji Usaidizi wa Haraka?"}
              </h3>
              <p className="text-blue-100">
                {language === 'en' 
                  ? "Our 24/7 emergency team is ready to respond within 2 hours"
                  : "Timu yetu ya dharura 24/7 iko tayari kujibu ndani ya masaa 2"}
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                size="lg"
                variant="secondary"
                className="bg-white text-blue-600 hover:bg-gray-100 gap-2"
                onClick={() => window.open('tel:+254718234222', '_blank')}
              >
                <Phone className="h-4 w-4" />
                +254 718 234 222
              </Button>
              <Button
                size="lg"
                className="bg-green-600 hover:bg-green-700 text-white gap-2"
                onClick={() => window.open('https://wa.me/254718234222', '_blank')}
              >
                <MessageCircle className="h-4 w-4" />
                {language === 'en' ? "WhatsApp Now" : "WhatsApp Sasa"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
