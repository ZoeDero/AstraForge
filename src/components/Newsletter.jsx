import React, { useState } from 'react';

/**
 * Composant Newsletter - Permet aux visiteurs de s'inscrire à la newsletter
 * @returns {JSX.Element} - Formulaire d'inscription à la newsletter
 */
const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email) {
      setStatus({ type: 'error', message: 'Veuillez entrer une adresse email.' });
      return;
    }

    try {
      setLoading(true);
      // Simulation d'un appel API - à remplacer par votre véritable intégration
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Ici, vous intégrerez votre service de newsletter (Mailchimp, SendinBlue, etc.)
      // Exemple: const response = await fetch('/api/subscribe', { method: 'POST', body: JSON.stringify({ email }) });
      
      setStatus({ 
        type: 'success', 
        message: 'Merci pour votre inscription ! Vous recevrez bientôt nos actualités.' 
      });
      setEmail('');
    } catch (error) {
      setStatus({ 
        type: 'error', 
        message: 'Une erreur est survenue. Veuillez réessayer ultérieurement.' 
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-indigo-700 dark:bg-indigo-900">
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:py-16 lg:px-8">
        <div className="px-6 py-6 bg-indigo-800 dark:bg-indigo-800 rounded-lg md:py-12 md:px-12 lg:py-16 lg:px-16 xl:flex xl:items-center">
          <div className="xl:w-0 xl:flex-1">
            <h2 className="text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
              Restez informé de nos dernières créations
            </h2>
            <p className="mt-3 max-w-3xl text-lg leading-6 text-indigo-200">
              Inscrivez-vous à notre newsletter pour recevoir nos actualités, conseils créatifs et offres spéciales.
            </p>
          </div>
          <div className="mt-8 sm:w-full sm:max-w-md xl:mt-0 xl:ml-8">
            <form className="sm:flex" onSubmit={handleSubmit}>
              <label htmlFor="email-address" className="sr-only">
                Adresse email
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border-white px-5 py-3 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-indigo-700 focus:ring-white rounded-md"
                placeholder="Entrez votre email"
              />
              <button
                type="submit"
                disabled={loading}
                className={`mt-3 w-full flex items-center justify-center px-5 py-3 border border-transparent shadow text-base font-medium rounded-md text-white bg-indigo-500 hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-indigo-700 focus:ring-white sm:mt-0 sm:ml-3 sm:w-auto sm:flex-shrink-0 transition-all duration-200 ${
                  loading ? 'opacity-75 cursor-not-allowed' : ''
                }`}
              >
                {loading ? (
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                ) : 'S\'inscrire'}
              </button>
            </form>
            
            {status && (
              <div className={`mt-3 rounded-md p-3 ${
                status.type === 'success' 
                  ? 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100' 
                  : 'bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100'
              }`}>
                <p className="text-sm">{status.message}</p>
              </div>
            )}
            
            <p className="mt-3 text-sm text-indigo-200">
              Nous respectons votre vie privée. Consultez notre{' '}
              <a href="/politique-confidentialite" className="text-white font-medium underline">
                politique de confidentialité
              </a>
              .
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
