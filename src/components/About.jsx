import React from 'react';
import { useTranslation } from 'react-i18next';

const About = () => {
  const { t } = useTranslation(undefined, { useSuspense: false });

  return (
    <div className="bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
            {t('about.pageTitle')}
          </h1>
          <p className="mt-4 text-lg text-gray-500 dark:text-gray-300">
            {t('about.pageSubtitle')}
          </p>
        </div>

        <div className="mt-12">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                {t('about.mission.title')}
              </h2>
              <p className="mt-4 text-lg text-gray-500 dark:text-gray-300">
                {t('about.mission.description')}
              </p>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                {t('about.vision.title')}
              </h2>
              <p className="mt-4 text-lg text-gray-500 dark:text-gray-300">
                {t('about.vision.description')}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white text-center">
            {t('about.skills.title')}
          </h2>
          <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                {t('about.skills.design.title')}
              </h3>
              <ul className="mt-4 space-y-2 text-gray-500 dark:text-gray-300">
                <li>{t('about.skills.design.item1')}</li>
                <li>{t('about.skills.design.item2')}</li>
                <li>{t('about.skills.design.item3')}</li>
                <li>{t('about.skills.design.item4')}</li>
              </ul>
            </div>
            <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                {t('about.skills.development.title')}
              </h3>
              <ul className="mt-4 space-y-2 text-gray-500 dark:text-gray-300">
                <li>{t('about.skills.development.item1')}</li>
                <li>{t('about.skills.development.item2')}</li>
                <li>{t('about.skills.development.item3')}</li>
                <li>{t('about.skills.development.item4')}</li>
              </ul>
            </div>
            <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                {t('about.skills.other.title')}
              </h3>
              <ul className="mt-4 space-y-2 text-gray-500 dark:text-gray-300">
                <li>{t('about.skills.other.item1')}</li>
                <li>{t('about.skills.other.item2')}</li>
                <li>{t('about.skills.other.item3')}</li>
                <li>{t('about.skills.other.item4')}</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white text-center">
            {t('about.experience.title')}
          </h2>
          <div className="mt-8 space-y-8">
            <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                {t('about.experience.item1.title')}
              </h3>
              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                {t('about.experience.item1.period')}
              </p>
              <p className="mt-4 text-gray-500 dark:text-gray-300">
                {t('about.experience.item1.description')}
              </p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                {t('about.experience.item2.title')}
              </h3>
              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                {t('about.experience.item2.period')}
              </p>
              <p className="mt-4 text-gray-500 dark:text-gray-300">
                {t('about.experience.item2.description')}
              </p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                {t('about.experience.item3.title')}
              </h3>
              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                {t('about.experience.item3.period')}
              </p>
              <p className="mt-4 text-gray-500 dark:text-gray-300">
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
