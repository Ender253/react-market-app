import i18n from 'i18next';
import { initReactI18next } from "react-i18next";

import translationENs from "./locales/EN/translationENs.json";
import translationRO from './locales/RO/translationRO.json';


const resources = {
  en: {
    translation: translationENs,
  },
  ro:{
    translation: translationRO,
  }
 
};

i18n.use(initReactI18next).init({
  resources,
  lng: "ro",

  keySeparator: false,

  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
