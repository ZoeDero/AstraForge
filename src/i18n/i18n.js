import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Import des fichiers de traduction
import translationFR from './locales/fr.json';
import translationEN from './locales/en.json';

// Les ressources de traduction
const resources = {
  fr: translationFR,
  en: translationEN
};

// Configuration initiale d'i18next
i18n
  // Détection automatique de la langue du navigateur
  .use(LanguageDetector)
  // Intégration avec React
  .use(initReactI18next)
  // Initialisation de i18next
  .init({
    resources,
    fallbackLng: 'fr', // Langue par défaut
    debug: true, // Activer les logs de debug pour identifier les problèmes
    
    // Namespace par défaut
    defaultNS: 'translation',
    
    // Interpolation
    interpolation: {
      escapeValue: false, // Non nécessaire pour React
    },
    
    // Options de détection de langue
    detection: {
      order: ['localStorage', 'navigator'],
      lookupLocalStorage: 'preferred-language',
      caches: ['localStorage'],
    },
    
    // Réagir aux changements de langue
    react: {
      useSuspense: true,
      wait: true
    }
  });

// Fonction d'aide pour changer de langue
export const changeLanguage = (lng) => {
  return i18n.changeLanguage(lng);
};

export default i18n;
