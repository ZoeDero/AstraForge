import React from 'react';
import { useTranslation } from 'react-i18next';

const Pricing = () => {
  const { t } = useTranslation(undefined, { useSuspense: false });

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-deep-space">
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          <h1 className="cosmic-title text-4xl font-extrabold sm:text-5xl lg:text-6xl">
            Tarifs
          </h1>
          <p className="mt-3 max-w-2xl mx-auto text-xl cosmic-text">
            Des tarifs transparents pour des projets de qualité
          </p>
          <p className="max-w-xl mt-5 mx-auto text-lg cosmic-text opacity-80">
            Découvrez nos tarifs pour tous vos projets de création digitale. Des solutions adaptées à vos besoins et à votre budget.
          </p>
        </div>

        {/* Compétences et tarifs */}
        <div className="mt-16">
          <h2 className="cosmic-title text-3xl font-bold text-center mb-8">Compétences et tarifs</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-deep-space bg-opacity-50 backdrop-filter rounded-[7px] shadow-xl overflow-hidden transition-all duration-300 hover:scale-105">
              <div className="px-6 py-8">
                <div className="text-center mb-4">
                  <h3 className="cosmic-title text-xl font-semibold mb-2">Motion Design</h3><br/>
                  <span className="forge-glass-button px-3 py-1 text-sm font-semibold rounded-full inline-block">
                    À partir de 70 € / h
                  </span>
                </div>
                <p className="cosmic-text mb-6">Animations, transitions, effets visuels pour vos vidéos et interfaces. Expertise After Effects, Cinema 4D.</p>
                <ul className="space-y-3 cosmic-text">
                  <li className="flex items-start">
                    <span className="forge-icon-button h-6 w-6 rounded-full flex items-center justify-center mr-2">
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                    <span>Animations pour interfaces web et mobiles</span>
                  </li>
                  <li className="flex items-start">
                    <span className="forge-icon-button h-6 w-6 rounded-full flex items-center justify-center mr-2">
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                    <span>Vidéos explicatives et promotionnelles</span>
                  </li>
                  <li className="flex items-start">
                    <span className="forge-icon-button h-6 w-6 rounded-full flex items-center justify-center mr-2">
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                    <span>Effets spéciaux et transitions</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="bg-deep-space bg-opacity-50 backdrop-filter rounded-[7px] shadow-xl overflow-hidden transition-all duration-300 hover:scale-105">
              <div className="px-6 py-8">
                <div className="text-center mb-4">
                  <h3 className="cosmic-title text-xl font-semibold mb-2">Développement Front-end</h3>
                  <span className="forge-glass-button px-3 py-1 text-sm font-semibold rounded-full inline-block">
                    À partir de 60 € / h
                  </span>
                </div>
                <p className="cosmic-text mb-6">Intégration et développement de sites et applications web avec React, Vue.js, et autres frameworks modernes.</p>
                <ul className="space-y-3 cosmic-text">
                  <li className="flex items-start">
                    <span className="forge-icon-button h-6 w-6 rounded-full flex items-center justify-center mr-2">
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                    <span>Sites web responsive et accessibles</span>
                  </li>
                  <li className="flex items-start">
                    <span className="forge-icon-button h-6 w-6 rounded-full flex items-center justify-center mr-2">
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                    <span>Applications React, Vue.js et Next.js</span>
                  </li>
                  <li className="flex items-start">
                    <span className="forge-icon-button h-6 w-6 rounded-full flex items-center justify-center mr-2">
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                    <span>Intégration d'API et services tiers</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="bg-deep-space bg-opacity-50 backdrop-filter rounded-[7px] shadow-xl overflow-hidden transition-all duration-300 hover:scale-105">
              <div className="px-6 py-8">
                <div className="text-center mb-4">
                  <h3 className="cosmic-title text-xl font-semibold mb-2">Conception d'interface utilisateur (UI)</h3>
                  <span className="forge-glass-button px-3 py-1 text-sm font-semibold rounded-full inline-block">
                    À partir de 50 € / h
                  </span>
                </div>
                <p className="cosmic-text mb-6">Conception d'interfaces utilisateur pour sites web et applications mobiles.</p>
                <ul className="space-y-3 cosmic-text">
                  <li className="flex items-start">
                    <span className="forge-icon-button h-6 w-6 rounded-full flex items-center justify-center mr-2">
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                    <span>Wireframes et prototypes interactifs</span>
                  </li>
                  <li className="flex items-start">
                    <span className="forge-icon-button h-6 w-6 rounded-full flex items-center justify-center mr-2">
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                    <span>Design visuel et branding</span>
                  </li>
                  <li className="flex items-start">
                    <span className="forge-icon-button h-6 w-6 rounded-full flex items-center justify-center mr-2">
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                    <span>Tests utilisateurs et itération</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="bg-deep-space bg-opacity-50 backdrop-filter rounded-[7px] shadow-xl overflow-hidden transition-all duration-300 hover:scale-105">
              <div className="px-6 py-8">
                <div className="text-center mb-4">
                  <h3 className="cosmic-title text-xl font-semibold mb-2">Conception graphique</h3>
                  <span className="forge-glass-button px-3 py-1 text-sm font-semibold rounded-full inline-block">
                    À partir de 40 € / h
                  </span>
                </div>
                <p className="cosmic-text mb-6">Conception de visuels pour les réseaux sociaux, les sites web et les supports imprimés.</p>
                <ul className="space-y-3 cosmic-text">
                  <li className="flex items-start">
                    <span className="forge-icon-button h-6 w-6 rounded-full flex items-center justify-center mr-2">
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                    <span>Création de logos et d'identités visuelles</span>
                  </li>
                  <li className="flex items-start">
                    <span className="forge-icon-button h-6 w-6 rounded-full flex items-center justify-center mr-2">
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                    <span>Conception de cartes de visite et de documents imprimés</span>
                  </li>
                  <li className="flex items-start">
                    <span className="forge-icon-button h-6 w-6 rounded-full flex items-center justify-center mr-2">
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                    <span>Création d'images pour les réseaux sociaux</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="bg-deep-space bg-opacity-50 backdrop-filter rounded-[7px] shadow-xl overflow-hidden transition-all duration-300 hover:scale-105">
              <div className="px-6 py-8">
                <div className="text-center mb-4">
                  <h3 className="cosmic-title text-xl font-semibold mb-2">Photographie</h3> <br/>

                  <span className="forge-glass-button px-3 py-1 text-sm font-semibold rounded-full inline-block">
                    À partir de 100 € / h
                  </span>
                </div>
                <p className="cosmic-text mb-6">Photographie de produits, de mode, de portrait et d'événements.</p>
                <ul className="space-y-3 cosmic-text">
                  <li className="flex items-start">
                    <span className="forge-icon-button h-6 w-6 rounded-full flex items-center justify-center mr-2">
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                    <span>Photographie de produits pour les réseaux sociaux et les sites web</span>
                  </li>
                  <li className="flex items-start">
                    <span className="forge-icon-button h-6 w-6 rounded-full flex items-center justify-center mr-2">
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                    <span>Photographie de mode et de portrait</span>
                  </li>
                  <li className="flex items-start">
                    <span className="forge-icon-button h-6 w-6 rounded-full flex items-center justify-center mr-2">
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                    <span>Photographie d'événements et de concerts</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="bg-deep-space bg-opacity-50 backdrop-filter rounded-[7px] shadow-xl overflow-hidden transition-all duration-300 hover:scale-105">
              <div className="px-6 py-8">
                <div className="text-center mb-4">
                  <h3 className="cosmic-title text-xl font-semibold mb-2">Développement Web</h3>
                  <span className="forge-glass-button px-3 py-1 text-sm font-semibold rounded-full inline-block">
                    À partir de 80 € / h
                  </span>
                </div>
                <p className="cosmic-text mb-6">Développement de sites web et d'applications web avec WordPress, React, Vue.js, et autres frameworks modernes.</p>
                <ul className="space-y-3 cosmic-text">
                  <li className="flex items-start">
                    <span className="forge-icon-button h-6 w-6 rounded-full flex items-center justify-center mr-2">
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                    <span>Sites web responsives et accessibles</span>
                  </li>
                  <li className="flex items-start">
                    <span className="forge-icon-button h-6 w-6 rounded-full flex items-center justify-center mr-2">
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                    <span>Applications React, Vue.js et Next.js</span>
                  </li>
                  <li className="flex items-start">
                    <span className="forge-icon-button h-6 w-6 rounded-full flex items-center justify-center mr-2">
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                    <span>Intégration d'API et services tiers</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ */}
        <div className="mt-24">
          <h2 className="cosmic-title text-3xl font-bold text-center mb-12">Questions fréquentes</h2>
          <div className="space-y-6 max-w-4xl mx-auto">
            <div className="bg-deep-space bg-opacity-50 backdrop-filter backdrop-blur-sm rounded-[7px] p-6">
              <h3 className="cosmic-title text-xl font-semibold mb-3">Comment se déroule un projet avec AstraForge ?</h3>
              <p className="cosmic-text">Nous commençons par une consultation gratuite pour comprendre vos besoins. Ensuite, nous établissons un cahier des charges et un devis détaillé. Après validation, nous passons à la conception, au développement, puis aux tests avant la livraison finale. Un suivi post-livraison est assuré pour garantir votre satisfaction.</p>
            </div>
            <div className="bg-deep-space bg-opacity-50 backdrop-filter backdrop-blur-sm rounded-[7px] p-6">
              <h3 className="cosmic-title text-xl font-semibold mb-3">Quels sont les délais de réalisation pour un projet ?</h3>
              <p className="cosmic-text">Les délais varient selon la complexité du projet : comptez 2-4 semaines pour un site vitrine, 4-8 semaines pour un e-commerce, et 8-16 semaines pour une application web ou mobile. Nous pouvons également proposer des solutions accélérées pour les projets urgents.</p>
            </div>
            <div className="bg-deep-space bg-opacity-50 backdrop-filter backdrop-blur-sm rounded-[7px] p-6">
              <h3 className="cosmic-title text-xl font-semibold mb-3">Comment sont calculés les tarifs horaires ?</h3>
              <p className="cosmic-text">Nos tarifs horaires sont basés sur l'expertise requise, la complexité technique et le temps nécessaire pour réaliser chaque tâche. Nous privilégions la transparence et vous fournissons toujours une estimation détaillée avant de commencer le travail.</p>
            </div>
            <div className="bg-deep-space bg-opacity-50 backdrop-filter backdrop-blur-sm rounded-[7px] p-6">
              <h3 className="cosmic-title text-xl font-semibold mb-3">Proposez-vous des services de maintenance après la livraison ?</h3>
              <p className="cosmic-text">Oui, nous proposons différentes formules de maintenance pour assurer le bon fonctionnement de votre site ou application. Ces formules incluent les mises à jour de sécurité, les sauvegardes régulières, les corrections de bugs et l'assistance technique.</p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-24 text-center">
          <h2 className="cosmic-title text-3xl font-bold mb-4">Prêt à démarrer votre projet ?</h2>
          <p className="cosmic-text max-w-2xl mx-auto mb-8">Contactez-nous dès aujourd'hui pour discuter de vos besoins et obtenir un devis personnalisé.</p>
          <a href="/contact" className="forge-glass-button px-8 py-3 text-lg font-semibold rounded-full inline-block">
            Demander un devis
          </a>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
