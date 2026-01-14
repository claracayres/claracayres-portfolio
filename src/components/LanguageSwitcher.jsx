import React from "react";
import { useTranslation } from "react-i18next";

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const toggleLanguage = () => {
    const newLang = i18n.language === "en" ? "pt" : "en";
    i18n.changeLanguage(newLang);
  };

  const currentFlag =
    i18n.language === "en" ? "/Flags/br.png" : "/Flags/us.png";
  const label = i18n.language === "en" ? "PT" : "EN";

  return (
    <button
      onClick={toggleLanguage}
      className="bg-purple/20 h-8 dark:bg-lightPurple/20 transition-colors hover:bg-purple/30 flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium"
    >
      <img src={currentFlag} alt="flag" className="h-5 w-5 rounded-full" />
      <span className="sm:inline">{label}</span>
    </button>
  );
};

export default LanguageSwitcher;
