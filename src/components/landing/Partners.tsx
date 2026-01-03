// src/components/landing/Partners.tsx
import { useLanguage } from "@/contexts/LanguageContext";
import { Building2, Shield, Award, BadgeCheck, Star, Globe } from "lucide-react";

const Partners = ({ language = 'en' }: { language?: 'en' | 'sw' }) => {
  const { t } = useLanguage();

  const partners = [
    {
      name: "Lister Petter",
      logo: "LP",
      description: language === 'en' ? "Certified Parts & Service" : "Vipuri na Huduma Vilivyoidhinishwa",
      icon: <Award className="h-8 w-8" />,
      color: "from-blue-500 to-blue-600"
    },
    {
      name: "Perkins",
      logo: "P",
      description: language === 'en' ? "Authorized Distributor" : "Msambazaji Mwenye Idhini",
      icon: <BadgeCheck className="h-8 w-8" />,
      color: "from-red-500 to-red-600"
    },
    {
      name: "Davis & Shirtliff",
      logo: "DS",
      description: language === 'en' ? "Water Solutions Partner" : "Mshirika wa Suluhisho za Maji",
      icon: <Building2 className="h-8 w-8" />,
      color: "from-green-500 to-green-600"
    },
    {
      name: "Kenya Power",
      logo: "KP",
      description: language === 'en' ? "Energy Solutions" : "Suluhisho za Nishati",
      icon: <Shield className="h-8 w-8" />,
      color: "from-yellow-500 to-yellow-600"
    },
    {
      name: "Safaricom",
      logo: "S",
      description: language === 'en' ? "Telecommunications Partner" : "Mshirika wa Mawasiliano",
      icon: <Globe className="h-8 w-8" />,
      color: "from-green-500 to-emerald-600"
    },
    {
      name: "KEBS",
      logo: "KB",
      description: language === 'en' ? "Quality Standards Certified" : "Viwango vya Ubora Vimeidhinishwa",
      icon: <Star className="h-8 w-8" />,
      color: "from-purple-500 to-purple-600"
    },
  ];

  const certifications = [
    { label: language === 'en' ? "ISO 9001:2015 Certified" : "Imeidhinishwa ISO 9001:2015", color: "border-blue-500" },
    { label: language === 'en' ? "Lister Petter Certified" : "Imeidhinishwa na Lister Petter", color: "border-green-500" },
    { label: language === 'en' ? "Kenya Registered Business" : "Biashara Imeandikishwa Kenya", color: "border-yellow-500" },
    { label: language === 'en' ? "NEMA Compliant" : "Inatii NEMA", color: "border-purple-500" },
  ];

  return (
    <section className="py-16 bg-gradient-to-r from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 border-y border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Shield className="h-4 w-4" />
            <span>{language === 'en' ? "Trusted Partner" : "Mshirika Mwenye Kuaminika"}</span>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {t("partners.title")}
          </h2>
          <p className="text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
            {language === 'en' 
              ? "Collaborating with industry leaders to deliver premium engineering solutions across East Africa"
              : "Kushirikiana na wakubwa wa tasnia kutoa suluhisho bora za uhandisi Afrika Mashariki"}
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-12">
          {partners.map((partner, index) => (
            <div
              key={index}
              className="group relative backdrop-blur-sm bg-white/50 dark:bg-gray-800/50 rounded-2xl p-6 border border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-500 transition-all hover:shadow-xl hover:-translate-y-1"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${partner.color} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity`}></div>
              <div className="relative">
                <div className="w-16 h-16 mx-auto mb-4">
                  <div className={`w-full h-full bg-gradient-to-br ${partner.color} rounded-xl flex items-center justify-center text-white`}>
                    {partner.icon}
                  </div>
                </div>
                <div className="text-center">
                  <div className="font-bold text-gray-900 dark:text-white text-lg mb-1">
                    {partner.name}
                  </div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">
                    {partner.description}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Certifications & Accreditations */}
        <div className="backdrop-blur-xl bg-white/80 dark:bg-gray-800/80 rounded-2xl p-8 border border-gray-200 dark:border-gray-700 shadow-lg">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white text-center mb-6">
            {language === 'en' ? "Certifications & Accreditations" : "Vidhibitisho na Idhini"}
          </h3>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {certifications.map((cert, index) => (
              <div
                key={index}
                className={`p-4 rounded-xl border-2 ${cert.color} bg-white/50 dark:bg-gray-800/50 flex items-center justify-center text-center`}
              >
                <span className="text-sm font-medium text-gray-900 dark:text-white">
                  {cert.label}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="text-center md:text-left">
                <p className="text-gray-900 dark:text-white font-semibold mb-2">
                  {language === 'en' ? "Operational Coverage" : "Eneo la Uendeshaji"}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {language === 'en' 
                    ? "Serving Thika, Nairobi, Kiambu & surrounding counties with mobile service teams"
                    : "Tunahudumia Thika, Nairobi, Kiambu na kaunti zilizoko karibu na timu za huduma za rununu"}
                </p>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                    <BadgeCheck className="h-5 w-5 text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">
                      {language === 'en' ? "Verified Business" : "Biashara Iliyohakikiwa"}
                    </p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      {language === 'en' ? "Legal & Compliant" : "Kisheria na Inatii"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Industry Experience */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              title: language === 'en' ? "15+ Years Experience" : "Uzoefu wa Zaidi ya Miaka 15",
              description: language === 'en' 
                ? "Deep expertise in industrial engines & power solutions"
                : "Uzoefu wa kina katika injini za viwanda na suluhisho za umeme"
            },
            {
              title: language === 'en' ? "500+ Projects" : "Miradi 500+",
              description: language === 'en' 
                ? "Successfully completed industrial projects"
                : "Miradi ya viwanda imekamilika kwa mafanikio"
            },
            {
              title: language === 'en' ? "24/7 Support" : "Usaidizi 24/7",
              description: language === 'en' 
                ? "Round-the-clock emergency response"
                : "Jibu la dharura masaa 24"
            }
          ].map((item, index) => (
            <div key={index} className="text-center p-6 bg-gradient-to-br from-blue-50 to-white dark:from-gray-800 dark:to-gray-900 rounded-2xl border border-blue-100 dark:border-gray-700">
              <p className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                {item.title.split(' ')[0]}
              </p>
              <p className="text-gray-900 dark:text-white font-semibold mb-2">
                {item.title.split(' ').slice(1).join(' ')}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Partners;
