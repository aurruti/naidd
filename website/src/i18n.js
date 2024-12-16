import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import en from './locales/en.json';
import ca from './locales/ca.json';

i18n.use(initReactI18next).init({
  resources: {
    ca: { translation: ca },
    en: { translation: en },
  },
  lng: 'ca', // Default language
  fallbackLng: 'en', // Use this if the selected language doesn't have a key
  interpolation: { escapeValue: false },
});

export default i18n;
