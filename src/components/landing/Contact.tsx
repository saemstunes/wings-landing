// src/components/landing/Contact.tsx
import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Phone, Mail, Clock, MessageCircle, Send } from "lucide-react";

const Contact = ({ language = 'en' }: { language?: 'en' | 'sw' }) => {
  const { t } = useLanguage();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    requestType: "",
    product: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          access_key: import.meta.env.VITE_WEB3FORMS_KEY || 'your-access-key',
          ...formData,
          subject: `Contact Form: ${formData.requestType || 'General Inquiry'}`,
        }),
      });

      if (response.ok) {
        alert(t("contact.success") || "Thank you! We'll respond within 24 hours.");
        setFormData({
          name: "",
          email: "",
          phone: "",
          company: "",
          requestType: "",
          product: "",
          message: "",
        });
      } else {
        throw new Error('Submission failed');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert(t("contact.error") || "There was an error submitting your request. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    { 
      icon: <MapPin className="h-5 w-5" />, 
      label: t("contact.info.address"), 
      description: language === 'en' ? "Thika, Nairobi County, Kenya" : "Thika, Kaunti ya Nairobi, Kenya" 
    },
    { 
      icon: <Phone className="h-5 w-5" />, 
      label: t("contact.info.phone"), 
      href: "tel:+254718234222",
      description: language === 'en' ? "Available 24/7 for emergencies" : "Inapatikana 24/7 kwa ajili ya dharura"
    },
    { 
      icon: <Mail className="h-5 w-5" />, 
      label: t("contact.info.email"), 
      href: "mailto:sales@wingsengineeringservices.com",
      description: language === 'en' ? "Quick response guaranteed" : "Jibu la haraka linalhakikishwa"
    },
    { 
      icon: <Clock className="h-5 w-5" />, 
      label: t("contact.info.hours"),
      description: language === 'en' ? "Mon-Fri: 8AM-6PM, Sat: 9AM-2PM" : "Jumatatu-Ijumaa: 8AM-6PM, Jumamosi: 9AM-2PM"
    },
  ];

  const requestTypes = [
    { value: "quote", label: language === 'en' ? "Request Quote" : "Omba Nukuu" },
    { value: "service", label: language === 'en' ? "Book Service" : "Huduma ya Kitabu" },
    { value: "parts", label: language === 'en' ? "Parts Inquiry" : "Uchunguzi wa Vipuri" },
    { value: "technical", label: language === 'en' ? "Technical Support" : "Usaidizi wa Kiufundi" },
    { value: "general", label: language === 'en' ? "General Inquiry" : "Uchunguzi wa Jumla" },
  ];

  return (
    <section id="contact" className="py-20 bg-gray-50 dark:bg-gray-800/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {t("contact.title")}
          </h2>
          <p className="text-gray-700 dark:text-gray-300 text-lg max-w-2xl mx-auto">
            {t("contact.subtitle")}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <Card className="border border-gray-200 dark:border-gray-700 shadow-xl">
            <CardHeader className="pb-4">
              <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white">
                {t("contact.form.submit")}
              </CardTitle>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                {language === 'en' 
                  ? "Fill out the form and we'll get back to you within 2 hours"
                  : "Jaza fomu na tutajibu ndani ya masaa 2"}
              </p>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-gray-800 dark:text-gray-200">
                      {t("contact.form.name")} *
                    </Label>
                    <Input
                      id="name"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="border-gray-300 dark:border-gray-600 dark:bg-gray-800"
                      placeholder={language === 'en' ? "Your full name" : "Jina lako kamili"}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-gray-800 dark:text-gray-200">
                      {t("contact.form.email")} *
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="border-gray-300 dark:border-gray-600 dark:bg-gray-800"
                      placeholder="email@example.com"
                    />
                  </div>
                </div>
                
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-gray-800 dark:text-gray-200">
                      {t("contact.form.phone")} *
                    </Label>
                    <Input
                      id="phone"
                      required
                      placeholder="+254 7XX XXX XXX"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="border-gray-300 dark:border-gray-600 dark:bg-gray-800"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="company" className="text-gray-800 dark:text-gray-200">
                      {t("contact.form.company")}
                    </Label>
                    <Input
                      id="company"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      className="border-gray-300 dark:border-gray-600 dark:bg-gray-800"
                      placeholder={language === 'en' ? "Company name (optional)" : "Jina la kampuni (hiari)"}
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label className="text-gray-800 dark:text-gray-200">
                    {t("contact.form.requestType")} *
                  </Label>
                  <Select
                    required
                    value={formData.requestType}
                    onValueChange={(value) => setFormData({ ...formData, requestType: value })}
                  >
                    <SelectTrigger className="border-gray-300 dark:border-gray-600 dark:bg-gray-800">
                      <SelectValue placeholder={language === 'en' ? "Select request type..." : "Chagua aina ya ombi..."} />
                    </SelectTrigger>
                    <SelectContent>
                      {requestTypes.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="product" className="text-gray-800 dark:text-gray-200">
                    {t("contact.form.product")}
                  </Label>
                  <Input
                    id="product"
                    value={formData.product}
                    onChange={(e) => setFormData({ ...formData, product: e.target.value })}
                    className="border-gray-300 dark:border-gray-600 dark:bg-gray-800"
                    placeholder={language === 'en' ? "Product/service of interest" : "Bidhaa/huduma ya kupendeza"}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="message" className="text-gray-800 dark:text-gray-200">
                    {t("contact.form.message")} *
                  </Label>
                  <Textarea
                    id="message"
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="border-gray-300 dark:border-gray-600 dark:bg-gray-800"
                    placeholder={language === 'en' 
                      ? "Tell us about your requirements, deadlines, or any specific needs..."
                      : "Tuambie kuhusu mahitaji yako, tarehe za mwisho, au mahitaji yoyote maalum..."}
                  />
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white gap-2"
                  disabled={isSubmitting}
                >
                  <Send className="h-4 w-4" />
                  {isSubmitting 
                    ? (language === 'en' ? "Sending..." : "Inatumwa...") 
                    : t("contact.form.submit")}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Contact Info */}
          <div className="space-y-6">
            <Card className="border border-gray-200 dark:border-gray-700 shadow-xl">
              <CardHeader className="pb-4">
                <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white">
                  {t("contact.info.title")}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {contactInfo.map((info, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center flex-shrink-0 text-blue-600 dark:text-blue-400">
                      {info.icon}
                    </div>
                    <div className="flex-1">
                      {info.href ? (
                        <a
                          href={info.href}
                          className="text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors text-lg font-medium block"
                        >
                          {info.label}
                        </a>
                      ) : (
                        <span className="text-gray-900 dark:text-white text-lg font-medium block">{info.label}</span>
                      )}
                      {info.description && (
                        <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
                          {info.description}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
                
                <Button
                  className="w-full bg-green-600 hover:bg-green-700 text-white gap-2 mt-4"
                  onClick={() => {
                    const message = language === 'en' 
                      ? "Hello Wings Engineering, I need assistance with..."
                      : "Habari Wings Engineering, Nahitaji usaidizi kuhusu...";
                    window.open(
                      `https://wa.me/254718234222?text=${encodeURIComponent(message)}`,
                      "_blank"
                    );
                  }}
                >
                  <MessageCircle className="h-5 w-5" />
                  {t("contact.info.whatsapp")}
                </Button>
              </CardContent>
            </Card>

            {/* Map */}
            <div className="rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 shadow-xl">
              <div className="aspect-video bg-gray-200 dark:bg-gray-700 relative">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.801281740277!2d37.0812494747242!3d-1.050809635565357!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f4e3e5f5f5f5f%3A0x5f5f5f5f5f5f5f5f!2sThika%2C%20Kenya!5e0!3m2!1sen!2ske!4v1234567890123"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Wings Engineering Location - Thika, Kenya"
                  className="absolute inset-0"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none"></div>
              </div>
              <div className="bg-white dark:bg-gray-800 p-4 border-t border-gray-200 dark:border-gray-700">
                <p className="text-gray-900 dark:text-white font-medium">
                  {language === 'en' ? "Our Location" : "Mahali Tulipo"}
                </p>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  {language === 'en' 
                    ? "Based in Thika, serving clients across Kenya & East Africa"
                    : "Tukiwakaa Thika, tunahudumia wateja kote Kenya & Afrika Mashariki"}
                </p>
              </div>
            </div>
            
            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6 border border-blue-200 dark:border-blue-800">
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                {language === 'en' ? "Response Time" : "Muda wa Kujibu"}
              </h4>
              <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>{language === 'en' ? "WhatsApp: Within minutes" : "WhatsApp: Ndani ya dakika"}</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                  <span>{language === 'en' ? "Phone calls: Immediate" : "Simu: Mara moja"}</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span>{language === 'en' ? "Email: Within 2 hours" : "Barua pepe: Ndani ya masaa 2"}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
