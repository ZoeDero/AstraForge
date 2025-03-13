import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import TiltCard from './TiltCard';
import ParticlesHeader from './ParticlesHeader';
import '../styles/cosmic-forge-theme.css';
import '../styles/animations.css';

const Home = () => {
  const { t } = useTranslation();
  const starsRef = useRef(null);
  const nebulaRef = useRef(null);
  const forgeRef = useRef(null);
  const shootingStarsRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const scrollCountRef = useRef(0);

  useEffect(() => {
    // Marquer le chargement après un court délai pour permettre les animations d'entrée
    setTimeout(() => setIsLoaded(true), 300);

    // Create stars
    const starsContainer = starsRef.current;
    if (starsContainer) {
      for (let i = 0; i < 150; i++) {
        const star = document.createElement('div');
        star.classList.add('star');
        star.style.width = `${Math.random() * 3 + 1}px`;
        star.style.height = star.style.width;
        star.style.left = `${Math.random() * 100}%`;
        star.style.top = `${Math.random() * 100}%`;
        star.style.animationDelay = `${Math.random() * 4}s`;
        star.style.animationDuration = `${Math.random() * 3 + 2}s`;
        starsContainer.appendChild(star);
      }
    }

    // Fonction pour créer une étoile filante
    const createShootingStar = (container, startX, startY, angle, speed) => {
      if (!container) return null;
      
      // Couleurs possibles pour les étoiles filantes
      const colors = [
        'var(--forge-orange)', 
        'var(--forge-red)', 
        'var(--star-white)',
        'var(--forge-glow)'
      ];
      
      // Créer l'étoile filante
      const star = document.createElement('div');
      star.classList.add('shooting-star');
      
      // Taille aléatoire entre 0.2px et 1px
      const size = Math.random() * 0.8 + 0.2;
      star.style.width = `${size}px`;
      star.style.height = `${size}px`;
      
      // Position de départ
      star.style.left = `${startX}px`;
      star.style.top = `${startY}px`;
      
      // Couleur aléatoire
      const color = colors[Math.floor(Math.random() * colors.length)];
      star.style.backgroundColor = color;
      star.style.boxShadow = `0 0 ${size * 6}px ${size * 2}px ${color}`;
      
      // Longueur de traînée proportionnelle à la vitesse
      const tailLength = speed * 10;
      star.style.setProperty('--tail-length', `${tailLength}px`);
      star.style.setProperty('--tail-color', color);
      
      // Appliquer l'angle et la vitesse
      star.style.setProperty('--angle', `${angle}deg`);
      star.style.setProperty('--speed', `${speed}`);
      
      // Ajouter au conteneur
      container.appendChild(star);
      
      // Supprimer après l'animation
      setTimeout(() => {
        if (star.parentNode === container) {
          container.removeChild(star);
        }
      }, 1000);
      
      return star;
    };

    // Gestionnaire d'événement de défilement
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const scrollDiff = Math.abs(currentScrollY - lastScrollY);
      setLastScrollY(currentScrollY);
      
      // Ne créer des étoiles filantes que si le défilement est significatif
      if (scrollDiff < 5) return;
      
      // Incrémenter le compteur de défilement
      scrollCountRef.current += 1;
      
      // Ne créer des étoiles filantes que tous les 3 défilements
      if (scrollCountRef.current < 3) return;
      
      // Réinitialiser le compteur
      scrollCountRef.current = 0;
      
      const container = shootingStarsRef.current;
      if (!container) return;
      
      // Nombre aléatoire d'étoiles filantes entre 1 et 3
      const starsCount = Math.floor(Math.random() * 3) + 1;
      
      // Direction basée sur le sens du défilement (vers le haut ou vers le bas)
      const scrollDirection = currentScrollY > lastScrollY ? 1 : -1;
      
      for (let i = 0; i < starsCount; i++) {
        // Position aléatoire sur l'écran
        const startX = Math.random() * window.innerWidth;
        const startY = Math.random() * window.innerHeight;
        
        // Angle basé sur la direction du défilement avec variation aléatoire
        const baseAngle = scrollDirection > 0 ? 45 : 135;
        const angle = baseAngle + (Math.random() * 50 - 25);
        
        // Vitesse basée sur la vitesse de défilement avec variation aléatoire
        const speed = (scrollDiff / 10) + (Math.random() * 2) + 1;
        
        // Créer l'étoile filante
        createShootingStar(container, startX, startY, angle, speed);
      }
    };

    // Ajouter l'écouteur d'événement
    window.addEventListener('scroll', handleScroll);

    // Create forge sparks
    const forgeContainer = forgeRef.current;
    if (forgeContainer) {
      for (let i = 0; i < 80; i++) {
        const spark = document.createElement('div');
        spark.classList.add('spark');
        spark.style.width = `${Math.random() * 6 + 2}px`;
        spark.style.height = spark.style.width;
        spark.style.left = `${Math.random() * 100}%`;
        spark.style.bottom = `${Math.random() * 20}%`;
        spark.style.animationDelay = `${Math.random() * 3}s`;
        spark.style.animationDuration = `${Math.random() * 2 + 2}s`;
        forgeContainer.appendChild(spark);
      }
    }

    // Effet de nébuleuse animée
    const nebulaContainer = nebulaRef.current;
    if (nebulaContainer) {
      nebulaContainer.style.opacity = '0.3';
      nebulaContainer.classList.add('cosmic-pulse');
    }

    // Nettoyage
    return () => {
      // Nettoyage des éléments lors du démontage du composant
      if (starsContainer) starsContainer.innerHTML = '';
      if (forgeContainer) forgeContainer.innerHTML = '';
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollY]);

  return (
    <div className="min-h-screen">
      {/* Hero Section with Cosmic Theme */}
      <div className={`relative overflow-hidden min-h-screen ${isLoaded ? 'fade-in' : ''}`}>
        <ParticlesHeader />
        <div className="absolute inset-0 z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
            <div className={`text-center md:text-left ${isLoaded ? 'slide-up' : ''}`}>
              <h1 className="cosmic-title text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl">
                <span className="block">Astra Forge</span>
                <span className="block text-amber-500">Créativité & Innovation</span>
              </h1>
              <p className="mt-3 max-w-md mx-auto text-base cosmic-text sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
                Chez AstraForge, nous transformons vos visions en réalités numériques captivantes. Notre approche créative et personnalisée vous garantit un résultat unique qui fait briller votre marque et engage votre audience.
              </p>
              <div className="mt-5 sm:mt-8 sm:flex sm:justify-center md:justify-start">
                <div className="shadow">
                  <Link to="/contact" className="forge-glass-button w-full flex items-center justify-center px-8 py-3 text-base font-medium rounded-[7px] hover-lift">
                    Contactez-nous
                  </Link>
                </div>
                <div className="mt-3 sm:mt-0 sm:ml-3">
                  <Link to="/gallery" className="forge-hammer-button w-full flex items-center justify-center px-8 py-3 text-base font-medium rounded-[7px] hover-lift">
                    Voir nos réalisations
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Services Section */}
      <div id="services" className="py-12 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center ${isLoaded ? 'slide-up delay-300' : ''}`}>
            <h2 className="cosmic-title text-3xl font-extrabold sm:text-4xl ">
              Ce que nous faisons pour vous
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-xl cosmic-text">
              Des solutions créatives qui font briller votre marque
            </p>
          </div>

          <div className="mt-10">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {/* Service 1 */}
              <div className={`${isLoaded ? 'fade-in delay-400' : 'opacity-0'}`}>
                <TiltCard className="cosmic-card hover-lift">
                  <div className="relative h-48 overflow-hidden">
                    <img className="w-full h-full object-cover rounded-t-lg transition-transform hover:scale-105 duration-700" src="/assets/SiteKeren1-C6qAXosk.png" alt="Web Design" />
                    <div className="absolute inset-0 bg-gradient-to-t from-cosmic-black to-transparent flex items-center justify-center rounded-t-lg">
                      <h3 className="cosmic-title text-2xl font-bold cosmic-shimmer">Conception Web</h3>
                    </div>
                  </div>
                  <div className="px-4 py-5 sm:p-6">
                    <p className="cosmic-text">
                      Nous créons des expériences web uniques et engageantes qui reflètent votre marque et captivent votre audience.
                    </p>
                    <div className="mt-4">
                      <Link to="/services/web-design" className="text-forge-orange hover:text-forge-red transition-colors duration-300 flex items-center">
                        <span>En savoir plus</span>
                        <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </Link>
                    </div>
                  </div>
                </TiltCard>
              </div>

              {/* Service 2 */}
              <div className={`${isLoaded ? 'fade-in delay-500' : 'opacity-0'}`}>
                <TiltCard className="cosmic-card hover-lift">
                  <div className="relative h-48 overflow-hidden">
                    <img className="w-full h-full object-cover rounded-t-lg transition-transform hover:scale-105 duration-700" src="/assets/infographie-BUU2QWsO.jpg" alt="Infographie" />
                    <div className="absolute inset-0 bg-gradient-to-t from-cosmic-black to-transparent flex items-center justify-center rounded-t-lg">
                      <h3 className="cosmic-title text-2xl font-bold cosmic-shimmer">Infographie</h3>
                    </div>
                  </div>
                  <div className="px-4 py-5 sm:p-6">
                    <p className="cosmic-text">
                      Nous créons des infographies visuellement attrayantes qui transmettent vos messages clés de manière claire et concise.
                    </p>
                    <div className="mt-4">
                      <Link to="/services/infographie" className="text-forge-orange hover:text-forge-red transition-colors duration-300 flex items-center">
                        <span>En savoir plus</span>
                        <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </Link>
                    </div>
                  </div>
                </TiltCard>
              </div>

              {/* Service 3 */}
              <div className={`${isLoaded ? 'fade-in delay-600' : 'opacity-0'}`}>
                <TiltCard className="cosmic-card hover-lift">
                  <div className="relative h-48 overflow-hidden">
                    <img className="w-full h-full object-cover rounded-t-lg transition-transform hover:scale-105 duration-700" src="/assets/photographie-DtAkYzOw.jpg" alt="Photographie" />
                    <div className="absolute inset-0 bg-gradient-to-t from-cosmic-black to-transparent flex items-center justify-center rounded-t-lg">
                      <h3 className="cosmic-title text-2xl font-bold cosmic-shimmer">Photographie</h3>
                    </div>
                  </div>
                  <div className="px-4 py-5 sm:p-6">
                    <p className="cosmic-text">
                      Nous capturons des images de haute qualité qui racontent votre histoire et mettent en valeur votre marque.
                    </p>
                    <div className="mt-4">
                      <Link to="/services/photographie" className="text-forge-orange hover:text-forge-red transition-colors duration-300 flex items-center">
                        <span>En savoir plus</span>
                        <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </Link>
                    </div>
                  </div>
                </TiltCard>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* About Section */}
      <div className="py-12 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`lg:text-center ${isLoaded ? 'slide-up delay-700' : ''}`}>
            <h2 className="text-base text-forge-orange font-semibold tracking-wide uppercase cosmic-shimmer">{t('home.about.title')}</h2>
            <p className="mt-2 cosmic-title text-3xl leading-8 font-extrabold tracking-tight sm:text-4xl ">
              {t('home.about.subtitle')}
            </p>
            <p className="mt-4 max-w-2xl text-xl cosmic-text lg:mx-auto">
              {t('home.about.description')}
            </p>
          </div>

          <div className="mt-10">
            <div className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
              <div className={`flex ${isLoaded ? 'fade-in delay-800 slide-right' : 'opacity-0'}`}>
                <div className="flex-shrink-0">
                  <div className="forge-icon-button h-12 w-12">
                    <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 019-9" />
                    </svg>
                  </div>
                </div>
                <div className="ml-4">
                  <h3 className="cosmic-title text-lg leading-6 font-medium cosmic-shimmer">{t('home.about.expertise.title')}</h3>
                  <p className="mt-2 text-base cosmic-text">
                    {t('home.about.expertise.description')}
                  </p>
                </div>
              </div>

              <div className={`flex ${isLoaded ? 'fade-in delay-900 slide-left' : 'opacity-0'}`}>
                <div className="flex-shrink-0">
                  <div className="forge-icon-button h-12 w-12">
                    <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                </div>
                <div className="ml-4">
                  <h3 className="cosmic-title text-lg leading-6 font-medium cosmic-shimmer">{t('home.about.innovation.title')}</h3>
                  <p className="mt-2 text-base cosmic-text">
                    {t('home.about.innovation.description')}
                  </p>
                </div>
              </div>

              <div className={`flex ${isLoaded ? 'fade-in delay-1000 slide-right' : 'opacity-0'}`}>
                <div className="flex-shrink-0">
                  <div className="forge-icon-button h-12 w-12">
                    <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                </div>
                <div className="ml-4">
                  <h3 className="cosmic-title text-lg leading-6 font-medium cosmic-shimmer">{t('home.about.collaboration.title')}</h3>
                  <p className="mt-2 text-base cosmic-text">
                    {t('home.about.collaboration.description')}
                  </p>
                </div>
              </div>

              <div className={`flex ${isLoaded ? 'fade-in delay-1100 slide-left' : 'opacity-0'}`}>
                <div className="flex-shrink-0">
                  <div className="forge-icon-button h-12 w-12">
                    <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                </div>
                <div className="ml-4">
                  <h3 className="cosmic-title text-lg leading-6 font-medium cosmic-shimmer">{t('home.about.quality.title')}</h3>
                  <p className="mt-2 text-base cosmic-text">
                    {t('home.about.quality.description')}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Processus de travail Section */}
      <div className="py-16 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="cosmic-title text-3xl font-bold mb-2">
              {t('home.process.title')}
            </h2>
            <p className="cosmic-text">
              {t('home.process.description')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-10">
            {/* Étape 1 */}
            <div className="cosmic-card p-6 text-center relative process-card star-citizen-sweep">
              <div className="second-sweep"></div>
              <div className="orange-indicator"></div>
              <div className="flex justify-center mb-4">
                <div className="forge-icon-button w-16 h-16">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 019-9" />
                  </svg>
                </div>
              </div>
              <h3 className="cosmic-title text-xl font-semibold mb-2">{t('home.process.step1.title')}</h3>
              <p className="cosmic-text text-sm">
                {t('home.process.step1.description')}
              </p>
            </div>

            {/* Étape 2 */}
            <div className="cosmic-card p-6 text-center relative process-card star-citizen-sweep">
              <div className="second-sweep"></div>
              <div className="orange-indicator"></div>
              <div className="flex justify-center mb-4">
                <div className="forge-icon-button w-16 h-16">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
              </div>
              <h3 className="cosmic-title text-xl font-semibold mb-2">{t('home.process.step2.title')}</h3>
              <p className="cosmic-text text-sm">
                {t('home.process.step2.description')}
              </p>
            </div>

            {/* Étape 3 */}
            <div className="cosmic-card p-6 text-center relative process-card star-citizen-sweep">
              <div className="second-sweep"></div>
              <div className="orange-indicator"></div>
              <div className="flex justify-center mb-4">
                <div className="forge-icon-button w-16 h-16">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                  </svg>
                </div>
              </div>
              <h3 className="cosmic-title text-xl font-semibold mb-2">{t('home.process.step3.title')}</h3>
              <p className="cosmic-text text-sm">
                {t('home.process.step3.description')}
              </p>
            </div>

            {/* Étape 4 */}
            <div className="cosmic-card p-6 text-center relative process-card star-citizen-sweep">
              <div className="second-sweep"></div>
              <div className="orange-indicator"></div>
              <div className="flex justify-center mb-4">
                <div className="forge-icon-button w-16 h-16">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                  </svg>
                </div>
              </div>
              <h3 className="cosmic-title text-xl font-semibold mb-2">{t('home.process.step4.title')}</h3>
              <p className="cosmic-text text-sm">
                {t('home.process.step4.description')}
              </p>
            </div>

            {/* Étape 5 */}
            <div className="cosmic-card p-6 text-center relative process-card star-citizen-sweep">
              <div className="second-sweep"></div>
              <div className="orange-indicator"></div>
              <div className="flex justify-center mb-4">
                <div className="forge-icon-button w-16 h-16">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a3 3 0 11-6 0 3 3 0 016 0zm-9 8a9 9 0 01-18 0 9 9 0 018 0z" />
                  </svg>
                </div>
              </div>
              <h3 className="cosmic-title text-xl font-semibold mb-2">{t('home.process.step5.title')}</h3>
              <p className="cosmic-text text-sm">
                {t('home.process.step5.description')}
              </p>
            </div>
          </div>

          {/* Timeline */}
          <div className="relative">
            <div className="absolute left-0 right-0 h-1 bg-forge-red opacity-50 top-1/2 transform -translate-y-1/2"></div>
            <div className="flex justify-between relative">
              <div className="w-8 h-8 rounded-full bg-forge-red flex items-center justify-center text-white text-sm font-bold z-10">1</div>
              <div className="w-8 h-8 rounded-full bg-forge-red flex items-center justify-center text-white text-sm font-bold z-10">2</div>
              <div className="w-8 h-8 rounded-full bg-forge-red flex items-center justify-center text-white text-sm font-bold z-10">3</div>
              <div className="w-8 h-8 rounded-full bg-forge-red flex items-center justify-center text-white text-sm font-bold z-10">4</div>
              <div className="w-8 h-8 rounded-full bg-forge-red flex items-center justify-center text-white text-sm font-bold z-10">5</div>
            </div>
          </div>
        </div>
      </div>

      {/* Portfolio Preview Section */}
      <div className="py-12 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="cosmic-title text-3xl font-extrabold">
              {t('home.portfolio.title')}
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-xl cosmic-text">
              {t('home.portfolio.description')}
            </p>
          </div>
          
          <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <div className="cosmic-card overflow-hidden transition-all duration-300 hover-lift">
              <img className="w-full h-48 object-cover rounded-t-lg" src="/assets/Destinee1-BnMVXLFH.png" alt="Projet Destinée" />
              <div className="p-6">
                <h3 className="cosmic-title text-lg font-medium">{t('home.portfolio.project1.title')}</h3>
                <p className="mt-2 text-sm cosmic-text">
                  {t('home.portfolio.project1.description')}
                </p>
              </div>
            </div>
            
            <div className="cosmic-card overflow-hidden transition-all duration-300 hover-lift">
              <img className="w-full h-48 object-cover rounded-t-lg" src="/assets/SiteKeren1-C6qAXosk.png" alt="Projet Keren" />
              <div className="p-6">
                <h3 className="cosmic-title text-lg font-medium">{t('home.portfolio.project2.title')}</h3>
                <p className="mt-2 text-sm cosmic-text">
                  {t('home.portfolio.project2.description')}
                </p>
              </div>
            </div>
            
            <div className="cosmic-card overflow-hidden transition-all duration-300 hover-lift">
              <img className="w-full h-48 object-cover rounded-t-lg" src="/assets/EcranStart-DD4Cxlyo.png" alt="Projet EcranStart" />
              <div className="p-6">
                <h3 className="cosmic-title text-lg font-medium">{t('home.portfolio.project3.title')}</h3>
                <p className="mt-2 text-sm cosmic-text">
                  {t('home.portfolio.project3.description')}
                </p>
              </div>
            </div>
          </div>
          
          <div className="mt-10 text-center">
            <Link to="/gallery" className="forge-glass-button inline-flex items-center px-6 py-3 rounded-[7px] hover-lift">
              {t('home.portfolio.cta')}
              <svg className="ml-2 -mr-1 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </Link>
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="py-12 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="cosmic-title text-3xl font-extrabold">
              {t('home.testimonials.title')}
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-xl cosmic-text">
              {t('home.testimonials.description')}
            </p>
          </div>
          
          <div className="mt-10 grid gap-8 lg:grid-cols-2">
            <div className="cosmic-card p-6 rounded-[7px]">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <svg className="h-12 w-12 text-forge-orange" fill="currentColor" viewBox="0 0 32 32">
                    <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <p className="text-base cosmic-text">
                    {t('home.testimonials.quote1')}
                  </p>
                  <div className="mt-4">
                    <p className="text-base font-medium cosmic-title">{t('home.testimonials.author1')}</p>
                    <p className="text-sm cosmic-text">{t('home.testimonials.company1')}</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="cosmic-card p-6 rounded-[7px]">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <svg className="h-12 w-12 text-forge-orange" fill="currentColor" viewBox="0 0 32 32">
                    <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <p className="text-base cosmic-text">
                    {t('home.testimonials.quote2')}
                  </p>
                  <div className="mt-4">
                    <p className="text-base font-medium cosmic-title">{t('home.testimonials.author2')}</p>
                    <p className="text-sm cosmic-text">{t('home.testimonials.company2')}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-12 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`bg-deep-space bg-opacity-50 backdrop-filter backdrop-blur-sm rounded-[7px] shadow-xl overflow-hidden ${isLoaded ? 'fade-in delay-1100' : 'opacity-0'}`}>
            <div className="px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
              <div className="max-w-3xl mx-auto text-center">
                <h2 className="cosmic-title text-3xl font-extrabold sm:text-4xl">
                  {t('home.cta.title')}
                </h2>
                <p className="mt-4 text-lg leading-6 cosmic-text">
                  {t('home.cta.description')}
                </p>
                <div className="mt-8 flex justify-center">
                  <div className="inline-flex rounded-[7px] shadow">
                    <Link to="/contact" className="forge-glass-button px-8 py-3 text-base font-medium hover-lift">
                      {t('home.cta.button')}
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
