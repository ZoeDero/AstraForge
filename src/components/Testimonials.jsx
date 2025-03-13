import React, { useState, useEffect } from 'react';

/**
 * Composant Testimonials - Affiche les témoignages clients sous forme de carrousel
 * @returns {JSX.Element} - Section de témoignages clients
 */
const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  
  // Liste des témoignages
  const testimonials = [
    {
      id: 1,
      name: "Marie Dupont",
      company: "Boutique Élégance",
      position: "Propriétaire",
      quote: "Zoé a complètement transformé l'image de ma boutique. Son design moderne et élégant a attiré de nouveaux clients et a considérablement augmenté ma visibilité en ligne.",
      avatar: "/assets/img/testimonials/avatar1.jpg"
    },
    {
      id: 2,
      name: "Thomas Martin",
      company: "Agence Horizon",
      position: "Directeur Marketing",
      quote: "La refonte de notre site web par AstraForge a dépassé toutes nos attentes. Non seulement le design est superbe, mais les performances du site se sont nettement améliorées, ce qui a eu un impact direct sur notre taux de conversion.",
      avatar: "/assets/img/testimonials/avatar2.jpg"
    },
    {
      id: 3,
      name: "Sophie Leroy",
      company: "Association Culturelle de Cambrai",
      position: "Présidente",
      quote: "Travailler avec Zoé a été une expérience très agréable. Elle a su capturer l'essence de notre association et créer une identité visuelle qui nous représente parfaitement. Je recommande vivement ses services.",
      avatar: "/assets/img/testimonials/avatar3.jpg"
    }
  ];

  // Passer automatiquement au témoignage suivant toutes les 5 secondes
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [testimonials.length]);

  // Passer au témoignage suivant
  const nextTestimonial = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  // Passer au témoignage précédent
  const prevTestimonial = () => {
    setActiveIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="py-16 bg-deep-space min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="cosmic-title text-4xl font-extrabold sm:text-5xl lg:text-6xl">
            Ce que disent nos clients
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-xl cosmic-text">
            Découvrez les expériences de ceux qui ont fait confiance à AstraForge pour leurs projets créatifs.
          </p>
        </div>

        <div className="relative max-w-3xl mx-auto">
          {/* Carrousel de témoignages */}
          <div className="overflow-hidden">
            <div 
              className="flex transition-transform duration-500 ease-in-out" 
              style={{ transform: `translateX(-${activeIndex * 100}%)` }}
            >
              {testimonials.map((testimonial) => (
                <div key={testimonial.id} className="w-full flex-shrink-0 px-4">
                  <div className="bg-deep-space bg-opacity-50 backdrop-filter backdrop-blur-sm rounded-[7px] shadow-xl p-8 md:p-10 relative">
                    <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
                      <div className="h-14 w-14 rounded-full overflow-hidden border-2 border-white/20 shadow-lg">
                        <img 
                          src={testimonial.avatar} 
                          alt={testimonial.name}
                          className="h-full w-full object-cover"
                          onError={(e) => {
                            e.target.src = 'https://via.placeholder.com/150?text=Client';
                          }}
                        />
                      </div>
                    </div>
                    
                    <div className="pt-6">
                      <svg className="h-12 w-12 text-white/20 opacity-25 absolute top-8 left-8" fill="currentColor" viewBox="0 0 32 32" aria-hidden="true">
                        <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
                      </svg>
                      
                      <blockquote className="mt-4">
                        <p className="text-lg cosmic-text">
                          "{testimonial.quote}"
                        </p>
                      </blockquote>
                      
                      <div className="mt-6">
                        <p className="cosmic-title font-medium">{testimonial.name}</p>
                        <p className="cosmic-text text-sm opacity-80">{testimonial.position}, {testimonial.company}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Boutons de navigation */}
          <div className="absolute top-1/2 transform -translate-y-1/2 left-0 right-0 flex justify-between z-10">
            <button 
              onClick={prevTestimonial}
              className="forge-icon-button h-10 w-10 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
              aria-label="Témoignage précédent"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button 
              onClick={nextTestimonial}
              className="forge-icon-button h-10 w-10 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
              aria-label="Témoignage suivant"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
          
          {/* Indicateurs */}
          <div className="flex justify-center mt-8 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`h-2 rounded-full focus:outline-none transition-all duration-300 ${
                  index === activeIndex 
                    ? 'bg-white/80 w-8' 
                    : 'bg-white/30 w-2'
                }`}
                aria-label={`Aller au témoignage ${index + 1}`}
              />
            ))}
          </div>
        </div>
        
        {/* CTA */}
        <div className="mt-16 text-center">
          <div className="bg-deep-space bg-opacity-50 backdrop-filter backdrop-blur-sm rounded-[7px] shadow-xl overflow-hidden py-8 px-6 max-w-3xl mx-auto">
            <h2 className="cosmic-title text-2xl font-bold mb-4">Prêt à transformer votre présence en ligne ?</h2>
            <p className="cosmic-text max-w-2xl mx-auto mb-6">Rejoignez nos clients satisfaits et découvrez comment AstraForge peut vous aider à atteindre vos objectifs.</p>
            <a href="/contact" className="forge-glass-button py-3 px-8 rounded-[7px] text-lg transition-all duration-300 inline-block">
              Discutons de votre projet
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
