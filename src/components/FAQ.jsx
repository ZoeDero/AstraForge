import React, { useState } from 'react';

/**
 * Composant FAQ - Affiche une liste de questions fréquemment posées avec réponses
 * @returns {JSX.Element} - Section FAQ avec accordéon
 */
const FAQ = () => {
  // État pour suivre quelle question est ouverte
  const [openIndex, setOpenIndex] = useState(null);

  // Liste des questions et réponses
  const faqItems = [
    {
      question: "Quels services proposez-vous ?",
      answer: "AstraForge propose une gamme complète de services créatifs, incluant la conception d'identité visuelle, le design web, le développement de sites internet, la création graphique, et la stratégie de communication digitale. Nous adaptons nos services aux besoins spécifiques de chaque client pour créer des solutions sur mesure."
    },
    {
      question: "Comment se déroule un projet avec AstraForge ?",
      answer: "Notre processus de travail se déroule en plusieurs étapes : 1) Consultation initiale pour comprendre vos besoins, 2) Proposition détaillée et devis, 3) Phase de conception avec présentations de maquettes, 4) Développement et implémentation, 5) Tests et ajustements, 6) Livraison finale et formation si nécessaire. Tout au long du processus, nous maintenons une communication transparente et vous impliquons dans les décisions importantes."
    },
    {
      question: "Quels sont vos délais de réalisation ?",
      answer: "Les délais varient en fonction de la complexité du projet. Un site web simple peut être réalisé en 2-3 semaines, tandis qu'un projet plus complexe peut prendre 1-3 mois. Lors de notre consultation initiale, nous établirons un calendrier précis adapté à votre projet et à vos contraintes temporelles."
    },
    {
      question: "Proposez-vous des services de maintenance après la livraison ?",
      answer: "Oui, nous proposons des forfaits de maintenance pour assurer le bon fonctionnement de votre site web. Ces forfaits incluent les mises à jour de sécurité, les corrections de bugs, les sauvegardes régulières et un support technique. Nous pouvons également vous former à la gestion de votre site si vous préférez le maintenir vous-même."
    },
    {
      question: "Comment sont calculés vos tarifs ?",
      answer: "Nos tarifs sont calculés en fonction de la complexité du projet, du temps estimé pour sa réalisation, et des fonctionnalités requises. Nous travaillons avec des forfaits transparents pour les projets standards et des tarifs personnalisés pour les projets sur mesure. Contactez-nous pour obtenir un devis gratuit adapté à votre projet."
    },
    {
      question: "Travaillez-vous avec des clients à distance ?",
      answer: "Absolument ! Bien que nous soyons basés à Cambrai dans les Hauts-de-France, nous travaillons avec des clients partout en France et à l'international. Nous utilisons des outils de communication et de gestion de projet en ligne pour assurer une collaboration efficace, quelle que soit votre localisation."
    }
  ];

  // Fonction pour basculer l'état d'ouverture d'une question
  const toggleQuestion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-16 bg-deep-space min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="cosmic-title text-4xl font-extrabold sm:text-5xl lg:text-6xl">
            Questions fréquemment posées
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-xl cosmic-text">
            Vous avez des questions ? Nous avons les réponses. Consultez notre FAQ ci-dessous ou contactez-nous directement.
          </p>
        </div>

        <div className="max-w-3xl mx-auto divide-y divide-gray-700 rounded-[7px] overflow-hidden">
          {faqItems.map((item, index) => (
            <div key={index} className="bg-deep-space bg-opacity-50 backdrop-filter backdrop-blur-sm">
              <button
                onClick={() => toggleQuestion(index)}
                className="w-full px-6 py-5 text-left focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all duration-300"
                aria-expanded={openIndex === index}
              >
                <div className="flex justify-between items-center">
                  <span className="cosmic-title text-lg font-medium">
                    {item.question}
                  </span>
                  <span className="ml-6 flex-shrink-0">
                    <span className={`forge-icon-button h-8 w-8 rounded-full flex items-center justify-center transform transition-transform duration-300 ${
                      openIndex === index ? 'rotate-180' : 'rotate-0'
                    }`}>
                      <svg
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </span>
                  </span>
                </div>
              </button>
              <div
                className={`transition-all duration-300 ease-in-out overflow-hidden ${
                  openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="px-6 pb-5 pt-0">
                  <p className="cosmic-text text-base">
                    {item.answer}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          <div className="bg-deep-space bg-opacity-50 backdrop-filter backdrop-blur-sm rounded-[7px] shadow-xl overflow-hidden py-8 px-6">
            <p className="cosmic-text text-lg">
              Vous ne trouvez pas la réponse à votre question ?
            </p>
            <a
              href="/contact"
              className="mt-4 inline-flex items-center forge-glass-button px-6 py-3 rounded-[7px] transition-all duration-300"
            >
              Contactez-nous directement
              <svg
                className="ml-2 w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
