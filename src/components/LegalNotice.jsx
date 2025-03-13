import React from 'react';
import { Link } from 'react-router-dom';

const LegalNotice = () => {
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
          <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">Mentions Légales</h1>
          
          <p className="text-gray-600 dark:text-gray-300 mt-4">
            Conformément à la loi n° 2004-575 du 21 juin 2004, il est précisé aux utilisateurs du site {window.location.hostname} l'identité des différents intervenants dans le cadre de sa réalisation et de son suivi.
          </p>
          
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-8">Éditeur</h2>
          <p className="text-gray-600 dark:text-gray-300">
            <strong>Nom de l'éditeur :</strong> Zoé Dero<br />
            <strong>Adresse :</strong> Cambrai, Hauts-de-France<br />
            <strong>Email :</strong> zoe.dero@gmail.com<br />
            <strong>Téléphone :</strong> 07 87 26 09 64<br />
            <strong>SIRET :</strong> 12345678900012<br />
            <strong>Statut :</strong> Auto-entrepreneur
          </p>
          
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-8">Hébergement</h2>
          <p className="text-gray-600 dark:text-gray-300">
            <strong>Hébergeur :</strong> OVH SAS<br />
            <strong>Adresse :</strong> 2 rue Kellermann - 59100 Roubaix - France<br />
            <strong>Site web :</strong> www.ovh.com
          </p>
          
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-8">Propriété intellectuelle</h2>
          <p className="text-gray-600 dark:text-gray-300">
            Tous les contenus présents sur ce site sont protégés par les droits d'auteur. Toute reproduction est interdite sans autorisation préalable.
          </p>
          <p className="text-gray-600 dark:text-gray-300">
            Les logos, images, photographies, vidéos, textes et autres éléments de ce site sont la propriété exclusive de AstraForge ou de leurs propriétaires respectifs.
          </p>
          
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-8">Cookies</h2>
          <p className="text-gray-600 dark:text-gray-300">
            Ce site utilise des cookies pour améliorer l'expérience utilisateur. En naviguant sur ce site, vous acceptez l'utilisation de cookies conformément à notre politique de confidentialité.
          </p>
          
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-8">Limitation de responsabilité</h2>
          <p className="text-gray-600 dark:text-gray-300">
            AstraForge ne pourra être tenu responsable des dommages directs ou indirects résultant de l'utilisation de ce site ou de l'impossibilité d'y accéder.
          </p>
          <p className="text-gray-600 dark:text-gray-300">
            AstraForge s'efforce d'assurer l'exactitude et la mise à jour des informations diffusées sur ce site, dont elle se réserve le droit de corriger le contenu à tout moment et sans préavis.
          </p>
          
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-8">Liens hypertextes</h2>
          <p className="text-gray-600 dark:text-gray-300">
            Ce site peut contenir des liens vers d'autres sites. AstraForge n'exerce aucun contrôle sur ces sites et n'assume aucune responsabilité quant à leur contenu.
          </p>
          
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-8">Droit applicable et juridiction compétente</h2>
          <p className="text-gray-600 dark:text-gray-300">
            Les présentes mentions légales sont soumises au droit français. En cas de litige, les tribunaux français seront seuls compétents.
          </p>
          
          <p className="text-gray-600 dark:text-gray-300 mt-8">
            Dernière mise à jour : {new Date().toLocaleDateString()}
          </p>
        </div>
      </div>
    </div>
  );
};

export default LegalNotice;
