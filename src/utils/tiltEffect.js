/**
 * Effet de tilt 3D pour les cards
 * Permet aux éléments avec la classe .tilt-card de suivre l'orientation de la souris
 */

// Variables globales pour optimiser les performances
let rafId = null;
const activeCards = new Map();

export const initTiltEffect = () => {
  // Annuler toute animation en cours
  if (rafId) {
    cancelAnimationFrame(rafId);
    rafId = null;
  }
  
  // Nettoyer les cartes actives
  activeCards.clear();
  
  // Supprimer tous les écouteurs précédents
  const allCards = document.querySelectorAll('.tilt-card');
  allCards.forEach(card => {
    card.removeEventListener('mouseenter', handleMouseEnter);
    card.removeEventListener('mousemove', handleMouseMove);
    card.removeEventListener('mouseleave', handleMouseLeave);
    
    // Réinitialiser les transformations
    card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    
    // Ajouter l'élément de brillance si nécessaire
    if (!card.querySelector('.tilt-card-shine')) {
      const shine = document.createElement('div');
      shine.classList.add('tilt-card-shine');
      card.appendChild(shine);
    }
    
    // S'assurer que la structure est correcte
    const content = card.querySelector('.tilt-card-content');
    if (!content) {
      // Créer le conteneur de contenu
      const wrapper = document.createElement('div');
      wrapper.classList.add('tilt-card-content');
      
      // Déplacer tous les enfants sauf le shine dans le wrapper
      while (card.firstChild) {
        if (!card.firstChild.classList || !card.firstChild.classList.contains('tilt-card-shine')) {
          wrapper.appendChild(card.firstChild);
        } else {
          // Si c'est le shine, le garder temporairement
          const shine = card.firstChild;
          card.removeChild(shine);
          card.appendChild(wrapper);
          card.appendChild(shine);
          break;
        }
      }
      
      if (!card.contains(wrapper)) {
        card.appendChild(wrapper);
      }
    }
    
    // Ajouter les nouveaux écouteurs
    card.addEventListener('mouseenter', handleMouseEnter);
    card.addEventListener('mousemove', handleMouseMove);
    card.addEventListener('mouseleave', handleMouseLeave);
  });
  
  // Démarrer la boucle d'animation
  animateTilt();
};

// Fonction pour gérer l'entrée de la souris
function handleMouseEnter(e) {
  const card = e.currentTarget;
  
  // Ajouter la carte à la liste des cartes actives
  if (!activeCards.has(card)) {
    activeCards.set(card, {
      targetRotateX: 0,
      targetRotateY: 0,
      currentRotateX: 0,
      currentRotateY: 0,
      scale: 1
    });
  }
}

// Fonction pour gérer le mouvement de la souris
function handleMouseMove(e) {
  const card = e.currentTarget;
  const rect = card.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  
  // Calculer la position relative (0-100%)
  const mouseX = Math.floor((x / rect.width) * 100);
  const mouseY = Math.floor((y / rect.height) * 100);
  
  // Calculer la rotation cible (max ±15 degrés)
  const targetRotateY = ((mouseX - 50) / 50) * 15;
  const targetRotateX = ((50 - mouseY) / 50) * 15;
  
  // Mettre à jour les valeurs cibles
  if (activeCards.has(card)) {
    const cardData = activeCards.get(card);
    cardData.targetRotateX = targetRotateX;
    cardData.targetRotateY = targetRotateY;
    cardData.scale = 1.05;
    
    // Mettre à jour la position du gradient de brillance immédiatement
    card.style.setProperty('--mouse-x', `${mouseX}%`);
    card.style.setProperty('--mouse-y', `${mouseY}%`);
  }
}

// Fonction pour gérer la sortie de la souris
function handleMouseLeave(e) {
  const card = e.currentTarget;
  
  if (activeCards.has(card)) {
    const cardData = activeCards.get(card);
    cardData.targetRotateX = 0;
    cardData.targetRotateY = 0;
    cardData.scale = 1;
  }
}

// Fonction d'animation avec requestAnimationFrame pour des mouvements fluides
function animateTilt() {
  // Mettre à jour toutes les cartes actives
  activeCards.forEach((cardData, card) => {
    // Interpolation pour un mouvement fluide
    cardData.currentRotateX += (cardData.targetRotateX - cardData.currentRotateX) * 0.1;
    cardData.currentRotateY += (cardData.targetRotateY - cardData.currentRotateY) * 0.1;
    
    // Appliquer la transformation
    card.style.transform = `perspective(1000px) rotateX(${cardData.currentRotateX}deg) rotateY(${cardData.currentRotateY}deg) scale3d(${cardData.scale}, ${cardData.scale}, ${cardData.scale})`;
  });
  
  // Continuer l'animation
  rafId = requestAnimationFrame(animateTilt);
}

// Fonction pour réinitialiser l'effet
export const resetTiltEffect = () => {
  // Annuler l'animation en cours
  if (rafId) {
    cancelAnimationFrame(rafId);
    rafId = null;
  }
  
  // Réinitialiser toutes les cartes
  const tiltCards = document.querySelectorAll('.tilt-card');
  tiltCards.forEach(card => {
    card.removeEventListener('mouseenter', handleMouseEnter);
    card.removeEventListener('mousemove', handleMouseMove);
    card.removeEventListener('mouseleave', handleMouseLeave);
    card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
  });
  
  // Vider la liste des cartes actives
  activeCards.clear();
};
