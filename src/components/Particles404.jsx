import React, { useState, useEffect } from 'react';
import ParticlesHeader from './ParticlesHeader';

const Particles404 = () => {
  const [score, setScore] = useState(0);
  const [connections, setConnections] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setScore(prevScore => prevScore + (0.1 * connections));
    }, 1000);
    return () => clearInterval(interval);
  }, [connections]);

  useEffect(() => {
    const interval = setInterval(() => {
      setConnections(prevConnections => prevConnections + 1); // Simuler une nouvelle connexion
    }, 10000); // Incrémente toutes les 10 secondes
    return () => clearInterval(interval);
  }, []);

  const handleStarClick = () => {
    setScore(prevScore => prevScore + 2);
  };

  // Formater le score pour afficher un chiffre après la virgule et ajouter des suffixes K pour mille et M pour million
  const formatScore = (score) => {
    if (score >= 1000000) {
      return (score / 1000000).toFixed(1) + 'M';
    } else if (score >= 1000) {
      return (score / 1000).toFixed(1) + 'K';
    }
    return score.toFixed(1);
  };

  return (
    <div className="min-h-screen bg-deep-space">
      <ParticlesHeader />
      <div className="flex flex-col items-center justify-center py-12">
        <h1 className="cosmic-title text-5xl font-extrabold text-white">404</h1>
        <p className="mt-3 max-w-2xl mx-auto text-xl cosmic-text">
          La page que vous cherchez n'existe pas.
        </p>
        <p className="mt-3 max-w-2xl mx-auto text-xl cosmic-text">
          Score: {formatScore(score)}
        </p>
        {/* Ajouter ici le code pour afficher les étoiles et gérer les clics */}
      </div>
    </div>
  );
};

export default Particles404;
