import React from 'react';
import { useTranslation } from 'react-i18next';

const Pricing = () => {
  const { t } = useTranslation(undefined, { useSuspense: false });

  return (
    <div className="bg-gray-900 min-h-screen">
      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-base font-semibold text-indigo-400 tracking-wide uppercase">{t('pricing.pageTitle')}</h2>
          <p className="mt-1 text-4xl font-extrabold text-white sm:text-5xl sm:tracking-tight">
            {t('pricing.pageSubtitle')}
          </p>
          <p className="max-w-xl mt-5 mx-auto text-xl text-gray-400">
            {t('pricing.pageDescription')}
          </p>
        </div>

        {/* Compétences et tarifs */}
        <div className="mt-16">
          <h3 className="text-2xl font-bold text-white mb-8">{t('contact.pricing.skills')}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg transition-transform duration-300 hover:transform hover:scale-105">
              <div className="px-6 py-8">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-xl font-semibold text-white">{t('contact.pricing.motionDesign')}</h4>
                  <span className="px-3 py-1 bg-indigo-600 text-white text-sm font-semibold rounded-full">
                    {t('contact.pricing.motionDesignPrice')}
                  </span>
                </div>
                <p className="text-gray-300 mb-6">{t('contact.pricing.motionDesignDesc')}</p>
                <ul className="space-y-3 text-gray-300">
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-indigo-400 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>{t('pricing.motionDesignSkill1')}</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-indigo-400 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>{t('pricing.motionDesignSkill2')}</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-indigo-400 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>{t('pricing.motionDesignSkill3')}</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg transition-transform duration-300 hover:transform hover:scale-105">
              <div className="px-6 py-8">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-xl font-semibold text-white">{t('contact.pricing.frontendDev')}</h4>
                  <span className="px-3 py-1 bg-indigo-600 text-white text-sm font-semibold rounded-full">
                    {t('contact.pricing.frontendDevPrice')}
                  </span>
                </div>
                <p className="text-gray-300 mb-6">{t('contact.pricing.frontendDevDesc')}</p>
                <ul className="space-y-3 text-gray-300">
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-indigo-400 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>{t('pricing.frontendDevSkill1')}</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-indigo-400 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>{t('pricing.frontendDevSkill2')}</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-indigo-400 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>{t('pricing.frontendDevSkill3')}</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg transition-transform duration-300 hover:transform hover:scale-105">
              <div className="px-6 py-8">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-xl font-semibold text-white">{t('contact.pricing.uiDesign')}</h4>
                  <span className="px-3 py-1 bg-indigo-600 text-white text-sm font-semibold rounded-full">
                    {t('contact.pricing.uiDesignPrice')}
                  </span>
                </div>
                <p className="text-gray-300 mb-6">{t('contact.pricing.uiDesignDesc')}</p>
                <ul className="space-y-3 text-gray-300">
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-indigo-400 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>{t('pricing.uiDesignSkill1')}</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-indigo-400 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>{t('pricing.uiDesignSkill2')}</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-indigo-400 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>{t('pricing.uiDesignSkill3')}</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg transition-transform duration-300 hover:transform hover:scale-105">
              <div className="px-6 py-8">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-xl font-semibold text-white">{t('contact.pricing.graphicDesign')}</h4>
                  <span className="px-3 py-1 bg-indigo-600 text-white text-sm font-semibold rounded-full">
                    {t('contact.pricing.graphicDesignPrice')}
                  </span>
                </div>
                <p className="text-gray-300 mb-6">{t('contact.pricing.graphicDesignDesc')}</p>
                <ul className="space-y-3 text-gray-300">
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-indigo-400 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>{t('pricing.graphicDesignSkill1')}</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-indigo-400 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>{t('pricing.graphicDesignSkill2')}</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-indigo-400 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>{t('pricing.graphicDesignSkill3')}</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg transition-transform duration-300 hover:transform hover:scale-105">
              <div className="px-6 py-8">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-xl font-semibold text-white">{t('contact.pricing.photography')}</h4>
                  <span className="px-3 py-1 bg-indigo-600 text-white text-sm font-semibold rounded-full">
                    {t('contact.pricing.photographyPrice')}
                  </span>
                </div>
                <p className="text-gray-300 mb-6">{t('contact.pricing.photographyDesc')}</p>
                <ul className="space-y-3 text-gray-300">
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-indigo-400 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>{t('pricing.photographySkill1')}</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-indigo-400 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>{t('pricing.photographySkill2')}</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-indigo-400 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>{t('pricing.photographySkill3')}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Packs de services */}
        <div className="mt-20">
          <h3 className="text-2xl font-bold text-white mb-8">{t('contact.pricing.packages')}</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg transition-transform duration-300 hover:transform hover:scale-105">
              <div className="px-6 py-8">
                <div className="text-center mb-6">
                  <h4 className="text-xl font-semibold text-white">{t('contact.pricing.basicPackage')}</h4>
                  <div className="mt-4">
                    <span className="text-3xl font-bold text-white">{t('contact.pricing.basicPackagePrice')}</span>
                  </div>
                </div>
                <ul className="space-y-4 text-gray-300 mb-8">
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-indigo-400 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>{t('contact.pricing.basicPackageItem1')}</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-indigo-400 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>{t('contact.pricing.basicPackageItem2')}</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-indigo-400 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>{t('contact.pricing.basicPackageItem3')}</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-indigo-400 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>{t('pricing.basicPackageItem4')}</span>
                  </li>
                </ul>
                <div className="text-center">
                  <a href="#contact" className="inline-block px-6 py-3 border border-indigo-500 text-indigo-500 font-medium rounded-md hover:bg-indigo-500 hover:text-white transition-colors duration-200">
                    {t('pricing.contactButton')}
                  </a>
                </div>
              </div>
            </div>

            <div className="bg-indigo-900 rounded-lg overflow-hidden shadow-xl transform scale-105 z-10 transition-transform duration-300 hover:transform hover:scale-110">
              <div className="absolute inset-x-0 top-0 transform translate-y-px">
                <div className="flex justify-center transform -translate-y-1/2">
                  <span className="inline-flex rounded-full bg-indigo-600 px-4 py-1 text-sm font-semibold tracking-wider uppercase text-white">
                    {t('contact.pricing.popular')}
                  </span>
                </div>
              </div>
              <div className="px-6 py-8 pt-10">
                <div className="text-center mb-6">
                  <h4 className="text-xl font-semibold text-white">{t('contact.pricing.standardPackage')}</h4>
                  <div className="mt-4">
                    <span className="text-3xl font-bold text-white">{t('contact.pricing.standardPackagePrice')}</span>
                  </div>
                </div>
                <ul className="space-y-4 text-gray-300 mb-8">
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-indigo-400 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>{t('contact.pricing.standardPackageItem1')}</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-indigo-400 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>{t('contact.pricing.standardPackageItem2')}</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-indigo-400 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>{t('contact.pricing.standardPackageItem3')}</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-indigo-400 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>{t('contact.pricing.standardPackageItem4')}</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-indigo-400 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>{t('pricing.standardPackageItem5')}</span>
                  </li>
                </ul>
                <div className="text-center">
                  <a href="#contact" className="inline-block px-6 py-3 bg-indigo-600 text-white font-medium rounded-md hover:bg-indigo-700 transition-colors duration-200">
                    {t('pricing.contactButton')}
                  </a>
                </div>
              </div>
            </div>

            <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg transition-transform duration-300 hover:transform hover:scale-105">
              <div className="px-6 py-8">
                <div className="text-center mb-6">
                  <h4 className="text-xl font-semibold text-white">{t('contact.pricing.premiumPackage')}</h4>
                  <div className="mt-4">
                    <span className="text-3xl font-bold text-white">{t('contact.pricing.premiumPackagePrice')}</span>
                  </div>
                </div>
                <ul className="space-y-4 text-gray-300 mb-8">
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-indigo-400 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>{t('contact.pricing.premiumPackageItem1')}</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-indigo-400 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>{t('contact.pricing.premiumPackageItem2')}</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-indigo-400 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>{t('contact.pricing.premiumPackageItem3')}</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-indigo-400 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>{t('contact.pricing.premiumPackageItem4')}</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-indigo-400 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>{t('contact.pricing.premiumPackageItem5')}</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-indigo-400 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>{t('pricing.premiumPackageItem6')}</span>
                  </li>
                </ul>
                <div className="text-center">
                  <a href="#contact" className="inline-block px-6 py-3 border border-indigo-500 text-indigo-500 font-medium rounded-md hover:bg-indigo-500 hover:text-white transition-colors duration-200">
                    {t('pricing.contactButton')}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Types de projets */}
        <div className="mt-20">
          <h3 className="text-2xl font-bold text-white mb-8">{t('contact.pricing.projectTypes')}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg p-6 transition-transform duration-300 hover:transform hover:scale-105">
              <h4 className="text-xl font-semibold text-white mb-4">{t('contact.pricing.website')}</h4>
              <div className="text-2xl font-bold text-indigo-400 mb-4">{t('contact.pricing.websitePrice')}</div>
              <p className="text-gray-300">{t('pricing.websiteDesc')}</p>
            </div>
            
            <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg p-6 transition-transform duration-300 hover:transform hover:scale-105">
              <h4 className="text-xl font-semibold text-white mb-4">{t('contact.pricing.ecommerce')}</h4>
              <div className="text-2xl font-bold text-indigo-400 mb-4">{t('contact.pricing.ecommercePrice')}</div>
              <p className="text-gray-300">{t('pricing.ecommerceDesc')}</p>
            </div>
            
            <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg p-6 transition-transform duration-300 hover:transform hover:scale-105">
              <h4 className="text-xl font-semibold text-white mb-4">{t('contact.pricing.webApp')}</h4>
              <div className="text-2xl font-bold text-indigo-400 mb-4">{t('contact.pricing.webAppPrice')}</div>
              <p className="text-gray-300">{t('pricing.webAppDesc')}</p>
            </div>
            
            <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg p-6 transition-transform duration-300 hover:transform hover:scale-105">
              <h4 className="text-xl font-semibold text-white mb-4">{t('contact.pricing.mobileApp')}</h4>
              <div className="text-2xl font-bold text-indigo-400 mb-4">{t('contact.pricing.mobileAppPrice')}</div>
              <p className="text-gray-300">{t('pricing.mobileAppDesc')}</p>
            </div>
          </div>
        </div>

        {/* FAQ */}
        <div className="mt-20">
          <h3 className="text-2xl font-bold text-white mb-8">{t('pricing.faqTitle')}</h3>
          <div className="space-y-6">
            <div className="bg-gray-800 rounded-lg p-6">
              <h4 className="text-lg font-semibold text-white mb-3">{t('pricing.faqQuestion1')}</h4>
              <p className="text-gray-300">{t('pricing.faqAnswer1')}</p>
            </div>
            <div className="bg-gray-800 rounded-lg p-6">
              <h4 className="text-lg font-semibold text-white mb-3">{t('pricing.faqQuestion2')}</h4>
              <p className="text-gray-300">{t('pricing.faqAnswer2')}</p>
            </div>
            <div className="bg-gray-800 rounded-lg p-6">
              <h4 className="text-lg font-semibold text-white mb-3">{t('pricing.faqQuestion3')}</h4>
              <p className="text-gray-300">{t('pricing.faqAnswer3')}</p>
            </div>
            <div className="bg-gray-800 rounded-lg p-6">
              <h4 className="text-lg font-semibold text-white mb-3">{t('pricing.faqQuestion4')}</h4>
              <p className="text-gray-300">{t('pricing.faqAnswer4')}</p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-20 bg-indigo-900 rounded-lg p-8 text-center">
          <h3 className="text-2xl font-bold text-white mb-4">{t('pricing.ctaTitle')}</h3>
          <p className="text-xl text-gray-300 mb-6 max-w-2xl mx-auto">{t('pricing.ctaDescription')}</p>
          <a href="#contact" className="inline-block px-8 py-4 bg-indigo-600 text-white font-medium rounded-md hover:bg-indigo-700 transition-colors duration-200 text-lg">
            {t('pricing.ctaButton')}
          </a>
        </div>

        <p className="mt-12 text-sm text-gray-400 text-center">
          {t('contact.pricing.note')}
        </p>
      </div>
    </div>
  );
};

export default Pricing;
