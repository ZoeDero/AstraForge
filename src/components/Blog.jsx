import React, { useState } from 'react';
import LazyImage from './LazyImage';

/**
 * Composant Blog - Affiche des articles de blog sur les tendances du design et les projets
 * @returns {JSX.Element} - Section blog avec articles
 */
const Blog = () => {
  // État pour les articles à afficher
  const [displayCount, setDisplayCount] = useState(3);
  
  // Liste des articles de blog
  const blogPosts = [

    {
      id: 6,
      title: "Top 8 des tendances du web design et des technologies à venir en 2025",
      excerpt: "Un article sur les tendances et technologies récentes en matière de design et développement web.",
      image: "/assets/img/8-trends.webp",
      category: "Web Design",
      date: "18 octobre 2023",
      author: "Zoé Dero",
      slug: "8-trends-web-design-2025",
      buttonUrl: "https://techbii.com/web-design-development-trends-for-2025/"
    },
    {
      id: 1,
      title: "Les tendances du web design en 2025",
      excerpt: "Découvrez les tendances qui façonnent le web design cette année, des interfaces minimalistes aux animations immersives.",
      image: "/assets/img/website-design.jpg",
      category: "Web Design",
      date: "15 mars 2025",
      author: "Zoé Dero",
      slug: "tendances-web-design-2025",
      buttonUrl: "https://www.adroitte.com/blog/web-design/website-design-trends-in-2025-innovations-shaping-the-future/"
    },
    {
      id: 2,
      title: "17 tendances UX/UI à surveiller en 2025",
      excerpt: "Un aperçu des tendances actuelles en UX/UI que les professionnels devraient surveiller pour rester à jour.",
      image: "/assets/img/uiImg.webp",
      category: "Branding",
      date: "28 avril 2023",
      author: "Zoé Dero",
      slug: "17-ux-ui-trends-2025",
      buttonUrl: "https://userguiding.com/blog/ux-ui-trends/"
    },
    {
      id: 3,
      title: "L'importance de l'UX dans la conception de sites e-commerce",
      excerpt: "Un bon UX peut faire la différence entre un visiteur qui abandonne son panier et un client fidèle. Découvrez comment optimiser l'expérience utilisateur de votre site e-commerce.",
      image: "/assets/img/ux-ecommerce.jpg",
      category: "UX Design",
      date: "10 juin 2023",
      author: "Zoé Dero",
      slug: "importance-ux-ecommerce",
      buttonUrl: "https://www.adroitte.com/blog/ux-ui/ux-ui-design-in-2023-innovations-shaping-the-future/"
    },
    {
      id: 4,
      title: "Étude de cas : Refonte du site web de Keren Fashion",
      excerpt: "Découvrez les coulisses de la refonte du site web de Keren Fashion, de la stratégie initiale aux résultats post-lancement.",
      image: "/assets/img/case-study-keren.jpg",
      category: "Étude de cas",
      date: "22 juillet 2023",
      author: "Zoé Dero",
      slug: "etude-cas-refonte-keren-fashion",
      buttonUrl: "https://www.adroitte.com/blog/ux-ui/ux-ui-design-in-2023-innovations-shaping-the-future/"
    },
    {
      id: 5,
      title: "Les principes du design responsive en 2023",
      excerpt: "Avec la multiplication des appareils, le design responsive est plus important que jamais. Voici les principes clés à suivre pour créer des sites qui s'adaptent parfaitement à tous les écrans.",
      image: "/assets/img/responsive-design.jpg",
      category: "Web Design",
      date: "5 septembre 2023",
      author: "Zoé Dero",
      slug: "principes-design-responsive-2023",
      buttonUrl: "https://www.adroitte.com/blog/web-design/website-design-trends-in-2025-innovations-shaping-the-future/"
    },
    {
      id: 6,
      title: "Comment créer un logo mémorable pour votre entreprise",
      excerpt: "Un logo est souvent le premier élément visuel que vos clients associent à votre marque. Découvrez les étapes pour créer un logo qui marque les esprits.",
      image: "/assets/img/website-design.jpg",
      category: "Branding",
      date: "18 octobre 2023",
      author: "Zoé Dero",
      slug: "creer-logo-memorable-entreprise",
      buttonUrl: "https://www.adroitte.com/blog/web-design/website-design-trends-in-2025-innovations-shaping-the-future/"
    }
  ];
  
  // Charger plus d'articles
  const loadMore = () => {
    setDisplayCount(prevCount => Math.min(prevCount + 3, blogPosts.length));
  };
  
  return (
    <section className="py-16 bg-deep-space min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="cosmic-title text-4xl font-extrabold sm:text-5xl lg:text-6xl">
            Blog & Actualités
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-xl cosmic-text">
            Découvrez nos derniers articles sur les tendances du design, nos projets et nos conseils créatifs.
          </p>
        </div>
        
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {blogPosts.slice(0, displayCount).map((post) => (
            <article key={post.id} className="bg-deep-space bg-opacity-50 backdrop-filter backdrop-blur-sm rounded-[7px] shadow-xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
              <div className="h-48 w-full overflow-hidden">
                <LazyImage
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/600x300?text=AstraForge+Blog';
                  }}
                />
              </div>
              
              <div className="p-6">
                <div className="flex items-center text-sm cosmic-text mb-2">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-white/10 backdrop-filter backdrop-blur-sm mr-2">
                    {post.category}
                  </span>
                  <time dateTime={post.date}>{post.date}</time>
                </div>
                
                <h3 className="text-xl font-bold cosmic-title mb-2">
                  <a href={`/blog/${post.slug}`} className="hover:text-white/80 transition-colors duration-200">
                    {post.title}
                  </a>
                </h3>
                
                <p className="cosmic-text mb-4">
                  {post.excerpt}
                </p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="h-8 w-8 rounded-full bg-white/10 backdrop-filter backdrop-blur-sm flex items-center justify-center mr-2">
                      <span className="text-sm font-medium cosmic-text">{post.author.split(' ').map(n => n[0]).join('')}</span>
                    </div>
                    <span className="text-sm font-medium cosmic-text">{post.author}</span>
                  </div>
                  
                  <a href={post.buttonUrl || `/blog/${post.slug}`} className="cosmic-text hover:text-white font-medium flex items-center transition-all duration-300">
                    Lire plus
                    <svg className="ml-1 w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
        
        {displayCount < blogPosts.length && (
          <div className="text-center mt-10">
            <button
              onClick={loadMore}
              className="forge-glass-button px-6 py-3 rounded-[7px] transition-all duration-300 inline-flex items-center"
            >
              Charger plus d'articles
              <svg className="ml-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Blog;
