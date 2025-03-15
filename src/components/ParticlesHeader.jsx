import React, { useEffect, useRef, createContext, useContext } from 'react';
import '../styles/forge-cursor.css';

// Création du contexte pour la santé
const GameContext = createContext();

export const useGameContext = () => useContext(GameContext);

const ParticlesHeader = () => {
  const canvasRef = useRef(null);
  const hiddenElementsRef = useRef([]); // Référence pour les éléments cachés
  const { health, setHealth } = useGameContext(); // Utiliser directement la santé du contexte

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let particlesArray = [];
    let mouse = {
      x: null,
      y: null,
      radius: 20, // Définir un cercle de 25px autour du pointeur pour la hitbox
      speedX: 0.5,
      speedY: 0.5
    };

    // Capture la position de la souris
    function handleMouseMove(event) {
      console.log('Mouse moved'); // Ajouter un console.log dans l'événement de mouvement de la souris
      mouse.x = event.x;
      mouse.y = event.y;
      mouse.speedX = event.movementX;
      mouse.speedY = event.movementY;
      checkMouseCollision(); // Appeler la fonction pour vérifier la collision avec la souris
    }

    window.addEventListener('mousemove', handleMouseMove);

    // Classe pour les particules
    class Particle {
      constructor() {
        // Positionner les particules de manière aléatoire
        this.x = Math.random() * canvas.width; // Position aléatoire sur l'axe X
        this.y = Math.random() * canvas.height; // Position aléatoire sur l'axe Y

        this.size = Math.random() * 0.8 + 0.2; // Taille entre 0.2 et 1px
        this.baseSize = this.size;
        // Vitesses très petites et aléatoires
        this.speedX = Math.random() * 0.5 - 0.25;
        this.speedY = Math.random() * 0.5 - 0.25;
        this.color = `rgba(255, 255, 255, ${Math.random() * 0.5 + 0.1})`; // Opacité aléatoire pour le clignotement
        this.density = (Math.random() * 30) + 1;
        this.brightness = Math.random() * 0.5 + 0.5; // Valeur de luminosité aléatoire entre 0.5 et 1
        this.touched = false; // Nouvelle propriété pour suivre si la particule a été touchée
        this.originalColor = this.color; // Stocker la couleur d'origine
      }

      update() {
        // Vérifier la proximité avec la souris pour l'interaction
        if (mouse.x != null && mouse.y != null) {
          const dx = mouse.x - this.x;
          const dy = mouse.y - this.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          if (distance < this.size + mouse.radius) { // Ne repousser que si la particule est touchée
            if (!this.touched) { // Vérifier si la particule n'a pas déjà été touchée
              this.touched = true; // Marquer la particule comme touchée
              this.color = `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 1)`; // Changer la couleur aléatoirement lors du contact
              // Conserver la couleur aléatoire au lieu de réinitialiser
              this.originalColor = this.color;
            }
            const forceDirectionX = -dx / distance; // Direction de la poussée
            const forceDirectionY = -dy / distance; // Direction de la poussée
            const speed = Math.min(5, Math.abs(mouse.speedX) + Math.abs(mouse.speedY)); // Vitesse proportionnelle à celle du curseur
            // Appliquer la force de répulsion avec une vitesse décroissante
            this.speedX += forceDirectionX * 0.5; // Réduire l'amplitude de la poussée
            this.speedY += forceDirectionY * 0.5; // Réduire l'amplitude de la poussée
          }
        }

        // Mouvement normal
        this.x += this.speedX;
        this.y += this.speedY;

        const friction = 0.99; // Coefficient de friction pour ralentir les particules

        if (Math.abs(this.speedX) > 0.1 || Math.abs(this.speedY) > 0.1) { // Appliquer la friction si la vitesse est au-dessus d'un seuil
          this.speedX *= friction; // Appliquer la friction sur la vitesse X
          this.speedY *= friction; // Appliquer la friction sur la vitesse Y
        }

        // Rebond sur les bords avec légère perte d'énergie
        if (this.x + this.size > canvas.width || this.x - this.size < 0) {
          this.speedX = -this.speedX * 1.3; // Augmenter la force de répulsion
          if (this.x + this.size > canvas.width) this.x = canvas.width - this.size; 
          if (this.x - this.size < 0) this.x = this.size; 
          this.color = `rgba(255, 255, 0, 1)`; // Intensifier la couleur à jaune lors de la collision
          this.brightness = Math.min(this.brightness + 0.5, 1); // Augmenter la luminosité
          // Réinitialiser la couleur après 0.5 seconde
          setTimeout(() => {
            this.color = this.originalColor; // Rétablir la couleur d'origine
          }, 500);
        }
        if (this.y + this.size > canvas.height || this.y - this.size < 0) {
          this.speedY = -this.speedY * 1.3; // Augmenter la force de répulsion
          if (this.y + this.size > canvas.height) this.y = canvas.height - this.size; 
          if (this.y - this.size < 0) this.y = this.size; 
          this.color = `rgba(255, 255, 0, 1)`; // Intensifier la couleur à jaune lors de la collision
          this.brightness = Math.min(this.brightness + 0.5, 1); // Augmenter la luminosité
          // Réinitialiser la couleur après 0.5 seconde
          setTimeout(() => {
            this.color = this.originalColor; // Rétablir la couleur d'origine
          }, 500);
        }
      }

      draw() {
        ctx.fillStyle = this.color; // Appliquer la couleur aléatoire
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // Redimensionnement du canvas pour qu'il occupe toute la largeur de l'écran
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      init();
    };

    // Initialisation des particules
    function init() {
      particlesArray = [];
      const numberOfParticles = Math.max(100, (canvas.width * canvas.height) / 6000); // Limiter le nombre de particules
      for (let i = 0; i < numberOfParticles; i++) {
        particlesArray.push(new Particle());
      }
      // Faire réapparaître tous les éléments cachés ici
      hiddenElementsRef.current.forEach(element => {
        element.classList.remove('hidden'); // Retirer la classe cachée pour réafficher
      });
    }

    let maxDistance = 100;
    let lastRandomizeTime = Date.now();
    let currentDistance = maxDistance;
    let totalTime = 1000; // Initialiser le temps total

    // Connexion entre les particules
    function connect() {
      let opacityValue = 1;
      if (Date.now() - lastRandomizeTime > 30000) { // Randomize every 30 seconds
        const newMaxDistance = Math.random() * (100 - 50) + 50;
        lastRandomizeTime = Date.now();
        // Appliquer un fondu à la distance de connexion
        const fadeDuration = 50; // Durée du fondu en millisecondes
        const fadeStep = (newMaxDistance - maxDistance) / fadeDuration; // Calculer l'étape de fondu

        const fadeInterval = setInterval(() => {
          currentDistance += fadeStep;
          if (currentDistance >= newMaxDistance) {
            clearInterval(fadeInterval);
            maxDistance = newMaxDistance;
          }
        }, 1);
      }

      for (let a = 0; a < particlesArray.length; a++) {
        for (let b = a; b < particlesArray.length; b++) {
          const dx = particlesArray[a].x - particlesArray[b].x;
          const dy = particlesArray[a].y - particlesArray[b].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < currentDistance) {
            // Plus la distance est petite, plus la ligne est opaque
            opacityValue = 1 - (distance / currentDistance);
            const colorA = particlesArray[a].color.match(/^rgba\((\d+),\s*(\d+),\s*(\d+),\s*(\d+(?:\.\d+)?)\)$/);
            const colorB = particlesArray[b].color.match(/^rgba\((\d+),\s*(\d+),\s*(\d+),\s*(\d+(?:\.\d+)?)\)$/);
            ctx.strokeStyle = `rgba(${Math.floor((parseInt(colorA[1]) + parseInt(colorB[1])) / 2)}, ${Math.floor((parseInt(colorA[2]) + parseInt(colorB[2])) / 2)}, ${Math.floor((parseInt(colorA[3]) + parseInt(colorB[3])) / 2)}, ${opacityValue * 0.5})`; // Appliquer un dégradé entre les couleurs des étoiles connectées
            ctx.lineWidth = opacityValue * 1.5; // Lignes plus épaisses quand plus proches
            ctx.beginPath();
            ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
            ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
            ctx.stroke();
          }
        }
      }
    }

    // Animation
    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
        particlesArray[i].draw();
      }
      connect();
      requestAnimationFrame(animate);
    }

    window.addEventListener('resize', handleResize);
    handleResize();

    init();
    animate();

    // Fonction pour mettre à jour la barre de vie
    function updateHealthBar() {
      // Retirer la barre de vie
      const healthBarContainer = document.createElement('div');
      // Supprimer ou commenter les lignes qui ajoutent la barre de vie à l'interface
      // document.body.appendChild(healthBarContainer);

      // // Retirer le chronomètre
      // const timerIcon = document.createElement('img');
      // timerIcon.src = '/assets/img/chrono.svg'; // Chemin vers l'icône de chrono
      // timerIcon.style.width = '20px';
      // timerIcon.style.height = '20px';
      // timerIcon.style.marginLeft = '10px'; // Espacement entre la barre de vie et l'icône

      // healthBarContainer.appendChild(healthBar);
      // healthBarContainer.appendChild(timerIcon);
      // document.body.appendChild(healthBarContainer);

      // // Mettre à jour la barre de vie
      // const updateInterval = setInterval(() => {
      //   if (health > 0) {
      //     health--;
      //     healthBar.style.width = health + 'px'; // Réduire la largeur de la barre
      //   } else {
      //     clearInterval(updateInterval); // Arrêter la mise à jour si la vie est à 0
      //   }
      // }, 750); // Perdre 1 point de vie toutes les 2 secondes

      // healthBarContainer.style.display = 'flex'; // Afficher la barre de vie
      // timerIcon.style.display = 'block'; // Afficher l'icône de chrono
    }

    updateHealthBar(); // Appeler la fonction pour initialiser la barre de vie

    // Initialiser le temps total de la barre de temps
    let timerInterval;

    function startTimer() {
      timerInterval = setInterval(() => {
        if (totalTime > 0) {
          totalTime -= 5; // Diminuer le temps de 5 points par seconde
          // Retirer la barre de temps
          // const timerElement = document.createElement('div');
          // Supprimer ou commenter les lignes qui ajoutent la barre de temps à l'interface
          // document.body.appendChild(timerElement);
        } else {
          clearInterval(timerInterval); // Arrêter le timer si le temps est écoulé
        }
      }, 1000);
    }

    // Appeler startTimer pour démarrer le timer
    startTimer();

    // Logique pour vérifier la collision avec la souris
    function checkMouseCollision() {
      const bonuses = document.querySelectorAll('.false-bonus');
      bonuses.forEach(bonus => {
        const rect = bonus.getBoundingClientRect();
        const mouseX = mouse.x;
        const mouseY = mouse.y;

        // Vérifier si la souris est dans les limites du faux bonus
        if (mouseX >= rect.left && mouseX <= rect.right && mouseY >= rect.top && mouseY <= rect.bottom) {
          // Si collision, retirer le bonus et réduire le temps
          document.body.removeChild(bonus);
          totalTime = Math.max(0, totalTime - 50); // Réduire le temps de 50 points au lieu de le diviser par 2
          setHealth(health - 10); // Exemple de réduction de vie, ajuste selon tes besoins
          console.log('Collision avec le faux bonus ! Temps réduit et vie diminuée.');
        }
      });
    }

    canvas.addEventListener('mouseenter', () => {
      canvas.style.cursor = 'url(/assets/cursors/spaceship.svg) 8 8, auto';
    });

    canvas.addEventListener('mouseleave', () => {
      canvas.style.cursor = 'url(/assets/cursors/forge-hammer.svg) 5 5, auto';
    });

    // Réinitialiser l'animation lorsque le composant n'est plus visible
    const resetAnimation = () => {
      particlesArray.forEach(particle => {
        particle.x = Math.random() * canvas.width; // Réinitialiser la position X
        particle.y = Math.random() * canvas.height; // Réinitialiser la position Y
        particle.touched = false; // Réinitialiser l'état touché
        particle.color = particle.originalColor; // Réinitialiser la couleur
        particle.speedX = Math.random() * 0.5 - 0.25; // Réinitialiser la vitesse X
        particle.speedY = Math.random() * 0.5 - 0.25; // Réinitialiser la vitesse Y
      });
      // Faire réapparaître tous les éléments cachés ici
      hiddenElementsRef.current.forEach(element => {
        element.classList.remove('hidden'); // Retirer la classe cachée pour réafficher
      });
    };

    // Utilisation de l'API Intersection Observer pour vérifier la visibilité
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          resumeAnimation();
        } else {
          resetAnimation(); // Réinitialiser l'animation si le composant n'est pas visible
        }
      });
    });

    observer.observe(canvasRef.current); // Observer le canvas

    // Nettoyer les écouteurs d'événements lors du démontage du composant
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      observer.disconnect(); // Nettoyer l'observateur lors du démontage
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="particles-header-cursor absolute inset-0 w-full h-full z-0"
    />
  );
};

export const GameProvider = ({ children }) => {
  const [health, setHealth] = React.useState(100);

  return (
    <GameContext.Provider value={{ health, setHealth }}>
      {children}
    </GameContext.Provider>
  );
};

export default ParticlesHeader;
