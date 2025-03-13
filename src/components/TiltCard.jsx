import React, { useEffect, useRef } from 'react';

/**
 * Composant TiltCard - Ajoute un effet de tilt 3D et light sweep à n'importe quel contenu
 * @param {Object} props - Les propriétés du composant
 * @param {React.ReactNode} props.children - Le contenu à afficher dans la carte
 * @param {string} props.className - Classes CSS additionnelles
 * @returns {JSX.Element} - Carte avec effet de tilt 3D
 */
const TiltCard = ({ children, className = '' }) => {
  const cardRef = useRef(null);
  const stateRef = useRef({
    targetAngle: 135,
    currentAngle: 135,
    targetDistance: 50,
    currentDistance: 50,
    targetRotateX: 0,
    currentRotateX: 0,
    targetRotateY: 0,
    currentRotateY: 0,
    animationFrameId: null
  });

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    // Fonction d'animation avec interpolation
    const animateCard = () => {
      const state = stateRef.current;
      
      // Interpolation douce pour tous les paramètres
      state.currentAngle += (state.targetAngle - state.currentAngle) * 0.08;
      state.currentDistance += (state.targetDistance - state.currentDistance) * 0.08;
      state.currentRotateX += (state.targetRotateX - state.currentRotateX) * 0.08;
      state.currentRotateY += (state.targetRotateY - state.currentRotateY) * 0.08;
      
      // Appliquer les transformations
      card.style.transform = `perspective(1000px) rotateX(${state.currentRotateX}deg) rotateY(${state.currentRotateY}deg)`;
      card.style.setProperty('--sweep-angle', `${state.currentAngle}deg`);
      card.style.setProperty('--mouse-distance', `${state.currentDistance}%`);
      
      // Continuer l'animation
      state.animationFrameId = requestAnimationFrame(animateCard);
    };

    // Fonction pour gérer le mouvement de la souris
    const handleMouseMove = (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      // Calculer la position relative (0-100%)
      const mouseX = x / rect.width;
      const mouseY = y / rect.height;
      
      // Mettre à jour les variables CSS pour l'effet de lumière
      card.style.setProperty('--mouse-x', `${mouseX * 100}%`);
      card.style.setProperty('--mouse-y', `${mouseY * 100}%`);
      
      // Calculer la rotation cible (max ±7 degrés)
      stateRef.current.targetRotateY = ((mouseX - 0.5) * 2) * 7; // -7 à +7 degrés
      stateRef.current.targetRotateX = (-(mouseY - 0.5) * 2) * 7; // -7 à +7 degrés
      
      // Calculer l'angle du balayage lumineux
      stateRef.current.targetAngle = Math.atan2(mouseY - 0.5, mouseX - 0.5) * (180 / Math.PI);
      
      // Calculer la distance au bord de la carte dans la direction du regard
      const angleRad = stateRef.current.targetAngle * Math.PI / 180;
      const cosAngle = Math.cos(angleRad);
      const sinAngle = Math.sin(angleRad);
      
      // Calculer la distance au bord (0 = centre, 1 = bord)
      const distanceToEdge = Math.max(
        Math.abs(cosAngle) > 0.001 ? (cosAngle > 0 ? (1 - mouseX) / cosAngle : mouseX / -cosAngle) : 100,
        Math.abs(sinAngle) > 0.001 ? (sinAngle > 0 ? (1 - mouseY) / sinAngle : mouseY / -sinAngle) : 100
      );
      
      // Normaliser la distance pour qu'elle soit entre 0 et 100%
      stateRef.current.targetDistance = 120 - Math.min(distanceToEdge * 50, 100);
      
      // Ajouter une légère mise à l'échelle lors du survol
      card.style.transform = `perspective(1000px) rotateX(${state.currentRotateX}deg) rotateY(${state.currentRotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    };

    // Fonction pour gérer la sortie de la souris
    const handleMouseLeave = () => {
      stateRef.current.targetRotateX = 0;
      stateRef.current.targetRotateY = 0;
      stateRef.current.targetAngle = 135; // Angle par défaut
      stateRef.current.targetDistance = 50; // Distance par défaut
      
      // Réinitialiser la transformation sans mise à l'échelle
      card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg)`;
    };

    // Fonction pour empêcher la propagation des événements de la molette
    const handleWheel = (e) => {
      // Ne pas empêcher le défilement par défaut
      e.stopPropagation(); // Empêche la propagation mais permet le comportement par défaut
    };

    // Ajouter les écouteurs d'événements
    card.addEventListener('mousemove', handleMouseMove);
    card.addEventListener('mouseleave', handleMouseLeave);
    card.addEventListener('wheel', handleWheel, { passive: true }); // passive: true pour permettre le défilement
    
    // Démarrer l'animation
    stateRef.current.animationFrameId = requestAnimationFrame(animateCard);

    // Nettoyage
    return () => {
      card.removeEventListener('mousemove', handleMouseMove);
      card.removeEventListener('mouseleave', handleMouseLeave);
      card.removeEventListener('wheel', handleWheel);
      
      if (stateRef.current.animationFrameId) {
        cancelAnimationFrame(stateRef.current.animationFrameId);
      }
    };
  }, []);

  return (
    <div 
      ref={cardRef}
      className={`tilt-card card-light-effect ${className}`}
      style={{ transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg)' }}
    >
      <div className="tilt-card-content">
        {children}
      </div>
    </div>
  );
};

export default TiltCard;
