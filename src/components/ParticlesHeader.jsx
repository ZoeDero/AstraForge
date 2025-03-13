import React, { useEffect, useRef } from 'react';

const ParticlesHeader = () => {
  const canvasRef = useRef(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let particlesArray = [];
    let mouse = {
      x: null,
      y: null,
      radius: 50, // Définir un cercle de 25px autour du pointeur pour la hitbox
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
        // Positionner plus de particules en bas à gauche
        this.x = Math.random() < 0.7 
          ? Math.random() * (canvas.width * 0.5) 
          : Math.random() * canvas.width;
        this.y = Math.random() < 0.7 
          ? canvas.height - (Math.random() * (canvas.height * 0.5)) 
          : Math.random() * canvas.height;
        
        this.size = Math.random() * 0.8 + 0.2; // Taille entre 0.2 et 1px
        this.baseSize = this.size;
        // Vitesses très petites et aléatoires
        this.speedX = Math.random() * 0.5 - 0.25;
        this.speedY = Math.random() * 0.5 - 0.25;
        this.color = `rgba(255, 255, 255, ${Math.random() * 0.5 + 0.1})`; // Opacité aléatoire pour le clignotement
        this.density = (Math.random() * 30) + 1;
      }
      
      update() {
        // Vérifier la proximité avec la souris pour l'interaction
        if (mouse.x != null && mouse.y != null) {
          const dx = mouse.x - this.x;
          const dy = mouse.y - this.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          if (distance < this.size + mouse.radius) { // Ne repousser que si la particule est touchée
            const forceDirectionX = -dx / distance; // Direction de la poussée
            const forceDirectionY = -dy / distance; // Direction de la poussée
            const speed = Math.min(5, Math.abs(mouse.speedX) + Math.abs(mouse.speedY)); // Vitesse proportionnelle à celle du curseur
            // Appliquer la force de répulsion avec une vitesse décroissante
            this.x += forceDirectionX * speed * 0.5; // Appliquer la force de répulsion
            this.y += forceDirectionY * speed * 0.5; // Appliquer la force de répulsion
            this.speedX += forceDirectionX * 0.5; // Ajouter un petit glissement
            this.speedY += forceDirectionY * 0.5; // Ajouter un petit glissement
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
        ctx.fillStyle = this.color;
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
      const numberOfParticles = (canvas.width * canvas.height) / 8000; // Réduire le nombre de particules en enlevant un tiers
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
            ctx.strokeStyle = `rgba(255, 255, 255, ${opacityValue * 0.5})`;
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
    
    // Nettoyage
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);
  
  return (
    <canvas 
      ref={canvasRef} 
      className="absolute inset-0 w-full h-full z-0"
      style={{ 
        
        cursor: 'pointer'
      }}
    />
  );
};

export default ParticlesHeader;
