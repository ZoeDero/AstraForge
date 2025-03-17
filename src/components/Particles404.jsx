import React, { useState, useEffect } from 'react';
import ParticlesHeader from './ParticlesHeader';
import StatsDropdown from './StatsDropdown'; // Importation du nouveau composant StatsDropdown
import Shop from './Shop'; // Importation du nouveau composant Shop
import '../styles/dropdown.css';
import '../styles/modal.css';

// Définition de la classe Particle
class Particle {
  constructor() {
    this.x = Math.random() * window.innerWidth;
    this.y = Math.random() * (window.innerHeight - 100);
    this.size = 15;
    this.color = 'white'; // Couleur par défaut des particules
  }

  draw(ctx) {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

const Particles404 = () => {
  const [credits, setCredits] = useState(1000); // ou toute autre valeur initiale
  const [connections, setConnections] = useState(0);
  const [connectionsCount, setConnectionsCount] = useState(0); // Nouveau compteur pour les connexions

  useEffect(() => {
    const interval = setInterval(() => {
      setCredits(prevCredits => prevCredits + (0.1 * connections));
    }, 1000);
    return () => clearInterval(interval);
  }, [connections]);

  useEffect(() => {
    const interval = setInterval(() => {
      setConnections(prevConnections => prevConnections + 1);
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  // Modifier la classe Bonus pour donner une taille aléatoire aux bonus et malus
  class Bonus {
    constructor() {
      this.x = Math.random() * window.innerWidth;
      this.y = Math.random() * (window.innerHeight - 100);
      this.size = Math.floor(Math.random() * 30) + 10; // Taille aléatoire entre 10 et 40
      this.type = Math.random() < 0.5 ? 'points' : (Math.random() < 0.5 ? 'speed' : 'multiplier'); // Nouveau type de bonus
      this.image = new Image();
      this.image.src = this.type === 'speed' ? '/assets/img/reverse.png' : (this.type === 'multiplier' ? '/assets/img/green_bonus.png' : '/assets/img/coin.png'); // Chemin vers l'image de la pièce ou malus

      // Assurez-vous que l'image est chargée avant de l'utiliser
      this.image.onload = () => {
        console.log('Image chargée:', this.image);
      };

      // Valeur de perte de points en pourcentage pour les malus
      if (this.type === 'speed') {
        this.value = Math.floor(Math.random() * 20) + 5; // Valeur de perte de points entre 5% et 25%
        this.type = 'malus'; // Type de malus
      }
    }

    draw(ctx) {
      ctx.drawImage(this.image, this.x - this.size, this.y - this.size, this.size * 2, this.size * 2);
    }
  }

  let bonusesArray = [];
  useEffect(() => {
    const interval = setInterval(() => {
        if (bonusesArray.length < 5) { // Limiter le nombre de bonus à l'écran
            const newBonus = new Bonus();
            bonusesArray.push(newBonus);
            // Faire disparaître le bonus après un court délai
            setTimeout(() => {
                bonusesArray.splice(bonusesArray.indexOf(newBonus), 1);
            }, Math.floor(Math.random() * 5000) + 3000); // Disparaît après 3 à 8 secondes
        }
    }, Math.floor(Math.random() * 2000) + 500); // Apparition aléatoire entre 500ms et 2500ms
    return () => clearInterval(interval);
  }, []);

  let mouseX, mouseY;
  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  let speedMultiplier = 1;
  let speedDuration = 5000; // 5 secondes de vitesse augmentée
  let particleSize = 15; // Taille initiale des particules
  let connectionSize = 1; // Taille initiale des connexions

  // Tableaux pour stocker les particules et les connexions
  let particlesArray = [];
  let connectionsArray = [];

  // Fonction pour dessiner les particules et les connexions
  function drawParticlesAndConnections(ctx) {
    // Dessiner les particules
    for (let i = 0; i < particlesArray.length; i++) {
      ctx.fillStyle = particlesArray[i].color;
      ctx.beginPath();
      ctx.arc(particlesArray[i].x, particlesArray[i].y, particleSize * speedMultiplier, 0, Math.PI * 2);
      ctx.fill();
    }
    // Dessiner les connexions
    for (let i = 0; i < connectionsArray.length; i++) {
      ctx.strokeStyle = connectionsArray[i].color;
      ctx.lineWidth = connectionSize * speedMultiplier;
      ctx.beginPath();
      ctx.moveTo(connectionsArray[i].startX, connectionsArray[i].startY);
      ctx.lineTo(connectionsArray[i].endX, connectionsArray[i].endY);
      ctx.stroke();
    }
  }

  const [scoreMultiplier, setScoreMultiplier] = useState(1); // Multiplier de score global

  // Stocker les compteurs dans des variables d'état réactives
  const [pointsCount, setPointsCount] = useState(0);
  const [speedCount, setSpeedCount] = useState(0);
  const [multiplierCount, setMultiplierCount] = useState(0);

  // Modifier la logique de collecte des bonus pour que les pièces (bonus jaunes) valent 0.1 au début et appliquer l'effet multiplicateur du bonus vert
  function animate() {
    const canvas = document.getElementById('canvas');
    if (canvas) {
      const ctx = canvas.getContext('2d');
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
      for (let i = 0; i < bonusesArray.length; i++) {
          bonusesArray[i].draw(ctx);
          const dx = mouseX - bonusesArray[i].x;
          const dy = mouseY - bonusesArray[i].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          if (distance < bonusesArray[i].size + 10) {
              if (bonusesArray[i].type === 'points') {
                  const pointsValue = 0.1 * scoreMultiplier;
                  setCredits(prevCredits => {
                      const newCredits = prevCredits + pointsValue;
                      return newCredits < 0 ? 0 : newCredits; // Remettre à 0 si le score devient négatif
                  });
                  setPointsCount(prevCount => prevCount + 1); // Incrémenter le compteur de points
              } else if (bonusesArray[i] && bonusesArray[i].type === 'malus') {
                  const penalty = bonusesArray[i].value; // Assurez-vous que bonusesArray[i] existe
                  setCredits(prevCredits => {
                      const newCredits = prevCredits - (prevCredits * penalty / 100); // Enlève le pourcentage du score total
                      return newCredits < 0 ? 0 : newCredits; // Remettre à 0 si le score devient négatif
                  });
                  setSpeedCount(prevCount => prevCount + 1); // Incrémenter le compteur de malus
              } else if (bonusesArray[i] && bonusesArray[i].type === 'multiplier') {
                  setMultiplierCount(prevCount => prevCount + 1); // Incrémenter le compteur de multiplicateurs
                  setScoreMultiplier(prevMultiplier => prevMultiplier * 2); // Par exemple, multiplier par 2
              }
              // Logique pour établir une connexion entre les particules
              for (let j = 0; j < particlesArray.length; j++) {
                if (i !== j) { // Éviter de comparer la particule avec elle-même
                  const dx = particlesArray[i].x - particlesArray[j].x;
                  const dy = particlesArray[i].y - particlesArray[j].y;
                  const distanceBetweenParticles = Math.sqrt(dx * dx + dy * dy);
                  
                  // Vérifiez si les particules se touchent
                  if (distanceBetweenParticles < (particleSize * 2)) { 
                      setConnectionsCount(prevCount => prevCount + 1); // Incrémenter le compteur de connexions
                  }
                }
              }
              bonusesArray.splice(i, 1);
              i--;
          }
      }
      drawParticlesAndConnections(ctx);
      requestAnimationFrame(animate);
    } else {
      console.error('Canevas non trouvé');
    }
  }

  useEffect(() => {
    animate();
  }, []);

  // Repositionner les compteurs sous les icônes dans le tableau des bonus
  const BonusInfo = () => {
    return (
      <div className="bonus-info" style={{ position: 'absolute', top: '60px', left: '10px', padding: '10px', borderRadius: '5px', backgroundColor: 'transparent' }}>
        <ul style={{ listStyleType: 'none', padding: 0, display: 'flex', gap: '20px', flexDirection: 'column' }}>
          <li title={`Points collectés: ${pointsCount}. Effet: Augmente le score total. Total: ${(pointsCount * 0.1).toFixed(1)}`} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <img src="/assets/img/coin.png" alt="Bonus Points" style={{ width: '30px', height: '30px' }} />
            <span style={{ marginTop: '5px' }}>{pointsCount}</span>
          </li>
          <li title={`Malus collectés: ${speedCount}. Effet: Réduit le score total de ${(speedCount * 10).toFixed(1)}%`} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <img src="/assets/img/reverse.png" alt="Bonus Speed" style={{ width: '30px', height: '30px' }} />
            <span style={{ marginTop: '5px' }}>{speedCount}</span>
          </li>
          <li title={`Multiplicateurs collectés: ${multiplierCount}. Effet: Multiplie le score par ${Math.pow(2, multiplierCount)}`} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <img src="/assets/img/green_bonus.png" alt="Bonus Multiplier" style={{ width: '30px', height: '30px' }} />
            <span style={{ marginTop: '5px' }}>{multiplierCount}</span>
          </li>
          <li title={`Connections collectées: ${connectionsCount}`} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ width: '30px', height: '30px', borderRadius: '50%', backgroundColor: 'red' }}></div>
            <span style={{ marginTop: '5px' }}>{connectionsCount}</span>
          </li>
        </ul>
      </div>
    );
  };

  // Corriger le comportement du dropdown pour qu'il reste ouvert
  const ShopDropdown = () => {
    const [isOpen, setIsOpen] = useState(false);

    const handleToggle = () => {
      setIsOpen(prev => !prev);
    };

    const handlePurchase = (item) => {
      console.log('Multiplier Count avant achat:', multiplierCount);
      console.log('Speed Count avant achat:', speedCount);
      console.log(`Achat de ${item.name} pour ${item.price} pièces`);
      switch (item.id) {
        case 1: // Green Bonus
          setMultiplierCount(prevCount => prevCount + 1);
          console.log('Multiplier Count après achat:', multiplierCount + 1);
          break;
        case 2: // Productivity Boost
          setSpeedCount(prevCount => prevCount + 1);
          console.log('Speed Count après achat:', speedCount + 1);
          break;
        default:
          break;
      }
    };

    return (
      <div style={{ position: 'relative' }}>
        <button onClick={handleToggle} style={{ padding: '10px', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '5px' }}>Boutique</button>
        {isOpen && (
          <div className="shop-dropdown" style={{ position: 'absolute', backgroundColor: 'transparent', border: '1px solid black', borderRadius: '5px', padding: '10px', zIndex: 1000 }}>
            <h3>Acheter des améliorations</h3>
            <ul>
              <li onClick={() => handlePurchase({ id: 1, name: 'Green Bonus', price: 1 })}>Augmenter la hitbox du curseur (1 pièce)</li>
              <li onClick={() => handlePurchase({ id: 2, name: 'Productivity Boost', price: 2 })}>Augmenter la vitesse (2 pièces)</li>
              <li onClick={() => handlePurchase({ id: 3, name: 'Points Boost', price: 3 })}>Améliorer les points (3 pièces)</li>
              <li onClick={() => handlePurchase({ id: 4, name: 'Multiplier Boost', price: 4 })}>Augmenter le multiplicateur (4 pièces)</li>
            </ul>
          </div>
        )}
      </div>
    );
  };

  const [isModalOpen, setModalOpen] = useState(false);

  const openShop = () => {
    setModalOpen(true);
  };

  const closeShop = () => {
    setModalOpen(false);
  };

  // Intégrer le dropdown dans le composant Particles404
  useEffect(() => {
    const style = document.createElement('style');
    style.innerHTML = `
      .bg-deep-space { background: transparent; }
      .modal {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: white;
        border-radius: 4px;
        padding: 20px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
        z-index: 1000;
      }
      .shop-items {
        display: flex;
        flex-direction: column;
        align-items: center;
      }
      .shop-item {
        background: lightgray;
        border-radius: 4px;
        padding: 10px;
        margin: 10px;
        text-align: center;
      }
    `;
    document.head.appendChild(style);
  }, []);

  return (
    <div>
      <button className="cosmic-button" onClick={openShop} style={{ position: 'absolute', bottom: '20px', left: '50%', transform: 'translateX(-50%)', zIndex: 1000 }}>Ouvrir la Boutique</button>
      {isModalOpen && (
        <div className="modal">
          <h2>Boutique</h2>
          <Shop 
            onClose={closeShop} 
            multiplierCount={multiplierCount} 
            setMultiplierCount={setMultiplierCount} 
            speedCount={speedCount} 
            setSpeedCount={setSpeedCount} 
            credits={credits} 
            setCredits={setCredits} 
            scoreMultiplier={scoreMultiplier} 
            setScoreMultiplier={setScoreMultiplier} 
          />
          <button className="close-button" onClick={closeShop}>Fermer</button>
        </div>
      )}
      <div className="min-h-screen bg-deep-space cursor-vaisseau">
        <ParticlesHeader />
        <canvas id="canvas" width={window.innerWidth} height={window.innerHeight} style={{ position: 'absolute', top: 0, left: 0 }}></canvas>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'absolute', top: '60px', left: '10px', width: 'calc(100% - 20px)', padding: '0 10px' }}>
          <StatsDropdown /> 
          <BonusInfo />
          <ShopDropdown />
        </div>
        <div className="flex flex-col items-center justify-center py-12 cursor-vaisseau">
          <h1 className="cosmic-title text-5xl font-extrabold text-white">404</h1>
          <p className="mt-3 max-w-2xl mx-auto text-xl cosmic-text">
            La page que vous cherchez n'existe pas.
          </p>
          <p className="mt-3 max-w-2xl mx-auto text-xl cosmic-text">
            Crédits: {credits.toFixed(1)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Particles404;