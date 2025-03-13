import React, { useState, useEffect } from 'react';

/**
 * Composant AccessibilityWidget - Widget d'accessibilité pour améliorer l'expérience utilisateur
 * @returns {JSX.Element} - Widget d'accessibilité flottant
 */
const AccessibilityWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [settings, setSettings] = useState({
    fontSize: 'normal',
    contrast: 'normal',
    animations: true,
    dyslexicFont: false
  });

  // Appliquer les paramètres d'accessibilité au chargement
  useEffect(() => {
    // Charger les paramètres depuis le localStorage s'ils existent
    const savedSettings = localStorage.getItem('accessibility-settings');
    if (savedSettings) {
      const parsedSettings = JSON.parse(savedSettings);
      setSettings(parsedSettings);
      applySettings(parsedSettings);
    }
  }, []);

  // Appliquer les paramètres lorsqu'ils changent
  useEffect(() => {
    applySettings(settings);
    // Sauvegarder les paramètres dans le localStorage
    localStorage.setItem('accessibility-settings', JSON.stringify(settings));
  }, [settings]);

  // Fonction pour appliquer les paramètres d'accessibilité
  const applySettings = (currentSettings) => {
    const htmlElement = document.documentElement;
    
    // Appliquer la taille de police
    switch (currentSettings.fontSize) {
      case 'large':
        htmlElement.style.setProperty('--font-size-multiplier', '1.2');
        break;
      case 'larger':
        htmlElement.style.setProperty('--font-size-multiplier', '1.4');
        break;
      case 'normal':
      default:
        htmlElement.style.setProperty('--font-size-multiplier', '1');
        break;
    }
    
    // Appliquer le contraste
    switch (currentSettings.contrast) {
      case 'high':
        htmlElement.classList.add('high-contrast');
        htmlElement.classList.remove('dark-contrast');
        break;
      case 'dark':
        htmlElement.classList.add('dark-contrast');
        htmlElement.classList.remove('high-contrast');
        break;
      case 'normal':
      default:
        htmlElement.classList.remove('high-contrast', 'dark-contrast');
        break;
    }
    
    // Appliquer les animations
    if (!currentSettings.animations) {
      htmlElement.classList.add('reduce-motion');
    } else {
      htmlElement.classList.remove('reduce-motion');
    }
    
    // Appliquer la police pour dyslexiques
    if (currentSettings.dyslexicFont) {
      htmlElement.classList.add('dyslexic-font');
    } else {
      htmlElement.classList.remove('dyslexic-font');
    }
  };

  // Fonction pour mettre à jour un paramètre
  const updateSetting = (key, value) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  // Fonction pour réinitialiser tous les paramètres
  const resetSettings = () => {
    const defaultSettings = {
      fontSize: 'normal',
      contrast: 'normal',
      animations: true,
      dyslexicFont: false
    };
    setSettings(defaultSettings);
  };

  return (
    <div className="fixed bottom-4 left-4 z-50">
      {/* Bouton d'accessibilité */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-600 text-white shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200"
        aria-label="Options d'accessibilité"
      >
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      </button>
      
      {/* Panneau d'accessibilité */}
      {isOpen && (
        <div className="absolute bottom-16 left-0 w-72 bg-white dark:bg-gray-800 rounded-lg shadow-xl overflow-hidden transition-all duration-300 ease-in-out">
          {/* En-tête */}
          <div className="bg-blue-600 dark:bg-blue-700 p-4 text-white">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium">Accessibilité</h3>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white hover:text-gray-200 focus:outline-none"
                aria-label="Fermer le panneau d'accessibilité"
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
          
          {/* Corps du panneau */}
          <div className="p-4 space-y-4">
            {/* Taille de police */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Taille du texte
              </label>
              <div className="flex space-x-2">
                <button
                  onClick={() => updateSetting('fontSize', 'normal')}
                  className={`px-3 py-1 rounded-md text-sm ${
                    settings.fontSize === 'normal'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
                  }`}
                >
                  Normal
                </button>
                <button
                  onClick={() => updateSetting('fontSize', 'large')}
                  className={`px-3 py-1 rounded-md text-sm ${
                    settings.fontSize === 'large'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
                  }`}
                >
                  Grand
                </button>
                <button
                  onClick={() => updateSetting('fontSize', 'larger')}
                  className={`px-3 py-1 rounded-md text-sm ${
                    settings.fontSize === 'larger'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
                  }`}
                >
                  Très grand
                </button>
              </div>
            </div>
            
            {/* Contraste */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Contraste
              </label>
              <div className="flex space-x-2">
                <button
                  onClick={() => updateSetting('contrast', 'normal')}
                  className={`px-3 py-1 rounded-md text-sm ${
                    settings.contrast === 'normal'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
                  }`}
                >
                  Normal
                </button>
                <button
                  onClick={() => updateSetting('contrast', 'high')}
                  className={`px-3 py-1 rounded-md text-sm ${
                    settings.contrast === 'high'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
                  }`}
                >
                  Élevé
                </button>
                <button
                  onClick={() => updateSetting('contrast', 'dark')}
                  className={`px-3 py-1 rounded-md text-sm ${
                    settings.contrast === 'dark'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
                  }`}
                >
                  Sombre
                </button>
              </div>
            </div>
            
            {/* Animations */}
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Animations
              </label>
              <div className="relative inline-block w-10 mr-2 align-middle select-none">
                <input
                  type="checkbox"
                  id="toggle-animations"
                  checked={settings.animations}
                  onChange={() => updateSetting('animations', !settings.animations)}
                  className="sr-only"
                />
                <label
                  htmlFor="toggle-animations"
                  className={`block overflow-hidden h-6 rounded-full cursor-pointer transition-colors duration-200 ease-in ${
                    settings.animations ? 'bg-blue-600' : 'bg-gray-300 dark:bg-gray-600'
                  }`}
                >
                  <span
                    className={`block h-6 w-6 rounded-full bg-white shadow transform transition-transform duration-200 ease-in ${
                      settings.animations ? 'translate-x-4' : 'translate-x-0'
                    }`}
                  ></span>
                </label>
              </div>
            </div>
            
            {/* Police pour dyslexiques */}
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Police pour dyslexiques
              </label>
              <div className="relative inline-block w-10 mr-2 align-middle select-none">
                <input
                  type="checkbox"
                  id="toggle-dyslexic"
                  checked={settings.dyslexicFont}
                  onChange={() => updateSetting('dyslexicFont', !settings.dyslexicFont)}
                  className="sr-only"
                />
                <label
                  htmlFor="toggle-dyslexic"
                  className={`block overflow-hidden h-6 rounded-full cursor-pointer transition-colors duration-200 ease-in ${
                    settings.dyslexicFont ? 'bg-blue-600' : 'bg-gray-300 dark:bg-gray-600'
                  }`}
                >
                  <span
                    className={`block h-6 w-6 rounded-full bg-white shadow transform transition-transform duration-200 ease-in ${
                      settings.dyslexicFont ? 'translate-x-4' : 'translate-x-0'
                    }`}
                  ></span>
                </label>
              </div>
            </div>
            
            {/* Bouton de réinitialisation */}
            <div className="pt-2">
              <button
                onClick={resetSettings}
                className="w-full flex justify-center items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
              >
                <svg className="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Réinitialiser
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AccessibilityWidget;
