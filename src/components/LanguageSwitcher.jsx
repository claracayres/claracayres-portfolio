import React from "react";
import { useTranslation } from "react-i18next";

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const toggleLanguage = () => {
    const newLang = i18n.language === "en" ? "pt" : "en";
    i18n.changeLanguage(newLang);
  };

  const currentFlag = i18n.language === "en" ? "/Flags/br.png" : "/Flags/us.png";
  const label = i18n.language === "en" ? "PT" : "EN";

  return (
    <button
      onClick={toggleLanguage}
      className="flex items-center gap-2 rounded-lg bg-purple/20 px-3 py-2 text-sm font-medium transition-colors hover:bg-purple/30"
    >
      <img src={currentFlag} alt="flag" className="w-5 h-5 rounded-full" />
      <span className="sm:inline">{label}</span>
    </button>
  );
};

export default LanguageSwitcher;
