import React, { useState } from 'react';

const Shop = ({ onClose, multiplierCount, setMultiplierCount, speedCount, setSpeedCount, scoreMultiplier, setScoreMultiplier, credits, setCredits }) => {
    const items = [
        { id: 1, name: 'Green Bonus', price: 100, icon: '/assets/img/green_bonus.png' },
        { id: 2, name: 'Productivity Boost', price: 200, icon: '/assets/img/productivity_boost.png' },
        { id: 3, name: 'Double Production', price: 300, icon: '/assets/img/double_production.png' },
        { id: 4, name: 'Reduce Wait Time', price: 400, icon: '/assets/img/reduce_wait.png' }
    ];

    const [hoveredItem, setHoveredItem] = useState(null);

    const handlePurchase = (item) => {
        console.log(`Achat de ${item.name} pour ${item.price} crédits`);
        console.log('Crédits disponibles:', credits);
        if (credits >= item.price) {
            switch (item.id) {
                case 1: // Green Bonus
                    setMultiplierCount(prevCount => prevCount + 1);
                    setScoreMultiplier(prevMultiplier => prevMultiplier * 2);
                    console.log('Score multiplié par 2');
                    break;
                case 2: // Productivity Boost
                    setSpeedCount(prevCount => prevCount + 1);
                    break;
                default:
                    break;
            }
            // Déduire le prix de l'article des crédits
            setCredits(prevCredits => prevCredits - item.price);
        } else {
            console.log('Pas assez de crédits pour acheter cet article.');
        }
    };

    return (
        <div className="shop-modal" style={{ backgroundColor: 'transparent', boxShadow: '0 4px 20px rgba(0, 0, 0, 0.5)', borderRadius: '10px', padding: '20px', color: 'white', width: '50vw', height: 'auto', position: 'relative' }}>
            <button onClick={onClose} style={{
                position: 'absolute',
                top: '10px',
                right: '10px',
                backgroundColor: 'transparent',
                border: 'none',
                cursor: 'pointer',
                color: 'var(--forge-orange)',
                fontSize: '24px',
            }}>
                &#10005;
            </button>
            <h2 className="shop-title">Boutique</h2>
            <h3>Multiplicateurs : {multiplierCount}</h3>
            <h3>Vitesse : {speedCount}</h3>
            <div className="shop-items" style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', gap: '15px', width: '100%' }}>
                {items.map(item => (
                    <div key={item.id} className="shop-item" style={{
                        backgroundColor: 'rgba(0, 0, 0, 0.1)',
                        borderRadius: '5px',
                        padding: '10px',
                        margin: '10px',
                        boxShadow: hoveredItem === item.id ? '0 8px 20px rgba(0, 0, 0, 0.6)' : '0 2px 4px rgba(0, 0, 0, 0.2)',
                        display: 'inline-block',
                    }}
                    onMouseEnter={() => setHoveredItem(item.id)}
                    onMouseLeave={() => setHoveredItem(null)}
                    >
                        <div style={{
                            width: '60px',
                            height: '60px',
                            borderRadius: '4px',
                            backgroundColor: 'white',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            margin: '0 auto',
                        }}>
                            <img src={item.icon} alt={item.name} className="shop-item-icon" style={{ width: '40px', height: '40px' }} />
                        </div>
                        <span className="shop-item-name" style={{ display: 'block', textAlign: 'center', marginTop: '5px' }}>{item.name}</span>
                        <span className="shop-item-price" style={{ display: 'block', textAlign: 'center', marginTop: '2px' }}>{item.price} crédits</span>
                        <button onClick={() => handlePurchase(item)} className="cosmic-button">Acheter</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Shop;
