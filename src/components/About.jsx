import React from 'react';
import { useTranslation } from 'react-i18next';

const About = () => {
  const { t } = useTranslation(undefined, { useSuspense: false });

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-deep-space">
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          <h1 className="cosmic-title text-4xl font-extrabold sm:text-5xl lg:text-6xl">
            {t('about.pageTitle')}
          </h1>
          <p className="mt-3 max-w-2xl mx-auto text-xl cosmic-text">
            {t('about.pageSubtitle')}
          </p>
        </div>

        <div className="mt-16">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <div className="bg-deep-space bg-opacity-50 backdrop-filter backdrop-blur-sm rounded-[7px] shadow-xl p-8">
              <h2 className="cosmic-title text-2xl font-bold">
                {t('about.mission.title')}
              </h2>
              <p className="mt-4 text-lg cosmic-text">
                {t('about.mission.description')}
              </p>
            </div>
            <div className="bg-deep-space bg-opacity-50 backdrop-filter backdrop-blur-sm rounded-[7px] shadow-xl p-8">
              <h2 className="cosmic-title text-2xl font-bold">
                {t('about.vision.title')}
              </h2>
              <p className="mt-4 text-lg cosmic-text">
                {t('about.vision.description')}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-16">
          <h2 className="cosmic-title text-3xl font-bold text-center mb-8">
            {t('about.skills.title')}
          </h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="bg-deep-space bg-opacity-50 backdrop-filter backdrop-blur-sm rounded-[7px] shadow-xl p-8 transform transition-all duration-300 hover:scale-105">
              <h3 className="cosmic-title text-xl font-bold mb-4">
                {t('about.skills.design.title')}
              </h3>
              <ul className="space-y-3 cosmic-text">
                <li className="flex items-center">
                  <span className="forge-icon-button h-6 w-6 rounded-full flex items-center justify-center mr-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </span>
                  {t('about.skills.design.item1')}
                </li>
                <li className="flex items-center">
                  <span className="forge-icon-button h-6 w-6 rounded-full flex items-center justify-center mr-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </span>
                  {t('about.skills.design.item2')}
                </li>
                <li className="flex items-center">
                  <span className="forge-icon-button h-6 w-6 rounded-full flex items-center justify-center mr-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </span>
                  {t('about.skills.design.item3')}
                </li>
                <li className="flex items-center">
                  <span className="forge-icon-button h-6 w-6 rounded-full flex items-center justify-center mr-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </span>
                  {t('about.skills.design.item4')}
                </li>
              </ul>
            </div>
            <div className="bg-deep-space bg-opacity-50 backdrop-filter backdrop-blur-sm rounded-[7px] shadow-xl p-8 transform transition-all duration-300 hover:scale-105">
              <h3 className="cosmic-title text-xl font-bold mb-4">
                {t('about.skills.development.title')}
              </h3>
              <ul className="space-y-3 cosmic-text">
                <li className="flex items-center">
                  <span className="forge-icon-button h-6 w-6 rounded-full flex items-center justify-center mr-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </span>
                  {t('about.skills.development.item1')}
                </li>
                <li className="flex items-center">
                  <span className="forge-icon-button h-6 w-6 rounded-full flex items-center justify-center mr-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </span>
                  {t('about.skills.development.item2')}
                </li>
                <li className="flex items-center">
                  <span className="forge-icon-button h-6 w-6 rounded-full flex items-center justify-center mr-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </span>
                  {t('about.skills.development.item3')}
                </li>
                <li className="flex items-center">
                  <span className="forge-icon-button h-6 w-6 rounded-full flex items-center justify-center mr-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </span>
                  {t('about.skills.development.item4')}
                </li>
              </ul>
            </div>
            <div className="bg-deep-space bg-opacity-50 backdrop-filter backdrop-blur-sm rounded-[7px] shadow-xl p-8 transform transition-all duration-300 hover:scale-105">
              <h3 className="cosmic-title text-xl font-bold mb-4">
                {t('about.skills.other.title')}
              </h3>
              <ul className="space-y-3 cosmic-text">
                <li className="flex items-center">
                  <span className="forge-icon-button h-6 w-6 rounded-full flex items-center justify-center mr-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </span>
                  {t('about.skills.other.item1')}
                </li>
                <li className="flex items-center">
                  <span className="forge-icon-button h-6 w-6 rounded-full flex items-center justify-center mr-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </span>
                  {t('about.skills.other.item2')}
                </li>
                <li className="flex items-center">
                  <span className="forge-icon-button h-6 w-6 rounded-full flex items-center justify-center mr-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </span>
                  {t('about.skills.other.item3')}
                </li>
                <li className="flex items-center">
                  <span className="forge-icon-button h-6 w-6 rounded-full flex items-center justify-center mr-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </span>
                  {t('about.skills.other.item4')}
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-16">
          <h2 className="cosmic-title text-3xl font-bold text-center mb-8">
            {t('about.experience.title')}
          </h2>
          <div className="space-y-8">
            <div className="bg-deep-space bg-opacity-50 backdrop-filter backdrop-blur-sm rounded-[7px] shadow-xl p-8 transform transition-all duration-300 hover:translate-x-2">
              <h3 className="cosmic-title text-xl font-bold">
                {t('about.experience.item1.title')}
              </h3>
              <p className="mt-2 text-sm cosmic-text opacity-80">
                {t('about.experience.item1.period')}
              </p>
              <p className="mt-4 cosmic-text">
                {t('about.experience.item1.description')}
              </p>
            </div>
            <div className="bg-deep-space bg-opacity-50 backdrop-filter backdrop-blur-sm rounded-[7px] shadow-xl p-8 transform transition-all duration-300 hover:translate-x-2">
              <h3 className="cosmic-title text-xl font-bold">
                {t('about.experience.item2.title')}
              </h3>
              <p className="mt-2 text-sm cosmic-text opacity-80">
                {t('about.experience.item2.period')}
              </p>
              <p className="mt-4 cosmic-text">
                {t('about.experience.item2.description')}
              </p>
            </div>
            <div className="bg-deep-space bg-opacity-50 backdrop-filter backdrop-blur-sm rounded-[7px] shadow-xl p-8 transform transition-all duration-300 hover:translate-x-2">
              <h3 className="cosmic-title text-xl font-bold">
                {t('about.experience.item3.title')}
              </h3>
              <p className="mt-2 text-sm cosmic-text opacity-80">
                {t('about.experience.item3.period')}
              </p>
              <p className="mt-4 cosmic-text">
                {t('about.experience.item3.description')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
