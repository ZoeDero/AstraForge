import React, { useEffect, useRef } from 'react';
import '../styles/forge-cursor.css';

const ParticlesHeader = () => {
  const canvasRef = useRef(null);
  let score = 0; // Nouvelle variable pour stocker le score
  let playerHealth = 100; // Initialiser la vie du joueur
  let totalTimeFrozen = false; // Variable pour indiquer que le temps est gelé
  
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
              score += 1; // Ajouter 1 point
              this.touched = true; // Marquer la particule comme touchée
              createSparkleEffect(this.x, this.y); // Créer l'effet d'éclat
              playerHealth = 100; // Réinitialiser la vie du joueur
            }
            const forceDirectionX = -dx / distance; // Direction de la poussée
            const forceDirectionY = -dy / distance; // Direction de la poussée
            const speed = Math.min(5, Math.abs(mouse.speedX) + Math.abs(mouse.speedY)); // Vitesse proportionnelle à celle du curseur
            // Appliquer la force de répulsion avec une vitesse décroissante
            this.speedX += forceDirectionX * 0.5; // Réduire l'amplitude de la poussée
            this.speedY += forceDirectionY * 0.5; // Réduire l'amplitude de la poussée
            this.color = `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 1)`; // Changer la couleur aléatoirement lors du contact
            // Réinitialiser la couleur après 0.5 seconde
            setTimeout(() => {
              this.color = this.originalColor; // Rétablir la couleur d'origine
            }, 500);
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
      const numberOfParticles = (canvas.width * canvas.height) / 6000; // Réduire le nombre de particules en enlevant un tiers
      for (let i = 0; i < numberOfParticles; i++) {
        particlesArray.push(new Particle());
      }
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

            // Ajouter 0.25 points par seconde de connexion
            if (particlesArray[a].touched && particlesArray[b].touched) {
              score += 0.25; // Ajouter 0.25 points de score pour chaque connexion formée
            }
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
    
    // Ajouter un indicateur de score en haut du composant hero
    const scoreElement = document.createElement('div');
    scoreElement.style.position = 'absolute';
    scoreElement.style.top = '60px'; // Positionner sous la navbar avec un espacement
    scoreElement.style.right = '20px';
    scoreElement.style.color = 'white';
    scoreElement.style.fontSize = '20px';
    scoreElement.style.zIndex = '10';
    scoreElement.style.width = '150px'; // Définir une largeur fixe pour éviter les changements de place
    scoreElement.style.textAlign = 'center'; // Centrer le texte dans la boîte
    
    function formatScore(score) {
      if (score >= 1e9) return (score / 1e9).toFixed(1) + 'B'; // Milliards
      if (score >= 1e6) return (score / 1e6).toFixed(1) + 'M'; // Millions
      if (score >= 1e3) return (score / 1e3).toFixed(1) + 'k'; // Milliers
      return score.toString(); // Retourne le score tel quel s'il est inférieur à 1000
    }
    
    // Afficher le score sans condition de limite
    const displayedScore = Math.floor(score);
    scoreElement.innerHTML = '<div>Score:</div><div>' + displayedScore + '</div>'; // Afficher le score formaté
    
    document.body.appendChild(scoreElement);
    
    // Mettre à jour l'affichage du score à chaque changement de score
    function updateScore() {
      // Afficher le score sans condition de limite
      const displayedScore = Math.floor(score);
      scoreElement.innerHTML = '<div>Score:</div><div>' + displayedScore + '</div>'; // Afficher le score formaté
    }
    
    // Appeler la fonction updateScore à chaque fois que le score change
    const originalUpdate = Particle.prototype.update;
    Particle.prototype.update = function() {
      originalUpdate.call(this);
      updateScore();
      if (score > 5000) {
        // Cacher les éléments en position absolue sauf les étoiles et les connexions avec une transition
        const absoluteElements = document.querySelectorAll('.absolute:not(.particles-header-cursor):not(.particle)');
        absoluteElements.forEach(element => {
          element.style.transition = 'opacity 0.5s ease'; // Ajouter une transition d'opacité
          element.style.opacity = '0'; // Réduire l'opacité avant de cacher
          setTimeout(() => {
            element.style.display = 'none';
          }, 500); // Attendre la fin de la transition avant de cacher
        });
      }
    };
    
    // Fonction pour créer un effet d'éclat lorsque les étoiles sont touchées
    function createSparkleEffect(x, y) {
      const sparkle = document.createElement('div');
      sparkle.className = 'sparkle';
      sparkle.style.position = 'absolute';
      sparkle.style.left = `${x}px`;
      sparkle.style.top = `${y}px`;
      sparkle.style.width = '10px';
      sparkle.style.height = '10px';
      sparkle.style.borderRadius = '50%';
      sparkle.style.backgroundColor = 'rgba(255, 255, 255, 0.8)';
      sparkle.style.pointerEvents = 'none';
      document.body.appendChild(sparkle);

      // Animation de disparition
      setTimeout(() => {
        sparkle.style.transition = 'opacity 0.5s ease';
        sparkle.style.opacity = '0';
        setTimeout(() => {
          document.body.removeChild(sparkle);
        }, 500);
      }, 100);
    }

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
      //   if (playerHealth > 0) {
      //     playerHealth--;
      //     healthBar.style.width = playerHealth + 'px'; // Réduire la largeur de la barre
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
        if (totalTime > 0 && !totalTimeFrozen) {
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

    // Logique pour le faux bonus
    function createFalseBonus() {
      const bonus = document.createElement('div');
      bonus.classList.add('false-bonus');
      bonus.style.position = 'absolute';
      bonus.style.width = '30px';
      bonus.style.height = '30px';
      bonus.style.backgroundColor = 'red'; // Couleur rouge pour le faux bonus
      bonus.style.borderRadius = '4px'; // Coins arrondis
      bonus.style.border = '1px solid white'; // Modifier la bordure à 1px blanche au carré
      bonus.style.left = `${Math.random() * canvas.width}px`;
      bonus.style.top = `${Math.random() * canvas.height}px`;

      // Ajouter une croix médicale blanche dessus
      const crossVertical = document.createElement('div');
      crossVertical.style.position = 'absolute';
      crossVertical.style.width = '6px';
      crossVertical.style.height = '20px';
      crossVertical.style.backgroundColor = 'white';
      crossVertical.style.top = '50%';
      crossVertical.style.left = '50%';
      crossVertical.style.transform = 'translate(-50%, -50%)'; // Centrer verticalement

      const crossHorizontal = crossVertical.cloneNode(); // Créer une croix horizontale
      crossHorizontal.style.width = '20px';
      crossHorizontal.style.height = '6px';

      bonus.appendChild(crossVertical); // Ajouter la croix verticale
      bonus.appendChild(crossHorizontal); // Ajouter la croix horizontale
      document.body.appendChild(bonus);

      console.log('Faux bonus créé à la position :', bonus.style.left, bonus.style.top); // Log de création

      // Détecter le contact avec le joueur
      bonus.addEventListener('click', () => {
        console.log('Faux bonus touché !'); // Log de contact
        score = 0; // Réinitialiser le score à 0 lorsque le joueur touche un malus
        console.log('Affichage du message...'); // Log pour vérifier si la fonction est appelée
        showMessage(); // Afficher le message
        document.body.removeChild(bonus); // Retirer le bonus après le contact
      });

      removeBonusAfterTime(bonus); // Appeler la fonction pour retirer le bonus après 2 secondes
    }

    function removeBonusAfterTime(bonus) {
      setTimeout(() => {
        if (bonus.parentNode) {
          document.body.removeChild(bonus); // Retirer le bonus après 2 secondes
        }
      }, 2000);
    }

    function freezeTimeGain() {
      // Geler les gains de temps pendant 5 secondes
      const freezeDuration = 5000;
      totalTimeFrozen = true; // Variable pour indiquer que le temps est gelé

      setTimeout(() => {
        totalTimeFrozen = false; // Réactiver les gains de temps après 5 secondes
      }, freezeDuration);
    }

    // Fonction pour afficher un message après avoir pris un malus
    function showMessage() {
      const messageElement = document.createElement('div');
      messageElement.innerText = "Y'a pas de vie dans le jeu IDIOT !";
      messageElement.style.position = 'fixed';
      messageElement.style.top = '50%';
      messageElement.style.left = '50%';
      messageElement.style.transform = 'translate(-50%, -50%)';
      messageElement.style.fontSize = '24px';
      messageElement.style.color = 'red';
      messageElement.style.zIndex = '1000';
      messageElement.style.opacity = '0';
      messageElement.style.transition = 'opacity 0.5s ease';
      messageElement.style.pointerEvents = 'none'; // S'assurer que le message ne bloque pas les clics

      document.body.appendChild(messageElement);

      // Faire apparaître le message
      setTimeout(() => {
        messageElement.style.opacity = '1';
      }, 100);

      // Faire disparaître le message après 2 secondes
      setTimeout(() => {
        messageElement.style.opacity = '0';
        setTimeout(() => {
          document.body.removeChild(messageElement);
        }, 500);
      }, 2000);
    }

    // Créer un faux bonus à intervalles aléatoires, augmentant la fréquence à chaque palier de 10000
    function createRandomBonus() {
      console.log('Score actuel :', score); // Log pour vérifier le score
      if (score >= 10000) { // Vérifier si le score atteint 10000
        console.log('Création d’un faux bonus'); // Log pour vérifier la création
        createFalseBonus(); // Créer un faux bonus

        // Faire disparaître le faux bonus après un temps aléatoire entre 5 et 7 secondes
        const disappearTime = Math.floor(Math.random() * 2000) + 5000; // Temps entre 5000 et 7000 ms
        setTimeout(() => {
          // Logique pour faire disparaître le faux bonus
          const bonuses = document.querySelectorAll('.false-bonus');
          bonuses.forEach(bonus => {
            document.body.removeChild(bonus);
          });
          console.log('Faux bonus disparu');
        }, disappearTime);
      }

      // Calculer l'intervalle en fonction du score
      const intervalMultiplier = Math.floor(score / 10000);
      const randomInterval = Math.max(1000 - intervalMultiplier * 100, 500); // Réduire l'intervalle à chaque palier de 10k
      setTimeout(createRandomBonus, randomInterval); // Appeler la fonction après un intervalle aléatoire
    }

    // Appeler la fonction pour commencer à créer des faux bonus
    createRandomBonus();

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
          playerHealth -= 10; // Exemple de réduction de vie, ajuste selon tes besoins
          score = 0; // Réinitialiser le score à 0 lorsque le joueur touche un malus
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
    
    // Nettoyage
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      document.body.removeChild(scoreElement);
    };
  }, []);
  
  return (
    <canvas 
      ref={canvasRef} 
      className="particles-header-cursor absolute inset-0 w-full h-full z-0"
    />
  );
};

export default ParticlesHeader;
