import React, { useState, useEffect, useRef } from 'react';

/**
 * Composant LazyImage - Charge les images uniquement lorsqu'elles sont visibles dans le viewport
 * @param {Object} props - Les propriétés du composant
 * @param {string} props.src - URL de l'image
 * @param {string} props.alt - Texte alternatif de l'image
 * @param {string} props.className - Classes CSS additionnelles
 * @param {Object} props.style - Styles inline additionnels
 * @returns {JSX.Element} - Image avec chargement différé
 */
const LazyImage = ({ src, alt, className = '', style = {}, ...props }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const imgRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: '100px', // Commence à charger l'image quand elle est à 100px du viewport
        threshold: 0.01,
      }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => {
      if (imgRef.current) {
        observer.disconnect();
      }
    };
  }, []);

  const handleImageLoad = () => {
    setIsLoaded(true);
  };

  return (
    <div
      ref={imgRef}
      className={`relative overflow-hidden ${className}`}
      style={{
        ...style,
        backgroundColor: '#f3f4f6', // Couleur de fond pendant le chargement
      }}
    >
      {isInView && (
        <>
          <img
            src={src}
            alt={alt}
            className={`transition-opacity duration-300 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
            onLoad={handleImageLoad}
            {...props}
          />
          {!isLoaded && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default LazyImage;
