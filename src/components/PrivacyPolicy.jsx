import React from 'react';
import { Link } from 'react-router-dom';

const PrivacyPolicy = () => {
  return (
    <div className="bg-white dark:bg-gray-900 min-h-screen">
      <div className="max-w-3xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
        <div className="mb-8">
          <Link to="/" className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 dark:hover:text-indigo-300 flex items-center">
            <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Retour à l'accueil
          </Link>
        </div>
        
        <div className="prose prose-indigo dark:prose-invert max-w-none">
          <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">Politique de Confidentialité</h1>
          
          <p className="text-gray-600 dark:text-gray-300 mt-4">
            Cette politique de confidentialité décrit comment nous collectons, utilisons et protégeons vos informations personnelles lorsque vous utilisez notre site web.
          </p>
          
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-8">Informations collectées</h2>
          <p className="text-gray-600 dark:text-gray-300">
            Nous pouvons collecter les types d'informations suivants :
          </p>
          <ul className="list-disc pl-5 text-gray-600 dark:text-gray-300">
            <li>Informations personnelles : nom, adresse e-mail, numéro de téléphone, lorsque vous nous contactez ou remplissez un formulaire.</li>
            <li>Informations de navigation : adresse IP, type de navigateur, pages visitées, temps passé sur le site, via des cookies et technologies similaires.</li>
            <li>Informations de l'appareil : type d'appareil, système d'exploitation, identifiants uniques.</li>
          </ul>
          
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-8">Utilisation des informations</h2>
          <p className="text-gray-600 dark:text-gray-300">
            Nous utilisons les informations collectées pour :
          </p>
          <ul className="list-disc pl-5 text-gray-600 dark:text-gray-300">
            <li>Fournir, exploiter et maintenir notre site web</li>
            <li>Améliorer, personnaliser et développer notre site</li>
            <li>Comprendre et analyser comment vous utilisez notre site</li>
            <li>Développer de nouveaux produits, services et fonctionnalités</li>
            <li>Communiquer avec vous, directement ou par l'intermédiaire de nos partenaires</li>
            <li>Vous envoyer des e-mails</li>
            <li>Détecter et prévenir les fraudes</li>
          </ul>
          
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-8">Cookies</h2>
          <p className="text-gray-600 dark:text-gray-300">
            Notre site utilise des cookies pour améliorer votre expérience. Les cookies sont de petits fichiers stockés sur votre appareil qui nous aident à :
          </p>
          <ul className="list-disc pl-5 text-gray-600 dark:text-gray-300">
            <li>Mémoriser vos préférences</li>
            <li>Comprendre comment vous utilisez notre site</li>
            <li>Améliorer le site en fonction de vos besoins</li>
            <li>Vous offrir une expérience personnalisée</li>
          </ul>
          <p className="text-gray-600 dark:text-gray-300">
            Vous pouvez configurer votre navigateur pour refuser tous les cookies ou pour indiquer quand un cookie est envoyé. Cependant, certaines fonctionnalités du site peuvent ne pas fonctionner correctement sans cookies.
          </p>
          
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-8">Partage des informations</h2>
          <p className="text-gray-600 dark:text-gray-300">
            Nous ne vendons, n'échangeons ni ne transférons vos informations personnelles à des tiers sans votre consentement, sauf dans les cas suivants :
          </p>
          <ul className="list-disc pl-5 text-gray-600 dark:text-gray-300">
            <li>Avec des partenaires de confiance qui nous aident à exploiter notre site ou à vous servir, sous réserve d'accords de confidentialité.</li>
            <li>Lorsque nous estimons que la divulgation est appropriée pour se conformer à la loi, faire respecter les politiques de notre site ou protéger nos droits ou ceux d'autrui.</li>
          </ul>
          
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-8">Protection des informations</h2>
          <p className="text-gray-600 dark:text-gray-300">
            Nous mettons en œuvre une variété de mesures de sécurité pour protéger vos informations personnelles. Nous utilisons un cryptage avancé pour protéger les informations sensibles transmises en ligne et nous protégeons également vos informations hors ligne.
          </p>
          
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-8">Vos droits</h2>
          <p className="text-gray-600 dark:text-gray-300">
            Conformément au Règlement Général sur la Protection des Données (RGPD), vous disposez des droits suivants concernant vos données :
          </p>
          <ul className="list-disc pl-5 text-gray-600 dark:text-gray-300">
            <li>Droit d'accès à vos données</li>
            <li>Droit de rectification de vos données</li>
            <li>Droit à l'effacement de vos données</li>
            <li>Droit à la limitation du traitement</li>
            <li>Droit à la portabilité des données</li>
            <li>Droit d'opposition au traitement</li>
          </ul>
          <p className="text-gray-600 dark:text-gray-300">
            Pour exercer ces droits, veuillez nous contacter à l'adresse e-mail indiquée ci-dessous.
          </p>
          
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-8">Modifications de notre politique de confidentialité</h2>
          <p className="text-gray-600 dark:text-gray-300">
            Nous pouvons mettre à jour notre politique de confidentialité de temps à autre. Nous vous informerons de tout changement en publiant la nouvelle politique de confidentialité sur cette page et en mettant à jour la date de "dernière mise à jour" ci-dessous.
          </p>
          
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-8">Nous contacter</h2>
          <p className="text-gray-600 dark:text-gray-300">
            Si vous avez des questions concernant cette politique de confidentialité, vous pouvez nous contacter à :<br />
            <strong>Email :</strong> privacy@astraforge.com
          </p>
          
          <p className="text-gray-600 dark:text-gray-300 mt-8">
            Dernière mise à jour : {new Date().toLocaleDateString()}
          </p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
