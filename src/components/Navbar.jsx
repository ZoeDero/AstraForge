import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from './LanguageSwitcher';

const Navbar = ({ darkMode, toggleDarkMode }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { t, i18n } = useTranslation();

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

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrolled]);

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 cosmic-navbar ${scrolled ? 'scrolled' : ''}`}>
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
                <span className="text-xl font-bold text-white">
                  AstraForge
                </span>
              </Link>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-2">
              <Link 
                to="/" 
                className={`cosmic-nav-link ${location.pathname === '/' ? 'active' : ''}`}
              >
                {t('navbar.home')}
              </Link>
              <Link 
                to="/gallery" 
                className={`cosmic-nav-link ${location.pathname === '/gallery' ? 'active' : ''}`}
              >
                {t('navbar.gallery')}
              </Link>
              <Link 
                to="/pricing" 
                className={`cosmic-nav-link ${location.pathname === '/pricing' ? 'active' : ''}`}
              >
                {t('navbar.pricing')}
              </Link>
              <Link 
                to="/contact" 
                className={`cosmic-nav-link ${location.pathname === '/contact' ? 'active' : ''}`}
              >
                {t('navbar.contact')}
              </Link>
              <Link 
                to="/blog" 
                className={`cosmic-nav-link ${location.pathname === '/blog' ? 'active' : ''}`}
              >
                {t('navbar.blog')}
              </Link>
            </div>
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:items-center">
            <LanguageSwitcher />
            <button
              onClick={toggleDarkMode}
              className="ml-4 p-2 rounded-full text-white hover:text-orange-300 focus:outline-none transition-colors duration-200 hover:bg-white/10"
              aria-label="Toggle dark mode"
            >
              {darkMode ? (
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              ) : (
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              )}
            </button>
          </div>
          <div className="-mr-2 flex items-center sm:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-orange-300 hover:bg-white/10 focus:outline-none transition-colors duration-200"
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
        <div className="sm:hidden cosmic-mobile-menu">
          <div className="pt-2 pb-3 space-y-1">
            <Link 
              to="/" 
              className={`cosmic-mobile-link block pl-3 pr-4 py-2 text-base font-medium ${location.pathname === '/' ? 'active' : ''}`} 
              onClick={toggleMenu}
            >
              {t('navbar.home')}
            </Link>
            <Link 
              to="/gallery" 
              className={`cosmic-mobile-link block pl-3 pr-4 py-2 text-base font-medium ${location.pathname === '/gallery' ? 'active' : ''}`} 
              onClick={toggleMenu}
            >
              {t('navbar.gallery')}
            </Link>
            <Link 
              to="/pricing" 
              className={`cosmic-mobile-link block pl-3 pr-4 py-2 text-base font-medium ${location.pathname === '/pricing' ? 'active' : ''}`} 
              onClick={toggleMenu}
            >
              {t('navbar.pricing')}
            </Link>
            <Link 
              to="/contact" 
              className={`cosmic-mobile-link block pl-3 pr-4 py-2 text-base font-medium ${location.pathname === '/contact' ? 'active' : ''}`} 
              onClick={toggleMenu}
            >
              {t('navbar.contact')}
            </Link>
            <Link 
              to="/blog" 
              className={`cosmic-mobile-link block pl-3 pr-4 py-2 text-base font-medium ${location.pathname === '/blog' ? 'active' : ''}`} 
              onClick={toggleMenu}
            >
              {t('navbar.blog')}
            </Link>
            <button
              onClick={() => {
                toggleDarkMode();
                toggleMenu();
              }}
              className="cosmic-mobile-link block pl-3 pr-4 py-2 text-base font-medium w-full text-left"
            >
              {darkMode ? t('navbar.lightMode') : t('navbar.darkMode')}
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
