import React, { useState } from 'react';

/**
 * Composant BookingSystem - Permet aux clients de réserver un créneau de consultation
 * @returns {JSX.Element} - Formulaire de réservation
 */
const BookingSystem = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    serviceType: '',
    message: ''
  });
  
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);
  
  // Options de services disponibles
  const serviceOptions = [
    { value: '', label: 'Sélectionnez un service' },
    { value: 'web-design', label: 'Conception de site web' },
    { value: 'branding', label: 'Identité visuelle / Branding' },
    { value: 'graphic-design', label: 'Design graphique' },
    { value: 'consultation', label: 'Consultation stratégique' },
    { value: 'other', label: 'Autre (précisez dans le message)' }
  ];
  
  // Générer les créneaux horaires disponibles
  const generateTimeSlots = () => {
    const slots = [];
    for (let hour = 9; hour <= 17; hour++) {
      const formattedHour = hour.toString().padStart(2, '0');
      slots.push(`${formattedHour}:00`);
      if (hour < 17) {
        slots.push(`${formattedHour}:30`);
      }
    }
    return slots;
  };
  
  const timeSlots = generateTimeSlots();
  
  // Gérer les changements dans le formulaire
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };
  
  // Gérer la soumission du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation basique
    if (!formData.name || !formData.email || !formData.date || !formData.time || !formData.serviceType) {
      setStatus({
        type: 'error',
        message: 'Veuillez remplir tous les champs obligatoires.'
      });
      return;
    }
    
    try {
      setLoading(true);
      // Simulation d'un appel API - à remplacer par votre véritable intégration
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Ici, vous intégrerez votre service de réservation
      // Exemple: const response = await fetch('/api/booking', { method: 'POST', body: JSON.stringify(formData) });
      
      setStatus({
        type: 'success',
        message: 'Votre demande de réservation a été envoyée avec succès ! Nous vous contacterons rapidement pour confirmer votre rendez-vous.'
      });
      
      // Réinitialiser le formulaire
      setFormData({
        name: '',
        email: '',
        phone: '',
        date: '',
        time: '',
        serviceType: '',
        message: ''
      });
    } catch (error) {
      setStatus({
        type: 'error',
        message: 'Une erreur est survenue lors de l\'envoi de votre demande. Veuillez réessayer ultérieurement.'
      });
    } finally {
      setLoading(false);
    }
  };
  
  // Obtenir la date minimale (aujourd'hui)
  const getMinDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };
  
  return (
    <section className="py-16 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            Réservez une consultation
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500 dark:text-gray-300">
            Prenez rendez-vous pour discuter de votre projet et explorer les possibilités créatives ensemble.
          </p>
        </div>
        
        <div className="max-w-3xl mx-auto bg-gray-50 dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
          <div className="px-6 py-8 sm:p-10">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
                {/* Nom */}
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Nom complet <span className="text-red-500">*</span>
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      name="name"
                      id="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="py-3 px-4 block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    />
                  </div>
                </div>
                
                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <div className="mt-1">
                    <input
                      type="email"
                      name="email"
                      id="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="py-3 px-4 block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    />
                  </div>
                </div>
                
                {/* Téléphone */}
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Téléphone
                  </label>
                  <div className="mt-1">
                    <input
                      type="tel"
                      name="phone"
                      id="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="py-3 px-4 block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    />
                  </div>
                </div>
                
                {/* Type de service */}
                <div>
                  <label htmlFor="serviceType" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Type de service <span className="text-red-500">*</span>
                  </label>
                  <div className="mt-1">
                    <select
                      id="serviceType"
                      name="serviceType"
                      value={formData.serviceType}
                      onChange={handleChange}
                      required
                      className="py-3 px-4 block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    >
                      {serviceOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                
                {/* Date */}
                <div>
                  <label htmlFor="date" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Date <span className="text-red-500">*</span>
                  </label>
                  <div className="mt-1">
                    <input
                      type="date"
                      name="date"
                      id="date"
                      min={getMinDate()}
                      value={formData.date}
                      onChange={handleChange}
                      required
                      className="py-3 px-4 block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    />
                  </div>
                </div>
                
                {/* Heure */}
                <div>
                  <label htmlFor="time" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Heure <span className="text-red-500">*</span>
                  </label>
                  <div className="mt-1">
                    <select
                      id="time"
                      name="time"
                      value={formData.time}
                      onChange={handleChange}
                      required
                      className="py-3 px-4 block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    >
                      <option value="">Sélectionnez une heure</option>
                      {timeSlots.map((slot) => (
                        <option key={slot} value={slot}>
                          {slot}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
              
              {/* Message */}
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Message (détails de votre projet)
                </label>
                <div className="mt-1">
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    className="py-3 px-4 block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  />
                </div>
              </div>
              
              {/* Bouton de soumission */}
              <div className="pt-4">
                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200 ${
                    loading ? 'opacity-75 cursor-not-allowed' : ''
                  }`}
                >
                  {loading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Traitement en cours...
                    </>
                  ) : 'Réserver ma consultation'}
                </button>
              </div>
            </form>
            
            {/* Message de statut */}
            {status && (
              <div className={`mt-6 rounded-md p-4 ${
                status.type === 'success' 
                  ? 'bg-green-50 text-green-800 dark:bg-green-900 dark:text-green-100' 
                  : 'bg-red-50 text-red-800 dark:bg-red-900 dark:text-red-100'
              }`}>
                <div className="flex">
                  <div className="flex-shrink-0">
                    {status.type === 'success' ? (
                      <svg className="h-5 w-5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    ) : (
                      <svg className="h-5 w-5 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    )}
                  </div>
                  <div className="ml-3">
                    <p className="text-sm">{status.message}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
          
          <div className="px-6 py-4 bg-gray-100 dark:bg-gray-700 sm:px-10">
            <p className="text-xs leading-5 text-gray-500 dark:text-gray-400">
              En soumettant ce formulaire, vous acceptez notre{' '}
              <a href="/politique-confidentialite" className="font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-500">
                politique de confidentialité
              </a>
              . Nous vous contacterons dans les 24 heures ouvrées pour confirmer votre rendez-vous.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BookingSystem;
