import React, { useEffect, useRef } from 'react';
import '../styles/forge-cursor.css';

const ParticlesHeader = () => {
  const canvasRef = useRef(null);
  let score = 0; // Nouvelle variable pour stocker le score
  
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
            }
            const forceDirectionX = -dx / distance; // Direction de la poussée
            const forceDirectionY = -dy / distance; // Direction de la poussée
            const speed = Math.min(5, Math.abs(mouse.speedX) + Math.abs(mouse.speedY)); // Vitesse proportionnelle à celle du curseur
            // Appliquer la force de répulsion avec une vitesse décroissante
            this.speedX += forceDirectionX * 0.5; // Réduire l'amplitude de la poussée
            this.speedY += forceDirectionY * 0.5; // Réduire l'amplitude de la poussée
            this.color = `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 1)`; // Changer la couleur aléatoirement lors du contact
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
        }
        if (this.y + this.size > canvas.height || this.y - this.size < 0) {
          this.speedY = -this.speedY * 1.3; // Augmenter la force de répulsion
          if (this.y + this.size > canvas.height) this.y = canvas.height - this.size; 
          if (this.y - this.size < 0) this.y = this.size; 
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

    // Connexion entre les particules
    function connect() {
      let opacityValue = 1;
      if (Date.now() - lastRandomizeTime > 30000) { // Randomize every 30 seconds
        maxDistance = Math.random() * (100 - 50) + 50;
        lastRandomizeTime = Date.now();
      }

      for (let a = 0; a < particlesArray.length; a++) {
        for (let b = a; b < particlesArray.length; b++) {
          const dx = particlesArray[a].x - particlesArray[b].x;
          const dy = particlesArray[a].y - particlesArray[b].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < maxDistance) {
            // Plus la distance est petite, plus la ligne est opaque
            opacityValue = 1 - (distance / maxDistance);
            const colorA = particlesArray[a].color.match(/^rgba\((\d+),\s*(\d+),\s*(\d+),\s*(\d+(?:\.\d+)?)\)$/);
            const colorB = particlesArray[b].color.match(/^rgba\((\d+),\s*(\d+),\s*(\d+),\s*(\d+(?:\.\d+)?)\)$/);
            ctx.strokeStyle = `rgba(${Math.floor((parseInt(colorA[1]) + parseInt(colorB[1])) / 2)}, ${Math.floor((parseInt(colorA[2]) + parseInt(colorB[2])) / 2)}, ${Math.floor((parseInt(colorA[3]) + parseInt(colorB[3])) / 2)}, ${opacityValue * 0.5})`; // Appliquer un dégradé entre les couleurs des étoiles connectées
            ctx.lineWidth = opacityValue * 1.5; // Lignes plus épaisses quand plus proches
            ctx.beginPath();
            ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
            ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
            ctx.stroke();

            // Ajouter 0.25 points pour chaque connexion formée
            if (particlesArray[a].touched && particlesArray[b].touched) {
              score += 0.25;
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
    
    scoreElement.innerHTML = '<div>Score:</div><div>' + formatScore(score) + '</div>'; // Afficher le score formaté
    document.body.appendChild(scoreElement);
    
    // Mettre à jour l'affichage du score à chaque changement de score
    function updateScore() {
      scoreElement.innerHTML = '<div>Score:</div><div>' + formatScore(score) + '</div>'; // Afficher le score formaté
    }
    
    // Appeler la fonction updateScore à chaque fois que le score change
    const originalUpdate = Particle.prototype.update;
    Particle.prototype.update = function() {
      originalUpdate.call(this);
      updateScore();
      if (score > 5000) {
        // Cacher les éléments en position absolue sauf les étoiles et les connexions avec effet de fondu
        const absoluteElements = document.querySelectorAll('.absolute:not(.particles-header-cursor):not(.particle)');
        absoluteElements.forEach(element => {
          element.style.transition = 'opacity 0.5s ease'; // Ajouter la transition
          element.style.opacity = '0'; // Rendre l'élément transparent
          setTimeout(() => {
            element.style.display = 'none'; // Cacher l'élément après la transition
          }, 500);
        });
      }
    };
    
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
