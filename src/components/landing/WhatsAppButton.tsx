import { useLanguage } from "@/contexts/LanguageContext";
import { MessageCircle } from "lucide-react";

const WhatsAppButton = () => {
  const { t } = useLanguage();

  const openWhatsApp = () => {
    const message = encodeURIComponent(t("whatsapp.prefilledMessage"));
    window.open(`https://wa.me/254718234222?text=${message}`, "_blank");
  };

  return (
    <button
      onClick={openWhatsApp}
      className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-[#25D366] hover:bg-[#20BD5A] text-white rounded-full shadow-lg flex items-center justify-center transition-all hover:scale-110 animate-pulse"
      aria-label={t("whatsapp.tooltip")}
      title={t("whatsapp.tooltip")}
    >
      <MessageCircle className="h-7 w-7" />
    </button>
  );
};

export default WhatsAppButton;
