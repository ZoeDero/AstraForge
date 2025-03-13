import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import React, { useState, useEffect, Suspense } from 'react';
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

// Composant AppContent qui utilise useLocation à l'intérieur du Router
function AppContent() {
  const [darkMode, setDarkMode] = useState(false);
  const location = useLocation();

  useEffect(() => {
    // Check if user prefers dark mode
    const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const savedMode = localStorage.getItem('darkMode') === 'true';
    setDarkMode(savedMode || prefersDarkMode);
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

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      <main className="flex-grow">
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
              <Route path="*" element={
                <PageTransition>
                  <NotFound />
                </PageTransition>
              } />
            </Routes>
          </AnimatePresence>
        </Suspense>
      </main>
      <Footer />
      <AccessibilityWidget />
      <LiveChat />
    </div>
  );
}

// Composant App principal qui enveloppe AppContent avec Router
function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
