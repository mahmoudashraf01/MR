import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// EN
import enLanding from "./locales/en/landing.json";
import enAbout from "./locales/en/about.json";
import enContact from "./locales/en/contact.json";

// FR
import frLanding from "./locales/fr/landing.json";
import frAbout from "./locales/fr/about.json";
import frContact from "./locales/fr/contact.json";

i18n.use(initReactI18next).init({
  resources: {
    en: {
      landing: enLanding,
      about: enAbout,
      contact: enContact
    },
    fr: {
      landing: frLanding,
      about: frAbout,
      contact: frContact
    }
  },

  lng: localStorage.getItem("i18nextLng") || "en",
  fallbackLng: "en",

  ns: ["landing", "about", "contact"],
  defaultNS: "landing",

  interpolation: {
    escapeValue: false
  }
});

export default i18n;