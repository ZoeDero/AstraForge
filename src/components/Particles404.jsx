import React, { useState, useEffect } from 'react';
import ParticlesHeader from './ParticlesHeader';
import StatsDropdown from './StatsDropdown'; // Importation du nouveau composant StatsDropdown
import Shop from './Shop'; // Importation du nouveau composant Shop
import '../styles/dropdown.css';

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
            console.log('Nouveau bonus ajouté:', newBonus); // Log pour vérifier l'ajout des bonus

            // Faire disparaître le bonus après un court délai
            setTimeout(() => {
                bonusesArray.splice(bonusesArray.indexOf(newBonus), 1);
                console.log('Bonus disparu:', newBonus);
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

  let scoreMultiplier = 1; // Multiplier de score global

  // Stocker les compteurs dans des variables pour une gestion plus facile
  let pointsCount = 0;
  let speedCount = 0;
  let multiplierCount = 0;

  // Modifier la logique de collecte des bonus pour que les pièces (bonus jaunes) valent 0.1 au début et appliquer l'effet multiplicateur du bonus vert
  function animate() {
    const ctx = document.getElementById('canvas').getContext('2d');
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    for (let i = 0; i < bonusesArray.length; i++) {
        bonusesArray[i].draw(ctx);
        console.log('Bonus dessiné:', bonusesArray[i]); // Log pour vérifier le dessin des bonus
        const dx = mouseX - bonusesArray[i].x;
        const dy = mouseY - bonusesArray[i].y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        console.log('Position de la souris:', mouseX, mouseY); // Log de la position de la souris
        console.log('Distance au bonus:', distance); // Log de la distance
        if (distance < bonusesArray[i].size + 10) {
            console.log('Bonus collecté:', bonusesArray[i]); // Log pour vérifier la collecte
            if (bonusesArray[i].type === 'points') {
                console.log('Compteur de points avant:', pointsCount);
                // Appliquer la valeur de 0.1 et le multiplicateur
                const pointsValue = 0.1 * scoreMultiplier;
                pointsCount += 1; // Incrémenter le compteur de points
                setScore(prevScore => {
                    const newScore = prevScore + pointsValue;
                    return newScore < 0 ? 0 : newScore; // Remettre à 0 si le score devient négatif
                });
                console.log('Compteur de points après:', pointsCount);
            } else if (bonusesArray[i].type === 'malus') {
                setScore(prevScore => {
                    const penalty = bonusesArray[i].value; // Valeur de perte de points en pourcentage
                    console.log('Valeur de prevScore:', prevScore);
                    console.log('Valeur de penalty:', penalty);
                    const newScore = prevScore - (prevScore * penalty / 100); // Enlève le pourcentage du score total
                    return newScore < 0 ? 0 : newScore; // Remettre à 0 si le score devient négatif
                });
                console.log('Malus appliqué:', bonusesArray[i].value);
                speedCount += 1; // Incrémenter le compteur de malus
                console.log('Compteur de malus:', speedCount);
            } else if (bonusesArray[i].type === 'multiplier') {
                multiplierCount += 1; // Incrémenter le compteur de multiplicateurs
                scoreMultiplier *= 2; // Par exemple, multiplier par 2
                console.log('Multiplicateur appliqué:', scoreMultiplier);
                console.log('Compteur de multiplicateurs:', multiplierCount);
            }
            bonusesArray.splice(i, 1);
            i--;
        }
    }
    drawParticlesAndConnections(ctx);
    requestAnimationFrame(animate);
  }

  useEffect(() => {
    animate();
  }, []);

  // Repositionner les compteurs sous les icônes dans le tableau des bonus
  const BonusInfo = () => {
    return (
      <div className="bonus-info" style={{ position: 'absolute', top: '60px', left: '10px', padding: '10px', borderRadius: '5px', backgroundColor: 'transparent' }}>
        <ul style={{ listStyleType: 'none', padding: 0, display: 'flex', gap: '20px', flexDirection: 'column' }}>
          <li title={`Points collectés: ${pointsCount}`} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <img src="/assets/img/coin.png" alt="Bonus Points" style={{ width: '30px', height: '30px' }} />
            <span style={{ marginTop: '5px' }}>{pointsCount}</span>
          </li>
          <li title={`Malus collectés: ${speedCount}`} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <img src="/assets/img/reverse.png" alt="Bonus Speed" style={{ width: '30px', height: '30px' }} />
            <span style={{ marginTop: '5px' }}>{speedCount}</span>
          </li>
          <li title={`Multiplicateurs collectés: ${multiplierCount}`} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <img src="/assets/img/green_bonus.png" alt="Bonus Multiplier" style={{ width: '30px', height: '30px' }} />
            <span style={{ marginTop: '5px' }}>{multiplierCount}</span>
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

    const handlePurchase = (cost, effect) => {
      if (pointsCount >= cost) {
        pointsCount -= cost; // Déduire le coût des pièces
        // Appliquer l'effet selon le type d'amélioration
        if (effect === 'increaseHitbox') {
          console.log('Hitbox du curseur augmentée.');
        } else if (effect === 'increaseSpeed') {
          console.log('Vitesse augmentée.');
        } else if (effect === 'increasePoints') {
          console.log('Points augmentés.');
        } else if (effect === 'increaseMultiplier') {
          console.log('Multiplicateur augmenté.');
        }
      } else {
        console.log('Pas assez de pièces pour acheter cette amélioration.');
      }
    };

    return (
      <div style={{ position: 'relative' }}>
        <button onClick={handleToggle} style={{ padding: '10px', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '5px' }}>Boutique</button>
        {isOpen && (
          <div className="shop-dropdown" style={{ position: 'absolute', backgroundColor: 'transparent', border: '1px solid black', borderRadius: '5px', padding: '10px', zIndex: 1000 }}>
            <h3>Acheter des améliorations</h3>
            <ul>
              <li onClick={() => handlePurchase(1, 'increaseHitbox')}>Augmenter la hitbox du curseur (1 pièce)</li>
              <li onClick={() => handlePurchase(2, 'increaseSpeed')}>Augmenter la vitesse (2 pièces)</li>
              <li onClick={() => handlePurchase(3, 'increasePoints')}>Améliorer les points (3 pièces)</li>
              <li onClick={() => handlePurchase(4, 'increaseMultiplier')}>Augmenter le multiplicateur (4 pièces)</li>
            </ul>
          </div>
        )}
      </div>
    );
  };

  // Intégrer le dropdown dans le composant Particles404
  return (
    <div className="min-h-screen bg-deep-space cursor-vaisseau">
      <ParticlesHeader />
      <canvas id="canvas" width={window.innerWidth} height={window.innerHeight} style={{ position: 'absolute', top: 0, left: 0 }}></canvas>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'absolute', top: '60px', left: '10px', width: 'calc(100% - 20px)', padding: '0 10px' }}>
        <StatsDropdown /> 
        <BonusInfo />
        <Shop />
      </div>
      <div className="flex flex-col items-center justify-center py-12 cursor-vaisseau">
        <h1 className="cosmic-title text-5xl font-extrabold text-white">404</h1>
        <p className="mt-3 max-w-2xl mx-auto text-xl cosmic-text">
          La page que vous cherchez n'existe pas.
        </p>
        <p className="mt-3 max-w-2xl mx-auto text-xl cosmic-text">
          Score: {score.toFixed(1)}
        </p>
      </div>
    </div>
  );
};

export default Particles404;