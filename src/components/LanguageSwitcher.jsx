import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { changeLanguage } from '../i18n/i18n';

/**
 * Composant LanguageSwitcher - Permet aux utilisateurs de changer la langue du site
 * @returns {JSX.Element} - Sélecteur de langue
 */
const LanguageSwitcher = () => {
  // Utilisation du hook useTranslation de react-i18next
  const { i18n } = useTranslation();
  
  // Liste des langues disponibles
  const languages = [
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
    { code: 'en', name: 'English', flag: '🇬🇧' },
    { code: 'es', name: 'Español', flag: '🇪🇸' }
  ];
  
  // État pour la langue actuelle et l'état du menu déroulant
  const [currentLang, setCurrentLang] = useState(i18n.language || 'fr');
  const [isOpen, setIsOpen] = useState(false);
  
  // Charger la langue depuis le localStorage au chargement
  useEffect(() => {
    const savedLang = localStorage.getItem('preferred-language');
    if (savedLang) {
      setCurrentLang(savedLang);
      changeLanguage(savedLang);
    }
  }, []);
  
  // Fonction pour changer de langue
  const handleLanguageChange = (langCode) => {
    console.log('Changing language to:', langCode);
    setCurrentLang(langCode);
    changeLanguage(langCode);
    localStorage.setItem('preferred-language', langCode);
    setIsOpen(false);
    
    // Mettre à jour l'attribut lang du document HTML
    document.documentElement.lang = langCode;
  };
  
  // Obtenir la langue actuelle
  const getCurrentLanguage = () => {
    return languages.find(lang => lang.code === currentLang) || languages[0];
  };
  
  return (
    <div className="relative inline-block text-left">
      <button
        type="button"
        className="inline-flex justify-center items-center w-full rounded-md border border-gray-300 dark:border-gray-600 shadow-sm px-4 py-2 bg-white dark:bg-gray-800 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <span className="mr-1">{getCurrentLanguage().flag}</span>
        <span>{getCurrentLanguage().name}</span>
        <svg className="ml-2 -mr-1 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
          <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
        </svg>
      </button>

      {isOpen && (
        <div
          className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 focus:outline-none z-10"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="options-menu"
        >
          <div className="py-1" role="none">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => handleLanguageChange(lang.code)}
                className={`${
                  currentLang === lang.code ? 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white' : 'text-gray-700 dark:text-gray-200'
                } flex items-center w-full px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200`}
                role="menuitem"
              >
                <span className="mr-2">{lang.flag}</span>
                {lang.name}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default LanguageSwitcher;
