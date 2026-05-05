import { useTranslation } from "react-i18next";

export function useLanguage() {
  const { i18n } = useTranslation();

  const language = i18n.language;

  function toggleLanguage() {
    const nextLanguage = language === "pt" ? "en" : "pt";
    i18n.changeLanguage(nextLanguage);
  }

  return {
    language,
    toggleLanguage,
  };
}