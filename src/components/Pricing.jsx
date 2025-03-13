import React from 'react';
import { useTranslation } from 'react-i18next';

const Pricing = () => {
  const { t } = useTranslation(undefined, { useSuspense: false });

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-deep-space">
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          <h1 className="cosmic-title text-4xl font-extrabold sm:text-5xl lg:text-6xl">
            {t('pricing.pageTitle')}
          </h1>
          <p className="mt-3 max-w-2xl mx-auto text-xl cosmic-text">
            {t('pricing.pageSubtitle')}
          </p>
          <p className="max-w-xl mt-5 mx-auto text-lg cosmic-text opacity-80">
            {t('pricing.pageDescription')}
          </p>
        </div>

        {/* Compétences et tarifs */}
        <div className="mt-16">
          <h2 className="cosmic-title text-3xl font-bold text-center mb-8">{t('contact.pricing.skills')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-deep-space bg-opacity-50 backdrop-filter backdrop-blur-sm rounded-[7px] shadow-xl overflow-hidden transition-all duration-300 hover:scale-105">
              <div className="px-6 py-8">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="cosmic-title text-xl font-semibold">{t('contact.pricing.motionDesign')}</h3>
                  <span className="forge-glass-button px-3 py-1 text-sm font-semibold rounded-full">
                    {t('contact.pricing.motionDesignPrice')}
                  </span>
                </div>
                <p className="cosmic-text mb-6">{t('contact.pricing.motionDesignDesc')}</p>
                <ul className="space-y-3 cosmic-text">
                  <li className="flex items-start">
                    <span className="forge-icon-button h-6 w-6 rounded-full flex items-center justify-center mr-2">
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                    <span>{t('pricing.motionDesignSkill1')}</span>
                  </li>
                  <li className="flex items-start">
                    <span className="forge-icon-button h-6 w-6 rounded-full flex items-center justify-center mr-2">
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                    <span>{t('pricing.motionDesignSkill2')}</span>
                  </li>
                  <li className="flex items-start">
                    <span className="forge-icon-button h-6 w-6 rounded-full flex items-center justify-center mr-2">
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                    <span>{t('pricing.motionDesignSkill3')}</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="bg-deep-space bg-opacity-50 backdrop-filter backdrop-blur-sm rounded-[7px] shadow-xl overflow-hidden transition-all duration-300 hover:scale-105">
              <div className="px-6 py-8">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="cosmic-title text-xl font-semibold">{t('contact.pricing.frontendDev')}</h3>
                  <span className="forge-glass-button px-3 py-1 text-sm font-semibold rounded-full">
                    {t('contact.pricing.frontendDevPrice')}
                  </span>
                </div>
                <p className="cosmic-text mb-6">{t('contact.pricing.frontendDevDesc')}</p>
                <ul className="space-y-3 cosmic-text">
                  <li className="flex items-start">
                    <span className="forge-icon-button h-6 w-6 rounded-full flex items-center justify-center mr-2">
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                    <span>{t('pricing.frontendDevSkill1')}</span>
                  </li>
                  <li className="flex items-start">
                    <span className="forge-icon-button h-6 w-6 rounded-full flex items-center justify-center mr-2">
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                    <span>{t('pricing.frontendDevSkill2')}</span>
                  </li>
                  <li className="flex items-start">
                    <span className="forge-icon-button h-6 w-6 rounded-full flex items-center justify-center mr-2">
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                    <span>{t('pricing.frontendDevSkill3')}</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="bg-deep-space bg-opacity-50 backdrop-filter backdrop-blur-sm rounded-[7px] shadow-xl overflow-hidden transition-all duration-300 hover:scale-105">
              <div className="px-6 py-8">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="cosmic-title text-xl font-semibold">{t('contact.pricing.uiDesign')}</h3>
                  <span className="forge-glass-button px-3 py-1 text-sm font-semibold rounded-full">
                    {t('contact.pricing.uiDesignPrice')}
                  </span>
                </div>
                <p className="cosmic-text mb-6">{t('contact.pricing.uiDesignDesc')}</p>
                <ul className="space-y-3 cosmic-text">
                  <li className="flex items-start">
                    <span className="forge-icon-button h-6 w-6 rounded-full flex items-center justify-center mr-2">
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                    <span>{t('pricing.uiDesignSkill1')}</span>
                  </li>
                  <li className="flex items-start">
                    <span className="forge-icon-button h-6 w-6 rounded-full flex items-center justify-center mr-2">
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                    <span>{t('pricing.uiDesignSkill2')}</span>
                  </li>
                  <li className="flex items-start">
                    <span className="forge-icon-button h-6 w-6 rounded-full flex items-center justify-center mr-2">
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                    <span>{t('pricing.uiDesignSkill3')}</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="bg-deep-space bg-opacity-50 backdrop-filter backdrop-blur-sm rounded-[7px] shadow-xl overflow-hidden transition-all duration-300 hover:scale-105">
              <div className="px-6 py-8">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="cosmic-title text-xl font-semibold">{t('contact.pricing.graphicDesign')}</h3>
                  <span className="forge-glass-button px-3 py-1 text-sm font-semibold rounded-full">
                    {t('contact.pricing.graphicDesignPrice')}
                  </span>
                </div>
                <p className="cosmic-text mb-6">{t('contact.pricing.graphicDesignDesc')}</p>
                <ul className="space-y-3 cosmic-text">
                  <li className="flex items-start">
                    <span className="forge-icon-button h-6 w-6 rounded-full flex items-center justify-center mr-2">
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                    <span>{t('pricing.graphicDesignSkill1')}</span>
                  </li>
                  <li className="flex items-start">
                    <span className="forge-icon-button h-6 w-6 rounded-full flex items-center justify-center mr-2">
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                    <span>{t('pricing.graphicDesignSkill2')}</span>
                  </li>
                  <li className="flex items-start">
                    <span className="forge-icon-button h-6 w-6 rounded-full flex items-center justify-center mr-2">
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                    <span>{t('pricing.graphicDesignSkill3')}</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="bg-deep-space bg-opacity-50 backdrop-filter backdrop-blur-sm rounded-[7px] shadow-xl overflow-hidden transition-all duration-300 hover:scale-105">
              <div className="px-6 py-8">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="cosmic-title text-xl font-semibold">{t('contact.pricing.photography')}</h3>
                  <span className="forge-glass-button px-3 py-1 text-sm font-semibold rounded-full">
                    {t('contact.pricing.photographyPrice')}
                  </span>
                </div>
                <p className="cosmic-text mb-6">{t('contact.pricing.photographyDesc')}</p>
                <ul className="space-y-3 cosmic-text">
                  <li className="flex items-start">
                    <span className="forge-icon-button h-6 w-6 rounded-full flex items-center justify-center mr-2">
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                    <span>{t('pricing.photographySkill1')}</span>
                  </li>
                  <li className="flex items-start">
                    <span className="forge-icon-button h-6 w-6 rounded-full flex items-center justify-center mr-2">
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                    <span>{t('pricing.photographySkill2')}</span>
                  </li>
                  <li className="flex items-start">
                    <span className="forge-icon-button h-6 w-6 rounded-full flex items-center justify-center mr-2">
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                    <span>{t('pricing.photographySkill3')}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Types de projets et tarifs */}
        <div className="mt-16">
          <h2 className="cosmic-title text-3xl font-bold text-center mb-8">{t('contact.pricing.projectTypes')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-deep-space bg-opacity-50 backdrop-filter backdrop-blur-sm rounded-[7px] shadow-xl overflow-hidden transition-all duration-300 hover:scale-105">
              <div className="px-6 py-8">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="cosmic-title text-xl font-semibold">{t('pricing.websiteTitle')}</h3>
                  <span className="forge-glass-button px-3 py-1 text-sm font-semibold rounded-full">
                    {t('contact.pricing.websitePrice')}
                  </span>
                </div>
                <p className="cosmic-text mb-6">{t('pricing.websiteDesc')}</p>
                <ul className="space-y-3 cosmic-text">
                  <li className="flex items-start">
                    <span className="forge-icon-button h-6 w-6 rounded-full flex items-center justify-center mr-2">
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                    <span>{t('pricing.websiteFeature1')}</span>
                  </li>
                  <li className="flex items-start">
                    <span className="forge-icon-button h-6 w-6 rounded-full flex items-center justify-center mr-2">
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                    <span>{t('pricing.websiteFeature2')}</span>
                  </li>
                  <li className="flex items-start">
                    <span className="forge-icon-button h-6 w-6 rounded-full flex items-center justify-center mr-2">
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                    <span>{t('pricing.websiteFeature3')}</span>
                  </li>
                </ul>
                <div className="mt-8">
                  <button className="forge-glass-button w-full py-2 px-4 rounded-[7px] transition-all duration-300">
                    {t('pricing.getStarted')}
                  </button>
                </div>
              </div>
            </div>

            <div className="bg-deep-space bg-opacity-50 backdrop-filter backdrop-blur-sm rounded-[7px] shadow-xl overflow-hidden transition-all duration-300 hover:scale-105 transform translate-y-0 md:-translate-y-4">
              <div className="absolute inset-x-0 top-0 transform translate-y-px">
                <div className="flex justify-center transform -translate-y-1/2">
                  <span className="forge-glass-button px-4 py-1 rounded-full text-sm font-semibold">
                    {t('pricing.mostPopular')}
                  </span>
                </div>
              </div>
              <div className="px-6 py-8">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="cosmic-title text-xl font-semibold">{t('pricing.ecommerceTitle')}</h3>
                  <span className="forge-glass-button px-3 py-1 text-sm font-semibold rounded-full">
                    {t('contact.pricing.ecommercePrice')}
                  </span>
                </div>
                <p className="cosmic-text mb-6">{t('pricing.ecommerceDesc')}</p>
                <ul className="space-y-3 cosmic-text">
                  <li className="flex items-start">
                    <span className="forge-icon-button h-6 w-6 rounded-full flex items-center justify-center mr-2">
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                    <span>{t('pricing.ecommerceFeature1')}</span>
                  </li>
                  <li className="flex items-start">
                    <span className="forge-icon-button h-6 w-6 rounded-full flex items-center justify-center mr-2">
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                    <span>{t('pricing.ecommerceFeature2')}</span>
                  </li>
                  <li className="flex items-start">
                    <span className="forge-icon-button h-6 w-6 rounded-full flex items-center justify-center mr-2">
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                    <span>{t('pricing.ecommerceFeature3')}</span>
                  </li>
                  <li className="flex items-start">
                    <span className="forge-icon-button h-6 w-6 rounded-full flex items-center justify-center mr-2">
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                    <span>{t('pricing.ecommerceFeature4')}</span>
                  </li>
                </ul>
                <div className="mt-8">
                  <button className="forge-glass-button w-full py-2 px-4 rounded-[7px] transition-all duration-300">
                    {t('pricing.getStarted')}
                  </button>
                </div>
              </div>
            </div>

            <div className="bg-deep-space bg-opacity-50 backdrop-filter backdrop-blur-sm rounded-[7px] shadow-xl overflow-hidden transition-all duration-300 hover:scale-105">
              <div className="px-6 py-8">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="cosmic-title text-xl font-semibold">{t('pricing.customTitle')}</h3>
                  <span className="forge-glass-button px-3 py-1 text-sm font-semibold rounded-full">
                    {t('pricing.customPrice')}
                  </span>
                </div>
                <p className="cosmic-text mb-6">{t('pricing.customDesc')}</p>
                <ul className="space-y-3 cosmic-text">
                  <li className="flex items-start">
                    <span className="forge-icon-button h-6 w-6 rounded-full flex items-center justify-center mr-2">
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                    <span>{t('pricing.customFeature1')}</span>
                  </li>
                  <li className="flex items-start">
                    <span className="forge-icon-button h-6 w-6 rounded-full flex items-center justify-center mr-2">
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                    <span>{t('pricing.customFeature2')}</span>
                  </li>
                  <li className="flex items-start">
                    <span className="forge-icon-button h-6 w-6 rounded-full flex items-center justify-center mr-2">
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                    <span>{t('pricing.customFeature3')}</span>
                  </li>
                  <li className="flex items-start">
                    <span className="forge-icon-button h-6 w-6 rounded-full flex items-center justify-center mr-2">
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                    <span>{t('pricing.customFeature4')}</span>
                  </li>
                </ul>
                <div className="mt-8">
                  <button className="forge-glass-button w-full py-2 px-4 rounded-[7px] transition-all duration-300">
                    {t('pricing.contactUs')}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ */}
        <div className="mt-16">
          <h2 className="cosmic-title text-3xl font-bold text-center mb-8">{t('pricing.faqTitle')}</h2>
          <div className="max-w-3xl mx-auto">
            <div className="space-y-6">
              {/* FAQ Item 1 */}
              <div className="bg-deep-space bg-opacity-50 backdrop-filter backdrop-blur-sm rounded-[7px] shadow-xl overflow-hidden">
                <div className="px-6 py-4">
                  <h3 className="cosmic-title text-lg font-semibold">{t('pricing.faq1')}</h3>
                  <p className="mt-2 cosmic-text">{t('pricing.faqAnswer1')}</p>
                </div>
              </div>
              
              {/* FAQ Item 2 */}
              <div className="bg-deep-space bg-opacity-50 backdrop-filter backdrop-blur-sm rounded-[7px] shadow-xl overflow-hidden">
                <div className="px-6 py-4">
                  <h3 className="cosmic-title text-lg font-semibold">{t('pricing.faq2')}</h3>
                  <p className="mt-2 cosmic-text">{t('pricing.faqAnswer2')}</p>
                </div>
              </div>
              
              {/* FAQ Item 3 */}
              <div className="bg-deep-space bg-opacity-50 backdrop-filter backdrop-blur-sm rounded-[7px] shadow-xl overflow-hidden">
                <div className="px-6 py-4">
                  <h3 className="cosmic-title text-lg font-semibold">{t('pricing.faq3')}</h3>
                  <p className="mt-2 cosmic-text">{t('pricing.faqAnswer3')}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <div className="bg-deep-space bg-opacity-50 backdrop-filter backdrop-blur-sm rounded-[7px] shadow-xl overflow-hidden py-12 px-6">
            <h2 className="cosmic-title text-3xl font-bold mb-4">{t('pricing.ctaTitle')}</h2>
            <p className="cosmic-text max-w-2xl mx-auto mb-8">{t('pricing.ctaText')}</p>
            <button className="forge-glass-button py-3 px-8 rounded-[7px] text-lg transition-all duration-300">
              {t('pricing.ctaButton')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
