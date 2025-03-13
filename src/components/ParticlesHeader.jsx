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
      radius: 150
    };
    
    // Capture la position de la souris
    function handleMouseMove(event) {
      mouse.x = event.x;
      mouse.y = event.y;
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
        
        this.size = Math.random() * 3 + 1;
        this.baseSize = this.size;
        // Vitesses très petites et aléatoires
        this.speedX = Math.random() * 0.5 - 0.25;
        this.speedY = Math.random() * 0.5 - 0.25;
        this.color = `rgba(255, 255, 255, ${Math.random() * 0.5 + 0.1})`;
        this.density = (Math.random() * 30) + 1;
      }
      
      update() {
        // Vérifier la proximité avec la souris pour l'interaction
        if (mouse.x != null && mouse.y != null) {
          const dx = mouse.x - this.x;
          const dy = mouse.y - this.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          const forceDirectionX = dx / distance;
          const forceDirectionY = dy / distance;
          
          // Distance maximale d'effet de la souris
          const maxDistance = mouse.radius;
          // Force de répulsion
          const force = (maxDistance - distance) / maxDistance;
          
          // Si la particule est à portée de la souris
          if (distance < maxDistance) {
            // Repousser la particule
            this.x -= forceDirectionX * force * this.density;
            this.y -= forceDirectionY * force * this.density;
            // Augmenter légèrement la taille pour l'effet visuel
            this.size = this.baseSize + 1;
          } else {
            // Retour à la taille normale
            if (this.size > this.baseSize) {
              this.size -= 0.1;
            }
          }
        }
        
        // Mouvement normal
        this.x += this.speedX;
        this.y += this.speedY;
        
        // Rebond sur les bords avec légère perte d'énergie
        if (this.x > canvas.width || this.x < 0) {
          this.speedX = -this.speedX * 0.95;
          if (this.x > canvas.width) this.x = canvas.width;
          if (this.x < 0) this.x = 0;
        }
        if (this.y > canvas.height || this.y < 0) {
          this.speedY = -this.speedY * 0.95;
          if (this.y > canvas.height) this.y = canvas.height;
          if (this.y < 0) this.y = 0;
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
      mouse.radius = canvas.width * 0.1; // Ajuster le rayon en fonction de la taille de l'écran
      init();
    };
    
    // Initialisation des particules
    function init() {
      particlesArray = [];
      const numberOfParticles = (canvas.width * canvas.height) / 10000; // Plus de particules
      for (let i = 0; i < numberOfParticles; i++) {
        particlesArray.push(new Particle());
      }
    }
    
    // Connexion entre les particules
    function connect() {
      let opacityValue = 1;
      const maxDistance = 150;
      
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
