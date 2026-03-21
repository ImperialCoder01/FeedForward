import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Globe } from "lucide-react";

export function LanguageSwitcher() {
  const { i18n } = useTranslation();

  const toggleLanguage = () => {
    const nextLang = i18n.language === 'en' ? 'hi' : 'en';
    i18n.changeLanguage(nextLang);
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      className="hidden md:flex items-center gap-2 text-muted-foreground hover:text-foreground"
      onClick={toggleLanguage}
    >
      <Globe className="h-4 w-4" />
      <span>{i18n.language === 'en' ? 'HI' : 'EN'}</span>
    </Button>
  );
}
