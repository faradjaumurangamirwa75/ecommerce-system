
import React from "react";
import { useTranslation } from "react-i18next";

function LanguageSelector() {
  const { i18n } = useTranslation();

  const changeLanguage = (language) => {
    i18n.changeLanguage(language);
  };

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm font-semibold text-gray-700">
        🌍 Language:
      </span>

      <select
        value={i18n.resolvedLanguage || i18n.language}
        onChange={(e) => changeLanguage(e.target.value)}
        className="border border-gray-300 rounded-lg px-3 py-2 bg-white text-gray-800 outline-orange-500"
      >
        <option value="en">🇬🇧 English</option>
        <option value="rw">🇷🇼 Kinyarwanda</option>
        <option value="fr">🇫🇷 Français</option>
        <option value="sw">🇹🇿 Kiswahili</option>
      </select>
    </div>
  );
}

export default LanguageSelector;
