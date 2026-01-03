// src/components/landing/Portfolio.tsx
import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Calendar, Users, Zap, Settings, Wrench, Building, Factory } from "lucide-react";

const Portfolio = ({ language = 'en' }: { language?: 'en' | 'sw' }) => {
  const { t } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState("all");

  const portfolioProjects = [
    {
      id: 1,
      title: language === 'en' ? "Nairobi Hospital Backup Generator Installation" : "Usakinishaji wa Jenereta ya Backup ya Hospitali ya Nairobi",
      titleSwahili: "Usakinishaji wa Jenereta ya Backup ya Hospitali ya Nairobi",
      client: language === 'en' ? "Major Nairobi Hospital" : "Hospitali Kuu ya Nairobi",
      location: "Nairobi",
      category: "installation",
      equipment: "500kVA Lister Petter Genset",
      timeline: language === 'en' ? "3 days completion" : "Ukamilifu wa siku 3",
      description: language === 'en' 
        ? "Complete 500kVA generator installation with automatic transfer switch, ensuring uninterrupted power for critical hospital services. Project completed within strict deadlines."
        : "Usakinishaji kamili wa jenereta ya 500kVA na swichi ya kuhama otomatiki, kuhakikisha umeme usiokatizika kwa huduma muhimu za hospitali. Mradi umekamilika ndani ya muda uliowekwa.",
      features: [
        language === 'en' ? "Automatic transfer switch" : "Swichi ya kuhama otomatiki",
        language === 'en' ? "Soundproof enclosure" : "Boksi la kuzuia kelele",
        language === 'en' ? "Remote monitoring" : "Ufuatiliaji wa mbali",
        language === 'en' ? "Compliance with hospital standards" : "Kufuata viwango vya hospitali"
      ],
      icon: <Building className="h-6 w-6" />,
      color: "from-blue-500 to-blue-600"
    },
    {
      id: 2,
      title: language === 'en' ? "Industrial Plant Emergency Repair" : "Matengenezo ya Dharura ya Kiwanda cha Viwanda",
      titleSwahili: "Matengenezo ya Dharura ya Kiwanda cha Viwanda",
      client: language === 'en' ? "Manufacturing Facility, Thika" : "Kiwanda cha Uzalishaji, Thika",
      location: "Thika",
      category: "repair",
      equipment: "Lister Petter LPW4 Engine",
      timeline: language === 'en' ? "8 hours response" : "Jibu la masaa 8",
      description: language === 'en' 
        ? "Emergency breakdown response for critical production line engine failure. Diagnosed and replaced main bearings, restored full operation within 8 hours, preventing major production losses."
        : "Jibu la dharura la kushindwa kwa injini muhimu ya mstari wa uzalishaji. Imetambua na kubadilisha bearings kuu, kurejesha uendeshaji kamili ndani ya masaa 8, kuzuia hasara kubwa za uzalishaji.",
      features: [
        language === 'en' ? "Emergency response team" : "Timu ya dharura",
        language === 'en' ? "Genuine OEM parts" : "Vipuri halisi vya OEM",
        language === 'en' ? "On-site machining" : "Ufundi wa kwenye tovuti",
        language === 'en' ? "Preventive maintenance plan" : "Mpango wa matengenezo ya kuzuia"
      ],
      icon: <Wrench className="h-6 w-6" />,
      color: "from-green-500 to-green-600"
    },
    {
      id: 3,
      title: language === 'en' ? "University Campus Generator Rental" : "Ukodishaji wa Jenereta ya Chuo Kikuu",
      titleSwahili: "Ukodishaji wa Jenereta ya Chuo Kikuu",
      client: language === 'en' ? "Local University" : "Chuo Kikuu cha Ndani",
      location: "Kiambu",
      category: "rental",
      equipment: "100kVA Silent Generator",
      timeline: language === 'en' ? "7-day event support" : "Usaidizi wa hafla ya siku 7",
      description: language === 'en' 
        ? "Provided silent 100kVA generator rental for week-long university event with full fuel service and 24/7 technical support. Ensured zero power interruptions during critical examinations."
        : "Ulitoa ukodishaji wa jenereta ya kimya ya 100kVA kwa hafla ya chuo kikuu ya wiki moja na huduma kamili ya mafuta na usaidizi wa kiufundi 24/7. Kuhakikisha hakuna usumbufu wa umeme wakati wa mitihani muhimu.",
      features: [
        language === 'en' ? "Silent operation" : "Uendeshaji wa kimya",
        language === 'en' ? "Full fuel service" : "Huduma kamili ya mafuta",
        language === 'en' ? "24/7 onsite technician" : "Mhandisi wa tovuti 24/7",
        language === 'en' ? "Remote fuel monitoring" : "Ufuatiliaji wa mafuta wa mbali"
      ],
      icon: <Zap className="h-6 w-6" />,
      color: "from-purple-500 to-purple-600"
    },
    {
      id: 4,
      title: language === 'en' ? "Data Center Power System Upgrade" : "Uboreshaji wa Mfumo wa Nguvu wa Kituo cha Data",
      titleSwahili: "Uboreshaji wa Mfumo wa Nguvu wa Kituo cha Data",
      client: language === 'en' ? "Technology Company" : "Kampuni ya Teknolojia",
      location: "Nairobi",
      category: "upgrade",
      equipment: "2x 350kVA Parallel Gensets",
      timeline: language === 'en' ? "2 weeks installation" : "Usakinishaji wa wiki 2",
      description: language === 'en' 
        ? "Upgraded data center power system with parallel 350kVA generators for redundancy, new switchgear, and advanced monitoring system to ensure 99.99% uptime for critical servers."
        : "Uboreshaji wa mfumo wa nguvu wa kituo cha data na jenereta sambamba za 350kVA kwa ajili ya udhibiti, vifaa vipya vya kubadilisha, na mfumo wa juu wa ufuatiliaji kuhakikisha uptime ya 99.99% kwa seva muhimu.",
      features: [
        language === 'en' ? "Parallel operation" : "Uendeshaji sambamba",
        language === 'en' ? "Redundant system" : "Mfumo wa dhibiti",
        language === 'en' ? "Advanced monitoring" : "Ufuatiliaji wa juu",
        language === 'en' ? "Load testing" : "Kupima mzigo"
      ],
      icon: <Settings className="h-6 w-6" />,
      color: "from-amber-500 to-amber-600"
    },
    {
      id: 5,
      title: language === 'en' ? "Factory Preventive Maintenance Contract" : "Mkataba wa Matengenezo ya Kuzuia ya Kiwanda",
      titleSwahili: "Mkataba wa Matengenezo ya Kuzuia ya Kiwanda",
      client: language === 'en' ? "Food Processing Plant" : "Kiwanda cha Kusindika Chakula",
      location: "Thika",
      category: "maintenance",
      equipment: "Multiple Gensets & Engines",
      timeline: language === 'en' ? "12-month contract" : "Mkataba wa miezi 12",
      description: language === 'en' 
        : "Annual preventive maintenance contract for factory power systems including monthly inspections, oil analysis, load testing, and emergency support, reducing downtime by 85%.",
      descriptionSwahili: "Mkataba wa matengenezo ya kuzuia ya mwaka kwa mifumo ya nguvu ya kiwanda ikijumuisha ukaguzi wa kila mwezi, uchambuzi wa mafuta, kupima mzigo, na usaidizi wa dharura, kupunguza muda wa kusimamishwa kwa 85%.",
      features: [
        language === 'en' ? "Monthly inspections" : "Ukaguzi wa kila mwezi",
        language === 'en' ? "Oil analysis" : "Uchambuzi wa mafuta",
        language === 'en' ? "Predictive maintenance" : "Matengenezo ya kutabiri",
        language === 'en' ? "Spare parts inventory" : "Hisa ya vipuri"
      ],
      icon: <Calendar className="h-6 w-6" />,
      color: "from-red-500 to-red-600"
    },
    {
      id: 6,
      title: language === 'en' ? "Shopping Mall Emergency System" : "Mfumo wa Dharura wa Maduka Makubwa",
      titleSwahili: "Mfumo wa Dharura wa Maduka Makubwa",
      client: language === 'en' ? "Regional Shopping Mall" : "Maduka Makubwa ya Kikanda",
      location: "Kiambu",
      category: "installation",
      equipment: "800kVA Backup System",
      timeline: language === 'en' ? "4 weeks project" : "Mradi wa wiki 4",
      description: language === 'en' 
        ? "Complete emergency power system installation for regional shopping mall including generator, automatic transfer switches, and distributed UPS systems for critical tenants."
        : "Usakinishaji kamili wa mfumo wa nguvu wa dharura kwa maduka makubwa ya kikanda ikijumuisha jenereta, swichi za kuhama otomatiki, na mifumo ya UPS iliyogawanywa kwa wakodishi muhimu.",
      features: [
        language === 'en' ? "Distributed power" : "Nguvu iliyogawanywa",
        language === 'en' ? "Tenant-specific systems" : "Mifumo maalum ya wakodishi",
        language === 'en' ? "Fire system integration" : "Ujumuishaji wa mfumo wa moto",
        language === 'en' ? "Regular load testing" : "Kupima mzigo mara kwa mara"
      ],
      icon: <Factory className="h-6 w-6" />,
      color: "from-indigo-500 to-indigo-600"
    },
  ];

  const categories = [
    { id: "all", label: language === 'en' ? "All Projects" : "Miradi Yote", count: portfolioProjects.length },
    { id: "installation", label: language === 'en' ? "Installation" : "Usakinishaji", count: portfolioProjects.filter(p => p.category === "installation").length },
    { id: "repair", label: language === 'en' ? "Repair" : "Matengenezo", count: portfolioProjects.filter(p => p.category === "repair").length },
    { id: "rental", label: language === 'en' ? "Rental" : "Ukodishaji", count: portfolioProjects.filter(p => p.category === "rental").length },
    { id: "maintenance", label: language === 'en' ? "Maintenance" : "Matengenezo", count: portfolioProjects.filter(p => p.category === "maintenance").length },
  ];

  const filteredProjects = selectedCategory === "all" 
    ? portfolioProjects 
    : portfolioProjects.filter(project => project.category === selectedCategory);

  const getCategoryBadge = (category: string) => {
    const colors: Record<string, string> = {
      installation: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",
      repair: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300",
      rental: "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300",
      upgrade: "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300",
      maintenance: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300",
    };
    return colors[category] || "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300";
  };

  return (
    <section id="portfolio" className="py-20 bg-gradient-to-b from-white to-gray-50 dark:from-gray-800 dark:to-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <MapPin className="h-4 w-4" />
            <span>{language === 'en' ? "Our Projects" : "Miradi Yetu"}</span>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {t("portfolio.title")}
          </h2>
          <p className="text-gray-700 dark:text-gray-300 text-lg max-w-2xl mx-auto">
            {t("portfolio.subtitle") || (language === 'en' 
              ? "See how we've powered industries and kept businesses running across East Africa"
              : "Angalia jinsi tumeweka nguvu ya viwanda na kuweka biashara zinazofanya kazi Afrika Mashariki")}
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                selectedCategory === category.id
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
              }`}
            >
              {category.label}
              <span className="ml-2 bg-white/20 dark:bg-black/20 px-1.5 py-0.5 rounded text-xs">
                {category.count}
              </span>
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {filteredProjects.map((project) => (
            <Card
              key={project.id}
              className="group hover:shadow-2xl transition-all duration-300 border border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-500 overflow-hidden"
            >
              {/* Project Header */}
              <div className={`relative h-48 bg-gradient-to-br ${project.color} flex items-center justify-center`}>
                <div className="absolute inset-0 bg-black/20"></div>
                <div className="relative z-10 text-center p-4">
                  <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center mx-auto mb-4">
                    {project.icon}
                  </div>
                  <Badge className={`${getCategoryBadge(project.category)} backdrop-blur-sm`}>
                    {categories.find(c => c.id === project.category)?.label}
                  </Badge>
                </div>
              </div>

              <CardHeader className="pb-2">
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {language === "en" ? project.title : project.titleSwahili}
                    </CardTitle>
                    <CardDescription className="flex items-center gap-2 mt-2">
                      <MapPin className="h-3 w-3" />
                      <span>{project.location} • {project.client}</span>
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>

              <CardContent>
                <p className="text-sm text-gray-700 dark:text-gray-300 mb-4 line-clamp-3">
                  {language === "en" ? project.description : (project as any).descriptionSwahili || project.description}
                </p>
                
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 dark:text-gray-400 flex items-center gap-1">
                      <Settings className="h-3 w-3" />
                      Equipment:
                    </span>
                    <span className="font-medium text-gray-900 dark:text-white text-right">
                      {project.equipment}
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 dark:text-gray-400 flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      Timeline:
                    </span>
                    <span className="font-medium text-gray-900 dark:text-white">
                      {project.timeline}
                    </span>
                  </div>
                </div>

                {/* Features */}
                {project.features && (
                  <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                    <p className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-2">
                      {language === 'en' ? "Key Features:" : "Vipengele Muhimu:"}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {project.features.slice(0, 3).map((feature, index) => (
                        <span
                          key={index}
                          className="text-xs bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 px-2 py-1 rounded"
                        >
                          {feature}
                        </span>
                      ))}
                      {project.features.length > 3 && (
                        <span className="text-xs text-gray-500 dark:text-gray-500">
                          +{project.features.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 pt-16 border-t border-gray-200 dark:border-gray-700">
          {[
            { value: "500+", label: language === 'en' ? "Projects Completed" : "Miradi Imekamilika", icon: <Calendar className="h-6 w-6" /> },
            { value: "98%", label: language === 'en' ? "Client Satisfaction" : "Uridhishaji wa Mteja", icon: <Users className="h-6 w-6" /> },
            { value: "24/7", label: language === 'en' ? "Emergency Response" : "Jibu la Dharura", icon: <Zap className="h-6 w-6" /> },
            { value: "15+", label: language === 'en' ? "Years Experience" : "Miaka ya Uzoefu", icon: <Settings className="h-6 w-6" /> },
          ].map((stat, index) => (
            <div key={index} className="text-center p-6 bg-white/50 dark:bg-gray-800/50 rounded-2xl border border-gray-200 dark:border-gray-700">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center text-blue-600 dark:text-blue-400 mx-auto mb-3">
                {stat.icon}
              </div>
              <div className="text-3xl font-bold text-gray-900 dark:text-white">
                {stat.value}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <p className="text-gray-700 dark:text-gray-300 mb-6">
            {language === 'en' 
              ? "Ready to power your next project? Contact us for a consultation."
              : "Tayari kuwaka nguvu ya mradi wako unaofuata? Wasiliana nasi kwa ushauri."}
          </p>
          <button
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
          >
            <Phone className="h-4 w-4" />
            {language === 'en' ? "Discuss Your Project" : "Jadili Mradi Wako"}
          </button>
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
