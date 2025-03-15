import React, { useState } from 'react';

const Shop = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [items, setItems] = useState([]);

    const toggleShop = () => {
        console.log('Boutique toggled. Current state:', !isOpen);
        setIsOpen(!isOpen);
        if (!isOpen) {
            console.log('Opening shop and setting items.');
            // Simuler l'apparition des items
            setItems([
                { id: 1, name: 'Green Bonus', icon: '/assets/img/green_bonus.png' },
                { id: 2, name: 'Productivity Boost', icon: '/assets/img/productivity_boost.png' },
                { id: 3, name: 'Double Production', icon: '/assets/img/double_production.png' },
                { id: 4, name: 'Reduce Wait Time', icon: '/assets/img/reduce_wait.png' }
            ]);
            console.log('Items set with longer display duration.');
        }
    };

    return (
        <>
            <div style={{ position: 'fixed', bottom: '10px', left: '50%', transform: 'translateX(-50%)', width: 'calc(50% - 20px)' }}>
                <button className="cosmic-button" onClick={toggleShop} style={{ width: '100%' }}>Boutique</button>
            </div>
            {isOpen && (
                <div style={{ padding: '20px', backgroundColor: 'var(--deep-space)', borderRadius: '10px', color: 'var(--text-primary)', position: 'absolute', bottom: '60px', left: '10px', width: 'calc(100% - 20px)', zIndex: 10 }}>
                    <h2 style={{ fontSize: '24px', marginBottom: '10px' }}>Boutique</h2>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        {items.map((item) => (
                            <div key={item.id} style={{ display: 'flex', alignItems: 'center', backgroundColor: 'var(--nebula-purple)', borderRadius: '5px', padding: '10px' }}>
                                <img src={item.icon} alt={item.name} style={{ marginRight: '10px' }} />
                                <span>{item.name}</span>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </>
    );
};

export default Shop;
