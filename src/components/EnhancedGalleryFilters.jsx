import React, { useState, useEffect, useCallback } from 'react';

/**
 * Composant EnhancedGalleryFilters - Filtres améliorés pour la galerie de projets
 * @param {Object} props - Les propriétés du composant
 * @param {Array} props.projects - Liste des projets à filtrer
 * @param {Function} props.onFilterChange - Fonction appelée lorsque les filtres changent
 * @returns {JSX.Element} - Filtres améliorés pour la galerie
 */
const EnhancedGalleryFilters = ({ projects, onFilterChange }) => {
  // États pour les filtres
  const [activeCategory, setActiveCategory] = useState('all');
  const [activeYear, setActiveYear] = useState('all');
  const [activeTech, setActiveTech] = useState('all');
  const [activeClient, setActiveClient] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Extraire les valeurs uniques pour chaque filtre
  const categories = ['all', ...new Set(projects.map(project => project.category))];
  const years = ['all', ...new Set(projects.map(project => project.year))].sort((a, b) => b - a);
  
  // Extraire toutes les technologies uniques de tous les projets
  const technologies = ['all', ...new Set(projects.flatMap(project => project.technologies))].sort();
  
  // Extraire tous les clients uniques
  const clients = ['all', ...new Set(projects.map(project => project.client))].sort();
  
  // Utiliser useCallback pour mémoriser onFilterChange
  const memoizedOnFilterChange = useCallback((filteredProjects) => {
    onFilterChange(filteredProjects);
  }, [onFilterChange]);
  
  // Appliquer les filtres lorsqu'ils changent
  useEffect(() => {
    const filteredProjects = projects.filter(project => {
      // Filtre par catégorie
      const categoryMatch = activeCategory === 'all' || project.category === activeCategory;
      
      // Filtre par année
      const yearMatch = activeYear === 'all' || project.year === activeYear;
      
      // Filtre par technologie
      const techMatch = activeTech === 'all' || project.technologies.includes(activeTech);
      
      // Filtre par client
      const clientMatch = activeClient === 'all' || project.client === activeClient;
      
      // Filtre par recherche textuelle
      const searchMatch = searchQuery === '' || 
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.client.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.technologies.some(tech => tech.toLowerCase().includes(searchQuery.toLowerCase()));
      
      return categoryMatch && yearMatch && techMatch && clientMatch && searchMatch;
    });
    
    memoizedOnFilterChange(filteredProjects);
  }, [activeCategory, activeYear, activeTech, activeClient, searchQuery, projects, memoizedOnFilterChange]);
  
  // Réinitialiser tous les filtres
  const resetFilters = () => {
    setActiveCategory('all');
    setActiveYear('all');
    setActiveTech('all');
    setActiveClient('all');
    setSearchQuery('');
  };
  
  return (
    <div className="mb-8 space-y-6">
      {/* Barre de recherche */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="cosmic-input block w-full pl-10 pr-3 py-2 rounded-md leading-5 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white sm:text-sm transition-colors duration-200"
          placeholder="Rechercher un projet, une technologie, un client..."
        />
      </div>
      
      {/* Filtres principaux */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {/* Filtre par catégorie */}
        <div>
          <label htmlFor="category-filter" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Catégorie
          </label>
          <select
            id="category-filter"
            value={activeCategory}
            onChange={(e) => setActiveCategory(e.target.value)}
            className="cosmic-input block w-full pl-3 pr-10 py-2 text-base sm:text-sm rounded-md text-gray-900 dark:text-white transition-colors duration-200"
          >
            <option value="all">Toutes les catégories</option>
            {categories.filter(cat => cat !== 'all').map((category) => (
              <option key={category} value={category}>
                {category === 'web' ? 'Web Design' : 
                 category === 'print' ? 'Print & Édition' : 
                 category === 'branding' ? 'Identité Visuelle' : 
                 category === 'ui' ? 'UI/UX Design' : 
                 category}
              </option>
            ))}
          </select>
        </div>
        
        {/* Filtre par année */}
        <div>
          <label htmlFor="year-filter" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Année
          </label>
          <select
            id="year-filter"
            value={activeYear}
            onChange={(e) => setActiveYear(e.target.value)}
            className="cosmic-input block w-full pl-3 pr-10 py-2 text-base sm:text-sm rounded-md text-gray-900 dark:text-white transition-colors duration-200"
          >
            <option value="all">Toutes les années</option>
            {years.filter(year => year !== 'all').map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>
        
        {/* Filtre par technologie */}
        <div>
          <label htmlFor="tech-filter" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Technologie
          </label>
          <select
            id="tech-filter"
            value={activeTech}
            onChange={(e) => setActiveTech(e.target.value)}
            className="cosmic-input block w-full pl-3 pr-10 py-2 text-base sm:text-sm rounded-md text-gray-900 dark:text-white transition-colors duration-200"
          >
            <option value="all">Toutes les technologies</option>
            {technologies.filter(tech => tech !== 'all').map((tech) => (
              <option key={tech} value={tech}>
                {tech}
              </option>
            ))}
          </select>
        </div>
        
        {/* Filtre par client */}
        <div>
          <label htmlFor="client-filter" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Client
          </label>
          <select
            id="client-filter"
            value={activeClient}
            onChange={(e) => setActiveClient(e.target.value)}
            className="cosmic-input block w-full pl-3 pr-10 py-2 text-base sm:text-sm rounded-md text-gray-900 dark:text-white transition-colors duration-200"
          >
            <option value="all">Tous les clients</option>
            {clients.filter(client => client !== 'all').map((client) => (
              <option key={client} value={client}>
                {client}
              </option>
            ))}
          </select>
        </div>
      </div>
      
      {/* Filtres actifs et bouton de réinitialisation */}
      <div className="flex flex-wrap items-center gap-2">
        {activeCategory !== 'all' && (
          <span className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200">
            Catégorie: {activeCategory === 'web' ? 'Web Design' : 
                      activeCategory === 'print' ? 'Print & Édition' : 
                      activeCategory === 'branding' ? 'Identité Visuelle' : 
                      activeCategory === 'ui' ? 'UI/UX Design' : 
                      activeCategory}
            <button
              type="button"
              onClick={() => setActiveCategory('all')}
              className="ml-1.5 inline-flex flex-shrink-0 h-4 w-4 rounded-full items-center justify-center text-indigo-400 hover:bg-indigo-200 hover:text-indigo-500 focus:outline-none focus:bg-indigo-500 focus:text-white"
            >
              <span className="sr-only">Supprimer le filtre de catégorie</span>
              <svg className="h-2 w-2" stroke="currentColor" fill="none" viewBox="0 0 8 8">
                <path strokeLinecap="round" strokeWidth="1.5" d="M1 1l6 6m0-6L1 7" />
              </svg>
            </button>
          </span>
        )}
        
        {activeYear !== 'all' && (
          <span className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200">
            Année: {activeYear}
            <button
              type="button"
              onClick={() => setActiveYear('all')}
              className="ml-1.5 inline-flex flex-shrink-0 h-4 w-4 rounded-full items-center justify-center text-indigo-400 hover:bg-indigo-200 hover:text-indigo-500 focus:outline-none focus:bg-indigo-500 focus:text-white"
            >
              <span className="sr-only">Supprimer le filtre d'année</span>
              <svg className="h-2 w-2" stroke="currentColor" fill="none" viewBox="0 0 8 8">
                <path strokeLinecap="round" strokeWidth="1.5" d="M1 1l6 6m0-6L1 7" />
              </svg>
            </button>
          </span>
        )}
        
        {activeTech !== 'all' && (
          <span className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200">
            Technologie: {activeTech}
            <button
              type="button"
              onClick={() => setActiveTech('all')}
              className="ml-1.5 inline-flex flex-shrink-0 h-4 w-4 rounded-full items-center justify-center text-indigo-400 hover:bg-indigo-200 hover:text-indigo-500 focus:outline-none focus:bg-indigo-500 focus:text-white"
            >
              <span className="sr-only">Supprimer le filtre de technologie</span>
              <svg className="h-2 w-2" stroke="currentColor" fill="none" viewBox="0 0 8 8">
                <path strokeLinecap="round" strokeWidth="1.5" d="M1 1l6 6m0-6L1 7" />
              </svg>
            </button>
          </span>
        )}
        
        {activeClient !== 'all' && (
          <span className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200">
            Client: {activeClient}
            <button
              type="button"
              onClick={() => setActiveClient('all')}
              className="ml-1.5 inline-flex flex-shrink-0 h-4 w-4 rounded-full items-center justify-center text-indigo-400 hover:bg-indigo-200 hover:text-indigo-500 focus:outline-none focus:bg-indigo-500 focus:text-white"
            >
              <span className="sr-only">Supprimer le filtre de client</span>
              <svg className="h-2 w-2" stroke="currentColor" fill="none" viewBox="0 0 8 8">
                <path strokeLinecap="round" strokeWidth="1.5" d="M1 1l6 6m0-6L1 7" />
              </svg>
            </button>
          </span>
        )}
        
        {searchQuery && (
          <span className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200">
            Recherche: {searchQuery}
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="ml-1.5 inline-flex flex-shrink-0 h-4 w-4 rounded-full items-center justify-center text-indigo-400 hover:bg-indigo-200 hover:text-indigo-500 focus:outline-none focus:bg-indigo-500 focus:text-white"
            >
              <span className="sr-only">Supprimer la recherche</span>
              <svg className="h-2 w-2" stroke="currentColor" fill="none" viewBox="0 0 8 8">
                <path strokeLinecap="round" strokeWidth="1.5" d="M1 1l6 6m0-6L1 7" />
              </svg>
            </button>
          </span>
        )}
        
        {(activeCategory !== 'all' || activeYear !== 'all' || activeTech !== 'all' || activeClient !== 'all' || searchQuery) && (
          <button
            type="button"
            onClick={resetFilters}
            className="inline-flex items-center px-3 py-1 border border-gray-300 dark:border-gray-600 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
          >
            <svg className="mr-1.5 h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Réinitialiser tous les filtres
          </button>
        )}
      </div>
    </div>
  );
};

export default EnhancedGalleryFilters;
