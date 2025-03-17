import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import React, { useState, useEffect, useRef, Suspense } from 'react';
import { useTranslation } from 'react-i18next';
import { AnimatePresence } from 'framer-motion';
import Home from './components/Home';
import About from './components/About';
import Contact from './components/Contact';
import Gallery from './components/Gallery';
import NotFound from './components/NotFound';
import Pricing from './components/Pricing';
import LegalNotice from './components/LegalNotice';
import PrivacyPolicy from './components/PrivacyPolicy';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AccessibilityWidget from './components/AccessibilityWidget';
import Blog from './components/Blog';
import LiveChat from './components/LiveChat';
import PageTransition from './components/PageTransition';
import './styles/animations.css';
import './styles/forge-cursor.css'; 
import './styles/cosmic-forge-theme.css';
import ForgeCursor from './utils/forgeCursor'; 
import { GameProvider } from './components/ParticlesHeader';
import Particles404 from './components/Particles404';

// Composant AppContent qui utilise useLocation à l'intérieur du Router
function AppContent() {
  const [darkMode, setDarkMode] = useState(true);
  const location = useLocation();
  const starsRef = useRef(null);
  const nebulaRef = useRef(null);
  const forgeRef = useRef(null);
  const shootingStarsRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const scrollCountRef = useRef(0);

  useEffect(() => {
    // Check if user prefers dark mode or has saved preference
    const savedMode = localStorage.getItem('darkMode');
    if (savedMode !== null) {
      setDarkMode(savedMode === 'true');
    }
    // Si aucune préférence n'est sauvegardée, on garde le mode sombre par défaut
  }, []);

  useEffect(() => {
    // Apply dark mode class to document
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    // Save preference
    localStorage.setItem('darkMode', darkMode);
  }, [darkMode]);

  useEffect(() => {
    // Initialise le curseur personnalisé une seule fois
    const forgeCursor = new ForgeCursor();
    
    // Nettoyage lors du démontage du composant
    return () => {
      // Si nécessaire, ajouter du code de nettoyage ici
    };
  }, []);

  // Effet pour initialiser les éléments cosmiques
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
        'var(--nebula-purple)', 
        'var(--nebula-pink)', 
        'var(--nebula-blue)', 
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

  useEffect(() => {
    window.scrollTo(0, 0); // Faire défiler vers le haut de la page
  }, [location]); // Exécuter lorsque la location change

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className="cosmic-bg min-h-screen flex flex-col">
      {/* Éléments cosmiques */}
      <div ref={starsRef} className="stars"></div>
      <div ref={nebulaRef} className="nebula"></div>
      <div ref={shootingStarsRef} className="shooting-stars"></div>
      <div ref={forgeRef} className="forge-sparks"></div>
      <div className="molten-metal"></div>
      
      <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} style={{zIndex: 1}} />
      <main className="flex-grow z-10 relative">
        <Suspense fallback={<div>Loading...</div>}>
          <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={
                <PageTransition>
                  <Home />
                </PageTransition>
              } />
              <Route path="/about" element={
                <PageTransition>
                  <About />
                </PageTransition>
              } />
              <Route path="/contact" element={
                <PageTransition>
                  <Contact />
                </PageTransition>
              } />
              <Route path="/gallery" element={
                <PageTransition>
                  <Gallery />
                </PageTransition>
              } />
              <Route path="/pricing" element={
                <PageTransition>
                  <Pricing />
                </PageTransition>
              } />
              <Route path="/mentions-legales" element={
                <PageTransition>
                  <LegalNotice />
                </PageTransition>
              } />
              <Route path="/politique-confidentialite" element={
                <PageTransition>
                  <PrivacyPolicy />
                </PageTransition>
              } />
              <Route path="/blog" element={
                <PageTransition>
                  <Blog />
                </PageTransition>
              } />
              <Route path="/404" element={<Particles404 />} />
              <Route path="*" element={<Particles404 />} />
            </Routes>
          </AnimatePresence>
        </Suspense>
      </main>
      <Footer darkMode={darkMode} toggleDarkMode={toggleDarkMode} className="bg-opacity-0 relative z-10" style={{zIndex: 1}} />
      <AccessibilityWidget style={{zIndex: 1}} />
      <LiveChat style={{zIndex: 1}} />
    </div>
  );
}

// Composant App principal qui enveloppe AppContent avec Router
function App() {
  return (
    <Router>
      <GameProvider>
        <AppContent />
      </GameProvider>
    </Router>
  );
}

export default App;
