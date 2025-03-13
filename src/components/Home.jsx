import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import ParticlesHeader from './ParticlesHeader';
import TiltCard from './TiltCard';

const Home = () => {
  const { t } = useTranslation();
  
  return (
    <div className="bg-white dark:bg-gray-900">
      {/* Hero Section with Particles */}
      <div className="relative overflow-hidden h-screen">
        <ParticlesHeader />
        <div className="absolute inset-0 z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
            <div className="text-center md:text-left">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white">
                <span className="block">AstraForge</span>
                <span className="block text-indigo-400">{t('home.hero.subtitle')}</span>
              </h1>
              <p className="mt-3 max-w-md mx-auto md:mx-0 text-base text-gray-300 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
                {t('home.hero.title')}
              </p>
              <div className="mt-5 max-w-md mx-auto md:mx-0 sm:flex sm:justify-center md:justify-start md:mt-8">
                <div className="rounded-md shadow">
                  <Link to="/gallery" className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10">
                    {t('home.hero.cta')}
                  </Link>
                </div>
                <div className="mt-3 rounded-md shadow sm:mt-0 sm:ml-3">
                  <a href="#services" className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-gray-50 dark:bg-gray-800 dark:text-indigo-400 dark:hover:bg-gray-700 md:py-4 md:text-lg md:px-10">
                    {t('home.hero.services')}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Services Section */}
      <div id="services" className="py-12 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
              {t('home.services.title')}
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500 dark:text-gray-300">
              {t('home.services.description')}
            </p>
          </div>

          <div className="mt-10">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {/* Service 1 */}
              <TiltCard className="bg-white dark:bg-gray-700 overflow-hidden shadow rounded-lg transition-transform duration-300 hover:scale-105">
                <div className="relative h-48">
                  <img className="w-full h-full object-cover" src="/assets/SiteKeren1-C6qAXosk.png" alt="Web Design" />
                  <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                    <h3 className="text-2xl font-bold text-white">{t('home.services.webDesign.title')}</h3>
                  </div>
                </div>
                <div className="px-4 py-5 sm:p-6">
                  <p className="text-gray-500 dark:text-gray-300">
                    {t('home.services.webDesign.description')}
                  </p>
                </div>
              </TiltCard>

              {/* Service 2 */}
              <TiltCard className="bg-white dark:bg-gray-700 overflow-hidden shadow rounded-lg transition-transform duration-300 hover:scale-105">
                <div className="relative h-48">
                  <img className="w-full h-full object-cover" src="/assets/infographie-BUU2QWsO.jpg" alt="Infographie" />
                  <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                    <h3 className="text-2xl font-bold text-white">{t('home.services.infographie.title')}</h3>
                  </div>
                </div>
                <div className="px-4 py-5 sm:p-6">
                  <p className="text-gray-500 dark:text-gray-300">
                    {t('home.services.infographie.description')}
                  </p>
                </div>
              </TiltCard>

              {/* Service 3 */}
              <TiltCard className="bg-white dark:bg-gray-700 overflow-hidden shadow rounded-lg transition-transform duration-300 hover:scale-105">
                <div className="relative h-48">
                  <img className="w-full h-full object-cover" src="/assets/photographie-DtAkYzOw.jpg" alt="Photographie" />
                  <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                    <h3 className="text-2xl font-bold text-white">{t('home.services.photographie.title')}</h3>
                  </div>
                </div>
                <div className="px-4 py-5 sm:p-6">
                  <p className="text-gray-500 dark:text-gray-300">
                    {t('home.services.photographie.description')}
                  </p>
                </div>
              </TiltCard>
            </div>
          </div>
        </div>
      </div>

      {/* About Section */}
      <div className="py-12 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-base text-indigo-600 dark:text-indigo-400 font-semibold tracking-wide uppercase">{t('home.about.title')}</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
              {t('home.about.subtitle')}
            </p>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 dark:text-gray-300 lg:mx-auto">
              {t('home.about.description')}
            </p>
          </div>

          <div className="mt-10">
            <div className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
              <div className="flex">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                    <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                    </svg>
                  </div>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">{t('home.about.expertise.title')}</h3>
                  <p className="mt-2 text-base text-gray-500 dark:text-gray-300">
                    {t('home.about.expertise.description')}
                  </p>
                </div>
              </div>

              <div className="flex">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                    <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">{t('home.about.speed.title')}</h3>
                  <p className="mt-2 text-base text-gray-500 dark:text-gray-300">
                    {t('home.about.speed.description')}
                  </p>
                </div>
              </div>

              <div className="flex">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                    <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                    </svg>
                  </div>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">{t('home.about.support.title')}</h3>
                  <p className="mt-2 text-base text-gray-500 dark:text-gray-300">
                    {t('home.about.support.description')}
                  </p>
                </div>
              </div>

              <div className="flex">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                    <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
                    </svg>
                  </div>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">{t('home.about.price.title')}</h3>
                  <p className="mt-2 text-base text-gray-500 dark:text-gray-300">
                    {t('home.about.price.description')}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Processus de travail Section */}
      <div className="py-16 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-2">
              {t('home.process.title')}
            </h2>
            <p className="text-gray-400">
              {t('home.process.description')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-10">
            {/* Étape 1 */}
            <div className="bg-gray-800 rounded-lg p-6 text-center relative process-card star-citizen-sweep">
              <div className="second-sweep"></div>
              <div className="orange-indicator"></div>
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-indigo-600 rounded-full flex items-center justify-center">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                  </svg>
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-2">{t('home.process.step1.title')}</h3>
              <p className="text-gray-400 text-sm">
                {t('home.process.step1.description')}
              </p>
            </div>

            {/* Étape 2 */}
            <div className="bg-gray-800 rounded-lg p-6 text-center relative process-card star-citizen-sweep">
              <div className="second-sweep"></div>
              <div className="orange-indicator"></div>
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-indigo-600 rounded-full flex items-center justify-center">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-2">{t('home.process.step2.title')}</h3>
              <p className="text-gray-400 text-sm">
                {t('home.process.step2.description')}
              </p>
            </div>

            {/* Étape 3 */}
            <div className="bg-gray-800 rounded-lg p-6 text-center relative process-card star-citizen-sweep">
              <div className="second-sweep"></div>
              <div className="orange-indicator"></div>
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-indigo-600 rounded-full flex items-center justify-center">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                  </svg>
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-2">{t('home.process.step3.title')}</h3>
              <p className="text-gray-400 text-sm">
                {t('home.process.step3.description')}
              </p>
            </div>

            {/* Étape 4 */}
            <div className="bg-gray-800 rounded-lg p-6 text-center relative process-card star-citizen-sweep">
              <div className="second-sweep"></div>
              <div className="orange-indicator"></div>
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-indigo-600 rounded-full flex items-center justify-center">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                  </svg>
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-2">{t('home.process.step4.title')}</h3>
              <p className="text-gray-400 text-sm">
                {t('home.process.step4.description')}
              </p>
            </div>

            {/* Étape 5 */}
            <div className="bg-gray-800 rounded-lg p-6 text-center relative process-card star-citizen-sweep">
              <div className="second-sweep"></div>
              <div className="orange-indicator"></div>
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-indigo-600 rounded-full flex items-center justify-center">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-2">{t('home.process.step5.title')}</h3>
              <p className="text-gray-400 text-sm">
                {t('home.process.step5.description')}
              </p>
            </div>
          </div>

          {/* Timeline */}
          <div className="relative">
            <div className="absolute left-0 right-0 h-1 bg-gray-700 top-1/2 transform -translate-y-1/2"></div>
            <div className="flex justify-between relative">
              <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-white text-sm font-bold z-10">1</div>
              <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-white text-sm font-bold z-10">2</div>
              <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-white text-sm font-bold z-10">3</div>
              <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-white text-sm font-bold z-10">4</div>
              <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-white text-sm font-bold z-10">5</div>
            </div>
          </div>
        </div>
      </div>

      {/* Portfolio Preview Section */}
      <div className="bg-gray-100 dark:bg-gray-800 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white">
              {t('home.portfolio.title')}
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500 dark:text-gray-300">
              {t('home.portfolio.description')}
            </p>
          </div>
          
          <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <div className="bg-white dark:bg-gray-700 overflow-hidden shadow rounded-lg transition-all duration-300 hover:shadow-xl">
              <img className="w-full h-48 object-cover" src="/assets/Destinee1-BnMVXLFH.png" alt="Projet Destinée" />
              <div className="p-6">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">{t('home.portfolio.project1.title')}</h3>
                <p className="mt-2 text-sm text-gray-500 dark:text-gray-300">
                  {t('home.portfolio.project1.description')}
                </p>
              </div>
            </div>
            
            <div className="bg-white dark:bg-gray-700 overflow-hidden shadow rounded-lg transition-all duration-300 hover:shadow-xl">
              <img className="w-full h-48 object-cover" src="/assets/SiteKeren1-C6qAXosk.png" alt="Projet Keren" />
              <div className="p-6">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">{t('home.portfolio.project2.title')}</h3>
                <p className="mt-2 text-sm text-gray-500 dark:text-gray-300">
                  {t('home.portfolio.project2.description')}
                </p>
              </div>
            </div>
            
            <div className="bg-white dark:bg-gray-700 overflow-hidden shadow rounded-lg transition-all duration-300 hover:shadow-xl">
              <img className="w-full h-48 object-cover" src="/assets/EcranStart-DD4Cxlyo.png" alt="Projet EcranStart" />
              <div className="p-6">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">{t('home.portfolio.project3.title')}</h3>
                <p className="mt-2 text-sm text-gray-500 dark:text-gray-300">
                  {t('home.portfolio.project3.description')}
                </p>
              </div>
            </div>
          </div>
          
          <div className="mt-10 text-center">
            <Link to="/gallery" className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700">
              {t('home.portfolio.cta')}
              <svg className="ml-2 -mr-1 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </Link>
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="bg-white dark:bg-gray-900 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white">
              {t('home.testimonials.title')}
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500 dark:text-gray-300">
              {t('home.testimonials.description')}
            </p>
          </div>
          
          <div className="mt-10 grid gap-8 lg:grid-cols-2">
            <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg shadow">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <svg className="h-12 w-12 text-indigo-400" fill="currentColor" viewBox="0 0 32 32">
                    <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <p className="text-base text-gray-500 dark:text-gray-300">
                    {t('home.testimonials.quote1')}
                  </p>
                  <div className="mt-4">
                    <p className="text-base font-medium text-gray-900 dark:text-white">{t('home.testimonials.author1')}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{t('home.testimonials.company1')}</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg shadow">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <svg className="h-12 w-12 text-indigo-400" fill="currentColor" viewBox="0 0 32 32">
                    <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <p className="text-base text-gray-500 dark:text-gray-300">
                    {t('home.testimonials.quote2')}
                  </p>
                  <div className="mt-4">
                    <p className="text-base font-medium text-gray-900 dark:text-white">{t('home.testimonials.author2')}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{t('home.testimonials.company2')}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-indigo-700 dark:bg-indigo-900">
        <div className="max-w-2xl mx-auto text-center py-16 px-4 sm:py-20 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
            <span className="block">{t('home.cta.title')}</span>
            <span className="block">{t('home.cta.subtitle')}</span>
          </h2>
          <p className="mt-4 text-lg leading-6 text-indigo-200">
            {t('home.cta.description')}
          </p>
          <a
            href="mailto:contact@astraforge.com"
            className="mt-8 w-full inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-indigo-50 sm:w-auto"
          >
            {t('home.cta.button')}
          </a>
        </div>
      </div>
    </div>
  );
};

export default Home;
