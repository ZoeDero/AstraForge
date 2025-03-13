import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import TiltCard from './TiltCard';
import EnhancedGalleryFilters from './EnhancedGalleryFilters';

const Gallery = () => {
  const { t } = useTranslation();
  const [filter, setFilter] = useState('all');
  const [selectedProject, setSelectedProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const galleryRef = useRef(null);
  const modalRef = useRef(null);

  const openModal = (project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setIsModalOpen(false);
    document.body.style.overflow = 'auto';
  };

  useEffect(() => {
    setIsLoaded(true);
    
    // Fermer le modal avec la touche Escape
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        closeModal();
      }
    };
    
    window.addEventListener('keydown', handleEscape);
    
    return () => {
      window.removeEventListener('keydown', handleEscape);
    };
  }, []);

  const projects = [
    {
      id: 1,
      title: 'Site Web Destinée',
      category: 'web',
      description: 'Site vitrine pour une entreprise de conseil en développement personnel avec un design épuré et une navigation intuitive, mettant en valeur les services de coaching et d\'accompagnement.',
      images: ['/assets/Destinee1-BnMVXLFH.png', '/assets/Destinee2-CNZ27O6y.png'],
      technologies: ['React', 'Tailwind CSS', 'Vite'],
      client: 'Destinée Coaching',
      year: '2024',
      websiteUrl: ''
    },
    {
      id: 2,
      title: 'Site Web Keren',
      category: 'web',
      description: 'Plateforme e-commerce pour une marque de vêtements éthiques avec une expérience utilisateur optimisée et un design responsive, permettant une navigation fluide sur tous les appareils.',
      images: ['/assets/SiteKeren1-C6qAXosk.png', '/assets/SiteKeren2-B9Ae_OrA.png'],
      technologies: ['React', 'Node.js', 'MongoDB'],
      client: 'Keren Fashion',
      year: '2023',
      websiteUrl: 'https://www.leadingdanse.fr'
    },
    {
      id: 3,
      title: 'Application Mobile EcranStart',
      category: 'mobile',
      description: 'Application de productivité pour les entrepreneurs avec une interface intuitive et des fonctionnalités de gestion de tâches avancées, permettant d\'optimiser l\'organisation quotidienne.',
      images: ['/assets/EcranStart-DD4Cxlyo.png', '/assets/img/overlay champote 2.PNG'],
      technologies: ['React Native', 'Firebase'],
      client: 'StartUp Innovations',
      year: '2023',
      websiteUrl: ''
    },
    {
      id: 4,
      title: 'Campagne Photographique',
      category: 'photo',
      description: 'Série de photographies pour une campagne publicitaire avec des images de haute qualité mettant en valeur les produits du client et créant une identité visuelle forte et mémorable.',
      images: ['/assets/photographie-DtAkYzOw.jpg', '/assets/img/overlay champote 2.PNG'],
      technologies: ['Photographie', 'Retouche photo'],
      client: 'Lumina Cosmetics',
      year: '2022',
      websiteUrl: ''
    },
    {
      id: 5,
      title: 'Infographie Corporative',
      category: 'graphic',
      description: 'Création d\'une identité visuelle complète pour une startup, comprenant logo, charte graphique et supports de communication cohérents avec les valeurs et la vision de l\'entreprise.',
      images: ['/assets/infographie-BUU2QWsO.jpg', '/assets/img/overlay champote 2.PNG'],
      technologies: ['Illustrator', 'Photoshop'],
      client: 'NeoTech Solutions',
      year: '2022',
      websiteUrl: ''
    },
    {
      id: 6,
      title: 'Refonte UX/UI',
      category: 'web',
      description: 'Refonte complète de l\'interface utilisateur d\'une application web existante pour améliorer l\'expérience utilisateur, simplifier la navigation et moderniser l\'apparence visuelle.',
      images: ['/assets/img/overlay champote 2.PNG', '/assets/img/favicon.png'],
      technologies: ['Figma', 'React', 'CSS Modules'],
      client: 'DataViz Analytics',
      year: '2023',
      websiteUrl: ''
    }
  ];

  useEffect(() => {
    // Filtrer les projets en fonction du filtre sélectionné
    if (filter === 'all') {
      setFilteredProjects(projects);
    } else {
      setFilteredProjects(projects.filter(project => project.category === filter));
    }
  }, [filter]);

  // Fonction pour gérer le changement de filtres depuis EnhancedGalleryFilters
  const handleFilterChange = (newFilteredProjects) => {
    setFilteredProjects(newFilteredProjects);
  };

  const nextImage = () => {
    if (selectedProject) {
      setActiveImageIndex((prevIndex) => 
        prevIndex === selectedProject.images.length - 1 ? 0 : prevIndex + 1
      );
    }
  };

  const prevImage = () => {
    if (selectedProject) {
      setActiveImageIndex((prevIndex) => 
        prevIndex === 0 ? selectedProject.images.length - 1 : prevIndex - 1
      );
    }
  };

  return (
    <section id="gallery" className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4" ref={galleryRef}>
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {t('gallery.title')}
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            {t('gallery.subtitle')}
          </p>
        </div>

        {/* Filtres améliorés */}
        <EnhancedGalleryFilters 
          projects={projects} 
          onFilterChange={handleFilterChange} 
        />

        {/* Grille de projets */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {filteredProjects.length > 0 ? (
            filteredProjects.map((project) => (
              <TiltCard key={project.id} className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg transition-transform duration-300 h-full">
                <div 
                  className="relative h-48 cursor-pointer" 
                  onClick={() => openModal(project)}
                >
                  <img 
                    src={project.images[0]} 
                    alt={project.title} 
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                    <button className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition-colors duration-300">
                      {t('gallery.viewProject')}
                    </button>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{project.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.map((tech, index) => (
                      <span key={index} className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 text-xs rounded">
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500 dark:text-gray-400">{project.client}</span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">{project.year}</span>
                  </div>
                  {project.websiteUrl && (
                    <a 
                      href={project.websiteUrl} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="mt-4 inline-block text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 transition-colors duration-300"
                    >
                      {t('gallery.visitWebsite')} →
                    </a>
                  )}
                </div>
              </TiltCard>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                {t('gallery.noProjects')}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                {t('gallery.noProjectsDesc')}
              </p>
              <button 
                onClick={() => setFilter('all')} 
                className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition-colors duration-300"
              >
                {t('gallery.showAll')}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Modal de projet */}
      {isModalOpen && selectedProject && (
        <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 bg-gray-900 bg-opacity-75 transition-opacity" aria-hidden="true" onClick={closeModal}></div>
            
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            
            <div className="inline-block align-bottom bg-white dark:bg-gray-900 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-5xl sm:w-full">
              <div className="absolute top-0 right-0 pt-4 pr-4 z-10">
                <button
                  type="button"
                  className="bg-white dark:bg-gray-800 rounded-full p-2 text-gray-400 hover:text-gray-500 dark:text-gray-300 dark:hover:text-white focus:outline-none"
                  onClick={closeModal}
                >
                  <span className="sr-only">Fermer</span>
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <div className="relative">
                <div className="relative h-96">
                  <img
                    src={selectedProject.images[0]}
                    alt={selectedProject.title}
                    className="w-full h-full object-cover"
                  />
                  
                  {selectedProject.images.length > 1 && (
                    <>
                      <button
                        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 rounded-full p-2 text-white"
                        onClick={(e) => {
                          e.stopPropagation();
                          prevImage();
                        }}
                      >
                        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                      </button>
                      <button
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 rounded-full p-2 text-white"
                        onClick={(e) => {
                          e.stopPropagation();
                          nextImage();
                        }}
                      >
                        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </button>
                    </>
                  )}
                </div>
                
                {selectedProject.images.length > 1 && (
                  <div className="absolute bottom-4 left-0 right-0 flex justify-center">
                    <div className="flex space-x-2 bg-black/30 rounded-full px-3 py-1.5">
                      {selectedProject.images.map((_, index) => (
                        <button
                          key={index}
                          className={`w-2 h-2 rounded-full ${
                            index === 0 ? 'bg-white' : 'bg-white/50 hover:bg-white/80'
                          }`}
                          onClick={(e) => {
                            e.stopPropagation();
                            // setActiveImageIndex(index);
                          }}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>
              
              <div className="bg-white dark:bg-gray-900 px-6 py-8">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:text-left w-full">
                    <h3 className="text-2xl leading-6 font-bold text-gray-900 dark:text-white" id="modal-title">
                      {selectedProject.title}
                    </h3>
                    <div className="mt-2">
                      <p className="text-gray-500 dark:text-gray-400">
                        {selectedProject.client} • {selectedProject.year}
                      </p>
                      <p className="text-gray-700 dark:text-gray-300 mt-4">
                        {selectedProject.description}
                      </p>
                      
                      <div className="mt-6">
                        <h4 className="text-lg font-semibold text-gray-900 dark:text-white">Technologies utilisées</h4>
                        <div className="mt-2 flex flex-wrap gap-2">
                          {selectedProject.technologies.map((tech, index) => (
                            <span
                              key={index}
                              className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-50 dark:bg-gray-800 px-6 py-4 sm:flex sm:flex-row-reverse">
                {selectedProject.websiteUrl && (
                  <a
                    href={selectedProject.websiteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-300"
                  >
                    Voir le site web
                  </a>
                )}
                <a
                  href={`mailto:zoe.dero@gmail.com?subject=Demande d'information - Projet similaire à ${selectedProject.title}`}
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-300"
                >
                  Demander plus d'informations
                </a>
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 dark:border-gray-600 shadow-sm px-4 py-2 bg-white dark:bg-gray-700 text-base font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={closeModal}
                >
                  Fermer
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Gallery;
