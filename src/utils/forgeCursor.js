/**
 * Gestionnaire du curseur personnalisé en forme de marteau de forgeron
 * Utilise uniquement les propriétés CSS pour animer le curseur
 */

class ForgeCursor {
  constructor() {
    // Éléments interactifs
    this.interactiveElements = 'a, button, input[type="submit"], input[type="button"], .clickable, .forge-button';
    
    // Initialisation
    this.init();
  }
  
  /**
   * Initialise le curseur personnalisé
   */
  init() {
    // Ajout des écouteurs d'événements pour les clics
    document.addEventListener('mousedown', (e) => {
      if (e.target.matches(this.interactiveElements)) {
        this.strikeHammer(e.target);
      }
    });
    
    // Ajoute la classe interactive aux éléments cliquables
    this.setupInteractiveElements();
    
    console.log('Forge cursor initialized');
  }
  
  /**
   * Configure les éléments interactifs avec la classe appropriée
   */
  setupInteractiveElements() {
    document.querySelectorAll(this.interactiveElements).forEach(element => {
      element.classList.add('interactive-element');
    });
  }
  
  /**
   * Anime l'effet de frappe et affiche les étincelles
   * @param {HTMLElement} targetElement - L'élément qui est frappé
   */
  strikeHammer(targetElement) {
    // Ajoute l'effet de secousse à l'élément ciblé
    targetElement.classList.add('element-struck');
    targetElement.classList.add('element-glow');
    
    // Crée un élément temporaire pour les étincelles à la position du clic
    const sparkPosition = targetElement.getBoundingClientRect();
    const sparkElement = document.createElement('div');
    sparkElement.className = 'spark-effect';
    sparkElement.style.left = `${sparkPosition.left + sparkPosition.width/2 - 32}px`;
    sparkElement.style.top = `${sparkPosition.top + sparkPosition.height/2 - 32}px`;
    
    // Ajouter les étincelles supplémentaires
    for (let i = 1; i <= 6; i++) {
      const spark = document.createElement('div');
      spark.className = `spark-${i}`;
      
      // Ajouter des valeurs aléatoires pour les variables CSS utilisées dans l'animation
      spark.style.setProperty('--random-x', Math.random().toFixed(2));
      spark.style.setProperty('--random-y', Math.random().toFixed(2));
      
      sparkElement.appendChild(spark);
    }
    
    document.body.appendChild(sparkElement);
    
    // Supprime les étincelles après l'animation
    setTimeout(() => {
      document.body.removeChild(sparkElement);
    }, 500);
    
    // Réinitialise les effets sur l'élément après l'animation
    setTimeout(() => {
      targetElement.classList.remove('element-struck');
      
      // Supprime la lueur après un délai plus long
      setTimeout(() => {
        targetElement.classList.remove('element-glow');
      }, 300);
    }, 500);
  }
}

// Exporte la classe
export default ForgeCursor;
