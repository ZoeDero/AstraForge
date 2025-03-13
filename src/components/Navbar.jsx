import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from './LanguageSwitcher';

const Navbar = ({ darkMode, toggleDarkMode }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { t, i18n } = useTranslation(undefined, { useSuspense: false });

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    document.addEventListener('scroll', handleScroll);
    return () => {
      document.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'backdrop-blur-md shadow-md py-3 bg-transparent' : 'bg-transparent py-5'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link to="/" className="flex items-center">
                <img 
                  src="/assets/img/favicon.png" 
                  alt="AstraForge Logo" 
                  className="h-8 w-auto mr-2" 
                />
                <span className={`text-xl font-bold ${scrolled || location.pathname !== '/' ? 'text-gray-800 dark:text-white' : 'text-white'}`}>
                  AstraForge
                </span>
              </Link>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link 
                to="/" 
                className={`${location.pathname === '/' ? 'border-indigo-500 dark:border-indigo-400' : 'border-transparent'} ${scrolled || location.pathname !== '/' ? 'text-gray-900 dark:text-gray-300' : 'text-white'} hover:border-gray-300 dark:hover:border-gray-700 hover:text-gray-900 dark:hover:text-white inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors duration-200`}
              >
                {t('navbar.home')}
              </Link>
              <Link 
                to="/gallery" 
                className={`${location.pathname === '/gallery' ? 'border-indigo-500 dark:border-indigo-400' : 'border-transparent'} ${scrolled || location.pathname !== '/' ? 'text-gray-900 dark:text-gray-300' : 'text-white'} hover:border-gray-300 dark:hover:border-gray-700 hover:text-gray-900 dark:hover:text-white inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors duration-200`}
              >
                {t('navbar.gallery')}
              </Link>
              <Link 
                to="/pricing" 
                className={`${location.pathname === '/pricing' ? 'border-indigo-500 dark:border-indigo-400' : 'border-transparent'} ${scrolled || location.pathname !== '/' ? 'text-gray-900 dark:text-gray-300' : 'text-white'} hover:border-gray-300 dark:hover:border-gray-700 hover:text-gray-900 dark:hover:text-white inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors duration-200`}
              >
                {t('navbar.pricing')}
              </Link>
              <Link 
                to="/contact" 
                className={`${location.pathname === '/contact' ? 'border-indigo-500 dark:border-indigo-400' : 'border-transparent'} ${scrolled || location.pathname !== '/' ? 'text-gray-900 dark:text-gray-300' : 'text-white'} hover:border-gray-300 dark:hover:border-gray-700 hover:text-gray-900 dark:hover:text-white inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors duration-200`}
              >
                {t('navbar.contact')}
              </Link>
              <Link 
                to="/blog" 
                className={`${location.pathname === '/blog' ? 'border-indigo-500 dark:border-indigo-400' : 'border-transparent'} ${scrolled || location.pathname !== '/' ? 'text-gray-900 dark:text-gray-300' : 'text-white'} hover:border-gray-300 dark:hover:border-gray-700 hover:text-gray-900 dark:hover:text-white inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors duration-200`}
              >
                {t('navbar.blog')}
              </Link>
            </div>
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:items-center">
            <LanguageSwitcher />
            <button
              onClick={toggleDarkMode}
              className={`ml-4 p-1 rounded-full ${scrolled || location.pathname !== '/' ? 'text-gray-700 dark:text-gray-300' : 'text-white'} hover:text-gray-900 dark:hover:text-white focus:outline-none transition-colors duration-200`}
              aria-label="Toggle dark mode"
            >
              {darkMode ? (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              ) : (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              )}
            </button>
          </div>
          <div className="-mr-2 flex items-center sm:hidden">
            <button
              onClick={toggleMenu}
              className={`inline-flex items-center justify-center p-2 rounded-md ${scrolled || location.pathname !== '/' ? 'text-gray-400 hover:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800' : 'text-white hover:text-gray-200 hover:bg-gray-800/30'} focus:outline-none transition-colors duration-200`}
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="sm:hidden bg-white dark:bg-gray-900 shadow-lg">
          <div className="pt-2 pb-3 space-y-1">
            <Link 
              to="/" 
              className={`${location.pathname === '/' ? 'bg-indigo-50 dark:bg-indigo-900/30 border-indigo-500 text-indigo-700 dark:text-indigo-300' : 'border-transparent text-gray-500 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 hover:border-gray-300 dark:hover:border-gray-700 hover:text-gray-700 dark:hover:text-white'} block pl-3 pr-4 py-2 border-l-4 text-base font-medium transition-colors duration-200`} 
              onClick={toggleMenu}
            >
              {t('navbar.home')}
            </Link>
            <Link 
              to="/gallery" 
              className={`${location.pathname === '/gallery' ? 'bg-indigo-50 dark:bg-indigo-900/30 border-indigo-500 text-indigo-700 dark:text-indigo-300' : 'border-transparent text-gray-500 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 hover:border-gray-300 dark:hover:border-gray-700 hover:text-gray-700 dark:hover:text-white'} block pl-3 pr-4 py-2 border-l-4 text-base font-medium transition-colors duration-200`} 
              onClick={toggleMenu}
            >
              {t('navbar.gallery')}
            </Link>
            <Link 
              to="/pricing" 
              className={`${location.pathname === '/pricing' ? 'bg-indigo-50 dark:bg-indigo-900/30 border-indigo-500 text-indigo-700 dark:text-indigo-300' : 'border-transparent text-gray-500 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 hover:border-gray-300 dark:hover:border-gray-700 hover:text-gray-700 dark:hover:text-white'} block pl-3 pr-4 py-2 border-l-4 text-base font-medium transition-colors duration-200`} 
              onClick={toggleMenu}
            >
              {t('navbar.pricing')}
            </Link>
            <Link 
              to="/contact" 
              className={`${location.pathname === '/contact' ? 'bg-indigo-50 dark:bg-indigo-900/30 border-indigo-500 text-indigo-700 dark:text-indigo-300' : 'border-transparent text-gray-500 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 hover:border-gray-300 dark:hover:border-gray-700 hover:text-gray-700 dark:hover:text-white'} block pl-3 pr-4 py-2 border-l-4 text-base font-medium transition-colors duration-200`} 
              onClick={toggleMenu}
            >
              {t('navbar.contact')}
            </Link>
            <Link 
              to="/blog" 
              className={`${location.pathname === '/blog' ? 'bg-indigo-50 dark:bg-indigo-900/30 border-indigo-500 text-indigo-700 dark:text-indigo-300' : 'border-transparent text-gray-500 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 hover:border-gray-300 dark:hover:border-gray-700 hover:text-gray-700 dark:hover:text-white'} block pl-3 pr-4 py-2 border-l-4 text-base font-medium transition-colors duration-200`} 
              onClick={toggleMenu}
            >
              {t('navbar.blog')}
            </Link>
            <button
              onClick={() => {
                toggleDarkMode();
                toggleMenu();
              }}
              className="border-transparent text-gray-500 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 hover:border-gray-300 dark:hover:border-gray-700 hover:text-gray-700 dark:hover:text-white block pl-3 pr-4 py-2 border-l-4 text-base font-medium w-full text-left transition-colors duration-200"
            >
              {darkMode ? 'Mode Clair' : 'Mode Sombre'}
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
