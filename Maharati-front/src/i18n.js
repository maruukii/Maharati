import i18n from "i18next";
import detector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

import translationFR from "./locales/fr/translation.json";
import translationAR from "./locales/ar/translation.json";
import translationENG from "./locales/en/translation.json";

// the translations
const resources = {
  fr: {
    translation: translationFR,
  },
  ar: {
    translation: translationAR,
  },
  en: {
    translation: translationENG,
  },
};

const language = localStorage.getItem("I18N_LANGUAGE");
if (!language) {
  localStorage.setItem("I18N_LANGUAGE", "en");
}

i18n
  .use(detector)
  .use(initReactI18next)
  .init({
    resources,
    lng: localStorage.getItem("I18N_LANGUAGE") || "en",
    fallbackLng: "fr",

    keySeparator: false,

    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
