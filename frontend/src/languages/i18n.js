
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import en from "./translations/en.json";
import rw from "./translations/rw.json";
import fr from "./translations/fr.json";
import sw from "./translations/sw.json";

const savedLanguage = localStorage.getItem("faradja-language") || "en";

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      rw: { translation: rw },
      fr: { translation: fr },
      sw: { translation: sw },
    },

    lng: savedLanguage,
    fallbackLng: "en",

    interpolation: {
      escapeValue: false,
    },
  });

i18n.on("languageChanged", (language) => {
  localStorage.setItem("faradja-language", language);
});

export default i18n;
